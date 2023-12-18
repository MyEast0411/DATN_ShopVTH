package com.example.shop.service;


import com.example.shop.dto.BieuDoThongKe;
import com.example.shop.dto.HoaDonThongKeDTO;
import com.example.shop.entity.HoaDon;
import com.example.shop.entity.SanPhamChiTiet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
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


}
