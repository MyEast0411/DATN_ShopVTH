package com.example.shop.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class KhachHangAddDiaChiRequest {
    private String idKhachHang;
    private String thanhPho;
    private String huyen;
    private String xa;
    private String soNha;
}
