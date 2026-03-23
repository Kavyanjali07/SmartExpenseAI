package com.kavyanjali.smartexpense.controller;

import com.kavyanjali.smartexpense.dto.CsvImportResponse;
import com.kavyanjali.smartexpense.service.CsvImportService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/expenses")
public class CsvImportController {

    private static final Logger logger = LoggerFactory.getLogger(CsvImportController.class);

    private final CsvImportService csvImportService;

    public CsvImportController(CsvImportService csvImportService) {
        this.csvImportService = csvImportService;
    }

    /**
     * Imports expenses from a CSV file for the authenticated user.
     */
    @PostMapping("/import")
    public ResponseEntity<CsvImportResponse> importExpenses(
            @RequestParam("file") MultipartFile file) {

        String username = getAuthenticatedUsername();

        logger.info("CSV import request received from user: {}", username);

        CsvImportResponse response =
                csvImportService.importExpenses(file, username);

        logger.info(
                "CSV import completed for user: {} | total={}, inserted={}, skipped={}",
                username,
                response.getTotalRows(),
                response.getInsertedRows(),
                response.getSkippedRows()
        );

        return ResponseEntity.ok(response);
    }

    private String getAuthenticatedUsername() {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
}