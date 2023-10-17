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
import ThemSanPham from "./components/sanPham/ThemSanPham";
import ChiTietSanPham from "./components/sanPham/ChiTietSanPham";
import DetailSanPham from "./components/sanPham/DetailSanPham";
import KhuyenMaiUpdate from "./components/khuyenMai/KhuyenMaiUpdate";

const App = () => {
  return (
    <NextUIProvider>
      <RootLayout>
        <Routes>
          <Route path="/" element={<BanHangTaiQuay />} />
          <Route path="/quan-ly-hoa-don" element={<QuanLyHoaDon />} />
          <Route path="/khuyen-mai" element={<KhuyenMai />} />
          <Route
            path="/khuyen-mai/update/:idKM"
            element={<KhuyenMaiUpdate />}
          />
          <Route path="/voucher" element={<Voucher />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/them-khuyen-mai" element={<ThemKhuyenMai />} />
          <Route path="/them-san-pham" element={<ThemSanPham />} />
          <Route path="/edit-san-pham/:ma" element={<ChiTietSanPham />} />
          <Route path="/update-san-pham/:maSP" element={<DetailSanPham />} />
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
