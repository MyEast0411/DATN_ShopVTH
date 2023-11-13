import * as React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import { HiOutlineClipboardList } from "react-icons/hi";
import { AiOutlineFilter } from "react-icons/ai";
import { Button } from "antd";
import { Input, Option, Select } from "@material-tailwind/react";

import TabTrangThai from "../components/quanlyhoadon/TabTrangThai";

export default function QuanLyHoaDon() {
  // const url = "http://localhost:8080/hoa_don/";
  // const [data, setData] = React.useState([]);

  // const getData = async () => {
  //   const response = await axios.get(url + "getHoaDons").then((response) => {
  //     setData(
  //       response.data.map((item, index) => {
  //         return {
  //           ...item,
  //           id: index + 1,
  //           nhanVien: item.nhanVien.ma,
  //         };
  //       })
  //     );
  //   });
  //   // console.log(response.data);
  // };

  // React.useEffect(() => {
  //   getData();
  // }, []);
  return (
    <>
      <div>
      <div class="bg-white rounded-lg" >
        <div className="mb-2 border-b-[1px] font-normal relative border-gray-500 text-lg flex items-center">
          <AiOutlineFilter />
          <p className="ml-2 mt-1"> Bộ lọc</p>
        </div>
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
          <div
            className="flex gap-4 m-10"
            style={{
              width: "100%",
              alignItems: "center",
            }}
          >
            <label
              htmlFor="phone"
              className="text-sm font-medium text-gray-900"
              style={{
                display: "inline-block",
                justifyContent: "center",
              }}
            >
              Tìm kiếm
            </label>
            <div class="w-2/6 ">
              <Input label="Tìm kiếm bất kỳ..." />
            </div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-900"
              style={{
                display: "inline-block",
              }}
            >
              Loại
            </label>
            <div class="w-2/6">
              <Select variant="outlined" label="Loại đơn">
                <Option>Tại quầy</Option>
                <Option>Online</Option>
              </Select>
            </div>
          </div>

          <div
            className="flex gap-4 m-10"
            style={{
              width: "100%",
              alignItems: "center",
            }}
          >
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-900 "
              style={{
                display: "inline-block",
              }}
            >
              Ngày bắt đầu
            </label>
            <div class="w-2/6 ">
              <Input type="date" label="Ngày Bắt Đầu" />
            </div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-900 "
              style={{
                display: "inline-block",
              }}
            >
              Ngày kết thúc
            </label>
            <div class="w-2/6">
              <Input type="date" label="Ngày Kết Thúc" />
            </div>
          </div>

          <div class="flex justify-center mx-auto gap-10">
            <div>
              <Button
                type="primary"
                style={{
                  backgroundColor: "#1976d2",
                  marginBottom: "2px",
                }}
              >
                Làm Mới
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="mb-2 border-b-[1px] font-normal relative border-gray-500 text-lg flex  items-center">
          <HiOutlineClipboardList />
          <p className="ml-2 mt-1"> Danh sách hóa đơn</p>
          <Link to={"/"} className="absolute right-0 mb-1">
            <Button
              type="primary"
              style={{
                backgroundColor: "#1976d2",
                marginBottom: "2px",
              }}
            >
              + Tạo đơn hàng
            </Button>
          </Link>
        </div>
        <div
          className="font-normal border-gray-500 text-lg"
          style={{
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "8px",
            width: "100%",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            transition: "transform 0.2s",
          }}
        >
          <div>
            <TabTrangThai />
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
