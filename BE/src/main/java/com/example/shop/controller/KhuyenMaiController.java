package com.example.shop.controller;

import com.example.shop.entity.DeGiay;
import com.example.shop.entity.KhuyenMai;
import com.example.shop.entity.KhuyenMaiSanPhamChiTiet;
import com.example.shop.entity.SanPhamChiTiet;
import com.example.shop.repositories.ChiTietSanPhamRepository;
import com.example.shop.repositories.KhuyenMaiRepository;
import com.example.shop.repositories.KhuyenMaiSanPhamChiTietRepository;
import com.example.shop.services.KhuyenMaiService;
import com.example.shop.viewmodel.KhuyenMaiSPCTViewmodel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
@RequestMapping("/khuyen-mai")
public class KhuyenMaiController {

    @Autowired
    private KhuyenMaiService khuyenMaiService;

    @Autowired
    KhuyenMaiRepository khuyenMaiRepo;

    @Autowired
    private ChiTietSanPhamRepository chiTietSPRepo;

    @Autowired
    private KhuyenMaiSanPhamChiTietRepository kmspctrepo;

    private String generateUniqueMaKhuyenMai() {
        String maKhuyenMai;
        do {
            maKhuyenMai = "KM" + String.format("%07d", new Random().nextInt(10000000));
        } while (khuyenMaiService.findByMa(maKhuyenMai) != null);
        return maKhuyenMai;
    }

    @GetMapping
    public List<KhuyenMai> findAll() {
        return khuyenMaiService.findAllByDeleted();
    }


    @GetMapping("/getAllKMSPCT")
    public List<KhuyenMaiSanPhamChiTiet> findAllKMSPCT() {
        List<KhuyenMaiSanPhamChiTiet> listKMSPCT = new ArrayList<>();
        for (KhuyenMaiSanPhamChiTiet x : kmspctrepo.findKmspctByActiveKhuyenMaiViewModel()) {
            KhuyenMaiSanPhamChiTiet kmspct = new KhuyenMaiSanPhamChiTiet();
            kmspct.setId_chi_tiet_san_pham(x.getId_chi_tiet_san_pham());
            kmspct.setId_khuyen_mai(x.getId_khuyen_mai());
            listKMSPCT.add(kmspct);
        }
        return listKMSPCT;

    }

    @PostMapping("/add/{listMaCTSP}")
    public ResponseEntity addKhuyenMai(@RequestBody KhuyenMai khuyenMai, @PathVariable List<String> listMaCTSP) {
        try {
            Date currentDate = new Date();
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(currentDate);
            calendar.add(Calendar.DATE, 20); // Thêm 20 ngày vào currentDate

            Date currentDatePlus20Days = calendar.getTime();
            List<KhuyenMai> overlappingPromotions = khuyenMaiService.findOverlappingPromotions(
                    khuyenMai.getNgayBatDau(),
                    khuyenMai.getNgayKetThuc()
            );
            if (!overlappingPromotions.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Khuyến mãi trùng thời gian với khuyến mãi khác.");
            }
            khuyenMai.setMa(generateUniqueMaKhuyenMai());
            khuyenMai.setNgayTao(new Date());
            khuyenMai.setNgaySua(new Date());
            khuyenMai.setDeleted(0);
            if (khuyenMai.getNgayBatDau().after(currentDatePlus20Days)) {
                khuyenMai.setSwitchKM("Chưa diễn ra");
                khuyenMai.setTrangThai("Chưa diễn ra");
            } else if (khuyenMai.getNgayBatDau().after(currentDate)) {
                khuyenMai.setSwitchKM("Sắp diễn ra");
                khuyenMai.setTrangThai("Sắp diễn ra");
            } else if (khuyenMai.getNgayKetThuc().before(currentDate)) {
                khuyenMai.setSwitchKM("Đã kết thúc");
                khuyenMai.setTrangThai("Đã kết thúc");
            } else {
                khuyenMai.setSwitchKM("Đang diễn ra");
                khuyenMai.setTrangThai("Đang diễn ra");
            }
            khuyenMaiService.save(khuyenMai);
            for (String maCTSP : listMaCTSP) {
                List<SanPhamChiTiet> spctList = chiTietSPRepo.getSPCTByMaSPCT(Collections.singletonList(maCTSP));
                if (!spctList.isEmpty()) {
                    for (SanPhamChiTiet spct : spctList) {
                        KhuyenMaiSanPhamChiTiet kmspct = new KhuyenMaiSanPhamChiTiet();
                        kmspct.setId_khuyen_mai(khuyenMai);
                        kmspct.setId_chi_tiet_san_pham(spct);
                        kmspct.setGiaCu(spct.getGiaBan());
                        kmspctrepo.save(kmspct);
                    }
                }
            }

            return ResponseEntity.ok("Thêm mới thành công");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR");
        }
    }


