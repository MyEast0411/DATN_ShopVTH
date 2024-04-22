package com.example.shop.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FilterSanPhamClientRequest {
    private List<String> listTheLoai;
    private List<String> listMauSac;
    private List<String> listThuongHieu;
    private Double toPrice;
    private Double fromPrice;
}
