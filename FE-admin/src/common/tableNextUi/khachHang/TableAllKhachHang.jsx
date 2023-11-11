import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Image,
  Tooltip,
} from "@nextui-org/react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TableCell as TableCellMui,
} from "@mui/material";
import { format } from "date-fns";
// import { VerticalDotsIcon } from "../../tableNextUi/khuyenMai/VerticalDotsIcon";
// import { SearchIcon } from "../../tableNextUi/khuyenMai/SearchIcon";
import { ChevronDownIcon } from "../../otherComponents/ChevronDownIcon";
import { capitalize } from "../../otherComponents/utils";
import axios from "axios";
import { toast } from "react-toastify";
import { DeleteIcon } from "../../otherComponents/DeleteIcon";
import { EyeIcon } from "../../otherComponents/EyeIcon";
// import { MdDeleteOutline } from "react-icons/md";
import { TbInfoTriangle } from "react-icons/tb";
// import { LiaEyeSolid } from "react-icons/lia";

const columns = [
  { name: "STT", uid: "stt", sortable: true },
  { name: "Ảnh", uid: "hinhAnh", sortable: true, align: "center" },
  { name: "Họ tên", uid: "hoTen", sortable: true },
  { name: "CCCD", uid: "cccd", sortable: true },
  { name: "Số điện thoại", uid: "sdt", sortable: true },
  { name: "Ngày sinh", uid: "ngaySinh", sortable: true },
  { name: "Trạng thái", uid: "trangThai" },
  { name: "Hành Động", uid: "hanhDong" },
];

const statusOptions = [
  { name: "Kích hoạt", uid: "Kích hoạt" },
  { name: "Chưa kích hoạt", uid: "Chưa kích hoạt" },
];

const statusColorMap = {
  active: "success",
  paused: "danger",
  incoming: "warning",
};
statusColorMap["Kích hoạt"] = "success";
statusColorMap["Chưa kích hoạt"] = "danger";

const INITIAL_VISIBLE_COLUMNS = [
  "stt",
  "hinhAnh",
  "hoTen",
  "cccd",
  "sdt",
  "ngaySinh",
  "trangThai",
  "hanhDong",
];

export default function App() {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [totalPages, setTotalPages] = React.useState(1);
  const [rows, setRows] = React.useState([]);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = React.useState(false);

  const handleDelete = (idToDelete) => {
    setIdToDelete(idToDelete);
    setDeleteConfirmationOpen(true);
  };

  const cancelDelete = () => {
    setIdToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const confirmDelete = async () => {
    if (idToDelete) {
      await axios
        .delete(`http://localhost:8080/khach-hang/delete/${idToDelete}`)
        .then((response) => {
          toast("🎉 Xóa thành công");
          cancelDelete();
        })
        .catch((error) => {
          toast("😢 Xóa thất bại");
        });
      cancelDelete();
    }
  };

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "giaTriPhanTram",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);
  const [sanPhams, setSanPhams] = React.useState([]);

  React.useEffect(() => {
    async function fetchChiTietSanPham() {
      try {
        const response = await axios.get(
          "http://localhost:8080/khach-hang/getAll"
        );
        console.log(response.data);
        const updatedRows = response.data.map((item, index) => ({
          id: item.id,
          stt: index + 1,
          maKH: item.ma,
          anh: item.anhNguoiDung,
          hoTen: item.ten,
          cccd: item.cccd,
          sdt: item.sdt,
          ngaySinh: format(new Date(item.ngaySinh), "dd-MM-yyyy"),
          trangThai: item.trangThai == 1 ? "Kích hoạt" : "Chưa kích hoạt",
        }));
        setSanPhams(updatedRows);
      } catch (error) {
        console.error("Lỗi khi gọi API: ", error);
      }
    }
    fetchChiTietSanPham();
  }, [sanPhams]);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    const filterText = filterValue.toLowerCase();
    let filteredSanPhams = [...sanPhams];

    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredSanPhams = filteredSanPhams.filter((sanPham) =>
        Array.from(statusFilter).includes(sanPham.trangThai)
      );
      return filteredSanPhams;
    }

    return sanPhams.filter((sanPham) =>
      Object.values(sanPham).some((value) =>
        String(value).toLowerCase().includes(filterText)
      )
    );
  }, [sanPhams, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((sanPham, columnKey) => {
    const cellValue = sanPham[columnKey];
    // console.log(sanPham);
    switch (columnKey) {
      case "hinhAnh":
        const hinhAnhURL = sanPham.anh;
        return (
          <Image
            style={{ height: "120px", width: "150px" }}
            src={hinhAnhURL}
            alt={sanPham.ten || "Ảnh sản phẩm"}
            classNames="m-5"
          />
        );
      case "trangThai":
        return (
          <Chip
            // className="capitalize"
            color={statusColorMap[sanPham.trangThai]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "hanhDong":
        return (
          <div className="relative flex items-center gap-4">
            <Tooltip content="Xem" showArrow={true}>
              <Link
                to={`/edit-khach-hang/${sanPham.maKH}`}
                // style={{ display: "block" }}
                className="button-link group relative"
              >
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon />
                </span>
              </Link>
            </Tooltip>
            <Tooltip color="danger" content="Xóa" showArrow={true}>
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon onClick={() => handleDelete(sanPham.id)} />
              </span>
            </Tooltip>
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
    setTotalPages(Math.ceil(filteredItems.length / Number(e.target.value)));
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

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-end gap-3 items-end">
          {/* <Input
            isClearable
            className="w-full sm:max-w-[30%]"
            placeholder="Tìm kiếm bất kỳ..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          /> */}
          <div className="flex gap-3 items-end">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Trạng thái
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Các cột
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Tổng {sanPhams.length} khách hàng
          </span>
          <label className="flex items-center text-default-400 text-small">
            Dòng tối đa:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    sanPhams.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        {/* <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "Đã chọn tất cả"
            : `${selectedKeys.size} khyến mại đã được chọn`}
        </span> */}
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={totalPages}
          onChange={setPage}
          style={{ paddingLeft: "730px" }}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Trước
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Tiếp
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <>
      <Table
        style={{ height: "382px" }}
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px]",
        }}
        selectedKeys={selectedKeys}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "hanhDong" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"Không tìm thấy khách hàng nào!"}
          items={sortedItems}
        >
          {(item) => (
            <TableRow key={item.id}>
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
