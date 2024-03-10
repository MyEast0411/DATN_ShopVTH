package com.example.shop.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchNhanVienRequest {
    private Integer selectedStatus;
    private String textInput;
}
