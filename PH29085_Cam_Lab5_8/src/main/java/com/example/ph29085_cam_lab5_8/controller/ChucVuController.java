package com.example.ph29085_cam_lab5_8.controller;

import com.example.ph29085_cam_lab5_8.model.ChucVu;
import com.example.ph29085_cam_lab5_8.service.ChucVuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.Banner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;

@Controller
@RequestMapping("chuc-vu")
public class ChucVuController {
    @Autowired
    private ChucVuService service;

    @GetMapping("hien-thi")
    public String home(@RequestParam(name = "page" , defaultValue = "0")Integer page  , Model model){
        Pageable pageable = PageRequest.of(page , 2);
        Page<ChucVu> pageCV = service.getPages(pageable);
        model.addAttribute("pageCV" , pageCV);
        System.out.println(pageCV.getTotalPages());
        return"index";
    }

//    @PostMapping("update")
//    public String home(@RequestParam(name = "page" , defaultValue = "0")Integer page  , Model model){
//        Pageable pageable = PageRequest.of(page , 2);
//        Page<ChucVu> pageCV = service.getPages(pageable);
//        model.addAttribute("pageCV" , pageCV);
//        System.out.println(pageCV.getTotalPages());
//        return"index";
//    }

    @PostMapping("search")
    public String home(@RequestParam(name = "ngayBD" ) String BD ,
                       @RequestParam(name = "ngayKT" ) String KT
                 , Model model){
        Pageable pageable = PageRequest.of(0 , 4);
        Page<ChucVu> pageCV = service.search(new Date(BD) ,new Date(KT) ,pageable);
        model.addAttribute("pageCV" , pageCV);
        System.out.println(pageCV.getTotalPages());
        return"index";
    }

    @GetMapping("detail/{id}")
    public String detail(@PathVariable("id")ChucVu chucVu , Model model){
        model.addAttribute("cv" , chucVu);
        return"detail";
    }

    @GetMapping("view-update/{id}")
    public String viewUpdate(@PathVariable("id")ChucVu chucVu , Model model){
        model.addAttribute("chucVu" , chucVu);
        return"update";
    }


    @GetMapping("delete/{id}")
    public String delete(@PathVariable("id") ChucVu chucVu){
        service.delete(chucVu);
        return"redirect:/chuc-vu/hien-thi";
    }
}
