package com.example.shop.controller;

import com.example.shop.entity.DiaChi;
import com.example.shop.entity.KhachHang;
import com.example.shop.repositories.DiaChiRepository;
import com.example.shop.repositories.KhachHangRepository;
import com.example.shop.util.UploadAnh;
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

    @GetMapping("/dia-chi/findByMa/{ma}")
    public List<DiaChi> findDiaChiByMa(@PathVariable String ma) {
        return diaChiRepository.findDiaChiByMa(ma);
    }

    @DeleteMapping("/khach-hang/delete/{id}")
    public void delete(@PathVariable("id") String id) {
        khachHangRepository.delete(khachHangRepository.findById(id).get());
    }

    @DeleteMapping("/dia-chi/delete/{id}")
    public ResponseEntity deleteDiaChi(@PathVariable("id") String id) {
        try {
            if(diaChiRepository.findById(id).get().getTrangThai() == 1) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Không được xóa địa chỉ mặc định");
            }
            diaChiRepository.delete(diaChiRepository.findById(id).get());
            return ResponseEntity.ok("Thành công");
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Xóa thất bại");
        }
    }

    @PostMapping("/khach-hang/add")
    public ResponseEntity add(@RequestBody KhachHangVM khachHang) {
        System.out.println(khachHang);
        SimpleDateFormat dateFormat = new SimpleDateFormat("ddMMyyyy");
        Integer maxMa = Integer.parseInt(khachHangRepository.findMaxMa());

        try {
            KhachHang kh = new KhachHang();
            String urlImg = UploadAnh.upload(khachHang.getAnhNguoiDung());
            kh.setAnhNguoiDung(urlImg);
            kh.setMa("KH"+(maxMa + 1));
            kh.setCccd(khachHang.getCccd());
            kh.setTen(khachHang.getTen());
            kh.setEmail(khachHang.getEmail());
            kh.setGioiTinh(khachHang.getGioi_tinh());
            kh.setNgaySinh(dateFormat.parse(khachHang.getNgay_sinh()));
            kh.setSdt(khachHang.getSdt());
            kh.setTrangThai(1);
            System.out.println(kh);
            KhachHang khNew = khachHangRepository.save(kh);

            DiaChi diaChi = new DiaChi();
            diaChi.setDuong(khachHang.getSoNha());
            diaChi.setTrangThai(1);
            diaChi.setThanhPho(khachHang.getThanhPho());
            diaChi.setHuyen(khachHang.getHuyen());
            diaChi.setXa(khachHang.getXa());
            diaChi.setQuocGia("Việt Nam");
            diaChi.setId_khach_hang(khNew);
            diaChiRepository.save(diaChi);
            return ResponseEntity.ok("Thành công");
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR");
        }
    }
    @PostMapping("/dia-chi/add")
    public ResponseEntity addDiaChi(@RequestBody KhachHangVM khachHang) {

        try {
            KhachHang kh = khachHangRepository.findById(khachHang.getId()).get();
            if(diaChiRepository.findDiaChiByMa(kh.getMa()).size() >= 3 ) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Khách hàng chỉ có thể có 3 địa chỉ !!!");
            }
            DiaChi diaChi = new DiaChi();
            diaChi.setDuong(khachHang.getSoNha());
            diaChi.setThanhPho(khachHang.getThanhPho());
            diaChi.setHuyen(khachHang.getHuyen());
            diaChi.setXa(khachHang.getXa());
            diaChi.setTrangThai(2);
            diaChi.setQuocGia("Việt Nam");
            diaChi.setId_khach_hang(khachHangRepository.findById(khachHang.getId()).get());
            diaChiRepository.save(diaChi);
            return ResponseEntity.ok("Thành công");
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Thêm thất bại");
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
