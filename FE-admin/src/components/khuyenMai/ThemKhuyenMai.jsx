import React, { useState } from "react";
import axios from "axios";
import FilterPhanTram from "../../small-component/FilterKhuyenMai/FilterPhanTram";
import FilterDatePicker from "../../small-component/FilterKhuyenMai/FilterDate";
import { Button } from "antd";
import SelectedTable1 from "../../small-component/TableKhuyenMai/SelectedTable1";
import SelectedTable2 from "../../small-component/TableKhuyenMai/SelectedTable2";
import { toast } from "react-toastify";

export default function ThemKhuyenMai() {
  const [ma, setMa] = useState("");
  const [ten, setTen] = useState("");
  const [giaTriPhanTram, setGiaTriPhanTram] = useState("");
  const [thoiGian, setThoiGian] = useState("");

  const [selectedValue, setSelectedValue] = useState("");

  // Tạo một mảng giá trị phần trăm từ 1 đến 90
  const percentValues = Array.from({ length: 90 }, (_, index) => index + 1);

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ma: ma,
        ten: ten,
        giaTriPhanTram: giaTriPhanTram,
        thoiGian: thoiGian,
      };
      console.log("Request Payload:", payload);
      const response = await axios.post(
        "http://localhost:8080/khuyen-mai/add",
        payload
      );

      if (response.status === 200) {
        setMa("");
        setTen("");
        setGiaTriGiam("");
        setThoiGian("");
      }
      toast.success(`Thêm thành công`, {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error adding KhuyenMai:", error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-8 gap-4 fixed">
        <div className="col-span-2">
          <form className="bg-slate-500 rounded" onSubmit={handleSubmit}>
            <h2 className="text-xl mb-10 font-bold text-gray-800">
              Thêm khuyến mại
            </h2>
            <div className="grid gap-6 mb-6 md:grid-cols-1">
              <div>
                <label
                  htmlFor="full_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Mã khuyến mại
                </label>
                <input
                  type="text"
                  value={ma}
                  onChange={(e) => setMa(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nhập mã khuyến mại"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Tên khuyến mại
                </label>
                <input
                  type="text"
                  value={ten}
                  onChange={(e) => setTen(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nhập tên khuyến mại"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Giá trị giảm
                </label>
                <select
                  value={selectedValue}
                  onChange={(e) => setGiaTriPhanTram(e.target.value)}
                  style={{
                    width: "100%",
                    borderRadius: "5px",
                    borderColor: "#e1e1e1",
                    padding: "2px 5px",
                  }}
                >
                  {percentValues.map((percent) => (
                    <option key={percent} value={percent}>
                      {percent}%
                    </option>
                  ))}
                </select>
              </div>

              <label
                htmlFor="phone"
                className="block -mb-4 mt-1 text-sm font-medium text-gray-900"
              >
                Thời gian
              </label>
              <FilterDatePicker
                value={thoiGian}
                onChange={(value) => setThoiGian(value)}
              />
            </div>
            <div className="flex justify-center">
              <Button
                type="primary"
                style={{
                  backgroundColor: "#1976d2",
                  marginBottom: "2px",
                }}
                htmlType="submit"
              >
                Thêm
              </Button>
            </div>
          </form>
        </div>
        <div
          className="pl-5 border-l-[2px] col-span-6 overflow-y-auto"
          style={{
            borderColor: "#ccc",
            height: "80%",
          }}
        >
          <h2
            className="text-xl mb-1 font-bold text-gray-800"
            style={{ backgroundColor: "#f1f1f1" }}
          >
            Sản phẩm
          </h2>
          <div className="">
            <SelectedTable1 />
          </div>
          <h2 className="text-xl mt-7 mb-1 font-bold text-gray-800">
            Chi tiết sản phẩm
          </h2>
          <div className="">
            <SelectedTable2 />
          </div>
        </div>
      </div>
    </>
  );
}
