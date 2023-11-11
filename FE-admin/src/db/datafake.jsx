import axios from "axios";
import GioHang from "../components/GioHang";
import { useState } from "react";
import { Result } from "antd";

const columns = [
  { name: "STT", uid: "key" },
  { name: "THÔNG TIN SẢN PHẨM", uid: "thongtinsanpham" },
  { name: "SỐ LƯỢNG", uid: "soLuong" },
  { name: "TỔNG TIỀN", uid: "tongTien" },
  { name: "THAO TÁC", uid: "actions" },
];

// const users = [
//   {
//     id: 1,
//     data: [
//       {
//         key: 1,
//         name: "Tony Reichert",
//         size: 40,
//         soLuong: 10,
//         donGia: 300,
//         img: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
//       },
//       {
//         key: 2,
//         name: "GioDan Pho One",
//         size: 41,
//         soLuong: 6,
//         donGia: 2300,
//         img: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
//       },
//       {
//         key: 3,
//         name: "GioDan Panda",
//         size: 42,
//         soLuong: 5,
//         donGia: 4000,
//         img: "https://i.pravatar.cc/150?u=a04258114e29026702d",
//       },
//     ],
//   },

//   {
//     id: 2,
//     data: [
//       {
//         key: 1,
//         name: "Tony Reichert",
//         size: 40,
//         soLuong: 10,
//         donGia: 300,
//         img: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
//       },
//       {
//         key: 2,
//         name: "GioDan Pho One",
//         size: 41,
//         soLuong: 6,
//         donGia: 2300,
//         img: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
//       },
//       {
//         key: 3,
//         name: "GioDan Panda",
//         size: 42,
//         soLuong: 5,
//         donGia: 4000,
//         img: "https://i.pravatar.cc/150?u=a04258114e29026702d",
//       },
//       {
//         key: 4,
//         name: "GioDan Tony",
//         size: 43,
//         soLuong: 1,
//         donGia: 6000,
//         img: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
//       },
//       {
//         key: 5,
//         name: "GioDan Pờ Lo",
//         size: 44,
//         soLuong: 2,
//         donGia: 6590,
//         img: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
//       },
//     ],
//   },

//   {
//     id: 3,
//     data: [
//       {
//         key: 4,
//         name: "GioDan Tony",
//         size: 43,
//         soLuong: 1,
//         donGia: 6000,
//         img: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
//       },
//       {
//         key: 5,
//         name: "GioDan Pờ Lo",
//         size: 44,
//         soLuong: 2,
//         donGia: 6590,
//         img: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
//       },
//     ],
//   },

//   {
//     id: 4,
//     data: [
//       {
//         key: 1,
//         name: "Tony Reichert",
//         size: 40,
//         soLuong: 10,
//         donGia: 300,
//         img: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
//       },

//       {
//         key: 4,
//         name: "GioDan Tony",
//         size: 43,
//         soLuong: 1,
//         donGia: 6000,
//         img: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
//       },
//       {
//         key: 5,
//         name: "GioDan Pờ Lo",
//         size: 44,
//         soLuong: 2,
//         donGia: 6590,
//         img: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
//       },
//     ],
//   },
// ];

export const fakeData = async () => {
  var data = [];
  await axios
    .get("https://65484e06dd8ebcd4ab22b45f.mockapi.io/test/data")
    .then((res) => {
      data = res.data;
    });

  return JSON.stringify(data);
};
