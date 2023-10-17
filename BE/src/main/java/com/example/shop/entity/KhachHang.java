package com.example.shop.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "khach_hang")
public class KhachHang {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private String ids;

    @Column(name = "ma")
    private String ma;

    @Column(name = "ten")
    private String ten;

    @Column(name = "so_dien_thoai")
    private String sdt;

    @Column(name = "gioi_tinh")
    private String gioiTinh;

    @Column(name = "anh_nguoi_dung")
    private String anhNguoiDung;

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
}
