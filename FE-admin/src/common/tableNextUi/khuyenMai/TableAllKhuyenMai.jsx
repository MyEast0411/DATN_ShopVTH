import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
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
  Tooltip,
  getKeyValue,
  Pagination,
  Switch,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { SearchIcon } from "../../otherComponents/SearchIcon";
import { ChevronDownIcon } from "../../otherComponents/ChevronDownIcon";
import { capitalize } from "../../otherComponents/utils";
import { EditIcon } from "../../otherComponents/EditIcon";
import { DeleteIcon } from "../../otherComponents/DeleteIcon";
import { EyeIcon } from "../../otherComponents/EyeIcon";
import {
  getAllKhuyenMai,
  deleteKhuyenMai,
  searchByDate,
  findKmspctByKhuyenMaiId,
} from "../../../api/khuyenMai/KhuyenMaiApi";
import { DateTime } from "luxon";
import { Settings } from "luxon";
import { toast } from "react-toastify";
import { TbInfoTriangle } from "react-icons/tb";
import { format } from "date-fns";
import axios from "axios";

Settings.defaultZoneName = "Asia/Ho_Chi_Minh";
const columns = [
  { name: "STT", uid: "stt", sortable: true },
  { name: "id", uid: "id", sortable: true },
  { name: "Mã", uid: "ma", sortable: true },
  { name: "Tên", uid: "ten", sortable: true },
  { name: "Giá trị giảm (%)", uid: "giaTriPhanTram", sortable: true },
  { name: "Ngày bắt đầu", uid: "ngayBatDau", sortable: true },
  { name: "Ngày kết thúc", uid: "ngayKetThuc", sortable: true },
  { name: "Trạng thái", uid: "trangThai", sortable: true },
  { name: "Hành Động", uid: "hanhDong" },
];

const statusOptions = [
  { name: "Đang diễn ra", uid: "Đang diễn ra" },
  { name: "Đã kết thúc", uid: "Đã kết thúc" },
  { name: "Sắp diễn ra", uid: "Sắp diễn ra" },
  { name: "Chưa diễn ra", uid: "Chưa diễn ra" },
];

const statusColorMap = {
  active: "success",
  paused: "danger",
  incoming: "warning",
  notStarted: "primary",
};
statusColorMap["Sắp diễn ra"] = "warning";
statusColorMap["Đang diễn ra"] = "success";
statusColorMap["Đã kết thúc"] = "danger";
statusColorMap["Chưa diễn ra"] = "primary";
statusColorMap["Đã dừng"] = "danger";

const INITIAL_VISIBLE_COLUMNS = [
  "stt",
  // "id",
  "ma",
  "ten",
  "giaTriPhanTram",
  "ngayBatDau",
  "ngayKetThuc",
  "trangThai",
  "hanhDong",
];

