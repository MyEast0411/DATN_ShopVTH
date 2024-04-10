package com.example.shop.controller;

import com.example.shop.entity.NhanHieu;
import com.example.shop.entity.ThuongHieu;
import com.example.shop.repositories.ThuongHieuRepository;
import com.example.shop.requests.UpdateThuongHieuRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@Controller
@RestController
@CrossOrigin("*")
@RequestMapping("thuong-hieu")
public class ThuongHieuController {
    @Autowired
    private ThuongHieuRepository repo;

    @GetMapping("getAllThuongHieu")
    public ResponseEntity getAllThuongHieu() {
        return ResponseEntity.ok(repo.getAll());
    }

    @GetMapping("getByMa/{ma}")
    public ResponseEntity getByMa(@PathVariable String ma) {
        return ResponseEntity.ok(repo.findByMa(ma));
    }

    @PostMapping("/addThuongHieu")
    public ResponseEntity addThuongHieu(@RequestBody ThuongHieu request) {
        try {
            if(repo.existsByMa(request.getMa())) {
                return ResponseEntity.badRequest().body("Đã tồn tại mã thương hiệu này");
            }
            if(repo.existsByTen(request.getTen())) {
                return ResponseEntity.badRequest().body("Đã tồn tại thương hiệu này");
            }
            ThuongHieu thuongHieu = ThuongHieu.builder()
                    .ma(request.getMa())
                    .ten(request.getTen())
                    .ngayTao(new Date())
                    .nguoiTao("Đông")
                    .deleted(1)
                    .build();
            repo.save(thuongHieu);
            return ResponseEntity.ok("Thành công");
        }catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @PutMapping("deleteNhanHieu/{maThuongHieu}")
    public ResponseEntity deleteThuongHieu(@PathVariable String maThuongHieu) {
        try {
            ThuongHieu thuongHieu = repo.findByMa(maThuongHieu);
            thuongHieu.setDeleted(0);
            repo.save(thuongHieu);
            return ResponseEntity.ok("Thành công");
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("ERR");
        }
    }

    @PutMapping("updateThuongHieu")
    public ResponseEntity updateThuongHieu(@RequestBody UpdateThuongHieuRequest request) {
        try {
            if(repo.existsByMa(request.getMa()) && repo.existsByTen(request.getTen())) {
                return ResponseEntity.badRequest().body("Đã tồn tại thương hiệu này");
            }
            ThuongHieu cl = repo.findById(request.getId()).get();
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
