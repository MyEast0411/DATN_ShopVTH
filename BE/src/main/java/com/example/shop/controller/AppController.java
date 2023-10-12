package com.example.shop.controller;

import com.example.shop.entity.SanPham;
import com.example.shop.repositories.SanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;
import java.util.UUID;

@Controller
@RestController
public class AppController {
    @Autowired
    SanPhamRepository repo;

    @GetMapping("/")
    List<SanPham> getAll(){
        return repo.findAll();
    }

    @PostMapping("/add")
    SanPham add(@RequestBody SanPham sanPham) {
        return repo.save(sanPham);
    }

    @DeleteMapping("/delete/{id}")
    Boolean delete(@PathVariable UUID id) {
        System.out.println(repo.findByMa("SP01"));
        try {
            repo.delete(repo.findById(id).get());
            return true;
        }catch (Exception x) {
            x.printStackTrace();
            return false;
        }
    }
}
