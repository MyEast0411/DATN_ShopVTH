package com.example.shop.util.err;

import java.sql.Date;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.Month;

public class test {
    public static void main(String[] args) {
        int nam = 2023; // Năm muốn kiểm tra
        int thang = 11; // Tháng muốn kiểm tra

        // Tạo một LocalDate đại diện cho ngày đầu tiên của tháng
        LocalDate ngayDauThang = LocalDate.of(nam, Month.of(thang), 1);

        // Xác định ngày trong tuần của ngày đầu tiên của tháng
        DayOfWeek ngayDauThangThu = ngayDauThang.getDayOfWeek();

        System.out.println("Các ngày trong tuần của tháng " + thang + " năm " + nam + ":");

//        // In ra ngày đầu tiên của tháng
//        System.out.println("Ngày 1: " + ngayDauThang);

//        // In ra các ngày còn lại trong tuần
//        for (int i = 1; i < ngayDauThangThu.getValue(); i++) {
//            System.out.println("Ngày " + (i + 1) + ": " + ngayDauThang.minusDays(ngayDauThangThu.getValue() - i));
//        }

        // In ra các ngày còn lại trong tháng
        while (ngayDauThang.getMonthValue() == thang) {
            System.out.println("Ngày " + ngayDauThang.getDayOfMonth() + ": " + ngayDauThang);
            ngayDauThang = ngayDauThang.plusDays(6);
        }
    }
}

