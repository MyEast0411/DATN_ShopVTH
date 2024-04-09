package com.example.shop.controller;

import com.example.shop.dto.HoaDonCTTDTO;
import com.example.shop.dto.HoaDonClientDTO;
import com.example.shop.dto.ThanhToanHoaDonDTO;
import com.example.shop.entity.*;
import com.example.shop.repositories.*;
import com.example.shop.requests.HoaDonClientReq;
import com.example.shop.requests.CreatePayMentVNPAYRequest;
import com.example.shop.requests.HoaDonRequest;
import com.example.shop.service.HoaDonChiTietService;
import com.example.shop.service.HoaDonService;
import com.example.shop.service.LichSuHoaDonService;
import com.example.shop.viewmodel.SanPhamVM;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("hoa_don")
public class HoaDonController {
    @Autowired
    private HoaDonService hoaDonService;

    @Autowired
    private HoaDonRepository hoaDonRepository;

    @Autowired
    private ChiTietSanPhamRepository chiTietSanPhamRepository;

    @Autowired
    private KhachHangRepository ssKH;

    @Autowired
    private NhanVienRepository ssNV;

    @Autowired
    private LichSuHoaDonService lichSuHoaDonService;
    @Autowired
    private HoaDonChiTietService hoaDonChiTietService;

    private String idNhanVien = "8fc123b4-c457-4447-99d3-f39faaec2c5b";
    @GetMapping("getHoaDons")
    public ResponseEntity<List<HoaDon>> getHoaDons(
//            @RequestParam(name = "page" , defaultValue = "0")Integer numPage
    ) {
        List<HoaDon> page = hoaDonService.getHoaDons();
        return ResponseEntity.ok(page);
    }

    @GetMapping("getHoaDons/{trangThai}")
    public ResponseEntity<List<HoaDon>> getHDs(
            @RequestParam(name = "page", defaultValue = "0") Integer numPage,
            @PathVariable Integer trangThai
    ) {
        List<HoaDon> page = hoaDonService.getHoaDons();
        if (trangThai != -1) {
            page = hoaDonService.getHDs(trangThai);
        }

        return ResponseEntity.ok(page);
    }

    @GetMapping("getHoaDon/{id}")
    public ResponseEntity<HoaDon> getHoaDon(@PathVariable("id") HoaDon hoaDon) {
        return ResponseEntity.ok(hoaDon);
    }

    @GetMapping("getHoaDonCTT")
    public ResponseEntity getHoaDonCTT() {
        List<Object[]> resultList = hoaDonRepository.getHDChuaTT();
        List<HoaDonCTTDTO> list = new ArrayList<>();
        for (Object[] row : resultList) {
            String ma = (String) row[0];
            String idKhachHang = (String) row[1];
            String idNhanVien = (String) row[2];
            BigDecimal soLuong = (BigDecimal) row[3];
            Integer loaiHD = (Integer) row[4];
            Integer trangThai = (Integer) row[5];

            HoaDonCTTDTO hoaDon = HoaDonCTTDTO.builder()
                    .ma(ma)
                    .idKhachHang(idKhachHang == null ? null : ssKH.findById(idKhachHang).get())
                    .idNhanVien(idNhanVien == null ? null : ssNV.findById(idNhanVien).get())
                    .soLuong(soLuong.intValue())
                    .loaiHd(loaiHD)
                    .trangThai(trangThai)
                    .build();
            list.add(hoaDon);
        }
        return ResponseEntity.ok(list);
    }


    @PostMapping("add")
    public ResponseEntity<HoaDon> addHoaDon(
            @RequestBody HoaDon hoaDon
    ) {
        HoaDon hoaDonSave = hoaDonService.addHoaDon(hoaDon);
        return new ResponseEntity<>(hoaDonSave, HttpStatus.CREATED);
    }

