package com.example.shop.service.impl;

import com.example.shop.entity.HoaDonChiTiet;
import com.example.shop.repositories.HoaDonChiTietRepository;
import com.example.shop.service.HoaDonChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HoaDonChiTietServiceImpl implements HoaDonChiTietService {
    @Autowired
    private HoaDonChiTietRepository repository;




    @Override
    public List<HoaDonChiTiet> getHDCT(String idHD) {
        return repository.getHDCT(idHD);
    }

    @Override
    public void deleteHDCT(String idHD, String idSPCT) {
         repository.deleteHDCT(idHD, idSPCT);





    }
}
