package com.example.shop.service.impl;


import com.example.shop.entity.KhachHang;
import com.example.shop.repositories.KhachHangRepository;
import com.example.shop.service.KhachHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class KhachHangServiceImpl implements KhachHangService {

    @Autowired
    private KhachHangRepository khachHangRepository;


    @Override
    public List<KhachHang> getKhachHangs() {
        return khachHangRepository.findAll();
    }

    @Override
    public List<KhachHang> getKhachHangs(int deleted) {
        return khachHangRepository.findAllByDeleted(0);
    }

    @Override
    public KhachHang getKhachHang(String id) {
        return khachHangRepository.findById(id).orElse(null);
    }

    @Override
    public KhachHang addKhachHang(KhachHang khachHang) {
        return khachHangRepository.save(khachHang);
    }

    @Override
    public KhachHang updateKhachHang(KhachHang khachHang) {
        return khachHangRepository.save(khachHang);
    }


    @Override
    public Boolean deleteKhachHang(KhachHang khachHang) {
        try {
            khachHangRepository.delete(khachHang);
            return true;
        }catch (Exception exception){
            exception.printStackTrace();
            return false;
        }
    }
}
