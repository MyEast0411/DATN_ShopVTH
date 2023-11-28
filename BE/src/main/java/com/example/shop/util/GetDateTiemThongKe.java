package com.example.shop.util;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

public class GetDateTiemThongKe {

   public static List<LocalDate> getWeekInMonth(){
       int nam = Calendar.getInstance().get(Calendar.YEAR); // Năm muốn kiểm tra
       int thang = Calendar.getInstance().get(Calendar.MONTH)+1; // Tháng muốn kiểm tra
       // Tạo một LocalDate đại diện cho ngày đầu tiên của tháng
       LocalDate ngayDauThang = LocalDate.of(nam, thang, 1);
       // Xác định ngày trong tuần của ngày đầu tiên của tháng
       DayOfWeek ngayDauThangThu = ngayDauThang.getDayOfWeek();


       List<LocalDate> listNgayThang = new ArrayList<>();

       while (ngayDauThang.getMonthValue() == thang) {
           listNgayThang.add(ngayDauThang);
           ngayDauThang = ngayDauThang.plusDays(7);
       }

       return listNgayThang;
    }

    public static  List<LocalDate> getDayInWeek(){
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
        return weekDays;


    }
}
