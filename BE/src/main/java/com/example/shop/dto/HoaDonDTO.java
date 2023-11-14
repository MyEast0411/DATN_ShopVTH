package com.example.shop.dto;

import com.example.shop.entity.HoaDonChiTiet;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HoaDonDTO {
    private String id;
    private List<HoaDonChiTiet> list;
}
