import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Pagination,
} from "@nextui-org/react";
import moment from "moment";

import { Tag } from "antd";
import { Link } from "react-router-dom";
import { EyeIcon } from "./icon/EyeIcon";
import { DeleteIcon } from "./icon/DeleteIcon";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function TableCommon({ data }) {
  const [filterValue, setFilterValue] = React.useState("");

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // const [sortDescriptor, setSortDescriptor] = React.useState({
  //   column: "ngayTao",
  //   direction: "ascending",
  // });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const pages = Math.ceil(data.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data, rowsPerPage]);

  // const sortedItems = React.useMemo(() => {
  //   return [...items].sort((a, b) => {
  //     const first = a[sortDescriptor.column];
  //     const second = b[sortDescriptor.column];
  //     const cmp = first < second ? -1 : first > second ? 1 : 0;

  //     return sortDescriptor.direction === "descending" ? -cmp : cmp;
  //   });
  // }, [sortDescriptor, items]);

  const renderCell = React.useCallback((hoaDon, columnKey) => {
    const cellValue = hoaDon[columnKey];

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
                to={`/quan-ly-hoa-don/detail-hoa-don/${hoaDon.ids}`}
                // style={{ display: "block" }}
                className="button-link group relative"
              >
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon />
                </span>
              </Link>
            </Tooltip>
            {/* <Tooltip color="danger" content="Xóa hóa đơn" showArrow={true}>
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon onClick={() => handleDelete(hoaDon.ids)} />
              </span>
            </Tooltip> */}
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const bottomContent = React.useMemo(() => {
    return (
      items.length > 0 && (
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={setPage}
          />
        </div>
      )
    );
  }, [items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      style={{ height: "382px" }}
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      //   selectedKeys={selectedKeys}
      //   selectionMode="multiple"
      // sortDescriptor={sortDescriptor}
      //   topContent={topContent}
      //   topContentPlacement="outside"
      //   onSelectionChange={setSelectedKeys}
      // onSortChange={setSortDescriptor}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            // allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"Không tìm thấy hóa đơn 😞"} items={items}>
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
  { uid: "stt", name: "STT" },
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
      <Tag color="#2C7865">
        {" "}
        <span className=" text-sm ">Trả Hàng</span>
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
