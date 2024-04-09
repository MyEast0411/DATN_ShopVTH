package com.example.shop.service;


import com.example.shop.dto.BieuDoThongKe;
import com.example.shop.dto.HoaDonThongKeDTO;
import com.example.shop.entity.HoaDon;

import com.example.shop.requests.CreatePayMentVNPAYRequest;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.util.List;

@Service
public interface HoaDonService  {
    List<HoaDon> getHoaDons();
    HoaDon getHoaDon(String id);
    HoaDon addHoaDon(HoaDon hoaDon);
    HoaDon updateHoaDon(HoaDon hoaDon);
    Boolean deleteHoaDon(HoaDon hoaDon);
    List<HoaDon> getHDs(int page );
    List<BieuDoThongKe>  getTotalByThang();
    BigDecimal getTotalAll();
    List<HoaDonThongKeDTO>  top5HDMoi();
    List<BieuDoThongKe>  getWeekInMonth();
    List<BieuDoThongKe>  getDayInWeek();
    Integer countHD();
    List<HoaDon>  getHDByKH(String idKH );

    List<HoaDon> getHDbyVoucher(String id);

    String payWithVNPAYOnline(CreatePayMentVNPAYRequest payModel, HttpServletRequest request) throws UnsupportedEncodingException;

    HoaDon findHDDoiTra(String maHD);
}
