
package com.example.shop.controller;

import com.example.shop.dto.*;
import com.example.shop.entity.*;
import com.example.shop.repositories.*;
import com.example.shop.util.SendMail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
@RequestMapping("hoa_don_chi_tiet")
public class HoaDonChiTietController {
    @Autowired
    HoaDonChiTietRepository ssHDCT;

    @Autowired
    HoaDonRepository ssHD;

    @Autowired
    ChiTietSanPhamRepository ssSP;

    @Autowired
    KhachHangRepository ssKH;

    @Autowired
    VoucherRepository ssVC;

    @Autowired
    LichSuHoaDonRepository ssLSHD;

    @GetMapping("/getHDCT/{maHD}")
    public ResponseEntity getHDCT(@PathVariable String maHD) {
        List<HoaDonChiTiet> list = ssHDCT.getHDCTByMA(maHD);
        Map<String, List<HoaDonChiTiet>> groupedData = list.stream()
                .collect(Collectors.groupingBy(item -> String.valueOf(item.getId_hoa_don().getMa())));
        List<HoaDonDTO> result = new ArrayList<>();
        for (Map.Entry<String, List<HoaDonChiTiet>> entry : groupedData.entrySet()) {
            HoaDonDTO groupedDataDTO = new HoaDonDTO();
            groupedDataDTO.setId(maHD);
            groupedDataDTO.setList(entry.getValue());
            groupedDataDTO.setSoLuong("" + ssHDCT.getSLSP(maHD));
            result.add(groupedDataDTO);
        }
        try {
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("ERROR");
        }
    }

    @GetMapping("/getHDCTByMa/{maHD}")
    public ResponseEntity getHDCTByMa(@PathVariable String maHD) {
        try {
            HoaDon hoaDon = ssHD.getHoaDonByMa(maHD);
            Double tongTien = ssHD.getTongTien(maHD) == null ? null : ssHD.getTongTien(maHD);
            List<Voucher> voucherList = ssVC.getVoucherByGiaTriMin(ssHD.getTongTien(maHD));
            Optional<Double> maxGiaTri = voucherList.stream()
                    .map(Voucher::getGiaTriMax)
                    .max(Comparator.naturalOrder());
            voucherList.sort(Comparator.comparingDouble(Voucher::getGiaTriMax));

            if(voucherList.isEmpty()) {
                hoaDon.setId_voucher(null);
                ssHD.save(hoaDon);
                return ResponseEntity.ok(ssHDCT.getHDCTByMA(maHD));
            }
            for (Voucher x:
                    voucherList) {
                if(tongTien >= x.getGiaTriMin() && x.getGiaTriMax() >= maxGiaTri.get()) {
                    hoaDon.setId_voucher(x);
                    ssHD.save(hoaDon);
                }else {
                    hoaDon.setId_voucher(null);
                }
            }
            return ResponseEntity.ok(ssHDCT.getHDCTByMA(maHD));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("ERROR");
        }
    }

    @DeleteMapping("/deleteHDCT/{id_hoa_don}/{id_san_pham}")
    public ResponseEntity deleteHDCT(@PathVariable String id_hoa_don, @PathVariable String id_san_pham) {

        try {
            HoaDon don = ssHD.findById(id_hoa_don).get();
            SanPhamChiTiet sanPhamChiTiet = ssSP.findById(id_san_pham).get();
            double tongTien = 0;
            HoaDonChiTiet hdct = HoaDonChiTiet.builder()
                    .id_hoa_don(don)
                    .id_chi_tiet_san_pham(sanPhamChiTiet)
                    .build();
            ssHDCT.delete(hdct);
            List<HoaDonChiTiet> list = ssHDCT.getHDCT(id_hoa_don);
            for (HoaDonChiTiet donChiTiet : list) {
                tongTien += donChiTiet.getSoLuong() * donChiTiet.getGiaTien().doubleValue();
            }
            don.setTongTien(new BigDecimal(tongTien + ""));
            ssHD.save(don);
            return ResponseEntity.ok("OK");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("ERROR");
        }
    }

