package com.kavyanjali.smartexpense.service;

import com.kavyanjali.smartexpense.dto.LoginRequest;
import com.kavyanjali.smartexpense.dto.LoginResponse;
import com.kavyanjali.smartexpense.util.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private final CustomUserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final UserSessionService userSessionService;

    public AuthService(CustomUserDetailsService userDetailsService,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil,
                       UserSessionService userSessionService) {
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.userSessionService = userSessionService;
    }

    /**
     * Authenticates user and generates JWT token.
     */
    public LoginResponse authenticateUser(LoginRequest request) {
        String normalizedUsername = request.getUsername() == null ? null : request.getUsername().trim();
        if (normalizedUsername == null || normalizedUsername.isBlank()) {
            throw new BadCredentialsException("Invalid username or password");
        }
        logger.info("Authenticating user: {}", normalizedUsername);

        UserDetails userDetails =
                userDetailsService.loadUserByUsername(normalizedUsername);

        if (!passwordEncoder.matches(request.getPassword(), userDetails.getPassword())) {
            logger.warn("Authentication failed for user: {}", normalizedUsername);
            throw new BadCredentialsException("Invalid username or password");
        }

        String token = jwtUtil.generateToken(userDetails.getUsername());
        userSessionService.createSession(
                userDetails.getUsername(),
                token,
                jwtUtil.extractIssuedAt(token),
                jwtUtil.extractExpiration(token)
        );

        logger.info("User authenticated successfully: {}", normalizedUsername);

        return new LoginResponse(token);
    }
}
