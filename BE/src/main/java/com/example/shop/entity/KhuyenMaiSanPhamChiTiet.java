package com.example.shop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "khuyen_mai_spct")
@IdClass(KhuyenMaiSanPhamChiTietId.class)
public class KhuyenMaiSanPhamChiTiet {
    @Id
    @ManyToOne
    @JoinColumn(name = "id_khuyen_mai")
    private KhuyenMai id_khuyen_mai;

    @Id
    @ManyToOne
    @JoinColumn(name = "id_chi_tiet_san_pham")
    private SanPhamChiTiet id_chi_tiet_san_pham;

    @Column(name = "gia_cu")
    private BigDecimal giaCu;

    @Column(name = "gia_moi")
    private BigDecimal giaMoi;

    @Column(name = "giam_gia")
    private Double giamGia;

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
}
