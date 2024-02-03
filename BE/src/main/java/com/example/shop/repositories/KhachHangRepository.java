package com.example.shop.repositories;

import com.example.shop.entity.KhachHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface KhachHangRepository extends JpaRepository<KhachHang,String> {
    @Query(value = "SELECT kh FROM KhachHang kh where kh.deleted = 1")
    List<KhachHang> getAllKh();

    KhachHang findByMa(String ma);

    @Query(value = "SELECT MAX(substr(ma,3)) FROM shopvth.khach_hang",nativeQuery = true)
    String findMaxMa();

    List<KhachHang> findAllByDeleted(int deleted);

    @Query(value = "select * from khach_hang where email= :email ",nativeQuery = true)
    List<KhachHang> findEmail(@Param("email")String email);
    @Query(value = "select * from khach_hang where email= :email && mat_khau= :matKhau",nativeQuery = true)
    KhachHang login(@Param("email")String email, @Param("matKhau")String matKhau);

    @Query(value = "select * from khach_hang where trang_thai = :trang_thai AND (khach_hang.ten like %:ten% OR khach_hang.ten = '')" +
            " AND (khach_hang.email like %:email% OR khach_hang.email = '')", nativeQuery = true)
    List<KhachHang> filter(@Param("trang_thai") Integer trang_thai, @Param("ten") String ten, @Param("email") String email);

    @Query(value = "select * from khach_hang where trang_thai = :trang_thai", nativeQuery = true)
    List<KhachHang> filterByTrangThai(@Param("trang_thai") Integer trang_thai);

}
