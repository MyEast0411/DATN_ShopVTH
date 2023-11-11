package com.example.shop.service.impl;


import com.example.shop.entity.ThanhToan;

import com.example.shop.repositories.ThanhToanRepository;
import com.example.shop.service.ThanhToanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ThanhToanServiceImpl implements ThanhToanService {

    @Autowired
    private ThanhToanRepository thanhToanRepository;


    @Override
    public List<ThanhToan> getThanhToans() {
        return thanhToanRepository.findAll();
    }

    @Override
    public ThanhToan getThanhToan(String id) {
        return thanhToanRepository.findById(id).orElse(null);
    }

    @Override
    public ThanhToan addThanhToan(ThanhToan thanhToan) {
        return thanhToanRepository.save(thanhToan);
    }

    @Override
    public ThanhToan updateThanhToan(ThanhToan thanhToan) {
        return thanhToanRepository.save(thanhToan);
    }

    @Override
    public Boolean deleteThanhToan(ThanhToan thanhToan) {
        try {
            thanhToanRepository.delete(thanhToan);
            return true;
        }catch (Exception exception){
            exception.printStackTrace();
            return false;
        }
    }
}
