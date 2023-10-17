import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TableCell, Button } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { LiaEyeSolid } from "react-icons/lia";

const columns = [
  { field: "id", headerName: "STT", width: 200},
  { field: "ma", headerName: "Mã sản phẩm", width: 330,padding:100 },
  { field: "ten", headerName: "Tên sản phẩm", width: 330 },
  {
    field: "soLuongTon",
    headerName: "Số lượng tồn",
    width: 200,
  },
  {
    field: "trangThai",
    headerName: "Trạng thái",
    // description: "Trạng thái",
    sortable: false,
    width: 250,
    renderCell: (params) => (
      <TableCell>
        <div
          style={{
            backgroundColor: params.value === "Đang bán" ? "#79AC78" : "#FF6969",
            color: "white",
            fontSize: "13px",
            textAlign: "center",
            width: 100,
            height : 23,
            padding: "2px 1px",
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
        <div className="flex items-center">
          <Link to={`/edit-san-pham/${params.row.ma}`} className="button-link group relative">
            <LiaEyeSolid
            description="Chi tiết"
             className="cursor-pointer text-xl blue-hover mr-4" />
            <div className="text invisible group-hover:visible absolute -top-2 left-16 border border-gray-500 p-2">
              Chi tiết
            </div>
          </Link>
          <div className="group relative">
            <MdDeleteOutline
              className="cursor-pointer text-xl delete-hover relative"
              onClick={() => {
                const idToDelete = params.row.ma;
                console.log(idToDelete);
                axios
                  .delete(`http://localhost:8080/delete/${idToDelete}`)
                  .then((response) => {
                    toast.success(`Xóa thành công`, {
                      position: "top-right",
                      autoClose: 2000,
                    });
                  })
                  .catch((error) => {
                    toast.error(`Xóa thất bại`, {
                      position: "top-right",
                      autoClose: 2000,
                    });
                  });
              }}
            />
            <span className="text invisible group-hover:visible absolute -top-2 left-8 border border-gray-500 p-2">Xóa</span>
          </div>
       </div>
      </TableCell>
    ),
  },
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
      />
    </div>
  );
}
