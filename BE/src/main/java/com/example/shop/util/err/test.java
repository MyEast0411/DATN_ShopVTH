package com.example.shop.util.err;


import java.text.SimpleDateFormat;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;


public class test {
    public static void main(String[] args) {
//        int nam = Calendar.getInstance().get(Calendar.YEAR); // Năm muốn kiểm tra
//        int thang = Calendar.getInstance().get(Calendar.MONTH)+1; // Tháng muốn kiểm tra
//
//
//
//        // Tạo một LocalDate đại diện cho ngày đầu tiên của tháng
//        LocalDate ngayDauThang = LocalDate.of(nam, thang, 1);
//
//        // Xác định ngày trong tuần của ngày đầu tiên của tháng
//        DayOfWeek ngayDauThangThu = ngayDauThang.getDayOfWeek();
//
//        System.out.println("Các ngày trong tuần của tháng " + thang + " năm " + nam + ":");
//
//        YearMonth yearMonth = YearMonth.of(nam, thang);
//        LocalDate lastDayOfSpecificMonth = yearMonth.atEndOfMonth();
//
//
//
////        // In ra ngày đầu tiên của tháng
////        System.out.println("Ngày 1: " + ngayDauThang);
////
////        // In ra các ngày còn lại trong tuần
////        for (int i = 1; i < ngayDauThangThu.getValue(); i++) {
////            System.out.println("Ngày " + (i + 1) + ": " + ngayDauThang.minusDays(ngayDauThangThu.getValue() - i));
////        }
//
//        // In ra các ngày còn lại trong tháng
//        List<LocalDate> listNgayThang = new ArrayList<>();
//        listNgayThang.add(ngayDauThang);
//        while (ngayDauThang.getMonthValue() == thang) {
//            ngayDauThang = ngayDauThang.plusDays(7);
//            if (ngayDauThang.getMonthValue() == thang)
//            listNgayThang.add(ngayDauThang);
//        }
//        if (listNgayThang.size() < 6)
//        listNgayThang.add(lastDayOfSpecificMonth);
//        for (LocalDate date: listNgayThang) {
//            java.util.Date ngayBD =  java.util.Date.from(date.atStartOfDay(ZoneId.systemDefault()).toInstant());
//            java.util.Date ngayKT =  Date.from(date.plusDays(6).atStartOfDay(ZoneId.systemDefault()).toInstant());
//            //2023-10-20 00:00:00.000000
//            System.out.println("Ngày BD "+ new SimpleDateFormat("yyyy-MM-dd").format(ngayBD));
//            System.out.println("Ngày KT "+ ngayKT);
//        }


//        System.out.println("Ngày cuối cùng của tháng " + thang + "/" + nam + ": " + lastDayOfSpecificMonth);

        // Lấy ngày hiện tại
        LocalDate currentDate = LocalDate.now();

        // Lấy ngày đầu tiên của tuần
        LocalDate firstDayOfWeek = currentDate.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));

        // Tạo danh sách để lưu trữ các ngày trong tuần
        List<LocalDate> weekDays = new ArrayList<>();

        // Thêm ngày của tuần vào danh sách
        for (int i = 0; i < 7; i++) {
            weekDays.add(firstDayOfWeek.plusDays(i));
        }

        // In ra danh sách các ngày của tuần
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        for (LocalDate day : weekDays) {
            System.out.println(day.format(formatter));
        }

    }
}

