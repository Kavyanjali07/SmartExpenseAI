package com.kavyanjali.smartexpense.service.ai;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Duration;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RateLimitService {

    private static final Logger logger = LoggerFactory.getLogger(RateLimitService.class);

    private final StringRedisTemplate redisTemplate;
    private final Map<String, Deque<Long>> localTracker = new ConcurrentHashMap<>();

    public RateLimitService(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void enforce(String username, int maxRequests, long windowMillis) {
        String key = "ai:rate:" + username;

        try {
            Long count = redisTemplate.opsForValue().increment(key);
            if (count != null && count == 1L) {
                redisTemplate.expire(key, Duration.ofMillis(windowMillis));
            }
            if (count != null && count > maxRequests) {
                throw new ResponseStatusException(
                        HttpStatus.TOO_MANY_REQUESTS,
                        "Rate limit exceeded: max " + maxRequests + " requests per minute"
                );
            }
            return;
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            logger.debug("Redis rate-limit failed, using local fallback: {}", e.getMessage());
        }

        enforceLocal(username, maxRequests, windowMillis);
    }

    private void enforceLocal(String username, int maxRequests, long windowMillis) {
        long now = System.currentTimeMillis();
        Deque<Long> requests = localTracker.computeIfAbsent(username, k -> new ArrayDeque<>());

        synchronized (requests) {
            while (!requests.isEmpty() && now - requests.peekFirst() > windowMillis) {
                requests.pollFirst();
            }

            if (requests.size() >= maxRequests) {
                throw new ResponseStatusException(
                        HttpStatus.TOO_MANY_REQUESTS,
                        "Rate limit exceeded: max " + maxRequests + " requests per minute"
                );
            }

            requests.addLast(now);
        }
    }
}
