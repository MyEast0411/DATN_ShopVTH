import React, { useState } from "react";
import {
  Tooltip,
  Tag,
  Modal,
  DatePicker,
  Button as ButtonAntd,
  Select,
} from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  Pagination,
  Spinner,
  user,
  Slider,
  Image,
} from "@nextui-org/react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TableCell as TableCellMui,
} from "@mui/material";
import { SearchIcon } from "../components/voucher/common/SearchIcon";
import { ChevronDownIcon } from "../components/voucher/common/ChevronDownIcon";
import { statusOptions } from "../components/voucher/common/data";
import { capitalize } from "../components/voucher/common/utils";
import { BiFilterAlt } from "react-icons/bi";
// import Slider from "../common/filter/sanPham/Slider";
import { HiOutlineClipboardList } from "react-icons/hi";
import { Link } from "react-router-dom";
import { TbInfoTriangle } from "react-icons/tb";
import axios from "axios";
import { format } from "date-fns";
import Switch from "@mui/material/Switch";
import moment from "moment";
import { DeleteIcon } from "../common/otherComponents/DeleteIcon";
import { EyeIcon } from "../common/otherComponents/EyeIcon";
// import { setOptions } from "react-chartjs-2/dist/utils";
const { RangePicker } = DatePicker;

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};
// const columns = [
//   { uid: "id", name: "Stt" },
//   { uid: "ma", name: "Mã" },
//   { uid: "ten", name: "Tên" },
//   { uid: "code", name: "Code" },
//   { uid: "ngayBatDau", name: "Ngày Bắt Đầu" },
//   { uid: "ngayKetThuc", name: "Ngày Kết Thúc" },
//   { uid: "soLuong", name: "Số Lượng" },
//   { uid: "ngayTao", name: "Ngày Tạo" },
//   { uid: "giaTriMax", name: "Giá trị tối đa" },
//   { uid: "trangThai", name: "Trạng Thái" },
//   { uid: "actions", name: "Thao Tác" },
//   { uid: "changeHD", name: "Hoạt Động" },
// ];

const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "hinhAnh",
  "ma",
  "ten",
  "code",
  "ngayBatDau",
  "ngayKetThuc",
  "giaTriMax",
  "ngayTao",
  "trangThai",
  "actions",
  "changeHD",
];

