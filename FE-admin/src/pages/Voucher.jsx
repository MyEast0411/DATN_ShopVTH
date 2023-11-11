import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { Button, Select, Option, Input } from "@material-tailwind/react";
// import { TableCell } from "@mui/material";
import Switch from "@mui/material/Switch";
import { Tooltip, Tag, Modal, Spin } from "antd";
import { format } from "date-fns";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { HiOutlineClipboardList } from "react-icons/hi";
import { BsEye, BsTrash } from "react-icons/bs";
const url = "http://localhost:8080/voucher/";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Spinner,
} from "@nextui-org/react";
// import { users } from "./data";

export default function Voucher() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [moneyFrom, setMoneyFrom] = useState("");
  const [action, setAction] = useState(true);

  // modal
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);

  //table
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(list.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return list.slice(start, end);
  }, [page, list]);

  useEffect(() => {
    getData();
    setMoneyFrom((value) => (value = `${Intl.NumberFormat().format(0)} ₫`));
  }, [list]);

  const handleClick = (e) => {
    var regex = /(\d+(\.\d{3})*(,\d{1,3})*( ₫))/g;
    // // var regex = /(\d+(\.\d{3})*(,\d{1,3})*( VNĐ| đồng))/g;
    console.log();
    var matches = e.target.value.match(regex);

    console.log(matches);
    var valueReturn = matches?.toString().replaceAll(",", "").replace(" ₫", "");
    console.log(valueReturn);

    // var value = `${Intl.NumberFormat().format(valueReturn)} ₫`;
    setMoneyFrom((val) => (val = valueReturn));
    // if (matches) {
    //   console.log("Các số tiền đã tìm thấy:");
    //   for (var i = 0; i < matches.length; i++) {
    //     console.log(matches[i]);
    //   }
    //   var value = `${Intl.NumberFormat().format(e.target.value)} ₫`;
    //   setMoneyFrom((val) => (val = value));
    // } else {
    //   console.log("Không tìm thấy số tiền nào.");
    // }
  };

  const handleChangeValue = (e) => {
    setMoneyFrom((val) => (val = e.target.value));
  };

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "ngayBatDau":
        return <p>{format(new Date(cellValue), " hh:mm ,   dd-MM-yyyy")}</p>;

      case "ngayKetThuc":
        return <p>{format(new Date(cellValue), " hh:mm ,   dd-MM-yyyy")}</p>;
      case "giaTriMax":
        return (
          <p style={{ color: "red" }}>
            {" "}
            {Intl.NumberFormat().format(cellValue)} ₫
          </p>
        );
      case "ngayTao":
        return <p>{format(new Date(cellValue), " hh:mm ,   dd-MM-yyyy")}</p>;
      case "trangThai":
        return cellValue === 1 ? (
          <Tag color="red">Kích Hoạt</Tag>
        ) : (
          <Tag color="green">Chưa Kích Hoạt</Tag>
        );
      case "actions":
        return (
          <div className="container">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <Tooltip title="Xem chi tiết" color="green">
                  <Link
                    to={`/detail-voucher/${user.ids}`}
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
                            .delete(url + `delete/${user.ids}`)
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
        );
      case "changeHD":
        return (
          <div className="pt-3">
            <Tooltip title="cập nhật trạng thái" color="blue">
              <Switch
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

  const getData = async () => {
    await axios.get(url + "getVouchers").then((res) => {
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
          ngayTao: item.ngayTao,
          giaTriMax: item.giaTriMax,
          trangThai: item.trangThai,
        };
      });
      setList(rows);
      setLoading(false);
    });
  };

  return (
    <>
      {loading ? (
        <div className="relative">
          <div className="absolute top-50 start-50 translate-middle">
          <Spinner color="white" size="sm" />
          </div>
        </div>
      ) : (
        <>
          <div
            className="bg-white"
            style={{
              fontSizfe: "8px",
              paddingLeft: 10,
              boxShadow: "0px 0px 3px 0px",
              borderRadius: "5px",
            }}
          >
            <div class="container space-y-5 bg-white rounded-lg p-4 pt-5 mb-6">
              <div className="filter">
                <div className="header">
                  <p className="text-2xl font-bold ">Bộ lọc</p>
                  <hr />
                </div>
                <div className="body m-10">
                  <form>
                    <div class="flex ... gap-10 mb-10">
                      <div class="w-1/6 ... font-medium text-s">Tìm kiếm</div>
                      <div class="w-2/6 ...">
                        <Input label="Tìm kiếm ..." />
                      </div>
                      <div class="w-1/6 ... font-medium text-s">Loại </div>
                      <div class="w-2/6 ...">
                        <Select variant="outlined" label="Trạng Thái">
                          <Option>Kích Hoạt </Option>
                          <Option>Chưa Kích Hoat</Option>
                        </Select>
                      </div>
                    </div>

                    <div class="flex ... gap-10 mb-10">
                      <div class="w-1/6 ... font-medium text-s">
                        Ngày Bắt Đầu
                      </div>
                      <div class="w-2/6 ...">
                        <Input type="date" />
                      </div>
                      <div class="w-1/6 ... font-medium text-s">
                        Ngày Kết Thúc
                      </div>
                      <div class="w-2/6 ...">
                        <Input type="date" />
                      </div>
                    </div>

                    <div class="flex ... gap-10 mb-10">
                      <div class="w-1/6 ... font-medium text-s">
                        Mệnh Giá Từ
                      </div>
                      <div class="w-2/6 ...">
                        <Input
                          onChange={(e) => handleChangeValue(e)}
                          value={moneyFrom}
                          onClick={(e) => handleClick(e)}
                          label=" Mệnh Giá Từ"
                          // onMouseLeave={(e) => {
                          //   setMoneyFrom(
                          //     `${Intl.NumberFormat().format(e.target.value)} ₫`
                          //   );
                          // }}
                        />
                      </div>
                      <div class="w-1/6 ... font-medium text-s">
                        Mệnh Giá Đến
                      </div>
                      <div class="w-2/6 ...">
                        <Input label="Mệnh Giá Đến" />
                      </div>
                    </div>

                    <div class="flex justify-center ...  gap-10">
                      <div>
                        <Button style={{ backgroundColor: "blue" }}>
                          Tìm kiếm
                        </Button>
                      </div>
                      <div>
                        <Button style={{ backgroundColor: "red" }} type="reset">
                          Làm Mới
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div
            className="bg-white pt-3"
            style={{
              fontSizfe: "8px",
              paddingLeft: 10,
              paddingRight: 10,
              boxShadow: "0px 0px 3px 0px",
              borderRadius: "5px",
            }}
          >
            <div className="mb-5 pb-5 mt-10 justify-between border-b-[2px] font-normal border-gray-500 text-lg	flex items-center">
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

            {/* <TableCommon
              pageSize={5}
              pageSizeOptions={[5, 10]}
              rows={list}
              columns={columns}
            /> */}

            <Table
              aria-label="Example table with dynamic content"
              className="pb-4"
              bottomContent={
                <div className="flex w-full justify-center ">
                  <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="secondary"
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}
                  />
                </div>
              }
              classNames={{
                wrapper: "min-h-[222px]",
              }}
            >
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
              </TableHeader>

              <TableBody items={items} emptyContent={"No rows to display."}>
                {(item) => (
                  <TableRow key={item.name}>
                    {(columnKey) => (
                      <TableCell>{renderCell(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </>
  );
}

// const columns = [
//   { field: "id", headerName: "STT", width: 10 },
//   { field: "ma", headerName: "Mã voucher", width: 150 },
//   { field: "ten", headerName: "Tên voucher", width: 150 },

//   {
//     field: "ngayBatDau",
//     headerName: "Ngày bắt đầu",
//     width: 150,
//     valueFormatter: (params) =>
//       format(new Date(params.value), " hh:mm ,   dd-MM-yyyy"),
//   },
//   {
//     field: "ngayKetThuc",
//     headerName: "Ngày Kết Thúc",
//     width: 150,
//     valueFormatter: (params) =>
//       format(new Date(params.value), " hh:mm ,   dd-MM-yyyy"),
//   },

//   // {
//   //   field: "tinhTrang",
//   //   headerName: "Tình Trạng",
//   //   width: 150,
//   //   renderCell: (params) =>
//   //     params.value === 1 ? (
//   //       <Tag color="black">Đã hết hạn</Tag>
//   //     ) : params.value == 2 ? (
//   //       <Tag color="green">Đang diễn ra</Tag>
//   //     ) : (
//   //       <Tag color="yellow">Sắp diễn ra</Tag>
//   //     ),
//   // },

//   { field: "soLuong", headerName: "Số Lượng" },
//   {
//     field: "ngayTao",
//     headerName: "Ngày Tạo",
//     width: 150,
//     valueFormatter: (params) =>
//       format(new Date(params.value), " hh:mm ,   dd-MM-yyyy"),
//   },
//   {
//     field: "giaTriMax",
//     headerName: "Mệnh Giá",
//     renderCell: (params) => (
//       <TableCell>
//         <span style={{ color: "red" }}>
//           {Intl.NumberFormat().format(params.value)}&nbsp;₫
//         </span>
//       </TableCell>
//     ),
//   },
//   {
//     field: "trangThai",
//     headerName: "Trạng Thái",
//     width: 125,
//     renderCell: (params) => (
//       <TableCell>
//         {params.value == 1 ? (
//           <Tag color="red">Kích Hoạt</Tag>
//         ) : (
//           <Tag color="green">Chưa Kích Hoạt</Tag>
//         )}
//       </TableCell>
//     ),
//   },
//   {
//     field: "hanhDong",
//     headerName: "Hành động",
//     width: 120,
//     sortable: false,
//     renderCell: (params) => (
//       <TableCell>
//         <div className="container">
//           <div class="grid grid-cols-2 gap-3">
//             <div>
//               <Tooltip title="Xem chi tiết" color="green">
//                 <Link
//                   to={`/detail-voucher/${params.row.ids}`}
//                   className="button-link group relative"
//                 >
//                   <BsEye
//                     description="Chi tiết"
//                     className="cursor-pointer text-xl blue-hover mr-4"
//                     style={{ color: "green" }}
//                   />
//                 </Link>
//               </Tooltip>
//             </div>
//             <div>
//               <Tooltip title="Xóa voucher" color="red">
//                 <Link
//                   onClick={() => {
//                     Modal.confirm({
//                       title: `bạn có muốn xóa  voucher không ?`,
//                       okText: "Yes",
//                       okType: "danger",
//                       onOk: async () => {
//                         axios
//                           .delete(url + `delete/${params.row.ids}`)
//                           .then((response) => {
//                             toast.success(`Xóa thành công`, {
//                               position: "top-right",
//                               autoClose: 2000,
//                             });
//                           })
//                           .catch((e) =>
//                             toast.error(`Xóa  thất bại`, {
//                               position: "top-right",
//                               autoClose: 2000,
//                             })
//                           );
//                       },
//                     });
//                   }}
//                 >
//                   <BsTrash
//                     description="Chi tiết"
//                     className="cursor-pointer text-xl blue-hover mr-4"
//                     style={{ color: "red" }}
//                   />
//                 </Link>
//               </Tooltip>
//             </div>
//           </div>
//         </div>
//       </TableCell>
//     ),
//   },
//   {
//     field: "action",
//     headerName: "Action",
//     width: 100,
//     sortable: false,
//     renderCell: (params) => (
//       <div className="pt-3">
//         <TableCell>
//           <Tooltip title="cập nhật trạng thái" color="blue">
//             <Switch
//               checked={params.row.trangThai === 1 ? true : false}
//               onChange={() => {
//                 Modal.confirm({
//                   title: `bạn có muốn ${
//                     params.row.trangThai == 1 ? "hủy" : " "
//                   } kích hoạt voucher không ?`,
//                   okText: "Yes",
//                   okType: "danger",
//                   onOk: async () => {
//                     axios
//                       .put(url + `update-trang-thai/${params.row.ids}`)
//                       .then((response) => {
//                         toast.success(`Update thành công`, {
//                           position: "top-right",
//                           autoClose: 2000,
//                         });
//                       })
//                       .catch((e) =>
//                         toast.error(`Update  thất bại`, {
//                           position: "top-right",
//                           autoClose: 2000,
//                         })
//                       );
//                   },
//                   okCancel: () => {
//                     alert("cancelText");
//                   },
//                 });
//               }}
//             />
//           </Tooltip>
//         </TableCell>{" "}
//       </div>
//     ),
//   },
// ];

const columns = [
  { key: "id", label: "Stt" },
  { key: "ma", label: "Mã" },
  { key: "ten", label: "Tên" },
  { key: "code", label: "Code" },
  { key: "ngayBatDau", label: "Ngày Bắt Đầu" },
  { key: "ngayKetThuc", label: "Ngày Kết Thúc" },
  { key: "soLuong", label: "Số Lượng" },
  { key: "ngayTao", label: "Ngày Tạo" },
  { key: "giaTriMax", label: "Giá trị tối đa" },
  { key: "trangThai", label: "Trạng Thái" },
  { key: "actions", label: "Thao Tác" },
  { key: "changeHD", label: "Hoạt Động" },
];
