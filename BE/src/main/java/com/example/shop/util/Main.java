package com.example.shop.util;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

class Test {
    String name;
    LocalDate date;

    public Test(String name, LocalDate date) {
        this.name = name;
        this.date = date;
    }

    @Override
    public String toString() {
        return "Test{" +
                "name='" + name + '\'' +
                ", date=" + date +
                '}';
    }
}

public class Main {
    public static void main(String[] args) {
        List<Test> Tests = Arrays.asList(
                new Test("Test A", LocalDate.of(2022, 1, 15)),
                new Test("Test B", LocalDate.of(2022, 2, 20)),
                new Test("Test C", LocalDate.of(2022, 3, 25)),
                new Test("Test D", LocalDate.of(2022, 4, 30))
        );

        LocalDate searchDate1 = LocalDate.of(2022, 3, 1);




        LocalDate searchDate2 = null; // Ngày truyền vào có thể trống

        List<Test> filteredTests = Tests.stream()
                .filter(Test -> searchDate2 == null || Test.date.isAfter(searchDate2) || Test.date.isEqual(searchDate2))
                .filter(event ->  searchDate1 == null || event.date.isBefore(searchDate1) || event.date.isEqual(searchDate1))
                .collect(Collectors.toList());

        System.out.println("Danh sách sự kiện sau ngày " +  ": " + filteredTests);
    }
}

