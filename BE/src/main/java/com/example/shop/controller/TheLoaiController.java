package com.example.shop.controller;

import com.example.shop.entity.DeGiay;
import com.example.shop.entity.NhanVien;
import com.example.shop.entity.TheLoai;
import com.example.shop.repositories.DeGiayRepository;
import com.example.shop.repositories.TheLoaiRepository;
import com.example.shop.requests.SearchNhanVienRequest;
import com.example.shop.requests.SearchThuocTinhSPRequest;
import com.example.shop.requests.UpdateDeGiayRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@Controller
@RestController
@CrossOrigin("*")
@RequestMapping("the-loai")
public class TheLoaiController {
    @Autowired
    private TheLoaiRepository repo;

    @GetMapping("getAllTheLoai")
    public ResponseEntity getAllTheLoai() {
        System.out.println(repo.getAll().size());
        return ResponseEntity.ok(repo.getAll());
    }

    @GetMapping("getByMa/{ma}")
    public ResponseEntity getByMa(@PathVariable String ma) {
        return ResponseEntity.ok(repo.findByMa(ma));
    }
    @PostMapping("/filterTheLoai")
    public ResponseEntity filterTheLoai(@RequestBody SearchThuocTinhSPRequest request) {
        try {
            List<TheLoai> list = repo.filter(request.getSelectedStatus(),request.getTextInput(),request.getTextInput());
            return ResponseEntity.ok(list);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("err");
        }
    }
    @PostMapping("/addTheLoai")
    public ResponseEntity addTheLoai(@RequestBody TheLoai request) {
        try {
            if(repo.existsByMa(request.getMa())) {
                return ResponseEntity.badRequest().body("Đã tồn tại mã thể loại này");
            }
            if(repo.existsByTen(request.getTen())) {
                return ResponseEntity.badRequest().body("Đã tồn tại thể loại này");
            }
            TheLoai theLoai = TheLoai.builder()
                    .ma(request.getMa())
                    .ten(request.getTen())
                    .ngayTao(new Date())
                    .nguoiTao("Đông")
                    .deleted(1)
                    .build();
            repo.save(theLoai);
            return ResponseEntity.ok("Thành công");
        }catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @PutMapping("deleteTheLoai/{maTheLoai}")
    public ResponseEntity deleteTheLoai(@PathVariable String maTheLoai) {
        try {
            TheLoai theLoai = repo.findByMa(maTheLoai);
            theLoai.setDeleted(0);
            repo.save(theLoai);
            return ResponseEntity.ok("Thành công");
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("ERR");
        }
    }

    @PutMapping("updateTheLoai")
    public ResponseEntity updateTheLoai(@RequestBody UpdateDeGiayRequest request) {
        try {
            System.out.println(request);

            if(repo.existsByMa(request.getMa()) && repo.existsByTen(request.getTen())) {
                return ResponseEntity.badRequest().body("Đã tồn tại thể loại này");
            }

            TheLoai cl = repo.findById(request.getId()).get();
            cl.setMa(request.getMa());
            cl.setTen(request.getTen());
            cl.setNgaySua(new Date());
            cl.setNguoiSua("Đông");
            repo.save(cl);
            return ResponseEntity.ok("Thành công");
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("ERR");
        }
    }
}
