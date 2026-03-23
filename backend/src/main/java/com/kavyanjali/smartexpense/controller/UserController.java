package com.kavyanjali.smartexpense.controller;

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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
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
    public ResponseEntity<UserResponse> updateRiskProfile(@Valid @RequestBody RiskProfileUpdateRequest request) {
        String username = getAuthenticatedUsername();
        
        logger.info("Received risk profile update request for user: {} with profile: {}", 
                    username, request.getRiskProfile());

        // Call service layer
        User updatedUser = userService.updateRiskProfile(username, request.getRiskProfile());

        // Convert Entity to DTO
        UserResponse response = new UserResponse();
        response.setId(updatedUser.getId());
        response.setUsername(updatedUser.getUsername());
        response.setEmail(updatedUser.getEmail());
        response.setFullName(updatedUser.getFullName());
        response.setRiskProfile(updatedUser.getRiskProfile());
        response.setCreatedAt(updatedUser.getCreatedAt());

        logger.info("Risk profile updated successfully for user: {}", username);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Extracts the authenticated username from SecurityContext.
     *
     * @return the username of the authenticated user
     */
    private String getAuthenticatedUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
}