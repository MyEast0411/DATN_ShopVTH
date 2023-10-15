package com.example.shop.repositories;

import com.example.shop.entity.TheLoai;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TheLoaiRepository extends JpaRepository<TheLoai, String> {
}
