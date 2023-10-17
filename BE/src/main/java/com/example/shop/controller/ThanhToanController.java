package com.example.shop.controller;

import com.example.shop.entity.ThanhToan;
import com.example.shop.entity.Voucher;
import com.example.shop.service.ThanhToanService;
import com.example.shop.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("thanh-toan")
public class ThanhToanController {
    @Autowired
    private ThanhToanService thanhToanService;

    @GetMapping("getThanhToans")
    public ResponseEntity<List<ThanhToan>> getThanhToans() {
        return ResponseEntity.ok(thanhToanService.getThanhToans());
    }

    @GetMapping("getThanhToan/{id}")
    public ResponseEntity<ThanhToan> getThanhToan(@PathVariable("id") ThanhToan thanhToan) {
        return ResponseEntity.ok(
                thanhToan
        );
    }


    @PostMapping("add")
    public ResponseEntity<ThanhToan> addThanhToan(@RequestBody ThanhToan thanhToan) {
        thanhToan.setMa_giao_dich(System.currentTimeMillis()+"");
        ThanhToan thanhToanSucess = thanhToanService.addThanhToan(thanhToan);
        return new ResponseEntity<>(thanhToanSucess, HttpStatus.CREATED);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<ThanhToan> updateThanhToan(
            @PathVariable("id") String id,
            @RequestBody ThanhToan thanhToan
    ) throws Exception {

        try {
            ThanhToan thanhToanExist = thanhToanService.getThanhToan(id);
            if (thanhToanExist != null) {
                thanhToan.setIds(thanhToanExist.getIds());
                ThanhToan voucherAdd = thanhToanService.addThanhToan(thanhToan);
                return new ResponseEntity<>(voucherAdd, HttpStatus.CREATED);
            } else {
                throw new Exception("khong co id" + id);
            }
        } catch (Exception exception) {
            return null;
        }


    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Boolean> deleteThanhToan(@PathVariable("id") String id) {
        String mess = "";
        ThanhToan thanhToan = thanhToanService.getThanhToan(id);
        if(thanhToan == null){
            mess = "Not find thanh toan with " + id;
        }else{
            Boolean kq = thanhToanService.deleteThanhToan(thanhToan);
            mess = kq? "Delete success":"Delete fail";
        }
        return new ResponseEntity(mess , HttpStatus.OK);
    }
}
