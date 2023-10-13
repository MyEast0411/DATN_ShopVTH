package com.example.shop.controller;

import com.example.shop.entity.DiaChi;
import com.example.shop.service.DiaChiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.UUID;

@RestController

@RequestMapping("/dia-chi")
public class DiaChiController {
    @Autowired
    private DiaChiService diaChiService;
    @GetMapping("/hien-thi")
    public ArrayList<DiaChi> hienthi(){
        return diaChiService.getAll();
    }

    @GetMapping("/detail/{id}")
    public DiaChi detail(@PathVariable("id")UUID id){
        return diaChiService.getById(id);
    }

    @DeleteMapping ("/delete/{id}")
    public void  delete(@PathVariable("id")UUID id){
       diaChiService.delete(id);
    }

    @PostMapping("/add")
    public DiaChi add(@RequestBody DiaChi diaChi){
        return diaChiService.add(diaChi);
    }
    @PutMapping("/update")
    public DiaChi update(@RequestBody DiaChi diaChi){
        return diaChiService.update(diaChi);
    }
}
