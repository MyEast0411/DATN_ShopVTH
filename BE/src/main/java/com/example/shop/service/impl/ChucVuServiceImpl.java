package com.example.shop.service.impl;

import com.example.shop.entity.ChucVu;
import com.example.shop.repository.ChucVuRepository;
import com.example.shop.service.ChucVuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.UUID;

@Service
public class ChucVuServiceImpl implements ChucVuService {

    @Autowired
    private ChucVuRepository chucVuRepository;

    @Override
    public ArrayList<ChucVu> getAll() {
        return (ArrayList<ChucVu>) chucVuRepository.findAll();
    }

    @Override
    public ChucVu getById(String id) {
        ChucVu chucVu = chucVuRepository.findById(id).orElse(null);
        return chucVu;
    }

    @Override
    public void delete(String id) {
chucVuRepository.deleteById(id);
    }


    @Override
    public ChucVu add(ChucVu chucVu) {
        return chucVuRepository.save(chucVu);
    }

    @Override
    public ChucVu update(ChucVu chucVu) {
        return chucVuRepository.save(chucVu);
    }
}
