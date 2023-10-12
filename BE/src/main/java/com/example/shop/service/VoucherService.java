package com.example.shop.service;

import com.example.shop.entity.Voucher;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface VoucherService {
    List<Voucher> getVouchers();
    Voucher getVoucher(String id);
    Voucher addVoucher(Voucher voucher);
    Voucher updateVoucher(Voucher voucher);
    Boolean deleteVoucher(Voucher voucher);
}
