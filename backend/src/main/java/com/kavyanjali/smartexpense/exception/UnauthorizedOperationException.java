package com.kavyanjali.smartexpense.exception;

public class UnauthorizedOperationException extends RuntimeException {

    public UnauthorizedOperationException(String message) {
        super(message);
    }

    public UnauthorizedOperationException(String operation, String resourceType) {
        super(String.format("You are not authorized to %s this %s", operation, resourceType));
    }

    public UnauthorizedOperationException(String message, Throwable cause) {
        super(message, cause);
    }
}