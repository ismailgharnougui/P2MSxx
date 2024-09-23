package com.tn.p2ms.controller;

import com.tn.p2ms.entity.CustomUser;
import com.tn.p2ms.entity.ErrorResponse;
import com.tn.p2ms.entity.LoginRequest;
import com.tn.p2ms.entity.LoginResponse;
import com.tn.p2ms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> userLogin(@RequestBody LoginRequest loginRequest) {
        try {
            String role = userService.login(loginRequest.getEmail(), loginRequest.getPassword());
            return ResponseEntity.ok(new LoginResponse("Connexion réussie", role));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse(e.getMessage()));
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody CustomUser user) {
        try {
            CustomUser newUser = userService.signUp(user.getEmail(), user.getPassword(), user.getRole());
            return ResponseEntity.ok(newUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));
        }
    }

}