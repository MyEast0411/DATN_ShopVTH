package com.example.shop.controller;

import com.example.shop.entity.DiaChi;
import com.example.shop.entity.HoaDon;
import com.example.shop.entity.HoaDonChiTiet;
import com.example.shop.entity.KhachHang;
import com.example.shop.entity.SanPhamChiTiet;
import com.example.shop.repositories.DiaChiRepository;
import com.example.shop.repositories.KhachHangRepository;
import com.example.shop.requests.KhachHangAddDiaChiRequest;
import com.example.shop.requests.SearchKhachHangRequest;
import com.example.shop.requests.UpdateMatKhauRequest;
import com.example.shop.requests.UpdateSdtRequest;
import com.example.shop.response.LichSuMuaHangResponse;
import com.example.shop.service.HoaDonChiTietService;
import com.example.shop.service.HoaDonService;
import com.example.shop.util.SendMail;
import com.example.shop.util.UploadAnh;
import com.example.shop.viewmodel.KhachHangVM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Controller
@RestController
@CrossOrigin("*")
public class KhachHangController {

    @Autowired
    KhachHangRepository khachHangRepository;

    @Autowired
    DiaChiRepository diaChiRepository;

    @Autowired
    private HoaDonService hoaDonService;
    @Autowired
    private HoaDonChiTietService hoaDonChiTietService;


    @GetMapping("/khach-hang/getAll")
    List<KhachHang> getAll(){
        return khachHangRepository.getAllKh();
    }

    @GetMapping("/khach-hang/detail/{id}")
    public KhachHang detail(@PathVariable("id") String id) {
        return khachHangRepository.findById(id).get();
    }

    @GetMapping("/khach-hang/findByMa/{ma}")
    public KhachHang findByMa(@PathVariable String ma) {
        return khachHangRepository.findByMa(ma);
    }

    @GetMapping("/dia-chi/findByMa/{ma}")
    public List<DiaChi> findDiaChiByMa(@PathVariable String ma) {
        return diaChiRepository.findDiaChiByMa(ma);
    }

    @GetMapping("/dia-chi/findDiaChiMacDinh/{ma}")
    public DiaChi findDiaChiMacDinh(@PathVariable String ma) {
        return diaChiRepository.findDiaChiMacDinh(ma);
    }

    @DeleteMapping("/khach-hang/delete/{id}")
    public void delete(@PathVariable("id") String id) {
        khachHangRepository.delete(khachHangRepository.findById(id).get());
    }

    @DeleteMapping("/dia-chi/delete/{id}")
    public ResponseEntity deleteDiaChi(@PathVariable("id") String id) {
        try {
            if(diaChiRepository.findById(id).get().getTrangThai() == 1) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Không được xóa địa chỉ mặc định");
            }
            diaChiRepository.delete(diaChiRepository.findById(id).get());
            return ResponseEntity.ok("Thành công");
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Xóa thất bại");
        }
    }

    @PostMapping("/khach-hang/add")
    public ResponseEntity add(@RequestBody KhachHangVM khachHang) {
        System.out.println(khachHang);
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Integer maxMa = Integer.parseInt(khachHangRepository.findMaxMa());
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder sb = new StringBuilder(6);
        Random random = new Random();

        for (int i = 0; i < 6; i++) {
            int index = random.nextInt(characters.length());
            sb.append(characters.charAt(index));
        }

        String randomString = sb.toString();
        String urlImg = "";
        try {
            for (KhachHang item:
                    khachHangRepository.getAllKh()) {
                if(item.getEmail().equals(khachHang.getEmail().trim())) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email đã tồn tại !!!");
                }
                if(item.getSdt().equals(khachHang.getSdt().trim())) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Số điện thoại đã tồn tại !!!");
                }
            }
            KhachHang kh = new KhachHang();
            if(khachHang.getAnhNguoiDung() == null || khachHang.getAnhNguoiDung().equals("")) {
                urlImg= "https://i.ibb.co/Zfpv5xv/z4990910514033-c5e7b06a688bc0bd64e7d55442f212a6.jpg";
            }else {
                urlImg = UploadAnh.upload(khachHang.getAnhNguoiDung());
            }
            kh.setAnhNguoiDung(urlImg);
            kh.setMa("KH"+(maxMa + 1));
            kh.setCccd(khachHang.getCccd());
            kh.setTen(khachHang.getTen());
            kh.setEmail(khachHang.getEmail());
            kh.setGioiTinh(khachHang.getGioi_tinh());
            kh.setNgaySinh(dateFormat.parse(khachHang.getNgay_sinh()));
            kh.setSdt(khachHang.getSdt());
            kh.setDeleted(1);
            kh.setTrangThai(1);
            kh.setMatKhau(randomString);

            KhachHang khNew = khachHangRepository.save(kh);

            DiaChi diaChi = new DiaChi();
            diaChi.setDuong(khachHang.getSoNha());
            diaChi.setDeleted(1);
            diaChi.setTrangThai(1);
            diaChi.setDeleted(1);
            diaChi.setThanhPho(khachHang.getThanhPho());
            diaChi.setHuyen(khachHang.getHuyen());
            diaChi.setXa(khachHang.getXa());
            diaChi.setQuocGia("Việt Nam");
            diaChi.setId_khach_hang(khNew);
            diaChiRepository.save(diaChi);

            //gui mail
