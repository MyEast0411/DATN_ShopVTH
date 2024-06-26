import React, { useEffect, useState } from "react";
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
} from "@nextui-org/react";
import { VerticalDotsIcon } from "../../otherComponents/VerticalDotsIcon";
import { SearchIcon } from "../../otherComponents/SearchIcon";
import { ChevronDownIcon } from "../../otherComponents/ChevronDownIcon";
import { capitalize } from "../../otherComponents/utils";
import { DateTime } from "luxon";
import { Settings } from "luxon";
import axios from "axios";
import { getAllKMSPCT } from "../../../api/khuyenMai/KhuyenMaiApi";

Settings.defaultZoneName = "Asia/Ho_Chi_Minh";
const url = "http://localhost:8080/";
const columns = [
  { name: "STT", uid: "stt", sortable: true },
  { name: "Mã", uid: "ma", sortable: true },
  { name: "Ảnh", uid: "anh" },
  // { name: "Tên", uid: "ten", sortable: true },
  { name: "Kích thước", uid: "kichThuoc", sortable: true },
  { name: "Màu sắc", uid: "mauSac" },
  { name: "Trạng thái", uid: "trangThai", sortable: true },
];

const statusOptions = [
  { name: "Đang bán", uid: "Đang bán" },
  { name: "Ngừng bán", uid: "Ngừng bán" },
];

const statusColorMap = {
  active: "success",
  paused: "danger",
  incoming: "warning",
};
statusColorMap["Đang bán"] = "success";
statusColorMap["Ngừng bán"] = "danger";

const INITIAL_VISIBLE_COLUMNS = [
  "stt",
  "anh",
  "ten",
  "kichThuoc",
  "mauSac",
  "trangThai",
  // "tinhTrang",
];

export default function TableChiTietSanPham({
  selectedMaValues,
  onSelectedMaValuesChange,
}) {
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
  const [chiTietSanPhams, setChiTietSanPhams] = React.useState([]);
  const [selectedMaCTSP, setSelectedMaCTSP] = useState([]);
  const [kmspcts, setKmspcts] = useState([]);
  const [rowKey, setRowKey] = useState([]);

  useEffect(() => {
    const fetchKMSPCT = async () => {
      const data = await getAllKMSPCT();
      setKmspcts(data);
    };
    fetchKMSPCT();
  }, []);

  React.useEffect(() => {
    async function fetchChiTietSanPham() {
      const params = {
        ma: selectedMaValues,
      };
      const url = `http://localhost:8080/get-chiTietSP-by-ListMa/${selectedMaValues}`;
      try {
        if (selectedMaValues.length === 0) {
          setChiTietSanPhams([]);
        } else {
          const response = await axios.get(url);
          const updatedRows = response.data.map((item, index) => ({
            id: index + 1,
            stt: index + 1,
            ma: item.ma,
            anh: item.defaultImg,
            kichThuoc: item.id_kich_co.ten,
            mauSac: item.id_mau_sac.ten,
            giaGiam: kmspcts.find((x) => x.id_chi_tiet_san_pham.id == item.id)
              ?.id_khuyen_mai.giaTriPhanTram,
            trangThai: item.trangThai == 1 ? "Đang bán" : "Ngừng bán",
          }));
          const arr = updatedRows.filter((item) => item.giaGiam !== undefined);
          const rowKeys = arr.map((item) => String(item.id));
          setRowKey(rowKeys);
          setChiTietSanPhams(updatedRows);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API: ", error);
      }
    }
    fetchChiTietSanPham();
  }, [selectedMaValues]);

  const DiscountTag = ({ discount }) => {
    if (discount === undefined) {
      return null;
    }

    return <div className="discount-tag">{`${discount}% OFF`}</div>;
  };

  const idToMaMap = {};
  chiTietSanPhams.forEach((sanPham) => {
    idToMaMap[sanPham.id] = sanPham.ma;
  });

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    const filterText = filterValue.toLowerCase();
    let filteredChiTietSanPhams = [...chiTietSanPhams];

    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredChiTietSanPhams = filteredChiTietSanPhams.filter(
        (chiTietSanPham) =>
          Array.from(statusFilter).includes(chiTietSanPham.trangThai)
      );
      return filteredChiTietSanPhams;
    }

    return chiTietSanPhams.filter((chiTietSanPham) =>
      Object.values(chiTietSanPham).some((value) =>
        String(value).toLowerCase().includes(filterText)
      )
    );
  }, [chiTietSanPhams, filterValue, statusFilter]);

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

  const renderCell = React.useCallback((chiTietSanPham, columnKey) => {
    const cellValue = chiTietSanPham[columnKey];

    switch (columnKey) {
      case "anh":
        const hinhAnhURL = chiTietSanPham.anh;
        const giaGiam = chiTietSanPham.giaGiam;
        return (
          <div
            style={{
              display: "inline-block",
            }}
          >
            <Image
              width={70}
              src={hinhAnhURL}
              alt={chiTietSanPham.ten || "Ảnh sản phẩm"}
            />

            <DiscountTag discount={giaGiam} />
          </div>
        );
      case "trangThai":
        return (
          <Chip
            // className="capitalize"
            color={statusColorMap[chiTietSanPham.trangThai]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "hanhDong":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>Xem</DropdownItem>
              </DropdownMenu>
            </Dropdown>
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

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[30%]"
            placeholder="Tìm kiếm bất kỳ..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
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
            Tổng {chiTietSanPhams.length} sản phẩm chi tiết
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
    chiTietSanPhams.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "Đã chọn tất cả"
            : `${selectedKeys.size} sản phẩm chi tiết đã được chọn`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
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
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        disabledKeys={rowKey}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px ]",
        }}
        selectedKeys={selectedKeys} 
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSortChange={setSortDescriptor}
        onSelectionChange={(selectedKeys) => {
          let selectedMaCTSP = [];
          if (selectedKeys === "all") {
            selectedMaCTSP = chiTietSanPhams.map(
              (chiTietSanPham) => chiTietSanPham.ma
            );
          } else {
            selectedMaCTSP = Array.from(selectedKeys).map(
              (id) => idToMaMap[id]
            );
          }
          onSelectedMaValuesChange(selectedMaCTSP);
          setSelectedKeys(selectedKeys);
          setSelectedMaCTSP(selectedMaCTSP);
        }}
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
          emptyContent={"Không tìm thấy sản phẩm nào!"}
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
    </>
  );
}
