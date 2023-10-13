package com.example.shop.repositories;

import com.example.shop.entity.ChatLieu;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ChatLieuRepository extends JpaRepository<ChatLieu, String> {
}
