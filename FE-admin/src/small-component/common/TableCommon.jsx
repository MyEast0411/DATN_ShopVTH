import React, { useCallback, useMemo, useState } from "react";
import { format } from "date-fns";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";

import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { Tooltip, Tag } from "antd";

// const items = [
//   `Chờ xác nhận`,
//   `Xác Nhận`,
//   `Chờ Vận Chuyển`,
//   `Vận Chuyển`,
//   `Thanh Toán`,
//   `Hoàn Thành`,
//   `Hủy`,
// ];

export default function TableCommon({ data }) {
  const [page, setPage] = useState(1);
  const rowsPerPage = 6;

  const pages = Math.ceil(data.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data]);

  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "ten":
        return <p>Lee Lan</p>;
      case "loaiHd":
        return cellValue == 1 ? (
          <Tag color="red">Tại quầy</Tag>
        ) : (
          <Tag color="green">Online</Tag>
        );
      case "ngayTao":
        return <p> {format(new Date(cellValue), " hh:mm ,   dd-MM-yyyy")}</p>;
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
          <div className="flex justify-center">
            <Tooltip title="Xem chi tiết" color="green">
              <Link
                to={`/detail-hoa-don/${user.ids}`}
                className="button-link group relative"
              >
                <BsEye
                  description="Chi tiết"
                  className="cursor-pointer text-xl blue-hover mr-4"
                  style={{ color: "green" }}
                />
                {/* <div className="text invisible group-hover:visible absolute -top-2 left-16 border border-gray-500 p-2">
              Chỉnh sửa
            </div> */}
              </Link>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table
      aria-label="Example table with dynamic content"
      className="pb-4"
      bottomContent={
        <div className="flex w-full justify-center ">
          <Pagination
            isCompact
            showControls
            showShadow
            color="success"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
          {/* <Pagination
            showControls
            color="success"
            total={pages}
            initialPage={page}
            onChange={(page) => setPage(page)}
          /> */}
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.key}
            align={column.key === "actions" ? "center" : "start"}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={items}>
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
  { key: "id", label: "STT" },
  { key: "ma", label: "Mã" },
  { key: "ten", label: "Tên Khách Hàng" },
  { key: "nhanVien", label: "Mã Nhân Viên" },
  { key: "loaiHd", label: "Loại HD" },
  { key: "ngayTao", label: "Ngày Tạo" },
  { key: "tienGiam", label: "Tiền Giảm " },
  { key: "trangThai", label: "Trạng Thái" },
  { key: "tongTien", label: "Tổng Tiền" },
  { key: "actions", label: "Thao tác" },
];

const GetTrangThai = ({ tinhTrang }) => {
  if (tinhTrang == 1)
    return (
      <Tag color="#8e008e">
        <span className=" text-sm ">Chờ Xác Nhận</span>
      </Tag>
    );
  if (tinhTrang == 2)
    return (
      <Tag color="#ff8e00">
        {" "}
        <span className=" text-sm ">Xác Nhận</span>
      </Tag>
    );
  if (tinhTrang == 0)
    return (
      <Tag color="#C8D52D">
        {" "}
        <span className=" text-sm ">Chờ Vận Chuyển</span>
      </Tag>
    );
  if (tinhTrang == 3)
    return (
      <Tag color="#008e00">
        {" "}
        <span className=" text-sm ">Vận Chuyển</span>
      </Tag>
    );
  if (tinhTrang == 4)
    return (
      <Tag color="#00c0c0">
        {" "}
        <span className=" text-sm ">Thanh Toán</span>
      </Tag>
    );
  if (tinhTrang == 5)
    return (
      <Tag color="#400098">
        {" "}
        <span className=" text-sm ">Hoàn Thành</span>
      </Tag>
    );
  if (tinhTrang == 6)
    return (
      <Tag color="#ff0000">
        {" "}
        <span className=" text-sm ">Hủy</span>
      </Tag>
    );
};
