import { Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import BanHangTaiQuay from "./pages/BanHangTaiQuay";
import QuanLyHoaDon from "./pages/QuanLyHoaDon";
import Build from "./pages/Build";
import Voucher from "./pages/Voucher";
import KhuyenMai from "./pages/KhuyenMai";
import Profile from "./pages/Profile";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<BanHangTaiQuay />} />
        <Route path="/quan-ly-hoa-don" element={<QuanLyHoaDon />} />
        <Route path="/khuyen-mai" element={<KhuyenMai />} />
        <Route path="/voucher" element={<Voucher />} />
        <Route path="/profile" element={<Profile />} />

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
  );
};

export default App;
