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
  Tooltip,
} from "@nextui-org/react";

import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { EyeIcon } from "../../common/otherComponents/EyeIcon";
import { Tag } from "antd";

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
            <Tooltip content="Xem chi tiết" showArrow={true}>
              <Link
                to={`/detail-hoa-don/${user.ids}`}
                className="button-link group relative"
              >
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon />
                </span>
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
      style={{ height: "382px" }}
      className="pb-4"
      bottomContent={
        <div className="flex w-full justify-center ">
          <Pagination
            isCompact
            showControls
            showShadow
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
  { key: "nhanVien", label: "Tên Nhân Viên" },
  { key: "loaiHd", label: "Loại HD" },
  { key: "ngayTao", label: "Ngày Tạo" },
  { key: "tienGiam", label: "Tiền Giảm " },
  { key: "trangThai", label: "Trạng Thái" },
  { key: "tongTien", label: "Tổng Tiền" },
  { key: "actions", label: "Thao tác" },
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
  if (tinhTrang == 7)
    return (
      <Tag color="#ff0000">
        {" "}
        <span className=" text-sm ">Chờ thanh toán</span>
      </Tag>
  );
  
};
