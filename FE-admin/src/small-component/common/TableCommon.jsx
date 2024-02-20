import React, { useCallback, useMemo, useState } from "react";
// import { format } from "date-fns";
import moment from "moment";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Tooltip,
} from "@nextui-org/react";

import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { EyeIcon } from "../../common/otherComponents/EyeIcon";
import { Modal, Tag } from "antd";
import { DeleteIcon } from "../../common/otherComponents/DeleteIcon";
import axios from "axios";
import { toast } from "react-toastify";

// import { DeleteIcon } from "../../otherComponents/DeleteIcon";

// const items = [
//   `Chờ xác nhận`,
//   `Xác Nhận`,
//   `Chờ Vận Chuyển`,
//   `Vận Chuyển`,
//   `Thanh Toán`,
//   `Hoàn Thành`,
//   `Hủy`,
// ];
const statusOptions = [
  // { name: "Chờ xác nhận", uid: "Chờ xác nhận" },
  // { name: "Xác Nhận", uid: "Xác Nhận" },
  // { name: "Chờ Vận Chuyển", uid: "Chờ Vận Chuyển" },
  // { name: "Vận Chuyển", uid: "Vận Chuyển" },
  // { name: "Vận Chuyển", uid: "Vận Chuyển" },
  // { name: "Thanh Toán", uid: "Thanh Toán" },
  // { name: "Hoàn Thành", uid: "Hoàn Thành" },
  // { name: "Hủy", uid: "Hủy" },
  { name: "Online", uid: "Online" },
];
const statusColorMap = {
  active: "success",
  paused: "danger",
  incoming: "warning",
  notStarted: "primary",
};
statusColorMap["Sắp diễn ra"] = "warning";
statusColorMap["Online"] = "success";
statusColorMap["Đã kết thúc"] = "danger";
statusColorMap["Chưa diễn ra"] = "primary";
statusColorMap["Đã dừng"] = "danger";

export default function TableCommon({ data }) {
  const [page, setPage] = useState(1);

  // const {data, isLoading} = useSWR(`https://swapi.py4e.com/api/people?page=${page}`, fetcher, {
  //   keepPreviousData: true,
  // });

  const rowsPerPage = 5;

  // const pages = useMemo(() => {
  //   return data?.length ? Math.ceil(data.length / rowsPerPage) : 0;
  // }, [data?.length, rowsPerPage]);

  // const [page, setPage] = React.useState(1);
  // const rowsPerPage = 4;

  const pages = Math.ceil(data.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data]);

  // const loadingState = isLoading || data?.results.length === 0 ? "loading" : "idle";

  const handleDelete = (id) => {
    Modal.confirm({
      title: `bạn có muốn xóa  voucher không ?`,
      okText: "Yes",
      okType: "danger",
      onOk: async () => {
        axios
          .delete(`http://localhost:8080/hoa_don/delete/${id}`)
          .then((response) => {
            toast.success(`Xóa thành công`, {
              position: "top-right",
              autoClose: 2000,
            });
          })
          .catch((e) =>
            toast.error(`Xóa  thất bại`, {
              position: "top-right",
              autoClose: 2000,
            })
          );
      },
    });
  };

  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "tenKhachHang":
        return <p>{cellValue == undefined ? "Khách lẻ" : cellValue}</p>;
      case "loaiHd":
        return cellValue == 1 ? (
          <Tag color="red">Tại quầy</Tag>
        ) : (
          <Tag color="green">Online</Tag>
        );
      case "ngayTao":
        return (
          <p>
            {moment(new Date(cellValue)).format("  HH:mm:ss   , DD-MM-YYYY")}
          </p>
        );

      case "trangThai":
        return <GetTrangThai tinhTrang={cellValue} />;

      case "tienGiam":
        return (
          <span style={{ color: "red" }}>
            {Intl.NumberFormat().format(cellValue)}&nbsp;₫
          </span>
        );
      case "tongTien":
        return (
          <span style={{ color: "red" }}>
            {Intl.NumberFormat().format(cellValue)}&nbsp;₫
          </span>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-4">
            <Tooltip content="Xem chi  tiết" showArrow={true}>
              <Link
                to={`/detail-hoa-don/${user.ids}`}
                // style={{ display: "block" }}
                className="button-link group relative"
              >
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon />
                </span>
              </Link>
            </Tooltip>
            <Tooltip color="danger" content="Xóa hóa đơn" showArrow={true}>
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon onClick={() => handleDelete(user.ids)} />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table
      style={{ height: "382px" }}
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={
        pages > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(newPage) => setPage(newPage)}
            />
          </div>
        ) : null
      }
      // bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={items} emptyContent={"Không tìm thấy hóa đơn 😞"}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

const columns = [
  { uid: "id", name: "STT" },
  { uid: "ma", name: "Mã" },
  { uid: "tenKhachHang", name: "Tên Khách Hàng" },
  { uid: "nhanVien", name: "Tên Nhân Viên" },
  { uid: "loaiHd", name: "Loại HD" },
  { uid: "ngayTao", name: "Ngày Tạo" },
  { uid: "tienGiam", name: "Tiền Giảm " },
  { uid: "trangThai", name: "Trạng Thái" },
  { uid: "tongTien", name: "Tổng Tiền" },
  { uid: "actions", name: "Thao tác" },
];

const GetTrangThai = ({ tinhTrang }) => {
  if (tinhTrang == 0)
    return (
      <Tag color="#8e008e">
        <span className=" text-sm ">Chờ Xác Nhận</span>
      </Tag>
    );
  if (tinhTrang == 1)
    return (
      <Tag color="#ff8e00">
        {" "}
        <span className=" text-sm ">Xác Nhận</span>
      </Tag>
    );
  if (tinhTrang == 2)
    return (
      <Tag color="#C8D52D">
        {" "}
        <span className=" text-sm ">Chờ Vận Chuyển</span>
      </Tag>
    );
  if (tinhTrang == 3)
    return (
      <Tag color="#C8D52D">
        {" "}
        <span className=" text-sm ">Giao Hàng</span>
      </Tag>
    );
  if (tinhTrang == 4)
    return (
      <Tag color="#400098">
        {" "}
        <span className=" text-sm ">Hoàn Thành</span>
      </Tag>
    );
  if (tinhTrang == 5)
    return (
      <Tag color="#ff0000">
        {" "}
        <span className=" text-sm ">Hủy</span>
      </Tag>
    );
};
