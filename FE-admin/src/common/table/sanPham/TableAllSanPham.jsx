import React, { useState } from "react";
import { Button, Space, Table } from "antd";

const data = [
  {
    key: "1",
    STT: 1,
    tenSanPham: "KM1",
    tenKhuyenMai: "Khuyến mại tháng 1",
    giaTriPhanTram: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    STT: 2,
    maKhuyenMai: "KM002",
    tenKhuyenMai: "Khuyến mại tháng 11",
    giaTriPhanTram: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    STT: 3,
    maKhuyenMai: "KM03",
    tenKhuyenMai: "Khuyến mại Tết",
    giaTriPhanTram: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    STT: 4,
    maKhuyenMai: "KM0004",
    tenKhuyenMai: "Khuyến mại tháng 1",
    giaTriPhanTram: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "5",
    STT: 5,
    maKhuyenMai: "KM0004",
    tenKhuyenMai: "Khuyến mại tháng 1",
    giaTriPhanTram: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "6",
    STT: 6,
    maKhuyenMai: "KM0004",
    tenKhuyenMai: "Khuyến mại tháng 1",
    giaTriPhanTram: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "7",
    STT: 7,
    tenSanPham: "KM0004",
    tenKhuyenMai: "Khuyến mại tháng 1",
    giaTriPhanTram: 32,
    address: "London No. 2 Lake Park",
  },
];
const paginationOptions = {
  defaultPageSize: 5
};

const TableAllKhuyenMai = () => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
      sorter: (a, b) => a.STT - b.STT,
      sortOrder: sortedInfo.columnKey === "STT" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "tenSanPham",
      key: "tenSanPham",
      filteredValue: filteredInfo.tenSanPham || null,
      onFilter: (value, record) => record.tenSanPham.includes(value),
      sorter: (a, b) => a.tenSanPham.length - b.tenSanPham.length,
      sortOrder:
        sortedInfo.columnKey === "tenSanPham" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Số lượng",
      dataIndex: "soLuong",
      key: "soLuong",
      filteredValue: filteredInfo.soLuong || null,
      onFilter: (value, record) => record.soLuong.includes(value),
      sorter: (a, b) => a.soLuong.length - b.soLuong.length,
      sortOrder:
        sortedInfo.columnKey === "soLuong" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Giá bán",
      dataIndex: "giaBan",
      key: "giaBan",
      sorter: (a, b) => a.giaBan - b.giaBan,
      sortOrder:
        sortedInfo.columnKey === "giaBan" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Hành động",
      dataIndex: "hanhDong",
      key: "hanhDong",
    },
    {
      title: "Ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
    }
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        onChange={handleChange}
        pagination={paginationOptions} 
        scroll={{ y: 2000 }}
      />
    </>
  );
};

export default TableAllKhuyenMai;
