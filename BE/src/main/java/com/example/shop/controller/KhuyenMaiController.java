package com.example.shop.controller;

import com.example.shop.entity.KhuyenMai;
import com.example.shop.services.KhuyenMaiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Controller
@CrossOrigin
@RequestMapping()
@RestController
public class KhuyenMaiController {
    @Autowired
    KhuyenMaiService khuyenMaiService;

    @GetMapping("khuyen-mai")
    public List<KhuyenMai> findAll() {
        return this.khuyenMaiService.findAll();
    }

    @PostMapping("khuyen-mai/add")
    List<KhuyenMai> addKhuyenMai(@RequestBody List<KhuyenMai> khuyenMaiList) {
        return this.khuyenMaiService.saveAll(khuyenMaiList);
    }

    @PutMapping("khuyen-mai/update/{id}")
    public KhuyenMai updateKhuyenMai(@PathVariable UUID id, @RequestBody KhuyenMai khuyenMai) {
        KhuyenMai khuyenMaiTimDuoc = khuyenMaiService.findById(id).get();

        khuyenMai.setId(khuyenMaiTimDuoc.getId());
        return khuyenMaiService.save(khuyenMai);

    }

    @DeleteMapping("khuyen-mai/delete/{id}")
    public Boolean deleteKhuyenMai(@PathVariable UUID id) {
        Optional<KhuyenMai> khuyenMai = khuyenMaiService.findById(id);

        if (khuyenMai != null) {
            khuyenMaiService.deleteById(id);
            return true;
        } else {
            return false;
        }
    }


}
