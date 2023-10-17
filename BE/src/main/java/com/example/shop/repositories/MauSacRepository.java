package com.example.shop.repositories;

import com.example.shop.entity.MauSac;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MauSacRepository extends JpaRepository<MauSac, String> {

    MauSac findByMaMau(String maMau);
}
