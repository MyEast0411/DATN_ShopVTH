package com.example.shop.response;

import java.util.Date;

public interface VoucherOfKhachHang {
    String getIdVoucher();
    String getTenVoucher();
    Double getGiaTriMin();
    Double getGiaTriMax();
    Date getNgayKetThuc();
}
