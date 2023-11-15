package com.example.shop.controller;

import com.example.shop.dto.ThanhToanDTO;
import com.example.shop.entity.HinhThucThanhToan;
import com.example.shop.entity.HoaDon;
import com.example.shop.entity.ThanhToan;
import com.example.shop.entity.Voucher;
import com.example.shop.repositories.HinhAnhRepository;
import com.example.shop.repositories.HinhThucThanhToanRepository;
import com.example.shop.repositories.HoaDonRepository;
import com.example.shop.service.HinhThucThanhToanService;
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

    @Autowired
    private HinhThucThanhToanRepository hinhThucThanhToanService;

    @Autowired
    private HoaDonRepository ssHD;
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

    @PostMapping("addThanhToan")
    public ResponseEntity addTT(@RequestBody ThanhToanDTO thanhToan) {
        try {
            System.out.println(thanhToan);
            HoaDon hd = ssHD.getHoaDonByMa(thanhToan.getMaHD());
            ThanhToan tt = ThanhToan.builder()
                    .hinhThuc(thanhToan.getPhuongThuc())
                    .ma_giao_dich(thanhToan.getMaGiaoDich())
                    .soTien(thanhToan.getSoTien())
                    .build();
            ThanhToan newThanhToan = thanhToanService.addThanhToan(tt);

            HinhThucThanhToan hinhThucThanhToan = HinhThucThanhToan.builder()
                    .id_hoa_don(hd)
                    .id_thanh_toan(newThanhToan)
                    .build();
            hinhThucThanhToanService.save(hinhThucThanhToan);
            System.out.println(tt);
            return ResponseEntity.ok("Thành công");
        }catch (Exception e) {
            return ResponseEntity.badRequest().body("ERROR");
        }
    }

    @PutMapping("update/{id}")
    public ResponseEntity<ThanhToan> updateThanhToan(
            @PathVariable("id") String id,
            @RequestBody ThanhToan thanhToan
    ) throws Exception {

        try {
            ThanhToan thanhToanExist = thanhToanService.getThanhToan(id);
            if (thanhToanExist != null) {
                thanhToan.setId(thanhToanExist.getId());
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
