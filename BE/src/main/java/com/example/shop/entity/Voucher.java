package com.example.shop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "voucher")
public class Voucher {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "ma")
    private String ma;

    @Column(name = "code")
    private String code;

    @Column(name = "ten")
    private String ten;

    @Column(name = "gia_tri_min")
    private Double giaTriMin;

    @Column(name = "gia_tri_max")
    private Double giaTriMax;

    @Column(name = "so_luong")
    private Integer soLuong;

    @Column(name = "ngay_bat_dau")
    private Date ngayBatDau;

    @Column(name = "nguoi_ket_thuc")
    private String ngayKetThuc;

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
    @JoinColumn(name = "id_hoa_don")
    private HoaDon id_hoa_don;
}