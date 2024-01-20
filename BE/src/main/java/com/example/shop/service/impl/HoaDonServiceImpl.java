package com.example.shop.service.impl;


import com.example.shop.dto.BieuDoThongKe;
import com.example.shop.dto.HoaDonThongKeDTO;
import com.example.shop.entity.HoaDon;
import com.example.shop.entity.HoaDonChiTiet;
import com.example.shop.repositories.HoaDonChiTietRepository;
import com.example.shop.repositories.HoaDonRepository;
import com.example.shop.service.HoaDonService;
import com.example.shop.util.GetDateTiemThongKe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Calendar;
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
                bieuDoThongKe.setName((i+1)+"");
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
    public List<BieuDoThongKe> getWeekInMonth() {
        List<LocalDate> list = GetDateTiemThongKe.getWeekInMonth();
        List<BieuDoThongKe> tongGia = new ArrayList<>();
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        int nam = Calendar.getInstance().get(Calendar.YEAR); // Năm muốn kiểm tra
        int thang = Calendar.getInstance().get(Calendar.MONTH)+1; // Tháng muốn kiểm tra
        YearMonth yearMonth = YearMonth.of(nam, thang);
        LocalDate lastDayOfSpecificMonth = yearMonth.atEndOfMonth();
        Date ngayKT =  new Date();
        for (int i = 0; i < list.size(); i++) {
          Date ngayBD =  Date.from(list.get(i).atStartOfDay(ZoneId.systemDefault()).toInstant());
            if (list.get(i).plusDays(6).getMonthValue() == thang){
                ngayKT = Date.from(list.get(i).plusDays(6).atStartOfDay(ZoneId.systemDefault()).toInstant());
            }else {
                ngayKT = Date.from(lastDayOfSpecificMonth.atStartOfDay(ZoneId.systemDefault()).toInstant());
            }


           Double tong  =  hoaDonRepository.getTotalTuanTheoThang(format.format(ngayBD),format.format(ngayKT));
           tong = tong == null ? 0 : tong;

           BieuDoThongKe bieuDoThongKe = new BieuDoThongKe();
           bieuDoThongKe.setId(i);
           bieuDoThongKe.setSoTien(tong);
           bieuDoThongKe.setName("Tuần "+(i+1));
           tongGia.add(bieuDoThongKe);
        }

     return tongGia;
    }

    @Override
    public List<BieuDoThongKe> getDayInWeek() {
        List<LocalDate> list = GetDateTiemThongKe.getDayInWeek();
        List<BieuDoThongKe> tongGia = new ArrayList<>();
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

        for (int i = 0; i < list.size(); i++) {
            Date ngayTao =  Date.from(list.get(i).atStartOfDay(ZoneId.systemDefault()).toInstant());

            Double tong  =  hoaDonRepository.getDayInWeek(format.format(ngayTao)+"%");
            tong = tong == null ? 0 : tong;

            BieuDoThongKe bieuDoThongKe = new BieuDoThongKe();
            bieuDoThongKe.setId(i);
            bieuDoThongKe.setSoTien(tong);
            if (i==6){
                bieuDoThongKe.setName("Chủ Nhật ");
            }else{
                bieuDoThongKe.setName("Thứ "+(i+2));
            }

            tongGia.add(bieuDoThongKe);
        }

        return tongGia;
    }

    @Override
    public Integer countHD() {
        return hoaDonRepository.countHD();
    }

    @Override
    public List<HoaDon> getHDByKH(String idKH) {
        return hoaDonRepository.getHDByKH(idKH);
    }



    @Override
    public List<HoaDon> getHDbyVoucher(String id) {
        return hoaDonRepository.getHoaDonByVoucher(id);
    }


}
