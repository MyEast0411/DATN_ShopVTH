package com.example.shop.controller;

import com.example.shop.entity.Voucher;
import com.example.shop.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
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
import java.util.Properties;

@RestController
@CrossOrigin("*")
@RequestMapping("voucher")
public class VoucherController {

    @Autowired
    private VoucherService voucherService;
    @GetMapping("getVouchers")
    public ResponseEntity<List<Voucher>> getVouchers(){
        return ResponseEntity.ok(voucherService.getVouchers());
    }

    @GetMapping("getVoucher/{id}")
    public ResponseEntity<Voucher> getVoucher(@PathVariable("id")Voucher voucher){
        return ResponseEntity.ok(voucher);
    }


    @PostMapping("add")
    public ResponseEntity<Voucher> addVoucher( @RequestBody Voucher voucher){
        Voucher voucherAdd = voucherService.addVoucher(voucher);
        return new ResponseEntity<>(voucherAdd , HttpStatus.CREATED);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<Voucher> updateVoucher(
            @PathVariable("id")String id  ,
            @RequestBody Voucher voucher
            ) throws Exception {
        try{
            Voucher voucher1 = voucherService.getVoucher(id);
            if (voucher1 != null){
                voucher.setId(voucher.getId());
                Voucher voucherAdd = voucherService.addVoucher(voucher);
                return new ResponseEntity<>(voucherAdd , HttpStatus.CREATED);
            }else{
                throw new Exception("khong co id" + id);
            }
        }catch (Exception exception){
            return null;
        }

    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<List<Voucher>> deleteVoucher(@PathVariable("id")String id){
        String mess = "";
        Voucher voucher = voucherService.getVoucher(id);
        if(voucher == null){
            mess = "Not find voucher with " + id;

        }else{
            Boolean kq = voucherService.deleteVoucher(voucher);
            mess = kq? "Delete success":"Delete fail";
        }
        System.out.println(mess);
        return new ResponseEntity(voucherService.getVouchers() , HttpStatus.OK);
    }
}
