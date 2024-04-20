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
  Slider,
} from "@nextui-org/react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TableCell as TableCellMui,
} from "@mui/material";

import { TbInfoTriangle } from "react-icons/tb";
import axios from "axios";
import { toast } from "react-toastify";
import { getAllKMSPCT } from "../../api/khuyenMai/KhuyenMaiApi";
import numeral from "numeral";
import { InputNumber } from "antd";
import { Modal } from "antd";
import { SearchIcon } from "../../common/otherComponents/SearchIcon";
import { ChevronDownIcon } from "../../common/otherComponents/ChevronDownIcon";
import { capitalize } from "../../common/otherComponents/utils";

const columns = [
  { name: "STT", uid: "stt", sortable: true },
  { name: "Ảnh", uid: "hinhAnh", sortable: true },
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
  "kichThuoc",
  "mauSac",
  "deGiay",
  "soLuongTon",
  "donGia",
  "trangThai",
  "hanhDong",
];

export default function TableSanPham({
  gioHang,
  setIsModalOpenThem,
  getInfoHD,
}) {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [totalPages, setTotalPages] = React.useState(1);
  const [soLuongSP, setSoLuongSP] = useState({});
  const [soLuongDat, setSoLuongDat] = useState("");
  const [isModalOpenThemSL, setIsModalOpenThemSL] = useState(false);

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
  const showModalThemSL = () => {
    setIsModalOpenThemSL(true);
  };
  const handleOkThemSL = async () => {
    // localStorage.setItem("gioHang"+gioHang,soLuongSP.id)
    // localStorage.setItem("soLuongDat",soLuongDat)
    console.log(gioHang);
    console.log(soLuongSP.id);
    console.log(soLuongDat);

    await axios
      .post("http://localhost:8080/hoa_don_chi_tiet/addHDCT", {
        id_hoa_don: gioHang,
        id_san_pham: soLuongSP.id,
        so_luong: soLuongDat,
      })
      .then((response) => {
        toast("🎉 Thêm thành công");
        setIsModalOpenThem(false);
        getInfoHD();
        cancelDelete();
      })
      .catch((error) => {
        toast(error);
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

  const [sanPham, setSanPham] = useState({
    id_mau_sac: "",
    id_kich_co: "",
    id_chat_lieu: "",
    id_de_giay: "",
    id_thuong_hieu: "",
    id_nhan_hieu: "",
    trangThai: "",
    maSP: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;

    setSanPham((prevSanPham) => ({
      ...prevSanPham,
      [name]: value,
    }));
  };
  //load table khi loc
  const fetchData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/filterSPCT",
        sanPham
      );
      const updatedRows = response.data.map((item, index) => ({
        id: item.id,
        stt: index + 1,
        tenSanPham: item.ten,
        hinhAnh: item.defaultImg,
        mauSac: item.id_mau_sac.maMau,
        kichThuoc: item.id_kich_co.ten,
        soLuongTon: item.soLuongTon,
        deGiay: item.id_de_giay.ten,
        giaBan: item.giaBan,
        trangThai: item.trangThai == 1 ? "Đang bán" : "Ngừng bán",
        giaGiam: kmspcts.find((x) => x.id_chi_tiet_san_pham.id == item.id)
          ?.id_khuyen_mai.giaTriPhanTram,
      }));

      setSanPhams(updatedRows);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [sanPham]);

  const url = `http://localhost:8080/getAllSPCT`;
  React.useEffect(() => {
    async function fetchChiTietSanPham() {
      try {
        const response = await axios.get(url);

        const updatedRows = response.data.map((item, index) => ({
          id: item.id,
          stt: index + 1,
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

  const pages = Math.ceil(
    filteredItems.length != 0 ? filteredItems.length / rowsPerPage : 1
  );

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

      switch (columnKey) {
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
              <DiscountTag
                discount={
                  kmspcts.find((x) => x.id_chi_tiet_san_pham.id == sanPham.id)
                    ?.id_khuyen_mai.giaTriPhanTram
                }
              />
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
                    onClick={() => {
                      showModalThemSL();
                      setSoLuongSP({
                        id: sanPham.id,
                        soLuongTon: sanPham.soLuongTon,
                      });
                    }}
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
    },
    [sanPham, sanPhams]
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
                  <option>Đang bán</option>
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
                  defaultValue={[100, 500]}
                  className="max-w-md"
                />
              </div>
            </div>
          </div>
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
        style={{ height: "352px" }}
        aria-label="Example table with custom cells, pagination and sorting"
        // isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[332px]",
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
          <p>Nhập số lượng sản phẩm</p>
          <InputNumber
            onChange={(value) => {
              if (value > soLuongSP.soLuongTon) {
                setSoLuongDat(soLuongSP.soLuongTon);
              } else {
                setSoLuongDat(value);
              }
            }}
            max={soLuongSP.soLuongTon}
          />
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
