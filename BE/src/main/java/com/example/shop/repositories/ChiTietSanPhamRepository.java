package com.example.shop.repositories;

import com.example.shop.entity.SanPhamChiTiet;
import com.example.shop.viewmodel.SanPhamVM;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;


public interface ChiTietSanPhamRepository extends JpaRepository<SanPhamChiTiet, String> {
    @Query(value = "SELECT b.ma, b.ten AS ten_san_pham, SUM(a.so_luong_ton) AS so_luong_ton, a.trang_thai\n" +
            "FROM san_pham_chi_tiet a\n" +
            "JOIN san_pham b ON a.id_san_pham = b.id\n" +
            "GROUP BY b.ma, b.ten, a.trang_thai\n" +
            "ORDER BY MAX(b.ngay_tao) DESC\n" +
            "LIMIT 0, 1000", nativeQuery = true)
    List<Object[]> loadTable();

    @Query(value = "select a.*\n" +
            "FROM san_pham_chi_tiet a\n" +
            "JOIN san_pham b ON a.id_san_pham = b.id\n" +
            "where b.ma = :ma", nativeQuery = true)
    List<SanPhamChiTiet> getByMa(@Param("ma") String ma);

    @Query(value = "select * from `shopvth`.`san_pham_chi_tiet`\n" +
            "where ma = :ma", nativeQuery = true)
    SanPhamChiTiet findByMa(@Param("ma") String ma);

    @Query(value = "select MAX(ma) from san_pham_chi_tiet", nativeQuery = true)
    String findMaxMa();


    //---------------Hội----------------//
    @Query(value = "SELECT c FROM SanPhamChiTiet c JOIN c.id_san_pham s WHERE s.ma IN :maList")
    List<SanPhamChiTiet> getSanPhamChiTietByMaList(@Param("maList") List<String> maList);

    @Query(value = "SELECT * FROM san_pham_chi_tiet  WHERE ma IN :maList ", nativeQuery = true)
    List<SanPhamChiTiet> getSPCTByMaSPCT(@Param("maList") List<String> maList);

    //---------------Hội----------------//

}
