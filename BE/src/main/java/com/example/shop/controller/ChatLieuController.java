package com.example.shop.controller;

import com.example.shop.repositories.ChatLieuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RestController
@CrossOrigin("*")
@RequestMapping("chat-lieu")
public class ChatLieuController {
    @Autowired
    private ChatLieuRepository repo;

    @GetMapping("getAllChatLieu")
    public ResponseEntity getAllChatLieu() {
        return ResponseEntity.ok(repo.getAll());
    }
}
