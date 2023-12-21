package com.example.shop.controller;

import com.example.shop.entity.ChucVu;
import com.example.shop.entity.DiaChi;
import com.example.shop.entity.KhachHang;
import com.example.shop.entity.NhanVien;
import com.example.shop.repositories.ChucVuRepository;
import com.example.shop.repositories.NhanVienRepository;
import com.example.shop.requests.ChucVuRequest;
import com.example.shop.util.UploadAnh;
import com.example.shop.viewmodel.KhachHangVM;
import com.example.shop.viewmodel.NhanVienVM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Random;

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
        return ResponseEntity.ok(nhanVienRepository.getAllNhanVien());
    }
    @GetMapping("/getAllChucVu")
    public ResponseEntity getAllChucVu() {
        return ResponseEntity.ok(chucVuRepository.findAll());
    }
    @PostMapping("/addChucVu")
    public ResponseEntity addChucVu(@RequestBody ChucVuRequest request) {
        try {
            Integer maxMa = chucVuRepository.getMaxMa() == null ? 1 : Integer.parseInt(chucVuRepository.getMaxMa());
            ChucVu chucVu = ChucVu.builder()
                    .ma("CV"+(maxMa + 1))
                    .nguoiTao("Đông")
                    .ten(request.getTenChucVu())
                    .deleted(1)
                    .build();
            chucVuRepository.save(chucVu);
            return ResponseEntity.ok("Thành công");
        }catch (Exception e) {
            return ResponseEntity.badRequest().body("ERROR");
        }
    }
    @PostMapping("add")
    public ResponseEntity add(@RequestBody NhanVienVM khachHang) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder sb = new StringBuilder(6);
        Random random = new Random();

        for (int i = 0; i < 6; i++) {
            int index = random.nextInt(characters.length());
            sb.append(characters.charAt(index));
        }

        String randomString = sb.toString();
        System.out.println(randomString);
        //
        SimpleDateFormat dateFormat = new SimpleDateFormat("ddMMyyyy");
        Integer maxMa = Integer.parseInt(nhanVienRepository.findMaxMa());
        System.out.println(khachHang);
        try {
            NhanVien kh = new NhanVien();
            String urlImg = UploadAnh.upload(khachHang.getAnhNguoiDung());
            kh.setAnh(urlImg);
            kh.setMa("NV"+(maxMa + 1));
            kh.setTen(khachHang.getTen());
            kh.setEmail(khachHang.getEmail());
            kh.setGioiTinh(khachHang.getGioi_tinh());
            kh.setNgaySinh(dateFormat.parse(khachHang.getNgay_sinh()));
            kh.setSdt(khachHang.getSdt());
            kh.setDiaChi(khachHang.getSoNha() + "," + khachHang.getXa() + "," + khachHang.getHuyen());
            kh.setTrang_thai("1");
            kh.setDeleted(1);
            kh.setId_chuc_vu(chucVuRepository.findById(khachHang.getChucVu()).get());
            kh.setMatKhau(randomString);
            System.out.println(kh);
            nhanVienRepository.save(kh);
            return ResponseEntity.ok("Thành công");
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR");
        }
    }

    @PutMapping("/deleteSoft/{id}")
    public NhanVien deleteSoft(@PathVariable("id") NhanVien nhanVien) {
        nhanVien.setDeleted(0);
        return nhanVienRepository.save(nhanVien);
    }
}
