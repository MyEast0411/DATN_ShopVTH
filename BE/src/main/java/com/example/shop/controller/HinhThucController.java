package com.example.shop.controller;

import com.example.shop.entity.HinhThucThanhToan;
import com.example.shop.entity.HoaDon;
import com.example.shop.repositories.HinhThucThanhToanRepository;
import com.example.shop.repositories.HoaDonRepository;
import com.example.shop.repositories.ThanhToanRepository;
import com.example.shop.service.HinhThucThanhToanService;
import com.example.shop.service.HoaDonService;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@CrossOrigin("*")
@RequestMapping("htth")
public class HinhThucController {
    @Autowired
    private HinhThucThanhToanService hinhThucThanhToanService;

    @Autowired
    private HoaDonRepository hoaDonRepository;

    @Autowired
    private ThanhToanRepository thanhToanRepository;

    @Autowired
    private HinhThucThanhToanRepository repo;
    @GetMapping("getHTTT/{id}")
    public ResponseEntity<List<HinhThucThanhToan>> getHoaDons(
           @PathVariable("id") String idHD
    ){
        List<HinhThucThanhToan> list = hinhThucThanhToanService.getHTTT(idHD);
        return ResponseEntity.ok(list);
    }

    @GetMapping("getThanhToan/{maHD}")
    public ResponseEntity<List<HinhThucThanhToan>> getThanhToan(
            @PathVariable("maHD") String maHD
    ){
        List<HinhThucThanhToan> list = hinhThucThanhToanService.getThanhToan(maHD);
        return ResponseEntity.ok(list);
    }

    @DeleteMapping("deleteHinhThuc/{id_hoa_don}/{id_thanh_toan}")
    public ResponseEntity deleteHinhThuc(@PathVariable String id_hoa_don,@PathVariable String id_thanh_toan) {
        try {
            HinhThucThanhToan hinhThucThanhToan = HinhThucThanhToan.builder()
                    .id_hoa_don(hoaDonRepository.findById(id_hoa_don).get())
                    .id_thanh_toan(thanhToanRepository.findById(id_thanh_toan).get())
                    .build();
            repo.delete(hinhThucThanhToan);
            return ResponseEntity.ok("Thành công");
        }catch (Exception e) {
            return ResponseEntity.badRequest().body("ERROR");
        }
    }

}

