package com.example.shop.response;

import com.example.shop.entity.SanPhamChiTiet;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ThongKeResponse {
    private  Integer slsp;
    private  Integer slhd;
    private  Double tongTien;
    private List<SanPhamChiTiet> spdb;
}
