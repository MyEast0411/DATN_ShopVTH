import React, { useEffect, useState } from "react";

//filter
import FilterTrangThai from "../common/filter/sanPham/FilterTrangThai";
import axios from "axios";

import { Button as ButtonAntd, Modal, Form, Col, Row } from "antd";
import { Link } from "react-router-dom";

//loading
import TailSpinLoading from "../components/loading/TailSpinLoading";

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
  Slider,
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

//icon
import { BiFilterAlt } from "react-icons/bi";
import { ChevronDownIcon } from "../common/otherComponents/ChevronDownIcon";
import { SearchIcon } from "../common/otherComponents/SearchIcon";
import { capitalize } from "../common/otherComponents/utils";
import { TbInfoTriangle } from "react-icons/tb";
import { toast } from "react-toastify";

import { DeleteIcon } from "../common/otherComponents/DeleteIcon";
import { EyeIcon } from "../common/otherComponents/EyeIcon";
import { HiOutlineClipboardList } from "react-icons/hi";

//other
import convert from "color-convert";

const columns = [
  { name: "STT", uid: "stt", sortable: true },
  { name: "Mã", uid: "ma", sortable: true },
  { name: "Tên", uid: "ten", sortable: true },
  { name: "Trạng thái", uid: "trangThai", sortable: true },
  { name: "Hành Động", uid: "hanhDong" },
];

const statusOptions = [
  { name: "Hoạt động", uid: "Hoạt động" },
  { name: "Không hoạt động", uid: "Hoạt động" },
];

const statusColorMap = {
  active: "success",
  paused: "danger",
  incoming: "warning",
};
statusColorMap["Hoạt động"] = "success";
statusColorMap["Không hoạt động"] = "danger";

