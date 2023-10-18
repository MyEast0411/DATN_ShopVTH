package com.example.shop.repository;

import com.example.shop.entity.NhanVien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface NhanVienRepository extends JpaRepository<NhanVien, String> {
}
