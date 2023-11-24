package com.example.shop.dto;

import com.example.shop.entity.KhachHang;
import com.example.shop.entity.NhanVien;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HoaDonCTTDTO {
    private String ma;
    private KhachHang idKhachHang;
    private NhanVien idNhanVien;
    private Integer soLuong;
    private Integer loaiHd;
    private Integer trangThai;
}
