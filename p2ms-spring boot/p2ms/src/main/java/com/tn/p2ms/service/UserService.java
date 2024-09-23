package com.tn.p2ms.service;

import com.tn.p2ms.entity.CustomUser;
import com.tn.p2ms.repository.CustomUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private CustomUserRepository userRepository;

    public String login(String email, String password) throws Exception {
        CustomUser user = userRepository.findByEmail(email);
        if (user == null) {
            throw new Exception("Utilisateur non trouvé");
        }
        if (!user.getPassword().equals(password)) {
            throw new Exception("Email ou mot de passe incorrect");
        }
        return user.getRole();
    }

    public CustomUser signUp(String email, String password, String role) throws Exception {
        if (userRepository.findByEmail(email) != null) {
            throw new Exception("Email déjà utilisé");
        }
        CustomUser newUser = new CustomUser();
        newUser.setEmail(email);
        newUser.setPassword(password);  // Consider hashing passwords
        newUser.setRole(role);
        return userRepository.save(newUser);
    }
}