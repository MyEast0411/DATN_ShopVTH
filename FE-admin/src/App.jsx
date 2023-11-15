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
import ThemSanPham from "./components/sanPham/ThemSanPham";
import ChiTietSanPham from "./components/sanPham/ChiTietSanPham";
import DetailSanPham from "./components/sanPham/DetailSanPham";
import DetailKhachHang from "./components/khachHang/DetailKhachHang";

import EditVoucher from "./components/voucher/EditVoucher";
import DetailHoaDon from "./components/quanlyhoadon/DetailHoaDon";
import DetailVoucher from "./components/voucher/DetailVoucher";
import AddVoucher from "./components/voucher/AddVoucher";
import ThongKe from "./pages/ThongKe";

const App = () => {
  return (
    <NextUIProvider>
      <RootLayout>
        <Routes>
          <Route path="/" element={<BanHangTaiQuay />} />
          <Route path="/quan-ly-hoa-don" element={<QuanLyHoaDon />} />
          <Route path="/khuyen-mai" element={<KhuyenMai />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/them-khuyen-mai" element={<ThemKhuyenMai />} />
          <Route path="/them-khuyen-mai/:idKM" element={<ThemKhuyenMai />} />
          <Route path="/them-khach-hang" element={<ThemKhachHang />} />
          <Route path="/them-san-pham" element={<ThemSanPham />} />

          <Route path="/edit-san-pham/:ma" element={<ChiTietSanPham />} />
          <Route path="/update-san-pham/:maSP" element={<DetailSanPham />} />
          <Route path="/edit-khach-hang/:maKH" element={<DetailKhachHang />} />

          <Route path="/add-voucher" element={<AddVoucher />} />
          <Route path="/eidt-voucher/:id" element={<EditVoucher />} />
          <Route path="/detail-voucher/:id" element={<DetailVoucher />} />

          <Route path="/giam-gia/voucher" element={<Voucher />} />
          <Route path="/detail-hoa-don/:id" element={<DetailHoaDon />} />

          <Route path="/thong-ke" element={<ThongKe />} />

          <Route path="/quan-ly-san-pham" element={<Build />}>
            <Route path=":bID">
              <Route path="product" />
              <Route path="type" />
              <Route path="de-giay" />
              <Route path="mau-sac" />
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
