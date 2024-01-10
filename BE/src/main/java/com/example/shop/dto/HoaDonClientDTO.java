package com.example.shop.dto;

import com.example.shop.entity.HoaDon;
import com.example.shop.entity.HoaDonChiTiet;
import com.example.shop.entity.LichSuHoaDon;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class HoaDonClientDTO {
    private HoaDon hoaDon;
    private List<LichSuHoaDon> lichSuHoaDons;
    private List<HoaDonChiTiet> hoaDonChiTiets;
}
