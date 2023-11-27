package com.example.shop.repositories;

import com.example.shop.entity.KhachHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface KhachHangRepository extends JpaRepository<KhachHang,String> {
    @Query(value = "SELECT kh FROM KhachHang kh where kh.deleted = 1")
    List<KhachHang> getAllKh();

    KhachHang findByMa(String ma);

    @Query(value = "SELECT MAX(substr(ma,3)) FROM shopvth.khach_hang",nativeQuery = true)
    String findMaxMa();

    List<KhachHang> findAllByDeleted(int deleted);

}
