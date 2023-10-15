import React, { useEffect, useState } from "react";
import FilterPhanTramUpdateKhuyenMai from "../ModalUpdateKhuyenMai/FilterPhanTramUpdateKhuyenMai";
import axios from "axios";
import moment from "moment/moment";
import { Button } from "antd";

export default function GiaoDienUpdateKhuyenMai({ idKM }) {
  const [currentDateTime, setCurrentDateTime] = useState(
    moment().format("YYYY-MM-DDTHH:mm:ss")
  );

  const [khuyenMai, setKhuyenMai] = useState({});
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");

  function formatDateToISOString(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  const handleStartDateChange = (event) => {
    setSelectedStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setSelectedEndDate(event.target.value);
  };

  useEffect(() => {
    const fetchKhuyenMaiById = async (id) => {
      try {
        const response = await axios.get(
          `http://localhost:8080/khuyen-mai/find-khuyenMai-byId/${id}`
        );
        setSelectedStartDate(
          formatDateToISOString(new Date(response.data.ngayBatDau))
        );
        setSelectedEndDate(
          formatDateToISOString(new Date(response.data.ngayKetThuc))
        );
        const data = response.data;
        setKhuyenMai(data);
      } catch (error) {
        console.error("Error fetching KhuyenMai data:", error);
      }
    };

    fetchKhuyenMaiById(idKM);
    const updateInterval = setInterval(() => {
      setCurrentDateTime(moment().format("YYYY-MM-DDTHH:mm:ss"));
    }, 1000);

    return () => clearInterval(updateInterval);
  }, [idKM]);

  const handleUpdateKhuyenMai = async () => {
    const updatedKhuyenMai = {
      ma: khuyenMai.ma,
      ten: khuyenMai.ten,
      ngayBatDau: selectedStartDate,
      ngayKetThuc: selectedEndDate,
      giaTriPhanTram: khuyenMai.giaTriPhanTram,
      ngaySua: currentDateTime,
      ngayTao: null,
      nguoiTao: "Nguyễn Văn Hội",
      nguoiSua: "Nguyễn Văn Hội",
    };
    console.log(updatedKhuyenMai);
    try {
      // Gọi API cập nhật khuyến mãi bằng phương thức PUT
      const response = await axios.put(
        `http://localhost:8080/khuyen-mai/update/${idKM}`,
        updatedKhuyenMai
      );
      console.log("Khuyến mãi đã được cập nhật:", response.data);
    } catch (error) {
      console.error("Lỗi khi cập nhật khuyến mãi:", error);
    }
  };
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
              htmlFor="idKM"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              ID khuyến mại
            </label>
            <input
              type="text"
              id="idKM"
              className="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="ID khuyến mại"
              value={idKM}
              required
              readOnly
            />
          </div>

          <div className="mt-5">
            <label
              htmlFor="ma"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Mã khuyến mại
            </label>
            <input
              type="text"
              id="ma"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nhập mã khuyến mại"
              value={khuyenMai.ma}
              required
            />
          </div>
          <div className="mb-6 mt-5">
            <label
              htmlFor="ten"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Tên
            </label>
            <input
              type="text"
              id="ten"
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
            <input
              type="datetime-local"
              id="startDateInput"
              value={selectedStartDate}
              onChange={handleStartDateChange}
              style={{
                width: "100%",
                border: "1px solid #e4e4e4",
                borderRadius: "4px",
                padding: "3px 7px",
              }}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="so_nha"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Ngày kết thúc
            </label>
            <input
              type="datetime-local"
              id="endDateInput"
              value={selectedEndDate}
              onChange={handleEndDateChange}
              style={{
                width: "100%",
                border: "1px solid #e4e4e4",
                borderRadius: "4px",
                padding: "3px 7px",
              }}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Giá trị phần trăm
            </label>
            <FilterPhanTramUpdateKhuyenMai
              style={{ width: "100%" }}
              value={khuyenMai.giaTriPhanTram}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="so_nha"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Ngày cập nhật
            </label>
            <input
              type="datetime-local"
              value={currentDateTime}
              format="DD/MM/YYYY"
              disabled
              style={{
                width: "100%",
                border: "1px solid #e4e4e4",
                borderRadius: "4px",
                padding: "3px 7px",
              }}
            />
          </div>
          <div className="text-center">
            <Button
              type="primary"
              style={{
                backgroundColor: "#1976d2",
                marginBottom: "2px",
              }}
              onClick={handleUpdateKhuyenMai}
            >
              Cập nhật
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
