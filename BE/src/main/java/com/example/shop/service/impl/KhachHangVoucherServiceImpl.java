package com.example.shop.service.impl;

import com.example.shop.entity.KhachHang;
import com.example.shop.entity.KhachHangVoucher;
import com.example.shop.repositories.KhachHangVoucherRepository;
import com.example.shop.service.KhachHangVoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KhachHangVoucherServiceImpl implements KhachHangVoucherService {
    @Autowired
    private KhachHangVoucherRepository repository;
    @Override
    public List<KhachHangVoucher>  saveAll(List<KhachHangVoucher> list) {
       return repository.saveAll(list);
    }

    @Override
    public List<String> getKHbyVoucher(String id) {
        return repository.getKhachHangByVoucher(id);
    }

    @Override
    public KhachHangVoucher save(KhachHangVoucher khachHangVoucher) {
        return repository.save(khachHangVoucher);
    }
}
