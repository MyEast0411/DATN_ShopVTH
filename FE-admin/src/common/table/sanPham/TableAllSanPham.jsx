import React, { useState } from "react";
import { Button, Space, Table } from "antd";

const data = [
  {
    key: "1",
    STT: 1,
    maKhuyenMai: "KM1",
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
    STT: 4,
    maKhuyenMai: "KM0004",
    tenKhuyenMai: "Khuyến mại tháng 1",
    giaTriPhanTram: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "6",
    STT: 4,
    maKhuyenMai: "KM0004",
    tenKhuyenMai: "Khuyến mại tháng 1",
    giaTriPhanTram: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "7",
    STT: 4,
    maKhuyenMai: "KM0004",
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
      title: "Mã khuyến mại",
      dataIndex: "maKhuyenMai",
      key: "maKhuyenMai",
      filteredValue: filteredInfo.maKhuyenMai || null,
      onFilter: (value, record) => record.maKhuyenMai.includes(value),
      sorter: (a, b) => a.maKhuyenMai.length - b.maKhuyenMai.length,
      sortOrder:
        sortedInfo.columnKey === "maKhuyenMai" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Tên khuyến mại",
      dataIndex: "tenKhuyenMai",
      key: "tenKhuyenMai",
      filteredValue: filteredInfo.tenKhuyenMai || null,
      onFilter: (value, record) => record.tenKhuyenMai.includes(value),
      sorter: (a, b) => a.tenKhuyenMai.length - b.tenKhuyenMai.length,
      sortOrder:
        sortedInfo.columnKey === "tenKhuyenMai" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Giá trị giảm (%)",
      dataIndex: "giaTriPhanTram",
      key: "giaTriPhanTram",
      sorter: (a, b) => a.giaTriPhanTram - b.giaTriPhanTram,
      sortOrder:
        sortedInfo.columnKey === "giaTriPhanTram" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "ngayBatDau",
      key: "ngayBatDau",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "ngayKetThuc",
      key: "ngayKetThuc",
    },

    {
      title: "Ngày cập nhật",
      dataIndex: "ngayCapNhat",
      key: "ngayCapNhat",
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
    },
    ,
    {
      title: "Hành động",
      dataIndex: "hanhDong",
      key: "hanhDong",
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        onChange={handleChange}
        pagination={paginationOptions} 
        scroll={{ y: 500 }}
      />
    </>
  );
};

export default TableAllKhuyenMai;
