import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TableCell, Button } from "@mui/material";
import { number } from "prop-types";
import { TbEyeShare } from "react-icons/tb";

const getColorBox = (color) => (
  <div
    style={{
      width: "20px", // Adjust the width as needed
      height: "20px", // Adjust the height as needed
      backgroundColor: "red",
      borderRadius: "5px"
    }}
  ></div>
);

const columns = [
  { field: "id", headerName: "STT", width: 70 },
  {
    field: "hinhAnh",
    headerName: "Hình ảnh",
    width: 100,
    renderCell: (params) => (
      <TableCell>
        <img
          src="https://i.ibb.co/3zcW60M/AIR-JORDAN-1-RETRO-HIGH-UNC.webp"
          alt="Hình ảnh"
          style={{
            maxWidth: "100%",
          }}
        />
      </TableCell>
    ),
  },
  { field: "ten", headerName: "Tên sản phẩm", width: 200 },
  {
    field: "gioiTinh",
    headerName: "Giới tính",
    type: "text",
    width: 90,
  },
  {
    field: "kichThuoc",
    headerName: "Kích thước",
    type: "number",
    width: 90,
  },
  {
    field: "mauSac",
    headerName: "Màu sắc",
    type: "text",
    width: 80,
    renderCell: (params) => <TableCell>{getColorBox(params.value)}</TableCell>,
  },
  {
    field: "trangThai",
    headerName: "Trạng thái",
    description: "Trạng thái",
    sortable: false,
    width: 150,
    renderCell: (params) => (
      <TableCell>
        <div
          style={{
            backgroundColor:
              params.value === "Đang kinh doanh" ? "#79AC78" : "#FF6969",
            color: "white",
            fontSize: "12px",
            textAlign: "center",
            padding: "1px 6px",
            borderRadius: "5px",
          }}
        >
          {params.value}
        </div>
      </TableCell>
    ),
  },
  {
    field: "tinhTrang",
    headerName: "Tình trạng",
    description: "Tình trạng",
    sortable: false,
    width: 100,
    renderCell: (params) => (
      <TableCell>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            fontSize: "20px",
          }}
        >
          <TbEyeShare style={{ marginRight: 4 }} />
          {params.value}
        </div>
      </TableCell>
    ),
  },
];

const rows = [
  {
    id: 1,
    hinhAnh: "Snow",
    ten: "Jonhhh",
    gioiTinh: "Nam",
    kichThuoc: 8,
    mauSac: "Xanh",
    trangThai: "Đang kinh doanh",
  },
  {
    id: 2,
    hinhAnh: "Lannister",
    ten: "Cersei",
    gioiTinh: "Nam",
    kichThuoc: 1,
    mauSac: "Xanh",
    trangThai: "Đang kinh doanh",
  },
  {
    id: 3,
    hinhAnh: "Lannister",
    ten: "Jaime",
    gioiTinh: "Nam",
    kichThuoc: 10,
    mauSac: "Xanh",
    trangThai: "Đang kinh doanh",
  },
  {
    id: 4,
    hinhAnh: "Stark",
    ten: "Arya",
    gioiTinh: "Nam",
    kichThuoc: 10,
    mauSac: "Xanh",
    trangThai: "Đang kinh doanh",
  },
  {
    id: 5,
    hinhAnh: "Targaryen",
    ten: "Daenerys",
    gioiTinh: "Nữ",
    kichThuoc: 5,
    mauSac: "Xanh",
    trangThai: "Đang kinh doanh",
  },
  {
    id: 6,
    hinhAnh: "Melisandre",
    ten: null,
    gioiTinh: "Nam",
    kichThuoc: 10,
    mauSac: "Xanh",
    trangThai: "Đang kinh doanh",
  },
  {
    id: 7,
    hinhAnh: "Clifford",
    ten: "Ferrara",
    gioiTinh: "Nam ",
    kichThuoc: 10,
    mauSac: "Xanh",
    trangThai: "Đang kinh doanh",
  },
  {
    id: 8,
    hinhAnh: "Frances",
    ten: "Rossini",
    gioiTinh: "Nam",
    kichThuoc: 9,
    mauSac: "Xanh",
    trangThai: "Đang kinh doanh",
  },
  {
    id: 9,
    hinhAnh: "Roxie",
    ten: "Harvey",
    gioiTinh: "Nam",
    kichThuoc: 7,
    mauSac: "Xanh",
    trangThai: "Đang kinh doanh",
  },
];

export default function SelectedTable2() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
