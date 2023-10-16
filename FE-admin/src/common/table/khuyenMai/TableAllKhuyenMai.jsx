import { useEffect, useState } from "react";
import axios from "axios";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  TableCell,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { fetchKhuyenMai } from "../../../res/fetchKhuyenMai";
import { toast } from "react-toastify";
import { PiPencilSimpleBold } from "react-icons/pi";
//icon
import { MdDeleteOutline } from "react-icons/md";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };

  // Adjust for the user's local time zone
  const formatter = new Intl.DateTimeFormat("en-GB", {
    ...options,
  });
  return formatter.format(date);
};

const columns = [
  { field: "i", headerName: "STT", width: 80, align: "left" },
  { field: "ma", headerName: "Mã khuyến mại", width: 120, align: "left" },
  { field: "ten", headerName: "Tên khuyến mại", minWidth: 180, align: "left" },
  {
    field: "giaTriGiam",
    headerName: "Giá trị giảm",
    type: "number",
    width: 100,
    align: "center",
  },
  {
    field: "startDate",
    headerName: "Ngày bắt đầu",
    description: "Ngày bắt đầu",
    sortable: DataGrid,
    width: 160,
    valueFormatter: (params) => formatDate(params.value),
    align: "left",
  },
  {
    field: "endDate",
    headerName: "Ngày kết thúc",
    description: "Ngày kết thúc",
    sortable: DataGrid,
    width: 160,
    valueFormatter: (params) => formatDate(params.value),
    align: "left",
  },
  {
    field: "updateDate",
    headerName: "Ngày cập  nhật",
    description: "Ngày cập nhật",
    sortable: DataGrid,
    width: 160,
    valueFormatter: (params) => formatDate(params.value),
    align: "left",
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
    align: "center",
  },

  {
    field: "hanhDong",
    headerName: "Hành động",
    width: 100,
    sortable: false,
    align: "center",
    renderCell: (params) => (
      <TableCell
        style={{
          display: "flex",
        }}
      >
        <PiPencilSimpleBold className="cursor-pointer text-xl ml-2 mr-3 blue-hover" />

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
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  const handleDelete = (idToDelete) => {
    setIdToDelete(idToDelete);
    setDeleteConfirmationOpen(true);
  };

  const confirmDelete = () => {
    axios
      .delete(`http://localhost:8080/khuyen-mai/delete/${idToDelete}`)
      .then((response) => {
        console.log(`Delete successful for row ID: ${idToDelete}`);
        toast.success("Xóa thành công", {
          position: "top-right",
          autoClose: 2000,
        });
      })
      .catch((error) => {
        console.error(`Error deleting record for ID: ${idToDelete}`, error);
      })
      .finally(() => {
        setDeleteConfirmationOpen(false);
      });
  };

  const cancelDelete = () => {
    setDeleteConfirmationOpen(false);
  };

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
        columns={columns.map((column) => {
          if (column.field === "hanhDong") {
            return {
              ...column,
              renderCell: (params) => (
                <TableCell
                  style={{
                    display: "flex",
                  }}
                >
                  <PiPencilSimpleBold className="cursor-pointer text-xl ml-2 mr-3 blue-hover" />
                  <MdDeleteOutline
                    className="cursor-pointer text-xl delete-hover"
                    onClick={() => handleDelete(params.id)}
                  />
                </TableCell>
              ),
            };
          }
          return column;
        })}
        autoWidth
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
      <Dialog open={deleteConfirmationOpen} onClose={cancelDelete}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc muốn xóa khuyến mại này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Hủy
          </Button>
          <Button onClick={confirmDelete} color="primary">
            Vẫn xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
