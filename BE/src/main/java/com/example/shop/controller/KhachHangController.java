package com.example.shop.controller;

import com.example.shop.entity.DiaChi;
import com.example.shop.entity.HoaDon;
import com.example.shop.entity.HoaDonChiTiet;
import com.example.shop.entity.KhachHang;
import com.example.shop.entity.SanPhamChiTiet;
import com.example.shop.repositories.DiaChiRepository;
import com.example.shop.repositories.KhachHangRepository;
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
            System.out.println(kh);

            KhachHang khNew = khachHangRepository.save(kh);

            DiaChi diaChi = new DiaChi();
            diaChi.setDuong(khachHang.getSoNha());
            diaChi.setTrangThai(1);
            diaChi.setThanhPho(khachHang.getThanhPho());
            diaChi.setHuyen(khachHang.getHuyen());
            diaChi.setXa(khachHang.getXa());
            diaChi.setQuocGia("Việt Nam");
            diaChi.setId_khach_hang(khNew);
            diaChiRepository.save(diaChi);

            //gui mail
            SendMail.sendMailNhanVien(kh.getEmail(),kh.getMatKhau());
//            SimpleDateFormat format = new SimpleDateFormat("HH:mm:ss dd/MM/yyyy");
//            String contentBody = "<html>" +
//                    "<body>" +
//                   "<p>\n" +
//                    "  Mật khẩu của bạn là:\n " + khNew.getTen() + System.currentTimeMillis()+
//                    "</p>" +
//                    "</body>" +
//                    "</html>" ;
//
//
//                SendMail.SendMailOptions(khNew.getEmail() , contentBody);





            return ResponseEntity.ok("Thành công");
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR");
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
            diaChi.setQuocGia("Việt Nam");
            diaChi.setId_khach_hang(khachHangRepository.findById(khachHang.getId()).get());
            diaChiRepository.save(diaChi);
            return ResponseEntity.ok("Thành công");
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
//        List<LichSuMuaHangResponse> lichSuMuaHangResponses = new ArrayList<>();
//        for (HoaDon hd: listHD) {
////            Map<Integer , SanPhamChiTiet> sanPhamChiTiets = new HashMap<>();
//
//            List<HoaDonChiTiet> list = hoaDonChiTietService.getHDCT(hd.getId());
////            list.stream().forEach(i -> sanPhamChiTiets.put(i.getSoLuong() , i.getId_chi_tiet_san_pham()));
//            LichSuMuaHangResponse lichSuMuaHangResponse = new LichSuMuaHangResponse();
//            lichSuMuaHangResponse.setHoaDon(hd);
//            lichSuMuaHangResponse.setHoaDonChiTiets(list);
//            lichSuMuaHangResponses.add(lichSuMuaHangResponse);
//        }
//        lichSuMuaHangResponses.forEach( i -> System.out.println(i));
        return ResponseEntity.ok(listHD);
    }
}
