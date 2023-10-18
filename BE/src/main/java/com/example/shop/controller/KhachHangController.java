package com.example.shop.controller;

import com.example.shop.entity.ChucVu;
import com.example.shop.entity.KhachHang;
import com.example.shop.service.KhachHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.UUID;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/khach-hang")
public class KhachHangController {
    @Autowired
    private KhachHangService khachHangService;

    @GetMapping("/hien-thi")
    public ArrayList<KhachHang> hienthi() {
        return khachHangService.getAll();
    }

    @GetMapping("/detail/{id}")
    public KhachHang detail(@PathVariable("id") String id) {
        return khachHangService.getById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") String id) {
        khachHangService.delete(id);
    }

    @PostMapping("/add")
    public KhachHang add(@RequestBody KhachHang khachHang) {
        return khachHangService.add(khachHang);
    }

    @PutMapping("/update/{ids}")
    public KhachHang update(@RequestBody KhachHang khachHang, @PathVariable String ids) {
        khachHang.setIds(ids);
        return khachHangService.update(khachHang);
    }

    @PutMapping("/deleteSoft/{id}")
    public KhachHang deleteSoft(@PathVariable("id") KhachHang khachHang) {
        khachHang.setDeleted(1);
        return khachHangService.update(khachHang);
    }
}
