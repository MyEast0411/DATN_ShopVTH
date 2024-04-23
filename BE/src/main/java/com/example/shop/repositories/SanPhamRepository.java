package com.example.shop.repositories;

import com.example.shop.entity.SanPham;
import com.example.shop.response.FilterSanPhamResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface SanPhamRepository extends JpaRepository<SanPham, String> {
    @Query(value = "SELECT MAX(CAST(SUBSTRING(ma, 3) AS UNSIGNED)) as maxMa\n" +
            "FROM san_pham",nativeQuery = true)
    String getMaxMa();
    @Query(value = "SELECT sp FROM SanPham sp WHERE sp.deleted = 1")
    List<SanPham> getAll();
    @Query(value = """
        SELECT b.*
        FROM san_pham_chi_tiet a
        JOIN san_pham b ON a.id_san_pham = b.id
        WHERE b.deleted = 1
        AND ((a.gia_ban >= :toPrice AND a.gia_ban <= :fromPrice) OR :toPrice IS NULL OR :fromPrice IS NULL)
        OR (a.id_mau_sac in :id_mau_sac)
        OR (a.id_thuong_hieu in :id_thuong_hieu)
        OR (a.id_the_loai in :id_the_loai)
        GROUP BY b.id
    """, nativeQuery = true)
    List<SanPham> filterSPClient(
            @Param("id_thuong_hieu") List<String> id_thuong_hieu,
            @Param("id_mau_sac") List<String> id_mau_sac,
            @Param("id_the_loai") List<String> id_the_loai,
            @Param("fromPrice") Double price,
            @Param("toPrice") Double toPrice
    );

    SanPham findByMa(String ma);

    @Query(value = "select count(*) from san_pham", nativeQuery = true)
    int countAllSanPham();

    @Query(value = "SELECT b.ma AS maSanPham, b.ten AS tenSanPham, SUM(a.so_luong_ton) AS soLuongTon, b.deleted AS status\n" +
            "FROM san_pham_chi_tiet a\n" +
            "JOIN san_pham b ON a.id_san_pham = b.id\n" +
            "WHERE b.deleted = :status OR b.ma LIKE '%:ma%' OR b.ten LIKE '%:ten%'\n" +
            "GROUP BY b.ma, b.ten, b.deleted\n" +
            "HAVING soLuongTon >= :soLuongTon - 10 AND soLuongTon <= :soLuongTon + 10\n" +
            "ORDER BY MAX(b.ngay_tao) DESC\n" +
            "LIMIT 0, 1000;", nativeQuery = true)
    List<FilterSanPhamResponse> filterByTrangThai(@Param("ma") String ma, @Param("ten")String ten, @Param("status")Integer status, @Param("soLuongTon")Integer soLuongTon);

    @Query(value = "SELECT b.ma AS maSanPham, b.ten AS tenSanPham, SUM(a.so_luong_ton) AS soLuongTon, b.deleted AS status\n" +
            "FROM san_pham_chi_tiet a\n" +
            "JOIN san_pham b ON a.id_san_pham = b.id\n" +
            "WHERE b.deleted = 1 OR b.deleted = 0 OR b.ma LIKE '%:ma%' OR b.ten LIKE '%:ten%'\n" +
            "GROUP BY b.ma, b.ten, b.deleted\n" +
            "HAVING soLuongTon >= :soLuongTon - 10 AND soLuongTon <= :soLuongTon + 10\n" +
            "ORDER BY MAX(b.ngay_tao) DESC\n" +
            "LIMIT 0, 1000;", nativeQuery = true)
    List<FilterSanPhamResponse> filterBySoLuongTon(@Param("ma") String ma, @Param("ten")String ten, @Param("soLuongTon")Integer soLuongTon);
}
