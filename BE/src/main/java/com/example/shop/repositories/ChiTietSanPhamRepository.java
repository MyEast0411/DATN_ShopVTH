package com.example.shop.repositories;

import com.example.shop.entity.SanPhamChiTiet;
import com.example.shop.viewmodel.SanPhamVM;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface ChiTietSanPhamRepository extends JpaRepository<SanPhamChiTiet, String> {
    @Query(value = "SELECT b.ma,b.ten AS ten_san_pham, SUM(a.so_luong_ton) AS so_luong_ton,a.trang_thai\n" +
            "FROM san_pham_chi_tiet a\n" +
            "JOIN san_pham b ON a.id_san_pham = b.id\n" +
            "GROUP BY b.ten,b.ma,a.trang_thai",nativeQuery = true)
    List<Object[]> loadTable();
}
