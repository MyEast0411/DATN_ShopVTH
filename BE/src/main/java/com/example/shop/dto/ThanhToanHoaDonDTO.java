package com.example.shop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ThanhToanHoaDonDTO {
    private String tenKhachHang;
    private String sdt;
    private String maKH;
    private String soTien;
    private String tongTien;
    private String diaChi;
    private String loaiHd;
    private String trangThai;
}
