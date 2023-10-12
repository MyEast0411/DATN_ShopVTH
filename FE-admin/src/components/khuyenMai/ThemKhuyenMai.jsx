import React, { useState } from "react";
import FilterPhanTram from "../../small-component/FilterKhuyenMai/FilterPhanTram";
import FilterDatePicker from "../../small-component/FilterKhuyenMai/FilterDate";
import { Button } from "antd";
import SelectedTable1 from "../../small-component/TableKhuyenMai/SelectedTable1";
import SelectedTable2 from "../../small-component/TableKhuyenMai/SelectedTable2";

export default function ThemKhuyenMai() {
  const [isBlur, setIsBlur] = useState(false);

  const handleSwitchChange = () => {
    setIsBlur(!isBlur);
  };

  return (
    <>
      <div className="grid grid-cols-8 gap-4 fixed">
        <div className="col-span-2">
          <form className="bg-slate-500 rounded">
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
                  id="full_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  id="phone"
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
                <FilterPhanTram
                  placeholder="Giá trị giảm (%)"
                  style={{
                    width: "100%",
                  }}
                />
              </div>

              <label
                htmlFor="phone"
                className="block -mb-4 mt-1 text-sm font-medium text-gray-900"
              >
                Thời gian
              </label>
              <FilterDatePicker
                style={{
                  width: "100%",
                }}
              />
            </div>
            <div className="flex justify-center">
              <Button
                type="primary"
                style={{
                  backgroundColor: "#1976d2",
                  marginBottom: "2px",
                }}
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
            style={{ backgroundColor: "#f1f1f1", }}
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