export default function TableAllKhuyenMai({ nbd, nkt, search }) {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [totalPages, setTotalPages] = React.useState(1);
  const [khuyenMaiSPCT, setKhuyenMaiSPCT] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleViewDetails = async (id) => {
    onOpen();
    try {
      const response = await findKmspctByKhuyenMaiId(id);
      console.log(response);
      setKhuyenMaiSPCT(response);
    } catch (error) {
      console.error("Error fetching khuyenMaiSPCT details:", error);
    }
  };

  const handleDelete = (idToDelete) => {
    setIdToDelete(idToDelete);
    setDeleteConfirmationOpen(true);
  };

  const cancelDelete = () => {
    setIdToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const confirmDelete = () => {
    if (idToDelete) {
      deleteKhuyenMai(idToDelete)
        .then((response) => {
          console.log(`Delete successful for row ID: ${idToDelete}`);
          toast("🎉 Xóa thành công");
          setKhuyenMais((prevKhuyenMais) =>
            prevKhuyenMais.filter((item) => item.id !== idToDelete)
          );
        })
        .catch((error) => {
          console.error(`Error deleting record for ID: ${idToDelete}`, error);
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
  const [khuyenMais, setKhuyenMais] = useState([]);

  async function fetchKhuyenMais() {
    try {
      if (nbd != "" && nkt != "") {
        const dataSearch = await searchByDate(nbd, nkt);
        const khuyenMaisFormatted = dataSearch.map((khuyenMai, index) => ({
          ...khuyenMai,
          id: khuyenMai.id,
          stt: index + 1,
          ngayBatDau: format(
            new Date(khuyenMai.ngayBatDau),
            "dd-MM-yyyy HH:mm"
          ),
          ngayKetThuc: format(
            new Date(khuyenMai.ngayKetThuc),
            "dd-MM-yyyy HH:mm"
          ),
        }));
        setKhuyenMais(khuyenMaisFormatted);
      } else {
        const data = await getAllKhuyenMai();
        const khuyenMaisFormatted = data.map((khuyenMai, index) => ({
          ...khuyenMai,
          id: khuyenMai.id,
          stt: index + 1,
          ngayBatDau: format(
            new Date(khuyenMai.ngayBatDau),
            "dd-MM-yyyy HH:mm"
          ),
          ngayKetThuc: format(
            new Date(khuyenMai.ngayKetThuc),
            "dd-MM-yyyy HH:mm"
          ),
        }));
        setKhuyenMais(khuyenMaisFormatted);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API: ", error);
    }
  }

  useEffect(() => {
    fetchKhuyenMais();
    setFilterValue(search);
  }, [khuyenMais, nbd, nkt, search]);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    const filterText = filterValue.toLowerCase();
    let filteredKhuyenMais = [...khuyenMais];

    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredKhuyenMais = filteredKhuyenMais.filter((khuyenMai) =>
        Array.from(statusFilter).includes(khuyenMai.trangThai)
      );
      return filteredKhuyenMais;
    }

    return khuyenMais.filter((khuyenMai) =>
      Object.values(khuyenMai).some((value) =>
        String(value).toLowerCase().includes(filterText)
      )
    );
  }, [khuyenMais, filterValue, statusFilter]);

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

  const [isSelected, setIsSelected] = React.useState(true);

  const renderCell = React.useCallback(
    (khuyenMai, columnKey) => {
      const cellValue = khuyenMai[columnKey];

      switch (columnKey) {
        case "trangThai":
          return (
            <Chip
              // className="capitalize"
              color={
                khuyenMai.switchKM === "Đã dừng"
                  ? "danger"
                  : statusColorMap[khuyenMai.trangThai]
              }
              size="sm"
              variant="flat"
            >
              {khuyenMai.switchKM === "Đã dừng" ? "Đã dừng" : cellValue}
            </Chip>
          );
        case "hanhDong":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Xem" showArrow={true}>
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon onClick={() => handleViewDetails(khuyenMai.id)} />
                </span>
              </Tooltip>
              <Tooltip content="Chỉnh sửa" showArrow={true}>
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <Link to={`/them-khuyen-mai/${khuyenMai.id}`}>
                    <EditIcon />
                  </Link>
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Xóa" showArrow={true}>
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon onClick={() => handleDelete(khuyenMai.id)} />
                </span>
              </Tooltip>
              {(khuyenMai.trangThai === "Đang diễn ra" ||
                khuyenMai.switchKM === "Đã dừng") && (
                <Tooltip
                  showArrow={true}
                  content={isSelected ? "Tắt khuyến mại" : "Bật khuyến mại"}
                >
                  <span className="text-lg inline-block  text-danger cursor-pointer active:opacity-50">
                    <Switch
                      defaultSelected={
                        khuyenMai.switchKM === "Đã dừng" ? false : true
                      }
                      size="sm"
                      color="success"
                      className="inline-block"
                      checked={isSelected}
                      onChange={async () => {
                        setIsSelected(!isSelected);
                        await axios
                          .put(
                            `http://localhost:8080/khuyen-mai/batTatKhuyenMai/${khuyenMai.id}/${isSelected}`,
                            khuyenMai
                          )
                          .then((response) => {
                            fetchKhuyenMais();
                          });
                      }}
                    />
                  </span>
                </Tooltip>
              )}
            </div>
          );

        default:
          return cellValue;
      }
    },
    [isSelected]
  );

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
          {/* <Input type="datetime-local" label="Từ ngày" />
          <Input type="datetime-local" label="Đến ngày"/> */}

          <div className="flex flex-end gap-3">
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
            {/* Tổng {khuyenMais.length} khuyến mại */}
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
    khuyenMais.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          Tổng số khuyến mại :{" "}
          <span className="font-medium text-gray-950">{khuyenMais.length}</span>
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={totalPages}
          onChange={setPage}
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
        // isHeaderSticky
        bottomContent={bottomContent}
        selectionMode="single" 
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px]",
        }}
        selectedKeys={selectedKeys}
        // selectionMode="multiple"
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
          emptyContent={"Không tìm thấy khuyến mại"}
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
            Bạn có chắc muốn xóa khuyến mại này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="warning">
            Hủy
          </Button>
          <Button onClick={confirmDelete} color="primary">
            Vẫn xóa
          </Button>
        </DialogActions>
      </Dialog>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}   size={"5xl"} >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Thông tin khuyến mại
              </ModalHeader>
              <ModalBody>
                {khuyenMaiSPCT.map((item, index) => (
                  <div key={index} className="mx-auto">
                    <p>Mã sản phẩm: <span className="font-medium">{item.id_chi_tiet_san_pham.ma}</span></p>
                    <p>Tên sản phẩm: <span className="font-medium">{item.id_chi_tiet_san_pham.ten}</span></p>
                    <p>Giá sản phẩm: <span className="font-medium">{item.id_chi_tiet_san_pham.giaBan}</span></p>
                  </div>
                ))}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Đóng
                </Button>
                {/* <Button color="primary" onPress={onClose}>
                  Ok
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
