package com.example.shop.controller;


import com.example.shop.entity.*;
import com.example.shop.repositories.*;
import com.example.shop.requests.DeGiayRequest;
import com.example.shop.requests.KichCoRequest;
import com.example.shop.util.UploadAnh;
import com.example.shop.viewmodel.ChiTietSanPhamVM;
import com.example.shop.viewmodel.HinhAnhVM;
import com.example.shop.viewmodel.SanPhamVM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import java.math.BigDecimal;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Controller
@RestController
@CrossOrigin("http://localhost:5173")
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

    @GetMapping("/getAllSanPham")
    List<SanPhamChiTiet> getAll() {
        System.out.println("Mau sac");
        mauSacRepository.findAll().forEach(x -> System.out.println(x.getId()));
//        System.out.println("san pham");
//        sanPhamRepository.findAll().forEach(x-> System.out.println(x.getId()));
        System.out.println("kich co");
        kichCoRepository.findAll().forEach(x -> System.out.println(x.getId()));
        System.out.println("chat lieu");
        chatLieuRepository.findAll().forEach(x -> System.out.println(x.getId()));
//        System.out.println("the loai");
//        theLoaiRepository.findAll().forEach(x-> System.out.println(x.getId()));
        System.out.println("de giay");
        deGiayRepository.findAll().forEach(x -> System.out.println(x.getId()));
        System.out.println("thuong hieu");
        thuongHieuRepository.findAll().forEach(x -> System.out.println(x.getId()));
        System.out.println("nhan hieu");
        nhanHieuRepository.findAll().forEach(x -> System.out.println(x.getId()));
        return repo.findAll();
    }

    @GetMapping("/getAllMS")
    List<MauSac> getAllMS() {
        return mauSacRepository.findAll();
    }

    @GetMapping("/getAllTH")
    List<ThuongHieu> getAllTH() {
        return thuongHieuRepository.findAll();
    }

    @GetMapping("/getAllCL")
    List<ChatLieu> getAllCL() {
        return chatLieuRepository.findAll();
    }

    @GetMapping("/getAllDG")
    List<DeGiay> getAllDG() {
        return deGiayRepository.getListDeGiay();
    }

    @GetMapping("/getAllKC")
    List<KichCo> getAllKC() {
        return kichCoRepository.findAll();
    }

    @GetMapping("/getAllNH")
    List<NhanHieu> getAllNH() {
        return nhanHieuRepository.findAll();
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
        return repo.findAll();
    }

    @GetMapping("getHinhAnhByMau/{mauSac}")
    public List<HinhAnh> getHinhAnhByMau(@PathVariable String mauSac) {
        return hinhAnhRepository.getHinhAnhByMau(mauSac);
    }

    @PostMapping("/addHinhAnh")
    public ResponseEntity addHinhAnh(@RequestBody HinhAnhVM hinhAnhVM) {
        System.out.println(hinhAnhVM);
        try {
            HinhAnh hinhAnh = new HinhAnh();
            Integer maxMa = Integer.parseInt(hinhAnhRepository.getMaxMa());
            String anh = UploadAnh.upload(hinhAnhVM.getImgUrl());
            hinhAnh.setMa("HA" + (maxMa + 1));
            hinhAnh.setMauSac(hinhAnhVM.getMauSac());
            hinhAnh.setTen(anh);
            hinhAnh.setNguoiTao("Đông");
            hinhAnhRepository.save(hinhAnh);
            return ResponseEntity.ok("Thêm thành công");
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

    @PostMapping("/san-pham/add")
    ResponseEntity add(@RequestBody List<Object[]> sanPham) {
//        for (int i = 0; i < sanPham.size(); i++) {
//            Object[] row = sanPham.get(i);
//            System.out.println("Sản phẩm thứ " + (i ) + ":");
//            for (int j = 0; j < row.length; j++) {
//                System.out.println("  Thuộc tính thứ " + (j ) + ": " + row[j]);
//            }
//        }
//        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR");

        String hinhAnh = "";
        List<HinhAnh> listHinhAnh = new ArrayList<>();
        for (Object[] item : sanPham) {
            hinhAnh = item[14].toString();
        }

        List<ChiTietSanPhamVM> list = new ArrayList<>();
        List<SanPhamChiTiet> lst = new ArrayList<>();
        for (Object[] row : sanPham) {
            ChiTietSanPhamVM x = new ChiTietSanPhamVM();
            x.setTen((String) row[1]);
            x.setSoLuongTon((Integer) row[3]);
            x.setMoTa((String) row[5]);
            x.setGiaBan(BigDecimal.valueOf(Double.parseDouble(row[7].toString())));
            x.setId_mau_sac((String) row[8]);
            x.setId_kich_co((String) row[9]);
            x.setId_thuong_hieu((String) row[10]);
            x.setId_nhan_hieu((String) row[11]);
            x.setId_chat_lieu((String) row[12]);
            x.setId_de_giay((String) row[13]);
            list.add(x);
        }
        SanPham sp = new SanPham();
        Boolean check = false;
        for (SanPham x :
                sanPhamRepository.findAll()) {
            if (x.getTen().equals(list.get(0).getTen())) {
                sp.setId(x.getId());
                check = true;
            }
        }
        if (!check) {
            Integer maxMa = Integer.parseInt(sanPhamRepository.findMaxMa().replace("SP", ""));
            sp = new SanPham(null, "SP" + (maxMa + 1), list.get(0).getTen(), new Date(), null, "", "", 1);
            sp = sanPhamRepository.save(sp);
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
            spct.setId(uuid);
            spct.setId_san_pham(sanPhamRepository.findById(sp.getId()).get());
            spct.setId_mau_sac(mauSacRepository.findByMaMau(x.getId_mau_sac()));
            spct.setId_de_giay(deGiayRepository.findById(x.getId_de_giay()).get());
            spct.setId_kich_co(kichCoRepository.findByTen(x.getId_kich_co()));
            spct.setId_nhan_hieu(nhanHieuRepository.findById(x.getId_nhan_hieu()).get());
            spct.setId_thuong_hieu(thuongHieuRepository.findById(x.getId_thuong_hieu()).get());
            spct.setId_chat_lieu(chatLieuRepository.findById(x.getId_chat_lieu()).get());
            spct.setMoTa(x.getMoTa());
            spct.setGiaBan(x.getGiaBan());
            spct.setGiaNhap(x.getGiaNhap());
            spct.setSoLuongTon(x.getSoLuongTon());
            spct.setKhoiLuong(x.getKhoiLuong());
            spct.setSoLuongTon(x.getSoLuongTon());
            spct.setTrangThai("1");
            lst.add(spct);

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
                        listHinhAnh.add(anh);
                    }
                }
            }
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
        sanPhamRepository.delete(sanPhamRepository.findByMa(ma));
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

    @DeleteMapping("/deleteSPCT/{ma}")
    ResponseEntity deleteSPCT(@PathVariable String ma) {
        try {
            repo.delete(repo.findByMa(ma));
            return ResponseEntity.ok("Xóa thành công");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Xóa thất bại!");
        }
    }

    @PostMapping("/addDeGiay")
    public DeGiay addDeGiay(@RequestBody DeGiayRequest request) {
        DeGiay deGiay = new DeGiay();
        int seconds = (int) System.currentTimeMillis() / 1000;
        Random random = new Random();
        int number = random.nextInt(seconds + 1);
        String threeNumbers = String.valueOf(number).substring(0, 3);
        deGiay.setMa("DG" + threeNumbers);
        deGiay.setTen(request.getTenDeGiay());
        deGiay.setDeleted(1);
        return deGiayRepository.save(deGiay);
    }

    @PostMapping("/addKichCo")
    public ResponseEntity addKichCo(@RequestBody KichCoRequest request) {
        try {
            KichCo kichCo = new KichCo();
            int seconds = (int) System.currentTimeMillis() / 1000;
            Random random = new Random();
            int number = random.nextInt(seconds + 1);
            String threeNumbers = String.valueOf(number).substring(0, 3);
            kichCo.setMa("KC" + threeNumbers);
            kichCo.setTen(request.getTenKichCo());
            kichCo.setDeleted(1);
            kichCoRepository.save(kichCo);
            return ResponseEntity.ok("Thành công");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Đã tồn tại kích cỡ này!");
        }

    }

    //-------------Hội-----------------
    @GetMapping("/get-chiTietSP-by-ListMa/{maList}")
    public ResponseEntity<List<SanPhamChiTiet>> getByListMa(@PathVariable List<String> maList) {
        List<SanPhamChiTiet> detailedProducts = repo.getSanPhamChiTietByMaList(maList);
        return new ResponseEntity<>(detailedProducts, HttpStatus.OK);
    }
    //-------------Hội-----------------
}
