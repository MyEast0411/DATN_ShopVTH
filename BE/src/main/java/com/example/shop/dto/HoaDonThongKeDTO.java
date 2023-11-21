package com.example.shop.dto;

import com.example.shop.entity.HoaDon;
import com.example.shop.entity.HoaDonChiTiet;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import retrofit2.http.GET;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@Setter
@NoArgsConstructor
@Getter
public class HoaDonThongKeDTO {
    private  String ma;
    private BigDecimal tongTien;
    private Date ngayTao;
    private  List<HoaDonChiTiet> listHDCT;
}
