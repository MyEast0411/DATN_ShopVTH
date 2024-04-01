import { Button, Input } from "antd";
import React from "react";
import { FaShippingFast } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa6";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { Tooltip } from "antd";
import { Result } from "antd";
import InforBill from "../components/tra_hang/InforBill";

export default function DoiTraHang() {
  return (
    <div
      className="font-normal border-gray-500 text-lg mb-5 gap-4"
      style={{
        backgroundColor: "white",
        padding: "10px",
        borderRadius: "8px",
        width: "100%",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
        transition: "transform 0.2s",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className="icon-title">
        <FaShippingFast style={{ display: "inline", fontSize: 30 }} />{" "}
        <span>Đổi trả</span>
      </div>

      <div
        className="filter-scan flex justify-center mt-5
        space-x-8
      "
      >
        <div className="flex items-center">
          <FaClipboardList /> <p>Mã hóa đơn</p>
        </div>
        <div className="flex space-x-4 items-center">
          <Input
            placeholder="Mời nhập mã hóa đơn"
            size="large"
            style={{ width: 300 }}
          />
          <Button size="large">Tìm kiếm</Button>
        </div>
        <div className="flex items-center">
          <Tooltip title="Quét mã hóa đơn">
            <Button size="large">
              <MdOutlineQrCodeScanner />
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className="infor mt-5">
        <InforBill />
      </div>
    </div>
  );
}
