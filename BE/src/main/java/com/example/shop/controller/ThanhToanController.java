package com.example.shop.controller;

import com.example.shop.entity.ThanhToan;
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
@RequestMapping("thanh-toan")
public class ThanhToanController {
    @GetMapping
    public ResponseEntity<List<ThanhToan>> getThanhToans(){
        return ResponseEntity.ok(new ArrayList<>());
    }

    @GetMapping
    public ResponseEntity<ThanhToan> getThanhToan(){
        return ResponseEntity.ok(new ThanhToan());
    }


    @PostMapping
    public ResponseEntity<ThanhToan> addThanhToan(){
        return new ResponseEntity<>(new ThanhToan() , HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<ThanhToan> updateThanhToan(){
        return new ResponseEntity<>(new ThanhToan() , HttpStatus.CREATED);
    }

    @DeleteMapping
    public ResponseEntity<Boolean> deleteThanhToan(){
        return new ResponseEntity(Boolean.FALSE , HttpStatus.OK);
    }
}
