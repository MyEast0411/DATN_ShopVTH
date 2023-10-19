package com.example.shop.controller;

import com.example.shop.entity.Voucher;
import com.example.shop.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
import org.springframework.web.bind.annotation.RequestParam;
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
    public ResponseEntity<List<Voucher>> getVouchers(
            @RequestParam(name = "page" , defaultValue = "0")Integer numPage
    ){

//        List<Voucher> page = voucherService.getVouchers();
       List<Voucher> page = voucherService.getVouchers(0);
        return ResponseEntity.ok(page);
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
            System.out.println(voucher);
            Voucher voucher1 = voucherService.getVoucher(id);
            if (voucher1 != null){
                voucher.setIds(voucher.getIds());
                Voucher voucherAdd = voucherService.updateVoucher(voucher);
                return new ResponseEntity<>(voucherAdd , HttpStatus.CREATED);
            }else{
                throw new Exception("khong co id" + id);
            }
        }catch (Exception exception){
            return null;
        }

    }

    @PutMapping("update-trang-thai/{id}")
    public ResponseEntity<Voucher> updateVoucher(
            @PathVariable("id")String id
    ) throws Exception {
        try{
            Voucher voucher1 = voucherService.getVoucher(id);
            if (voucher1 != null){
                voucher1.setTrangThai(voucher1.getTrangThai()==1?0:1);
                Voucher voucherAdd = voucherService.updateVoucher(voucher1);
                return new ResponseEntity<>(voucherAdd , HttpStatus.CREATED);
            }else{
                throw new Exception("khong co id" + id);
            }
        }catch (Exception exception){
            return null;
        }

    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Voucher> deleteVoucher(@PathVariable("id")String id){
        try{
            Voucher voucher1 = voucherService.getVoucher(id);
            if (voucher1 != null){
                voucher1.setDeleted(1);
                Voucher voucherAdd = voucherService.updateVoucher(voucher1);
                return new ResponseEntity<>(voucherAdd , HttpStatus.CREATED);
            }else{
                throw new Exception("khong co id" + id);
            }
        }catch (Exception exception){
            return new ResponseEntity(null , HttpStatus.NOT_FOUND);
        }
//        return new ResponseEntity(null , HttpStatus.OK);
    }
}
