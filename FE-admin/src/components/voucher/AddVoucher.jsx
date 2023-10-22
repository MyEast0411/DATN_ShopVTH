import React, { useState, useEffect } from "react";
import FilterPhanTram from "../../small-component/FilterKhuyenMai/FilterPhanTram";
import FilterDatePicker from "../../small-component/FilterKhuyenMai/FilterDate";
import { Button, Radio, Image } from "antd";
import TableAntd from "../../small-component/common/TableAntd";
import axios from "axios";

export default function AddVoucher() {
  const url = "http://localhost:8080";

  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  useEffect(() => {
    getDataKhachHang();
  }, []);

  const [listKhachHang, setListKhachHang] = useState([]);
  const [dataKhachHang, setDataKhachHang] = useState([]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setListKhachHang(selectedRows);
    },
  };

  const getDataKhachHang = async () => {
    await axios
      .get(url + "/khach-hang/getKhachHangs")
      .then((response) => {
        console.log(response.data);
        setDataKhachHang(response.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="grid grid-cols-8 gap-4 fixed">
        <div className="col-span-2">
          <form className="bg-slate-500 rounded">
            <h2 className="text-xl mb-10 font-bold text-gray-800">
              Thêm voucher
            </h2>
            <div className="grid gap-6 mb-6 md:grid-cols-1">
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Code voucher
                </label>
                <input
                  type="text"
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nhập code voucher"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Tên voucher
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
                  Giá trị tối thiểu
                </label>
                <input
                  type="text"
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nhập giá trị tối thiểu"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Giá trị tối đa
                </label>
                <input
                  type="text"
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nhập giá trị tối đa"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Số lượng
                </label>
                <input
                  type="text"
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nhập số lượng"
                  required
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
          className="pl-5 border-l-[2px] col-span-6 "
          style={{
            borderColor: "#ccc",
            height: "80%",
          }}
        >
          <div className="row mb-5">
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={1}>Tất cả hệ thống</Radio>
              <Radio value={2}>Chọn user</Radio>
            </Radio.Group>
          </div>
          {value === 2 ? (
            <>
              <h2
                className="text-xl mb-1 font-bold text-gray-800"
                style={{ backgroundColor: "#f1f1f1" }}
              >
                Danh sách khách hàng
              </h2>
              <div className="">
                <TableAntd
                  rowSelection={rowSelection}
                  columns={columns}
                  dataSource={dataKhachHang}
                  size={4}
                />
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

const columns = [
  {
    title: "Mã Khách Hàng",
    dataIndex: "ma",
    key: "ma",
    width: "20%",
  },
  {
    title: "Avatar",
    dataIndex: "anhNguoiDung",
    key: "anhNguoiDung",
    render: (text) => <Image width={70} height={100} src={text} />,
  },
  {
    title: "Tên Khách Hàng",
    dataIndex: "ten",
    key: "ten",
  },
  {
    title: "SDT",
    dataIndex: "sdt",
    key: "sdt",
  },
  {
    title: "Giới Tính",
    dataIndex: "gioiTinh",
    key: "gioiTinh",
  },
];
