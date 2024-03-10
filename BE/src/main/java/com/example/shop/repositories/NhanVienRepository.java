package com.example.shop.repositories;

import com.example.shop.entity.ChucVu;
import com.example.shop.entity.KhachHang;
import com.example.shop.entity.NhanVien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NhanVienRepository extends JpaRepository<NhanVien,String> {
    @Query(value = "SELECT nv FROM NhanVien nv WHERE nv.deleted = 1 order by nv.ngayTao desc")
    List<NhanVien> getAllNhanVien();
    @Query(value = "SELECT nv FROM NhanVien nv where nv.ma = :ma and nv.deleted = 1")
    NhanVien findByMa(String ma);
    @Query(value = "SELECT MAX(substr(ma,3)) FROM shopvth.nhan_vien",nativeQuery = true)
    String findMaxMa();

    @Query(value = "SELECT *\n" +
            "            \tFROM nhan_vien\n" +
            "            \tWHERE deleted = 1 AND trang_thai = :trang_thai\n" +
            "            \tOR ten like \"%:ten%\" AND ten = ''\n" +
            "                OR email like \"%:email%\" AND email = '' order by ngay_tao desc", nativeQuery = true)
    List<NhanVien> filter(@Param("trang_thai") Integer trang_thai, @Param("ten") String ten, @Param("email") String email);
}
