package com.example.shop.service;

import com.example.shop.entity.HinhThucThanhToan;

import java.util.List;

public interface HinhThucThanhToanService  {
    List<HinhThucThanhToan> getHTTT(String idHD);

    List<HinhThucThanhToan> getThanhToan(String maHD);
}
