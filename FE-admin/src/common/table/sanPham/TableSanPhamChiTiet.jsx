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
// import { VerticalDotsIcon } from "../../tableNextUi/khuyenMai/VerticalDotsIcon";
import { AiOutlinePlus } from "react-icons/ai";
import { SearchIcon } from "../../otherComponents/SearchIcon";
import { ChevronDownIcon } from "../../otherComponents/ChevronDownIcon";
import { capitalize } from "../../otherComponents/utils";
import { TbInfoTriangle } from "react-icons/tb";
import axios from "axios";
import { toast } from "react-toastify";
import { MdDeleteOutline } from "react-icons/md";
import { LiaEyeSolid } from "react-icons/lia";
import { getAllKMSPCT } from "../../../api/khuyenMai/KhuyenMaiApi"
import { DeleteIcon } from "../../otherComponents/DeleteIcon";
import { EyeIcon } from "../../otherComponents/EyeIcon";
import numeral from "numeral";
import { InputNumber } from "antd";
import { Modal } from 'antd';

const columns = [
  { name: "STT", uid: "stt", sortable: true },
  { name: "Ảnh", uid: "hinhAnh", sortable: true },
  { name: "Kích thước", uid: "kichThuoc", sortable: true },
  { name: "Màu sắc", uid: "mauSac", sortable: true },
  { name: "Đế giày", uid: "deGiay", sortable: true },
  { name: "Số lượng tồn", uid: "soLuongTon", sortable: true, align: "center"},
  { name: "Đơn giá", uid: "donGia", sortable: true },
  { name: "Trạng thái", uid: "trangThai", sortable: true },
  { name: "Hành Động", uid: "hanhDong" },
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
  "hinhAnh",
  "kichThuoc",
  "mauSac",
  "deGiay",
  "soLuongTon",
  "donGia",
  "trangThai",
  "hanhDong",
];

