package com.tn.p2ms.repository;

import com.tn.p2ms.entity.CustomUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomUserRepository extends JpaRepository<CustomUser, Long> {
    CustomUser findByEmail(String email);
}