package com.example.shop.repositories;

import com.example.shop.entity.ChatLieu;
import com.example.shop.entity.DeGiay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface DeGiayRepository extends JpaRepository<DeGiay, String> {
    @Query(value = "SELECT * FROM de_giay\n" +
            "order by ngay_tao desc",nativeQuery = true)
    List<DeGiay> getListDeGiay();

    @Query(value = "SELECT cl FROM DeGiay cl WHERE cl.deleted = 1 ORDER BY cl.ngayTao DESC")
    List<DeGiay> getAll();

    DeGiay findByMa(String ma);

    Boolean existsByTen(String ten);

    Boolean existsByMa(String ma);
}
