package com.example.shop.repositories;

import com.example.shop.entity.ChatLieu;
import com.example.shop.entity.KichCo;
import com.example.shop.entity.TheLoai;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ChatLieuRepository extends JpaRepository<ChatLieu, String> {

    @Query(value = "SELECT cl FROM ChatLieu cl WHERE cl.deleted = 1 ORDER BY cl.ngayTao DESC")
    List<ChatLieu> getAll();

    ChatLieu findByMa(String ma);

    Boolean existsByTen(String ten);

    Boolean existsByMa(String ma);

    @Query(value = "SELECT *\n" +
            "FROM chat_lieu\n" +
            "WHERE deleted = :trang_thai\n" +
            "OR ten like \"%:ten%\" AND ten = ''\n" +
            "OR ma like \"%:ma%\" AND ma = '' order by ngay_tao desc", nativeQuery = true)
    List<ChatLieu> filter(@Param("trang_thai") Integer trang_thai, @Param("ten") String ten, @Param("ma") String ma);

    @Query(value = "SELECT MAX(CAST(SUBSTRING(ma, 3) AS UNSIGNED)) as maxMa\n" +
            "FROM chat_lieu",nativeQuery = true)
    String getMaxMa();
}
