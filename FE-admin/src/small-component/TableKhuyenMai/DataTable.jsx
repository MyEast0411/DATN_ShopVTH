import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TableCell, Button } from "@mui/material";

const columns = [
  { field: "id", headerName: "STT", width: 20 },
  { field: "ma", headerName: "Mã khuyến mại", width: 130 },
  { field: "ten", headerName: "Tên khuyến mại", width: 130 },
  {
    field: "giaTriGiam",
    headerName: "Giá trị giảm",
    type: "number",
    width: 110,
  },
  {
    field: "startDate",
    headerName: "Ngày bắt đầu",
    description: "Ngày bắt đầu",
    sortable: DataGrid,
    width: 170,
  },
  {
    field: "endDate",
    headerName: "Ngày kết thúc",
    description: "Ngày kết thúc",
    sortable: DataGrid,
    width: 170,
  },
  {
    field: "updateDate",
    headerName: "Ngày cập  nhật",
    description: "Ngày cập nhật",
    sortable: DataGrid,
    width: 170,
  },
  {
    field: "trangThai",
    headerName: "Trạng thái",
    description: "Trạng thái",
    sortable: false,
    width: 104,
    renderCell: (params) => (
      <TableCell>
        <div
          style={{
            backgroundColor: params.value === "Còn hạn" ? "#79AC78" : "#FF6969",
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
    field: "hanhDong",
    headerName: "Hành động",
    width: 200,
    sortable: false,
    renderCell: (params) => (
      <TableCell>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{
            marginRight: 8,
            width: "22px",
            height: "22px",
            fontSize: "12px",
          }}
          onClick={() => {
            console.log(`Edit clicked for row ID: ${params.id}`);
          }}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="error"
          size="small"
          style={{ width: "22px", height: "22px", fontSize: "12px" }}
          onClick={() => {
            console.log(`Delete clicked for row ID: ${params.id}`);
          }}
        >
          Delete
        </Button>
      </TableCell>
    ),
  },
];

const rows = [
  {
    id: 1,
    ma: "Snow",
    ten: "Jon",
    giaTriGiam: 35,
    startDate: "30/06/2003 12:00:00",
    endDate: "29/07/2003 12:00:00",
    updateDate: "29/06/2003 12:00:00",
    trangThai: "Còn hạn",
    hanhDong: "action",
  },
  {
    id: 2,
    ma: "Lannister",
    ten: "Cersei",
    giaTriGiam: 42,
    startDate: "29/06/2003 12:00:00",
    endDate: "29/07/2003 12:00:00",
    updateDate: "29/06/2003 12:00:00",
    trangThai: "Hết hạn",
    hanhDong: "action",
  },
  {
    id: 3,
    ma: "Lannister",
    ten: "Jaime",
    giaTriGiam: 45,
    startDate: "28/06/2003 12:00:00",
    endDate: "29/07/2003 12:00:00",
    updateDate: "29/06/2003 12:00:00",
    trangThai: "Hết hạn",
    hanhDong: "action",
  },
  {
    id: 4,
    ma: "Stark",
    ten: "Arya",
    giaTriGiam: 16,
    startDate: "29/06/2003 12:00:00",
    endDate: "29/07/2003 12:00:00",
    updateDate: "29/06/2003 12:00:00",
    trangThai: "Hết hạn",
    hanhDong: "action",
  },
  {
    id: 5,
    ma: "Targaryen",
    ten: "Daenerys",
    giaTriGiam: null,
    startDate: "29/06/2003 12:00:00",
    endDate: "29/07/2003 12:00:00",
    updateDate: "29/06/2003 12:00:00",
    trangThai: "Hết hạn",
    hanhDong: "action",
  },
  {
    id: 6,
    ma: "Melisandre",
    ten: null,
    giaTriGiam: 150,
    startDate: "27/06/2003 12:00:00",
    endDate: "29/07/2003 12:00:00",
    updateDate: "29/06/2003 12:00:00",
    trangThai: "Hết hạn",
    hanhDong: "action",
  },
  {
    id: 7,
    ma: "Clifford",
    ten: "Ferrara",
    giaTriGiam: 44,
    startDate: "29/06/2003 12:00:00",
    endDate: "29/07/2003 12:00:00",
    updateDate: "29/06/2003 12:00:00",
    trangThai: "Hết hạn",
    hanhDong: "action",
  },
  {
    id: 8,
    ma: "Frances",
    ten: "Rossini",
    giaTriGiam: 36,
    startDate: "29/06/2003 12:00:00",
    endDate: "29/07/2003 12:00:00",
    updateDate: "29/06/2003 12:00:00",
    trangThai: "Còn hạn",
    hanhDong: "action",
  },
  {
    id: 9,
    ma: "Roxie",
    ten: "Harvey",
    giaTriGiam: 65,
    startDate: "29/06/2003 12:00:00",
    endDate: "29/07/2003 12:00:00",
    updateDate: "29/06/2003 12:00:00",
    trangThai: "Hết hạn",
    hanhDong: "action",
  },
];

export default function DataTable() {
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
        // checkboxSelection
      />
    </div>
  );
}
