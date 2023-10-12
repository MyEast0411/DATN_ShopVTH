package com.example.shop.controller;

import com.example.shop.entity.HoaDon;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.ArrayList;
import java.util.List;

public class HoaDonController {
    @GetMapping
    public ResponseEntity<List<HoaDon>> getHoaDons(){
        return new ResponseEntity(new ArrayList<>() , HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<HoaDon> getHoaDon(){
        return ResponseEntity.ok(new HoaDon());
    }


    @PostMapping
    public ResponseEntity<HoaDon> addHoaDon(){
        return new ResponseEntity<>(new HoaDon() , HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<HoaDon> updateHoaDon(){
        return new ResponseEntity<>(new HoaDon() , HttpStatus.CREATED);
    }

    @DeleteMapping
    public ResponseEntity<Boolean> deleteHoaDon(){
        return new ResponseEntity(Boolean.FALSE , HttpStatus.OK);
    }
}
