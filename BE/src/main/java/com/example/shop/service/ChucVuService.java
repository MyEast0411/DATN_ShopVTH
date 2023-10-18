package com.example.shop.service;



import com.example.shop.entity.ChucVu;

import java.util.ArrayList;
import java.util.UUID;

public interface ChucVuService {
    ArrayList<ChucVu> getAll();
    ChucVu getById(String id);

    void delete(String id);
    ChucVu add(ChucVu chucVu);
    ChucVu update(ChucVu chucVu);
}
