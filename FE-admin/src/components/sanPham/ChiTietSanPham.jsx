import React from 'react'

//filter
import FilterMa from "../../small-component/Filter/FilterMa";
import FilterTrangThai from "../../small-component/Filter/FilterTrangThai";

import { Button } from "antd";
import { Link } from "react-router-dom";

//table
import DataTableCTSP from "../../small-component/Table/DataTableCTSP";

//icon
import { BiFilterAlt } from "react-icons/bi";
import { FiRefreshCcw } from "react-icons/fi";
import { HiOutlineClipboardList } from "react-icons/hi";

export default function ChiTietSanPham() {
  return (
<>
      <div
        className=""
        style={{
          fontSizfe: "8px",
        }}
      >
        <div className="mb-2 border-b-[2px] font-normal border-gray-500 text-lg	flex items-center">
          <BiFilterAlt />
          <p className="ml-2 mt-1"> Bộ lọc</p>
        </div>

        <div className=" flex items-center">
          <div className="pr-2">
            Tìm kiếm :
            <FilterMa placeholder="Tìm kiếm" />
          </div>
          {/* <div className="pr-2">
            Trạng Thái
            <FilterMa placeholder="Tên sản phẩm" />
          </div> */}
          {/* <div className="pr-2">
            <FilterPhanTram
              placeholder="Giá trị giảm (%)"
              style={{ width: "150px" }}
            />
          </div> */}
          <div className="pr-2">
            Trạng thái :  
            <FilterTrangThai placeholder="Chọn trạng thái" className="hover:cursor-pointer"/>
          </div>
          <div className="pr-2">
            Làm mới 
            {/* <FilterDate style={{ width: "100%" }}/> */}
          </div>
          <div className="pr-2">
            <button className="icon-hover">
              <FiRefreshCcw
                style={{
                  fontSize: "20px",
                  marginTop: "25%",
                  marginLeft: "10px",
                }}
              />
            </button>
          </div>
        </div>
        <div className="mb-2 mt-10 justify-between border-b-[2px] font-normal border-gray-500 text-lg	flex items-center">
          <div className="flex items-center">
            <HiOutlineClipboardList />
            <p className="ml-2 mt-1"> Danh sách chi tiết sản phẩm</p>
          </div>
          <Link to={"/quan-ly-san-pham/san-pham"}>
            <Button
              type="primary"
              style={{
                backgroundColor: "#1976d2",
                marginBottom: "2px",
              }}
            >
              Quay lại
            </Button>
          </Link>
        </div>
        <DataTableCTSP />
      </div>
    </>
  )
}
