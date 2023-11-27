package com.example.shop.controller;

import com.example.shop.dto.BieuDoThongKe;
import com.example.shop.dto.HoaDonThongKeDTO;
import com.example.shop.entity.HoaDon;
import com.example.shop.entity.HoaDonChiTiet;
import com.example.shop.entity.HoaDonThanhToanId;
import com.example.shop.entity.SanPhamChiTiet;
import com.example.shop.repositories.ChiTietSanPhamRepository;
import com.example.shop.service.HoaDonChiTietService;
import com.example.shop.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
@CrossOrigin("*")
@RequestMapping("thong-ke")
public class ThongKeController {
    @Autowired
    private HoaDonService hoaDonService;
    @Autowired
    private HoaDonChiTietService hoaDonChiTietService;

    @Autowired
    private ChiTietSanPhamRepository chiTietSanPhamRepository;
    @GetMapping("/{option}")
    public ResponseEntity<List<BieuDoThongKe>> getTotalByThang(@PathVariable("option")String option) {
        List<BieuDoThongKe> dataBieuDo = new ArrayList<>();
     if (option.equals("year")){
          dataBieuDo =   hoaDonService.getTotalByThang();
     }else if (option.equals("month")){
         dataBieuDo =   hoaDonService.getTotalByThang();
     }else{
        dataBieuDo =   hoaDonService.getTotalByThang();
     }
        return ResponseEntity.ok(dataBieuDo);
    }

    @GetMapping("/top5HDNew")
    public ResponseEntity<List<HoaDonThongKeDTO>> top5(){
        return ResponseEntity.ok(hoaDonService.top5HDMoi());
    }

    @GetMapping("/getTotal")
    public ResponseEntity<BigDecimal> getTotal(){
        return ResponseEntity.ok(hoaDonService.getTotalAll());
    }

    @GetMapping("/getTotalWeek")
    public ResponseEntity<List<HoaDon>> getTotalWeekProfit(){
        return ResponseEntity.ok(hoaDonService.getHoaDons());
    }

    @GetMapping("/countHD")
    public ResponseEntity<Integer> countHD(){
        return ResponseEntity.ok(hoaDonService.countHD());
    }

    @GetMapping("/top3SP")
    public ResponseEntity getTop3(){
        return ResponseEntity.ok(hoaDonChiTietService.getTop3());
    }

    @GetMapping("/totalSPSaled")
    public ResponseEntity<Integer> totalSPSaled(){
        return ResponseEntity.ok(hoaDonChiTietService.totalSPSaled());
    }

    @GetMapping("/SPCTMin")
    public ResponseEntity<List<SanPhamChiTiet>> spctMin(){
        return ResponseEntity.ok(chiTietSanPhamRepository.getAllSPCTMin());
    }

}
