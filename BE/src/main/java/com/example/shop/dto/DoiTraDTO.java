package com.example.shop.dto;

import com.example.shop.entity.SanPhamChiTiet;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class DoiTraDTO {
    private Double tongTienSauTra;
    private List<HoaDonDoiTraDTO> listSPST;
    private List<HoaDonDoiTraDTO> listSPCTDoiTra;
}
