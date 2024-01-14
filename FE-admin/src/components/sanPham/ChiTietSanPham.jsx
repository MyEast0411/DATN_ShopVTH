import React, { useEffect, useState } from "react";

//filter
import FilterMa from "../../small-component/Filter/FilterMa";
import FilterTrangThai from "../../small-component/Filter/FilterTrangThai";

import { Button as ButtonAntd } from "antd";
import { Link, useParams } from "react-router-dom";
import { InputNumber } from "antd";
//table
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
  Slider
} from "@nextui-org/react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TableCell as TableCellMui,
} from "@mui/material";

//icon
import { BiFilterAlt } from "react-icons/bi";
import { ChevronDownIcon } from "../../common/otherComponents/ChevronDownIcon";
import { HiOutlineClipboardList } from "react-icons/hi";
import { SearchIcon } from "../../common/otherComponents/SearchIcon";
import { DeleteIcon } from "../../common/otherComponents/DeleteIcon";
import { EyeIcon } from "../../common/otherComponents/EyeIcon";

//other
import { capitalize } from "../../common/otherComponents/utils";
import { TbInfoTriangle } from "react-icons/tb";
import axios from "axios";
import { getAllKMSPCT } from "../../api/khuyenMai/KhuyenMaiApi";
import numeral from "numeral";

