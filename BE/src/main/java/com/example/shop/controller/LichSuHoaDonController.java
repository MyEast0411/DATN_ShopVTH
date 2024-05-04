package com.example.shop.controller;

import com.example.shop.entity.*;
import com.example.shop.repositories.ChiTietSanPhamRepository;
import com.example.shop.repositories.NhanVienRepository;
import com.example.shop.service.HoaDonChiTietService;
import com.example.shop.service.HoaDonService;
import com.example.shop.service.LichSuHoaDonService;
import com.example.shop.util.SendMail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
@RestController
@CrossOrigin("*")
@RequestMapping("lich_su_hoa_don")
public class LichSuHoaDonController {
    @Autowired
    private LichSuHoaDonService lichSuHoaDonService;
    @Autowired
    private HoaDonChiTietService hoaDonChiTietService;

    @Autowired
    private HoaDonService hoaDonService;
 @Autowired
    private NhanVienRepository nhanVienRepository;

    @Autowired
    private ChiTietSanPhamRepository chiTietSanPhamRepository;

    @GetMapping("getLichSuHoaDons/{id}")
    public ResponseEntity<List<LichSuHoaDon>> getLichSuHoaDons(@PathVariable String id){
        List<LichSuHoaDon> list = lichSuHoaDonService.getLichSuHoaDons(id);
        return ResponseEntity.ok(list);
    }

    @GetMapping("getLichSuHoaDon/{id}")
    public ResponseEntity<LichSuHoaDon> getLichSuHoaDon(){
        return ResponseEntity.ok(new LichSuHoaDon());
    }

//    http://localhost:8080/lich_su_hoa_don/add/
    @PostMapping("add/{idHD}")
    @Async
    public ResponseEntity addLichSuHoaDon(
            @PathVariable("idHD")HoaDon  hoaDon,
            @RequestBody LichSuHoaDon lshd

    ){
        System.out.println(lshd);
        List<String> list = new ArrayList<>();
        list.add(" đang chờ xác nhận ");
        list.add(" đã dược xác nhận ");
        list.add(" đang chờ vận chuyển ");
        list.add(" đã được chuyển tới ship ");
        list.add(" đã hoàn thành ");
        list.add(" đã hoàn trả ");
        list.add(" đã bị hủy ");
        List<String> listIcon = new ArrayList<>();
        listIcon.add(" 🤔🤔🤔🤔  ");
        listIcon.add(" 👌👌👌👌 ");
        listIcon.add(" 🚛🚛🚛🚛 ");
        listIcon.add(" 🙌🙌🙌🙌 ");
        listIcon.add(" 😎😎😎😎 ");
        listIcon.add(" 🏍🏍🏍‍🏍 ");
        listIcon.add(" 😞😞😞😞 ");
        List<String> listTitleTimline = List.of("Chờ xác nhận", "Xác Nhận", "Chờ Vận Chuyển", "Giao Hàng", "Hoàn Thành");
        NhanVien  nhanVien =nhanVienRepository.findByMa(lshd.getNguoiTao());
        LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();

             if (lshd.getMoTaHoaDon().equals("Lùi Hóa Đơn")){
                 LichSuHoaDon lichSuHoaDon1 =
                         LichSuHoaDon.builder()
                                 .id_hoa_don(hoaDon)
                                 .moTaHoaDon(listTitleTimline.get(hoaDon.getTrangThai()-1))
                                 .deleted(lshd.getDeleted())
                                 .ghiChu(lshd.getGhiChu())
                                 .nguoiTao(nhanVien.getNguoiTao())
                                 .ngayTao(new Date(System.currentTimeMillis()))
                                 .build();
                 lichSuHoaDon= lichSuHoaDonService.addLichSuHoaDon(lichSuHoaDon1);
             }else{
                 LichSuHoaDon lichSuHoaDon1 =
                         LichSuHoaDon.builder()
                                 .id_hoa_don(hoaDon)
                                 .moTaHoaDon(lshd.getMoTaHoaDon())
                                 .deleted(lshd.getDeleted())
                                 .ghiChu(lshd.getGhiChu())
                                 .nguoiTao(nhanVien.getNguoiTao())
                                 .ngayTao(new Date(System.currentTimeMillis()))
                                 .build();
                 lichSuHoaDon= lichSuHoaDonService.addLichSuHoaDon(lichSuHoaDon1);
             }



        if(lshd.getMoTaHoaDon().equals("Hủy Hóa Đơn")){
            hoaDon.setTrangThai(6);
            List<HoaDonChiTiet> listHDCT = hoaDonChiTietService.getHDCT(hoaDon.getId());

            for (HoaDonChiTiet donChiTiet : listHDCT){
                SanPhamChiTiet sanPhamChiTiet = donChiTiet.getId_chi_tiet_san_pham();
                sanPhamChiTiet.setSoLuongTon(sanPhamChiTiet.getSoLuongTon() + donChiTiet.getSoLuong());

                chiTietSanPhamRepository.save(sanPhamChiTiet);
            }
        } else if (lshd.getMoTaHoaDon().equals("Lùi Hóa Đơn")) {
            hoaDon.setTrangThai(hoaDon.getTrangThai()-1);
            System.out.println("Lui hóa đơn");
        } else{
            hoaDon.setTrangThai(hoaDon.getTrangThai()+1);
        }
       HoaDon hoaDon1 = hoaDonService.updateHoaDon(hoaDon);

        SimpleDateFormat format = new SimpleDateFormat("HH:mm:ss dd/MM/yyyy");
        String contentBody = "<html>" +
                "<body>" +
                "<p style='font-weight:600'> Hóa đơn của bạn "+hoaDon.getMa()+ " đã có sự thay đổi</p>" +
                " <p style=\"color: green ;font-weight: 400\">"+listIcon.get(hoaDon.getTrangThai())+"  Hóa đơn  "
                +list.get(hoaDon.getTrangThai()) +" vào lúc " +format.format(lichSuHoaDon.getNgayTao())+"</p>"+
                 "</body>" +
                "</html>" ;
        KhachHang khachHang = hoaDon.getId_khach_hang();
        if (khachHang == null)
       SendMail.SendMailOptions("donglun0411@gmail.com" , contentBody);
        else
            SendMail.SendMailOptions(khachHang.getEmail() , contentBody);

        return ResponseEntity.ok(hoaDon1);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<List<LichSuHoaDon>> updateLichSuHoaDon(){
        return ResponseEntity.ok(new ArrayList<>());
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<List<LichSuHoaDon>> deleteLichSuHoaDon(){
        return ResponseEntity.ok(new ArrayList<>());
    }
}
