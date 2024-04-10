package com.example.shop.repositories;

import com.example.shop.entity.KichCo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface KichCoRepository extends JpaRepository<KichCo, String> {

    @Query(value = "SELECT MAX(CAST(SUBSTRING(ma, 3) AS UNSIGNED)) as maxMa\n" +
            "FROM kich_co",nativeQuery = true)
    String getMaxMa();

    @Query(value = "SELECT kc FROM KichCo kc WHERE kc.deleted = 1 ORDER BY kc.ngayTao ASC")
    List<KichCo> getAll();

    KichCo findByTen(String ten);

    KichCo findByMa(String ma);

    Boolean existsByTen(String ten);

    Boolean existsByMa(String ma);

    @Query(value = "SELECT *\n" +
            "FROM kich_co\n" +
            "WHERE deleted = :trang_thai\n" +
            "OR ten like \"%:ten%\" AND ten = ''\n" +
            "OR ma like \"%:ma%\" AND ma = '' order by ngay_tao desc", nativeQuery = true)
    List<KichCo> filter(@Param("trang_thai") Integer trang_thai, @Param("ten") String ten, @Param("ma") String ma);
}
