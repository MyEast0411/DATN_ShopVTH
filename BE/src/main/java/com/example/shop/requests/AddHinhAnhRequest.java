package com.example.shop.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddHinhAnhRequest {
    private String imgUrl;
    private String mauSac;
    private String idSanPhamChiTiet;
}
