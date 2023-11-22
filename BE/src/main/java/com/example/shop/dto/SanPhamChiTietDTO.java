package com.example.shop.dto;

import com.example.shop.entity.SanPhamChiTiet;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SanPhamChiTietDTO {
    private int id;
    private int soLuong;
    private SanPhamChiTiet sanPhamChiTiet;
}
