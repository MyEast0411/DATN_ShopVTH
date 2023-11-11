package com.example.shop.service;

import com.example.shop.entity.ThanhToan;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ThanhToanService {
    List<ThanhToan> getThanhToans();
    ThanhToan getThanhToan(String id);
    ThanhToan addThanhToan(ThanhToan thanhToan);
    ThanhToan updateThanhToan(ThanhToan thanhToan);
    Boolean deleteThanhToan(ThanhToan thanhToan);
}
