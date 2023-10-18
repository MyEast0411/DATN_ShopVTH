package com.example.shop.controller;

import com.example.shop.entity.ChucVu;
import com.example.shop.entity.DiaChi;
import com.example.shop.service.ChucVuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@CrossOrigin("http://localhost:3000")
@RequestMapping("/chuc-vu")

public class ChucVuController {
    @Autowired
  private   ChucVuService chucVuService;

    @GetMapping("/hien-thi")
    public ArrayList<ChucVu> hienthi(){
        return chucVuService.getAll();
    }

    @GetMapping("/detail/{id}")
    public ChucVu detail(@PathVariable("id") String id){
        return chucVuService.getById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void  delete(@PathVariable("id")String id){
        chucVuService.delete(id);
    }

    @PostMapping("/add")
    public ChucVu add(@RequestBody ChucVu chucVu){
        return chucVuService.add(chucVu);
    }
    @PutMapping("/update/{id}")
    public ChucVu update(@RequestBody  ChucVu chucVu,@PathVariable String id){

        return chucVuService.update(chucVu);
    }
}
