package com.example.shop.service.impl;

import com.example.shop.entity.HinhThucThanhToan;
import com.example.shop.entity.HoaDonChiTiet;
import com.example.shop.repository.HinhThucThanhToanRepository;
import com.example.shop.repository.HoaDonChiTietRepository;
import com.example.shop.service.HinhThucThanhToanService;
import com.example.shop.service.HoaDonChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HoaDonChiTietSẻviceImpl implements HoaDonChiTietService {
    @Autowired
    private HoaDonChiTietRepository repository
            ;


    @Override
    public List<HoaDonChiTiet> getHDCT(String idHD) {
        return repository.getHDCT(idHD);
    }

    @Override
    public Boolean deleteHDCT(String idHD, String idSPCT) {
        return repository.deleteHDCT(idHD, idSPCT);
    }
}
