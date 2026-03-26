package com.kavyanjali.smartexpense.service;

import com.kavyanjali.smartexpense.exception.DuplicateResourceException;
import com.kavyanjali.smartexpense.exception.ResourceNotFoundException;
import com.kavyanjali.smartexpense.model.RiskProfile;
import com.kavyanjali.smartexpense.model.User;
import com.kavyanjali.smartexpense.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Locale;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    private static final Set<String> ALLOWED_GOALS = Set.of("SAVE", "CONTROL_SPENDING", "INVEST");

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public User registerUser(User user) {
        logger.info("Attempting to register user: {}", user.getUsername());

        validateUniqueUsernameAndEmail(user.getUsername(), user.getEmail());
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser = userRepository.save(user);

        logger.info("User registered successfully with ID: {}", savedUser.getId());

        return savedUser;
    }

    public Optional<User> findByUsername(String username) {
        logger.debug("Finding user by username: {}", username);
        return userRepository.findByUsername(username);
    }

    public User getUserByUsername(String username) {
        logger.debug("Getting user by username: {}", username);
        return userRepository.findByUsername(username)
                .orElseThrow(() -> {
                    logger.error("User not found with username: {}", username);
                    return new ResourceNotFoundException("User", "username", username);
                });
    }

    @Transactional
    public User updateRiskProfile(String username, RiskProfile riskProfile) {
        logger.info("Updating risk profile for user: {} to: {}", username, riskProfile);

        User user = getUserByUsername(username);
        user.setRiskProfile(riskProfile);

        User updatedUser = userRepository.save(user);
        logger.info("Risk profile updated successfully for user: {}", username);

        return updatedUser;
    }

    @Transactional
    public User updateProfile(String username, Double income, Double budget, String goal) {
        logger.info("Updating profile for user: {}", username);

        User user = getUserByUsername(username);
        user.setMonthlyIncome(income);
        user.setMonthlyBudget(budget);
        user.setPrimaryGoal(normalizeGoal(goal));

        return userRepository.save(user);
    }

    public void validateUniqueUsernameAndEmail(String username, String email) {
        if (userRepository.existsByUsername(username)) {
            logger.warn("Registration failed: Username already exists: {}", username);
            throw new DuplicateResourceException("User", "username", username);
        }

        if (userRepository.existsByEmail(email)) {
            logger.warn("Registration failed: Email already exists: {}", email);
            throw new DuplicateResourceException("User", "email", email);
        }
    }

    private String normalizeGoal(String goal) {
        if (goal == null || goal.isBlank()) {
            throw new IllegalArgumentException("Goal is required");
        }

        String normalizedGoal = goal.trim().toUpperCase(Locale.ROOT);
        if (!ALLOWED_GOALS.contains(normalizedGoal)) {
            throw new IllegalArgumentException("Goal must be one of: SAVE, CONTROL_SPENDING, INVEST");
        }

        return normalizedGoal;
    }
}
