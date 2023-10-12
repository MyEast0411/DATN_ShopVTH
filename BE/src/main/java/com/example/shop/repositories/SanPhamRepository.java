package com.example.shop.repositories;

import com.example.shop.entity.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SanPhamRepository extends JpaRepository<SanPham, UUID> {
    SanPham findByMa(String ma);
}
