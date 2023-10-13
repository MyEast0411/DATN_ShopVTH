import React, { useState } from "react";
import { Button as MaterialButton } from "@material-tailwind/react";
import ModalButton from "../small-component/ModalButton";
import "./GioHang";

// icons
import { BsQrCodeScan } from "react-icons/bs";
import CartItem from "./CartItem";

const GioHang = () => {
  return (
    <>
      {/* Nếu giỏ hàng trống thì hiển thị hình ảnh này */}
      {/* <div className="mx-auto grid place-content-center h-screen overflow-hidden">
        <img
          src="https://mir-s3-cdn-cf.behance.net/projects/404/2f038b134324769.Y3JvcCwxMDEwLDc5MCwyNSww.png"
          alt=""
          width={250}
        />
      </div> */}
      <div className="">
        <div className="flex items-center gap-4">
          <MaterialButton
            variant="gradient"
            className="poppins-font text-sm font-medium tracking-wide"
          >
            Thêm sản phẩm
          </MaterialButton>
          <MaterialButton
            variant="gradient"
            className="poppins-font flex text-sm items-center gap-4 font-medium tracking-wide"
          >
            <BsQrCodeScan />
            QR Sản phẩm
          </MaterialButton>
          <MaterialButton
            variant="outlined"
            className="poppins-font tracking-wide"
            style={{
              marginLeft: "600px",
            }}
          >
            Xem danh sách hóa đơn
          </MaterialButton>
        </div>
        <CartItem />

        <div className="flex justify-between mt-2">
          <MaterialButton
            variant="outlined"
            className="poppins-font text-s normal-case h-10"
          >
            Chọn tài khoản
          </MaterialButton>
          <span className="inline-block pt-6 font-semibold">
            Tên khách:{" "}
            <span className="font-medium text-blue-700">Khách lẻ</span>
          </span>
        </div>
        <p
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "#232D3F",
          }}
        />
        <div className="flex justify-center mt-2">
          <ModalButton
           titleButton="Thanh toán"
           titleModal="Thông tin thanh toán"
           />
        </div>
      </div>
    </>
  );
};

export default GioHang;
