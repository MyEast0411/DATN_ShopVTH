package com.example.shop.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateMatKhauRequest {
    private String idKhachHang;
    private String newPassword;
}
