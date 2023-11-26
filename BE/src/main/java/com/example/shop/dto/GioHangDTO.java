package com.example.shop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GioHangDTO {
    private String hoTen;
    private String sdt;
    private String diaChi;
    private String thanhPho;
    private String huyen;
    private String xa;
    private String hinhThucThanhToan;
    private List<Object> gioHang;
    private String tongTien;
    private String email;
    private String thoiGianNhanHang;
    private String phiShip;
}
