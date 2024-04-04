package com.example.shop.dto;

import com.example.shop.entity.HoaDon;
import com.example.shop.entity.HoaDonChiTiet;
import com.example.shop.entity.SanPhamChiTiet;
import com.example.shop.entity.Voucher;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class HoaDonDoiTraDTO {
    private HoaDon hoaDon;
    private List<HoaDonChiTiet> listHDCT;

}
