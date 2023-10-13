package com.example.shop.repositories;

import com.example.shop.entity.NhanHieu;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface NhanHieuRepository extends JpaRepository<NhanHieu, String> {
}
