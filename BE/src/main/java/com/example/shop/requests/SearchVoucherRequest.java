package com.example.shop.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchVoucherRequest {
    private Integer selectedStatus;
    private String textInput;
    private Integer gia;
}
