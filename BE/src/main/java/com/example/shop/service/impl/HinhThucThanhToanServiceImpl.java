package com.example.shop.service.impl;

import com.example.shop.entity.HinhThucThanhToan;
import com.example.shop.repositories.HinhThucThanhToanRepository;
import com.example.shop.service.HinhThucThanhToanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HinhThucThanhToanServiceImpl implements HinhThucThanhToanService {
    @Autowired
    private HinhThucThanhToanRepository repository;

    @Override
    public List<HinhThucThanhToan> getHTTT(String idHD) {
        return repository.getHTTH(idHD);
    }

    @Override
    public List<HinhThucThanhToan> getThanhToan(String maHD) {
        return repository.getThanhToan(maHD);
    }
}
