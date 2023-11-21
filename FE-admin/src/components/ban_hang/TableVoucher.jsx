import React from "react";
import { Tag, Modal } from "antd";
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
import { SearchIcon } from "../../common/otherComponents/SearchIcon";
import { ChevronDownIcon } from "../../common/otherComponents/ChevronDownIcon";
import { statusOptions } from "../../components/voucher/common/data";
import { capitalize } from "../../components/voucher/common/utils";
import { BiFilterAlt } from "react-icons/bi";
import FilterTrangThai from "../../common/filter/sanPham/FilterTrangThai";
import { Button as ButtonAntd } from "antd";
import { HiOutlineClipboardList } from "react-icons/hi";
import { Link } from "react-router-dom";
import { TbInfoTriangle } from "react-icons/tb";
import axios from "axios";
import { format } from "date-fns";
import { BsEye, BsTrash } from "react-icons/bs";
import Switch from "@mui/material/Switch";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "ma",
  "ten",
  "code",
  "ngayBatDau",
  "ngayKetThuc",
  "ngayTao",
  "actions"
];

export default function App({ activeKey, setVoucher, tongTien, setTongTien }) {
  const url = "http://localhost:8080/voucher/";
  const [loading, setLoading] = React.useState(true);
  const [action, setAction] = React.useState(true);

  const [list, setList] = React.useState([]);
  const sizes = ["md"];
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "ngayTao",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  const getData = async () => {
    await axios.get(url + "getVouchers").then((res) => {
      const rows = res.data
        .sort((a, b) => {
          const first = a.ngayTao;
          const second = b.ngayTao;
          const cmp = first < second ? -1 : first > second ? 1 : 0;
          return cmp;
        })
        .map((item, index) => {
          return {
            id: index + 1,
            ids: item.id,
            ma: item.ma,
            ten: item.ten,
            code: item.code,
            ngayBatDau: item.ngayBatDau,
            ngayKetThuc: item.ngayKetThuc,
            soLuong: item.soLuong,
            ngayTao: item.giaTriMax,
            giaTriMax: item.giaTriMax,
            trangThai: item.trangThai,
          };
        });
    //   console.log(rows);

      setList(rows);
      // console.log(rows);
      setLoading(false);
    });
  };

  React.useEffect(() => {
    getData();
  }, [list]);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...list];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.code.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.ten.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.ma.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }
    const data = filteredUsers.map((el, i) => {
      return {
        ...el,
        id: i + 1,
      };
    });
    // console.log(data);

    return data;
  }, [list, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    // const [sortDescriptor, setSortDescriptor] = React.useState({
    //   column: "ngayTao",
    //   direction: "descending",
    // });
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
      case "ngayBatDau":
        return <p>{format(new Date(cellValue), " hh:mm ,   dd-MM-yyyy")}</p>;

      case "ngayKetThuc":
        return <p>{format(new Date(cellValue), " hh:mm ,   dd-MM-yyyy")}</p>;
      case "ngayTao":
        return (
          <p style={{ color: "red" }}>
            {" "}
            {Intl.NumberFormat().format(cellValue)} ₫
          </p>
        );
    //   case "ngayTao":
    //     return <p>{format(new Date(cellValue), " hh:mm ,   dd-MM-yyyy")}</p>;
      case "trangThai":
        return cellValue === 1 ? (
          <Tag color="red">Kích Hoạt</Tag>
        ) : (
          <Tag color="green">Chưa Kích Hoạt</Tag>
        );
      case "actions":
        return (
            <div className="relative flex items-center gap-4">
            <Tooltip content="Chọn voucher" showArrow={true}>
              {/*  */}
              <div
                    className="p-2"
                    style={{
                      backgroundColor: "#00C5CD",
                      borderRadius: "5px",
                      color: "white",
                      cursor: "pointer",
                    }}
                    onClick={async() => {
                        await axios.put("http://localhost:8080/hoa_don_chi_tiet/addVC_HD", {
                            maHD : activeKey,
                            id_khach_hang : user.ids
                        })
                        .then((response) => {
                            setVoucher(user.giaTriMax);
                            setTongTien(tongTien - user.giaTriMax);
                            toast(`Chọn voucher thành công`);
                        })
                    }}
                  >
                    Chọn
              </div>
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
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          Tổng {list.length} sản phẩm
        </span>
        {/* <span className="w-[30%] text-small text-default-400">
        {selectedKeys === "all"
          ? "Đã chọn tất cả"
          : `${selectedKeys.size} khyến mại đã được chọn`}
      </span> */}
        {/* <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        page={page}
        total={totalPages}
        initialPage={1}
        style={{paddingLeft : "730px"}}
        onChange={setPage}
      /> */}
        <div className="flex flex-wrap gap-4 items-center">
          {sizes.map((size) => (
            <Pagination
              isCompact
              showControls
              key={size}
              // style={{ paddingLeft: "710px" }}
              total={totalPages + 1}
              initialPage={1}
              size={size}
              page={page}
              onChange={setPage}
            />
          ))}
        </div>
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
      {loading ? (
        <div style={{ marginLeft: "50%", marginTop: "25%" }}>
          <Spinner size="lg" label="Loading..." color="warning" />
        </div>
      ) : (
        <div>
          <div>
            <div className="mb-2 border-b-[1px] font-normal  border-gray-500 text-lg flex items-center">
              <BiFilterAlt />
              <p className="ml-2 mt-1"> Bộ lọc</p>
            </div>

            <div
              className="grid drop-shadow-lg grid-cols-1 md:grid-cols-3 gap-4"
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
              <div className="p-5 ml-32">
                <Input
                  isClearable
                  className="w-full "
                  placeholder="Tìm kiếm bất kỳ..."
                  startContent={<SearchIcon />}
                  value={filterValue}
                  onClear={() => onClear()}
                  onValueChange={onSearchChange}
                />
              </div>
              <div className="p-5">
                <div className="flex items-center">
                  <span className="pr-2">Trạng thái:</span>
                  <FilterTrangThai style={{ width: "100%" }} />
                </div>
              </div>
              <div className="p-5">
                {/* <Slider style={{ width: "100%" }} /> */}
                <Slider
                  label="Price Range"
                  step={50}
                  minValue={0}
                  maxValue={1000}
                  defaultValue={[100, 500]}
                  formatOptions={{ style: "currency", currency: "USD" }}
                  className="max-w-md"
                />
              </div>
              <div className="p-5 text-center mt-4">
                <ButtonAntd
                  type="primary"
                  style={{
                    backgroundColor: "#1976d2",
                    marginBottom: "2px",
                    marginLeft: "150%",
                  }}
                >
                  Làm mới
                </ButtonAntd>
              </div>
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
              <Link to={"/add-voucher"}>+ Tạo voucher</Link>
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
                  emptyContent={"Không tìm thấy voucher nào!"}
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
  { uid: "id", name: "Stt", sortable: true },
  { uid: "ma", name: "Mã", sortable: true },
  { uid: "ten", name: "Tên", sortable: true },
  { uid: "code", name: "Code" },
  { uid: "ngayBatDau", name: "Ngày Bắt Đầu", sortable: true },
  { uid: "ngayKetThuc", name: "Ngày Kết Thúc", sortable: true },
  { uid: "soLuong", name: "Số Lượng", sortable: true },
  { uid: "ngayTao", name: "Giá trị giảm", sortable: true },
  { uid: "giaTriMax", name: "Giá trị tối đa", sortable: true },
  { uid: "trangThai", name: "Trạng Thái" },
  { uid: "actions", name: "Thao Tác" }
];
