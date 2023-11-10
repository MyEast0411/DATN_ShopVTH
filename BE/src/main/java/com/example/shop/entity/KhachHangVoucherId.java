package com.example.shop.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class KhachHangVoucherId implements Serializable {

    private String id_voucher;

    private String id_khach_hang;
}
