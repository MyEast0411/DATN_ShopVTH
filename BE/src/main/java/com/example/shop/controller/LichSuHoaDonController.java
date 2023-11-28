package com.example.shop.controller;

import com.example.shop.entity.HoaDon;
import com.example.shop.entity.KhachHang;
import com.example.shop.entity.LichSuHoaDon;
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
    private HoaDonService hoaDonService;
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
    public ResponseEntity<LichSuHoaDon> addLichSuHoaDon(
            @PathVariable("idHD")HoaDon  hoaDon,
            @RequestBody LichSuHoaDon lshd

    ){
        List<String> list = new ArrayList<>();
        list.add(" đang chờ xác nhận ");
        list.add(" đã dược xác nhận ");
        list.add(" đang chờ vận chuyển ");
        list.add(" đã được chuyển tới ship ");
        list.add(" đã hoàn thành ");
        list.add(" đã bị hủy ");
        List<String> listIcon = new ArrayList<>();
        listIcon.add(" 🤔🤔🤔🤔  ");
        listIcon.add(" 👌👌👌👌 ");
        listIcon.add(" 🚛🚛🚛🚛 ");
        listIcon.add(" 🙌🙌🙌🙌 ");
        listIcon.add(" 😎😎😎😎 ");
        listIcon.add(" 😞😞😞😞 ");



        LichSuHoaDon lichSuHoaDon =
                LichSuHoaDon.builder()
                        .id_hoa_don(hoaDon)
                        .moTaHoaDon(lshd.getMoTaHoaDon())
                        .deleted(lshd.getDeleted())
                        .ghiChu(lshd.getGhiChu())
                        .nguoiTao(lshd.getNguoiTao())
                        .ngayTao(new Date(System.currentTimeMillis()))
                        .build();
        lichSuHoaDonService.addLichSuHoaDon(lichSuHoaDon);
        System.out.println(lshd.getMoTaHoaDon());
        if(lshd.getMoTaHoaDon().equals("Hủy Hóa Đơn")){
            hoaDon.setTrangThai(5);
        }else{
            hoaDon.setTrangThai(hoaDon.getTrangThai()+1);
        }
        hoaDonService.updateHoaDon(hoaDon);


        //gửi Mail
        // get mail khachHang
        // get hoa đơn
        // html
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
       SendMail.SendMailOptions("camhoang1811@gmail.com" , contentBody);
        else
            SendMail.SendMailOptions(khachHang.getEmail() , contentBody);

        return ResponseEntity.ok(lichSuHoaDon);
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
