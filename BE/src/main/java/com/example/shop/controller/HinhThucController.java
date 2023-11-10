package com.example.shop.controller;

import com.example.shop.entity.HinhThucThanhToan;
import com.example.shop.entity.HoaDon;
import com.example.shop.service.HinhThucThanhToanService;
import com.example.shop.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@CrossOrigin("*")
@RequestMapping("htth")
public class HinhThucController {
    @Autowired
    private HinhThucThanhToanService hinhThucThanhToanService;
    @GetMapping("getHTTT/{id}")
    public ResponseEntity<List<HinhThucThanhToan>> getHoaDons(
           @PathVariable("id") String idHD
    ){
        List<HinhThucThanhToan> list = hinhThucThanhToanService.getHTTT(idHD);
        return ResponseEntity.ok(list);
    }


}

