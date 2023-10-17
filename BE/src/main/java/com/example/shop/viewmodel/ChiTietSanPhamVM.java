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
    private String ma;
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

    @Override
    public String toString() {
        return "ChiTietSanPhamVM{" +
                "id='" + id + '\'' +
                ", ma='" + ma + '\'' +
                ", ten='" + ten + '\'' +
                ", tenSanPham='" + tenSanPham + '\'' +
                ", soLuongTon=" + soLuongTon +
                ", khoiLuong=" + khoiLuong +
                ", moTa='" + moTa + '\'' +
                ", trangThai='" + trangThai + '\'' +
                ", giaNhap=" + giaNhap +
                ", giaBan=" + giaBan +
                ", id_san_pham='" + id_san_pham + '\'' +
                ", id_mau_sac='" + id_mau_sac + '\'' +
                ", id_kich_co='" + id_kich_co + '\'' +
                ", id_chat_lieu='" + id_chat_lieu + '\'' +
                ", id_the_loai='" + id_the_loai + '\'' +
                ", id_de_giay='" + id_de_giay + '\'' +
                ", id_thuong_hieu='" + id_thuong_hieu + '\'' +
                ", id_nhan_hieu='" + id_nhan_hieu + '\'' +
                '}';
    }
}
