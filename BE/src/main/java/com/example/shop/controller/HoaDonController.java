package com.example.shop.controller;

import com.example.shop.entity.HoaDon;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
@RestController
@CrossOrigin("*")
@RequestMapping("hoa_don")
public class HoaDonController {
    @GetMapping("getHoaDons")
    public ResponseEntity<List<HoaDon>> getHoaDons(){
        return new ResponseEntity(new ArrayList<>() , HttpStatus.OK);
    }

    @GetMapping("getHoaDon/{id}")
    public ResponseEntity<HoaDon> getHoaDon(){
        return ResponseEntity.ok(new HoaDon());
    }


    @PostMapping("add")
    public ResponseEntity<HoaDon> addHoaDon(){
        return new ResponseEntity<>(new HoaDon() , HttpStatus.CREATED);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<HoaDon> updateHoaDon(){
        return new ResponseEntity<>(new HoaDon() , HttpStatus.CREATED);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Boolean> deleteHoaDon(){
        return new ResponseEntity(Boolean.FALSE , HttpStatus.OK);
    }
}
