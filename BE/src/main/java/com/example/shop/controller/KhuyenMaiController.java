package com.example.shop.controller;

import com.example.shop.entity.KhuyenMai;
import com.example.shop.services.KhuyenMaiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/khuyen-mai")
public class KhuyenMaiController {

    @Autowired
    private KhuyenMaiService khuyenMaiService;

    @GetMapping
    public List<KhuyenMai> findAll() {
        return khuyenMaiService.findAll();
    }

    @PostMapping("/add")
    public List<KhuyenMai> addKhuyenMai(@RequestBody List<KhuyenMai> khuyenMaiList) {
        return khuyenMaiService.saveAll(khuyenMaiList);
    }

    @PutMapping("/update/{id}")
    public KhuyenMai updateKhuyenMai(@PathVariable UUID id, @RequestBody KhuyenMai khuyenMai) {
        Optional<KhuyenMai> khuyenMaiTimDuoc = khuyenMaiService.findById(id);

        if (khuyenMaiTimDuoc.isPresent()) {
            khuyenMai.setId(khuyenMaiTimDuoc.get().getId());
            return khuyenMaiService.save(khuyenMai);
        }

        return null;

    }

    @DeleteMapping("/delete/{id}")
    public Boolean deleteKhuyenMai(@PathVariable UUID id) {
        Optional<KhuyenMai> khuyenMai = khuyenMaiService.findById(id);

        if (khuyenMai.isPresent()) {
            khuyenMaiService.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
