package com.example.shop.service;

import com.example.shop.entity.LichSuHoaDon;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface LichSuHoaDonService {
    List<LichSuHoaDon> getLichSuHoaDons();
    LichSuHoaDon getLichSuHoaDon(String id);
    LichSuHoaDon addLichSuHoaDon(LichSuHoaDon lichSuHoaDon);
    LichSuHoaDon updateLichSuHoaDon(LichSuHoaDon lichSuHoaDon);
    Boolean deleteLichSuHoaDon(LichSuHoaDon lichSuHoaDon);
}
