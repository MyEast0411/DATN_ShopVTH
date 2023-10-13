import { useEffect, useState } from "react";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TableCell, Button } from "@mui/material";
import { fetchKhuyenMai } from "../../res/fetchKhuyenMai";

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

export default function DataTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchKhuyenMai().then((data) => {
      const processedData = data.map((item, index) => {
        return {
          id: index + 1,
          ma: item.ma,
          ten: item.ten,
          giaTriGiam: item.giaTriPhanTram + "%",
          startDate: item.ngayBatDau,
          endDate: item.ngayKetThuc,
          updateDate: item.ngaySua,
          trangThai: item.trangThai === 0 ? "Còn hạn" : "Hết hạn",
        };
      });

      setRows(processedData);
    });
  }, []);


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
