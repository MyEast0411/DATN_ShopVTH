package com.example.shop.dto;

import com.example.shop.entity.HoaDonChiTiet;
import com.example.shop.entity.SanPhamChiTiet;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ChiTietSanPhamCustomer {
    private HoaDonChiTiet hoaDonChiTiet;
    private int quantity;
}
