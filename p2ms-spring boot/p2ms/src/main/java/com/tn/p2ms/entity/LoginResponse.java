package com.tn.p2ms.entity;

public class LoginResponse {
    private String message;
    private String role;

    public LoginResponse(String message, String role) {
        this.message = message;
        this.role = role;
    }

    // Getters
    public String getMessage() {
        return message;
    }

    public String getRole() {
        return role;
    }
}
