package com.example.shop.response;

import com.example.shop.dto.HoaDonChiTietCustomer;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
@Getter
@Setter
@ToString
public class TraHangRes {
        private Double tongTienSauTra;
        private List<HoaDonChiTietCustomer> listSPST;
        private List<HoaDonChiTietCustomer> listSPCTDoiTra;


}
