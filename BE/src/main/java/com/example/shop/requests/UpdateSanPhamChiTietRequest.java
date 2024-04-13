package com.example.shop.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateSanPhamChiTietRequest {
    private String id;
    private String description;
    private String id_chat_lieu;
    private String id_de_giay;
    private String id_kich_co;
    private String id_mau_sac;
    private String id_the_loai;
    private String id_thuong_hieu;
    private Double price;
    private String productName;
    private Integer quantity;
}
