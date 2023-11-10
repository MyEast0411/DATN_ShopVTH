package com.example.shop.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class HoaDonThanhToanId implements Serializable {
    private String id_hoa_don;

    private String id_thanh_toan;
}
