import React from 'react'

//filter
import FilterPhanTram from "../common/filter/khuyenMai/FilterPhanTram";
import FilterTrangThai from "../common/filter/sanPham/FilterTrangThai";
import FilterDate from "../small-component/FilterKhuyenMai/FilterDate";
import FilterMa from "../common/filter/sanPham/FilterMa";
import Slider from '../common/filter/khachHang/SliderTuoi';

import { Button } from "antd";
import { Link } from "react-router-dom";

//table
import DataTableMa from "../small-component/Table/DataTableKhachHang";
import TableAllNhanVien from "../common/tableNextUi/nhanVien/TableAllNhanVien"

//icon
import { BiFilterAlt } from "react-icons/bi";
import { FiRefreshCcw } from "react-icons/fi";
import { HiOutlineClipboardList } from "react-icons/hi";

export default function NhanVien() {
  return (
    <>
    <div>
        <div>
          <div className="mb-2 font-normal border-gray-500 text-lg	flex items-center">
            <p className="mt-1 mb-3" style={{ fontSize: "30px", fontWeight: "bolder" }}>👥 Quản lý nhân viên</p>
          </div>
          <div className="mb-2 border-b-[1px] font-normal  border-gray-500 text-lg flex items-center">
            <BiFilterAlt />
            <p className="ml-2 mt-1"> Bộ lọc</p>
          </div>

          <div
            className="grid drop-shadow-lg grid-cols-1 md:grid-cols-3 gap-4"
            style={{
              fontSizfe: "8px",
              backgroundColor: "white",
              padding: "20px 10px",
              borderRadius: "8px",
              height : "200px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div className="p-5 ml-32">
              <FilterMa style={{ width: "100%" }} />
            </div>
            <div className="p-5">
              <div className="flex items-center">
                <span className="pr-2">Trạng thái:</span>
                <FilterTrangThai
                  style={{ width: "100%" }}
                />
                </div>
            </div>
            <div className="p-5">
              <Slider style={{ width: "100%" }} />
            </div>
            {/* <div className="p-5 text-center mt-4">
              <Button
                type="primary"
                style={{
                  backgroundColor: "#1976d2",
                  marginBottom: "2px",
                  marginLeft: "150%",
                }}
              >
                Làm mới
              </Button>
            </div> */}
          </div>
        </div>

        <div className="mb-2 mt-10 justify-between border-b-[2px] font-normal border-gray-500 text-lg	flex items-center">
          <div className="flex items-center">
            <HiOutlineClipboardList />
            <p className="ml-2 mt-1"> Danh sách nhân viên</p>
          </div>
          <Link to={"/quan-ly-tai-khoan/nhan-vien/them-nhan-vien"}>
            <Button
              type="primary"
              style={{
                backgroundColor: "#1976d2",
                marginBottom: "2px",
              }}
            >
              + Thêm nhân viên
            </Button>
          </Link>
        </div>
        <div
          className="drop-shadow-lg font-normal border-gray-500 text-lg	"
          style={{
            fontSizfe: "8px",
            backgroundColor: "white",
            padding: "10px",
            paddingLeft: "10px",
            borderRadius: "8px",
            width: "100%"
          }}
        >
          <div>
            <TableAllNhanVien />
          </div>
        </div>
      </div>
    </>
  )
}

