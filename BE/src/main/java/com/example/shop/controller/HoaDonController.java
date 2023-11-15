package com.example.shop.controller;

import com.example.shop.entity.HoaDon;
import com.example.shop.entity.Voucher;
import com.example.shop.repositories.HoaDonRepository;
import com.example.shop.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
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
@RestController
@CrossOrigin("*")
@RequestMapping("hoa_don")
public class HoaDonController {
    @Autowired
    private HoaDonService hoaDonService;

    @Autowired
    private HoaDonRepository hoaDonRepository;
    @GetMapping("getHoaDons")
    public ResponseEntity<List<HoaDon>> getHoaDons(
            @RequestParam(name = "page" , defaultValue = "0")Integer numPage
    ){
//        Pageable pageable = PageRequest.of(numPage , 3);
//        Page<HoaDon> page = hoaDonService.getHoaDons(pageable);
        List<HoaDon> page = hoaDonService.getHoaDons();
        return ResponseEntity.ok(page);
    }

    @GetMapping("getHoaDons/{trangThai}")
    public ResponseEntity<List<HoaDon>> getHDs(
            @RequestParam(name = "page" , defaultValue = "0")Integer numPage,
            @PathVariable Integer trangThai
    ){
//        Pageable pageable = PageRequest.of(numPage , 3);
//        Page<HoaDon> page = hoaDonService.getHDs(trangThai , pageable);
        List<HoaDon> page = hoaDonService.getHoaDons();
        if(trangThai !=-1){
            page   = hoaDonService.getHDs(trangThai);
        }

        return ResponseEntity.ok(page);
    }

    @GetMapping("getHoaDon/{id}")
    public ResponseEntity<HoaDon> getHoaDon(@PathVariable("id")HoaDon hoaDon){
        return ResponseEntity.ok(hoaDon);
    }

    @GetMapping("getHoaDonCTT")
    public ResponseEntity<List<HoaDon>> getHoaDonCTT(){
        return ResponseEntity.ok(hoaDonRepository.getHDChuaTT());
    }


    @PostMapping("add")
    public ResponseEntity<HoaDon> addHoaDon(
            @RequestBody HoaDon hoaDon
    ){
        HoaDon hoaDonSave = hoaDonService.addHoaDon(hoaDon);
        return new ResponseEntity<>(hoaDonSave, HttpStatus.CREATED);
    }

    @PostMapping("taoHoaDon")
    public ResponseEntity<HoaDon> taoHoaDon(){
        Integer maxMa = Integer.parseInt(hoaDonRepository.getMaxMa());
        HoaDon hoaDon = HoaDon.builder()
                .ma("HD"+(maxMa+1))
                .trangThai(7)
                .deleted(0)
                .build();
        hoaDonRepository.save(hoaDon);
        return new ResponseEntity<>(hoaDon, HttpStatus.CREATED);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<HoaDon> updateHoaDon(
            @PathVariable("id")String id,
            @RequestBody HoaDon hoaDon
    ){
        try{
            HoaDon hoaDon1 = hoaDonService.getHoaDon(id);
            if (hoaDon1 != null){
                hoaDon.setId(hoaDon.getId());
                HoaDon updateHoaDon = hoaDonService.updateHoaDon(hoaDon);
                return new ResponseEntity<>(updateHoaDon , HttpStatus.CREATED);
            }else{
                throw new Exception("khong co id" + id);
            }
        }catch (Exception exception){
            return null;
        }
    }

    @PutMapping("thanhToanHoaDon/{id}")
    public ResponseEntity thanhToanHoaDon(
            @PathVariable("id")String id,
            @RequestBody HoaDon hoaDon
    ){
        try{
            HoaDon hoaDon1 = hoaDonRepository.getHoaDonByMa(id);
            System.out.println(hoaDon1.toString());
            if (hoaDon1 != null){
                hoaDon1.setTrangThai(5);
                hoaDon1.setLoaiHd(hoaDon.getLoaiHd());
                hoaDon1.setTenKhachHang(hoaDon.getTenKhachHang());
                hoaDon1.setSdt(hoaDon.getSdt());
                hoaDon1.setTongTien(hoaDon.getTongTien());
                HoaDon updateHoaDon = hoaDonRepository.save(hoaDon1);
                return new ResponseEntity<>(updateHoaDon , HttpStatus.CREATED);
            }else{
                throw new Exception("khong co id" + id);
            }
        }catch (Exception exception){
            return ResponseEntity.badRequest().body("ERROR");
        }
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteHoaDon(@PathVariable("id")String id){
        String mess = "";
        HoaDon hoaDon = hoaDonService.getHoaDon(id);
        if(hoaDon == null){
            mess = "Not find hoa don with " + id;

        }else{
            Boolean kq = hoaDonService.deleteHoaDon(hoaDon);
            mess = kq? "Delete success":"Delete fail";
        }
//        System.out.println(mess);
        return new ResponseEntity(mess , HttpStatus.OK);
    }
}
