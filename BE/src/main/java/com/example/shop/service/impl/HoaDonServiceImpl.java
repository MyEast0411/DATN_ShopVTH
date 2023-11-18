package com.example.shop.service.impl;


import com.example.shop.entity.HoaDon;
import com.example.shop.repositories.HoaDonRepository;
import com.example.shop.service.HoaDonService;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class HoaDonServiceImpl implements HoaDonService {

    @Autowired
    private HoaDonRepository hoaDonRepository;


    @Override
    public List<HoaDon> getHoaDons() {
        return hoaDonRepository.getPageDeleted();
    }

    @Override
    public HoaDon getHoaDon(String id) {
        return hoaDonRepository.findById(id).orElse(null);
    }

    @Override
    public HoaDon addHoaDon(HoaDon hoaDon) {
        return hoaDonRepository.save(hoaDon);
    }

    @Override
    public HoaDon updateHoaDon(HoaDon hoaDon) {
        return hoaDonRepository.save(hoaDon);
    }

    @Override
    public Boolean deleteHoaDon(HoaDon hoaDon) {
       try {
           hoaDonRepository.delete(hoaDon);
           return true;
       }catch (Exception exception){
           exception.printStackTrace();
           return false;
       }
    }

    @Override
    public List<HoaDon> getHDs(int page) {
        return hoaDonRepository.getPage(page);
    }

    public List<Double> getTotalByThang() {

        List<Double> totalMonth = new ArrayList<>();
        double a = 0;

            for (int i = 0; i < 12; i++) {

                if (hoaDonRepository.getTotalByThang(i+1) == null){
                    a = 0;
                }else{
                    a = hoaDonRepository.getTotalByThang(i+1);
                }
                totalMonth.add(a);
        }
        return totalMonth;
    }

}