export default function App({ gioHang }) {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [totalPages, setTotalPages] = React.useState(1);
  const [soLuongSP, setSoLuongSP] = useState({});
  const [soLuongDat, setSoLuongDat] = useState("");
  const [isModalOpenThemSL, setIsModalOpenThemSL] = useState(false);

  const showModalThemSL = () => {
    setIsModalOpenThemSL(true);
  };
  const handleOkThemSL = async () => {
    // localStorage.setItem("gioHang"+gioHang,soLuongSP.id)
    // localStorage.setItem("soLuongDat",soLuongDat)
    console.log(gioHang);
    console.log(soLuongSP.id);
    console.log(soLuongDat);

    await axios.post("http://localhost:8080/hoa_don_chi_tiet/addHDCT", {
      id_hoa_don : gioHang,
      id_san_pham : soLuongSP.id,
      so_luong : soLuongDat
    })
      .then((response) => {
        toast("🎉 Thêm thành công");
        cancelDelete();
      })
      .catch((error) => {
        toast(error.response.data);
      });
    cancelDelete();
    setIsModalOpenThemSL(false);
  };
  const handleCancelThemSL = () => {
    setIsModalOpenThemSL(false);
  };

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
      //   await axios.delete(`http://localhost:8080/delete/${idToDelete}`)
      //     .then((response) => {
      //       toast("🎉 Xóa thành công");
      //       cancelDelete();
      //     })
      //     .catch((error) => {
      //       toast("😢 Xóa thất bại");
      //     });
      cancelDelete();
    }
  };
  const [hinhAnh, setHinhAnh] = useState([]);
  const getAllHA = async () => {
    await axios.get("http://localhost:8080/getAllHinhAnh").then((response) => {
      setHinhAnh(response.data);
      // console.log(response.data);
    });
  };
  useEffect(() => {
    getAllHA();
  }, []);

  const [kmspcts, setKmspcts] = useState([]);
  const fetchKMSPCT = async () => {
    const data = await getAllKMSPCT();
    setKmspcts(data)
  };
  useEffect(() => {
    fetchKMSPCT();
  }, [kmspcts]);
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
  const { ma } = useParams();

  const url = `http://localhost:8080/getAllSPCT`;
  React.useEffect(() => {
    async function fetchChiTietSanPham() {
      try {
        const response = await axios.get(url);
        // console.log(response.data);
        const updatedRows = response.data.map((item, index) => ({
          id: item.id,
          stt: index + 1,
          hinhAnh:
            hinhAnh.find((x) => x.id_san_pham_chi_tiet.id == item.id)?.ten ||
            "",
          mauSac: item.id_mau_sac.maMau,
          kichThuoc: item.id_kich_co.ten,
          soLuongTon: item.soLuongTon,
          deGiay: item.id_de_giay.ten,
          donGia: numeral(item.giaBan).format("0,0 VND") + " VND",
          trangThai: item.trangThai == 1 ? "Đang bán" : "Ngừng bán",
          giaGiam: kmspcts.find((x) => x.id_chi_tiet_san_pham.id == item.id)
            ?.id_khuyen_mai.giaTriPhanTram,
        }));
        // console.log(giaGiam)
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

  const DiscountTag = ({ discount }) => {
    if (discount === undefined) {
      return null;
    }

    return (
      <div className="discount-tag">
        {`${discount}% OFF`}
      </div>
    );
  };


  const renderCell = React.useCallback((sanPham, columnKey) => {
    const cellValue = sanPham[columnKey];
    const giaGiam = sanPham.giaGiam;
    
    switch (columnKey) {
      case "hinhAnh":
        
        const hinhAnhURL = sanPham.hinhAnh;
        return (
          <div style={{
            display: 'inline-block'
          }}>
            
            <Image
              width={150}
              height={100}
              src={hinhAnhURL}
              alt={sanPham.ten || "Ảnh sản phẩm"}
              classNames="m-5 relative"
              style={{
                border: '1px solid #D8D9DA',
                padding: '10px'
              }}
            />
            <DiscountTag discount={giaGiam} />
            
          </div>
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
      case "mauSac":
        return (
          <Chip
            color="white"
            style={{
              backgroundColor: sanPham.mauSac, // Sử dụng giá trị từ statusColorMap làm màu nền
              color: "white", // Màu văn bản trắng
              fontSize: "13px",
              textAlign: "center",
              padding: "1px 6px",
              borderRadius: "5px",
            }}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "hanhDong":
        return (
          <div className="relative flex gap-4">
            <Tooltip content="Thêm sản phẩm" showArrow={true}>
                <span className="cursor-pointer active:opacity-50 w-20 text-center">
                  <div
                    className="p-2"
                    style={{
                      backgroundColor: "#00C5CD",
                      borderRadius: "5px",
                      color: "white",
                      cursor: "pointer",
                    }}
                    onClick={() => {showModalThemSL();setSoLuongSP({id : sanPham.id , soLuongTon : sanPham.soLuongTon})}}
                  >
                    Chọn
                  </div>
                  
                </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, [isModalOpenThemSL]);

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
        <h1>Các sản phẩm đang có</h1>

        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[30%]"
            placeholder="Tìm kiếm bất kỳ..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
            // style={{margin : "100px 500px"}}
          />
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
            Tổng {sanPhams.length} sản phẩm
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
          total={pages}
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
        // isHeaderSticky
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
      <Modal
        onOk={handleOkThemSL}
        onCancel={handleCancelThemSL}
        open={isModalOpenThemSL}
        width={350}
        okText="Đặt hàng"
        >
        <div className="mt-5">
          <h2>Số lượng tồn sản phẩm : {soLuongSP.soLuongTon}</h2>
          <br />
          <p>Nhập số lượng sản phẩm  
          </p>
          <InputNumber onChange={(value) => {setSoLuongDat(value)}} max={soLuongSP.soLuongTon}/>
        </div>
      </Modal>
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
