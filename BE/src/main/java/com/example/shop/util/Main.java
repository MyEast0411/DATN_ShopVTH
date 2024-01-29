package com.example.shop.util;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Date;
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
        System.out.println(new Date());
    }
}

