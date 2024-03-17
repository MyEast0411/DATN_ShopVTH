package com.example.shop.repositories;

import com.example.shop.entity.ChatLieu;
import com.example.shop.entity.NhanHieu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface NhanHieuRepository extends JpaRepository<NhanHieu, String> {
    @Query(value = "SELECT nh FROM NhanHieu nh WHERE nh.deleted = 1 ORDER BY nh.ngayTao ASC")
    List<NhanHieu> getAll();

    NhanHieu findByMa(String ma);

    Boolean existsByTen(String ten);

    Boolean existsByMa(String ma);
}
