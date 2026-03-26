package com.kavyanjali.smartexpense.controller;

import com.kavyanjali.smartexpense.dto.ProfileUpdateRequest;
import com.kavyanjali.smartexpense.dto.RiskProfileUpdateRequest;
import com.kavyanjali.smartexpense.dto.UserResponse;
import com.kavyanjali.smartexpense.model.User;
import com.kavyanjali.smartexpense.service.UserService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping({"/users", "/user"})
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Updates the risk profile of the authenticated user.
     *
     * @param request the risk profile update request
     * @return the updated user response with HTTP 200 OK
     */
    @PutMapping("/risk-profile")
    public ResponseEntity<UserResponse> updateRiskProfile(
            Authentication authentication,
            @Valid @RequestBody RiskProfileUpdateRequest request) {
        String username = getAuthenticatedUsername(authentication);
        
        logger.info("Received risk profile update request for user: {} with profile: {}", 
                    username, request.getRiskProfile());

        // Call service layer
        User updatedUser = userService.updateRiskProfile(username, request.getRiskProfile());

        // Convert Entity to DTO
        UserResponse response = toUserResponse(updatedUser);

        logger.info("Risk profile updated successfully for user: {}", username);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/profile")
    public ResponseEntity<UserResponse> updateProfile(
            Authentication authentication,
            @Valid @RequestBody ProfileUpdateRequest request) {

        String username = getAuthenticatedUsername(authentication);
        logger.info("Received profile update request for user: {}", username);

        User updatedUser = userService.updateProfile(
                username,
                request.getIncome(),
                request.getBudget(),
                request.getGoal()
        );

        return ResponseEntity.ok(toUserResponse(updatedUser));
    }

    @GetMapping("/profile")
    public ResponseEntity<UserResponse> getProfile(Authentication authentication) {
        String username = getAuthenticatedUsername(authentication);
        User user = userService.getUserByUsername(username);
        return ResponseEntity.ok(toUserResponse(user));
    }

    private UserResponse toUserResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getFullName(),
                user.getRiskProfile(),
                user.getMonthlyIncome(),
                user.getMonthlyBudget(),
                user.getPrimaryGoal(),
                user.getCreatedAt()
        );
    }

    /**
     * Extracts the authenticated username from SecurityContext.
     *
     * @return the username of the authenticated user
     */
    private String getAuthenticatedUsername(Authentication authentication) {
        if (authentication == null
                || authentication.getName() == null
                || authentication.getName().isBlank()
                || "anonymousUser".equals(authentication.getName())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }
        return authentication.getName();
    }
}
