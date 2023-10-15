package com.example.ph29085_cam_lab5_8.service.impl;

import com.example.ph29085_cam_lab5_8.model.ChucVu;
import com.example.ph29085_cam_lab5_8.repository.ChucVuRepository;
import com.example.ph29085_cam_lab5_8.service.ChucVuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class ChucVuServiceImpl implements ChucVuService {
    @Autowired
    private ChucVuRepository repository;
    @Override
    public Page<ChucVu> getPages(Pageable pageable) {
        return repository.findAll(pageable);
    }
    @Override
    public void delete(ChucVu chucVu) {
         repository.delete(chucVu);
    }

    @Override
    public Page<ChucVu> search(Date dateBD, Date dateKT , Pageable pageable) {
        return repository.searchNgayTao(dateBD , dateKT , pageable);
    }
}
