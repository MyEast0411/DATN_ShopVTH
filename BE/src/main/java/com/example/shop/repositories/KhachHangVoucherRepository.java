package com.example.shop.repositories;

import com.example.shop.entity.KhachHangVoucher;
import com.example.shop.entity.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface KhachHangVoucherRepository extends JpaRepository<KhachHangVoucher ,String> {

    @Query(value = " select id_khach_hang from khach_hang_voucher where id_voucher = :id_voucher ",nativeQuery = true)
    List<String> getKhachHangByVoucher(@Param("id_voucher")String id_voucher);
}
