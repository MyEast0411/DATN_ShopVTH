package com.example.shop.repositories;

import com.example.shop.entity.DeGiay;
import com.example.shop.entity.TheLoai;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface TheLoaiRepository extends JpaRepository<TheLoai, String> {
    @Query(value = "SELECT cl FROM TheLoai cl WHERE cl.deleted = 1 ORDER BY cl.ngayTao DESC")
    List<TheLoai> getAll();

    TheLoai findByMa(String ma);

    Boolean existsByTen(String ten);

    Boolean existsByMa(String ma);
}
