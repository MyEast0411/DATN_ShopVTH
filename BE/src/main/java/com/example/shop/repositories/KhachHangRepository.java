package com.example.shop.repositories;

import com.example.shop.entity.KhachHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface KhachHangRepository extends JpaRepository<KhachHang,String> {
    @Query(value = "SELECT kh FROM KhachHang kh where kh.deleted = 1 order by kh.ngayTao desc")
    List<KhachHang> getAllKh();

    @Query(value = "SELECT kh FROM KhachHang kh where kh.ma = :ma and kh.deleted = 1")
    KhachHang findByMa(@Param("ma") String ma);

    @Query(value = "SELECT MAX(substr(ma,3)) FROM khach_hang",nativeQuery = true)
    String findMaxMa();

    List<KhachHang> findAllByDeleted(int deleted);
    //query login -- hienvuong
    @Query(value = "select * from khach_hang where email= :email",nativeQuery = true)
    List<KhachHang> findEmail(@Param("email")String email);

    @Query(value = "select * from khach_hang where email= :email && mat_khau= :matKhau",nativeQuery = true)
    KhachHang login(@Param("email")String email, @Param("matKhau")String matKhau);

    @Query(value = "SELECT *\n" +
            "            \tFROM khach_hang\n" +
            "            \tWHERE deleted = 1 AND trang_thai = :trang_thai\n" +
            "            \tOR ten like \"%:ten%\" AND ten = ''\n" +
            "                OR email like \"%:email%\" AND email = '' order by ngay_tao desc", nativeQuery = true)
    List<KhachHang> filter(@Param("trang_thai") Integer trang_thai, @Param("ten") String ten, @Param("email") String email);

    @Query(value = "select * from khach_hang where trang_thai = :trang_thai AND deleted = 1", nativeQuery = true)
    List<KhachHang> filterByTrangThai(@Param("trang_thai") Integer trang_thai);

}
