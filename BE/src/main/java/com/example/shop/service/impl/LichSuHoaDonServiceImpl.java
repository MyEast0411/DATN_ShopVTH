package com.example.shop.service.impl;


import com.example.shop.entity.LichSuHoaDon;
import com.example.shop.repository.LichSuHoaDonRepository;
import com.example.shop.service.LichSuHoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class LichSuHoaDonServiceImpl implements LichSuHoaDonService {

    @Autowired
    private LichSuHoaDonRepository lichSuHoaDonRepository;


    @Override
    public List<LichSuHoaDon> getLichSuHoaDons() {
        return lichSuHoaDonRepository.findAll();
    }

    @Override
    public LichSuHoaDon getLichSuHoaDon(String id) {
        return lichSuHoaDonRepository.findById(id).orElse(null);
    }

    @Override
    public LichSuHoaDon addLichSuHoaDon(LichSuHoaDon lichSuHoaDon) {
        return lichSuHoaDonRepository.save(lichSuHoaDon);
    }

    @Override
    public LichSuHoaDon updateLichSuHoaDon(LichSuHoaDon lichSuHoaDon) {
        return lichSuHoaDonRepository.save(lichSuHoaDon);
    }

    @Override
    public Boolean deleteLichSuHoaDon(LichSuHoaDon lichSuHoaDon) {
        try {
            lichSuHoaDonRepository.delete(lichSuHoaDon);
            return true;
        }catch (Exception exception){
            exception.printStackTrace();
            return false;
        }
    }
}
