package com.example.shop.requests;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VoucherUpdateRequest {
    private String id;
    private String ten;
    private String ma;
    private String code;
    private Integer giaTriMax;
    private Integer giaTriMin;
    private Integer soLuong;
}
