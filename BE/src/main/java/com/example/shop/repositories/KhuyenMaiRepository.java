package com.example.shop.repositories;

import com.example.shop.entity.KhuyenMai;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface KhuyenMaiRepository extends JpaRepository<KhuyenMai, String> {
    List<KhuyenMai> findAll();
    KhuyenMai findByMa(String ma);
    List<KhuyenMai> findAllByDeleted(int deleted);

    @Query("SELECT k FROM KhuyenMai k WHERE (:ngayBatDau BETWEEN k.ngayBatDau AND k.ngayKetThuc OR :ngayKetThuc BETWEEN k.ngayBatDau AND k.ngayKetThuc) AND k.deleted = 0")
    List<KhuyenMai> findOverlappingPromotions(@Param("ngayBatDau") Date ngayBatDau, @Param("ngayKetThuc") Date ngayKetThuc);

}
