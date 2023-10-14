package com.example.shop.controller;

import com.example.shop.entity.*;
import com.example.shop.repositories.*;
import com.example.shop.viewmodel.ChiTietSanPhamVM;
import com.example.shop.viewmodel.SanPhamVM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Controller
@RestController
@CrossOrigin
public class AppController {
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
    @PostMapping("/add")
    SanPhamChiTiet add(@RequestBody ChiTietSanPhamVM sanPham) {
        SanPhamChiTiet spct = new SanPhamChiTiet();
        spct.setId_mau_sac(mauSacRepository.findById(sanPham.getId_mau_sac()).get());
        spct.setId_de_giay(deGiayRepository.findById(sanPham.getId_de_giay()).get());
        spct.setId_kich_co(kichCoRepository.findById(sanPham.getId_kich_co()).get());
        spct.setId_nhan_hieu(nhanHieuRepository.findById(sanPham.getId_nhan_hieu()).get());
        spct.setId_thuong_hieu(thuongHieuRepository.findById(sanPham.getId_thuong_hieu()).get());
        spct.setId_chat_lieu(chatLieuRepository.findById(sanPham.getId_chat_lieu()).get());
        spct.setMa(sanPham.getMa());
        spct.setTen(sanPham.getTen());
        spct.setMoTa(sanPham.getMoTa());
        spct.setGiaBan(sanPham.getGiaBan());
        spct.setGiaNhap(sanPham.getGiaNhap());
        spct.setSoLuongTon(sanPham.getSoLuongTon());
        spct.setKhoiLuong(sanPham.getKhoiLuong());
        spct.setTrangThai("Đang bán");
        System.out.println(spct);
        return repo.save(spct);
    }
    @DeleteMapping("/delete/{id}")
    Boolean add(@PathVariable String id) {
        repo.delete(repo.findById(id).get());
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

}
