import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TableCell, Button } from "@mui/material";

const columns = [
  { field: "id", headerName: "STT", width: 70 },
  { field: "hinhAnh", headerName: "Hình ảnh", width: 200 },
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
    description: "Kích thước",
    sortable: false,
    width: 160,
  },

  {
    field: "mauSac",
    headerName: "Màu sắc",
    description: "Màu sắc",
    sortable: false,
    width: 160,
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
    width: 160,
  },
];

const rows = [
  { id: 1, hinhAnh: "Snow", ten: "Jon", gioiTinh: "Nam" },
  { id: 2, hinhAnh: "Lannister", ten: "Cersei", gioiTinh: "Nam" },
  { id: 3, hinhAnh: "Lannister", ten: "Jaime", gioiTinh: "Nam" },
  { id: 4, hinhAnh: "Stark", ten: "Arya", gioiTinh: "Nam" },
  { id: 5, hinhAnh: "Targaryen", ten: "Daenerys", gioiTinh: "Nữ" },
  { id: 6, hinhAnh: "Melisandre", ten: null, gioiTinh: "Nam" },
  { id: 7, hinhAnh: "Clifford", ten: "Ferrara", gioiTinh: "Nam " },
  { id: 8, hinhAnh: "Frances", ten: "Rossini", gioiTinh: "Nam" },
  { id: 9, hinhAnh: "Roxie", ten: "Harvey", gioiTinh: "Nam" },
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
