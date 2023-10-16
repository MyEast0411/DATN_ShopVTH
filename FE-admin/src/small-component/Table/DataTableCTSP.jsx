import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TableCell, Button } from "@mui/material";
import axios from "axios";
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";

const columns = [
  { field: "id", headerName: "STT", width: 200 },
  { field: "ma", headerName: "Mã sản phẩm", width: 200 },
  { field: "kichCo", headerName: "Kích cỡ", width: 200 },
  { field: "chatLieu", headerName: "Chất liệu", width: 200 },
  { field: "giaBan", headerName: "Giá bán", width: 200 },
  {
    field: "soLuongTon",
    headerName: "Số lượng tồn",
    width: 200,
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
        <Link to={`/update-san-pham/${params.row.ma}`} className="button-link">
        <Button
        variant="contained"
        color="primary"
        size="small"
        style={{
          width: "25px",
          height: "25px",
          fontSize: "12px",
        }}
        >
        <EditIcon />
        </Button>
        </Link>
        <Button
          variant="contained"
          color="error"
          size="small"
          style={{ width: "25px", height: "25px", fontSize: "12px" }}
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
        >
          <DeleteIcon />
        </Button>
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
          chatLieu: item.id_chat_lieu.ten,
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
