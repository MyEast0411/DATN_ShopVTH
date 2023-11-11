import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TableCell, Button } from "@mui/material";

const columns = [
  { field: "id", headerName: "STT", width: 70 },
  { field: "ma", headerName: "Mã sản phẩm", width: 230 },
  { field: "ten", headerName: "Tên sản phẩm", width: 230 },
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
              params.value === "Đang hoạt động" ? "#79AC78" : "#FF6969",
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
];

const rows = [
  { id: 1, ma: "Snow", ten: "Jordan", trangThai: "Đang hoạt động" },
  { id: 2, ma: "Lannister", ten: "Jordan", trangThai: "Đang hoạt động" },
  { id: 3, ma: "Lannister", ten: "Jordan", trangThai: "Đang hoạt động" },
  { id: 4, ma: "Stark", ten: "Jordan", trangThai: "Đang hoạt động" },
  { id: 5, ma: "Targaryen", ten: "Jordan", trangThai: "Đang hoạt động" },
  { id: 6, ma: "Melisandre", ten: "Jordan", trangThai: "Đang hoạt động" },
  { id: 7, ma: "Clifford", ten: "Jordan", trangThai: "Đang hoạt động" },
  { id: 8, ma: "Frances", ten: "Jordan", trangThai: "Đang hoạt động" },
  { id: 9, ma: "Roxie", ten: "Jordan", trangThai: "Đang hoạt động" },
];

export default function SelectedTable1() {
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
