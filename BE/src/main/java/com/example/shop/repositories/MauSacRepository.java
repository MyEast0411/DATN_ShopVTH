package com.example.shop.repositories;

import com.example.shop.entity.MauSac;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface MauSacRepository extends JpaRepository<MauSac, String> {

    MauSac findByMaMau(String maMau);

    @Query(value = "SELECT id FROM shopvth.mau_sac\n" +
            "WHERE ten = :tenMau",nativeQuery = true)
    String findIdByMauSac(@Param("tenMau")String tenMau);
}
