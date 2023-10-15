import { useEffect, useState } from "react";
import axios from "axios";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TableCell, Button } from "@mui/material";
import { fetchKhuyenMai } from "../../res/fetchKhuyenMai";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";




const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const columns = [
  { field: "id", headerName: "STT", width: 80 },
  { field: "ma", headerName: "Mã khuyến mại", width: 70 },
  { field: "ten", headerName: "Tên khuyến mại", minWidth: 180 },
  {
    field: "giaTriGiam",
    headerName: "Giá trị giảm",
    type: "number",
    width: 100,
  },
  {
    field: "startDate",
    headerName: "Ngày bắt đầu",
    description: "Ngày bắt đầu",
    sortable: DataGrid,
    width: 200,
    valueFormatter: (params) => formatDate(params.value),
  },
  {
    field: "endDate",
    headerName: "Ngày kết thúc",
    description: "Ngày kết thúc",
    sortable: DataGrid,
    width: 170,
    valueFormatter: (params) => formatDate(params.value),
  },
  {
    field: "updateDate",
    headerName: "Ngày cập  nhật",
    description: "Ngày cập nhật",
    sortable: DataGrid,
    width: 170,
    valueFormatter: (params) => formatDate(params.value),
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

            const idToDelete = params.id;
            axios
              .delete(`http://localhost:8080/khuyen-mai/delete/${idToDelete}`)
              .then((response) => {
                console.log(`Delete successful for row ID: ${idToDelete}`);
                toast.success(`Xóa thành công`, {
                  position: "top-right",
                  autoClose: 2000,
                });
                navigate("/khuyen-mai");
              })
              .catch((error) => {
                console.error(
                  `Error deleting record for ID: ${idToDelete}`,
                  error
                );
              });
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
  var navigate = useNavigate();
  useEffect(() => {
    fetchKhuyenMai().then((data) => {
      const processedData = data.map((item, index) => {
        return {
          // uuid: item.id,
          id: item.id,
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
        autoWidth
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
