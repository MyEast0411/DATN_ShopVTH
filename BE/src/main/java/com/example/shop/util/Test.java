package com.example.shop.util;

import java.nio.file.Path;
import java.nio.file.Paths;

public class Test {
    public static void main(String[] args) {
        String userHome = System.getProperty("user.home");

        // Kết hợp với đường dẫn "Pictures/Saved Pictures"
        String fullPath = userHome + "\\Pictures\\Saved Pictures";

        // Tạo đối tượng Path từ đường dẫn
        Path path = Paths.get(fullPath);

        // In đường dẫn
        System.out.println("Đường dẫn: " + path.toString());
    }
}
