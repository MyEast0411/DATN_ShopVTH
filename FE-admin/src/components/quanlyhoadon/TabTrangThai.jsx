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
          ids : item.id,
          nhanVien: item?.id_nhan_vien
          ?.ten,
        };
      })
    );

  };

  const onChange = async (key) => {
    console.log(key);
    const res = await axios.get(url + `getHoaDons/${key}`);
    const data = res.data;

    setList(
      data.map((item, index) => {
        return {
          ...item,
          id: index,
          ids : item.id,
          nhanVien: item?.id_nhan_vien
          ?.ten,
        };
      })
    );
    // console.log(res.data.content);
  };
  const items = [
    `Chờ xác nhận`,
    `Xác Nhận`,
    `Chờ Thanh Toán`,
    `Chờ Vận Chuyển`,
    `Giao Hàng`,
    `Hoàn Thành`,
    `Hủy`,
    `Chờ Thanh Toán`,
  ];
  var data = [];
  for (let index = 0; index < items.length; index++) {
    var item = {
      key: index,
      label: items[index],
      // children: <TableCommon dataSource={list} />,
      children: <TableCommon data={list} />,
    };

    data.push(item);
  }
  data.unshift({
    key: -1,
    label: `Tất cả`,
    // children: <TableCommon dataSource={list} />,
    children: <TableCommon data={list} />,
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
