import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import axios from "axios";
import moment from "moment";
import TableCommon from "../../small-component/common/TableCommon";

export default function TabTrangThai({
  dataInput,
  dataSelect,
  ngayBatDau,
  ngayKetThuc,
}) {
  const url = "http://localhost:8080/hoa_don/";

  const [list, setList] = useState([]);
  const [size, setSize] = useState("large");
  useEffect(() => {
    getData();
  }, [dataInput, dataSelect, ngayBatDau, ngayKetThuc]);

  const filterOptions = (data) => {
    return data
      .filter((hd) => {
        if (dataInput === "") return hd;
        if (
          hd.ma.toLowerCase().includes(dataInput.toLowerCase()) ||
          hd.tenKhachHang?.toLowerCase().includes(dataInput.toLowerCase()) ||
          hd.id_nhan_vien?.ten.toLowerCase().includes(dataInput.toLowerCase())
        )
          return hd;
      })
      .filter((hd) => {
        if (dataSelect === -1) return hd;
        if (hd.loaiHd === dataSelect) return hd;
      })
      .filter((hd) => {
        var ndata = Date.parse(new Date(hd.ngayTao));
        if (ngayBatDau === "" || ngayKetThuc === "") return hd;
        if (ngayBatDau <= ndata && ngayKetThuc >= ndata) return hd;
      });
  };

  const getData = async () => {
    const res = await axios.get(url + "getHoaDons");
    const data = await res.data;
    console.log(res.data);
    setList(
      filterOptions(data).map((item, index) => {
        return {
          ...item,
          id: index + 1,
          ids: item.id,
          nhanVien: item?.id_nhan_vien?.ten,
        };
      })
    );
  };

  const onChange = async (key) => {
    console.log(key);
    const res = await axios.get(url + `getHoaDons/${key}`);
    const data = res.data;

    setList(
      filterOptions(data).map((item, index) => {
        return {
          ...item,
          id: index,
          ids: item.id,
          nhanVien: item?.id_nhan_vien?.ten,
          tenKhachHang: item?.id_khach_hang?.ten,
        };
      })
    );
    // console.log(res.data.content);
  };

  // const listTitleTimline = [
  //   {
  //     title: `Chờ xác nhận`,
  //     icon: { GiConfirmed },
  //   },
  //   {
  //     title: `Xác Nhận`,
  //     icon: { GiConfirmed },
  //   },
  //   {
  //     title: `Chờ Vận Chuyển`,
  //     icon: { FaShippingFast },
  //   },
  //   {
  //     title: `Giao Hàng`,
  //     icon: { LuPackageCheck },
  //   },
  //   {
  //     title: `Hoàn Thành`,
  //     icon: { LuPackageCheck },
  //   },
  // ];
  const items = [
    `Chờ xác nhận`,
    `Xác Nhận`,
    `Chờ Vận Chuyển`,
    `Giao Hàng`,
    `Hoàn Thành`,
    `Hủy`,
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
