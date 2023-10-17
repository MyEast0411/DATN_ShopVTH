package com.example.shop.controller;

import com.example.shop.entity.HoaDonChiTiet;
import com.example.shop.service.HoaDonChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@CrossOrigin("*")
@RequestMapping("hdct")
public class HoaDonChiTietController {
    @Autowired
    private HoaDonChiTietService serviceHDCT;
    @GetMapping("getHDCT/{id}")
    public ResponseEntity<List<HoaDonChiTiet>> getHoaDons(
            @PathVariable("id") String idHD
    ){
        List<HoaDonChiTiet> list = serviceHDCT.getHDCT(idHD);
        return ResponseEntity.ok(list);
    }


}