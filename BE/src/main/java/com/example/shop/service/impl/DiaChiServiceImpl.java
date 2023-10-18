package com.example.shop.service.impl;

import com.example.shop.entity.DiaChi;
import com.example.shop.repository.DiaChiRepository;
import com.example.shop.service.DiaChiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.UUID;

@Service
public class DiaChiServiceImpl implements DiaChiService {
    @Autowired
    private DiaChiRepository diaChiRepository;

    @Override
    public ArrayList<DiaChi> getAll() {
        return (ArrayList<DiaChi>) diaChiRepository.findAll();
    }

    @Override
    public DiaChi getById(String id) {
        DiaChi diaChi = diaChiRepository.findById(id).orElse(null);
        return diaChi;
    }

    @Override
    public void delete(String id) {
        diaChiRepository.deleteById(id);
    }


    @Override
    public DiaChi add(DiaChi diaChi) {
        return diaChiRepository.save(diaChi);
    }

    @Override
    public DiaChi update(DiaChi diaChi) {
        return diaChiRepository.save(diaChi);
    }
}
