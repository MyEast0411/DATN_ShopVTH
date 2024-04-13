package com.example.shop.repositories;

import com.example.shop.entity.DeGiay;
import com.example.shop.entity.NhanVien;
import com.example.shop.entity.TheLoai;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface TheLoaiRepository extends JpaRepository<TheLoai, String> {
    @Query(value = "SELECT cl FROM TheLoai cl ORDER BY cl.ngayTao DESC")
    List<TheLoai> getAll();

    TheLoai findByMa(String ma);

    Boolean existsByTen(String ten);

    Boolean existsByMa(String ma);

    @Query(value = "SELECT *\n" +
            "FROM the_loai\n" +
            "WHERE deleted = :trang_thai\n" +
            "OR ten like \"%:ten%\" AND ten = ''\n" +
            "OR ma like \"%:ma%\" AND ma = '' order by ngay_tao desc", nativeQuery = true)
    List<TheLoai> filter(@Param("trang_thai") Integer trang_thai, @Param("ten") String ten, @Param("ma") String ma);
}
