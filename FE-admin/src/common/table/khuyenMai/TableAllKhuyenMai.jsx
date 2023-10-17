import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { DateTime } from "luxon";
import { Settings } from "luxon";

import {
  TableCell,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { toast } from "react-toastify";
import { PiPencilSimpleBold } from "react-icons/pi";
import { MdDeleteOutline } from "react-icons/md";
import "./TableAllKhuyenMai.css";
import { getAllKhuyenMai } from "../../../api/khuyenMai/KhuyenMaiApi";

Settings.defaultZoneName = "Asia/Ho_Chi_Minh";

const formateDateVietNam = (dateTimeStr) => {
  const vietNamTime = DateTime.fromISO(dateTimeStr, { zone: "utc" });
  return vietNamTime.toFormat("dd/MM/yyyy HH:mm");
};

const columns = [
  { field: "i", headerName: "STT", width: 80, align: "center" },
  { field: "ma", headerName: "Mã khuyến mại", width: 150, align: "center" },
  { field: "ten", headerName: "Tên khuyến mại", width: 200, align: "center" },
  {
    field: "giaTriGiam",
    headerName: "Giá trị giảm (%)",
    type: "number",
    width: 150,
    align: "center",
    sortComparator: (v1, v2) => {
      const value1 = parseFloat(v1.replace("%", ""));
      const value2 = parseFloat(v2.replace("%", ""));

      return value1 - value2;
    },
  },
  {
    field: "startDate",
    headerName: "Ngày bắt đầu",
    description: "Ngày bắt đầu",
    sortable: DataGrid,
    width: 200,
    valueFormatter: (params) => formateDateVietNam(params.value),
    align: "center",
  },
  {
    field: "endDate",
    headerName: "Ngày kết thúc",
    description: "Ngày kết thúc",
    sortable: DataGrid,
    width: 200,
    valueFormatter: (params) => formateDateVietNam(params.value),
    align: "center",
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
    width: 130,
    sortable: false,
    align: "center",
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
    getAllKhuyenMai().then((data) => {
      const processedData = data.map((item, index) => {
        const now = DateTime.now();
        const endDate = DateTime.fromISO(item.ngayKetThuc);
        const trangThai = now < endDate ? "Còn hạn" : "Hết hạn";

        return {
          id: item.id,
          i: index + 1,
          ma: item.ma,
          ten: item.ten,
          giaTriGiam: item.giaTriPhanTram + "%",
          startDate: item.ngayBatDau,
          endDate: item.ngayKetThuc,
          trangThai: trangThai,
        };
      });

      setRows(processedData);
    });
  }, [rows]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        style={{ width: "100%", height: "100%" }}
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
                  <Link
                    to={`/khuyen-mai/update/${params.id}`}
                    className="button-link group relative  blue-hover"
                  >
                    <PiPencilSimpleBold className="cursor-pointer text-xl ml-2 mr-3" />
                    <div
                      className="z-90 invisible group-hover:visible absolute top-4 right-5 border border-gray-500 p-2"
                      style={{
                        fontSize: "10px",
                        padding: 2,
                        background: "white",
                      }}
                    >
                      Cập nhật
                    </div>
                  </Link>
                  <div className="button-link group relative delete-hover ">
                    <MdDeleteOutline
                      className="cursor-pointer text-xl "
                      onClick={() => handleDelete(params.id)}
                    />
                    <div
                      className="z-90 invisible group-hover:visible absolute top-4 right-5 border border-gray-500 p-2"
                      style={{
                        fontSize: "11px",
                        padding: 2,
                        background: "white",
                      }}
                    >
                      Xóa
                    </div>
                  </div>
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
