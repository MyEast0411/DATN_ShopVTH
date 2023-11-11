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
@Builder
@Table(name = "khach_hang_voucer")
@IdClass(KhachHangVoucherId.class)
public class KhachHangVoucher {
    @Id
    @ManyToOne
    @JoinColumn(name = "id_voucher")
    private Voucher id_voucher;

    @Id
    @ManyToOne
    @JoinColumn(name = "id_khach_hang")
    private KhachHang id_khach_hang;

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
