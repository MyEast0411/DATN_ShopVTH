package com.example.shop.repositories;

import com.example.shop.entity.KichCo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface KichCoRepository extends JpaRepository<KichCo, String> {

    @Query(value = "SELECT MAX(CAST(SUBSTRING(ma, 3) AS UNSIGNED)) as maxMa\n" +
            "FROM kich_co",nativeQuery = true)
    String getMaxMa();

    @Query(value = "SELECT kc FROM KichCo kc WHERE kc.deleted = 1")
    List<KichCo> getAll();

    KichCo findByTen(String ten);
}
