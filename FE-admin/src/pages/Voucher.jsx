import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TableCell, Button, autocompleteClasses } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const columns = [
  { field: "ma", headerName: "Mã voucher" },
  { field: "ten", headerName: "Tên voucher", width: 150 },
  { field: "code", headerName: "Code" },
  { field: "ngayBatDau", headerName: "Ngày bắt đầu", width: 250 }, //
  { field: "ngayKetThuc", headerName: "Ngày Kết Thúc", width: 250 },
  { field: "soLuong", headerName: "Số Lượng" },
  { field: "nguoiTao", headerName: "Người Tạo" },
  {
    field: "id_hoa_don",
    headerName: "Mã hóa đơn",
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
//  renderCell: (params) => (
//       <TableCell>
//         <div
//           style={{
//             backgroundColor:
//               params.value === "Đang hoạt động" ? "#79AC78" : "#FF6969",
//             color: "white",
//             fontSize: "12px",
//             textAlign: "center",
//             padding: "1px 6px",
//             borderRadius: "5px",
//           }}
//         >
//           {params.value}
//         </div>
//       </TableCell>
//     ),
export default function SelectedTable1() {
  const [list, setList] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await axios.get("http://localhost:8080/voucher/getVouchers");
    console.log(data.data);
    setList(data.data);
  };
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={list}
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
