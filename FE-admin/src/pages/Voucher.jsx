import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { Button } from "@material-tailwind/react";
import { TableCell } from "@mui/material";
import Switch from "@mui/material/Switch";
import { Tooltip, Tag, Modal, message } from "antd";
import { format } from "date-fns";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FilterMa from "../small-component/FilterKhuyenMai/FilterMa";
import FilterPhanTram from "../small-component/FilterKhuyenMai/FilterPhanTram";
import FilterTrangThai from "../small-component/FilterKhuyenMai/FilterTrangThai";
import FilterDate from "../small-component/FilterKhuyenMai/FilterDate";

import TableCommon from "../small-component/common/TableCommon";

//icon
import { BiFilterAlt } from "react-icons/bi";
import { FiRefreshCcw } from "react-icons/fi";
import { HiOutlineClipboardList } from "react-icons/hi";
import { BsEye, BsTrash } from "react-icons/bs";
const url = "http://localhost:8080/voucher/";
export default function Voucher() {
  const history = useNavigate();
  const [list, setList] = useState([]);

  // modal
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(url + "getVouchers");
      const rows = res.data.map((item, index) => {
        return {
          id: index + 1,
          ids: item.ids,
          ma: item.ma,
          ten: item.ten,
          code: item.code,
          ngayBatDau: item.ngayBatDau,
          ngayKetThuc: item.ngayKetThuc,
          soLuong: item.soLuong,
          nguoiTao: item.nguoiTao,
          giaTriMax: item.giaTriMax,
          trangThai: item.trangThai,
          tinhTrang: convertTinhTrang(
            format(new Date(item.ngayBatDau), "yyyy-MM-dd hh:mm:ss"),
            format(new Date(item.ngayKetThuc), "yyyy-MM-dd hh:mm:ss")
          ),
        };
      });
      setList(rows);
      console.log(rows);
    };
    getData();
  }, []);

  // const onHanleUpdateTT = (idSPCT) => {

  // };
  function convertTinhTrang(ngayBatDau, ngayKetThuc) {
    const timeBD = new Date(ngayBatDau).getTime();
    const timeKT = new Date(ngayKetThuc).getTime();
    const now = Date.now();
    var mess = 1;

    if (now > timeBD && now > timeKT) {
      mess = 1;
    } else if (now > timeBD && now < timeKT) {
      mess = 2;
    } else {
      mess = 3;
    }
    return mess;
  }

  return (
    <>
      <div
        className="bg-white"
        style={{
          fontSizfe: "8px",
          paddingLeft: 10,
        }}
      >
        <div className="mb-2 border-b-[2px] font-normal border-gray-500 text-lg	flex items-center">
          <BiFilterAlt />
          <p className="ml-2 mt-1"> Bộ lọc</p>
        </div>

        <div className=" flex items-center">
          <div className="pr-2">
            <FilterMa placeholder="Mã khuyến mại" />
          </div>
          <div className="pr-2">
            <FilterMa placeholder="Tên khuyến mại" />
          </div>
          <div className="pr-2">
            <FilterPhanTram
              placeholder="Giá trị giảm (%)"
              style={{ width: "150px" }}
            />
          </div>
          <div className="pr-2">
            <FilterTrangThai placeholder="Chọn trạng thái" />
          </div>
          <div className="pr-2">
            <FilterDate style={{ width: "100%" }} />
          </div>
          <div className="pr-2">
            <button className="icon-hover">
              <FiRefreshCcw
                style={{
                  fontSize: "20px",
                  marginTop: "25%",
                  marginLeft: "10px",
                }}
              />
            </button>
          </div>
        </div>
        <div className="mb-2 mt-10 justify-between border-b-[2px] font-normal border-gray-500 text-lg	flex items-center">
          <div className="flex items-center">
            <HiOutlineClipboardList />
            <p className="ml-2 mt-1"> Danh sách</p>
          </div>
          <div className="row">
            <Button
              type="primary"
              onClick={() => setModal1Open(true)}
              style={{
                backgroundColor: "red",
                marginBottom: "2px",
                marginRight: 4,
              }}
            >
              Thêm Nhanh
            </Button>

            <Modal
              title="Thêm Nhanh Voucher"
              style={{ top: 20 }}
              open={modal1Open}
              onOk={() => setModal1Open(false)}
              onCancel={() => setModal1Open(false)}
            >
              <p>Thêm nhanh voucher</p>
            </Modal>

            <Button
              type="primary"
              onClick={() => setModal2Open(true)}
              style={{
                backgroundColor: "green",
                marginBottom: "2px",
                marginRight: 4,
              }}
            >
              Thêm Nhiều
            </Button>

            <Modal
              title="Thêm Nhiều Voucher"
              style={{ top: 20 }}
              open={modal2Open}
              onOk={() => setModal2Open(false)}
              onCancel={() => setModal2Open(false)}
            >
              <p>Thêm nhiều voucher</p>
            </Modal>

            <Button
              type="primary"
              disabled
              style={{
                backgroundColor: "#1976d2",
                marginBottom: "2px",
                marginRight: 4,
              }}
            >
              Import
            </Button>

            <Link to={"/add-voucher"}>
              <Button
                type="primary"
                style={{
                  backgroundColor: "#1976d2",
                  marginBottom: "2px",
                  marginRight: 4,
                }}
              >
                Thêm
              </Button>
            </Link>
          </div>
        </div>
        <TableCommon
          pageSize={5}
          pageSizeOptions={[5, 10]}
          rows={list}
          columns={columns}
        />

        {/* <Table
          columns={columns}
          rowSelection={{}}
          expandable={{
            expandedRowRender: (record) => (
              <p
                style={{
                  margin: 0,
                }}
              >
                Thong tin chi tiết
              </p>
            ),
            rowExpandable: (record) => record.name !== "Not Expandable",
          }}
          dataSource={list}
          pagination={{
            pageSize: 3,
          }}
          scroll={{
            y: 240,
          }}
        /> */}
      </div>
    </>
  );
}

