package com.kavyanjali.smartexpense.service.ai;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class PromptCacheService {

    private static final Logger logger = LoggerFactory.getLogger(PromptCacheService.class);

    private final StringRedisTemplate redisTemplate;
    private final Map<String, String> localCache = new ConcurrentHashMap<>();

    @Value("${app.ai.cache-ttl-seconds:900}")
    private long cacheTtlSeconds;

    public PromptCacheService(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public String get(String prompt) {
        String key = buildKey(prompt);

        try {
            String value = redisTemplate.opsForValue().get(key);
            if (value != null) {
                return value;
            }
        } catch (Exception e) {
            logger.debug("Redis cache read failed, using local cache: {}", e.getMessage());
        }

        return localCache.get(key);
    }

    public void put(String prompt, String response) {
        String key = buildKey(prompt);

        try {
            redisTemplate.opsForValue().set(key, response, java.time.Duration.ofSeconds(cacheTtlSeconds));
        } catch (Exception e) {
            logger.debug("Redis cache write failed, using local cache: {}", e.getMessage());
            localCache.put(key, response);
        }
    }

    private String buildKey(String prompt) {
        return "ai:prompt:" + sha256(prompt);
    }

    private String sha256(String input) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(input.getBytes(StandardCharsets.UTF_8));
            StringBuilder hex = new StringBuilder();
            for (byte b : hash) {
                hex.append(String.format("%02x", b));
            }
            return hex.toString();
        } catch (Exception e) {
            return Integer.toHexString(input.hashCode());
        }
    }
}
