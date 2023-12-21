package com.example.shop.repositories;

import com.example.shop.entity.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface SanPhamRepository extends JpaRepository<SanPham, String> {

    @Query(value = "SELECT sp FROM SanPham sp WHERE sp.deleted = 1")
    List<SanPham> getAll();
    SanPham findByMa(String ma);


    @Query(value = "select count(*) from san_pham", nativeQuery = true)
    int countAllSanPham();


}
