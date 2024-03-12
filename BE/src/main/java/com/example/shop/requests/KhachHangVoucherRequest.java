package com.example.shop.requests;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class KhachHangVoucherRequest {
    private String idVoucher;
    private String idKhachHang;
}
