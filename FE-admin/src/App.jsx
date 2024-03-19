import { Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import BanHangTaiQuay from "./pages/BanHangTaiQuay";
import QuanLyHoaDon from "./pages/QuanLyHoaDon";
import Build from "./pages/Build";
import Voucher from "./pages/Voucher";
import KhuyenMai from "./pages/KhuyenMai";
import Profile from "./pages/Profile";
import { NextUIProvider } from "@nextui-org/react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThemKhuyenMai from "./components/khuyenMai/ThemKhuyenMai";
import ThemKhachHang from "./components/khachHang/ThemKhachHang";
import ThemNhanVien from "./components/nhanVien/ThemNhanVien";
import CapNhatNhanVien from "./components/nhanVien/CapNhatNhanVien";
import ThemSanPham from "./components/sanPham/ThemSanPham";
import ChiTietSanPham from "./components/sanPham/ChiTietSanPham";
import DetailSanPham from "./components/sanPham/DetailSanPham";
import DetailKhachHang from "./components/khachHang/DetailKhachHang";

import EditVoucher from "./components/voucher/EditVoucher";

import DetailVoucher from "./components/voucher/DetailVoucher";
import AddVoucher from "./components/voucher/AddVoucher";
import ThongKe from "./pages/ThongKe";

import KhuyenMaiUpdate from "./components/khuyenMai/KhuyenMaiUpdate";
import DetailHoadon from "./components/thu_chi/DetailHoadon";

const App = () => {
  return (
    <NextUIProvider>
      <RootLayout>
        <Routes>
          <Route path="/" element={<BanHangTaiQuay />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/thong-ke" element={<ThongKe />} />

          <Route path="/quan-ly-hoa-don" element={<QuanLyHoaDon />} />
          <Route
            path="/quan-ly-hoa-don/detail-hoa-don/:id"
            element={<DetailHoadon />}
          />

          <Route path="/khuyen-mai" element={<KhuyenMai />} />
          <Route path="/them-khuyen-mai" element={<ThemKhuyenMai />} />
          <Route path="/them-khuyen-mai/:idKM" element={<ThemKhuyenMai />} />
          <Route
            path="/update-khuyen-mai/:idKM"
            element={<KhuyenMaiUpdate />}
          />

          <Route
            path="/quan-ly-tai-khoan/nhan-vien/them-nhan-vien"
            element={<ThemNhanVien />}
          />
          <Route
            path="/quan-ly-tai-khoan/nhan-vien/cap-nhat-nhan-vien/:maNV"
            element={<CapNhatNhanVien />}
          />

          <Route
            path="/quan-ly-tai-khoan/khach-hang/them-khach-hang"
            element={<ThemKhachHang />}
          />
          <Route
            path="/quan-ly-tai-khoan/khach-hang/edit-khach-hang/:maKH"
            element={<DetailKhachHang />}
          />
          {/* <Route path="/lich-su-mua-hang/:idkh" element={<LichSuMuaHang />} /> */}

          <Route
            path="/quan-ly-san-pham/san-pham/them-san-pham"
            element={<ThemSanPham />}
          />
          <Route
            path="/quan-ly-san-pham/san-pham/edit-san-pham/:ma"
            element={<ChiTietSanPham />}
          />
          <Route path="/update-san-pham/:maSP" element={<DetailSanPham />} />

          <Route
            path="/giam-gia/voucher/add-voucher"
            element={<AddVoucher />}
          />
          <Route path="/eidt-voucher/:id" element={<EditVoucher />} />
          <Route
            path="/giam-gia/voucher/detail-voucher/:id"
            element={<DetailVoucher />}
          />
          <Route path="/giam-gia/voucher" element={<Voucher />} />

          <Route path="/quan-ly-san-pham" element={<Build />}>
            <Route path=":bID">
              <Route path="product" />
              <Route path="type" />
              <Route path="de-giay" />
              <Route path="mau-sac" />
              <Route path="kich-co" />
              <Route path="thuong-hieu" />
              <Route path="chat-lieu" />
            </Route>
          </Route>

          <Route path="/quan-ly-tai-khoan" element={<Build />}>
            <Route path=":bID">
              <Route path="nhan-vien" />
              <Route path="khach-hang" />
            </Route>
          </Route>

          <Route path="/giam-gia" element={<Build />}>
            <Route path=":bID">
              <Route path="khuyen-mai" />
              <Route path="voucher" />
            </Route>
          </Route>

          <Route path="/settings" element={<Build />}>
            <Route path=":bID">
              <Route path="dang-nhap" />
              <Route path="dang-ky" />
              <Route path="dang-xuat" />
            </Route>
          </Route>
        </Routes>

        <ToastContainer position="top-right" autoClose={3000} />
      </RootLayout>
    </NextUIProvider>
  );
};

export default App;
