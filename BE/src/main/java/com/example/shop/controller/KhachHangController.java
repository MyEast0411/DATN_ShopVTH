package com.example.shop.controller;

import com.example.shop.entity.KhachHang;
import com.example.shop.repositories.KhachHangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Controller
@RestController
@CrossOrigin("http://localhost:5173")
public class KhachHangController {

    @Autowired
    KhachHangRepository khachHangRepository;

    @GetMapping("/khach-hang/getAll")
    List<KhachHang> getAll(){
        return khachHangRepository.findAll();
    }
}
