
package com.example.shop.controller;

import com.example.shop.dto.GioHangDTO;
import com.example.shop.dto.HoaDonChiTietDTO;
import com.example.shop.dto.HoaDonDTO;
import com.example.shop.dto.HoaDonKhDTO;
import com.example.shop.entity.HoaDon;
import com.example.shop.entity.HoaDonChiTiet;
import com.example.shop.entity.SanPhamChiTiet;
import com.example.shop.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
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
            groupedDataDTO.setSoLuong(""+ssHDCT.getSLSP(maHD));
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
            return ResponseEntity.ok(ssHDCT.getHDCTByMA(maHD));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("ERROR");
        }
    }

    @DeleteMapping("/deleteHDCT/{id_hoa_don}/{id_san_pham}")
    public ResponseEntity deleteHDCT(@PathVariable String id_hoa_don, @PathVariable String id_san_pham) {
        System.out.println("id hoa don " + id_hoa_don);
        System.out.println("id san pham " + id_san_pham);
        try {
            HoaDonChiTiet hdct = HoaDonChiTiet.builder()
                    .id_hoa_don(ssHD.findById(id_hoa_don).get())
                    .id_chi_tiet_san_pham(ssSP.findById(id_san_pham).get())
                    .build();
            ssHDCT.delete(hdct);
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
    @PostMapping("/addHoaDonChiTietToHoaDon")
    public ResponseEntity addHoaDonChiTietToHoaDon(@RequestBody GioHangDTO giohang) {
        Integer maxMaInt;
        try {
            String maxMa = ssHD.getMaxMa();
            if (maxMa == null) {
                maxMaInt = 0;
            } else {
                maxMaInt = Integer.parseInt(maxMa);
            }
            HoaDon hoaDon = HoaDon.builder()
                    .ma("HD" + (maxMaInt + 1))
                    .trangThai(0)
                    .deleted(1)
                    .loaiHd(0)
                    .ngayTao(new Date())
                    .diaChi(giohang.getDiaChi() + "," + giohang.getThanhPho() + "," + giohang.getHuyen() + "," + giohang.getXa())
                    .tongTien(BigDecimal.valueOf(Double.parseDouble(giohang.getTongTien())))
                    .build();
            ssHD.save(hoaDon);
            System.out.println(giohang);
            for (Object gioHangItem : giohang.getGioHang()) {
                if (gioHangItem instanceof Map) {
                    Map<?, ?> gioHangMap = (Map<?, ?>) gioHangItem;

                    Object productObject = gioHangMap.get("product");
                    if (productObject instanceof Map) {
                        Map<?, ?> productMap = (Map<?, ?>) productObject;

                        String id = (String) productMap.get("id");
                        Integer kichCo = Integer.parseInt(productMap.get("kichCo").toString());
                        Double giaBan = Double.valueOf(productMap.get("giaBan").toString());
                        Integer soLuong = Integer.parseInt(productMap.get("soLuong").toString());

                        System.out.println("kichCo: " + kichCo);
                        System.out.println("id: " + id);
                        System.out.println("giaBan: " + giaBan);
                        System.out.println("soLuong: " + soLuong);

                        HoaDonChiTiet hdct = new HoaDonChiTiet();
                        hdct.setId_hoa_don(hoaDon);
                        hdct.setId_chi_tiet_san_pham(ssSP.findById(id).get());
                        hdct.setSoLuong(soLuong);
                        hdct.setGiaTien(BigDecimal.valueOf(giaBan));
                        ssHDCT.save(hdct);
                    }
                }
            }
            return ResponseEntity.ok("Thành công");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("ERROR");
        }
    }
    //----------------------Hội--------------------------//

    @GetMapping("getHDCTByID/{idHD}")
    public ResponseEntity<List<HoaDonChiTiet>> getHDCTByIDHD(@PathVariable("idHD") String idHD) {
        return ResponseEntity.ok(ssHDCT.getHDCT(idHD));
    }


}
