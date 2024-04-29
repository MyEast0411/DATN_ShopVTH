package com.example.shop.controller;


import com.example.shop.entity.*;
import com.example.shop.repositories.*;
import com.example.shop.requests.*;
import com.example.shop.response.FilterSanPhamClientResponse;
import com.example.shop.response.FilterSanPhamResponse;
import com.example.shop.util.GenderCode;
import com.example.shop.util.UploadAnh;
import com.example.shop.viewmodel.ChiTietSanPhamVM;
import com.example.shop.viewmodel.HinhAnhVM;
import com.example.shop.viewmodel.SanPhamVM;
import com.google.zxing.EncodeHintType;
import com.google.zxing.WriterException;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.*;

import java.math.BigDecimal;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Controller
@RestController
@CrossOrigin("*")
public class SanPhamController {
    @Autowired
    ChiTietSanPhamRepository repo;

    @Autowired
    MauSacRepository mauSacRepository;
    @Autowired
    SanPhamRepository sanPhamRepository;
    @Autowired
    KichCoRepository kichCoRepository;
    @Autowired
    ChatLieuRepository chatLieuRepository;
    @Autowired
    TheLoaiRepository theLoaiRepository;
    @Autowired
    DeGiayRepository deGiayRepository;
    @Autowired
    ThuongHieuRepository thuongHieuRepository;
    @Autowired
    NhanHieuRepository nhanHieuRepository;
    @Autowired
    HinhAnhRepository hinhAnhRepository;

    private String path = "C:\\Users\\Admin\\Pictures\\Saved Pictures\\";
    private String charset = "UTF-8";
    @Autowired

    @GetMapping("/getAllSP")
    List<SanPham> getAllSP() {
        return sanPhamRepository.getAll();
    }

    @GetMapping("/getAllMS")
    List<MauSac> getAllMS() {
        return mauSacRepository.getAll();
    }

    @GetMapping("/getAllTH")
    List<ThuongHieu> getAllTH() {
        return thuongHieuRepository.getAll();
    }

    @GetMapping("/getAllCL")
    List<ChatLieu> getAllCL() {
        return chatLieuRepository.getAll();
    }

    @GetMapping("/getAllDG")
    List<DeGiay> getAllDG() {
        return deGiayRepository.getListDeGiay();
    }

    @GetMapping("/getAllKC")
    List<KichCo> getAllKC() {
        return kichCoRepository.getAll();
    }

    @GetMapping("/getAllNH")
    List<NhanHieu> getAllNH() {
        return nhanHieuRepository.getAll();
    }

    @GetMapping("/getAllTL")
    List<TheLoai> getAllTL() {
        return theLoaiRepository.getAll();
    }

    @GetMapping("/getAllHA")
    List<HinhAnh> getAllHA() {
        return hinhAnhRepository.getAll();
    }

    @GetMapping("/getAllHinhAnh")
    List<HinhAnh> getAllHinhAnh() {
        return hinhAnhRepository.findAll();
    }

    @GetMapping("/getAllSPCT")
    List<SanPhamChiTiet> getAllSPCT() {
        return repo.getAllSPCTDangBan();
    }

    @GetMapping("/getHinhAnhByMau/{mauSac}")
    public List<HinhAnh> getHinhAnhByMau(@PathVariable String mauSac) {
        return hinhAnhRepository.getHinhAnhByMau(mauSac);
    }

