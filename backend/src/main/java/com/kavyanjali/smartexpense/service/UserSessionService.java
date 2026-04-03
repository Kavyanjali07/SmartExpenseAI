package com.kavyanjali.smartexpense.service;

import com.kavyanjali.smartexpense.dto.ActiveUserSessionResponse;
import com.kavyanjali.smartexpense.model.UserSession;
import com.kavyanjali.smartexpense.repository.UserSessionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Base64;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class UserSessionService {

    private final UserSessionRepository userSessionRepository;

    public UserSessionService(UserSessionRepository userSessionRepository) {
        this.userSessionRepository = userSessionRepository;
    }

    @Transactional
    public void createSession(String username, String token, java.util.Date issuedAt, java.util.Date expiresAt) {
        LocalDateTime now = LocalDateTime.now();
        UserSession session = new UserSession();
        session.setUsername(username);
        session.setTokenHash(hashToken(token));
        session.setIssuedAt(toLocalDateTime(issuedAt, now));
        session.setExpiresAt(toLocalDateTime(expiresAt, now));
        session.setLastSeenAt(now);
        userSessionRepository.save(session);
    }

    @Transactional
    public void revokeSession(String token) {
        String tokenHash = hashToken(token);
        userSessionRepository.findByTokenHash(tokenHash).ifPresent(session -> {
            if (session.getRevokedAt() == null) {
                session.setRevokedAt(LocalDateTime.now());
                userSessionRepository.save(session);
            }
        });
    }

    @Transactional
    public void touchSession(String token) {
        String tokenHash = hashToken(token);
        userSessionRepository.findByTokenHash(tokenHash).ifPresent(session -> {
            if (session.getRevokedAt() == null && session.getExpiresAt().isAfter(LocalDateTime.now())) {
                session.setLastSeenAt(LocalDateTime.now());
                userSessionRepository.save(session);
            }
        });
    }

    @Transactional(readOnly = true)
    public boolean isSessionActive(String token) {
        String tokenHash = hashToken(token);
        return userSessionRepository.findByTokenHash(tokenHash)
                .map(session -> session.getRevokedAt() == null && session.getExpiresAt().isAfter(LocalDateTime.now()))
                .orElse(false);
    }

    @Transactional(readOnly = true)
    public List<ActiveUserSessionResponse> getActiveUsers() {
        LocalDateTime now = LocalDateTime.now();
        List<UserSession> activeSessions = userSessionRepository.findByRevokedAtIsNullAndExpiresAtAfter(now);

        Map<String, List<UserSession>> sessionsByUser = activeSessions.stream()
                .collect(Collectors.groupingBy(UserSession::getUsername));

        return sessionsByUser.entrySet().stream()
                .map(entry -> {
                    String username = entry.getKey();
                    List<UserSession> sessions = entry.getValue();
                    LocalDateTime lastSeen = sessions.stream()
                            .map(UserSession::getLastSeenAt)
                            .max(Comparator.naturalOrder())
                            .orElse(now);
                    return new ActiveUserSessionResponse(username, sessions.size(), lastSeen);
                })
                .sorted(Comparator.comparing(ActiveUserSessionResponse::getLastSeenAt).reversed())
                .toList();
    }

    private LocalDateTime toLocalDateTime(java.util.Date date, LocalDateTime fallback) {
        if (date == null) {
            return fallback;
        }
        return date.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
    }

    private String hashToken(String token) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = digest.digest(token.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hashBytes);
        } catch (NoSuchAlgorithmException ex) {
            throw new IllegalStateException("SHA-256 hashing is unavailable", ex);
        }
    }
}
