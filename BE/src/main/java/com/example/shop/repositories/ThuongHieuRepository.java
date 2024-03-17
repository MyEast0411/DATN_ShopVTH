package com.example.shop.repositories;

import com.example.shop.entity.ThuongHieu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface ThuongHieuRepository extends JpaRepository<ThuongHieu,String> {
    @Query(value = "SELECT nh FROM ThuongHieu nh WHERE nh.deleted = 1 ORDER BY nh.ngayTao DESC")
    List<ThuongHieu> getAll();

    ThuongHieu findByMa(String ma);

    Boolean existsByTen(String ten);

    Boolean existsByMa(String ma);
}
