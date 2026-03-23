package com.kavyanjali.smartexpense.service;

import com.kavyanjali.smartexpense.exception.DuplicateResourceException;
import com.kavyanjali.smartexpense.exception.ResourceNotFoundException;
import com.kavyanjali.smartexpense.model.User;
import com.kavyanjali.smartexpense.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Registers a new user in the system.
     * Validates that username and email are unique before saving.
     * Encrypts the password using BCrypt before storing.
     *
     * @param user the user to register
     * @return the saved user with generated ID
     * @throws DuplicateResourceException if username or email already exists
     */
    @Transactional
    public User registerUser(User user) {
        logger.info("Attempting to register user: {}", user.getUsername());

        // Validate unique username and email
        validateUniqueUsernameAndEmail(user.getUsername(), user.getEmail());

        // Log the original password (just length for security)
        String originalPassword = user.getPassword();
        logger.info("STEP 1 - Original password length: {}", originalPassword.length());
        logger.info("STEP 2 - PasswordEncoder instance: {}", passwordEncoder.getClass().getName());

        // Hash the password before saving
        String hashedPassword = passwordEncoder.encode(originalPassword);
        logger.info("STEP 3 - Hashed password: {}", hashedPassword);
        logger.info("STEP 4 - Hashed password starts with $2a or $2b: {}", hashedPassword.startsWith("$2"));

        // Set the hashed password
        user.setPassword(hashedPassword);
        logger.info("STEP 5 - Password set on entity: {}", user.getPassword());
        logger.info("STEP 6 - Passwords match: {}", user.getPassword().equals(hashedPassword));

        // Save user to database
        User savedUser = userRepository.save(user);
        logger.info("STEP 7 - User saved with ID: {}", savedUser.getId());
        logger.info("STEP 8 - Saved user password in entity: {}", savedUser.getPassword());
        logger.info("STEP 9 - Saved user password length: {}", savedUser.getPassword().length());
        
        // Flush to ensure it's written to DB
        userRepository.flush();
        logger.info("STEP 10 - Repository flushed");

        // Fetch from database to verify
        User verifyUser = userRepository.findById(savedUser.getId()).orElse(null);
        if (verifyUser != null) {
            logger.info("STEP 11 - Password from DB: {}", verifyUser.getPassword());
            logger.info("STEP 12 - Password from DB length: {}", verifyUser.getPassword().length());
        }

        logger.info("User registered successfully with ID: {}", savedUser.getId());

        return savedUser;
    }

    /**
     * Finds a user by username.
     *
     * @param username the username to search for
     * @return Optional containing the user if found
     */
    public Optional<User> findByUsername(String username) {
        logger.debug("Finding user by username: {}", username);
        return userRepository.findByUsername(username);
    }

    /**
     * Gets a user by username.
     *
     * @param username the username to search for
     * @return the user entity
     * @throws ResourceNotFoundException if user not found
     */
    public User getUserByUsername(String username) {
        logger.debug("Getting user by username: {}", username);
        return userRepository.findByUsername(username)
                .orElseThrow(() -> {
                    logger.error("User not found with username: {}", username);
                    return new ResourceNotFoundException("User", "username", username);
                });
    }

    /**
     * Updates the risk profile for the authenticated user.
     *
     * @param username the username of the authenticated user
     * @param riskProfile the new risk profile
     * @return the updated user entity
     * @throws ResourceNotFoundException if user not found
     */
    @Transactional
    public User updateRiskProfile(String username, com.kavyanjali.smartexpense.model.RiskProfile riskProfile) {
        logger.info("Updating risk profile for user: {} to: {}", username, riskProfile);

        User user = getUserByUsername(username);
        user.setRiskProfile(riskProfile);

        User updatedUser = userRepository.save(user);
        logger.info("Risk profile updated successfully for user: {}", username);

        return updatedUser;
    }

    /**
     * Validates that both username and email are unique in the system.
     *
     * @param username the username to validate
     * @param email the email to validate
     * @throws DuplicateResourceException if username or email already exists
     */
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
}