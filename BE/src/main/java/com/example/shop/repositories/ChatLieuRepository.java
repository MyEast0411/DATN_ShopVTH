package com.example.shop.repositories;

import com.example.shop.entity.ChatLieu;
import com.example.shop.entity.KichCo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface ChatLieuRepository extends JpaRepository<ChatLieu, String> {

    @Query(value = "SELECT cl FROM ChatLieu cl WHERE cl.deleted = 1 ORDER BY cl.ngayTao ASC")
    List<ChatLieu> getAll();
}
