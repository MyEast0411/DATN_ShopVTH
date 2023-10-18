package com.example.shop.repository;

import com.example.shop.entity.KhachHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
@Repository
public interface KhachHangRepository extends JpaRepository<KhachHang, String> {

    @Query(value = "select * from khach_hang where deleted = 0" , nativeQuery = true)
    List<KhachHang> getKhachHangsByDeleted();
}
