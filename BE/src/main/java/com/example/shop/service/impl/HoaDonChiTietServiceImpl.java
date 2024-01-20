package com.example.shop.service.impl;

import com.example.shop.dto.SanPhamChiTietDTO;
import com.example.shop.entity.HoaDonChiTiet;
import com.example.shop.entity.SanPham;
import com.example.shop.entity.SanPhamChiTiet;
import com.example.shop.repositories.ChiTietSanPhamRepository;
import com.example.shop.repositories.HoaDonChiTietRepository;
import com.example.shop.service.HoaDonChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class HoaDonChiTietServiceImpl implements HoaDonChiTietService {
    @Autowired
    private HoaDonChiTietRepository repository;

    @Autowired
    ChiTietSanPhamRepository chiTietSanPhamRepository;




    @Override
    public List<HoaDonChiTiet> getHDCT(String idHD) {
        return repository.getHDCT(idHD);
    }

    @Override
    public void deleteHDCT(String idHD, String idSPCT) {
         repository.deleteHDCT(idHD, idSPCT);

    }

    @Override
    public  List<SanPhamChiTietDTO> getTop3() {
        List<SanPhamChiTietDTO> list = new ArrayList<>();
        int i = 0;
        for (Object[] o: repository.top3SP()
             ) {
            SanPhamChiTietDTO sanPhamChiTietDTO = new SanPhamChiTietDTO();
            sanPhamChiTietDTO.setSoLuong(Integer.parseInt(o[1].toString()));
            sanPhamChiTietDTO.setSanPhamChiTiet(chiTietSanPhamRepository.findById(o[0].toString()).get());
            sanPhamChiTietDTO.setId(i++);
            list.add(sanPhamChiTietDTO);
        }
        return list;
    }

    @Override
    public  List<SanPhamChiTietDTO> getTop5Year() {
        List<SanPhamChiTietDTO> list = new ArrayList<>();
        int i = 0;
        for (Object[] o: repository.top5SPYear()
        ) {
            SanPhamChiTietDTO sanPhamChiTietDTO = new SanPhamChiTietDTO();
            sanPhamChiTietDTO.setSoLuong(Integer.parseInt(o[1].toString()));
            sanPhamChiTietDTO.setSanPhamChiTiet(chiTietSanPhamRepository.findById(o[0].toString()).get());
            sanPhamChiTietDTO.setId(i++);
            list.add(sanPhamChiTietDTO);
        }
        return list;
    }

    @Override
    public Integer getSLSP(String idHD) {
        return repository.getSLSPByHD(idHD);
    }

    @Override
    public HoaDonChiTiet getHD(String idHD, String idSPCT) {
        return repository.getHDCT(idHD,idSPCT);
    }


    @Override
    public Integer totalSPSaled() {
        return repository.totalSPSaled();
    }
}
