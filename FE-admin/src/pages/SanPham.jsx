import React from 'react'

//filter
import FilterPhanTram from "../common/filter/khuyenMai/FilterPhanTram";
import FilterTrangThai from "../common/filter/khuyenMai/FilterTrangThai";
import FilterDate from "../small-component/FilterKhuyenMai/FilterDate";
import FilterMa from "../common/filter/khuyenMai/FilterMa";
import FilterTen from "../common/filter/khuyenMai/FilterTen";

import { Button } from "antd";
import { Link } from "react-router-dom";

//table
import DataTableMa from "../small-component/Table/DataTableSanPham";

//icon
import { BiFilterAlt } from "react-icons/bi";
import { FiRefreshCcw } from "react-icons/fi";
import { HiOutlineClipboardList } from "react-icons/hi";

export default function SanPham() {
  return (
<>
    <div>
        <div>
          <div className="mb-2 border-b-[1px] font-normal  border-gray-500 text-lg flex  items-center">
            <BiFilterAlt />
            <p className="ml-2 mt-1"> Bộ lọc</p>
          </div>

          <div
            className="grid drop-shadow-lg grid-cols-3 gap-4"
            style={{
              fontSizfe: "8px",
              backgroundColor: "white",
              padding: "20px 10px",
              borderRadius: "8px",
            }}
          >
            <div className="p-5">
              <FilterMa style={{ width: "100%" }} />
            </div>
            <div className="p-5">
              <FilterTen style={{ width: "100%" }} />
            </div>
            <div className="p-5">
              <FilterPhanTram
                placeholder="Giá trị giảm (%)"
                style={{ width: "100%" }}
              />
            </div>
            <div className="p-5">
              <FilterTrangThai
                placeholder="Chọn trạng thái"
                style={{ width: "100%" }}
              />
            </div>
            <div className="p-5">
              <FilterDate style={{ width: "100%" }} />
            </div>
            <div></div>
            <div className="p-5">
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
            </div>
          </div>
        </div>

        <div className="mb-2 mt-10 justify-between border-b-[2px] font-normal border-gray-500 text-lg	flex items-center">
          <div className="flex items-center">
            <HiOutlineClipboardList />
            <p className="ml-2 mt-1"> Danh sách sản phẩm</p>
          </div>
          <Link to={"/them-san-pham"}>
            <Button
              type="primary"
              style={{
                backgroundColor: "#1976d2",
                marginBottom: "2px",
              }}
            >
              + Tạo sản phẩm
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
          <DataTableMa />
          </div>
        </div>
      </div>
    </>
  )
}
