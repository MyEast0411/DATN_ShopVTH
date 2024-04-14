package com.example.shop.dto;

import com.example.shop.entity.HoaDon;
import com.example.shop.entity.SanPhamChiTiet;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
@ToString
public class HoaDonChiTietCustomer {

    private HoaDon id_hoa_don;
    private SanPhamChiTiet id_chi_tiet_san_pham;
    private BigDecimal giaTien;
    private Integer soLuong;
    private Integer quantity;
    private Date ngayTao = new Date();
    private Date ngaySua;
    private String nguoiTao;
    private String nguoiSua;
    private Integer deleted;
    private String ghiChu;
}
