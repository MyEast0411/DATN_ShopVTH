package com.example.shop.controller;

import com.example.shop.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@CrossOrigin("*")
@RequestMapping("thong-ke")
public class ThongKeController {
    @Autowired
    private HoaDonService hoaDonService;
    @GetMapping("/thang")
    public ResponseEntity<List<Double>> getTotalByThang() {
      List<Double> tongTienThang =   hoaDonService.getTotalByThang();
        return ResponseEntity.ok(tongTienThang);
    }
}
