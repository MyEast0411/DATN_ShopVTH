import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Input,
} from "@nextui-org/react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import { DeleteIcon } from "../common/otherComponents/DeleteIcon";
import { MdOutlineDelete } from "react-icons/md";
import { Button } from "@material-tailwind/react";
import axios from "axios";
import { TbInfoTriangle } from "react-icons/tb";
import { toast } from "react-toastify";
import { InputNumber } from "antd";
const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function CartItem({ users, columns, updateSoLuong, setItems, gioHang, setTienHang, tienHang }) {
  const [idToDelete, setIdToDelete] = useState({
    id_hoa_don : "",
    id_san_pham : ""
  });
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = React.useState(false);
  const [hinhAnh, setHinhAnh] = useState([]);
  const [soLuong, setSoLuong] = useState({
    id_san_pham : "",
    so_luong : ""
  });
  

  const getAllHA = async () => {
    await axios.get("http://localhost:8080/getAllHinhAnh").then((response) => {
      setHinhAnh(response.data);
    });
  };
  useEffect(() => {
    getAllHA();
  }, []);

  const handleDelete = (idHoaDon,idSanPham) => {
    setIdToDelete({
      id_hoa_don : idHoaDon,
      id_san_pham : idSanPham
    });

    setDeleteConfirmationOpen(true);
  };


  const cancelDelete = () => {
    setIdToDelete({});
    setDeleteConfirmationOpen(false);
  };

  const confirmDelete = async () => {
    console.log(idToDelete);
    if (idToDelete) {
      await axios.delete(`http://localhost:8080/hoa_don_chi_tiet/deleteHDCT/${idToDelete.id_hoa_don}/${idToDelete.id_san_pham}`)
        .then((response) => {
          toast("🎉 Xóa thành công");
          console.log(gioHang);
          setItems(prevItems => {
            return prevItems.map(item => {
              if (item.key === gioHang) {
                return {
                  ...item,
                  soLuong: response.data
                };
              }
              return item;
            });
          });
          setTienHang(response.data.tongTien);
          cancelDelete();
        })
        .catch((error) => {
          toast("😢 Xóa thất bại");
        });
    cancelDelete();
    }
  };
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      // case "key":
      //   return (
      //     <span style={{ color: "black", fontSize: 20 }}>
      //       1
      //     </span>
      // );
      case "thongtinsanpham":
        return (
          <div className="flex col-span-2 gap-4">
            <div className="w-40">
              <img src={user.id_chi_tiet_san_pham.defaultImg} 
              alt="No-img" style={{ borderRadius: 10,width : "70%" }} />
            </div>
            <div className="col-span-1 text-base mt-2 mb-2">
              <p>
                <span className="font-bold ">Tên sản phẩm : </span> {user.id_chi_tiet_san_pham.id_san_pham.ten}
              </p>
              <p>
                <span className="font-bold ">Size : </span> {user.id_chi_tiet_san_pham.id_kich_co.ten}
              </p>
              <p>
                <span className="font-bold ">Đơn giá : </span>
                <span style={{ color: "red" }}>
                  {" "}
                  {Intl.NumberFormat().format(user.id_chi_tiet_san_pham.giaBan)}&nbsp;₫
                </span>
              </p>
            </div>
          </div>
        );

      case "soLuong":
        console;
        return (
          <div className="flex col-span-3 gap-1">
            <div
              className="col-span-1 flex items-center"
              style={{
                width: 100,
              }}
            >
              <InputNumber
                type="text"
                value={user.soLuong}
                variant="bordered"
                className="text-lg"
                style={{ textAlign: "center", paddingTop: 0, height: "40px", flex: 1 }}
                onChange={async(value) => {
                  console.log(value);
                  if(value < 1) {
                    toast(`Số lượng tối thiểu là 1`);
                    return;
                  }
                  if(value > 10) {
                    toast(`Chỉ được thêm tối đa 10 sản phẩm`);
                    return;
                  }
                  setItems(prevItems => {
                    return prevItems.map(item => {
                      if (item.key === gioHang) {
                        return {
                          ...item,
                          soLuong: value
                        };
                      }
                      return item;
                    });
                  });
                  await axios.post("http://localhost:8080/hoa_don_chi_tiet/addHDCT", {
                    id_hoa_don : user.id_hoa_don.ma,
                    id_san_pham : user.id_chi_tiet_san_pham.id,
                    so_luong : value
                  }).then((response) => {
                    console.log(response.data.tongTien);
                    setTienHang(response.data.tongTien);
                  }).catch((err) => {
                    console.log("err");
                    toast.error(err.response.data);
                  })
                }}
              />
            </div>
        </div>
        );
      case "tongTien":
        return (
          <span style={{ color: "red", fontSize: 20 }}>
            {Intl.NumberFormat().format(user.giaTien)}&nbsp;₫
          </span>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip color="danger" content="Xóa sản phẩm" showArrow>
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <MdOutlineDelete style={{ fontSize: 40, color: "red" }} onClick={() => handleDelete(user.id_hoa_don.id,user.id_chi_tiet_san_pham.id)}/>
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, [users]);

  return (
    <>
    <Table aria-label="Example table with custom cells" className="pb-4">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            // align={column.uid === "actions" ? "center" : "start"}
            align="center"
            style={{ borderBottom: "1px solid black", marginLeft: 30 }}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={users} emptyContent={`No data`}>
        {(item) => (
          <TableRow key={item.id_chi_tiet_san_pham.id} style={{ borderBottom: "1px solid black" }}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>

    <Dialog open={deleteConfirmationOpen} onClose={cancelDelete} fullWidth>
        <DialogTitle>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingBottom: "15px",
            }}
          >
            <TbInfoTriangle
              className="mr-2"
              style={{
                color: "red",
                fontSize: "25px",
              }}
            />
            <span>Xác nhận xóa</span>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc muốn xóa Sản phẩm này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="warning">
            Hủy
          </Button>
          <Button color="primary" onClick={confirmDelete}>
            Vẫn xóa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
