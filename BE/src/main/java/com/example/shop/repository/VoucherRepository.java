package com.example.shop.repository;

import com.example.shop.entity.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoucherRepository extends JpaRepository<Voucher , String> {

    List<Voucher> getVoucherByDeleted(int deleted);
}
