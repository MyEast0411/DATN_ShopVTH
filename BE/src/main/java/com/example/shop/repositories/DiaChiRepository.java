package com.example.shop.repositories;

import com.example.shop.entity.DiaChi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DiaChiRepository extends JpaRepository<DiaChi,String> {

    @Query(value = "SELECT a.* FROM dia_chi a\n" +
            "join khach_hang b on a.id_khach_hang = b.id\n" +
            "where b.ma = :ma and a.deleted = 1\n" +
            "order by a.trang_thai asc",nativeQuery = true)
    List<DiaChi> findDiaChiByMa(@Param("ma")String ma);

    @Query(value = "SELECT a.* FROM dia_chi a\n" +
            "join khach_hang b on a.id_khach_hang = b.id\n" +
            "where b.ma = :ma and a.trang_thai = 1 and a.deleted = 1\n" +
            "order by a.ngay_tao desc",nativeQuery = true)
    DiaChi findDiaChiMacDinh(@Param("ma")String ma);
}
