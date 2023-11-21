package com.example.shop.dto;

import com.example.shop.entity.SanPhamChiTiet;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import retrofit2.http.GET;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SanPhamChiTietDTO {
    private int id;
    private int soLuong;
    private SanPhamChiTiet sanPhamChiTiet;

}