    @PostMapping("/addHDCT")
    public ResponseEntity addHDCT(@RequestBody HoaDonChiTietDTO hoaDonChiTiet) {
        try {
            System.out.println(hoaDonChiTiet.toString());
            SanPhamChiTiet sp = ssSP.findById(hoaDonChiTiet.getId_san_pham()).get();
            BigDecimal tongTien = sp.getGiaBan().multiply(BigDecimal.valueOf(hoaDonChiTiet.getSo_luong()));
            HoaDonChiTiet hdct = HoaDonChiTiet.
                    builder()
                    .id_hoa_don(ssHD.getHoaDonByMa(hoaDonChiTiet.getId_hoa_don()))
                    .id_chi_tiet_san_pham(sp)
                    .soLuong(hoaDonChiTiet.getSo_luong())
                    .giaTien(tongTien)
                    .deleted(1)
                    .build();
            System.out.println(hdct);
            ssHDCT.save(hdct);
            return ResponseEntity.ok("Thành công");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("ERROR");
        }
    }

    @PutMapping("/addKH_HD")
    public ResponseEntity addKH_HD(@RequestBody HoaDonKhDTO x) {
        try {
            HoaDon hd = ssHD.getHoaDonByMa(x.getMaHD());
            if (x.getId_khach_hang().equals("")) {
                hd.setId_khach_hang(null);
            } else {
                hd.setId_khach_hang(ssKH.findById(x.getId_khach_hang()).get());
            }
            ssHD.save(hd);
            return ResponseEntity.ok("Thành công");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("ERROR");
        }
    }

    @PutMapping("/addVC_HD")
    public ResponseEntity addVC_HD(@RequestBody HoaDonKhDTO x) {
        System.out.println(x);
        try {
            HoaDon hd = ssHD.getHoaDonByMa(x.getMaHD());
            if (x.getId_khach_hang().equals("")) {
                hd.setId_voucher(null);
            } else {
                hd.setId_voucher(ssVC.findById(x.getId_khach_hang()).get());
            }
            ssHD.save(hd);
            return ResponseEntity.ok("Thành công");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("ERROR");
        }
    }

    @PutMapping("/removeVC_HD")
    public ResponseEntity removeVC_HD(@RequestBody HoaDonKhDTO x) {
        try {
            HoaDon hd = ssHD.getHoaDonByMa(x.getMaHD());
            hd.setId_voucher(null);
            ssHD.save(hd);
            return ResponseEntity.ok("Thành công");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("ERROR");
        }
    }

    //----------------------Hội--------------------------//
//    @PostMapping("/addHoaDonChiTietToHoaDon")
//    public ResponseEntity addHoaDonChiTietToHoaDon(@RequestBody CartNotLoginDTO cartNotLoginDTO) {
//        System.out.println(cartNotLoginDTO.getEmail());
//        System.out.println(cartNotLoginDTO.getPhuongThucThanhToan());
//        for (SanPhamChiTiet n : cartNotLoginDTO.getSanPhams()) {
//            System.out.println("SanPhamChiTiet: " + n);
//        }
//
//        String maxMaString = ssHD.getMaxMa();
//        Integer maxMa = (maxMaString != null) ? Integer.parseInt(maxMaString) : null;
//        if (maxMa == null) {
//            maxMa = 0;
//        }
//
//        HoaDon hoaDon = HoaDon.builder()
//                .ma("HD" + (maxMa + 1))
//                .trangThai(7)
//                .deleted(1)
//                .loaiHd(1)
//                .nguoiTao("User")
//                .ngayTao(new Date())
//                .build();
//        ssHD.save(hoaDon);
//
//        HoaDonChiTiet newHoaDonChiTiet = new HoaDonChiTiet();
//        newHoaDonChiTiet.setId_hoa_don(hoaDon);
//        newHoaDonChiTiet.setId_chi_tiet_san_pham(cartNotLoginDTO.getSanPhams());
//        ssHDCT.save(newHoaDonChiTiet);
//
//        return ResponseEntity.ok(newHoaDonChiTiet);
//    }

