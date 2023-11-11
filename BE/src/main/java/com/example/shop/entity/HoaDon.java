package com.example.shop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "hoa_don")
public class HoaDon {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "sdt")
    private String sdt;

    @Column(name = "dia_chi")
    private String diaChi;

    @Column(name = "ma")
    private String ma;

    @Column(name = "ho_ten")
    private String tenKhachHang;

    @Column(name = "tien_giam")
    private String tienGiam;

    @Column(name = "tong_tien")
    private BigDecimal tongTien;

    @Column(name = "ngay_xac_nhan")
    private Date ngayXacNhan;

    @Column(name = "ngay_ship")
    private Date ngayShip;

    @Column(name = "ngay_nhan")
    private Date ngayNhan;

    @Column(name = "ngay_muon_nhan")
    private Date ngayMuonNhan;

    @Column(name = "loai_hd")
    private Integer loaiHd;

    @Column(name = "tien_ship")
    private BigDecimal tienShip;

    @Column(name = "trang_thai")
    private Integer trangThai;

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
    @JoinColumn(name = "id_nhan_vien")
    private NhanVien id_nhan_vien;

}
