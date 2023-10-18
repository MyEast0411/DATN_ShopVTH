package com.example.shop.repository;

import com.example.shop.entity.DiaChi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface DiaChiRepository extends JpaRepository<DiaChi, String> {
}
