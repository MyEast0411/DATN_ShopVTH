import React from "react";

export default function DetailKhuyenMai({ khuyenMaiSPCT }) {
  return (
    <div className="max-h overflow-auto" style={{ maxHeight: "70vh" }}>
      <div className="font-medium text-center pb-10">
        Sản phảm được giảm giá
      </div>
      <div class="grid grid-cols-4 gap-1">
        {khuyenMaiSPCT.map((item, index) => (
          <div className="pb-5" key={index}>
            <p>Mã: {item.id_chi_tiet_san_pham.ma}</p>
            <p>Tên: {item.id_chi_tiet_san_pham.ten}</p>
            <p>
              Giá:{" "}
              {Intl.NumberFormat().format(item.id_chi_tiet_san_pham.giaBan)} VNĐ{" "}
            </p>
            <p>Kích cỡ: {item.id_chi_tiet_san_pham.id_kich_co.ten}</p>
            <p>Số lượng tồn: {item.id_chi_tiet_san_pham.soLuongTon}</p>
            <img
              className="w-[150px] pt-1"
              src={item.id_chi_tiet_san_pham.defaultImg}
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
}
