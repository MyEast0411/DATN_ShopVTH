package com.example.shop.service;

import com.example.shop.entity.KhachHang;
import com.example.shop.entity.KhachHangVoucher;

import java.util.List;

public interface KhachHangVoucherService {

    List<KhachHangVoucher> saveAll(List<KhachHangVoucher> list);

    List<String> getKHbyVoucher(String id);

    KhachHangVoucher save(KhachHangVoucher khachHangVoucher);

}
