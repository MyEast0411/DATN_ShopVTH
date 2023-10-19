import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import axios from "axios";
import { format } from "date-fns";

import { Tooltip } from "antd";
import { BsEye } from "react-icons/bs";
import { Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { TableCell } from "@mui/material";
import TableCommon from "../../small-component/common/TableCommon";

export default function TabTrangThai() {
  const url = "http://localhost:8080/hoa_don/";

  const [list, setList] = useState([]);
  const [size, setSize] = useState("large");
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await axios.get(url + "getHoaDons");
    const data = await res.data;
    console.log(res.data);
    setList(
      data.map((item, index) => {
        return {
          ...item,
          id: index + 1,
          nhanVien: item.nhanVien.ten,
        };
      })
    );
  };

  const onChange = async (key) => {
    console.log();
    const res = await axios.get(url + `getHoaDons/${key}`);
    const data = res.data;

    setList(
      data.map((item, index) => {
        return {
          ...item,
          id: index + 1,
          nhanVien: item.nhanVien.ten,
        };
      })
    );
    // console.log(res.data.content);
  };
  const items = [
    `Chờ xác nhận`,
    `Xác Nhận`,
    `Chờ Vận Chuyển`,
    `Vận Chuyển`,
    `Thanh Toán`,
    `Hoàn Thành`,
    `Hủy`,
  ];
  var data = [];
  for (let index = 0; index < items.length; index++) {
    var item = {
      key: index,
      label: items[index],
      // children: <TableCommon dataSource={list} />,
      children: (
        <TableCommon
          pageSize={5}
          pageSizeOptions={[5, 10]}
          rows={list}
          columns={columns}
        />
      ),
    };

    data.push(item);
  }
  data.unshift({
    key: -1,
    label: `Tất cả`,
    // children: <TableCommon dataSource={list} />,
    children: (
      <TableCommon
        rows={list}
        pageSize={5}
        pageSizeOptions={[5, 10]}
        columns={columns}
      />
    ),
  });

  return (
    <Tabs
      size="medium"
      defaultActiveKey="-1"
      items={data}
      onChange={onChange}
    />
  );
}
const columns = [
  {
    field: "id",
    headerName: "STT",
    hideable: true,
    width: 20,
  },
  {
    field: "ma",
    headerName: "Mã",
    hideable: true,
  },
  {
    field: "ten",
    headerName: "Tên Khách Hàng",
    width: 200,

    valueFormatter: ({ value }) => `Lee Lan`,
  },
  {
    field: "nhanVien",
    headerName: "Mã Nhân Viên",
    width: 150,
  },
  {
    field: "loaiHd",

    headerName: "Loại HD",
    width: 100,
    renderCell: (params) =>
      params.row.loaiHd === 1 ? (
        <Tag color="red">Tại quầy</Tag>
      ) : (
        <Tag color="green">Online</Tag>
      ),
  },

  {
    field: "ngayTao",
    headerName: "Ngày Tạo",
    width: 200,

    valueFormatter: (params) =>
      format(new Date(params.value), " hh:mm ,   dd-MM-yyyy"),
  },

  {
    field: "tienGiam",
    headerName: `Tiền Giảm `,
    width: 150,
    renderCell: (params) => (
      <TableCell>
        <span style={{ color: "red" }}>
          {Intl.NumberFormat().format(params.value)}&nbsp;₫
        </span>
      </TableCell>
    ),
  },
  {
    field: "tongTien",
    headerName: "Tổng Tiền",
    width: 150,
    renderCell: (params) => (
      <TableCell>
        <span style={{ color: "red" }}>
          {Intl.NumberFormat().format(params.value)}&nbsp;₫
        </span>
      </TableCell>
    ),
  },
  {
    headerName: "Chức Năng",
    headerClassName: "super-app-theme--header",
    // headerAlign: "center",

    // width: 160,
    renderCell: (params) => (
      <TableCell>
        <div className="flex items-center">
          <Tooltip title="Xem chi tiết" color="green">
            <Link
              to={`/detail-hoa-don/${params.row.ids}`}
              className="button-link group relative"
            >
              <BsEye
                description="Chi tiết"
                className="cursor-pointer text-xl blue-hover mr-4"
                style={{ color: "green" }}
              />
              {/* <div className="text invisible group-hover:visible absolute -top-2 left-16 border border-gray-500 p-2">
              Chỉnh sửa
            </div> */}
            </Link>
          </Tooltip>
        </div>
      </TableCell>
    ),
  },
];
