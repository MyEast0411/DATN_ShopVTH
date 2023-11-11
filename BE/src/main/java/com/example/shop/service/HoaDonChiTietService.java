package com.example.shop.service;

import com.example.shop.entity.HinhThucThanhToan;
import com.example.shop.entity.HoaDonChiTiet;

import java.util.List;

public interface HoaDonChiTietService {
    List<HoaDonChiTiet> getHDCT(String idHD);
    void deleteHDCT(String idHD , String idSPCT) ;
}