    @PostMapping("taoHoaDon")
    public ResponseEntity<HoaDon> taoHoaDon() {
        String maxMaString = hoaDonRepository.getMaxMa();
        Integer maxMa = (maxMaString != null) ? Integer.parseInt(maxMaString) : null;
        if (maxMa == null) {
            maxMa = 1;
        }
        HoaDon hoaDon = HoaDon.builder()
                .ma("HD" + (maxMa + 1))
                .trangThai(7)
                .deleted(1)
                .loaiHd(1)
                .nguoiTao("Đông")
                .ngayTao(new Date())
                .build();
        hoaDonRepository.save(hoaDon);
        return new ResponseEntity<>(hoaDon, HttpStatus.CREATED);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<HoaDon> updateHoaDon(
            @PathVariable("id") String id,
            @RequestBody HoaDon hoaDon
    ) {

        System.out.println(hoaDon);
        try {
            HoaDon hoaDon1 = hoaDonService.getHoaDon(id);
            if (hoaDon1 != null) {
                hoaDon.setId(hoaDon.getId());
                HoaDon updateHoaDon = hoaDonService.updateHoaDon(hoaDon);
                return new ResponseEntity<>(updateHoaDon, HttpStatus.CREATED);
            } else {
                throw new Exception("khong co id" + id);
            }
        } catch (Exception exception) {
            return null;
        }
    }

    @PutMapping("update_client/{id}")
    public ResponseEntity<HoaDon> updateHoaDonClient(
            @PathVariable("id") String id,
            @RequestBody HoaDonClientReq hd
    ) {

        try {
            HoaDon hoaDon1 = hoaDonService.getHoaDon(id);
            String diaChiHT = hoaDon1.getDiaChi();
            if (hoaDon1 != null) {
               hoaDon1.setDiaChi(hd.getDiaChi());
               hoaDon1.setTienShip(hd.getTienShip());
               hoaDon1.setNgayNhan(new Date(hd.getNgayNhan()));
                HoaDon updateHoaDon = hoaDonService.updateHoaDon(hoaDon1);
                LichSuHoaDon lichSuHoaDon = LichSuHoaDon.builder()
                        .id_hoa_don(hoaDon1)
                        .moTaHoaDon(String.format("Khách hàng đã sửa địa chỉ "))
                        .deleted(1)
                        .nguoiTao("Đông")
                        .ngayTao(new Date(System.currentTimeMillis()))
                        .build();
                lichSuHoaDonService.addLichSuHoaDon(lichSuHoaDon);

                return new ResponseEntity<>(updateHoaDon, HttpStatus.CREATED);
            } else {
                throw new Exception("khong co id" + id);
            }
        } catch (Exception exception) {
            return null;
        }
    }

    @PutMapping("thanhToanHoaDon/{id}")
    public ResponseEntity thanhToanHoaDon(
            @PathVariable("id") String id,
            @RequestBody ThanhToanHoaDonDTO hoaDon
    ) {
        List<HoaDonChiTiet> hoaDonChiTietList = new ArrayList<>();
        for (Object[] row : hoaDonRepository.getHDCTByMaHD(hoaDonRepository.getHoaDonByMa(id).getId())) {
            //coppy san pham chi tiet them vao` hoa don luc thanh toan'
            SanPhamChiTiet sanPhamChiTiet = chiTietSanPhamRepository.findById((String) row[0]).get();
            SanPhamChiTiet spct = SanPhamChiTiet.builder()
                    .ma(sanPhamChiTiet.getMa())
                    .ten(sanPhamChiTiet.getTen() + "[COPY]")
                    .defaultImg(sanPhamChiTiet.getDefaultImg())
                    .soLuongTon(sanPhamChiTiet.getSoLuongTon())
                    .khoiLuong(sanPhamChiTiet.getKhoiLuong())
                    .moTa(sanPhamChiTiet.getMoTa())
                    .trangThai(sanPhamChiTiet.getTrangThai())
                    .giaNhap(sanPhamChiTiet.getGiaNhap())
                    .giaBan(sanPhamChiTiet.getGiaBan())
                    .ngayTao(new Date())
                    .ngaySua(sanPhamChiTiet.getNgaySua())
                    .nguoiTao(sanPhamChiTiet.getNguoiTao())
                    .nguoiSua(sanPhamChiTiet.getNguoiSua())
                    .deleted(0)
                    .id_san_pham(sanPhamChiTiet.getId_san_pham())
                    .id_mau_sac(sanPhamChiTiet.getId_mau_sac())
                    .id_kich_co(sanPhamChiTiet.getId_kich_co())
                    .id_chat_lieu(sanPhamChiTiet.getId_chat_lieu())
                    .id_the_loai(sanPhamChiTiet.getId_the_loai())
                    .id_de_giay(sanPhamChiTiet.getId_de_giay())
                    .id_thuong_hieu(sanPhamChiTiet.getId_thuong_hieu())
                    .build();
            System.out.println(spct);
            chiTietSanPhamRepository.save(spct);
            HoaDonChiTiet hoaDonChiTiet = HoaDonChiTiet.builder()
                    .id_chi_tiet_san_pham(spct)
                    .soLuong(Integer.parseInt(row[1].toString()))
                    .build();
            hoaDonChiTietList.add(hoaDonChiTiet);
        }

        try {
            HoaDon hoaDon1 = hoaDonRepository.getHoaDonByMa(id);
            System.out.println(hoaDon.toString());


            if (hoaDon1 != null) {

                hoaDon1.setLoaiHd(Integer.parseInt(hoaDon.getLoaiHd()));
                hoaDon1.setTrangThai(Integer.parseInt(hoaDon.getTrangThai()));
                hoaDon1.setDiaChi(hoaDon.getDiaChi());
                hoaDon1.setTenKhachHang(hoaDon.getTenKhachHang());
                hoaDon1.setSdt(hoaDon.getSdt());
                hoaDon1.setNgayTao(new Date());
                if (hoaDon.getTienGiam() == null || hoaDon.getTienGiam() == ""){
                    hoaDon1.setTienGiam(new BigDecimal("0"));
                }else{
                    hoaDon1.setTienGiam(BigDecimal.valueOf(Double.parseDouble(hoaDon.getTienGiam())));
                }
                hoaDon1.setId_khach_hang(ssKH.findByMa(hoaDon.getMaKH()));
                hoaDon1.setId_nhan_vien(ssNV.findById(idNhanVien).orElse(null));
                hoaDon1.setTongTien(BigDecimal.valueOf(Double.parseDouble(hoaDon.getTongTien())));
                for (HoaDonChiTiet hdct : hoaDonChiTietList) {
                    SanPhamChiTiet sanPhamChiTiet = chiTietSanPhamRepository.findById(hdct.getId_chi_tiet_san_pham().getId()).get();
                    if(sanPhamChiTiet.getSoLuongTon() <= 0 || sanPhamChiTiet.getSoLuongTon() - hdct.getSoLuong() < 0) {
                        return ResponseEntity.badRequest().body("Sản phẩm không đủ số lượng tồn !!!");
                    }
                    sanPhamChiTiet.setSoLuongTon(sanPhamChiTiet.getSoLuongTon() - hdct.getSoLuong());
                    chiTietSanPhamRepository.save(sanPhamChiTiet);
                }
                HoaDon updateHoaDon = hoaDonRepository.save(hoaDon1);


                if (hoaDon.getTrangThai().equals("1") && hoaDon.getLoaiHd().equals("0")) {
                    LichSuHoaDon lichSuHoaDon = LichSuHoaDon.builder()
                            .id_hoa_don(hoaDon1)
                            .moTaHoaDon("Chờ xác nhận")
                            .deleted(1)
                            .nguoiTao("Đông")
                            .ngayTao(new Date(System.currentTimeMillis()))
                            .build();
                    LichSuHoaDon lichSuHoaDon2 = LichSuHoaDon.builder()
                            .id_hoa_don(hoaDon1)
                            .moTaHoaDon("Xác nhận")
                            .deleted(1)
                            .nguoiTao("Đông")
                            .ngayTao(new Date(System.currentTimeMillis()))
                            .build();
                    lichSuHoaDonService.addLichSuHoaDon(lichSuHoaDon);
                    lichSuHoaDonService.addLichSuHoaDon(lichSuHoaDon2);
                }else {
                    LichSuHoaDon lichSuHoaDon = LichSuHoaDon.builder()
                            .id_hoa_don(hoaDon1)
                            .moTaHoaDon("Đơn Hàng Thành Công")
                            .deleted(1)
                            .nguoiTao("Đông")
                            .ngayTao(new Date(System.currentTimeMillis()))
                            .build();
                    lichSuHoaDonService.addLichSuHoaDon(lichSuHoaDon);
                }
                return new ResponseEntity<>(updateHoaDon, HttpStatus.CREATED);
            } else {
                throw new Exception("khong co id" + id);
            }
        } catch (Exception exception) {
            System.out.println(exception.getMessage());
            return ResponseEntity.badRequest().body("ERROR");
        }
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteHoaDon(@PathVariable("id") String id) {
        String mess = "";
        HoaDon hoaDon = hoaDonService.getHoaDon(id);
        if (hoaDon == null) {
            mess = "Not find hoa don with " + id;

        } else {
            hoaDon.setDeleted(0);
           hoaDonService.updateHoaDon(hoaDon);
            mess = "delete success";
        }
        return new ResponseEntity(mess, HttpStatus.OK);
    }

    @PostMapping("cancelHD/{id}")
    public ResponseEntity cancelHD(@PathVariable("id")String id , @RequestBody Object trangThai){
        // cập nhật trang thái hóa đơn
        HoaDon hoaDon = hoaDonService.getHoaDon(id);
        hoaDon.setTrangThai(5);
        HoaDon don = hoaDonService.updateHoaDon(hoaDon);

        // cập nhật lại số lượng hóa đơn

        List<HoaDonChiTiet> listHDCT = hoaDonChiTietService.getHDCT(id);
        System.out.println("SẢN Phẩm " + listHDCT);
        for (HoaDonChiTiet donChiTiet : listHDCT){
            SanPhamChiTiet sanPhamChiTiet = donChiTiet.getId_chi_tiet_san_pham();
            sanPhamChiTiet.setSoLuongTon(sanPhamChiTiet.getSoLuongTon() + donChiTiet.getSoLuong());
            System.out.println(sanPhamChiTiet);
            chiTietSanPhamRepository.save(sanPhamChiTiet);
        }

        return new ResponseEntity(don , HttpStatus.OK);
    }


    @PostMapping("findHoaDons")
    public ResponseEntity<List<HoaDonClientDTO>> findHD(@RequestBody HoaDonRequest hoaDonRequest){
        List<String> requestData =  hoaDonRequest.getData();
        List<HoaDonClientDTO> list =  new ArrayList<>();
        for (String maHD : requestData) {
            HoaDon hoaDon = hoaDonRepository.getHoaDonByMa(maHD);
            if (hoaDon != null){
                List<LichSuHoaDon> lichSuHoaDons = lichSuHoaDonService.getLichSuHoaDons(hoaDon.getId());
                List<HoaDonChiTiet> hoaDonChiTiets = hoaDonChiTietService.getHDCT(hoaDon.getId());
                HoaDonClientDTO dto = new HoaDonClientDTO();
                dto.setLichSuHoaDons(lichSuHoaDons);
                dto.setHoaDon(hoaDon);
                dto.setHoaDonChiTiets(hoaDonChiTiets);
                list.add(dto);
            }
        }

        return ResponseEntity.ok(list);
    }

    @GetMapping("getHoaDonbyVoucher/{id}")
    public ResponseEntity getHoaDonbyVoucher(@PathVariable("id")String id){
        List<HoaDon> listhd = hoaDonService.getHDbyVoucher(id);
        return ResponseEntity.ok(listhd);
    }

    //thanh toan voi vnpay
    @PostMapping("thanhToanVoiVNPAY")
    public ResponseEntity thanhToanVoiVNPAY(@RequestBody CreatePayMentVNPAYRequest payModel, HttpServletRequest request) {
        try {
            return ResponseEntity.ok(hoaDonService.payWithVNPAYOnline(payModel, request)) ;
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/getHoaDonByIdVoucher/{id}")
    public ResponseEntity<List<HoaDon>> getHoaDonByIdVoucher(@PathVariable String id){
        try{
            List<HoaDon> list = hoaDonRepository.getHdByIdVoucher(id);
            return new ResponseEntity<>(list, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
