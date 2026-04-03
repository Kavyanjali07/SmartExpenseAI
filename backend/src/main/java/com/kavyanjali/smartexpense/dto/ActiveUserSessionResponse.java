package com.kavyanjali.smartexpense.dto;

import java.time.LocalDateTime;

public class ActiveUserSessionResponse {

    private String username;
    private int activeSessionCount;
    private LocalDateTime lastSeenAt;

    public ActiveUserSessionResponse(String username, int activeSessionCount, LocalDateTime lastSeenAt) {
        this.username = username;
        this.activeSessionCount = activeSessionCount;
        this.lastSeenAt = lastSeenAt;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getActiveSessionCount() {
        return activeSessionCount;
    }

    public void setActiveSessionCount(int activeSessionCount) {
        this.activeSessionCount = activeSessionCount;
    }

    public LocalDateTime getLastSeenAt() {
        return lastSeenAt;
    }

    public void setLastSeenAt(LocalDateTime lastSeenAt) {
        this.lastSeenAt = lastSeenAt;
    }
}
