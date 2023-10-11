import React, { useState } from "react";
import BasicTextFields from "../small-component/BasicTextFields";
import { Button as MaterialButton } from "@material-tailwind/react";
import { Switch } from "@material-tailwind/react";
import Delivery from "./Delivery";
import { Link } from "react-router-dom";
import { Checkbox } from "@material-tailwind/react";

export default function ThongTinThanhToan() {
  const [isBlur, setIsBlur] = useState(false);

  const handleSwitchChange = () => {
    setIsBlur(!isBlur);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="border-r-[3px]">
          <div className=" flex items-center gap-4">
            <BasicTextFields placeHolder="Voucher" />
            <MaterialButton
              variant="outlined"
              className="poppins-font text-s normal-case h-10"
            >
              Chọn Voucher
            </MaterialButton>
          </div>

          <div className="mt-10 ml-3 flex text-base items-center gap-4">
            <h3 className="font-semibold">Giao hàng</h3>
            <Switch checked={isBlur} onChange={handleSwitchChange} />
          </div>

          <div className="mt-10 ml-3 flex text-base items-center gap-4">
            <h3 className="font-semibold">VN Pay:{""}</h3>
            <Link to={"/VN-Pay"}>
              <img
                className="icon-hover cursor-pointer rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-10 duration-300"
                src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Icon-VNPAY-QR.png"
                width="50"
                height="50"
                alt=""
              />
            </Link>
          </div>

          <div className="mt-10 ml-3 flex text-base items-center gap-4">
          <h3 className="font-semibold">Chuyển khoản:{""}</h3>
            <Checkbox defaultChecked />
          </div>
          <div className="mt-10 justify-between">
            <span className="mr-2 text-base ml-3 font-semibold">
              Tiền hàng:{" "}
            </span>
            <span className="text-base" style={{ color: "#FF5656" }}>
              1.000.000{" "}
            </span>
            <span className="text-base ">VNĐ</span>
          </div>

          <div className="mt-10">
            <span className="mr-2 text-base ml-3 font-semibold">
              Giảm giá:{" "}
            </span>
            <span className="text-base" style={{ color: "#6499E9" }}>
              20.000{" "}
            </span>
            <span className="text-base ">VNĐ</span>
          </div>

          <div className="mt-10">
            <span className="mr-2 text-base ml-3 font-semibold">
              Tổng tiền:{" "}
            </span>
            <span className="text-base" style={{ color: "#FF5656" }}>
              980.000{" "}
            </span>
            <span className="text-base ">VNĐ</span>
          </div>
        </div>

        <div className="">
          <div className={`delivery-content ${!isBlur ? "blur" : ""}`}>
            <Delivery />
          </div>
        </div>
      </div>
    </>
  );
}
