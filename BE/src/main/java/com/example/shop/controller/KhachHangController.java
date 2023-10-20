package com.example.shop.controller;

import com.example.shop.entity.DiaChi;
import com.example.shop.entity.KhachHang;
import com.example.shop.repositories.DiaChiRepository;
import com.example.shop.repositories.KhachHangRepository;
import com.example.shop.viewmodel.KhachHangVM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Random;

@Controller
@RestController
@CrossOrigin("http://localhost:5173")
public class KhachHangController {

    @Autowired
    KhachHangRepository khachHangRepository;

    @Autowired
    DiaChiRepository diaChiRepository;

    @GetMapping("/khach-hang/getAll")
    List<KhachHang> getAll(){
        return khachHangRepository.findAll();
    }

    @GetMapping("/khach-hang/detail/{id}")
    public KhachHang detail(@PathVariable("id") String id) {
        return khachHangRepository.findById(id).get();
    }

    @GetMapping("/khach-hang/findByMa/{ma}")
    public KhachHang findByMa(@PathVariable String ma) {
        return khachHangRepository.findByMa(ma);
    }

    @DeleteMapping("/khach-hang/delete/{id}")
    public void delete(@PathVariable("id") String id) {
        khachHangRepository.delete(khachHangRepository.findById(id).get());
    }

    @PostMapping("/khach-hang/add")
    public ResponseEntity add(@RequestBody KhachHangVM khachHang) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("ddMMyyyy");
        int seconds = (int) System.currentTimeMillis() / 1000;
        Random random = new Random();
        int number = random.nextInt(seconds + 1);
        String threeNumbers = String.valueOf(number).substring(0, 3);
        System.out.println(khachHang);
        DiaChi diaChi = new DiaChi();
        diaChi.setDuong(khachHang.getSoNha());
        diaChi.setThanhPho(khachHang.getThanhPho());
        diaChi.setHuyen(khachHang.getHuyen());
        diaChi.setXa(khachHang.getXa());
        diaChi.setQuocGia("Việt Nam");
        DiaChi dc = diaChiRepository.save(diaChi);
        try {
            KhachHang kh = new KhachHang();
            kh.setMa("KH"+threeNumbers);
            kh.setCccd(khachHang.getCccd());
            kh.setTen(khachHang.getTen());
            kh.setEmail(khachHang.getEmail());
            kh.setAnhNguoiDung(khachHang.getAnhNguoiDung());
            kh.setGioiTinh(khachHang.getGioi_tinh());
            kh.setNgaySinh(dateFormat.parse(khachHang.getNgay_sinh()));
            kh.setId_dia_chi(dc);
            kh.setSdt(khachHang.getSdt());
            kh.setTrangThai(1);
            System.out.println(kh);
            khachHangRepository.save(kh);
            return ResponseEntity.ok("Thành công");
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR");
        }
    }

    @PutMapping("/khach-hang/update/{ids}")
    public KhachHang update(@RequestBody KhachHang khachHang, @PathVariable String ids) {
        khachHang.setId(ids);
        return khachHangRepository.save(khachHang);
    }

    @PutMapping("/khach-hang/deleteSoft/{id}")
    public KhachHang deleteSoft(@PathVariable("id") KhachHang khachHang) {
        khachHang.setDeleted(0);
        return khachHangRepository.save(khachHang);
    }
}
