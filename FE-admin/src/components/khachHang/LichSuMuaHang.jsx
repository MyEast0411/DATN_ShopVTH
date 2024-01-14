import * as React from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Tooltip, Select, Modal, Tag } from "antd";
import { HiOutlineClipboardList } from "react-icons/hi";
import { AiOutlineFilter } from "react-icons/ai";
import { Button, DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;
import { Input } from "@material-tailwind/react";
import moment from "moment";

import { useState } from "react";
import TabTrangThai from "../quanlyhoadon/TabTrangThai";
import { SearchIcon } from "../voucher/common/SearchIcon";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Pagination,
  Image,
} from "@nextui-org/react";
import { EyeIcon } from "../../common/otherComponents/EyeIcon";
import { DeleteIcon } from "../../common/otherComponents/DeleteIcon";

export default function LichSuMuaHang() {
  const [dataInput, setFilterValue] = useState("");
  const [dataSelect, setDataSelect] = useState(-1);
  const [ngayBatDau, setNgayBatDau] = useState("");
  const [ngayKetThuc, setNgayKetThuc] = useState("");
  const [list, setList] = useState([]);
  const { idkh } = useParams();
  const [rowsSPCT, setRowsSPCT] = React.useState([]);

  const getDataById = async () => {
    await axios
      .get(`http://localhost:8080/khach-hang/hoa-don/${idkh}`)
      .then((response) => {
        response.data.map((data, i) => {
          return {
            ...data,
            id: ++i,
          };
        });
        setList(filterOptions(response.data));
      });
  };
  React.useEffect(() => {
    getDataById();
  }, [dataInput, dataSelect, ngayBatDau, ngayKetThuc, list.length]);

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

  const handleChange = (value) => {
    setDataSelect(value);
  };

  const reset = () => {
    setFilterValue("");
    setDataSelect(-1);
    setNgayBatDau("");
    setNgayKetThuc("");
  };

  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  const pages = Math.ceil(list.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return list.slice(start, end);
  }, [page, list]);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "tenKhachHang":
        return <p>{cellValue}</p>;
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
              <Link className="button-link group relative">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon
                    onClick={() => {
                      showModal();
                      getDataChiTietSanPham(user.id);
                    }}
                  />
                </span>
              </Link>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const getDataChiTietSanPham = async (id) => {
    const res = await axios.get(
      "http://localhost:8080/hoa_don_chi_tiet/getHDCTByID/" + id
    );
    const data = await res.data;

    setRowsSPCT(
      data.map((item, index) => {
        return {
          id: ++index,
          ma: item.id_chi_tiet_san_pham.ma,
          imageUrl: item.id_chi_tiet_san_pham.defaultImg,
          name: item.id_chi_tiet_san_pham.id_san_pham.ten,
          kichco: item.id_chi_tiet_san_pham.id_kich_co.ten,
          mausac: item.id_chi_tiet_san_pham.id_mau_sac.ten,
          quantity: item.soLuong,
          price: item.giaTien,
        };
      })
    );
  };

  const renderCell1 = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "imageUrl":
        return <Image src={cellValue} width={40} />;
      case "price":
        return <p>{Intl.NumberFormat().format(cellValue)} ₫</p>;
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Sản phẩm chi tiết">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon onClick={showModal} />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const filterOptions = (data) => {
    return data
      .filter((hd) => {
        if (dataInput === "") return hd;
        if (
          hd.ma.toLowerCase().includes(dataInput.toLowerCase()) ||
          hd.tenKhachHang?.toLowerCase().includes(dataInput.toLowerCase()) ||
          hd.id_nhan_vien?.ten.toLowerCase().includes(dataInput.toLowerCase())
        )
          return hd;
      })
      .filter((hd) => {
        if (dataSelect === -1) return hd;
        if (hd.loaiHd === dataSelect) return hd;
      })
      .filter((hd) => {
        var ndata = Date.parse(new Date(hd.ngayTao));
        if (ngayBatDau === "" || ngayKetThuc === "") return hd;
        if (ngayBatDau <= ndata && ngayKetThuc >= ndata) return hd;
      });
  };

  return (
    <>
      <div>
        <div className="bg-white rounded-lg">
          <h2 className="mb-5 font-bold text-2xl">Lịch Sử Mua Hàng</h2>
          <div className="mb-2 border-b-[1px] font-normal relative border-gray-500 text-lg flex items-center">
            <AiOutlineFilter />
            <p className="ml-2 mt-1"> Bộ lọc</p>
          </div>
          <div
            className="font-normal border-gray-500 text-lg mb-5 gap-4"
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
            <div
              className="flex gap-4 m-10"
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-900"
                style={{
                  display: "inline-block",
                  justifyContent: "center",
                }}
              >
                Tìm kiếm
              </label>
              <div className="w-2/6 ">
                <Input
                  isClearable
                  className="w-full "
                  placeholder="Tìm kiếm bất kỳ..."
                  startContent={<SearchIcon />}
                  value={dataInput}
                  // onClear={() => onClear()}
                  onChange={(e) => setFilterValue(e.target.value)}
                />
              </div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-900"
                style={{
                  display: "inline-block",
                }}
              >
                Loại
              </label>
              <div className="w-2/6">
                <Select
                  defaultValue="--Chọn loại HD--"
                  style={{ width: "100%" }}
                  onChange={handleChange}
                  allowClear
                  options={options}
                  value={dataSelect}
                />
              </div>
            </div>

            {/* <div
              className="flex gap-4 m-10"
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <label
                className="block text-sm font-medium text-gray-900"
                style={{
                  display: "inline-block",
                }}
              >
                Tìm kiếm theo ngày
              </label>
              <RangePicker
                showTime={{ format: "HH:mm" }}
                format="DD-MM-YYYY HH:mm"
                style={{ height: "40px", width: "30%" }}
                onChange={onChangeDatePicker}
              />
            </div> */}

            <div className="flex justify-center mx-auto gap-10">
              <div>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#1976d2",
                    marginBottom: "2px",
                  }}
                  onClick={reset}
                >
                  Làm Mới
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="mb-2 border-b-[1px] font-normal relative border-gray-500 text-lg flex  items-center">
            <HiOutlineClipboardList />
            <p className="ml-2 mt-1"> Danh sách hóa đơn khách hàng</p>
          </div>
          <div
            className="font-normal border-gray-500 text-lg"
            style={{
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "8px",
              width: "100%",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.2s",
            }}
          >
            <Table
              style={{ height: "382px" }}
              aria-label="Example table with custom cells, pagination and sorting"
              bottomContent={
                pages > 0 ? (
                  <div className="flex w-full justify-center">
                    <Pagination
                      isCompact
                      showControls
                      showShadow
                      color="primary"
                      page={page}
                      total={pages}
                      onChange={(newPage) => setPage(newPage)}
                    />
                  </div>
                ) : null
              }
              // bottomContentPlacement="outside"
              classNames={{
                wrapper: "max-h-[382px]",
              }}
            >
              <TableHeader columns={columns1}>
                {(column) => (
                  <TableColumn
                    key={column.uid}
                    align={column.uid === "actions" ? "center" : "start"}
                  >
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody
                items={items}
                emptyContent={"Không tìm thấy hóa đơn 😞"}
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
          </div>
        </div>
      </div>
      <Modal
        title="Danh sách sản phẩm"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        footer={[<Button onClick={handleOk}>OK</Button>]}
      >
        <Table aria-label="Example table with custom cells">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={rowsSPCT}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell1(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Modal>
    </>
  );
}

const options = [
  { value: -1, label: "--Chọn loại HD--" },
  { value: 0, label: "Online" },
  { value: 1, label: "Tại quầy" },
];

const columns = [
  { name: "STT", uid: "stt" },
  { name: "Mã hóa đơn", uid: "ma" },
  { name: "Hình Ảnh", uid: "imageUrl" },
  { name: "Tên sản phẩm", uid: "name" },
  { name: "Kích cỡ", uid: "kichco" },
  { name: "Màu sắc ", uid: "mausac" },
  { name: "Số Lượng", uid: "quantity" },
  { name: "Giá ", uid: "price" },
];

const columns1 = [
  // { uid: "id", name: "STT" },
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
      <Tag color="#ff0000">
        {" "}
        <span className=" text-sm ">Hủy</span>
      </Tag>
    );
};
