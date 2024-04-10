package com.example.shop.controller;

import com.example.shop.entity.MauSac;
import com.example.shop.entity.TheLoai;
import com.example.shop.repositories.MauSacRepository;
import com.example.shop.repositories.TheLoaiRepository;
import com.example.shop.requests.UpdateDeGiayRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@Controller
@RestController
@CrossOrigin("*")
@RequestMapping("mau-sac")
public class MauSacController {

    @Autowired
    private MauSacRepository repo;

    @GetMapping("getAllMauSac")
    public ResponseEntity getAllKichCo() {
        return ResponseEntity.ok(repo.getAll());
    }

    @GetMapping("getByMa/{id}")
    public ResponseEntity getByMa(@PathVariable String id) {
        return ResponseEntity.ok(repo.findById(id).get());
    }

    @PostMapping("/addMauSac")
    public ResponseEntity addMauSac(@RequestBody MauSac request) {
        try {
            if(repo.existsByMaMauAndDeleted(request.getMaMau(), 1)) {
                return ResponseEntity.badRequest().body("Đã tồn tại mã màu này");
            }
            if(repo.existsByTenAndDeleted(request.getTen(),1)) {
                return ResponseEntity.badRequest().body("Đã tồn tại màu sắc này");
            }
            MauSac mauSac = MauSac.builder()
                    .maMau(request.getMaMau())
                    .ten(request.getTen())
                    .ngayTao(new Date())
                    .nguoiTao("Đông")
                    .deleted(1)
                    .build();
            repo.save(mauSac);
            return ResponseEntity.ok("Thành công");
        }catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @PutMapping("deleteMauSac/{id}")
    public ResponseEntity deleteMauSac(@PathVariable String id) {
        try {
            MauSac mauSac = repo.findById(id).get();
            mauSac.setDeleted(0);
            repo.save(mauSac);
            return ResponseEntity.ok("Thành công");
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("ERR");
        }
    }

    @PutMapping("updateMauSac")
    public ResponseEntity updateMauSac(@RequestBody UpdateDeGiayRequest request) {
        try {
            if(repo.existsByMaMauAndDeleted(request.getMa(),1) && repo.existsByTenAndDeleted(request.getTen(),1)) {
                return ResponseEntity.badRequest().body("Đã tồn tại màu sắc này");
            }

            MauSac cl = repo.findById(request.getId()).get();
            cl.setMaMau(request.getMa());
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
