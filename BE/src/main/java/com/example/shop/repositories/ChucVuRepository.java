package com.example.shop.repositories;

import com.example.shop.entity.ChucVu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChucVuRepository extends JpaRepository<ChucVu,String> {

    @Query(value = "SELECT MAX(CAST(SUBSTRING(ma, 3) AS UNSIGNED)) as maxMa\n" +
            "FROM chuc_vu",nativeQuery = true)
    String getMaxMa();

    ChucVu getChucVuByTen(String ten);

    @Query(value = "SELECT * FROM chuc_vu where deleted = 1",nativeQuery = true)
    List<ChucVu> getAllChucVu();
}
