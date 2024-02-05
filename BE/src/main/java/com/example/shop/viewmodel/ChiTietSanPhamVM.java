package com.example.shop.viewmodel;

import com.example.shop.entity.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChiTietSanPhamVM implements Serializable {
    private String id;
    private String maSP;
    private String ten;
    private String tenSanPham;
    private Integer soLuongTon;
    private Double khoiLuong;
    private String moTa;
    private String trangThai;
    private BigDecimal giaNhap;
    private BigDecimal giaBan;
    private String id_san_pham;
    private String id_mau_sac;
    private String id_kich_co;
    private String id_chat_lieu;
    private String id_the_loai;
    private String id_de_giay;
    private String id_thuong_hieu;
    private String id_nhan_hieu;

}
