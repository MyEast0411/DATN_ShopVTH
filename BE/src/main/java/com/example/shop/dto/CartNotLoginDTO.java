package com.example.shop.dto;

import com.example.shop.entity.SanPhamChiTiet;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor

public class CartNotLoginDTO {
    private String email;
    private String hoTen;
    private String soDienThoai;
    private String duong;
    private String thanhPho;
    private String quanHuyen;
    private String xaPhuong;
    private String phuongThucThanhToan;
    private String deliveryTime;
    private String phiVanChuyen;
    private List<SanPhamChiTiet> sanPhams;
    private Integer soLuong;
    private String tongTien;
}