//            SendMail.sendMailNhanVien(kh.getEmail(),kh.getMatKhau());

            return ResponseEntity.ok("Thành công");
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR");
        }
    }
    @PostMapping("/filterKhachHang")
    public ResponseEntity filterKhachHang(@RequestBody SearchKhachHangRequest khachHang) {
        try {
            List<KhachHang> list = khachHangRepository.filter(khachHang.getSelectedStatus(),khachHang.getTextInput(),khachHang.getTextInput());
            return ResponseEntity.ok(list);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("err");
        }
    }
    @GetMapping("/filterByTrangThai")
    public ResponseEntity filter() {
        try {
            return ResponseEntity.ok(khachHangRepository.filterByTrangThai(1));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("err");
        }
    }
    @PostMapping("/dia-chi/add")
    public ResponseEntity addDiaChi(@RequestBody KhachHangVM khachHang) {

        try {
            KhachHang kh = khachHangRepository.findById(khachHang.getId()).get();
            if(diaChiRepository.findDiaChiByMa(kh.getMa()).size() >= 3 ) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Khách hàng chỉ có thể có 3 địa chỉ !!!");
            }
            DiaChi diaChi = new DiaChi();
            diaChi.setDuong(khachHang.getSoNha());
            diaChi.setThanhPho(khachHang.getThanhPho());
            diaChi.setHuyen(khachHang.getHuyen());
            diaChi.setXa(khachHang.getXa());
            diaChi.setTrangThai(2);
            diaChi.setDeleted(1);
            diaChi.setQuocGia("Việt Nam");
            diaChi.setId_khach_hang(khachHangRepository.findById(khachHang.getId()).get());
            diaChiRepository.save(diaChi);
            return ResponseEntity.ok("Thành công");
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Thêm thất bại");
        }
    }
    @PostMapping("/dia-chi/switchTrangThai")
    public ResponseEntity updateTrangThaiDiaChi(@RequestBody List<DiaChi> list) {
        try {
            System.out.println(list);
            List<DiaChi> lst = diaChiRepository.saveAll(list);
            return ResponseEntity.ok(lst);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Thêm thất bại");
        }
    }
    @PutMapping("/khach-hang/update/{ids}")
    public KhachHang update(@RequestBody KhachHang khachHang, @PathVariable String ids) {
        khachHang.setId(ids);
        return khachHangRepository.save(khachHang);
    }

    @PutMapping("/khach-hang/deleteSoft/{id}")
    public KhachHang deleteSoft(@PathVariable("id") KhachHang khachHang) {
        khachHang.setDeleted(0);
        return khachHangRepository.save(khachHang);
    }

    @GetMapping("/khach-hang/hoa-don/{idKH}")
    public ResponseEntity getHDByKH(@PathVariable("idKH") String idKH){
        List<HoaDon> listHD = hoaDonService.getHDByKH(idKH);
        return ResponseEntity.ok(listHD);
    }

    @GetMapping("/khach-hang/lich-su-mua-hang/{idKH}")
    public ResponseEntity lichSuHD(@PathVariable("idKH") String idKH){
        List<HoaDon> listHD = hoaDonService.getHDByKH(idKH);
        List<LichSuMuaHangResponse> lichSuMuaHangResponses = new ArrayList<>();
        for (HoaDon hd: listHD) {

            List<HoaDonChiTiet> list = hoaDonChiTietService.getHDCT(hd.getId());
            LichSuMuaHangResponse lichSuMuaHangResponse = new LichSuMuaHangResponse();
            lichSuMuaHangResponse.setHoaDon(hd);
            lichSuMuaHangResponse.setHoaDonChiTiets(list);
            lichSuMuaHangResponses.add(lichSuMuaHangResponse);
        }
          return ResponseEntity.ok(lichSuMuaHangResponses);
    }

    //khach hang add dia chi client
    @PostMapping("/khachHangAddDiaChi")
    public ResponseEntity addDiaChiByKhachHang(@RequestBody KhachHangAddDiaChiRequest khachHang) {

        try {
            KhachHang kh = khachHangRepository.findById(khachHang.getIdKhachHang()).get();
            if(diaChiRepository.findDiaChiByMa(kh.getMa()).size() >= 3 ) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Khách hàng chỉ có thể có 3 địa chỉ !");
            }
            DiaChi diaChi = new DiaChi();
            diaChi.setDuong(khachHang.getSoNha());
            diaChi.setThanhPho(khachHang.getThanhPho());
            diaChi.setHuyen(khachHang.getHuyen());
            diaChi.setXa(khachHang.getXa());
            diaChi.setTrangThai(2);
            diaChi.setDeleted(1);
            diaChi.setQuocGia("Việt Nam");
            diaChi.setId_khach_hang(khachHangRepository.findById(khachHang.getIdKhachHang()).get());
            diaChiRepository.save(diaChi);
            return ResponseEntity.ok("Thành công");
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Thêm thất bại");
        }
    }
    @PutMapping("/updateDiaChiMacDinh")
    public ResponseEntity updateDiaChiMacDinh(@RequestBody DiaChi diaChi) {

        try {
            DiaChi dc = diaChiRepository.findById(diaChi.getId()).get();
            dc.setTrangThai(1);
            for (DiaChi item:
                 diaChiRepository.findAll()) {
                if(item.getId() != dc.getId()) {
                    item.setTrangThai(2);
                    diaChiRepository.save(item);
                }
            }
            diaChiRepository.save(dc);
            return ResponseEntity.ok("Thành công");
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Thêm thất bại");
        }
    }

    @PutMapping("/updateMatKhau")
    public ResponseEntity updateMatKhau(@RequestBody UpdateMatKhauRequest request) {
        try {
            KhachHang khachHang = khachHangRepository.findById(request.getIdKhachHang()).get();
            khachHang.setMatKhau(request.getNewPassword());
            KhachHang khachHangResponse =khachHangRepository.save(khachHang);
            return ResponseEntity.ok(khachHangResponse);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Thêm thất bại");
        }
    }

    @PutMapping("/updateSdt")
    public ResponseEntity updateSdt(@RequestBody UpdateSdtRequest request) {
        try {
            KhachHang khachHang = khachHangRepository.findById(request.getIdKhachHang()).get();
            khachHang.setSdt(request.getSdt());
            KhachHang khachHangResponse =khachHangRepository.save(khachHang);
            return ResponseEntity.ok(khachHangResponse);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Thêm thất bại");
        }
    }

}
