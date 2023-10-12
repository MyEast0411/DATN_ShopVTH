package com.example.shop.controller;

import com.example.shop.entity.Voucher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.ArrayList;
import java.util.List;

public class VoucherController {
    @GetMapping
    public ResponseEntity<List<Voucher>> getVouchers(){
        return ResponseEntity.ok(new ArrayList<>());
    }

    @GetMapping
    public ResponseEntity<Voucher> getVoucher(){
        return ResponseEntity.ok(new Voucher());
    }


    @PostMapping
    public ResponseEntity<Voucher> addVoucher(){
        return new ResponseEntity<>(new Voucher() , HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Voucher> updateVoucher(){
        return new ResponseEntity<>(new Voucher() , HttpStatus.CREATED);
    }

    @DeleteMapping
    public ResponseEntity<Boolean> deleteVoucher(){
        return new ResponseEntity(Boolean.FALSE , HttpStatus.OK);
    }
}
