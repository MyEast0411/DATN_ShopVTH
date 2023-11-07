package com.example.shop.components;

import com.example.shop.entity.KhuyenMai;
import com.example.shop.entity.KhuyenMaiSanPhamChiTiet;
import com.example.shop.entity.SanPhamChiTiet;
import com.example.shop.repositories.ChiTietSanPhamRepository;
import com.example.shop.repositories.KhuyenMaiSanPhamChiTietRepository;
import com.example.shop.services.KhuyenMaiService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Component
public class KhuyenMaiScheduler {


    @Autowired
    KhuyenMaiService khuyenMaiService;
    @Autowired
    ChiTietSanPhamRepository sanPhamChiTietService;
    @Autowired
    KhuyenMaiSanPhamChiTietRepository kmspctRepo;

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


//    @Scheduled(fixedRate = 1000) // Cập nhật mỗi giây (1000 milliseconds)
//    public void RunKhuyenMaiIsActive() {
//        try {
//            Date currentDate = new Date();
//            List<KhuyenMai> khuyenMaiList = khuyenMaiService.findAllByDeleted(0);
//
//            for (KhuyenMai khuyenMai : khuyenMaiList) {
//                if (khuyenMai.getNgayBatDau().before(currentDate) &&
//                        khuyenMai.getNgayKetThuc().after(currentDate)) {
//                    applyDiscounts();
//                }
//            }
//        } catch (Exception e) {
//            // Handle exceptions
//        }
//    }
//    private static final Logger logger = LoggerFactory.getLogger(KhuyenMaiScheduler.class);
//
//    @Scheduled(fixedRate = 1000)
//    public void applyDiscounts() {
//        try {
//            List<KhuyenMaiSanPhamChiTiet> kmspcts = kmspctRepo.findKmspctByActiveKhuyenMai();
//            logger.info("KMSPCT: {}", kmspcts);
//
//            for (KhuyenMaiSanPhamChiTiet kmspct : kmspcts) {
//                SanPhamChiTiet spct = kmspct.getId_chi_tiet_san_pham();
//                Float discountPercentage = kmspct.getId_khuyen_mai().getGiaTriPhanTram();
//
//                BigDecimal originalPrice = spct.getGiaBan();
//                BigDecimal discountedPrice = originalPrice.multiply(BigDecimal.valueOf(1 - (discountPercentage / 100)));
//
//                spct.setGiaBan(discountedPrice);
//                spct.setNgaySua(new Date());
//
//                sanPhamChiTietService.save(spct);
//            }
//        } catch (Exception e) {
//            // Handle exceptions and log the error
//            logger.error("An error occurred during applyDiscounts: {}", e.getMessage(), e);
//        }
//    }


}
