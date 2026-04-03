package com.kavyanjali.smartexpense.repository;

import com.kavyanjali.smartexpense.model.UserSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface UserSessionRepository extends JpaRepository<UserSession, Long> {

    Optional<UserSession> findByTokenHash(String tokenHash);

    List<UserSession> findByRevokedAtIsNullAndExpiresAtAfter(LocalDateTime now);
}