    @PostMapping("/update/{listMaCTSP}")
    public ResponseEntity updateKhuyenMai(@RequestBody KhuyenMai khuyenMai, @PathVariable List<String> listMaCTSP) {
        System.out.println("list ma: " + listMaCTSP);

        Optional<KhuyenMai> existingKhuyenMai = khuyenMaiService.findById(khuyenMai.getId());

        try {
            if (listMaCTSP != null && !listMaCTSP.isEmpty() && listMaCTSP.get(0).equals("do-not-change")) {
                // Giữ nguyên sản phẩm giảm giá cũ
                if (existingKhuyenMai.isPresent()) {
                    KhuyenMai existing = existingKhuyenMai.get();
                    System.out.println(existing);
                    existing.setTen(khuyenMai.getTen());
                    existing.setNgayBatDau(khuyenMai.getNgayBatDau());
                    existing.setNgayKetThuc(khuyenMai.getNgayKetThuc());
                    existing.setGiaTriPhanTram(khuyenMai.getGiaTriPhanTram());
                    existing.setNgaySua(new Date());
                    existing.setDeleted(0);
                    existing.setSwitchKM(khuyenMai.getSwitchKM());
                    existing.setNgaySua(new Date());
                    khuyenMaiService.save(existing);
                }
            } else {
                // Xóa sản phẩm được khuyến mại trước đó và áp dụng giảm giá sản phẩm mới theo listMaCTSP
                if (existingKhuyenMai.isPresent()) {
                    KhuyenMai existing = existingKhuyenMai.get();
                    kmspctrepo.deleteKMSPCTByIdKhuyenMai(existing.getId());

                    // Áp dụng giảm giá mới theo listMaCTSP
                    existing.setTen(khuyenMai.getTen());
                    existing.setNgayBatDau(khuyenMai.getNgayBatDau());
                    existing.setNgayKetThuc(khuyenMai.getNgayKetThuc());
                    existing.setGiaTriPhanTram(khuyenMai.getGiaTriPhanTram());
                    existing.setNgaySua(new Date());
                    existing.setDeleted(0);
                    existing.setSwitchKM(khuyenMai.getSwitchKM());
                    existing.setNgaySua(new Date());
                    for (String maCTSP : listMaCTSP) {
                        List<SanPhamChiTiet> spctList = chiTietSPRepo.getSPCTByMaSPCT(Collections.singletonList(maCTSP));
                        if (!spctList.isEmpty()) {
                            for (SanPhamChiTiet spct : spctList) {
                                KhuyenMaiSanPhamChiTiet kmspct = new KhuyenMaiSanPhamChiTiet();
                                kmspct.setId_khuyen_mai(khuyenMai);
                                kmspct.setId_chi_tiet_san_pham(spct);
                                kmspct.setGiaCu(spct.getGiaBan());
                                kmspctrepo.save(kmspct);
                            }
                        }
                    }
                    khuyenMaiService.save(existing);

                }
            }
            return ResponseEntity.ok("Cập nhật thành công");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR");
        }
    }

    @GetMapping("/find-khuyenMai-byId/{id}")
    public ResponseEntity<KhuyenMai> findById(@PathVariable String id) {
        Optional<KhuyenMai> khuyenMai = khuyenMaiService.findById(id);

        return khuyenMai.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/update/{id}")
    public KhuyenMai updateKhuyenMai(@PathVariable String id, @RequestBody KhuyenMai khuyenMai) {
        Optional<KhuyenMai> khuyenMaiTimDuoc = khuyenMaiService.findById(id);

        if (khuyenMaiTimDuoc.isPresent()) {
            khuyenMai.setId(khuyenMaiTimDuoc.get().getId());
            return khuyenMaiService.save(khuyenMai);
        }

        return null;
    }

    @DeleteMapping("/soft-delete/{id}")
    public ResponseEntity<String> softDeleteKhuyenMai(@PathVariable String id) {
        Optional<KhuyenMai> khuyenMai = khuyenMaiService.findById(id);
        List<KhuyenMaiSanPhamChiTiet> kmspct = kmspctrepo.findKmspctNotByDeleted(khuyenMai.get().getId());
        for (KhuyenMaiSanPhamChiTiet n : kmspct) {
            SanPhamChiTiet spct = chiTietSPRepo.findById(n.getId_chi_tiet_san_pham().getId()).get();
            spct.setGiaBan(n.getGiaCu());
        }
        if (khuyenMai.isPresent()) {
            khuyenMai.get().setDeleted(1);
            khuyenMaiService.save(khuyenMai.get());
            return ResponseEntity.ok("Đã xóa mềm");
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PutMapping("/batTatKhuyenMai/{id}/{isSelected}")
    public KhuyenMai batTatKhuyenMai(@PathVariable("id") KhuyenMai khuyenMai, @PathVariable String isSelected) {
        if (isSelected.equals("true")) {
            khuyenMai.setSwitchKM("Đã dừng");
        } else {
            khuyenMai.setSwitchKM("Đang diễn ra");
        }
        return khuyenMaiService.save(khuyenMai);

    }

    @GetMapping("/searchByDate/{ngayBatDau}/{ngayKetThuc}")
    public List<KhuyenMai> searchByDate(
            @PathVariable("ngayBatDau") String ngayBatDau,
            @PathVariable("ngayKetThuc") String ngayKetThuc
    ) {
        try {
            return khuyenMaiService.searchByDate(ngayBatDau, ngayKetThuc);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @GetMapping("/findKMSPCT-by-khuyenMaiId/{id}")
    public List<KhuyenMaiSanPhamChiTiet> findKmspctByKhuyenMaiId(@PathVariable String id) {
        try {
            return kmspctrepo.findKmspctByKhuyenMaiId(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }


}
