package com.example.shop.service;

import com.example.shop.entity.DiaChi;

import java.util.ArrayList;
import java.util.UUID;

public interface DiaChiService {
    ArrayList<DiaChi> getAll();
    DiaChi getById(UUID id);

    void delete(UUID id);
    DiaChi add(DiaChi diaChi);
    DiaChi update(DiaChi diaChi);
}
