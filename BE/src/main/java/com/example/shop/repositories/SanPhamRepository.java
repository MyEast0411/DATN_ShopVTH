package com.example.shop.repositories;

import com.example.shop.entity.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface SanPhamRepository extends JpaRepository<SanPham, String> {
    SanPham findByMa(String ma);
    @Query(value = "select MAX(ma) from san_pham",nativeQuery = true)
    String findMaxMa();


}
