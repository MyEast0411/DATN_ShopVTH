package com.example.shop.repositories;

import com.example.shop.entity.HinhThucThanhToan;
import com.example.shop.entity.HoaDon;
import com.example.shop.service.HinhThucThanhToanService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HinhThucThanhToanRepository extends JpaRepository<HinhThucThanhToan, String> {

    @Query("select u from HinhThucThanhToan u where u.id_hoa_don.id = ?1")
    List<HinhThucThanhToan> getHTTH(String idHD );

    @Query("select u from HinhThucThanhToan u where u.id_hoa_don.ma = ?1")
    List<HinhThucThanhToan> getThanhToan(String maHD);
}
