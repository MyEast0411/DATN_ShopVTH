
package com.example.shop.controller;

import com.example.shop.dto.*;
import com.example.shop.entity.*;
import com.example.shop.repositories.*;
import com.example.shop.requests.HoaDonChiTietUpdateRequest;
import com.example.shop.util.SendMail;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
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
    NhanVienRepository ssNV;

    @Autowired
    VoucherRepository ssVC;

    @Autowired
    LichSuHoaDonRepository ssLSHD;
    private String idNhanVien = "8fc123b4-c457-4447-99d3-f39faaec2c5b";
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

    @PostMapping("/update/{id_hoa_don}/{id_san_pham}")
    public ResponseEntity updateSPCT(@PathVariable String id_hoa_don, @PathVariable String id_san_pham,
                                     @RequestBody HoaDonChiTietUpdateRequest request
    ) {
        try {
            HoaDonChiTiet hoaDonChiTiet = ssHDCT.getHDCT(id_hoa_don , id_san_pham);
            hoaDonChiTiet.setSoLuong(request.getQuantity());
            ssHDCT.save(hoaDonChiTiet);

            Double gia = ssHDCT.getMoneyBYHD(id_hoa_don);
            HoaDon hoaDon = ssHD.findById(id_hoa_don).get();
            hoaDon.setTongTien(new BigDecimal("" + gia));
            ssHD.save(hoaDon);
            return ResponseEntity.ok("OK");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("ERROR");
        }
    }

    @PostMapping("/addHDCT")
    public ResponseEntity addHDCT(@RequestBody HoaDonChiTietDTO hoaDonChiTiet) {
        try {
            HoaDon hoaDon = ssHD.getHoaDonByMa(hoaDonChiTiet.getId_hoa_don());
            HoaDonChiTiet hoaDonChiTietExist = ssHDCT.getHDCT(hoaDon.getId() , hoaDonChiTiet.getId_san_pham());
            SanPhamChiTiet sp = ssSP.findById(hoaDonChiTiet.getId_san_pham()).get();
            BigDecimal tongTien = sp.getGiaBan().multiply(BigDecimal.valueOf(hoaDonChiTiet.getSo_luong()));
           if (hoaDonChiTietExist == null){
               HoaDonChiTiet hdct = HoaDonChiTiet.
                       builder()
                       .id_hoa_don(hoaDon)
                       .id_chi_tiet_san_pham(sp)
                       .soLuong(hoaDonChiTiet.getSo_luong())
                       .giaTien(tongTien)
                       .deleted(1)
                       .build();
               ssHDCT.save(hdct);
           }else{
               hoaDonChiTietExist.setSoLuong(hoaDonChiTietExist.getSoLuong() + hoaDonChiTiet.getSo_luong());
               ssHDCT.save(hoaDonChiTietExist);
              
           }
            Double gia = ssHDCT.getMoneyBYHD(hoaDon.getId());
            hoaDon.setTongTien(new BigDecimal("" + gia));
            ssHD.save(hoaDon);

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
    public ResponseEntity addHoaDonChiTietToHoaDon(@RequestBody CartNotLoginDTO cartNotLoginDTO) {
        SimpleDateFormat format = new SimpleDateFormat();
        System.out.println("getEmail: " + cartNotLoginDTO.getEmail());
        System.out.println("getMa: " + cartNotLoginDTO.getMaKH());
        System.out.println("getHoTen: " + cartNotLoginDTO.getHoTen());
        System.out.println("getSdt: " + cartNotLoginDTO.getSoDienThoai());
        System.out.println("getDiaChi: " + cartNotLoginDTO.getDuong());
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
            KhachHang khachHang = ssKH.findByMa(cartNotLoginDTO.getMaKH());
            Voucher voucher = ssVC.getVoucherByCode(cartNotLoginDTO.getVoucher());
            voucher.setSoLuong(voucher.getSoLuong() - 1);
            ssVC.save(voucher);
            HoaDon hoaDon = HoaDon.builder()
                    .ma("HD" + (maxMa + 1))
                    .trangThai(0)
                    .deleted(1)
                    .loaiHd(0)
                    .ngayTao(new Date())
                    .id_khach_hang(khachHang)
                    .sdt(khachHang == null ? null : khachHang.getSdt())
                    .tenKhachHang(khachHang== null ? null : khachHang.getTen())
                    .id_voucher(voucher)
                    .id_nhan_vien(ssNV.findById(idNhanVien).get())
                    .tienGiam(BigDecimal.valueOf(voucher.getGiaTriMax()))
                    .tienShip(BigDecimal.valueOf(Double.valueOf(cartNotLoginDTO.getPhiVanChuyen())))
                    .ngayNhan(new Date(cartNotLoginDTO.getDeliveryTime()))
                    .diaChi(cartNotLoginDTO.getDuong() + "," + cartNotLoginDTO.getThanhPho() + "," + cartNotLoginDTO.getQuanHuyen() + "," + cartNotLoginDTO.getXaPhuong())
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
            SendMail.SenMail(cartNotLoginDTO.getEmail(), hd1.getMa(), cartNotLoginDTO.getDeliveryTime(),
                    cartNotLoginDTO.getPhiVanChuyen(), cartNotLoginDTO.getTongTien(), cartNotLoginDTO.getHoTen());
            return ResponseEntity.ok("Thanh toán thành công");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("err");
//            return ResponseEntity.badRequest().body("err");
        }
    }

    //----------------------Hội--------------------------//

    @GetMapping("getHDCTByID/{idHD}")
    public ResponseEntity<List<HoaDonChiTiet>> getHDCTByIDHD(@PathVariable("idHD") String idHD) {
        return ResponseEntity.ok(ssHDCT.getHDCT(idHD));
    }


}
