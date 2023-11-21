package com.example.shop.util.err;

import java.sql.Date;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.Calendar;


public class test {
    public static void main(String[] args) {
        int nam = Calendar.getInstance().get(Calendar.YEAR); // Năm muốn kiểm tra
        int thang = Calendar.getInstance().get(Calendar.MONTH)+1; // Tháng muốn kiểm tra



        // Tạo một LocalDate đại diện cho ngày đầu tiên của tháng
        LocalDate ngayDauThang = LocalDate.of(nam, thang, 1);

        // Xác định ngày trong tuần của ngày đầu tiên của tháng
        DayOfWeek ngayDauThangThu = ngayDauThang.getDayOfWeek();

        System.out.println("Các ngày trong tuần của tháng " + thang + " năm " + nam + ":");

        YearMonth yearMonth = YearMonth.of(nam, thang);
        LocalDate lastDayOfSpecificMonth = yearMonth.atEndOfMonth();

        System.out.println("Ngày cuối cùng của tháng " + thang + "/" + nam + ": " + lastDayOfSpecificMonth);

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

