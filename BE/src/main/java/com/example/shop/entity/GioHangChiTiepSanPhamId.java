package com.example.shop.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GioHangChiTiepSanPhamId {
    private String id_chi_tiet_san_pham;

    private String id_gio_hang;
}
