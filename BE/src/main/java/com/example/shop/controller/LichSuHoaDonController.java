package com.example.shop.controller;

import com.example.shop.entity.HoaDon;
import com.example.shop.entity.LichSuHoaDon;
import com.example.shop.service.HoaDonService;
import com.example.shop.service.LichSuHoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
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
import java.util.Date;
import java.util.List;
@RestController
@CrossOrigin("*")
@RequestMapping("lich_su_hoa_don")
public class LichSuHoaDonController {
    @Autowired
    private LichSuHoaDonService lichSuHoaDonService;

    @Autowired
    private HoaDonService hoaDonService;
    @GetMapping("getLichSuHoaDons/{id}")
    public ResponseEntity<List<LichSuHoaDon>> getLichSuHoaDons(@PathVariable String id){
        List<LichSuHoaDon> list = lichSuHoaDonService.getLichSuHoaDons(id);
        return ResponseEntity.ok(list);
    }

    @GetMapping("getLichSuHoaDon/{id}")
    public ResponseEntity<LichSuHoaDon> getLichSuHoaDon(){
        return ResponseEntity.ok(new LichSuHoaDon());
    }


    @PostMapping("add/{idHD}")
    public ResponseEntity<LichSuHoaDon> addLichSuHoaDon(
            @PathVariable("idHD")HoaDon  hoaDon,
            @RequestBody LichSuHoaDon lshd

    ){
        LichSuHoaDon lichSuHoaDon =
                LichSuHoaDon.builder()
                        .id_hoa_don(hoaDon)
                        .moTaHoaDon(lshd.getMoTaHoaDon())
                        .deleted(lshd.getDeleted())
                        .nguoiTao(lshd.getNguoiTao())
                        .ngayTao(new Date(System.currentTimeMillis()))
                        .build();
        lichSuHoaDonService.addLichSuHoaDon(lichSuHoaDon);
        hoaDon.setTrangThai(hoaDon.getTrangThai()+1);
        hoaDonService.updateHoaDon(hoaDon);
        return ResponseEntity.ok(lichSuHoaDon);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<List<LichSuHoaDon>> updateLichSuHoaDon(){
        return ResponseEntity.ok(new ArrayList<>());
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<List<LichSuHoaDon>> deleteLichSuHoaDon(){
        return ResponseEntity.ok(new ArrayList<>());
    }
}
