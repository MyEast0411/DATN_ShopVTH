package com.example.shop.repositories;

import com.example.shop.entity.SanPhamChiTiet;
import com.example.shop.entity.Voucher;
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
}
