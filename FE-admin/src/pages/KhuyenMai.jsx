import React, { useEffect, useState, useRef } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { HiOutlineClipboardList } from "react-icons/hi";
import { AiOutlineFilter } from "react-icons/ai";
import TableAllKhuyenMai from "../common/tableNextUi/khuyenMai/TableAllKhuyenMai";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "../common/otherComponents/SearchIcon";
import { DatePicker, Space } from "antd";
import { searchByDate } from "../api/khuyenMai/KhuyenMaiApi";

const { RangePicker } = DatePicker;

const KhuyenMai = () => {
  const [ngayBatDau, setNgayBatDau] = useState([]);
  const [ngayKetThuc, setNgayKetThuc] = useState([]);

  const onSearch = async () => {
    try {
      if (dateRange.length === 2) {
        const [startDate, endDate] = dateRange;
        const response = await searchByDate(
          startDate.format(),
          endDate.format()
        );
        console.log(response);
      }
    } catch (error) {
      console.error("Error searching by date:", error);
    }
  };

  const onChangeDatePicker = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };
  return (
    <>
      <div className="mb-2  border-b-[1px] font-normal relative border-gray-500 text-lg flex  items-center">
        <AiOutlineFilter />
        <p className="ml-2 mt-1"> Bộ lọc</p>
      </div>

      <div
        className="font-normal border-gray-500 text-lg mb-5 flex gap-4"
        style={{
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "8px",
          width: "100%",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
          transition: "transform 0.2s",
          height: "200px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "40%",
          }}
        >
          <Input
            className=""
            isClearable
            style={{
              width: "100%",
            }}
            radius="lg"
            placeholder="Tìm kiếm bất kỳ..."
            startContent={
              <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block -mb-4 mt-1 text-sm font-medium text-gray-900 col-end-7 col-span-2"
            style={{
              display: "inline-block",
            }}
          >
            Tìm kiếm theo ngày
          </label>
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="DD-MM-YYYY HH:mm"
            style={{
              width: "100%",
            }}
            onChange={onChangeDatePicker}
          />
        </div>
      </div>

      <div>
        <div className="mb-2  border-b-[1px] font-normal relative border-gray-500 text-lg flex  items-center">
          <HiOutlineClipboardList />
          <p className="ml-2 mt-1"> Danh sách khuyến mại</p>
          <Link to={"/them-khuyen-mai"} className="absolute right-0 mb-1">
            <Button
              type="primary"
              style={{
                backgroundColor: "#1976d2",
                marginBottom: "2px",
              }}
            >
              + Tạo khuyến mại
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
            <TableAllKhuyenMai />
          </div>
        </div>
      </div>
    </>
  );
};

export default KhuyenMai;
