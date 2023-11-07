package com.example.shop.components;

import com.example.shop.entity.KhuyenMai;
import com.example.shop.entity.KhuyenMaiSanPhamChiTiet;
import com.example.shop.entity.SanPhamChiTiet;
import com.example.shop.repositories.ChiTietSanPhamRepository;
import com.example.shop.repositories.KhuyenMaiSanPhamChiTietRepository;
import com.example.shop.services.KhuyenMaiService;
import com.example.shop.viewmodel.SanPhamVM;
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


    @Scheduled(fixedRate = 1000) // Cập nhật mỗi giây (1000 milliseconds)
    public void RunKhuyenMaiIsActive() {
        try {
            Date currentDate = new Date();
            List<KhuyenMai> khuyenMaiList = khuyenMaiService.findAllByDeleted(0);

            for (KhuyenMai khuyenMai : khuyenMaiList) {
                if (khuyenMai.getNgayBatDau().before(currentDate) &&
                        khuyenMai.getNgayKetThuc().after(currentDate)) {
                    applyDiscounts();
                }
            }
        } catch (Exception e) {
            // Handle exceptions
        }
    }

    private static final Logger logger = LoggerFactory.getLogger(KhuyenMaiScheduler.class);

    public KhuyenMaiSanPhamChiTiet convertToKMSPCT(Object[] row) {
        KhuyenMaiSanPhamChiTiet kmspct = new KhuyenMaiSanPhamChiTiet();
        kmspct.setId_chi_tiet_san_pham(sanPhamChiTietService.findById((String) row[0]).get());
        kmspct.setId_khuyen_mai(khuyenMaiService.findById((String) row[1]).get());

        return kmspct;
    }

    @Scheduled(fixedRate = 1000)
    public void applyDiscounts() {
        try {
            List<Object[]> kmspcts = kmspctRepo.findKmspctByActiveKhuyenMai();

            for (Object[] kmspct : kmspcts) {
                KhuyenMaiSanPhamChiTiet sanPhamVM = convertToKMSPCT(kmspct);

                SanPhamChiTiet spct = sanPhamVM.getId_chi_tiet_san_pham();
                Float discountPercentage = sanPhamVM.getId_khuyen_mai().getGiaTriPhanTram();

                // Kiểm tra xem khuyến mãi đã hết hạn hay chưa
                KhuyenMai khuyenMai = sanPhamVM.getId_khuyen_mai();
                Date currentDate = new Date();
                Date endDate = khuyenMai.getNgayKetThuc();
                System.out.println("EndATE: " + endDate);
                System.out.println("CurrentDate: "+currentDate);
                if (endDate != null && currentDate.after(endDate)) {
                    // Khuyến mãi đã hết hạn, trả lại giá ban đầu
                    if (spct.getGiaNhap() != null) {
                        spct.setGiaBan(spct.getGiaNhap());
                        spct.setNgaySua(currentDate);
//                        spct.setOnSale(false);
                        sanPhamChiTietService.save(spct);
                    }
                }
                else {
                    // Kiểm tra xem giá ban đầu đã được lưu trữ
                    if (spct.getGiaNhap() == null) {
                        // Lưu giá ban đầu
                        spct.setGiaNhap(spct.getGiaBan());
                    }

                    // Kiểm tra xem giảm giá đã được áp dụng
                    if (spct.getGiaBan().compareTo(spct.getGiaNhap()) != 0) {
                        // Giảm giá đã được áp dụng, không cần xử lý lại
                        continue;
                    }

                    // Áp dụng giảm giá
                    BigDecimal originalPrice = spct.getGiaBan();
                    BigDecimal discountedPrice = originalPrice.multiply(BigDecimal.valueOf(1 - (discountPercentage / 100)));

                    spct.setGiaBan(discountedPrice);
                    spct.setNgaySua(currentDate);
//                    spct.setOnSale(true);
                    sanPhamChiTietService.save(spct);
                }
            }
        } catch (Exception e) {
            logger.error("An error occurred during applyDiscounts: {}", e.getMessage(), e);
        }
    }




}
