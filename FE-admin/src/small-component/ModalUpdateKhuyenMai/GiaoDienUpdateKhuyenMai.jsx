import React, { useEffect, useState } from "react";
import FilterDatePicker from "../FilterKhuyenMai/FilterDate";
import FilterPhanTramUpdateKhuyenMai from "../ModalUpdateKhuyenMai/FilterPhanTramUpdateKhuyenMai";
import { DatePicker } from "antd";
import moment from "moment";
import axios from "axios";

export default function GiaoDienUpdateKhuyenMai({ idKM }) {
  const currentDate = moment().format("DD/MM/YYYY");
  const [khuyenMai, setKhuyenMai] = useState({});
  const formatDateTime = (dateTime) => {
    return moment(dateTime, "DD/MM/YYYY HH:mm").format(); // Return in ISO 8601 format
  };

  useEffect(() => {
    const fetchKhuyenMaiById = async (id) => {
      try {
        const response = await axios.get(
          `http://localhost:8080/khuyen-mai/find-khuyenMai-byId/${id}`
        );
        const data = response.data;
        setKhuyenMai(data);
      } catch (error) {
        console.error("Error fetching KhuyenMai data:", error);
      }
    };

    fetchKhuyenMaiById(idKM);
  }, [idKM]);

  return (
    <>
      <div
        className="flex justify-center"
        style={{
          width: "500px",
        }}
      >
        <form
          className="bg-slate-500 rounded"
          style={{
            width: "100%",
          }}
        >
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-5 ">
            Chỉnh sửa khuyến mại
          </h2>
          <div>
            <label
              htmlFor="full_name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              ID khuyến mại
            </label>
            <input
              type="text"
              id="full_name"
              className="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="ID khuyến mại"
              value={idKM}
              required
              readOnly
            />
          </div>

          <div className="mt-5">
            <label
              htmlFor="full_name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Mã khuyến mại
            </label>
            <input
              type="text"
              id="full_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nhập mã khuyến mại"
              value={khuyenMai.ma}
              required
            />
          </div>
          <div className="mb-6 mt-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Tên
            </label>
            <input
              type="text"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nhập tên khuyến mại"
              required
              value={khuyenMai.ten}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="so_nha"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Ngày bắt đầu
            </label>
            <DatePicker
              showTime
              style={{ width: "100%" }}
              value={moment(khuyenMai.ngayBatDau, "DD/MM/YYYY")}
              format="DD/MM/YYYY"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="so_nha"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Ngày kết thúc
            </label>
            <DatePicker
              showTime
              style={{ width: "100%" }}
              value={moment(khuyenMai.ngayKetThuc, "DD/MM/YYYY")}
              format="DD/MM/YYYY"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Giá trị phần trăm
            </label>
            <FilterPhanTramUpdateKhuyenMai style={{ width: "100%" }} />
          </div>

          <div className="mb-6">
            <label
              htmlFor="so_nha"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Ngày cập nhật
            </label>
            <DatePicker
              style={{ width: "100%" }}
              value={moment(currentDate, "DD/MM/YYYY")}
              format="DD/MM/YYYY"
              disabled
            />
          </div>
        </form>
      </div>
    </>
  );
}
