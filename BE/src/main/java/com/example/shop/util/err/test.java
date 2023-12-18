package com.example.shop.util.err;

import java.sql.Array;
import java.sql.Date;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.*;


public class test {
    public static void main(String[] args) {
        String str = "";
        List<Double> list = new ArrayList<>();
        list.add(1.2);
        list.add(12.0);
        list.add(12.1);
        list.add(4.4);
        //tìm ký tự viết hoa - thường
//        List<Character> lst = new ArrayList<>();
//        char x = 'A';
//        System.out.println(Character.isLowerCase(x));
//        for (String text : list) {
//            for(char c : text.toCharArray()) {
//                if(Character.isUpperCase(c)) {
//                    lst.add(c);
//                }
//            }
//        }
        // số lớn nhất
//        int max = list.stream().mapToInt(Integer::intValue).min().orElseThrow();
        Double max = list.stream().mapToDouble(Double::doubleValue).max().orElseThrow();
        list.stream().toList();
        System.out.println(max);
        // số nguyên tố
//        int n = 2000;
//        if(n <= 1) {
//            System.out.println("Đây là số nguyên tố");
//        }
//
//        for (int i = 2; i < Math.sqrt(n); i++) {
//            if(n % i == 0) {
//                System.out.println("Đây không là số nguyên tố");
//                return;
//            }else {
//                System.out.println("Đây là số nguyên tố");
//                return;
//            }
//        }
        //Đảo ngược chuỗi
//        Collections.reverse(list);
//        System.out.println(list);
        // sắp xếp mảng tăng dần - giảm dần dùng reverse
//        Collections.sort(list, Comparator.comparing(Integer::intValue));
//        Collections.reverse(list);
//        System.out.println(list);
//        System.out.println(list.get(1));
        // biểu thức chính quy
//        String text = "Hello      xin  chào";
//        for (int i =0; i < text.length();i++) {
//            System.out.println(text.charAt(i));
//            if(String.valueOf(text.charAt(i)).equalsIgnoreCase("h")) {
//                System.out.println("có chữ h");
//            }
//        }
//        String checkGmail = "[a-zA-z0-9._%+-]+@gmail\\.com";
        //String checkSo = "\\d+"; // check là số hay không
        //String num = "0943068255"; // check sdt từ 0-9 và 10 số
//        String checkSdt = "[0-9]{10}";
//        if(text.matches(checkGmail)){
//            System.out.println("Đây là số");
//        }else {
//            System.out.println("Đây không phải là số");
//        }
        String[] arr = {"1", "5" , "3", "4", "2", "5"};
//        List<String> lst = new ArrayList<>(Arrays.asList(arr));
//        Collections.sort(lst,Comparator.comparing(String::valueOf));
//        arr = lst.toArray(new String[0]);
//        System.out.println(Arrays.toString(arr));
        List<String> lst = new ArrayList<>(Arrays.asList(arr));
        for (int i = 0; i < lst.size(); i++) {
            if(lst.get(i).equals(arr[i])) {
                lst.remove(arr[i]);
            }
        }
        System.out.println(lst);
//        System.out.println(text);
//        System.out.println(text.replaceAll("\\s+"," "));
    }
}

