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

    public AuthService(CustomUserDetailsService userDetailsService,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil) {
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    /**
     * Authenticates user and generates JWT token.
     */
    public LoginResponse authenticateUser(LoginRequest request) {

        logger.info("Authenticating user: {}", request.getUsername());

        UserDetails userDetails =
                userDetailsService.loadUserByUsername(request.getUsername());

        if (!passwordEncoder.matches(request.getPassword(), userDetails.getPassword())) {
            logger.warn("Authentication failed for user: {}", request.getUsername());
            throw new BadCredentialsException("Invalid username or password");
        }

        String token = jwtUtil.generateToken(userDetails.getUsername());

        logger.info("User authenticated successfully: {}", request.getUsername());

        return new LoginResponse(token);
    }
}
