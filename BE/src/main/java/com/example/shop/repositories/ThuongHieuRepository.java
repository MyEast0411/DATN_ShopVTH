package com.example.shop.repositories;

import com.example.shop.entity.ThuongHieu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ThuongHieuRepository extends JpaRepository<ThuongHieu,String> {
    @Query(value = "SELECT nh FROM ThuongHieu nh WHERE nh.deleted = 1 ORDER BY nh.ngayTao DESC")
    List<ThuongHieu> getAll();

    ThuongHieu findByMa(String ma);

    Boolean existsByTen(String ten);

    Boolean existsByMa(String ma);

    @Query(value = "SELECT *\n" +
            "FROM thuong_hieu\n" +
            "WHERE deleted = :trang_thai\n" +
            "OR ten like \"%:ten%\" AND ten = ''\n" +
            "OR ma like \"%:ma%\" AND ma = '' order by ngay_tao desc", nativeQuery = true)
    List<ThuongHieu> filter(@Param("trang_thai") Integer trang_thai, @Param("ten") String ten, @Param("ma") String ma);

    @Query(value = "SELECT MAX(CAST(SUBSTRING(ma, 3) AS UNSIGNED)) as maxMa\n" +
            "FROM thuong_hieu",nativeQuery = true)
    String getMaxMa();
}
