package com.example.shop.response;

import com.example.shop.entity.TheLoai;

public interface FilterSanPhamClientResponse {
    Integer getColorCount();
    String getDefaultImg();
    String getId();
    String getMa();
    Double getMaxPrice();
    String getTen();
    TheLoai getTheLoai();
}
