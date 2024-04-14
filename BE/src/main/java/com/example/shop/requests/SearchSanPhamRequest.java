package com.example.shop.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchSanPhamRequest {
    private Integer selectedStatus;
    private String textInput;
    private Integer soLuongTon;
}
