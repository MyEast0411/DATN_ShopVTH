package com.example.shop.controller;

import com.example.shop.dto.BieuDoThongKe;
import com.example.shop.dto.HoaDonThongKeDTO;
import com.example.shop.entity.HoaDon;
import com.example.shop.entity.HoaDonChiTiet;
import com.example.shop.entity.HoaDonThanhToanId;
import com.example.shop.entity.SanPhamChiTiet;
import com.example.shop.repositories.ChiTietSanPhamRepository;
import com.example.shop.requests.SeachThongKeRequest;
import com.example.shop.response.ThongKeResponse;
import com.example.shop.service.HoaDonChiTietService;
import com.example.shop.service.HoaDonService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

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
    @GetMapping("/column/{option}")
    public ResponseEntity getTotalByThang(@PathVariable("option")String option) {
//        List<BieuDoThongKe> dataBieuDo = new ArrayList<>();
     if (option.equals("year")){
         return ResponseEntity.ok(hoaDonService.getTotalByThang());
     }else if (option.equals("month")){
         return ResponseEntity.ok(hoaDonService.getWeekInMonth());
     }else{
         return ResponseEntity.ok(hoaDonService.getDayInWeek());
     }

    }


    @GetMapping("/table/{option}")
    public ResponseEntity getDataTable(@PathVariable("option")String option) {
//        List<BieuDoThongKe> dataBieuDo = new ArrayList<>();
        if (option.equals("year")){
            return ResponseEntity.ok(hoaDonChiTietService.getTop5Year());
        }else if (option.equals("month")){
            return ResponseEntity.ok(hoaDonChiTietService.getTop5Year());
        }else{
            return ResponseEntity.ok(hoaDonChiTietService.getTop5Year());
        }

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

    @GetMapping("/getWeekInMonth")
    public ResponseEntity<List<BieuDoThongKe>> getWeekInMonth(){
        return ResponseEntity.ok(hoaDonService.getWeekInMonth());
    }

    @PostMapping("/search")
    public ResponseEntity search(@RequestBody SeachThongKeRequest request){
       LocalDate localDateBD = null;
        LocalDate localDateKT = null;
        if (request.getNgayBD() != null){
            localDateBD = changeDateToLocalDate(request.getNgayBD());
        }

        if (request.getNgayKT() != null){
            localDateKT = changeDateToLocalDate(request.getNgayKT());
        }


        LocalDate finalLocalDateBD = localDateBD;
        LocalDate finalLocalDateKT = localDateKT;
        List<HoaDon> filteredTests =  hoaDonService.getHoaDons().stream()
                .filter(event -> finalLocalDateBD == null
                        || changeDateToLocalDate(event.getNgayTao()).isAfter(finalLocalDateBD)
                        || changeDateToLocalDate(event.getNgayTao()).isEqual(finalLocalDateBD))
                .filter(event ->  finalLocalDateKT == null
                        || changeDateToLocalDate(event.getNgayTao()).isBefore(finalLocalDateKT)
                        || changeDateToLocalDate(event.getNgayTao()).isEqual(finalLocalDateKT))
                .collect(Collectors.toList());



        // công tổng tiền

     Double tongGia = filteredTests.stream().mapToDouble(p -> p.getTongTien() == null?0:p.getTongTien().doubleValue()  ).reduce(0, (a, b) -> a + b);

        // số lượng sản phẩm
        Integer soLuongSp = 0;
        for (HoaDon hd: filteredTests) {

            Integer sl = hoaDonChiTietService.getSLSP(hd.getId());
//            System.out.println("HD : " + hd.getId() +" - sl : " + sl);
            sl = sl == null ?0 : sl;
            soLuongSp += sl;
        }
        Set<SanPhamChiTiet> set = new HashSet<>();
        for (HoaDon hd: filteredTests) {
            List<HoaDonChiTiet> list = hoaDonChiTietService.getHDCT(hd.getId());
            list.stream().forEach(i -> set.add(i.getId_chi_tiet_san_pham()));
        }

        System.out.println(set.size());



        // sô lượng hóa đơn


        System.out.println(
                String.format("Số lượng hóa đơn %s , sản phẩm : %s , tổng tiền : %f" , filteredTests.size() , 0 , tongGia)
        );
        ThongKeResponse thongKeResponse = new ThongKeResponse();
        thongKeResponse.setSlhd(filteredTests.size());
        thongKeResponse.setSlsp(soLuongSp);
        thongKeResponse.setTongTien(tongGia);
        thongKeResponse.setSpdb(set.stream().toList());



        return ResponseEntity.ok(thongKeResponse);

    }

    public LocalDate changeDateToLocalDate(Date date){
        Instant instant = date.toInstant();
        // Chuyển đổi từ Instant sang LocalDate
        LocalDate localDate = instant.atZone(ZoneId.systemDefault()).toLocalDate();
        return localDate;
    }

}
