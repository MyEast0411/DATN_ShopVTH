package com.example.shop.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@Controller
public class AppController {

    @GetMapping("/index")
    public String index() {
        return "index";
    }

    @GetMapping("/hien-thi")
    public String hienThi(Model model) {
        model.addAttribute("hi","hihihi");
        return "index";
    }

}