    @PostMapping("/filterSPCT")
    public ResponseEntity filerSPCT(@RequestBody ChiTietSanPhamVM x) {
        try {
            List<SanPhamChiTiet> list = repo.filterSPCT(x.getId_chat_lieu().equals("Tất cả") ? "" : x.getId_chat_lieu(), x.getId_thuong_hieu().equals("Tất cả") ? "" : x.getId_thuong_hieu(), x.getId_de_giay().equals("Tất cả") ? "" : x.getId_de_giay(),
                    x.getId_kich_co().equals("Tất cả") ? "" : x.getId_kich_co(), x.getId_mau_sac().equals("Tất cả") ? "" : x.getId_mau_sac(), x.getId_the_loai().equals("Tất cả") ? "" : x.getId_the_loai(),
                    1, sanPhamRepository.findByMa(x.getMaSP()).getId());
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("ERROR");
        }
    }
    @PostMapping("/filterSPCTByPrice/{fromPrice}/{toPrice}")
    public ResponseEntity filerSPCTByPrice(@RequestBody ChiTietSanPhamVM x, @PathVariable Double fromPrice, @PathVariable Double toPrice) {
        try {
            List<SanPhamChiTiet> list = repo.filterSPCTByPrice(x.getId_chat_lieu().equals("Tất cả") ? "" : x.getId_chat_lieu(), x.getId_thuong_hieu().equals("Tất cả") ? "" : x.getId_thuong_hieu(), x.getId_de_giay().equals("Tất cả") ? "" : x.getId_de_giay(),
                    x.getId_kich_co().equals("Tất cả") ? "" : x.getId_kich_co(), x.getId_mau_sac().equals("Tất cả") ? "" : x.getId_mau_sac(), x.getId_the_loai().equals("Tất cả") ? "" : x.getId_the_loai(),
                    1, sanPhamRepository.findByMa(x.getMaSP()).getId(),fromPrice,toPrice);
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("ERROR");
        }
    }
    @PostMapping("/filterSanPhamBySoLuongTon")
    public ResponseEntity filterSanPham(@RequestBody SearchSanPhamRequest request) {
        try {
            if (request.getSelectedStatus() == -1) {
                List<FilterSanPhamResponse> list = sanPhamRepository.filterBySoLuongTon(request.getTextInput(), request.getTextInput(), request.getSoLuongTon());
                return ResponseEntity.ok(list);
            }
            if(request.getSoLuongTon() == 0 && request.getSelectedStatus() != -1) {
                List<FilterSanPhamResponse> list = repo.filterSanPham(request.getTextInput(),request.getTextInput(),request.getSelectedStatus());
                return ResponseEntity.ok(list);
            }
            List<FilterSanPhamResponse> list = sanPhamRepository.filterByTrangThai(request.getTextInput(), request.getTextInput(),request.getSelectedStatus(), request.getSoLuongTon());
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("err");
        }
    }
    @PostMapping("/addHinhAnh")
    public ResponseEntity addHinhAnh(@RequestBody HinhAnhVM hinhAnhVM) {
        System.out.println(hinhAnhVM.toString());
        try {
            HinhAnh hinhAnh = new HinhAnh();
            Integer maxMa = Integer.parseInt(hinhAnhRepository.getMaxMa());
            String anh = UploadAnh.upload(hinhAnhVM.getImgUrl());
            hinhAnh.setMa("HA" + (maxMa + 1));
            hinhAnh.setMauSac(hinhAnhVM.getMauSac().trim());
            hinhAnh.setTen(anh);
            hinhAnh.setNguoiTao("Đông");
            hinhAnhRepository.save(hinhAnh);
            return ResponseEntity.ok("Thêm thành công");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("ERROR");
        }
    }
    @PostMapping("/addHinhAnhSanPhamChiTiet")
    public ResponseEntity addHinhAnhSPCT(@RequestBody AddHinhAnhRequest request) {
        try {
            HinhAnh hinhAnh = new HinhAnh();
            Integer maxMa = Integer.parseInt(hinhAnhRepository.getMaxMa());
            String anh = UploadAnh.upload(request.getImgUrl());
            hinhAnh.setMa("HA" + (maxMa + 1));
            hinhAnh.setId_san_pham_chi_tiet(repo.findById(request.getIdSanPhamChiTiet()).get());
            hinhAnh.setMauSac(request.getMauSac().trim());
            hinhAnh.setTen(anh);
            hinhAnh.setNguoiTao("Đông");
            hinhAnhRepository.save(hinhAnh);
            return ResponseEntity.ok("Thêm thành công");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("ERROR");
        }

    }
    @PutMapping("/updateSanPhamDetail")
    public ResponseEntity updateSanPhamChiTiet(@RequestBody UpdateSanPhamChiTietRequest request) {
        System.out.println("line153"+request);
        try {
            SanPhamChiTiet sanPhamChiTiet = repo.findById(request.getId()).get();
            sanPhamChiTiet.setMoTa(request.getDescription());
            sanPhamChiTiet.setId_chat_lieu(chatLieuRepository.findById(request.getId_chat_lieu()).get());
            sanPhamChiTiet.setId_de_giay(deGiayRepository.findById(request.getId_de_giay()).get());
            sanPhamChiTiet.setId_kich_co(kichCoRepository.findById(request.getId_kich_co()).get());
            sanPhamChiTiet.setId_mau_sac(mauSacRepository.findByTen(request.getId_mau_sac()));
            sanPhamChiTiet.setId_thuong_hieu(thuongHieuRepository.findById(request.getId_thuong_hieu()).get());
            sanPhamChiTiet.setGiaBan(BigDecimal.valueOf(request.getPrice()));
            sanPhamChiTiet.setSoLuongTon(request.getQuantity());
            repo.save(sanPhamChiTiet);
            return ResponseEntity.ok("Cập nhật thành công");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("ERROR");
        }
    }
    public SanPhamVM convertToSanPhamVM(Object[] row) {
        SanPhamVM sanPhamVM = new SanPhamVM();
        sanPhamVM.setMa((String) row[0]);
        sanPhamVM.setTen_san_pham((String) row[1]);
        sanPhamVM.setSo_luong_ton(Integer.parseInt(row[2].toString()));
        sanPhamVM.setTrang_thai(Integer.parseInt(row[3].toString()));
        return sanPhamVM;
    }

