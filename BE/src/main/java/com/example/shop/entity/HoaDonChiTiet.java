package com.example.shop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "hoa_don_chi_tiet")
@IdClass(HoaDonChiTietId.class)
public class HoaDonChiTiet {
    @Id
    @ManyToOne
    @JoinColumn(name = "id_hoa_don")
    private HoaDon id_hoa_don;

    @Id
    @ManyToOne
    @JoinColumn(name = "id_chi_tiet_san_pham")
    private SanPhamChiTiet id_chi_tiet_san_pham;

    @Column(name = "gia_tien")
    private BigDecimal giaTien;

    @Column(name = "so_luong")
    private Integer soLuong;

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
