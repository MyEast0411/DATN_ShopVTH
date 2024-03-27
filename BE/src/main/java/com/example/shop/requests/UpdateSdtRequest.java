package com.example.shop.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateSdtRequest {
    private String idKhachHang;
    private String sdt;
}