// if (
//   ngayBatDau.getTime() < new Date().getTime() &&
//   ngayKetThuc.getTime() < new Date().getTime()
// )
// console.log("hết");
// else if (
//   ngayBatDau.getTime() < new Date().getTime() &&
//   ngayKetThuc.getTime() > new Date().getTime()
// )
// console.log("dang");
// else if
// console.log("sap");

const columns = [
  { field: "id", headerName: "STT", width: 10 },
  { field: "ma", headerName: "Mã voucher" },
  { field: "ten", headerName: "Tên voucher", width: 180 },
  { field: "code", headerName: "Code" },
  // {
  //   field: "ngayBatDau",
  //   headerName: "Ngày bắt đầu",
  //   width: 150,
  //   valueFormatter: (params) =>
  //     format(new Date(params.value), " hh:mm ,   dd-MM-yyyy"),
  // }, //
  // {
  //   field: "ngayKetThuc",
  //   headerName: "Ngày Kết Thúc",
  //   width: 150,
  //   valueFormatter: (params) =>
  //     format(new Date(params.value), " hh:mm ,   dd-MM-yyyy"),
  // },

  {
    field: "tinhTrang",
    headerName: "Tình Trạng",
    width: 150,
    renderCell: (params) =>
      params.value === 1 ? (
        <Tag color="black">Đã hết hạn</Tag>
      ) : params.value == 2 ? (
        <Tag color="green">Đang diễn ra</Tag>
      ) : (
        <Tag color="yellow">Sắp diễn ra</Tag>
      ),
  },

  { field: "soLuong", headerName: "Số Lượng" },
  { field: "nguoiTao", headerName: "Người Tạo" },
  {
    field: "giaTriMax",
    headerName: "Mệnh Giá",
    renderCell: (params) => (
      <TableCell>
        <span style={{ color: "red" }}>
          {Intl.NumberFormat().format(params.value)}&nbsp;₫
        </span>
      </TableCell>
    ),
  },
  {
    field: "trangThai",
    headerName: "Trạng Thái",
    width: 120,
    renderCell: (params) => (
      <TableCell>
        {params.value == 1 ? (
          <Tag color="red">Kích Hoạt</Tag>
        ) : (
          <Tag color="green">Chưa Kích Hoạt</Tag>
        )}
      </TableCell>
    ),
  },
  {
    field: "hanhDong",
    headerName: "Hành động",
    width: 100,
    sortable: false,
    renderCell: (params) => (
      <TableCell>
        <div className="container">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <Tooltip title="Xem chi tiết" color="green">
                <Link
                  to={`/detail-voucher/${params.row.ids}`}
                  className="button-link group relative"
                >
                  <BsEye
                    description="Chi tiết"
                    className="cursor-pointer text-xl blue-hover mr-4"
                    style={{ color: "green" }}
                  />
                </Link>
              </Tooltip>
            </div>
            <div>
              <Tooltip title="Xóa voucher" color="red">
                <Link
                  onClick={() => {
                    Modal.confirm({
                      title: `bạn có muốn xóa  voucher không ?`,
                      okText: "Yes",
                      okType: "danger",
                      onOk: async () => {
                        axios
                          .delete(url + `delete/${params.row.ids}`)
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
                  }}
                >
                  <BsTrash
                    description="Chi tiết"
                    className="cursor-pointer text-xl blue-hover mr-4"
                    style={{ color: "red" }}
                  />
                </Link>
              </Tooltip>
            </div>
          </div>
        </div>
      </TableCell>
    ),
  },
  {
    field: "action",
    headerName: "Action",
    width: 100,
    sortable: false,
    renderCell: (params) => (
      <div className="pt-3">
        <TableCell>
          <Tooltip title="cập nhật trạng thái" color="blue">
            <Switch
              checked={params.row.trangThai === 1 ? true : false}
              onChange={() => {
                Modal.confirm({
                  title: `bạn có muốn ${
                    params.row.trangThai == 1 ? "hủy" : " "
                  } kích hoạt voucher không ?`,
                  okText: "Yes",
                  okType: "danger",
                  onOk: async () => {
                    axios
                      .put(url + `update-trang-thai/${params.row.ids}`)
                      .then((response) => {
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
        </TableCell>{" "}
      </div>
    ),
  },
];
