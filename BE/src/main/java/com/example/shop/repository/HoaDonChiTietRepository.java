package com.example.shop.repository;

import com.example.shop.entity.HinhThucThanhToan;
import com.example.shop.entity.HoaDonChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HoaDonChiTietRepository extends JpaRepository<HoaDonChiTiet , String> {
    @Query("select u from HoaDonChiTiet u where u.id_hoa_don.ids = ?1")
    List<HoaDonChiTiet> getHDCT(String idHD );
}
