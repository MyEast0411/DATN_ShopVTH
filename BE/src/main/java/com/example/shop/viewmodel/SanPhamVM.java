package com.example.shop.viewmodel;

import jakarta.persistence.Converter;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SanPhamVM {
    private String ma;
    private String ten_san_pham;
    private Integer so_luong_ton;
    private Integer trang_thai;
}
