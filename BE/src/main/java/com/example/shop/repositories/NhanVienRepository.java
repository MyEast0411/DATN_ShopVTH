package com.example.shop.repositories;

import com.example.shop.entity.NhanVien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface NhanVienRepository extends JpaRepository<NhanVien,String> {

    @Query(value = "SELECT MAX(substr(ma,3)) FROM shopvth.nhan_vien",nativeQuery = true)
    String findMaxMa();
}
