package com.example.shop.repositories;

import com.example.shop.entity.DiaChi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DiaChiRepository extends JpaRepository<DiaChi,String> {

    @Query(value = "SELECT a.* FROM shopvth.dia_chi a\n" +
            "join shopvth.khach_hang b on a.id_khach_hang = b.id\n" +
            "where b.ma = :ma\n" +
            "order by a.ngay_tao desc",nativeQuery = true)
    List<DiaChi> findDiaChiByMa(@Param("ma")String ma);
}
