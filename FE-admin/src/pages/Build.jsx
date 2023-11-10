import React from "react";
import { useParams } from "react-router-dom";
import SanPham from "./SanPham";
import TheLoai from "./TheLoai";
import MauSac from "./MauSac";
import DeGiay from "./DeGiay";
import NhanVien from "./NhanVien";
import KhachHang from "./KhachHang";
import KhuyenMai from "./KhuyenMai";
import Voucher from "./Voucher";

const Build = () => {
  const { bID } = useParams();
  // Dựa vào giá trị bID, xác định submenu được chọn và hiển thị nội dung tương ứng
  const renderSubMenuContent = () => {
    switch (bID) {
      case "san-pham":
        return <SanPham />;
      case "the-loai":
        return <TheLoai />;
      case "mau-sac":
        return <MauSac />;
      case "de-giay":
        return <DeGiay />;
      case "nhan-vien":
        return <NhanVien />;
      case "khach-hang":
        return <KhachHang />;
      case "khuyen-mai":
        return <KhuyenMai />;
      case "voucher":
        return <Voucher />;

      default:
        return null;
    }
  };

  return (
    <div>
      {/* <h1>Manage / {bID}</h1> */}
      {renderSubMenuContent()}
    </div>
  );
};

export default Build;
