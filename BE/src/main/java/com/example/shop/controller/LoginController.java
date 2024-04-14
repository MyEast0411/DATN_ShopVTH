package com.example.shop.controller;

import com.example.shop.dto.UserDTO;
import com.example.shop.entity.KhachHang;
import com.example.shop.entity.NhanVien;
import com.example.shop.repositories.KhachHangRepository;
import com.example.shop.repositories.NhanVienRepository;
import com.example.shop.response.UserResponse;
import com.example.shop.service.KhachHangService;
import com.example.shop.util.SendMail;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@RestController
@CrossOrigin("*")
@RequestMapping("user")
@RequiredArgsConstructor
public class LoginController {
    private final KhachHangService khachHangService;

    public static UserResponse userResponse = new UserResponse();
    @Autowired
    KhachHangRepository khachHangRepository;

    @Autowired
    NhanVienRepository nhanVienRepository;
    public static String maConfirm = "KH123";

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody UserDTO dto){
        KhachHang khachHang = khachHangService.login(dto);
        if (khachHang == null){
            NhanVien nhanVien = nhanVienRepository.login(dto.getEmail(),dto.getPass());
            if(nhanVien != null) {
                userResponse.setId(nhanVien.getId());
                userResponse.setMa(nhanVien.getMa());
                return ResponseEntity.ok(nhanVien);
            }
            return ResponseEntity.badRequest().body("FAILED");
        }
        return ResponseEntity.ok(khachHang);
    }

    @GetMapping("/findByMa")
    public ResponseEntity findByMa() {
        NhanVien nhanVien = nhanVienRepository.findByMa(userResponse.getMa());
        if (nhanVien == null){
            return  ResponseEntity.ok("FAILED");
        }
        return ResponseEntity.ok(nhanVien);
    }
    @GetMapping("/logout")
    public ResponseEntity logout() {
        userResponse = new UserResponse();
        return ResponseEntity.ok("Đăng xuất thành công");
    }

    @PostMapping("/check-mail")
    public ResponseEntity check(@RequestBody UserDTO dto){
        KhachHang khachHang = khachHangService.findEmail(dto);
        if (khachHang == null){
            NhanVien nhanVien = nhanVienRepository.findEmail(dto.getEmail());
            if(nhanVien != null) {
                return ResponseEntity.ok(nhanVien);
            }
            SendMail.SendMailOptions(dto.getEmail(), maConfirm);
            return ResponseEntity.ok(HttpStatus.NOT_FOUND);
        }else{
            return ResponseEntity.ok(HttpStatus.OK);
        }

    }
    @PostMapping("/register")
    public ResponseEntity register(@RequestBody UserDTO dto) throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("ddMMyyyy");
      if (dto.getMa().equals(maConfirm)  ){
          KhachHang kh = new KhachHang();
          kh.setMa("KH"+ new Date().getTime());
          kh.setTen(dto.getTen());
          kh.setEmail(dto.getEmail());
          kh.setNgaySinh(dateFormat.parse(dateFormat.format(dto.getNgaySinh())));
          kh.setSdt(dto.getSdt());
          kh.setTrangThai(1);
          kh.setMatKhau(dto.getPass());
          KhachHang khNew = khachHangRepository.save(kh);
          return ResponseEntity.ok(khNew);
      }else {
         return ResponseEntity.ok("FAILD") ;
      }
    }
}
