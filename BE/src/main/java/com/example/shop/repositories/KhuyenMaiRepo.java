package com.example.shop.repositories;

import com.example.shop.entity.KhuyenMai;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface KhuyenMaiRepo extends JpaRepository<KhuyenMai, UUID> {
    List<KhuyenMai> findAll();

}
