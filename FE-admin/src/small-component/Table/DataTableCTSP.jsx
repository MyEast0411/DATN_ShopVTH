import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TableCell, Button } from "@mui/material";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";

const columns = [
  { field: "id", headerName: "STT", width: 200 , align : "center"},
  { field: "ma", headerName: "Mã sản phẩm", width: 200, align : "center" },
  { field: "kichCo", headerName: "Kích cỡ", width: 200 },
  {
    field: "mauSac",
    headerName: "Màu sắc",
    width: 200,
    align : "center",
    renderCell: (params) => (
      <TableCell>
        <div
          style={{
            backgroundColor: params.value,
            color: "white",
            fontSize: "13px",
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
  { field: "giaBan", headerName: "Giá bán", width: 200 , align : "center"},
  {
    field: "soLuongTon",
    headerName: "Số lượng tồn",
    width: 200,
    align : "center"
  },
  {
    field: "trangThai",
    headerName: "Trạng thái",
    description: "Trạng thái",
    sortable: false,
    width: 222,
    renderCell: (params) => (
      <TableCell>
        <div
          style={{
            backgroundColor: params.value === "Đang bán" ? "#79AC78" : "#FF6969",
            color: "white",
            fontSize: "13px",
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
        <div className="flex items-center">
          <Link to={`/update-san-pham/${params.row.ma}`} className="button-link group relative">
          <BsPencilSquare
              description="Chi tiết"
              className="cursor-pointer text-xl blue-hover mr-4" />
              <div className="text invisible group-hover:visible absolute -top-2 left-16 border border-gray-500 p-2">
                Chỉnh sửa
              </div>
          </Link>

          <div className="group relative">
            <MdDeleteOutline
              className="cursor-pointer text-xl delete-hover relative"
              onClick={() => {
                const idToDelete = params.row.ma;
                console.log(idToDelete);
                axios
                  .delete(`http://localhost:8080/deleteSPCT/${idToDelete}`)
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

export default function DataTable() {
  const [rows, setRows] = React.useState([]);
  const { ma } = useParams();

  React.useEffect(() => {
    async function fetchChiTietSanPham() {
      try {
        const url = `http://localhost:8080/findByMa/${ma}`;
        const response = await axios.get(url);
        console.log(response.data);
        const updatedRows = response.data.map((item, index) => ({
          id: index + 1,
          ma: item.ma,
          giaBan : item.giaBan,
          kichCo: item.id_kich_co.ten,
          mauSac: item.id_mau_sac.maMau,
          soLuongTon: item.soLuongTon,
          trangThai: item.trangThai == 1 ? "Đang bán" : "Ngừng bán"
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
      // checkboxSelection
      />
    </div>
  );
}
