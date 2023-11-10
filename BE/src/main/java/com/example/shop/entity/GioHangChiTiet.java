package com.example.shop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "gio_hang_chi_tiet")
@IdClass(GioHangChiTiepSanPhamId.class)
@Builder
public class GioHangChiTiet {
    @Id
    @ManyToOne
    @JoinColumn(name = "id_gio_hang")
    private GioHang id_gio_hang;

    @Id
    @ManyToOne
    @JoinColumn(name = "id_chi_tiet_san_pham")
    private SanPhamChiTiet id_chi_tiet_san_pham;

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
