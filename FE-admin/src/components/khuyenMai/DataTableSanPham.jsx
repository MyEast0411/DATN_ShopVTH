import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TableCell, Button } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { LiaEyeSolid } from "react-icons/lia";

const columns = [
  { field: "id", headerName: "STT", width: 100,align:"center"},
  { field: "ma", headerName: "Mã sản phẩm", width: 200,padding:100,align:"center" },
  { field: "ten", headerName: "Tên sản phẩm", width: 300 },
  {
    field: "soLuongTon",
    headerName: "Số lượng tồn",
    width: 120,
  }
];
const url = "http://localhost:8080/chi-tiet-san-pham";

export default function DataTable() {
  const [rows, setRows] = React.useState([]);
  React.useEffect(() => {
    async function fetchChiTietSanPham() {
      try {
        const response = await axios.get(url);
        const updatedRows = response.data.map((item, index) => ({
          id: index + 1,
          ma: item.ma,
          ten: item.ten_san_pham,
          soLuongTon: item.so_luong_ton,
          trangThai: item.trang_thai == 1 ? "Đang bán" : "Ngừng bán"
        }));
        setRows(updatedRows);
      } catch (error) {
        console.error("Lỗi khi gọi API: ", error);
      }
    } 
    fetchChiTietSanPham();
  }, [rows]);
  return (
    <div className="text-center" style={{ height: 371, width: "100%" }}>
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
