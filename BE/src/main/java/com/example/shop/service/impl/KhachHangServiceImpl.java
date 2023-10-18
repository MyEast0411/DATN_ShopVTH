package com.example.shop.service.impl;

import com.example.shop.entity.KhachHang;
import com.example.shop.repository.KhachHangRepository;
import com.example.shop.service.KhachHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.UUID;

@Service
public class KhachHangServiceImpl implements KhachHangService {
    @Autowired
    private KhachHangRepository khachHangRepository;

    @Override
    public ArrayList<KhachHang> getAll() {
        return (ArrayList<KhachHang>) khachHangRepository.getKhachHangsByDeleted();
    }

    @Override
    public KhachHang getById(String id) {
        KhachHang khachHang = khachHangRepository.findById(id).orElse(null);

        return khachHang;
    }

    @Override
    public void delete(String id) {
        khachHangRepository.deleteById(id);
    }


    @Override
    public KhachHang add(KhachHang khachHang) {
        return khachHangRepository.save(khachHang);
    }

    @Override
    public KhachHang update(KhachHang khachHang) {
        return khachHangRepository.save(khachHang);
    }
}
