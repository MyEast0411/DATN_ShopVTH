package com.example.shop.repositories;

import com.example.shop.entity.ThuongHieu;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ThuongHieuRepository extends JpaRepository<ThuongHieu,String> {
}
