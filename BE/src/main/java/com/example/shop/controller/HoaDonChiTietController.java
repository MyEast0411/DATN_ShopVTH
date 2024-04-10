
package com.example.shop.controller;

import com.example.shop.dto.*;
import com.example.shop.entity.*;
import com.example.shop.repositories.*;
import com.example.shop.requests.HoaDonChiTietUpdateRequest;
import com.example.shop.response.TraHangRes;
import com.example.shop.service.HoaDonService;
import com.example.shop.service.LichSuHoaDonService;
import com.example.shop.util.SendMail;
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
    ChiTietSanPhamRepository ssSPCT;
    @Autowired
    NhanVienRepository ssNV;

    @Autowired
    VoucherRepository ssVC;

    @Autowired
    LichSuHoaDonRepository ssLSHD;
    @Autowired
    private LichSuHoaDonService lichSuHoaDonService;
    @Autowired
     HoaDonService hoaDonService;
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

            if (voucherList.isEmpty()) {
                hoaDon.setId_voucher(null);
                ssHD.save(hoaDon);
                return ResponseEntity.ok(ssHDCT.getHDCTByMA(maHD));
            }
            for (Voucher x :
                    voucherList) {
                if (tongTien >= x.getGiaTriMin() && x.getGiaTriMax() >= maxGiaTri.get()) {
                    hoaDon.setId_voucher(x);
                    ssHD.save(hoaDon);
                } else {
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
            boolean check = true;
            HoaDonChiTiet hoaDonChiTiet = ssHDCT.getHDCT(id_hoa_don, id_san_pham);
            System.out.println("id hd "+ hoaDonChiTiet.getId_hoa_don().getId());
            System.out.println("id sp "+ hoaDonChiTiet.getId_chi_tiet_san_pham().getId());
            for (HoaDonChiTiet hdct:
                    ssHDCT.findAll()) {
                if(hdct.getId_hoa_don().getId().equals(hoaDonChiTiet.getId_hoa_don().getId())
                        && hdct.getId_chi_tiet_san_pham().getId().equals(hoaDonChiTiet.getId_chi_tiet_san_pham().getId())) {
                    if (hoaDonChiTiet.getId_chi_tiet_san_pham().getDeleted() == 0) {
                        System.out.println(1);
                        HoaDonChiTiet hdChiTiet = HoaDonChiTiet.
                                builder()
                                .id_hoa_don(hoaDonChiTiet.getId_hoa_don())
                                .id_chi_tiet_san_pham(ssSPCT.findSanPhamDangBan(hoaDonChiTiet.getId_chi_tiet_san_pham().getMa()))
                                .soLuong(request.getQuantity() - hoaDonChiTiet.getSoLuong())
                                .giaTien(hoaDonChiTiet.getId_chi_tiet_san_pham().getGiaBan().multiply(BigDecimal.valueOf(hoaDonChiTiet.getSoLuong())))
                                .deleted(1)
                                .build();
                        ssHDCT.save(hdChiTiet);
                        check = false;
                    } else {
                        System.out.println(2);
                        hdct.setSoLuong(request.getQuantity());
                        hdct.setGiaTien(hdct.getId_chi_tiet_san_pham().getGiaBan());
                        hdct.setDeleted(1);
                        check = false;
                        ssHDCT.save(hdct);
                    }
                }
            }
            if(check) {
                if (hoaDonChiTiet.getId_chi_tiet_san_pham().getDeleted() == 0) {
                    HoaDonChiTiet hdct = HoaDonChiTiet.
                            builder()
                            .id_hoa_don(hoaDonChiTiet.getId_hoa_don())
                            .id_chi_tiet_san_pham(hoaDonChiTiet.getId_chi_tiet_san_pham())
                            .soLuong(hoaDonChiTiet.getSoLuong())
                            .giaTien(hoaDonChiTiet.getId_chi_tiet_san_pham().getGiaBan().multiply(BigDecimal.valueOf(hoaDonChiTiet.getSoLuong())))
                            .deleted(1)
                            .build();
                    ssHDCT.save(hdct);
                } else {
                    hoaDonChiTiet.setSoLuong(request.getQuantity());
                    ssHDCT.save(hoaDonChiTiet);
                }
            }
            Double gia = ssHDCT.getMoneyBYHD(id_hoa_don);
            System.out.println(ssHDCT.getMoneyBYHD(id_hoa_don));
            HoaDon hoaDon = ssHD.findById(id_hoa_don).get();
            hoaDon.setTongTien(new BigDecimal(gia)
                    .subtract(hoaDon.getTienGiam()== null?new BigDecimal("0") :hoaDon.getTienGiam())
                    .add(hoaDon.getTienShip()== null?new BigDecimal("0") :hoaDon.getTienShip()));
            ssHD.save(hoaDon);

            LichSuHoaDon lichSuHoaDon = LichSuHoaDon.builder()
                    .id_hoa_don(hoaDon)
                    .moTaHoaDon(String.format("Khách hàng đã sửa cập nhật sản phẩm mã %s",
                            hoaDonChiTiet.getId_chi_tiet_san_pham().getMa()))
                    .deleted(1)
                    .nguoiTao("Đông")
                    .ngayTao(new Date(System.currentTimeMillis()))
                    .build();
            lichSuHoaDonService.addLichSuHoaDon(lichSuHoaDon);
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
            HoaDonChiTiet hoaDonChiTietExist = ssHDCT.getHDCT(hoaDon.getId(), hoaDonChiTiet.getId_san_pham());
            SanPhamChiTiet sp = ssSP.findById(hoaDonChiTiet.getId_san_pham()).get();
            BigDecimal tongTien = sp.getGiaBan().multiply(BigDecimal.valueOf(hoaDonChiTiet.getSo_luong()));
            boolean check = true;
//            if (hoaDonChiTietExist == null) {
            for (HoaDonChiTiet hdct:
                 ssHDCT.findAll()) {
                if(hdct.getId_hoa_don().getId().equals(hoaDon.getId()) && hdct.getId_chi_tiet_san_pham().getId().equals(hoaDonChiTiet.getId_san_pham())) {
                    hdct.setSoLuong(hdct.getSoLuong() + 1);
                    hdct.setGiaTien(hdct.getId_chi_tiet_san_pham().getGiaBan());
                    hdct.setDeleted(1);
                    check = false;
                    ssHDCT.save(hdct);
                }
            }
            if(check) {
                HoaDonChiTiet hdct = HoaDonChiTiet.
                        builder()
                        .id_hoa_don(hoaDon)
                        .id_chi_tiet_san_pham(sp)
                        .soLuong(hoaDonChiTiet.getSo_luong())
                        .giaTien(tongTien)
                        .deleted(1)
                        .build();
                ssHDCT.save(hdct);
            }
//            } else {
//                hoaDonChiTietExist.setSoLuong(hoaDonChiTietExist.getSoLuong() + hoaDonChiTiet.getSo_luong());
//                ssHDCT.save(hoaDonChiTietExist);
//            }
            System.out.println(check);
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
            return ResponseEntity.ok(hd.getId_voucher().getMa());
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
        System.out.println("getVoucher: " + cartNotLoginDTO.getVoucher());
        List<HoaDonChiTiet> listHDCT = new ArrayList<>();
        try {
            String maxMaString = ssHD.getMaxMa();
            Integer maxMa = (maxMaString != null) ? Integer.parseInt(maxMaString) : null;
            if (maxMa == null) {
                maxMa = 0;
            }
            KhachHang khachHang = ssKH.findByMa(cartNotLoginDTO.getMaKH());
            Voucher voucher = ssVC.getVoucherByCode(cartNotLoginDTO.getVoucher());
            Double tienGiam = 0.0;
            if(voucher != null) {
                voucher.setSoLuong(voucher.getSoLuong() - 1);
                tienGiam = voucher.getGiaTriMax();
                ssVC.save(voucher);
            }
            HoaDon hd1 = new HoaDon();
            if(cartNotLoginDTO.getValue() == 1) {
                HoaDon hoaDon = HoaDon.builder()
                        .ma("HD" + (maxMa + 1))
                        .trangThai(0)
                        .deleted(1)
                        .loaiHd(0)
                        .ngayTao(new Date())
                        .id_khach_hang(khachHang)
                        .sdt(khachHang == null ? null : khachHang.getSdt())
                        .tenKhachHang(khachHang == null ? null : khachHang.getTen())
                        .id_voucher(voucher)
                        .id_nhan_vien(ssNV.findById(idNhanVien).get())
                        .tienGiam(BigDecimal.valueOf(tienGiam))
                        .tienShip(BigDecimal.valueOf(Double.valueOf(cartNotLoginDTO.getPhiVanChuyen())))
                        .ngayNhan(new Date(cartNotLoginDTO.getDeliveryTime()))
                        .diaChi(cartNotLoginDTO.getDuong() + "," + cartNotLoginDTO.getThanhPho() + "," + cartNotLoginDTO.getQuanHuyen() + "," + cartNotLoginDTO.getXaPhuong())
                        .tongTien(BigDecimal.valueOf(Double.parseDouble(cartNotLoginDTO.getTongTien())))
                        .build();
                hd1 = ssHD.save(hoaDon);
            }else if(cartNotLoginDTO.getValue() == 2) {
                HoaDon hoaDon = HoaDon.builder()
                        .ma("HDHoaToc" + (maxMa + 1))
                        .trangThai(0)
                        .deleted(1)
                        .loaiHd(0)
                        .ngayTao(new Date())
                        .id_khach_hang(khachHang)
                        .sdt(khachHang == null ? null : khachHang.getSdt())
                        .tenKhachHang(khachHang == null ? null : khachHang.getTen())
                        .id_voucher(voucher)
                        .id_nhan_vien(ssNV.findById(idNhanVien).get())
                        .tienGiam(BigDecimal.valueOf(tienGiam))
                        .tienShip(BigDecimal.valueOf(Double.valueOf(cartNotLoginDTO.getPhiVanChuyen())))
                        .ngayNhan(new Date(cartNotLoginDTO.getDeliveryTime()))
                        .diaChi(cartNotLoginDTO.getDuong() + "," + cartNotLoginDTO.getThanhPho() + "," + cartNotLoginDTO.getQuanHuyen() + "," + cartNotLoginDTO.getXaPhuong())
                        .tongTien(BigDecimal.valueOf(Double.parseDouble(cartNotLoginDTO.getTongTien())))
                        .build();
                hd1 = ssHD.save(hoaDon);
            }

            LichSuHoaDon lichSuHoaDon = LichSuHoaDon.builder()
                    .id_hoa_don(hd1)
                    .moTaHoaDon("Chờ xác nhận")
                    .deleted(1)
                    .nguoiTao("Đông")
                    .ngayTao(new Date(System.currentTimeMillis()))
                    .build();
            ssLSHD.save(lichSuHoaDon);
            for (SanPhamChiTiet sanPhamChiTiet : cartNotLoginDTO.getSanPhams()) {
                SanPhamChiTiet spct = sanPhamChiTiet;
                if(sanPhamChiTiet.getSoLuongTon() <= 0 || sanPhamChiTiet.getSoLuongTon() - cartNotLoginDTO.getSoLuong() < 0) {
                    return ResponseEntity.badRequest().body("Sản phẩm không " + sanPhamChiTiet.getTen() +" đủ số lượng tồn !!!");
                }
                sanPhamChiTiet.setSoLuongTon(sanPhamChiTiet.getSoLuongTon() - cartNotLoginDTO.getSoLuong());
                ssSPCT.save(sanPhamChiTiet);
                spct.setId(null);
                spct.setDeleted(0);
                spct.setNgayTao(new Date());
                spct.setTen(spct.getTen() +"[OLD]");
                HoaDonChiTiet hoaDonChiTiet = HoaDonChiTiet.builder()
                        .id_hoa_don(hd1)
                        .id_chi_tiet_san_pham(ssSPCT.save(spct))
                        .soLuong(cartNotLoginDTO.getSoLuong())
                        .giaTien(sanPhamChiTiet.getGiaBan())
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





    @GetMapping("/getHDDoiTra/{maHD}")
    public ResponseEntity getHDDoiTra(@PathVariable String maHD){
        try {
            HoaDonDoiTraDTO hoaDonDoiTraDTO = new HoaDonDoiTraDTO();
        HoaDon hoaDon = hoaDonService.findHDDoiTra(maHD);
          List<HoaDonChiTiet> list = ssHDCT.getHDCT(hoaDon.getId());

            hoaDonDoiTraDTO.setHoaDon(hoaDon);
           hoaDonDoiTraDTO.setListHDCT(list);

            return ResponseEntity.ok(hoaDonDoiTraDTO);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("ERROR");
        }
    }

    @PostMapping("/updateHDVoucher/{maHD}")
    public ResponseEntity updateHDVoucher(@PathVariable String maHD , @RequestBody DoiTraDTO doiTraDTO) {
        try {
//            System.out.println(doiTraDTO);
            HoaDon hoaDon = ssHD.getHoaDonByMa(maHD);
            Double tongTienSauTra = doiTraDTO.getTongTienSauTra();
            List<Voucher> voucherList = ssVC.getVoucherByGiaTriMin(tongTienSauTra);
            Optional<Double> maxGiaTri = voucherList.stream()
                    .map(Voucher::getGiaTriMax)
                    .max(Comparator.naturalOrder());
            voucherList.sort(Comparator.comparingDouble(Voucher::getGiaTriMax));
            HoaDonDoiTraDTO hoaDonDoiTraDTO = new HoaDonDoiTraDTO();
            if (voucherList.isEmpty()) {
                hoaDon.setId_voucher(null);
                HoaDon hoaDonSaved = ssHD.save(hoaDon);
                List<HoaDonChiTiet> list = ssHDCT.getHDCT(hoaDonSaved.getId());
                hoaDonDoiTraDTO.setHoaDon(hoaDonSaved);
                hoaDonDoiTraDTO.setListHDCT(list);
                return ResponseEntity.ok(hoaDonDoiTraDTO);
            }
            for (Voucher x :
                    voucherList) {
                if (tongTienSauTra >= x.getGiaTriMin() && x.getGiaTriMax() >= maxGiaTri.get()) {
                    hoaDon.setId_voucher(x);
                   HoaDon hoaDonSaved =  ssHD.save(hoaDon);
                    hoaDonDoiTraDTO.setHoaDon(hoaDonSaved);
                } else {
                    hoaDon.setId_voucher(null);
                }
            }
            List<HoaDonChiTiet> list = ssHDCT.getHDCT(hoaDonDoiTraDTO.getHoaDon().getId());
            hoaDonDoiTraDTO.setListHDCT(list);
            return ResponseEntity.ok(hoaDonDoiTraDTO);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("ERROR");
        }
    }

    @PostMapping("/updateHDDoiTra/{maHD}")
    public ResponseEntity updateHDDoiTra(@PathVariable String maHD , @RequestBody TraHangRes traHangRes) {
        try {
            List<HoaDonChiTietCustomer> list = traHangRes.getListSPST();
            List<HoaDonChiTietCustomer> listTra = traHangRes.getListSPCTDoiTra();
            Double tienSauGiam = traHangRes.getTongTienSauTra();
            HoaDon hoaDon = ssHD.getHoaDonByMa(maHD);
            StringBuilder stringBuilder = new StringBuilder("Khách hàng vừa đổi tra sản phẩm ");
            double tongTien = 0;
            // upadte lại sản phẩm trong hóa đơn
            for (HoaDonChiTietCustomer hdct: list) {
                if (hdct.getQuantity() == 0){

                    HoaDonChiTiet hdctXoa = HoaDonChiTiet.builder()
                            .id_hoa_don(hdct.getId_hoa_don())
                            .id_chi_tiet_san_pham(hdct.getId_chi_tiet_san_pham())
                            .build();
                    ssHDCT.delete(hdctXoa);
                }else{
                    //  set soLuong = quantity
                    HoaDonChiTiet hoaDonChiTiet = ssHDCT.getHDCT(hdct.getId_hoa_don().getId(),
                            hdct.getId_chi_tiet_san_pham().getId());
                    hoaDonChiTiet.setSoLuong(hdct.getQuantity());
                    ssHDCT.save(hoaDonChiTiet);
                }
            }

            // thêm 1 bản ghi mới vào hdct vs deleted = 0
            for (HoaDonChiTietCustomer hdct: listTra) {
                stringBuilder.append(" mã " + hdct.getId_chi_tiet_san_pham().getMa() + " , ");

                HoaDonChiTiet hdctNew = HoaDonChiTiet.
                        builder()
                        .id_hoa_don(hdct.getId_hoa_don())
                        .id_chi_tiet_san_pham(hdct.getId_chi_tiet_san_pham())
                        .soLuong(hdct.getQuantity())
                        .giaTien(hdct.getGiaTien())
//                       .giaTien(hdct.getId_chi_tiet_san_pham().getGiaBan().multiply(BigDecimal.valueOf(hoaDonChiTiet.getSoLuong())))
                        .deleted(0)
                        .ghiChu(hdct.getGhiChu())
                        .build();
                ssHDCT.save(hdctNew);
            }

            // thêm lich su hoa đơn

            LichSuHoaDon lichSuHoaDon = LichSuHoaDon.builder()
                    .id_hoa_don(hoaDon)
                    .moTaHoaDon(stringBuilder.toString())
                    .deleted(1)
                    .nguoiTao("Đông")
                    .ngayTao(new Date(System.currentTimeMillis()))
                    .build();
            lichSuHoaDonService.addLichSuHoaDon(lichSuHoaDon);

            // upadte hoa dơn
            List<HoaDonChiTiet> listHD = ssHDCT.getHDCT(hoaDon.getId());
            for (HoaDonChiTiet donChiTiet : listHD) {
                if (donChiTiet.getDeleted() == 1){
                    tongTien += donChiTiet.getSoLuong() * donChiTiet.getGiaTien().doubleValue();
                }
            }
            hoaDon.setTongTien(new BigDecimal(tongTien + ""));

            ssHD.save(hoaDon);



            return ResponseEntity.ok("hi");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("ERROR");
        }
    }



}
