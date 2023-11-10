package com.example.shop.viewmodel;

import com.example.shop.entity.KhachHang;
import com.example.shop.entity.Voucher;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class DataReq {
    private Voucher voucher;
    private List<KhachHang> listKhachHang;
}
