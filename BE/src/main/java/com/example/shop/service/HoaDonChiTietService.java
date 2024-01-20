package com.example.shop.service;

import com.example.shop.dto.SanPhamChiTietDTO;
import com.example.shop.entity.HinhThucThanhToan;
import com.example.shop.entity.HoaDonChiTiet;
import com.example.shop.entity.SanPhamChiTiet;

import java.util.List;

public interface HoaDonChiTietService {
    List<HoaDonChiTiet> getHDCT(String idHD);
    void deleteHDCT(String idHD , String idSPCT) ;
    List<SanPhamChiTietDTO> getTop3();
     Integer totalSPSaled();
    List<SanPhamChiTietDTO> getTop5Year();

    Integer getSLSP(String idHD);
    HoaDonChiTiet getHD(String idHD , String idSPCT);


}
