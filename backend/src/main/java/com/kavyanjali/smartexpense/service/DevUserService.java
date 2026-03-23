package com.kavyanjali.smartexpense.service;

import com.kavyanjali.smartexpense.model.User;
import com.kavyanjali.smartexpense.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class DevUserService {

    private final UserRepository userRepository;

    public DevUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getDevUser() {

        return userRepository.findAll()
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("No users exist in database"));
    }
}