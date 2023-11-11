package com.example.shop.controller;

import com.example.shop.entity.KhachHang;
import com.example.shop.entity.KhachHangVoucher;
import com.example.shop.entity.Voucher;
import com.example.shop.service.KhachHangService;
import com.example.shop.service.KhachHangVoucherService;
import com.example.shop.service.VoucherService;
import com.example.shop.viewmodel.DataReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
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

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Properties;

@RestController
@CrossOrigin("*")
@RequestMapping("voucher")
public class VoucherController {

    @Autowired
    private VoucherService voucherService;
    @Autowired
    private KhachHangVoucherService khachHangVoucherService;
    @Autowired
    private KhachHangService khachHangService;
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


    @PostMapping("add-voucher")
    public ResponseEntity<List<KhachHangVoucher>> addVoucher(
            @RequestBody DataReq object

    ){
        List<KhachHangVoucher>   listVCKH = new ArrayList<>();
        List<KhachHang> listKhachHangData = object.getListKhachHang();
        List<KhachHangVoucher>   listVCKHReturn = new ArrayList<>();
        Voucher voucherData = object.getVoucher();
        voucherData.setMa("VC"+new Date().getTime());
        voucherData.setNguoiTao("ADMIN");
        if (listKhachHangData.size() == 0){
          Voucher voucherSaved =  voucherService.addVoucher(voucherData);
            List<KhachHang> listKhachHang = khachHangService.getKhachHangs(0);
            for (KhachHang khachHang :
                    listKhachHang) {
                KhachHangVoucher voucher =
                        KhachHangVoucher
                        .builder()
                        .id_voucher(voucherSaved)
                        .id_khach_hang(khachHang)
                         .deleted(0)
                         .nguoiTao("cam")
                         .trangThai(1)
                         .ngayTao(new Date())
                         .build();
                listVCKH.add(voucher);
            }
            listVCKHReturn=  khachHangVoucherService.saveAll(listVCKH);
        }else{
            voucherData.setSoLuong(listKhachHangData.size());
            Voucher voucherSaved =  voucherService.addVoucher(voucherData);
            for (KhachHang khachHang :
                    listKhachHangData) {
                KhachHangVoucher voucher =
                        KhachHangVoucher
                                .builder()
                                .id_voucher(voucherSaved)
                                .id_khach_hang(khachHang)
                                .deleted(0)
                                .nguoiTao("cam")
                                .trangThai(1)
                                .build();
                listVCKH.add(voucher);
            }
            listVCKHReturn=   khachHangVoucherService.saveAll(listVCKH);
        }


        return new ResponseEntity<>(listVCKHReturn , HttpStatus.CREATED);
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
                voucher.setId(voucher.getId());
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


    @Scheduled(fixedRate  = 1000)
    public void scheduleFixedDelayTask() {
        SimpleDateFormat sdf3 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        List<Voucher> vouchers = voucherService.voucherByNgayKT();
        for (Voucher voucher: voucherService.getVouchers()
        ) {
            if (sdf3.format(timestamp).equals(sdf3.format(voucher.getNgayKetThuc()))){
               voucher.setTrangThai(0);
                voucherService.updateVoucher(voucher);
            }
        }
    }
}
