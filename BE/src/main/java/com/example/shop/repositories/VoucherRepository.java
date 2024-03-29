package com.example.shop.repositories;

import com.example.shop.entity.KhachHangVoucher;
import com.example.shop.entity.SanPhamChiTiet;
import com.example.shop.entity.Voucher;
import com.example.shop.response.VoucherOfKhachHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Time;
import java.util.Date;
import java.util.List;

@Repository
public interface VoucherRepository extends JpaRepository<Voucher , String> {

    List<Voucher> getVoucherByDeleted(int deleted);
    Voucher getVoucherByCode(String code);
    @Query(value = " select * from voucher where :giaTriMin >= gia_tri_min and deleted = 0",nativeQuery = true)
    List<Voucher> getVoucherByGiaTriMin(@Param("giaTriMin")Double giaTriMin);
//    @Query(value = "select a.*\n" +
//            "FROM san_pham_chi_tiet a\n" +
//            "JOIN san_pham b ON a.id_san_pham = b.id\n" +
//            "where b.ma = :ma", nativeQuery = true)
//    List<SanPhamChiTiet> getByMa(@Param("ma") String ma);
//    @Query(
//            value = "select * from voucher vc where vc.ngay_ket_thuc = :date" ,
//            nativeQuery = true
//    )
//    List<Voucher> voucherByNgayKT(@Param("date")Date date);

    @Query(value = "select * from voucher where gia_tri_min > :price and deleted = 1", nativeQuery = true)
    List<Voucher> getVoucherByPrice(@Param("price")Double price);

    @Query(value = """
        SELECT *
        FROM voucher
        WHERE deleted = 0 AND trang_thai = :trang_thai\s
            AND gia_tri_max >= :gia - 5000 AND gia_tri_max <= :gia + 5000
            OR (ten LIKE '%:ten%' AND ten = '' AND ten = null)
            OR (code LIKE '%:code%' AND code = '' AND code = null)
        ORDER BY ngay_tao DESC
    """,nativeQuery = true)
    List<Voucher> filter(@Param("trang_thai") Integer trang_thai, @Param("ten") String ten, @Param("code") String code,@Param("gia")Integer gia);

    @Query(value = """
        SELECT *
        FROM voucher
        WHERE deleted = 0 AND (trang_thai = 1 OR trang_thai = 0)\s
            AND gia_tri_max >= :gia - 5000 AND gia_tri_max <= :gia + 5000
            OR (ten LIKE '%:ten%' AND ten = '' AND ten = null)
            OR (code LIKE '%:code%' AND code = '' AND code = null)
        ORDER BY ngay_tao DESC
    """,nativeQuery = true)
    List<Voucher> filterByTrangThai(@Param("ten") String ten, @Param("code") String code,@Param("gia")Integer gia);


    @Query(value = "    select c.id AS idVoucher, c.ten AS tenVoucher, c.gia_tri_min as giaTriMin, c.gia_tri_max as giaTriMax, c.ngay_ket_thuc as ngayKetThuc\n" +
            "    from khach_hang_voucher a join khach_hang b on a.id_khach_hang = b.id join voucher c on a.id_voucher = c.id\n" +
            "    where b.id = :id_khach_hang",nativeQuery = true)
    List<VoucherOfKhachHang> getVoucherByIdKhachHang(@Param("id_khach_hang")String id_khach_hang);

}
