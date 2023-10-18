package com.example.shop.service;

import com.example.shop.entity.DiaChi;

import java.util.ArrayList;
import java.util.UUID;

public interface DiaChiService {
    ArrayList<DiaChi> getAll();
    DiaChi getById(String id);

    void delete(String id);
    DiaChi add(DiaChi diaChi);
    DiaChi update(DiaChi diaChi);
}