export default function Voucher() {
  const url = "http://localhost:8080/voucher/";
  const [loading, setLoading] = React.useState(true);
  const [action, setAction] = React.useState(true);

  const [list, setList] = React.useState([]);
  const sizes = ["md"];

  const [dataSelect, setDataSelect] = useState(-1);
  const [ngayBatDau, setNgayBatDau] = useState("");
  const [ngayKetThuc, setNgayKetThuc] = useState("");
  const [priceOptions, setPriceOptions] = useState([]);

  const onChangeDatePicker = (value, dateString) => {
    console.log("Data: " + dateString);
    // console.log("Ngay bat dau: " + typeof dateString[0]);
    if (dateString[0] !== "" || dateString[1] !== "") {
      let nbd = moment(dateString[0], "DD-MM-YYYY HH:mm").valueOf();
      let nkt = moment(dateString[1], "DD-MM-YYYY HH:mm").valueOf();
      console.log(nbd);
      console.log(nkt);
      setNgayBatDau(nbd);
      setNgayKetThuc(nkt);
    } else {
      setNgayBatDau("");
      setNgayKetThuc("");
    }
  };  

  const onChangeSideBar = async (selectedValue) => {
    if (selectedValue == 0) {
      getData();
    } else {
      const res = await axios.post(`http://localhost:8080/voucher/filterVoucher`, {
        selectedStatus: dataSelect,
        textInput: filterValue == "" ? null : filterValue,
        gia : selectedValue,
      });
      setList(
        res.data.map((item, index) => {
          return {
            id: index + 1,
            ids: item.id,
            ma: item.ma,
            ten: item.ten,
            code: item.code,
            ngayBatDau: item.ngayBatDau,
            ngayKetThuc: item.ngayKetThuc,
            soLuong: item.soLuong,
            ngayTao: item.ngayTao,
            giaTriMax: item.giaTriMax,
            trangThai: item.trangThai,
            hinhAnh: item.hinhAnh,
          };
        })
      );
      setLoading(false);
    }
  };

  const handleChange = (value) => {
    setDataSelect(value);
  };

  const getData = async () => {
    await axios.get(url + "getVouchers").then((res) => {
      // filterOptions(res.data)

      setList(
        res.data.map((item, index) => {
          return {
            id: index + 1,
            ids: item.id,
            ma: item.ma,
            ten: item.ten,
            code: item.code,
            ngayBatDau: item.ngayBatDau,
            ngayKetThuc: item.ngayKetThuc,
            soLuong: item.soLuong,
            ngayTao: item.ngayTao,
            giaTriMax: item.giaTriMax,
            trangThai: item.trangThai,
            hinhAnh: item.hinhAnh,
          };
        })
      );
      res.data.join();
      res.data.sort((a, b) => a?.giaTriMax - b?.giaTriMax);

      // console.log(
      //   res.data[0]?.giaTriMax,
      //   res.data[res.data.length - 1]?.giaTriMax
      // );
      setPriceOptions(
        res.data[0]?.giaTriMax,
        res.data[res.data.length - 1]?.giaTriMax
      );

      // console.log(rows);
      setLoading(false);
    });
  };

  const filterOptions = (data) => {
    return data
      .filter((voucher) => {
        if (filterValue === "") return voucher;
        if (
          voucher.code.toLowerCase().includes(filterValue.toLowerCase()) ||
          voucher.ten.toLowerCase().includes(filterValue.toLowerCase()) ||
          voucher.ma.toLowerCase().includes(filterValue.toLowerCase())
        )
          return voucher;
      })
      .filter((voucher) => {
        if (dataSelect === -1) return voucher;
        if (voucher.trangThai === dataSelect) return voucher;
      })
      .filter((voucher) => {
        var ndata = Date.parse(new Date(voucher.ngayTao));
        if (ngayBatDau === "" || ngayKetThuc === "") return voucher;
        if (ngayBatDau <= ndata && ngayKetThuc >= ndata) return voucher;
      });
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: `bạn có muốn xóa  voucher không ?`,
      okText: "Yes",
      okType: "danger",
      onOk: async () => {
        axios
          .delete(url + `delete/${id}`)
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

  React.useEffect(() => {
    getData();
  }, [action]);

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...list];

    filteredUsers = filterOptions(filteredUsers);
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }

    return filteredUsers;
  }, [list, filterValue, statusFilter, ngayBatDau, ngayKetThuc, dataSelect]);

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

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "hinhAnh":
        var hinhAnhURL = user.hinhAnh;

        return (
          <Image
            style={{
              height: "80px",
              width: "80px",
            }}
            src={hinhAnhURL}
            alt={user?.hinhAnh || "Ảnh sản phẩm"}
            classNames="m-5"
          />
        );

      case "ngayBatDau":
        return (
          <p>
            {moment(new Date(cellValue)).format("  HH:mm:ss   , DD-MM-YYYY")}
          </p>
        );

      case "ngayKetThuc":
        return (
          <p>
            {moment(new Date(cellValue)).format("  HH:mm:ss   , DD-MM-YYYY")}
          </p>
        );
      case "giaTriMax":
        return (
          <p style={{ color: "red" }}>
            {" "}
            {Intl.NumberFormat().format(cellValue)} ₫
          </p>
        );
      case "ngayTao":
        return (
          <p>
            {moment(new Date(cellValue)).format("  HH:mm:ss   , DD-MM-YYYY")}
          </p>
        );
      case "trangThai":
        return cellValue === 1 ? (
          <Tag color="green">Hoạt động</Tag>
        ) : (
          <Tag color="red">Dừng hoạt động</Tag>
        );

      case "actions":
        return (
          <div className="container">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Tooltip title="Xem chi tiết" color="green">
                  <Link
                    to={`/giam-gia/voucher/detail-voucher/${user.ids}`}
                    className="button-link group relative"
                  >
                    <EyeIcon
                      description="Chi tiết"
                      className="cursor-pointer text-xl blue-hover mr-4"
                      style={{ color: "green" }}
                    />
                  </Link>
                </Tooltip>
              </div>
              <div>
                <Tooltip title="Xóa voucher" color="red">
                  <Link onClick={() => handleDelete(user.ids)}>
                    <DeleteIcon
                      description="Chi tiết"
                      className="cursor-pointer text-xl blue-hover mr-4"
                      style={{ color: "red" }}
                    />
                  </Link>
                </Tooltip>
              </div>
            </div>
          </div>
        );
      case "changeHD":
        return (
          <div className="pt-3">
            <Tooltip title="cập nhật trạng thái" color="blue">
              <Switch
                disabled={
                  new Date().getTime() > new Date(user.ngayKetThuc).getTime()
                    ? true
                    : false
                }
                checked={user.trangThai === 1 ? true : false}
                onChange={() => {
                  Modal.confirm({
                    title: `bạn có muốn ${
                      user.trangThai == 1 ? "hủy" : " "
                    } kích hoạt voucher không ?`,
                    okText: "Yes",
                    okType: "danger",
                    onOk: async () => {
                      axios
                        .put(url + `update-trang-thai/${user.ids}`)
                        .then((response) => {
                          setAction(() => !action);
                          toast.success(`Update thành công`, {
                            position: "top-right",
                            autoClose: 2000,
                          });
                        })
                        .catch((e) =>
                          toast.error(`Update  thất bại`, {
                            position: "top-right",
                            autoClose: 2000,
                          })
                        );
                    },
                    okCancel: () => {
                      alert("cancelText");
                    },
                  });
                }}
              />
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
    list.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      list.length > 0 && (
        <div className="py-2 px-2 flex justify-between items-center">
          <span className="w-[30%] text-small text-default-400">
            Tổng số phiếu giảm giá :{" "}
            <span className="font-medium text-gray-950">{list.length}</span>
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
              Previous
            </Button>
            <Button
              isDisabled={pages === 1}
              size="sm"
              variant="flat"
              onPress={onNextPage}
            >
              Next
            </Button>
          </div>
        </div>
      )
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <>
      {loading ? (
        <div style={{ marginLeft: "50%", marginTop: "25%" }}>
          <Spinner size="lg" label="Loading..." color="warning" />
        </div>
      ) : (
        <div>
          <h2 className="mb-5 font-bold text-2xl">Quản Lý Phiếu Giảm Giá</h2>
          <div>
            <div className="mb-2 border-b-[1px] font-normal  border-gray-500 text-lg flex items-center">
              <BiFilterAlt />
              <p className="ml-2 mt-1"> Bộ lọc</p>
            </div>

            <div
              className=""
              style={{
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "8px",
                width: "100%",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.2s",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="p-5 ml-32 flex gap-10">
                <div className="w-1/2">
                  {" "}
                  <Input
                    isClearable
                    placeholder="Tìm kiếm bất kỳ..."
                    startContent={<SearchIcon />}
                    value={filterValue}
                    onClear={() => onClear()}
                    onValueChange={onSearchChange}
                  />
                </div>
                <div className="w-1/2">
                  <p className="mb-1 font-bold">Tình Trạng</p>
                  <Select
                    defaultValue="Tất cả"
                    className="w-full"
                    // style={{ width: "100%" }}
                    onChange={handleChange}
                    // allowClear
                    options={options}
                  />
                </div>
              </div>

              <div className="p-5 ml-32 flex gap-10">
                <div className="w-1/2">
                  <p className="mb-1 font-bold">Giá trị voucher</p>
                  <Slider
                    label="Giá trị(VND)"
                    step={5000}
                    minValue={0}
                    maxValue={priceOptions}
                    defaultValue={0}
                    onChange={onChangeSideBar}
                    formatOptions={{ style: "currency", currency: "VND" }}
                    className="max-w-md"
                  />
                </div>
                <div className="w-1/2">
                  <p className="mb-2 font-bold">Tìm kiếm theo ngày</p>
                  <RangePicker
                    showTime={{ format: "HH:mm" }}
                    format="DD-MM-YYYY HH:mm"
                    className="w-full"
                    onChange={onChangeDatePicker}
                  />
                </div>
              </div>
              {/* <div className="w-full">
                <div className="p-5 text-center mt-4">
                  <ButtonAntd
                    type="primary"
                    style={{
                      backgroundColor: "#1976d2",
                    }}
                  >
                    Làm mới
                  </ButtonAntd>
                </div>
              </div> */}
            </div>
          </div>

          <div className="mb-2 mt-10 justify-between border-b-[2px] font-normal border-gray-500 text-lg	flex items-center">
            <div className="flex items-center">
              <HiOutlineClipboardList />
              <p className="ml-2 mt-1"> Danh sách phiếu giảm giá</p>
            </div>

            <ButtonAntd
              type="primary"
              style={{
                backgroundColor: "#1976d2",
                marginBottom: "2px",
              }}
            >
              <Link to={"/add-voucher"}>+ Tạo phiếu giảm giá</Link>
            </ButtonAntd>
          </div>
          <div
            className="drop-shadow-lg font-normal border-gray-500 text-lg	"
            style={{
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "8px",
              width: "100%",
              paddingLeft: "10px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.2s",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <Table
                style={{ height: "382px" }}
                aria-label="Example table with custom cells, pagination and sorting"
                isHeaderSticky
                bottomContent={bottomContent}
                bottomContentPlacement="outside"
                classNames={{
                  wrapper: "max-h-[382px] p-0",
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
                      align={column.uid === "actions" ? "center" : "start"}
                      allowsSorting={column.sortable}
                    >
                      {column.name}
                    </TableColumn>
                  )}
                </TableHeader>
                <TableBody
                  emptyContent={"Không tìm thấy voucher nào 😞😞😞😞!"}
                  items={items}
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
              <Dialog
              // open={deleteConfirmationOpen}
              // onClose={cancelDelete}
              // fullWidth
              >
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
                  {/* <Button onClick={cancelDelete} color="warning"> */}
                  <Button color="warning">Hủy</Button>
                  <Button color="primary">Vẫn xóa</Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const columns = [
  { uid: "id", name: "STT", sortable: true },
  { uid: "hinhAnh", name: "Hình Ảnh" },
  { uid: "ma", name: "Mã", sortable: true },
  { uid: "ten", name: "Tên", sortable: true },
  { uid: "code", name: "Code" },
  { uid: "ngayBatDau", name: "Ngày Bắt Đầu", sortable: true },
  { uid: "ngayKetThuc", name: "Ngày Kết Thúc", sortable: true },
  { uid: "soLuong", name: "Số Lượng", sortable: true },
  { uid: "ngayTao", name: "Ngày Tạo", sortable: true },
  { uid: "giaTriMax", name: "Giá trị tối đa", sortable: true },
  { uid: "trangThai", name: "Trạng Thái" },
  { uid: "actions", name: "Thao Tác" },
  { uid: "changeHD", name: "Hoạt Động" },
];

const options = [
  { value: -1, label: "Tất cả" },
  { value: 0, label: " Dừng Hoạt động" },
  { value: 1, label: " Hoạt Động" },
];
