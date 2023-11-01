package com.example.shop.components;

import com.example.shop.entity.KhuyenMai;
import com.example.shop.services.KhuyenMaiService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Component
public class KhuyenMaiScheduler {
    private final KhuyenMaiService khuyenMaiService;

    public KhuyenMaiScheduler(KhuyenMaiService khuyenMaiService) {
        this.khuyenMaiService = khuyenMaiService;
    }

    @Scheduled(fixedRate = 1000) // Cập nhật mỗi giây (1000 milliseconds)
    public void updateKhuyenMaiStatus() {
        try {
            Date currentDate = new Date();
            List<KhuyenMai> khuyenMaiList = khuyenMaiService.findAll();

            Calendar calendar = Calendar.getInstance();
            calendar.setTime(currentDate);
            calendar.add(Calendar.DATE, 20); // Thêm 20 ngày vào currentDate

            Date currentDatePlus20Days = calendar.getTime();

            for (KhuyenMai khuyenMai : khuyenMaiList) {
                if (khuyenMai.getNgayBatDau().after(currentDatePlus20Days)) {
                    khuyenMai.setTrangThai("Chưa diễn ra");
                } else if (khuyenMai.getNgayBatDau().after(currentDate)) {
                    khuyenMai.setTrangThai("Sắp diễn ra");
                } else if (khuyenMai.getNgayKetThuc().before(currentDate)) {
                    khuyenMai.setTrangThai("Đã kết thúc");
                } else {
                    khuyenMai.setTrangThai("Đang diễn ra");
                }

                khuyenMaiService.save(khuyenMai);
            }
        } catch (Exception e) {
            //
        }
    }


}