    @GetMapping("/chi-tiet-san-pham")
    List<SanPhamVM> getAllCTSP() {
        List<SanPhamVM> sanPhamVMList = new ArrayList<>();
        for (Object[] row : repo.loadTable()) {
            SanPhamVM sanPhamVM = convertToSanPhamVM(row);
            sanPhamVMList.add(sanPhamVM);
        }
        return sanPhamVMList;
    }

    @PostMapping("/filterSanPham")
    List<FilterSanPhamResponse> filterSanPham(@RequestBody FilterSanPhamRequest request) {
        if(request.getSoLuongTon() == 0) {
            List<FilterSanPhamResponse> list = repo.filterSanPham(request.getText(),request.getText(),request.getStatus());
            return list;
        }
        List<FilterSanPhamResponse> list = repo.filterSanPhamBySoLuongTon(request.getText(),request.getText(),request.getStatus(),request.getSoLuongTon());
        return list;
    }

    @PostMapping("/san-pham/add")
    ResponseEntity add(@RequestBody List<Object[]> sanPham) throws IOException, WriterException {
        Map<EncodeHintType, ErrorCorrectionLevel> hashMap = new HashMap<EncodeHintType, ErrorCorrectionLevel>();
        hashMap.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.L);
        String hinhAnh = "";
        List<HinhAnh> listHinhAnh = new ArrayList<>();
        for (Object[] item : sanPham) {
            hinhAnh = item[14].toString();
        }

