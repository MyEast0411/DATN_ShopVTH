package com.example.shop.controller;

import com.example.shop.entity.KhachHang;
import com.example.shop.entity.NhanVien;
import com.example.shop.service.KhachHangService;
import com.example.shop.service.NhanVienService;
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
@RequestMapping("/nhan_vien")
public class NhanVienController {
    @Autowired
    private NhanVienService nhanVienService;
    @GetMapping("/hien-thi")
    public ArrayList<NhanVien> hienthi(){
        return nhanVienService.getAll();
    }

    @GetMapping("/detail/{id}")
    public NhanVien detail(@PathVariable("id") UUID id){
        return nhanVienService.getById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void  delete(@PathVariable("id")UUID id){
        nhanVienService.delete(id);
    }

    @PostMapping("/add")
    public NhanVien add(@RequestBody NhanVien nhanVien){
        return nhanVienService.add(nhanVien);
    }
    @PutMapping("/update/{id}")
    public NhanVien update(@RequestBody  NhanVien nhanVien,@PathVariable UUID id){

        return nhanVienService.update(nhanVien);
    }
}
