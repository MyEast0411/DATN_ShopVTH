package com.example.shop.service.impl;


import com.example.shop.entity.HoaDon;
import com.example.shop.repository.HoaDonRepository;
import com.example.shop.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}
