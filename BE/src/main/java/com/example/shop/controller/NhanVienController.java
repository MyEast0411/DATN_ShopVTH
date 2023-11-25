package com.example.shop.controller;

import com.example.shop.entity.DiaChi;
import com.example.shop.entity.KhachHang;
import com.example.shop.entity.NhanVien;
import com.example.shop.repositories.ChucVuRepository;
import com.example.shop.repositories.NhanVienRepository;
import com.example.shop.util.UploadAnh;
import com.example.shop.viewmodel.KhachHangVM;
import com.example.shop.viewmodel.NhanVienVM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;

@RestController
@CrossOrigin("*")
@RequestMapping("nhan_vien")
public class NhanVienController {

    @Autowired
    private NhanVienRepository nhanVienRepository;

    @Autowired
    private ChucVuRepository chucVuRepository;

    @GetMapping("/getAll")
    public ResponseEntity getAllNhanVien() {
        return ResponseEntity.ok(nhanVienRepository.findAll());
    }

    @PostMapping("/nhan-vien/add")
    public ResponseEntity add(@RequestBody NhanVienVM khachHang) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("ddMMyyyy");
        Integer maxMa = Integer.parseInt(nhanVienRepository.findMaxMa());

        try {
            NhanVien kh = new NhanVien();
            String urlImg = UploadAnh.upload(khachHang.getAnh());
            kh.setAnh(urlImg);
            kh.setMa("NV"+(maxMa + 1));
            kh.setTen(khachHang.getTen());
            kh.setEmail(khachHang.getEmail());
            kh.setGioiTinh(khachHang.getGioi_tinh());
            kh.setNgaySinh(dateFormat.parse(khachHang.getNgay_sinh()));
            kh.setSdt(khachHang.getSdt());
            kh.setTrang_thai("1");
            kh.setId_chuc_vu(chucVuRepository.findById(khachHang.getId_chuc_vu()).get());
            System.out.println(kh);
            nhanVienRepository.save(kh);
            return ResponseEntity.ok("Thành công");
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR");
        }
    }
}
