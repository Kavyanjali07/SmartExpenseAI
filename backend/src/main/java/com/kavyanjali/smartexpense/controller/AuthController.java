package com.kavyanjali.smartexpense.controller;

import com.kavyanjali.smartexpense.dto.LoginRequest;
import com.kavyanjali.smartexpense.dto.LoginResponse;
import com.kavyanjali.smartexpense.dto.UserRegistrationRequest;
import com.kavyanjali.smartexpense.dto.UserResponse;
import com.kavyanjali.smartexpense.model.User;
import com.kavyanjali.smartexpense.service.AuthService;
import com.kavyanjali.smartexpense.service.UserSessionService;
import com.kavyanjali.smartexpense.service.UserService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final AuthService authService;
    private final UserService userService;
    private final UserSessionService userSessionService;

    public AuthController(AuthService authService, UserService userService, UserSessionService userSessionService) {
        this.authService = authService;
        this.userService = userService;
        this.userSessionService = userSessionService;
    }

    /**
     * Registers a new user.
     *
     * @param request the user registration request
     * @return the created user response with HTTP 201 Created
     */
    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody UserRegistrationRequest request) {
        return registerUser(request);
    }

    @PostMapping("/signup")
    public ResponseEntity<UserResponse> signup(@Valid @RequestBody UserRegistrationRequest request) {
        return registerUser(request);
    }

    private ResponseEntity<UserResponse> registerUser(UserRegistrationRequest request) {
        logger.info("Registration attempt for username: {}", request.getUsername());

        // Convert DTO to Entity
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setFullName(request.getFullName());

        // Call service layer - password will be hashed here
        User savedUser = userService.registerUser(user);

        // Convert Entity to DTO (no password in response)
        UserResponse response = new UserResponse(
                savedUser.getId(),
                savedUser.getUsername(),
                savedUser.getEmail(),
                savedUser.getFullName(),
                savedUser.getRiskProfile(),
                savedUser.getMonthlyIncome(),
                savedUser.getMonthlyBudget(),
                savedUser.getPrimaryGoal(),
                savedUser.getCreatedAt()
        );

        logger.info("User registered successfully: {}", savedUser.getUsername());

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * Authenticates a user and returns JWT token.
     *
     * @param request the login request
     * @return the JWT token with HTTP 200 OK
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        logger.info("Login attempt for username: {}", request.getUsername());

        // Call auth service - throws BadCredentialsException on failure
        LoginResponse response = authService.authenticateUser(request);

        logger.info("Login successful for username: {}", request.getUsername());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        String token = extractBearerToken(authHeader);
        if (token != null) {
            userSessionService.revokeSession(token);
        }
        return ResponseEntity.noContent().build();
    }

    private String extractBearerToken(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }
        return authHeader.substring(7).trim();
    }
}
