package com.kavyanjali.smartexpense.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.kavyanjali.smartexpense.dto.CsvImportResponse;
import com.kavyanjali.smartexpense.model.Expense;
import com.kavyanjali.smartexpense.model.ExpenseSource;
import com.kavyanjali.smartexpense.model.User;
import com.kavyanjali.smartexpense.repository.ExpenseRepository;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;

@Service
public class CsvImportService {

    private static final Logger logger =
            LoggerFactory.getLogger(CsvImportService.class);

    private final ExpenseRepository expenseRepository;
    private final UserService userService;

    public CsvImportService(
            ExpenseRepository expenseRepository,
            UserService userService) {

        this.expenseRepository = expenseRepository;
        this.userService = userService;
    }

    @Transactional
    public CsvImportResponse importExpenses(MultipartFile file, String username) {

        logger.info("Starting CSV import for user: {}", username);

        User user = userService.getUserByUsername(username);

        CsvImportResponse response = new CsvImportResponse();

        List<Expense> parsedExpenses = new ArrayList<>();
        List<String> sourceReferences = new ArrayList<>();

        int totalRows = 0;
        int skippedRows = 0;

        try (CSVReader csvReader =
                     new CSVReader(
                             new BufferedReader(
                                     new InputStreamReader(file.getInputStream())))) {

            List<String[]> rows = csvReader.readAll();

            if (rows.isEmpty()) {
                throw new IllegalArgumentException("CSV file is empty");
            }

            boolean headerSkipped = false;
            int rowNumber = 0;

            for (String[] row : rows) {

                rowNumber++;

                if (!headerSkipped) {
                    headerSkipped = true;
                    continue;
                }

                totalRows++;

                try {

                    Expense expense =
                            parseRow(row, rowNumber, user, file.getOriginalFilename());

                    parsedExpenses.add(expense);
                    sourceReferences.add(expense.getSourceReference());

                } catch (Exception e) {

                    skippedRows++;
                    response.addError("Row " + rowNumber + ": " + e.getMessage());
                }
            }

            // Fetch existing references
            List<String> existingRefs =
                    expenseRepository.findExistingSourceReferences(sourceReferences);

            Set<String> existingSet = new HashSet<>(existingRefs);

            List<Expense> filteredExpenses =
                    parsedExpenses.stream()
                            .filter(e -> !existingSet.contains(e.getSourceReference()))
                            .toList();

            if (!filteredExpenses.isEmpty()) {
                expenseRepository.saveAll(filteredExpenses);
            }

            response.setTotalRows(totalRows);
            response.setInsertedRows(filteredExpenses.size());
            response.setSkippedRows(skippedRows + existingRefs.size());

            logger.info(
                    "CSV import finished user={} total={} inserted={} skipped={}",
                    username,
                    response.getTotalRows(),
                    response.getInsertedRows(),
                    response.getSkippedRows());

        } catch (IOException | CsvException e) {

            logger.error("CSV import failed", e);
            throw new IllegalArgumentException("Failed to process CSV file");
        }

        return response;
    }

    private Expense parseRow(
            String[] row,
            int rowNumber,
            User user,
            String filename) {

        if (row.length < 4) {
            throw new IllegalArgumentException("Invalid column count");
        }

        BigDecimal amount = new BigDecimal(row[0].trim());

        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Amount must be > 0");
        }

        String category = row[1].trim().toLowerCase();

        if (category.isEmpty()) {
            throw new IllegalArgumentException("Category is required");
        }

        String description = row[2].trim();
        LocalDate date = LocalDate.parse(row[3].trim());

        Expense expense = new Expense();

        expense.setAmount(amount);
        expense.setCategory(category);
        expense.setDescription(description.isEmpty() ? null : description);
        expense.setExpenseDate(date);
        expense.setSourceType(ExpenseSource.CSV);
        expense.setUser(user);

        expense.setSourceReference(
                generateSourceReference(
                        user.getUsername(),
                        filename,
                        rowNumber));

        return expense;
    }

    private String generateSourceReference(
            String username,
            String filename,
            int rowNumber) {

        return username + "_" +
                filename.replaceAll("\\W+", "_") +
                "_" + rowNumber;
    }
}