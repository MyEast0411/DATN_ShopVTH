package com.example.shop.controller;

import com.example.shop.entity.HoaDon;
import com.example.shop.entity.HoaDonChiTiet;
import com.example.shop.service.HoaDonChiTietService;
import com.example.shop.service.HoaDonService;
import com.sun.source.tree.TryTree;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;
@RestController
@CrossOrigin("*")
@RequestMapping("hdct")
public class HoaDonChiTietController {
    @Autowired
    private HoaDonChiTietService serviceHDCT;
    @Autowired
    private HoaDonService hoaDonService;

    @GetMapping("getHDCT/{id}")
    public ResponseEntity<List<HoaDonChiTiet>> getHoaDons(
            @PathVariable("id") String idHD
    ){
        List<HoaDonChiTiet> list = serviceHDCT.getHDCT(idHD);
        return ResponseEntity.ok(list);
    }
    @DeleteMapping("deleteHDCT/{idHD}/{idSPCT}")
    public ResponseEntity<Boolean> deleteHDCT(
            @PathVariable("idHD") String idHD,
            @PathVariable("idSPCT") String idSPCT
    ){
//        System.out.println(idSPCT);
//        System.out.println(idHD);
//        Boolean kq = true;
        try {
            serviceHDCT.deleteHDCT(idHD , idSPCT);
            HoaDon hoaDon = hoaDonService.getHoaDon(idHD);
            List<HoaDonChiTiet> list = serviceHDCT.getHDCT(idHD);
            double tongTien = 0;
            for (HoaDonChiTiet donChiTiet: list
                 ) {
                tongTien += donChiTiet.getSoLuong() * donChiTiet.getId_chi_tiet_san_pham().getGiaBan().doubleValue();
            }

            hoaDon.setTongTien(new BigDecimal(""+tongTien));
            hoaDonService.updateHoaDon(hoaDon);
            return ResponseEntity.ok(true);
        }catch (Exception exception){
            exception.printStackTrace();
            return ResponseEntity.ok(false);
        }
    }


}