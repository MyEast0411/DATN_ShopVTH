package com.example.shop.requests;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;

@Getter
@Setter
@ToString
public class HoaDonClientReq {
        private String diaChi;
        private BigDecimal tienShip;
        private Long ngayNhan;
}
