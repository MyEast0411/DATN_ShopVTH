package com.example.shop.service;


import com.example.shop.entity.KhachHang;

import java.util.ArrayList;
import java.util.UUID;

public interface KhachHangService {
    ArrayList<KhachHang> getAll();
    KhachHang getById(UUID id);

    void delete(UUID id);
    KhachHang add(KhachHang khachHang);
    KhachHang update(KhachHang khachHang);
}
