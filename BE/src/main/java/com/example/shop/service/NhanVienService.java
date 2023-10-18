package com.example.shop.service;



import com.example.shop.entity.NhanVien;

import java.util.ArrayList;
import java.util.UUID;

public interface NhanVienService {
    ArrayList<NhanVien> getAll();
    NhanVien getById(String id);

    void delete(String id);
    NhanVien add(NhanVien nhanVien);
    NhanVien update(NhanVien nhanVien);
}
