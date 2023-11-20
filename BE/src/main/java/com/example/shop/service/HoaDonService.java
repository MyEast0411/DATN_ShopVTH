package com.example.shop.service;


import com.example.shop.entity.HoaDon;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface HoaDonService  {
    List<HoaDon> getHoaDons();
    HoaDon getHoaDon(String id);
    HoaDon addHoaDon(HoaDon hoaDon);
    HoaDon updateHoaDon(HoaDon hoaDon);
    Boolean deleteHoaDon(HoaDon hoaDon);

    List<HoaDon> getHDs(int page );
    List<Double>  getTotalByThang();

}
