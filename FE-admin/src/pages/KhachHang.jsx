import React, { useEffect } from "react";

//filter
import FilterTrangThai from "../common/filter/sanPham/FilterTrangThai";
import Slider from "../common/filter/khachHang/SliderTuoi";
import { Input } from "@nextui-org/react";
import { Button, Select } from "antd";
import { Link } from "react-router-dom";

//table
import DataTableMa from "../small-component/Table/DataTableKhachHang";
import TableAllKhachHang from "../common/tableNextUi/khachHang/TableAllKhachHang";

//icon
import { BiFilterAlt } from "react-icons/bi";
import { SearchIcon } from "../common/otherComponents/SearchIcon";
import { HiOutlineClipboardList } from "react-icons/hi";
import axios from "axios";

export default function KhachHang() {
  const [search, setSearch] = React.useState("");
  const [data, setData] = React.useState([]);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setSearch(value);
    } else {
      setSearch("");
    }
  }, []);
  const handleChange = async (selectedValue) => {
    const result = await axios.post(`http://localhost:8080/filterKhachHang`, {
      selectedStatus: selectedValue,
      textInput: search
    })
    setData(result.data);
  };

  return (
    <>
      <div>
        <div>
          <h2 className="mb-5 font-bold text-2xl">Quản Lý Khách Hàng</h2>
          <div className="mb-2 border-b-[1px] font-normal  border-gray-500 text-lg flex items-center">
            <BiFilterAlt />
            <p className="ml-2 mt-1"> Bộ lọc</p>
          </div>

          <div
            className="grid drop-shadow-lg grid-cols-1 md:grid-cols-3 gap-4"
            style={{
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "8px",
              width: "100%",
              height: "170px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.2s",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="p-5 ml-32">
              <Input
                style={{
                  width: "100%",
                }}
                className=""
                isClearable
                value={search}
                onValueChange={onSearchChange}
                radius="lg"
                placeholder="Tìm kiếm bất kỳ..."
                startContent={
                  <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                }
              />
            </div>
            <div className="p-5">
              <div className="flex items-center">
                <span className="pr-2">Trạng thái:</span>
                <Select
                  defaultValue={-1}
                  className="w-48"
                  // style={{ width: "100%" }}
                  onChange={handleChange}
                  // allowClear
                  options={[
                    { value: -1, label: " Tất cả" },
                    { value: 1, label: " Kích hoạt" },
                    { value: 0, label: " Chưa kích hoạt" },
                  ]}
                />
              </div>
            </div>
            <div className="p-5">
              <Slider style={{ width: "100%" }} />
            </div>
          </div>
        </div>

        <div className="mb-2 mt-10 justify-between border-b-[2px] font-normal border-gray-500 text-lg	flex items-center">
          <div className="flex items-center">
            <HiOutlineClipboardList />
            <p className="ml-2 mt-1"> Danh sách khách hàng</p>
          </div>
          <Link to={"/quan-ly-tai-khoan/khach-hang/them-khach-hang"}>
            <Button
              type="primary"
              style={{
                backgroundColor: "#1976d2",
                marginBottom: "2px",
              }}
            >
              + Thêm khách hàng
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
            width: "100%",
          }}
        >
          <div>
            <TableAllKhachHang data={data} dataSearch={search} />
          </div>
        </div>
      </div>
    </>
  );
}
