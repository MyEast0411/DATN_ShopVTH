import { useEffect, useState } from "react";
import axios from "axios";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TableCell } from "@mui/material";
import { fetchKhuyenMai } from "../../res/fetchKhuyenMai";
import { toast } from "react-toastify";
import ModalUpdateKhuyenMai from "../../small-component/ModalUpdateKhuyenMai/ModalUpdateKhuyenMai";

//icon
import { MdDeleteOutline } from "react-icons/md";

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
  { field: "i", headerName: "STT", width: 80 },
  { field: "ma", headerName: "Mã khuyến mại", width: 120 },
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
    width: 150,
    valueFormatter: (params) => formatDate(params.value),
  },
  {
    field: "endDate",
    headerName: "Ngày kết thúc",
    description: "Ngày kết thúc",
    sortable: DataGrid,
    width: 150,
    valueFormatter: (params) => formatDate(params.value),
  },
  {
    field: "updateDate",
    headerName: "Ngày cập  nhật",
    description: "Ngày cập nhật",
    sortable: DataGrid,
    width: 150,
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
      <TableCell
        style={{
          display: "flex",
        }}
      >
        <ModalUpdateKhuyenMai idKM={params.id} />
        <MdDeleteOutline
          className="cursor-pointer text-xl delete-hover"
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
              })
              .catch((error) => {
                console.error(
                  `Error deleting record for ID: ${idToDelete}`,
                  error
                );
              });
          }}
        />
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
          id: item.id,
          i: index + 1,
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
  }, [rows]);

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
