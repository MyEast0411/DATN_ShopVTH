package com.example.shop.controller;

import com.example.shop.dto.UserDTO;
import com.example.shop.entity.KhachHang;
import com.example.shop.repositories.KhachHangRepository;
import com.example.shop.service.KhachHangService;
import com.example.shop.util.SendMail;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@CrossOrigin("*")
@RequestMapping("user")
@RequiredArgsConstructor
public class LoginController {
    private final KhachHangService khachHangService;
    @Autowired
    KhachHangRepository khachHangRepository;
    public static String maConfirm = "KH123";

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody UserDTO dto){
        KhachHang khachHang = khachHangService.login(dto);
        return ResponseEntity.ok(khachHang);
    }

    @PostMapping("/check-mail")
    public ResponseEntity check(@RequestBody UserDTO dto){
        KhachHang khachHang = khachHangService.findEmail(dto);
        if (khachHang== null){
            // gửi mail
            SendMail.SendMailOptions(dto.getEmail() , maConfirm);
            return ResponseEntity.ok(HttpStatus.NOT_FOUND);
        }else{
            return ResponseEntity.ok(HttpStatus.OK);
        }

    }
    @PostMapping("/register")
    public ResponseEntity register(@RequestBody UserDTO dto) throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("ddMMyyyy");
      if (dto.getMa().equals(maConfirm)  ){
          System.out.println(dto);
          KhachHang kh = new KhachHang();
          kh.setMa("KH"+ new Date().getTime());
          kh.setTen(dto.getTen());
          kh.setEmail(dto.getEmail());
          kh.setNgaySinh(dateFormat.parse(dateFormat.format(dto.getNgaySinh())));
          kh.setSdt(dto.getSdt());
          kh.setTrangThai(1);
          KhachHang khNew = khachHangRepository.save(kh);
          return ResponseEntity.ok(khNew);
      }else {
         return ResponseEntity.ok("FAILD") ;
      }

    }


}
