package com.example.shop.repositories;

import com.example.shop.entity.KhuyenMai;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KhuyenMaiRepository extends JpaRepository<KhuyenMai, String> {
    List<KhuyenMai> findAll();
    KhuyenMai findByMa(String ma);
}
