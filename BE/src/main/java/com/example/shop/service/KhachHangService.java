package com.example.shop.service;

import com.example.shop.entity.KhachHang;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface KhachHangService {
    List<KhachHang> getKhachHangs();
    List<KhachHang> getKhachHangs(int deleted);
    KhachHang getKhachHang(String id);
    KhachHang addKhachHang(KhachHang khachHang);
    KhachHang updateKhachHang(KhachHang khachHang);

    Boolean deleteKhachHang(KhachHang khachHang);
}
