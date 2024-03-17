package com.example.shop.controller;

import com.example.shop.entity.ChatLieu;
import com.example.shop.entity.KichCo;
import com.example.shop.repositories.ChatLieuRepository;
import com.example.shop.requests.UpdateChatLieuRequest;
import com.example.shop.requests.UpdateKichCoRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

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

    @GetMapping("getByMa/{ma}")
    public ResponseEntity getByMa(@PathVariable String ma) {
        return ResponseEntity.ok(repo.findByMa(ma));
    }

    @PostMapping("/addChatLieu")
    public ResponseEntity addChatLieu(@RequestBody ChatLieu chatLieu) {
        try {
            if(repo.existsByMa(chatLieu.getMa())) {
                return ResponseEntity.badRequest().body("Đã tồn tại mã chất liệu này");
            }
            if(repo.existsByTen(chatLieu.getTen())) {
                return ResponseEntity.badRequest().body("Đã tồn tại chất liệu này");
            }
            ChatLieu cl = ChatLieu.builder()
                    .ma(chatLieu.getMa())
                    .ten(chatLieu.getTen())
                    .ngayTao(new Date())
                    .nguoiTao("Đông")
                    .deleted(1)
                    .build();
            repo.save(cl);
            return ResponseEntity.ok("Thành công");
        }catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @PutMapping("deleteChatLieu/{maChatLieu}")
    public ResponseEntity deleteChatLieu(@PathVariable String maChatLieu) {
        try {
            ChatLieu cl = repo.findByMa(maChatLieu);
            cl.setDeleted(0);
            repo.save(cl);
            return ResponseEntity.ok("Thành công");
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("ERR");
        }
    }

    @PutMapping("updateChatLieu")
    public ResponseEntity updateChatLieu(@RequestBody UpdateChatLieuRequest request) {
        try {
            ChatLieu cl = repo.findById(request.getId()).get();
            cl.setMa(request.getMa());
            cl.setTen(request.getTen());
            cl.setNgaySua(new Date());
            cl.setNguoiSua("Đông");
            repo.save(cl);
            return ResponseEntity.ok("Thành công");
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("ERR");
        }
    }
}
