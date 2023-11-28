package com.example.shop.controller;

import com.example.shop.repositories.KichCoRepository;
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
@RequestMapping("kich-co")
public class KichCoController {

    @Autowired
    private KichCoRepository repo;

    @GetMapping("getAllKichCo")
    public ResponseEntity getAllKichCo() {
        return ResponseEntity.ok(repo.getAll());
    }


}
