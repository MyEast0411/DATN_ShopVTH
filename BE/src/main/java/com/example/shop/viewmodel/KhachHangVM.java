package com.example.shop.viewmodel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class KhachHangVM {
    private String id;

    private String ten;

    private String sdt;

    private String email;

    private String cccd;

    private String ngay_sinh;

    private String gioi_tinh;

    private String anhNguoiDung;

    private String soNha;

    private String xa;

    private String huyen;

    private String thanhPho;
}
