package com.example.shop.service.impl;


import com.example.shop.dto.BieuDoThongKe;
import com.example.shop.dto.HoaDonDTO;
import com.example.shop.dto.HoaDonThongKeDTO;
import com.example.shop.entity.HoaDon;
import com.example.shop.entity.HoaDonChiTiet;
import com.example.shop.entity.SanPhamChiTiet;
import com.example.shop.repositories.HoaDonChiTietRepository;
import com.example.shop.repositories.HoaDonRepository;
import com.example.shop.service.HoaDonService;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class HoaDonServiceImpl implements HoaDonService {

    @Autowired
    private HoaDonRepository hoaDonRepository;

    @Autowired
    private HoaDonChiTietRepository ssHDCT;



    @Override
    public List<HoaDon> getHoaDons() {
        return hoaDonRepository.getPageDeleted();
    }

    @Override
    public HoaDon getHoaDon(String id) {
        return hoaDonRepository.findById(id).orElse(null);
    }

    @Override
    public HoaDon addHoaDon(HoaDon hoaDon) {
        return hoaDonRepository.save(hoaDon);
    }

    @Override
    public HoaDon updateHoaDon(HoaDon hoaDon) {
        return hoaDonRepository.save(hoaDon);
    }

    @Override
    public Boolean deleteHoaDon(HoaDon hoaDon) {
       try {
           hoaDonRepository.delete(hoaDon);
           return true;
       }catch (Exception exception){
           exception.printStackTrace();
           return false;
       }
    }

    @Override
    public List<HoaDon> getHDs(int page) {
        return hoaDonRepository.getPage(page);
    }

    public List<BieuDoThongKe> getTotalByThang() {

        List<BieuDoThongKe> list = new ArrayList<>();
        double a = 0;

            for (int i = 0; i < 12; i++) {
                BieuDoThongKe  bieuDoThongKe = new BieuDoThongKe();
                bieuDoThongKe.setName(i+"");
                bieuDoThongKe.setId(i);
                if (hoaDonRepository.getTotalByThang(i+1) == null){
                    bieuDoThongKe.setSoTien(0.0);

                }else{
                    bieuDoThongKe.setSoTien(hoaDonRepository.getTotalByThang(i+1));
                }
        list.add(bieuDoThongKe);
        }
        return list;
    }

    @Override
    public BigDecimal getTotalAll() {
        return new BigDecimal(hoaDonRepository.getTotalAll()+"");
    }

    @Override
    public List<HoaDonThongKeDTO> top5HDMoi() {
        List<HoaDon> list  = hoaDonRepository.top5HDMoi();
        List<HoaDonThongKeDTO> listHHDTHHDTO  = new ArrayList<>();
        for (HoaDon hoaDon: list) {
            List<HoaDonChiTiet> hoaDonChiTiets = ssHDCT.getHDCT(hoaDon.getId());
            HoaDonThongKeDTO hoaDonDTO = new HoaDonThongKeDTO();
            hoaDonDTO.setMa(hoaDon.getMa());
            hoaDonDTO.setTongTien(hoaDon.getTongTien());
            hoaDonDTO.setNgayTao(hoaDon.getNgayTao());
            hoaDonDTO.setListHDCT(hoaDonChiTiets);
            listHHDTHHDTO.add(hoaDonDTO);
        }
        return listHHDTHHDTO;
    }



    @Override
    public List<Double> getTotalTuanTheoThang() {
       List<Double> list = new ArrayList<>();
       double a = 0;

        return list;

    }

    @Override
    public Integer countHD() {
        return hoaDonRepository.countHD();
    }



}