const INITIAL_VISIBLE_COLUMNS = [
  "stt",
  "ma",
  "ten",
  "trangThai",
  "hanhDong",
];
export default function ChatLieu() {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [totalPages, setTotalPages] = React.useState(1);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleDelete = (idToDelete) => {
    setIdToDelete(idToDelete);
    setDeleteConfirmationOpen(true);
  };

  const cancelDelete = () => {
    setIdToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const confirmDelete = async () => {
    console.log(idToDelete);
    if (idToDelete) {
      await axios
        .put(`http://localhost:8080/mau-sac/deleteMauSac/${idToDelete}`)
        .then((response) => {
          toast("🎉 Xóa thành công");
          fetchChiTietSanPham();
          cancelDelete();
        })
        .catch((error) => {
          toast("😢 Xóa thất bại");
        });
      cancelDelete();
    }
  };

  const getColorName = (colorCode) => {
    try {
      const hexCode = colorCode.replace("#", "").toUpperCase();
      const rgb = convert.hex.rgb(hexCode);
      const colorName = convert.rgb.keyword(rgb);
      if (colorName === null) {
        return "Unknown"; // Trường hợp không tìm thấy tên màu
      } else {
        return colorName; // Trả về tên màu
      }
    } catch (error) {
      console.log(error);
      return "Không tìm thấy màu sắc";
    }
    
  };
  
  const sizes = ["md"];
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
  const url = "http://localhost:8080/mau-sac/getAllMauSac";

  async function fetchChiTietSanPham() {
    try {
      const response = await axios.get(url);
      const updatedRows = response.data.map((item, index) => ({
        id: item.id,
        stt: index + 1,
        ma: item.maMau,
        ten: item.ten,
        trangThai: item.deleted == 1 ? "Hoạt động" : "Không hoạt động",
      }));
      setSanPhams(updatedRows);
    } catch (error) {
      console.error("Lỗi khi gọi API: ", error);
    }
  }
  React.useEffect(() => {
    fetchChiTietSanPham();
  }, []);

  const onChange = (e) => {
    setKichCo({ ...kichCo, [e.target.name]: e.target.value });
  };
  const onChangeDetail = (e) => {
    setKichCoDetail({ ...kichCoDetail, [e.target.name]: e.target.value });
  };
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

  const pages = Math.ceil(filteredItems.length != 0 ? filteredItems.length / rowsPerPage : 1);

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
    switch (columnKey) {
      case "ma":
        return (
          <Tooltip content={sanPham.ma} showArrow={true}>
            <Chip
              color="white"
              style={{
                backgroundColor: sanPham.ma,
                color: sanPham.ma,
                fontSize: "13px",
                textAlign: "center",
                padding: "1px 6px",
                borderRadius: "5px",
                border: "1px solid #CCC",
                width: "150px",
                cursor: "pointer"
              }}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          </Tooltip>
        );
      case "trangThai":
        return (
          <Chip
            color={statusColorMap[sanPham.trangThai]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "hanhDong":
        return (
          <div className="relative flex items-center gap-4" >
            <Tooltip content="Chi tiết" showArrow={true}>
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => showModalDetailKichCo(sanPham.id)}>
                <EyeIcon />
              </span>
            </Tooltip>

            <div className="group relative" style={{ position: "relative" }}>
              <Tooltip color="danger" content="Xóa" showArrow={true}>
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon onClick={() => handleDelete(sanPham.id)} />
                </span>
              </Tooltip>
            </div>
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
          <div className="flex gap-3 items-end">
            <Dropdown>
              {/* <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Trạng thái
                </Button>
              </DropdownTrigger> */}
              {/* <DropdownMenu
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
              </DropdownMenu> */}
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
    sanPhams.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          Tổng {sanPhams.length} màu sắc
        </span>
        <div className="flex flex-wrap gap-4 items-center">
          {sizes.map((size) => (
            <Pagination
              isCompact
              showControls
              key={size}
              // style={{ paddingLeft: "710px" }}
              total={pages}
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

  const [isModalAddKichCo, setIsModalAddKichCo] = useState(false);
  const [kichCo, setKichCo] = useState({
    maMau: "",
    ten: ""
  });

  const showModalAddKichCo = () => {
    setIsModalAddKichCo(true);
  };
  const handleOkAddKichCo = async () => {
    setLoading(true);
    console.log(kichCo);
    try {
      await form.validateFields();

      await axios
        .post("http://localhost:8080/mau-sac/addMauSac", kichCo)
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            toast.success(`Thêm thành công`, {
              position: "top-right",
              autoClose: 2000,
            });
            setLoading(false);
            setIsModalAddKichCo(false);
            fetchChiTietSanPham();
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error(`${error.response.data}`, {
            position: "top-right",
            autoClose: 2000,
          });
          setLoading(false);
          setIsModalAddKichCo(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

  };
  const handleCancelAddKichCo = () => {
    setIsModalAddKichCo(false);
  };

  const [initValue, setInitialValue] = useState({});
  const [isModalDetailKichCo, setIsModalDetailKichCo] = useState(false);
  const [kichCoDetail, setKichCoDetail] = useState({
    id: "",
    ma: "",
    ten: "",
    ngay_tao: "",
    nguoi_tao: "",
    nguoi_sua: "",
    ngay_sua: "",
    deleted: ""
  });

  const showModalDetailKichCo = async (value) => {
    console.log(value);
    setIsModalDetailKichCo(true);
    await axios.get(`http://localhost:8080/mau-sac/getByMa/${value}`)
      .then((res) => {
        console.log(res.data);
        setKichCoDetail({
          id: res.data.id,
          maMau: res.data.maMau,
          ten: res.data.ten,
          ngay_tao: res.data.ngayTao,
          nguoi_tao: res.data.nguoiTao,
          nguoi_sua: res.data.nguoiSua,
          ngay_sua: res.data.ngaySua,
          deleted: res.data.deleted == 1 ? "Hoạt động" : "Ngừng hoạt động"
        });
        setInitialValue({
          id: res.data.id,
          maMau: res.data.maMau,
          ten: res.data.ten,
          ngay_tao: res.data.ngayTao,
          nguoi_tao: res.data.nguoiTao,
          nguoi_sua: res.data.nguoiSua,
          ngay_sua: res.data.ngaySua,
          deleted: res.data.deleted == 1 ? "Hoạt động" : "Ngừng hoạt động"
        });
      }).catch((error) => {
        console.log(error);
      })

  };

  const handleCancelDetailKichCo = () => {
    setIsModalDetailKichCo(false);
  };

  const handleOkDetailKichCo = async () => {
    setLoading(true);
    try {
      await form.validateFields();

      await axios
        .put("http://localhost:8080/mau-sac/updateMauSac", {
          id: kichCoDetail.id,
          ten: kichCoDetail.ten,
          ma: kichCoDetail.ma
        })
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            toast.success(`Cập nhật thành công thành công`, {
              position: "top-right",
              autoClose: 2000,
            });
            setTimeout(() => {
              setLoading(false);
            }, 1000);

            fetchChiTietSanPham();
          }
        })
        .catch((error) => {
          toast.error(error.data, {
            position: "top-right",
            autoClose: 2000,
          });
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

    setIsModalDetailKichCo(false);
  };

  useEffect(() => {
    form.resetFields();
  }, [initValue]);
  return (
    <>
      {/* {loading ? ( <TailSpinLoading/> ) :  */}
      <div>
        {loading && <TailSpinLoading />}
        <h2 className="mb-5 font-bold text-2xl">Quản Lý Màu Sắc</h2>
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
              height: "190px",
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
              {/* <Slider
                label="Khoảng chất liệu"
                size="sm"
                step={1}
                minValue={0}
                maxValue={50}
                defaultValue={[0, 50]}
                className="max-w-md w-1/2"
              /> */}
            </div>
          </div>
        </div>

        <div className="mb-2 mt-10 justify-between border-b-[2px] font-normal border-gray-500 text-lg	flex items-center">
          <div className="flex items-center">
            <HiOutlineClipboardList />
            <p className="ml-2 mt-1"> Danh sách màu sắc</p>
          </div>

          <ButtonAntd
            type="primary"
            style={{
              backgroundColor: "#1976d2",
              marginBottom: "2px",
            }}
            onClick={showModalAddKichCo}
          >
            + Tạo màu sắc
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
                emptyContent={"Không tìm thấy màu sắc nào!"}
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
              open={deleteConfirmationOpen}
              onClose={cancelDelete}
              fullWidth
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
                  Bạn có chắc muốn xóa màu sắc này?
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
            <Modal
              title="Thêm màu sắc"
              visible={isModalAddKichCo}
              onCancel={() => setIsModalAddKichCo(false)}
              footer={[
                <Button key="cancel" onClick={() => setIsModalAddKichCo(false)}>
                  Hủy
                </Button>,
                <Button key="submit" type="primary" onClick={handleOkAddKichCo}>
                  Thêm
                </Button>
              ]}
            >
              <Form form={form} layout="vertical" initialValues={kichCo}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Bảng màu"
                      name="code"
                      rules={[
                        { required: true, message: "Vui lòng chọn màu" },
                        { max: 50, message: "Tên màu sắc tối đa 50 ký tự" },
                      ]}
                    >
                      <Input
                        type="color"
                        style={{ height: "200px", marginTop : "150px" }}
                        onChange={(e) => {
                          const maMau = e.target.value;
                          const tenMau = getColorName(maMau);
                          setKichCo({
                            maMau : maMau,
                            ten : tenMau
                          })
                          form.setFieldsValue({ name: 'Màu ' + tenMau }); // Cập nhật giá trị cho trường "Tên màu sắc"
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Mã màu sắc"
                      name="code"
                      rules={[
                        { required: true, message: "Vui lòng nhập mã màu" },
                        { max: 50, message: "Tên màu sắc tối đa 50 ký tự" },
                      ]}
                    >
                      <Input placeholder="Tên mã màu" style={{ height: "40px" }} onChange={(e) => {
                          const maMau = e.target.value;
                          const tenMau = getColorName(maMau);
                          setKichCo({
                            maMau : maMau,
                            ten : tenMau
                          })
                          form.setFieldsValue({ name: 'Màu ' + tenMau });
                        }}/>
                    </Form.Item>
                    <Form.Item
                      label="Tên màu sắc"
                      name="name"
                      readOnly
                      rules={[
                        { required: true, message: "Vui lòng nhập tên màu" },
                        { max: 50, message: "Tên màu sắc tối đa 50 ký tự" },
                      ]}
                    >
                      <Input placeholder="Tên màu sắc" style={{ height: "40px" }} />
                    </Form.Item>
                    
                  </Col>
                </Row>
              </Form>
            </Modal>

            <Modal
              title="Chi tiết màu sắc"
              open={isModalDetailKichCo}
              onOk={handleOkDetailKichCo}
              onCancel={handleCancelDetailKichCo}
              cancelText="Hủy"
              okText="Hoàn tất"
              style={{ position: "relative" }}
            >
              <Form form={form} initialValues={initValue}>
                <div>
                  <label htmlFor="ma" className="block text-sm font-medium leading-6 text-gray-900">
                    Mã màu sắc
                  </label>
                  <Form.Item
                    name="maMau"
                    rules={[
                      {
                        required: true,
                        message: "Mã màu sắc không được để trống!",
                      }
                    ]}>
                    <Input
                      value={kichCoDetail?.maMau}
                      name="maMau"
                      placeholder="Nhập mã màu sắc"
                      style={{ borderRadius: "5px" }}
                      onChange={onChangeDetail}
                    />
                  </Form.Item>
                  <label htmlFor="ten" className="block text-sm font-medium leading-6 text-gray-900">
                    Tên màu sắc
                  </label>
                  <Form.Item
                    name="ten"
                    rules={[
                      {
                        required: true,
                        message: "Tên màu sắc không được để trống!",
                      }
                    ]}
                  >
                    <Input
                      value={kichCoDetail?.ten}
                      name="ten"
                      placeholder="Nhập tên màu sắc"
                      style={{ borderRadius: "5px" }}
                      onChange={onChangeDetail}
                    />
                  </Form.Item>
                  <label htmlFor="deleted" className="block text-sm font-medium leading-6 text-gray-900">
                    Trạng thái
                  </label>
                  <Form.Item
                    name="deleted"
                  >
                    <Input
                      value={kichCoDetail?.deleted}
                      name="deleted"
                      readOnly
                      style={{ borderRadius: "5px" }}
                    />
                  </Form.Item>
                  <label htmlFor="ten" className="block text-sm font-medium leading-6 text-gray-900">
                    Ngày tạo
                  </label>
                  <Form.Item
                    name="ngay_tao"
                  >
                    <Input
                      value={kichCoDetail?.ngay_tao}
                      name="ngay_tao"
                      readOnly
                      style={{ borderRadius: "5px" }}
                      onChange={onChange}
                    />
                  </Form.Item>
                  <label htmlFor="ten" className="block text-sm font-medium leading-6 text-gray-900">
                    Người tạo
                  </label>
                  <Form.Item
                    name="nguoi_tao"
                  >
                    <Input
                      value={kichCoDetail?.nguoi_tao}
                      name="nguoi_tao"
                      readOnly
                      style={{ borderRadius: "5px" }}
                    />
                  </Form.Item>
                  <label htmlFor="ten" className="block text-sm font-medium leading-6 text-gray-900">
                    Ngày sửa
                  </label>
                  <Form.Item
                    name="ngay_sua"
                  >
                    <Input
                      value={kichCoDetail?.ngay_sua}
                      name="ngay_sua"
                      readOnly
                      style={{ borderRadius: "5px" }}
                    />
                  </Form.Item>
                  <label htmlFor="ten" className="block text-sm font-medium leading-6 text-gray-900">
                    Người sửa
                  </label>
                  <Form.Item
                    name="nguoi_sua"
                  >
                    <Input
                      value={kichCoDetail?.nguoi_sua}
                      name="nguoi_sua"
                      readOnly
                      style={{ borderRadius: "5px" }}
                    />
                  </Form.Item>
                </div>
              </Form>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}