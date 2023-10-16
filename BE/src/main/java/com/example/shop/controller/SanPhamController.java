package com.example.shop.controller;


import com.example.shop.entity.*;
import com.example.shop.repositories.*;
import com.example.shop.viewmodel.ChiTietSanPhamVM;
import com.example.shop.viewmodel.SanPhamVM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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

    @GetMapping("/")
    List<SanPhamChiTiet> getAll(){
        System.out.println("Mau sac");
        mauSacRepository.findAll().forEach(x-> System.out.println(x.getId()));
//        System.out.println("san pham");
//        sanPhamRepository.findAll().forEach(x-> System.out.println(x.getId()));
        System.out.println("kich co");
        kichCoRepository.findAll().forEach(x-> System.out.println(x.getId()));
        System.out.println("chat lieu");
        chatLieuRepository.findAll().forEach(x-> System.out.println(x.getId()));
//        System.out.println("the loai");
//        theLoaiRepository.findAll().forEach(x-> System.out.println(x.getId()));
        System.out.println("de giay");
        deGiayRepository.findAll().forEach(x-> System.out.println(x.getId()));
        System.out.println("thuong hieu");
        thuongHieuRepository.findAll().forEach(x-> System.out.println(x.getId()));
        System.out.println("nhan hieu");
        nhanHieuRepository.findAll().forEach(x-> System.out.println(x.getId()));
        return repo.findAll();
    }
    @GetMapping("/getAllMS")
    List<MauSac> getAllMS(){
        return mauSacRepository.findAll();
    }
    @GetMapping("/getAllTH")
    List<ThuongHieu> getAllTH(){
        return thuongHieuRepository.findAll();
    }
    @GetMapping("/getAllCL")
    List<ChatLieu> getAllCL(){
        return chatLieuRepository.findAll();
    }
    @GetMapping("/getAllDG")
    List<DeGiay> getAllDG(){
        return deGiayRepository.findAll();
    }
    @GetMapping("/getAllKC")
    List<KichCo> getAllKC(){
        return kichCoRepository.findAll();
    }
    @GetMapping("/getAllNH")
    List<NhanHieu> getAllNH(){
        return nhanHieuRepository.findAll();
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
        List<ChiTietSanPhamVM> list = new ArrayList<>();
        List<SanPhamChiTiet> lst = new ArrayList<>();
        for (Object[] row : sanPham) {
            ChiTietSanPhamVM x = new ChiTietSanPhamVM();
            x.setTen((String) row[1]);
            x.setMoTa((String) row[5]);
            x.setGiaBan(BigDecimal.valueOf(Double.parseDouble(row[7].toString().replace(",",""))));
            x.setId_mau_sac((String) row[8]);
            x.setId_kich_co((String) row[9]);
            x.setId_thuong_hieu((String) row[10]);
            x.setId_nhan_hieu((String) row[11]);
            x.setId_chat_lieu((String) row[12]);
            x.setId_de_giay((String) row[13]);
            list.add(x);
        }
        list.forEach(x-> System.out.println(x.toString()));
        SanPham sp = new SanPham();
        Boolean check = false;
        for (SanPham x:
             sanPhamRepository.findAll()) {
            if(x.getTen().equals(list.get(0).getTen())) {
                sp.setId(x.getId());
                check = true;
            }
        }
        if(!check) {
            Integer maxMa = Integer.parseInt(sanPhamRepository.findMaxMa().replace("SP", ""));
            sp = new SanPham(null, "SP" + (maxMa + 1), list.get(0).getTen(), new Date(), null, "", "", 1);
            sp = sanPhamRepository.save(sp);
        }
        Integer index = 1;
        for (ChiTietSanPhamVM x:
             list) {
            SanPhamChiTiet spct = new SanPhamChiTiet();
            Integer maMax = Integer.parseInt(repo.findMaxMa().replace("SPCT", ""));
            spct.setMa("SPCT"+(maMax+index));
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
            spct.setSoLuongTon(1);
            spct.setTrangThai("1");
            index++;
            lst.add(spct);
        }
        try {
            lst.forEach(x -> System.out.println(x.toString()));
            repo.saveAll(lst);
            return ResponseEntity.ok("Thành công");
        }catch (Exception e) {
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
            System.out.println(sanPham);
            repo.save(sanPham);
            return ResponseEntity.ok("Cập nhật thành công");
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cập nhật thất bại!");
        }
    }

    @DeleteMapping("/deleteSPCT/{ma}")
    ResponseEntity deleteSPCT (@PathVariable String ma) {
        try {
            repo.delete(repo.findByMa(ma));
            return ResponseEntity.ok("Xóa thành công");
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Xóa thất bại!");
        }
    }
}
