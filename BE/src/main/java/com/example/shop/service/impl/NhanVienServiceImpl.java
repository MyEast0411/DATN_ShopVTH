package com.example.shop.service.impl;

import com.example.shop.entity.NhanVien;
import com.example.shop.repository.NhanVienRepository;
import com.example.shop.service.NhanVienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.UUID;

@Service
public class NhanVienServiceImpl implements NhanVienService {
    @Autowired
    private NhanVienRepository nhanVienRepository;

    @Override
    public ArrayList<NhanVien> getAll() {
        return (ArrayList<NhanVien>) nhanVienRepository.findAll();
    }

    @Override
    public NhanVien getById(String id) {
        NhanVien nhanVien = nhanVienRepository.findById(id).orElse(null);
        return nhanVien;
    }

    @Override
    public void delete(String id) {
        nhanVienRepository.deleteById(id);
    }


    @Override
    public NhanVien add(NhanVien nhanVien) {
        return nhanVienRepository.save(nhanVien);
    }

    @Override
    public NhanVien update(NhanVien nhanVien) {
        return nhanVienRepository.save(nhanVien);
    }
}
