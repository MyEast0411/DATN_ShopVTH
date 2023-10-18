package com.example.shop.controller;

import com.example.shop.entity.KhuyenMai;
import com.example.shop.services.KhuyenMaiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin
@RequestMapping("/khuyen-mai")
public class KhuyenMaiController {

    @Autowired
    private KhuyenMaiService khuyenMaiService;

    private String generateUniqueMaKhuyenMai() {
        String maKhuyenMai;
        do {
            maKhuyenMai = "KM" + String.format("%07d", new Random().nextInt(10000000));
        } while (khuyenMaiService.findByMa(maKhuyenMai) != null);
        return maKhuyenMai;
    }

    @GetMapping
    public List<KhuyenMai> findAll() {
        return khuyenMaiService.findAllByDeleted(0);
    }
    @PostMapping("/add")
    ResponseEntity addKhuyenMai(@RequestBody KhuyenMai khuyenMai) {
        try {
            khuyenMai.setMa(generateUniqueMaKhuyenMai());
            khuyenMai.setNgayTao(new Date());
            khuyenMai.setDeleted(0);
            khuyenMaiService.save(khuyenMai);
            System.out.println(khuyenMai.getMa());
            return ResponseEntity.ok("Thành công");
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR");
        }
    }

    @GetMapping("/find-khuyenMai-byId/{id}")
    public ResponseEntity<KhuyenMai> findById(@PathVariable String id) {
        Optional<KhuyenMai> khuyenMai = khuyenMaiService.findById(id);

        return khuyenMai.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/update/{id}")
    public KhuyenMai updateKhuyenMai(@PathVariable String id, @RequestBody KhuyenMai khuyenMai) {
        Optional<KhuyenMai> khuyenMaiTimDuoc = khuyenMaiService.findById(id);

        if (khuyenMaiTimDuoc.isPresent()) {
            khuyenMai.setId(khuyenMaiTimDuoc.get().getId());
            return khuyenMaiService.save(khuyenMai);
        }

        return null;
    }

    @DeleteMapping("/soft-delete/{id}")
    public ResponseEntity<String> softDeleteKhuyenMai(@PathVariable String id) {
        Optional<KhuyenMai> khuyenMai = khuyenMaiService.findById(id);

        if (khuyenMai.isPresent()) {
            khuyenMai.get().setDeleted(1);
            khuyenMaiService.save(khuyenMai.get());
            return ResponseEntity.ok("Đã xóa mềm");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
