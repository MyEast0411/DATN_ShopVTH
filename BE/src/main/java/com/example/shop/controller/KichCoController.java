package com.example.shop.controller;

import com.example.shop.entity.KichCo;
import com.example.shop.repositories.KichCoRepository;
import com.example.shop.requests.UpdateKichCoRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@Controller
@RestController
@CrossOrigin("*")
@RequestMapping("kich-co")
public class KichCoController {

    @Autowired
    private KichCoRepository repo;

    @GetMapping("getAllKichCo")
    public ResponseEntity getAllKichCo() {
        return ResponseEntity.ok(repo.getAll());
    }

    @GetMapping("getByMa/{ma}")
    public ResponseEntity getByMa(@PathVariable String ma) {
        return ResponseEntity.ok(repo.findByMa(ma));
    }

    @PostMapping("/addKichCo")
    public ResponseEntity addKichCo(@RequestBody KichCo kichCo) {
        try {
            KichCo kc = KichCo.builder()
                    .ma(kichCo.getMa())
                    .ten(kichCo.getTen())
                    .ngayTao(new Date())
                    .nguoiTao("Đông")
                    .deleted(1)
                    .build();
            repo.save(kc);
            return ResponseEntity.ok("Thành công");
        }catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @PutMapping("deleteKichCo/{maKichCo}")
    public ResponseEntity deleteKichCo(@PathVariable String maKichCo) {
        try {
            KichCo kc = repo.findByMa(maKichCo);
            kc.setDeleted(0);
            repo.save(kc);
            return ResponseEntity.ok("Thành công");
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("ERR");
        }
    }

    @PutMapping("updateKichCo")
    public ResponseEntity updateKichCo(@RequestBody UpdateKichCoRequest kichCo) {
        try {
            KichCo kc = repo.findById(kichCo.getId()).get();
            kc.setMa(kichCo.getMa());
            kc.setTen(kichCo.getTen());
            kc.setNgaySua(new Date());
            kc.setNguoiSua("Đông");
            repo.save(kc);
            return ResponseEntity.ok("Thành công");
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("ERR");
        }
    }

}
