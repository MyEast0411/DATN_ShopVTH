package com.example.shop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Table(name = "san_pham_chi_tiet")
public class SanPhamChiTiet implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "ma")
    private String ma;

    @Column(name = "ten")
    private String ten;

    @Column(name = "defaultImg")
    private String defaultImg;

    @Column(name = "so_luong_ton")
    private Integer soLuongTon;

    @Column(name = "khoi_luong")
    private Double khoiLuong;

    @Column(name = "mo_ta")
    private String moTa;

    @Column(name = "trang_thai")
    private String trangThai;

    @Column(name = "gia_nhap")
    private BigDecimal giaNhap;

    @Column(name = "gia_ban")
    private BigDecimal giaBan;

    @Column(name = "ngay_tao")
    private Date ngayTao = new Date();

    @Column(name = "ngay_sua")
    private Date ngaySua;

    @Column(name = "nguoi_tao")
    private String nguoiTao;

    @Column(name = "nguoi_sua")
    private String nguoiSua;

    @Column(name = "deleted")
    private Integer deleted;

    @ManyToOne
    @JoinColumn(name = "id_san_pham")
    private SanPham id_san_pham;

    @ManyToOne
    @JoinColumn(name = "id_mau_sac")
    private MauSac id_mau_sac;

    @ManyToOne
    @JoinColumn(name = "id_kich_co")
    private KichCo id_kich_co;

    @ManyToOne
    @JoinColumn(name = "id_chat_lieu")
    private ChatLieu id_chat_lieu;

    @ManyToOne
    @JoinColumn(name = "id_the_loai")
    private TheLoai id_the_loai;

    @ManyToOne
    @JoinColumn(name = "id_de_giay")
    private DeGiay id_de_giay;

    @ManyToOne
    @JoinColumn(name = "id_thuong_hieu")
    private ThuongHieu id_thuong_hieu;

    @ManyToOne
    @JoinColumn(name = "id_nhan_hieu")
    private NhanHieu id_nhan_hieu;
}