const columns = [
  { name: "STT", uid: "stt", sortable: true },
  { name: "Ảnh", uid: "hinhAnh", sortable: true },
  { name: "Tên sản phẩm", uid: "tenSanPham", sortable: true },
  { name: "Kích thước", uid: "kichThuoc", sortable: true },
  { name: "Màu sắc", uid: "mauSac", sortable: true },
  { name: "Đế giày", uid: "deGiay", sortable: true },
  { name: "Số lượng tồn", uid: "soLuongTon", sortable: true, align: "center" },
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
  "tenSanPham",
  "kichThuoc",
  "mauSac",
  "deGiay",
  "soLuongTon",
  "donGia",
  "trangThai",
  "hanhDong",
];
export default function ChiTietSanPham() {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] =
    React.useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [totalPages, setTotalPages] = React.useState(1);
  const [selectedCTSP, setSelectedCTSP] = useState([]);
  const [mauSac, setMauSac] = useState([]);
  const [thuongHieu, setThuongHieu] = useState([]);
  const [chatLieu, setChatLieu] = useState([]);
  const [deGiay, setDeGiay] = useState([]);
  const [kichCo, setKichCo] = useState([]);
  const [nhanHieu, setNhanHieu] = useState([]);

  useEffect(() => {
    getAllNH();
    getAllMS();
    getAllCL();
    getAllTH();
    getAllKC();
    getAllDG();
  }, []);
  const getAllNH = async () => {
    await axios.get("http://localhost:8080/getAllNH").then((response) => {
      setNhanHieu(response.data);
    });
  };
  const getAllMS = async () => {
    await axios.get("http://localhost:8080/getAllMS").then((response) => {
      setMauSac(response.data);
    });
  };

  const getAllTH = async () => {
    await axios.get("http://localhost:8080/getAllTH").then((response) => {
      setThuongHieu(response.data);
    });
  };

  const getAllCL = async () => {
    await axios.get("http://localhost:8080/getAllCL").then((response) => {
      setChatLieu(response.data);
    });
  };

  const getAllDG = async () => {
    await axios.get("http://localhost:8080/getAllDG").then((response) => {
      setDeGiay(response.data);
    });
  };

  const getAllKC = async () => {
    await axios.get("http://localhost:8080/getAllKC").then((response) => {
      setKichCo(response.data);
    });
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
    });
  };
  useEffect(() => {
    getAllHA();
  }, [hinhAnh]);

  const [kmspcts, setKmspcts] = useState([]);
  const fetchKMSPCT = async () => {
    const data = await getAllKMSPCT();
    setKmspcts(data);
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
  const [sanPham, setSanPham] = useState({
    id_mau_sac: "",
    id_kich_co: "",
    id_chat_lieu: "",
    id_de_giay: "",
    id_thuong_hieu: "",
    id_nhan_hieu: "",
    trangThai : ""
  });
  const onChange = (e) => {
    const { name, value } = e.target;
  
    setSanPham((prevSanPham) => ({
      ...prevSanPham,
      [name]: value,
    }));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:8080/filterSPCT",sanPham);
        console.log(response.data);
        const updatedRows = response.data.map((item, index) => ({
          id: item.id,
          stt: index + 1,
          tenSanPham: item.ten,
          hinhAnh: item.defaultImg,
          mauSac: item.id_mau_sac.maMau,
          kichThuoc: item.id_kich_co.ten,
          soLuongTon: item.soLuongTon,
          deGiay: item.id_de_giay.ten,
          donGia: numeral(item.giaBan).format("0,0 VND") + " VND",
          trangThai: item.trangThai == 1 ? "Đang bán" : "Ngừng bán",
          giaGiam: kmspcts.find((x) => x.id_chi_tiet_san_pham.id == item.id)
            ?.id_khuyen_mai.giaTriPhanTram,
        }));

        setSanPhams(updatedRows);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [sanPham]);
  const url = `http://localhost:8080/findByMa/${ma}`;
  React.useEffect(() => {
    async function fetchChiTietSanPham() {
      try {
        const response = await axios.get(url);
        // console.log(response.data);
        const updatedRows = response.data.map((item, index) => ({
          id: index + 1,
          stt: index + 1,
          hinhAnh: item.defaultImg,
          mauSac: item.id_mau_sac.maMau,
          kichThuoc: item.id_kich_co.ten,
          soLuongTon: item.soLuongTon,
          tenSanPham: item.ten,
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
  }, []);

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

    return <div className="discount-tag">{`${discount}% OFF`}</div>;
  };

  const renderCell = React.useCallback(
    (sanPham, columnKey) => {
      const cellValue = sanPham[columnKey];
      const giaGiam = sanPham.giaGiam;
      const isSanPhamSelected =
        selectedKeys === "all" ||
        selectedCTSP.some((selectedItem) => selectedItem.id === sanPham.id);
      switch (columnKey) {
        case "soLuongTon":
          return isSanPhamSelected ? (
            <InputNumber
              value={sanPham.soLuongTon}
              // onChange={handleInputChange}
            />
          ) : (
            sanPham.soLuongTon
          );
        case "donGia":
          return isSanPhamSelected ? (
            <InputNumber
              value={sanPham.donGia}
              // onChange={handleInputChange}
            />
          ) : (
            sanPham.donGia
          );
        case "hinhAnh":
          const hinhAnhURL = sanPham.hinhAnh;
          return (
            <div
              style={{
                display: "inline-block",
              }}
            >
              <Image
                width={90}
                height={70}
                src={hinhAnhURL}
                alt={sanPham.ten || "Ảnh sản phẩm"}
                classNames="m-5 relative"
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
                backgroundColor: sanPham.mauSac,
                color: "white",
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
            <div className="relative flex items-center gap-4">
              <Tooltip content="Chi tiết" showArrow={true}>
                <Link
                  to={`/edit-san-pham/${sanPham.ma}`}
                  style={{ display: "block" }}
                  className="button-link group relative"
                >
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EyeIcon />
                  </span>
                </Link>
              </Tooltip>

              <div className="group relative" style={{ position: "relative" }}>
                <Tooltip color="danger" content="Xóa" showArrow={true}>
                  <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <DeleteIcon onClick={() => handleDelete(sanPham.ma)} />
                  </span>
                </Tooltip>
                {/* <span className="text invisible group-hover:visible absolute -top-2 left-8 border border-gray-500 p-2">Xóa</span> */}
              </div>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [selectedCTSP]
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
  const onRowSelection = (row) => {
    // Trả về false để ngăn không cho người dùng chọn dòng
    return false;
  };
  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-end gap-3 items-end">
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
          {/* <label className="flex items-center text-default-400 text-small">
            Dòng tối đa:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label> */}
          <ButtonAntd
            type="primary"
            style={{
              backgroundColor: "#1976d2",
              marginBottom: "2px",
            }}
          >
            📝 Cập nhật sản phẩm
          </ButtonAntd>
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
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all" ? "" : ``}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={totalPages}
          onChange={setPage}
          // style={{ paddingLeft: "730px" }}
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
      <div
        className=""
        style={{
          fontSizfe: "8px",
        }}
      >
        <div className="mb-2 font-normal border-gray-500 text-lg	flex items-center">
          <p
            className="mt-1 mb-3"
            style={{ fontSize: "30px", fontWeight: "bolder" }}
          >
            ⚙ Chi tiết sản phẩm
          </p>
        </div>
        <div className="mb-2 border-b-[2px] font-normal border-gray-500 text-lg	flex items-center">
          <BiFilterAlt />
          <p className="ml-2 mt-1"> Bộ lọc</p>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "8px",
            width: "100%",
            height: "300px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            transition: "transform 0.2s",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="flex flex-col gap-4">

            <div className="justify-between gap-3 items-end">
              <Input
                isClearable
                className="w-72 sm:max-w-[30%]"
                placeholder="Tìm kiếm bất kỳ..."
                startContent={<SearchIcon />}
                value={filterValue}
                onClear={() => onClear()}
                onValueChange={onSearchChange}
              />
              <div className="flex justify-center">
                  <div className="flex items-center mt-10 mr-10">
                    <label
                      htmlFor="country"
                      className="pr-2 block text-sm font-medium leading-6 text-gray-900"
                    >
                      Chất liệu :
                    </label>
                    <div className="flex">
                      <select
                        id="chatLieu"
                        name="id_chat_lieu"
                        autoComplete="country-name"

                        className="block w-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        onChange={(e) => onChange(e)}
                      >
                        <option selected>Tất cả</option>
                        {chatLieu.map((x) => (
                          <option
                            key={x.id}
                            value={x.id}
                          //style={{ backgroundColor: x.maMau, color: "white" }}
                          >
                            {x.ten}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center mt-10 mr-10">
                    <label
                      htmlFor="country"
                      className="pr-2 block text-sm font-medium leading-6 text-gray-900"
                    >
                      Thương hiệu :
                    </label>
                    <div className="flex">
                      <select
                        id="thuongHieu"
                        name="id_thuong_hieu"
                        autoComplete="country-name"
                        className="block w-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        onChange={(e) => onChange(e)}
                      >
                        <option selected>Tất cả</option>
                        {thuongHieu.map((x) => (
                          <option
                            key={x.id}
                            value={x.id}
                          //style={{ backgroundColor: x.maMau, color: "white" }}
                          >
                            {x.ten}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center mt-10 mr-10">
                    <label
                      htmlFor="country"
                      className="pr-2 block text-sm font-medium leading-6 text-gray-900"
                    >
                      Đế giày :
                    </label>
                    <div className="flex">
                      <select
                        id="deGiay"
                        name="id_de_giay"
                        autoComplete="country-name"
                        className="block w-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        onChange={(e) => onChange(e)}
                      >
                        <option selected>Tất cả</option>
                        {deGiay.map((x) => (
                          <option
                            key={x.id}
                            value={x.id}
                          //style={{ backgroundColor: x.maMau, color: "white" }}
                          >
                            {x.ten}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center mt-10 mr-10">
                    <label
                      htmlFor="country"
                      className="pr-2 block text-sm font-medium leading-6 text-gray-900"
                    >
                      Kích cỡ :
                    </label>
                    <div className="flex">
                      <select
                        id="kichCo"
                        name="id_kich_co"
                        autoComplete="country-name"
                        className="block w-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        onChange={(e) => onChange(e)}
                      >
                        <option selected>Tất cả</option>
                        {kichCo.map((x) => (
                          <option
                            key={x.id}
                            value={x.id}
                          //style={{ backgroundColor: x.maMau, color: "white" }}
                          >
                            {x.ten}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center mt-10 mr-10">
                    <label
                      htmlFor="country"
                      className="pr-2 block text-sm font-medium leading-6 text-gray-900"
                    >
                      Màu sắc :
                    </label>
                    <div className="flex">
                      <select
                        id="mauSac"
                        name="id_mau_sac"
                        autoComplete="country-name"
                        className="block w-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-xs sm:text-sm sm:leading-6"
                        onChange={(e) => onChange(e)}
                      >
                        <option selected>Tất cả</option>
                        {mauSac.map((x) => (
                          <option
                            key={x.id}
                            value={x.id}
                            className="py-2 px-4 flex items-center justify-between"
                          >
                            <span
                              className="inline-block w-3 h-3 rounded-full"
                              style={{ backgroundColor: "red" }}
                            />
                            <span className="ml-3">{x.ten}</span>
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="flex items-center mt-10 mr-10">
                    <label
                      htmlFor="country"
                      className="pr-2 block text-sm font-medium leading-6 text-gray-900"
                    >
                      Nhãn hiệu :
                    </label>
                    <div className="flex">
                      <select
                        id="nhanHieu"
                        name="id_nhan_hieu"
                        autoComplete="country-name"
                        className="block w-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        onChange={(e) => onChange(e)}
                      >
                        <option selected>Tất cả</option>
                        {nhanHieu.map((x) => (
                          <option
                            key={x.id}
                            value={x.id}
                          //style={{ backgroundColor: x.maMau, color: "white" }}
                          >
                            {x.ten}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center mt-10 mr-10">
                    <label
                      htmlFor="country"
                      className="pr-2 block text-sm font-medium leading-6 text-gray-900"
                    >
                      Thể loại :
                    </label>
                    <div className="flex">
                      <select
                        id="theLoai"
                        name="id_the_loai"
                        autoComplete="country-name"
                        className="block w-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        onChange={(e) => onChange(e)}
                      >
                        <option selected>Tất cả</option>
                        {chatLieu.map((x) => (
                          <option
                            key={x.id}
                            value={x.id}
                          //style={{ backgroundColor: x.maMau, color: "white" }}
                          >
                            {x.ten}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center mt-10 mr-10">
                    <label
                      htmlFor="country"
                      className="pr-2 block text-sm font-medium leading-6 text-gray-900"
                    >
                      Trạng thái :
                    </label>
                    <div className="flex">
                      <select
                        id="trangThai"
                        name="trangThai"
                        autoComplete="country-name"
                        className="block w-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        onChange={(e) => onChange(e)}
                      >
                        <option >Đang bán</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-10 mr-10">
                    <label
                      htmlFor="country"
                      className="pr-2 block text-sm font-medium leading-6 text-gray-900"
                    >
                      Khoảng giá :
                    </label>
                    <div className="flex p-5 w-[200px]">
                    <Slider 
                      label="Khoảng giá"
                      size="sm"
                      step={50} 
                      minValue={0} 
                      maxValue={2000}
                      defaultValue={[0, 2000]} 
                      className="max-w-md"
                    />
                    </div>
                  </div>
                </div>
            </div>

          </div>
          {/* <div className="">
            <div className="flex items-center">
              <Input
                isClearable
                className="w-72 sm:max-w-[30%]"
                placeholder="Tìm kiếm bất kỳ..."
                startContent={<SearchIcon />}
                value={filterValue}
                onClear={() => onClear()}
                onValueChange={onSearchChange}
              />
            </div>
            <div className="flex justify-center">
              <div className="flex items-center mt-10 mr-10">
                <label
                  htmlFor="country"
                  className="pr-2 block text-sm font-medium leading-6 text-gray-900"
                >
                  Chất liệu :
                </label>
                <div className="flex">
                  <select
                    id="thuongHieu"
                    name="id_thuong_hieu"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    onChange={(e) => onChange(e)}
                  >
                    <option selected>Tất cả</option>
                    {chatLieu.map((x) => (
                      <option
                        key={x.id}
                        value={x.id}
                        //style={{ backgroundColor: x.maMau, color: "white" }}
                      >
                        {x.ten}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-center mt-10 mr-10">
                <label
                  htmlFor="country"
                  className="pr-2 block text-sm font-medium leading-6 text-gray-900"
                >
                  Thương hiệu :
                </label>
                <div className="flex">
                  <select
                    id="thuongHieu"
                    name="id_thuong_hieu"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    onChange={(e) => onChange(e)}
                  >
                    <option selected>Tất cả</option>
                    {thuongHieu.map((x) => (
                      <option
                        key={x.id}
                        value={x.id}
                        //style={{ backgroundColor: x.maMau, color: "white" }}
                      >
                        {x.ten}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-center mt-10 mr-10">
                <label
                  htmlFor="country"
                  className="pr-2 block text-sm font-medium leading-6 text-gray-900"
                >
                  Đế giày :
                </label>
                <div className="flex">
                  <select
                    id="thuongHieu"
                    name="id_thuong_hieu"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    onChange={(e) => onChange(e)}
                  >
                    <option selected>Tất cả</option>
                    {deGiay.map((x) => (
                      <option
                        key={x.id}
                        value={x.id}
                        //style={{ backgroundColor: x.maMau, color: "white" }}
                      >
                        {x.ten}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-center mt-10 mr-10">
                <label
                  htmlFor="country"
                  className="pr-2 block text-sm font-medium leading-6 text-gray-900"
                >
                  Kích cỡ :
                </label>
                <div className="flex">
                  <select
                    id="thuongHieu"
                    name="id_thuong_hieu"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    onChange={(e) => onChange(e)}
                  >
                    <option selected>Tất cả</option>
                    {kichCo.map((x) => (
                      <option
                        key={x.id}
                        value={x.id}
                        //style={{ backgroundColor: x.maMau, color: "white" }}
                      >
                        {x.ten}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-center mt-10 mr-10">
                <label
                  htmlFor="country"
                  className="pr-2 block text-sm font-medium leading-6 text-gray-900"
                >
                  Màu sắc :
                </label>
                <div className="flex">
                  <select
                    id="thuongHieu"
                    name="id_thuong_hieu"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    onChange={(e) => onChange(e)}
                  >
                    <option selected>Tất cả</option>
                    {mauSac.map((x) => (
                      <option
                        key={x.id}
                        value={x.id}
                        //style={{ backgroundColor: x.maMau, color: "white" }}
                      >
                        {x.ten}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex items-center mt-10 mr-10">
                <label
                  htmlFor="country"
                  className="pr-2 block text-sm font-medium leading-6 text-gray-900"
                >
                  Thể loại :
                </label>
                <div className="flex">
                  <select
                    id="thuongHieu"
                    name="id_thuong_hieu"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    onChange={(e) => onChange(e)}
                  >
                    <option selected>Tất cả</option>
                    {chatLieu.map((x) => (
                      <option
                        key={x.id}
                        value={x.id}
                        //style={{ backgroundColor: x.maMau, color: "white" }}
                      >
                        {x.ten}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-center mt-10 mr-10">
                <label
                  htmlFor="country"
                  className="pr-2 block text-sm font-medium leading-6 text-gray-900"
                >
                  Trạng thái :
                </label>
                <div className="flex">
                  <select
                    id="thuongHieu"
                    name="id_thuong_hieu"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    onChange={(e) => onChange(e)}
                  >
                    <option selected>Tất cả</option>
                    <option>Đang bán</option>
                    <option>Ngừng bán</option>
                  </select>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <div className="mb-2 mt-10 justify-between border-b-[2px] font-normal border-gray-500 text-lg flex items-center">
          <div className="flex items-center">
            <HiOutlineClipboardList />
            <p className="ml-2 mt-1">Danh sách chi tiết sản phẩm</p>
          </div>
          <div className="flex items-center">
            <ButtonAntd
              type="primary"
              style={{
                backgroundColor: "#1976d2",
                marginBottom: "2px",
                color: "#fff",
                marginRight: "8px", // Adjust the margin as needed
              }}
            >
              Làm mới
            </ButtonAntd>
            <ButtonAntd
              type="primary"
              style={{
                backgroundColor: "#1976d2",
                marginBottom: "2px",
                color: "#fff",
              }}
            >
              <Link to={"/quan-ly-san-pham/san-pham"}>Quay lại</Link>
            </ButtonAntd>
          </div>
        </div>

        <Table
          style={{ height: "382px" }}
          aria-label="Example table with custom cells, pagination and sorting"
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          classNames={{
            wrapper: "max-h-[382px]",
          }}
          // selectedKeys={selectedKeys}
          selectionMode="multiple"
          // rowSelection={{
          //   columnTitle: "Chọn",
          //   fixed: false,
          //   checkStrictly: true,
          // }}
          sortDescriptor={sortDescriptor}
          topContent={topContent}
          topContentPlacement="outside"
          // onSelectionChange={setSelectedKeys}
          onSortChange={setSortDescriptor}
          onSelectionChange={(selectedKeys) => {
            let selectedCTSP = [];
            setSelectedKeys(selectedKeys);
            if (selectedKeys === "all") {
              selectedCTSP = sanPhams;
            } else {
              selectedCTSP = Array.from(selectedKeys).map(
                (id) => sanPhams[id - 1]
              );
            }
            setSelectedCTSP(selectedCTSP);
          }}
          onRowAction={() => {
            return;
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
      </div>
    </>
  );
}
