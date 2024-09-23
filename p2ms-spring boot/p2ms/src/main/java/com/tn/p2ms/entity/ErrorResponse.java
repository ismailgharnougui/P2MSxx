package com.tn.p2ms.entity;

import lombok.Getter;

@Getter
public class ErrorResponse {
    // Getter
    private String error;

    public ErrorResponse(String error) {
        this.error = error;
    }

}