        List<ChiTietSanPhamVM> list = new ArrayList<>();
        List<SanPhamChiTiet> lst = new ArrayList<>();
        for (Object[] row : sanPham) {
            ChiTietSanPhamVM x = new ChiTietSanPhamVM();
            x.setId_san_pham((String) row[1]);
            x.setTen((String) row[2]);
            x.setSoLuongTon((Integer) row[3]);
            x.setMoTa((String) row[5]);
            x.setGiaBan(BigDecimal.valueOf(Double.parseDouble(row[7].toString())));
            x.setId_mau_sac((String) row[8]);
            x.setId_kich_co((String) row[9]);
            x.setId_thuong_hieu((String) row[10]);
            x.setId_the_loai((String) row[11]);
            x.setId_chat_lieu((String) row[12]);
            x.setId_de_giay((String) row[13]);
            list.add(x);
        }
        for (ChiTietSanPhamVM x :
                list) {
            int seconds = (int) (System.currentTimeMillis() / 1000);
            Random random = new Random();
            int number = random.nextInt(Math.max(seconds + 1, 1));
            String threeNumbers = String.valueOf(number).substring(0, 3);

            SanPhamChiTiet spct = new SanPhamChiTiet();
            spct.setMa("SPCT" + threeNumbers);
            String uuid = UUID.randomUUID().toString();
            GenderCode.generateQRcode(uuid,path+""+x.getTen()+".png",charset,hashMap,200,200);
            String linkImg = UploadAnh.upload(x.getTen()+".png");
            spct.setId(uuid);
            spct.setMaQR(linkImg);
            spct.setTen(x.getTen());
            spct.setId_san_pham(sanPhamRepository.findById(x.getId_san_pham()).get());
            spct.setId_mau_sac(mauSacRepository.findByMaMau(x.getId_mau_sac()));
            spct.setId_de_giay(deGiayRepository.findById(x.getId_de_giay()).get());
            spct.setId_kich_co(kichCoRepository.findByTen(x.getId_kich_co()));
            spct.setId_the_loai(theLoaiRepository.findById(x.getId_the_loai()).get());
            spct.setId_thuong_hieu(thuongHieuRepository.findById(x.getId_thuong_hieu()).get());
            spct.setId_chat_lieu(chatLieuRepository.findById(x.getId_chat_lieu()).get());
            spct.setMoTa(x.getMoTa());
            spct.setGiaBan(x.getGiaBan());
            spct.setGiaNhap(x.getGiaNhap());
            spct.setSoLuongTon(x.getSoLuongTon());
            spct.setKhoiLuong(x.getKhoiLuong());
            spct.setSoLuongTon(x.getSoLuongTon());
            spct.setTrangThai(1);
            spct.setDeleted(1);
            Pattern pattern = Pattern.compile("(Màu [^=]+)=\\[([^\\]]+)]");
            Matcher matcher = pattern.matcher(hinhAnh);
            while (matcher.find()) {
                String colorName = matcher.group(1);
                String links = matcher.group(2);
                String[] linkArray = links.split(", ");
                for (String link : linkArray) {
                    if (mauSacRepository.findIdByMauSac(colorName).equals(spct.getId_mau_sac().getId())) {
                        HinhAnh anh = new HinhAnh();
                        anh.setNguoiTao("Đông");
                        anh.setMauSac(colorName);
                        anh.setTen(link);
                        anh.setId_san_pham_chi_tiet(spct);
                        spct.setDefaultImg(link);
                        listHinhAnh.add(anh);
                    }
                }
            }
            lst.add(spct);
        }
        try {
            repo.saveAll(lst);
            hinhAnhRepository.saveAll(listHinhAnh);
            return ResponseEntity.ok("Thành công");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR");
        }
    }

    @DeleteMapping("/delete/{ma}")
    Boolean delete(@PathVariable String ma) {
        SanPham sanPham = sanPhamRepository.findByMa(ma);
        sanPham.setDeleted(0);
        sanPhamRepository.save(sanPham);
        return true;
    }

    @PostMapping("/addNew")
    NhanHieu add(@RequestBody NhanHieu sanPham) {
        return nhanHieuRepository.save(sanPham);
    }

    @GetMapping("/detailSP/{id}")
    SanPhamChiTiet detail(@PathVariable String id) {
        return repo.findById(id).get();
    }

    @GetMapping("findByMa/{ma}")
    List<SanPhamChiTiet> findByMa(@PathVariable String ma) {
        return repo.getByMa(ma);
    }

    @GetMapping("getByMa/{ma}")
    SanPhamChiTiet getByMa(@PathVariable String ma) {
        return repo.findByMa(ma);
    }

    @PutMapping("updateSPCT")
    ResponseEntity updateSPCT(@RequestBody SanPhamChiTiet sanPham) {
        try {
            repo.save(sanPham);
            return ResponseEntity.ok("Cập nhật thành công");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cập nhật thất bại!");
        }
    }

    @PutMapping("updateSortSPCT")
    ResponseEntity updateSortSPCT(@RequestBody List<SanPhamChiTiet> sanPham) {
        System.out.println(sanPham);
        try {
            for (SanPhamChiTiet x : sanPham) {
                for (SanPhamChiTiet spct : repo.findAll()) {
                    if (spct.getId().equals(x.getId())) {
                        spct.setSoLuongTon(x.getSoLuongTon());
                        spct.setGiaBan(BigDecimal.valueOf(Long.parseLong(x.getGiaBan().toString().replace(",",""))));
                        repo.save(spct);
                    }
                }
            }
            return ResponseEntity.ok("Cập nhật thành công");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cập nhật thất bại!");
        }
    }

    @DeleteMapping("/deleteSPCT/{ma}")
    ResponseEntity deleteSPCT(@PathVariable String ma) {
        try {
            SanPham sanPham = sanPhamRepository.findByMa(ma);
            sanPham.setDeleted(0);
            sanPhamRepository.save(sanPham);
            return ResponseEntity.ok("Xóa thành công");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Xóa thất bại!");
        }
    }

    @PostMapping("/addDeGiay")
    public ResponseEntity addDeGiay(@RequestBody DeGiayRequest request) {
        DeGiay deGiay = new DeGiay();
        if(deGiayRepository.existsByTen(request.getTenDeGiay())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Đã tồn tại đế giày này!");
        }
        Integer maxMa = Integer.parseInt(deGiayRepository.getMaxMa());
        deGiay.setMa("DG" + (maxMa + 1));
        deGiay.setTen(request.getTenDeGiay());
        deGiay.setDeleted(1);
        deGiayRepository.save(deGiay);
        return ResponseEntity.ok("Thành công");
    }

    @PostMapping("/addKichCo")
    public ResponseEntity addKichCo(@RequestBody KichCoRequest request) {
        try {
            if(kichCoRepository.existsByTen(request.getTenKichCo())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Đã tồn tại kích cỡ này!");
            }
            KichCo kichCo = new KichCo();
            Integer maxMa = Integer.parseInt(kichCoRepository.getMaxMa());
            kichCo.setMa("KC" + (maxMa + 1));
            kichCo.setTen(request.getTenKichCo());
            kichCo.setDeleted(1);
            kichCoRepository.save(kichCo);
            return ResponseEntity.ok("Thành công");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Đã tồn tại kích cỡ này!");
        }
    }

    @PostMapping("/addTheLoai")
    public ResponseEntity addTheLoai(@RequestBody AddThuocTinhRequest request) {
        try {
            if(theLoaiRepository.existsByTen(request.getTen())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Đã tồn tại thể loại này!");
            }
            TheLoai tl = new TheLoai();
            Integer maxMa = Integer.parseInt(theLoaiRepository.getMaxMa());
            tl.setMa("TL" + (maxMa + 1));
            tl.setTen(request.getTen());
            tl.setDeleted(1);
            theLoaiRepository.save(tl);
            return ResponseEntity.ok("Thành công");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Đã tồn tại kích cỡ này!");
        }
    }
    @PostMapping("/addChatLieu")
    public ResponseEntity addChatLieu(@RequestBody AddThuocTinhRequest request) {
        try {
            if(chatLieuRepository.existsByTen(request.getTen())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Đã tồn tại chất liệu này!");
            }
            ChatLieu cl = new ChatLieu();
            Integer maxMa = Integer.parseInt(chatLieuRepository.getMaxMa());
            cl.setMa("CL" + (maxMa + 1));
            cl.setTen(request.getTen());
            cl.setDeleted(1);
            chatLieuRepository.save(cl);
            return ResponseEntity.ok("Thành công");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Đã tồn tại chất liệu này!");
        }
    }
    @PostMapping("/addThuongHieu")
    public ResponseEntity addThuongHieu(@RequestBody AddThuocTinhRequest request) {
        try {
            if(thuongHieuRepository.existsByTen(request.getTen())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Đã tồn tại thương hiệu này!");
            }
            ThuongHieu th = new ThuongHieu();
            Integer maxMa = Integer.parseInt(thuongHieuRepository.getMaxMa());
            th.setMa("TH" + (maxMa + 1));
            th.setTen(request.getTen());
            th.setDeleted(1);
            thuongHieuRepository.save(th);
            return ResponseEntity.ok("Thành công");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Đã tồn tại thương hiệu này!");
        }
    }

    @PostMapping("/addSanPham")
    public ResponseEntity addKichCo(@RequestBody SanPhamRequest request) {
        System.out.println(request.getTenSanPham());
        try {
            if(sanPhamRepository.existsByTen(request.getTenSanPham())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Đã tồn tại sản phẩm này!");
            }
            SanPham sanPham = new SanPham();
            Integer maxMa = Integer.parseInt(sanPhamRepository.getMaxMa());
            sanPham.setMa("SP" + (maxMa + 1));
            sanPham.setTen(request.getTenSanPham());
            sanPham.setDeleted(1);
            sanPhamRepository.save(sanPham);
            return ResponseEntity.ok("Thành công");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Đã tồn tại sản phẩm này!");
        }
    }

    @PostMapping("/deleteHinhAnh/{idHinhAnh}")
    public ResponseEntity deleteHinhAnh(@PathVariable String idHinhAnh) {
        try {
            HinhAnh hinhAnh = hinhAnhRepository.findById(idHinhAnh).get();
            hinhAnhRepository.delete(hinhAnh);
            return ResponseEntity.ok("Thành công");
        }catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    //-------------Hội-----------------
    @GetMapping("/get-chiTietSP-by-ListMa/{maList}")
    public ResponseEntity<List<SanPhamChiTiet>> getByListMa(@PathVariable List<String> maList) {
        try {
            List<SanPhamChiTiet> detailedProducts = repo.getSanPhamChiTietByMaList(maList);
            return new ResponseEntity<>(detailedProducts, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/getSanPhamChiTietByMaListSPCT/{maList}")
    public ResponseEntity<List<SanPhamChiTiet>> getSanPhamChiTietByMaListSPCT(@PathVariable List<String> maList) {
        try {
            List<SanPhamChiTiet> detailedProducts = repo.getSanPhamChiTietByMaListSPCT(maList);
            return new ResponseEntity<>(detailedProducts, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/get-all-san-pham")
    public List<SanPham> getAllSanPham() {
        return sanPhamRepository.findAll();
    }

    @GetMapping("/getAllSanPhamChiTietByIdSanPham/{idSP}")
    public List<SanPhamChiTiet> getAllSanPhamChiTietByIdSanPham(@PathVariable String idSP) {
//        System.out.println("id san pham: " + idSP);
        return repo.getAllSanPhamChiTietByIdSanPham(idSP);
    }

    @GetMapping("/get-all-san-pham-enhanced")
    public List<Map<String, Object>> getAllSanPhamEnhanced() {
        List<SanPham> sanPhams = sanPhamRepository.getAll();

        return sanPhams.stream().map(sanPham -> {
            Map<String, Object> sanPhamInfo = new HashMap<>();
            sanPhamInfo.put("id", sanPham.getId());
            sanPhamInfo.put("ma", sanPham.getMa());
            sanPhamInfo.put("ten", sanPham.getTen());

            // Lấy giá cao nhất
            List<SanPhamChiTiet> sanPhamChiTiets = repo.getAllSanPhamChiTietByIdSanPham(sanPham.getId());
            Optional<SanPhamChiTiet> maxPriceSPCT = sanPhamChiTiets.stream()
                    .max(Comparator.comparing(SanPhamChiTiet::getGiaBan));

            maxPriceSPCT.ifPresent(spct -> {
                sanPhamInfo.put("defaultImg", spct.getDefaultImg());
                sanPhamInfo.put("maxPrice", spct.getGiaBan());
                sanPhamInfo.put("theLoai", spct.getId_the_loai().getTen());
            });

            // Đếm tổng màu
            long colorCount = sanPhamChiTiets.stream()
                    .map(spct -> spct.getId_mau_sac().getId())
                    .distinct()
                    .count();

            sanPhamInfo.put("colorCount", colorCount);

            return sanPhamInfo;
        }).collect(Collectors.toList());
    }
    @PostMapping("/filterSanPhamClient")
    public List<Map<String, Object>> filterSanPhamClient(@RequestBody FilterSanPhamClientRequest request) {
        try {
            System.out.println(request);
            System.out.println(sanPhamRepository.filterSPClient(request.getToPrice().intValue(),request.getFromPrice().intValue(),request.getListMauSac(),request.getListThuongHieu(),request.getListTheLoai()));
            List<SanPham> sanPhams = sanPhamRepository.filterSPClient(request.getToPrice().intValue(),request.getFromPrice().intValue(),request.getListMauSac(),request.getListThuongHieu(),request.getListTheLoai());

            return sanPhams.stream().map(sanPham -> {
                Map<String, Object> sanPhamInfo = new HashMap<>();
                sanPhamInfo.put("id", sanPham.getId());
                sanPhamInfo.put("ma", sanPham.getMa());
                sanPhamInfo.put("ten", sanPham.getTen());

                // Lấy giá cao nhất
                List<SanPhamChiTiet> sanPhamChiTiets = repo.getAllSanPhamChiTietByIdSanPham(sanPham.getId());
                Optional<SanPhamChiTiet> maxPriceSPCT = sanPhamChiTiets.stream()
                        .max(Comparator.comparing(SanPhamChiTiet::getGiaBan));

                maxPriceSPCT.ifPresent(spct -> {
                    sanPhamInfo.put("defaultImg", spct.getDefaultImg());
                    sanPhamInfo.put("maxPrice", spct.getGiaBan());
                    sanPhamInfo.put("theLoai", spct.getId_the_loai().getTen());
                });

                // Đếm tổng màu
                long colorCount = sanPhamChiTiets.stream()
                        .map(spct -> spct.getId_mau_sac().getId())
                        .distinct()
                        .count();

                sanPhamInfo.put("colorCount", colorCount);

                return sanPhamInfo;
            }).collect(Collectors.toList());
        }catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    @GetMapping("/countAllSanPham")
    public int countAllSanPham() {
        return sanPhamRepository.countAllSanPham();
    }

    @GetMapping("/getHinhAnhByIdSPCT/{id}")
    public List<HinhAnh> getHinhAnhByIdSPCT(@PathVariable String id) {
        return hinhAnhRepository.getHinhAnhBySanPhamChiTiet(id);
    }

    @GetMapping("/getSanPhamIdSPCT/{id}")
    public List<SanPhamChiTiet> getSPCTByIdSP(@PathVariable String id) {
        return repo.getAllSanPhamChiTietByIdSanPham(id);
    }

    @GetMapping("/getSPCTbyId/{id}")
    public ResponseEntity getSPCTbyId(@PathVariable String id) {
        try {
            SanPhamChiTiet spct = repo.findById(id).get();
            return ResponseEntity.ok(spct);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Đã tồn tại kích cỡ này!");
        }
    }

    @GetMapping("/getAllSanPhamChiTietByIdList")
    public List<SanPhamChiTiet> getAllSanPhamChiTietByIdList(@RequestParam List<String> idList) {
        return repo.getAllSanPhamChiTietByIdList(idList);
    }

    @PostMapping("/getSanPhamChiTietByDefaultImg")
    public ResponseEntity<List<SanPhamChiTiet>> getSanPhamChiTietByDefaultImg(@RequestBody Map<String, String> requestBody) {
        try {
            String urlImg = requestBody.get("urlImg");

            return ResponseEntity.ok(repo.getSanPhamChiTietByDefaultImg(urlImg));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    //-------------Hội-----------------
}