    @PostMapping("/addHoaDonChiTietToHoaDon")
    public ResponseEntity addHoaDonChiTietToHoaDon(@RequestBody CartNotLoginDTO cartNotLoginDTO) {
        System.out.println("getEmail: " + cartNotLoginDTO.getEmail());
        System.out.println("getHoTen: " + cartNotLoginDTO.getHoTen());
        System.out.println("getSdt: " + cartNotLoginDTO.getSoDienThoai());
        System.out.println("getDiaChi: " + cartNotLoginDTO.getDiaChi());
        System.out.println("getXaPhuong: " + cartNotLoginDTO.getXaPhuong());
        System.out.println("getQuanHuyen: " + cartNotLoginDTO.getQuanHuyen());
        System.out.println("getThanhPho: " + cartNotLoginDTO.getThanhPho());
        System.out.println("getThoiGianNhanHang: " + cartNotLoginDTO.getDeliveryTime());
        System.out.println("getPhiVanChuyen: " + cartNotLoginDTO.getPhiVanChuyen());
        System.out.println("getPhuongThucThanhToan: " + cartNotLoginDTO.getPhuongThucThanhToan());
        System.out.println("getTongTien: " + cartNotLoginDTO.getTongTien());

        List<HoaDonChiTiet> listHDCT = new ArrayList<>();
        try {
            String maxMaString = ssHD.getMaxMa();
            Integer maxMa = (maxMaString != null) ? Integer.parseInt(maxMaString) : null;
            if (maxMa == null) {
                maxMa = 0;
            }
            HoaDon hoaDon = HoaDon.builder()
                    .ma("HD" + (maxMa + 1))
                    .trangThai(0)
                    .deleted(1)
                    .loaiHd(0)
                    .ngayTao(new Date())
                    .diaChi(cartNotLoginDTO.getDiaChi() + "," + cartNotLoginDTO.getThanhPho() + "," + cartNotLoginDTO.getQuanHuyen() + "," + cartNotLoginDTO.getXaPhuong())
                    .tongTien(BigDecimal.valueOf(Double.parseDouble(cartNotLoginDTO.getTongTien())))
                    .build();
            HoaDon hd1 = ssHD.save(hoaDon);

            LichSuHoaDon lichSuHoaDon = LichSuHoaDon.builder()
                    .id_hoa_don(hd1)
                    .moTaHoaDon("Chờ xác nhận")
                    .deleted(1)
                    .nguoiTao("Đông")
                    .ngayTao(new Date(System.currentTimeMillis()))
                    .build();
            ssLSHD.save(lichSuHoaDon);
            for (SanPhamChiTiet sanPhamChiTiet : cartNotLoginDTO.getSanPhams()) {
                HoaDonChiTiet hoaDonChiTiet = HoaDonChiTiet.builder()
                        .id_hoa_don(hd1)
                        .id_chi_tiet_san_pham(sanPhamChiTiet)
                        .soLuong(cartNotLoginDTO.getSoLuong())
                        .build();
                listHDCT.add(hoaDonChiTiet);
                ssHDCT.save(hoaDonChiTiet);
            }
            SendMail.SenMail(cartNotLoginDTO.getEmail(), cartNotLoginDTO.getEmail(), cartNotLoginDTO.getDeliveryTime(),
                    cartNotLoginDTO.getPhiVanChuyen(), cartNotLoginDTO.getTongTien(), listHDCT);
            return ResponseEntity.ok("Thanh toán thành công");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("err");
//            return ResponseEntity.badRequest().body(e);
        }
    }

    //----------------------Hội--------------------------//

    @GetMapping("getHDCTByID/{idHD}")
    public ResponseEntity<List<HoaDonChiTiet>> getHDCTByIDHD(@PathVariable("idHD") String idHD) {
        return ResponseEntity.ok(ssHDCT.getHDCT(idHD));
    }


}
