package com.kavyanjali.smartexpense.controller;

import com.kavyanjali.smartexpense.dto.ActiveUserSessionResponse;
import com.kavyanjali.smartexpense.service.UserSessionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminSessionController {

    private final UserSessionService userSessionService;

    public AdminSessionController(UserSessionService userSessionService) {
        this.userSessionService = userSessionService;
    }

    @GetMapping("/active-users")
    public ResponseEntity<List<ActiveUserSessionResponse>> getActiveUsers(Authentication authentication) {
        if (authentication == null
                || authentication.getName() == null
                || authentication.getName().isBlank()
                || "anonymousUser".equals(authentication.getName())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }

        return ResponseEntity.ok(userSessionService.getActiveUsers());
    }
}
