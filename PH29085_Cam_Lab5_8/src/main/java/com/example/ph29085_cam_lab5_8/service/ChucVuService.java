package com.example.ph29085_cam_lab5_8.service;

import com.example.ph29085_cam_lab5_8.model.ChucVu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;

public interface ChucVuService {
    Page<ChucVu> getPages(Pageable pageable);
    void delete(ChucVu chucVu);
    Page<ChucVu> search(Date dateBD , Date dateKT , Pageable pageable);
}
