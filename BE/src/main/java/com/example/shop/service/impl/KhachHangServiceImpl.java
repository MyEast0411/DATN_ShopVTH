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
        return (ArrayList<KhachHang>) khachHangRepository.findAll();
    }

    @Override
    public KhachHang getById(UUID id) {
        KhachHang khachHang = khachHangRepository.findById(id).orElse(null);
        return khachHang;
    }

    @Override
    public void delete(UUID id) {
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
