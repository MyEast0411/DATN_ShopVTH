// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import React from "react";
// import { Button, Select, Option, Input } from "@material-tailwind/react";
// import Switch from "@mui/material/Switch";
// import { Tooltip, Tag, Modal, Spin, Button as ButtonAnt } from "antd";
// import { format } from "date-fns";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import { HiOutlineClipboardList } from "react-icons/hi";
// import { AiOutlineFilter } from "react-icons/ai";

// import { BsEye, BsTrash } from "react-icons/bs";
// const url = "http://localhost:8080/voucher/";

// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   Pagination,
//   getKeyValue,
//   Spinner,
// } from "@nextui-org/react";
// // import { list } from "./data";

// export default function Voucher() {
//   const [list, setList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [moneyFrom, setMoneyFrom] = useState("");
//   const [action, setAction] = useState(true);

//   // modal
//   const [modal1Open, setModal1Open] = useState(false);
//   const [modal2Open, setModal2Open] = useState(false);

//   //table
//   const [page, setPage] = React.useState(1);
//   const rowsPerPage = 4;

//   const pages = Math.ceil(list.length / rowsPerPage);

//   const items = React.useMemo(() => {
//     const start = (page - 1) * rowsPerPage;
//     const end = start + rowsPerPage;

//     return list.slice(start, end);
//   }, [page, list]);

//   useEffect(() => {
//     getData();
//     setMoneyFrom((value) => (value = `${Intl.NumberFormat().format(0)} ₫`));
//   }, [list]);

//   const handleClick = (e) => {
//     var regex = /(\d+(\.\d{3})*(,\d{1,3})*( ₫))/g;
//     // // var regex = /(\d+(\.\d{3})*(,\d{1,3})*( VNĐ| đồng))/g;
//     console.log();
//     var matches = e.target.value.match(regex);

//     console.log(matches);
//     var valueReturn = matches?.toString().replaceAll(",", "").replace(" ₫", "");
//     console.log(valueReturn);

//     // var value = `${Intl.NumberFormat().format(valueReturn)} ₫`;
//     setMoneyFrom((val) => (val = valueReturn));
//     // if (matches) {
//     //   console.log("Các số tiền đã tìm thấy:");
//     //   for (var i = 0; i < matches.length; i++) {
//     //     console.log(matches[i]);
//     //   }
//     //   var value = `${Intl.NumberFormat().format(e.target.value)} ₫`;
//     //   setMoneyFrom((val) => (val = value));
//     // } else {
//     //   console.log("Không tìm thấy số tiền nào.");
//     // }
//   };

//   const handleChangeValue = (e) => {
//     setMoneyFrom((val) => (val = e.target.value));
//   };

//   const renderCell = React.useCallback((user, columnKey) => {
//     const cellValue = user[columnKey];
//     switch (columnKey) {
//       case "ngayBatDau":
//         return <p>{format(new Date(cellValue), " hh:mm ,   dd-MM-yyyy")}</p>;

//       case "ngayKetThuc":
//         return <p>{format(new Date(cellValue), " hh:mm ,   dd-MM-yyyy")}</p>;
//       case "giaTriMax":
//         return (
//           <p style={{ color: "red" }}>
//             {" "}
//             {Intl.NumberFormat().format(cellValue)} ₫
//           </p>
//         );
//       case "ngayTao":
//         return <p>{format(new Date(cellValue), " hh:mm ,   dd-MM-yyyy")}</p>;
//       case "trangThai":
//         return cellValue === 1 ? (
//           <Tag color="red">Kích Hoạt</Tag>
//         ) : (
//           <Tag color="green">Chưa Kích Hoạt</Tag>
//         );
//       case "actions":
//         return (
//           <div className="container">
//             <div class="grid grid-cols-2 gap-3">
//               <div>
//                 <Tooltip title="Xem chi tiết" color="green">
//                   <Link
//                     to={`/detail-voucher/${user.ids}`}
//                     className="button-link group relative"
//                   >
//                     <BsEye
//                       description="Chi tiết"
//                       className="cursor-pointer text-xl blue-hover mr-4"
//                       style={{ color: "green" }}
//                     />
//                   </Link>
//                 </Tooltip>
//               </div>
//               <div>
//                 <Tooltip title="Xóa voucher" color="red">
//                   <Link
//                     onClick={() => {
//                       Modal.confirm({
//                         title: `bạn có muốn xóa  voucher không ?`,
//                         okText: "Yes",
//                         okType: "danger",
//                         onOk: async () => {
//                           axios
//                             .delete(url + `delete/${user.ids}`)
//                             .then((response) => {
//                               toast.success(`Xóa thành công`, {
//                                 position: "top-right",
//                                 autoClose: 2000,
//                               });
//                             })
//                             .catch((e) =>
//                               toast.error(`Xóa  thất bại`, {
//                                 position: "top-right",
//                                 autoClose: 2000,
//                               })
//                             );
//                         },
//                       });
//                     }}
//                   >
//                     <BsTrash
//                       description="Chi tiết"
//                       className="cursor-pointer text-xl blue-hover mr-4"
//                       style={{ color: "red" }}
//                     />
//                   </Link>
//                 </Tooltip>
//               </div>
//             </div>
//           </div>
//         );
//       case "changeHD":
//         return (
//           <div className="pt-3">
//             <Tooltip title="cập nhật trạng thái" color="blue">
//               <Switch
//                 disabled={
//                   new Date().getTime() > new Date(user.ngayKetThuc).getTime()
//                     ? true
//                     : false
//                 }
//                 checked={user.trangThai === 1 ? true : false}
//                 onChange={() => {
//                   Modal.confirm({
//                     title: `bạn có muốn ${
//                       user.trangThai == 1 ? "hủy" : " "
//                     } kích hoạt voucher không ?`,
//                     okText: "Yes",
//                     okType: "danger",
//                     onOk: async () => {
//                       axios
//                         .put(url + `update-trang-thai/${user.ids}`)
//                         .then((response) => {
//                           setAction(() => !action);
//                           toast.success(`Update thành công`, {
//                             position: "top-right",
//                             autoClose: 2000,
//                           });
//                         })
//                         .catch((e) =>
//                           toast.error(`Update  thất bại`, {
//                             position: "top-right",
//                             autoClose: 2000,
//                           })
//                         );
//                     },
//                     okCancel: () => {
//                       alert("cancelText");
//                     },
//                   });
//                 }}
//               />
//             </Tooltip>
//           </div>
//         );
//       default:
//         return cellValue;
//     }
//   }, []);

//   const getData = async () => {
//     await axios.get(url + "getVouchers").then((res) => {
//       const rows = res.data.map((item, index) => {
//         return {
//           id: index + 1,
//           ids: item.id,
//           ma: item.ma,
//           ten: item.ten,
//           code: item.code,
//           ngayBatDau: item.ngayBatDau,
//           ngayKetThuc: item.ngayKetThuc,
//           soLuong: item.soLuong,
//           ngayTao: item.ngayTao,
//           giaTriMax: item.giaTriMax,
//           trangThai: item.trangThai,
//         };
//       });
//       setList(rows);
//       setLoading(false);
//     });
//   };

//   return (
//     <>
//       {loading ? (
//         <div style={{ marginLeft: "50%", marginTop: "25%" }}>
//           <Spinner size="lg" label="Loading..." color="warning" />
//         </div>
//       ) : (
//         <>
//           <div className="mb-2  border-b-[1px] font-normal relative border-gray-500 text-lg flex  items-center">
//             <AiOutlineFilter />
//             <p className="ml-2 mt-1"> Bộ lọc</p>
//           </div>
//           <div
//             className="font-normal border-gray-500 text-lg mb-5 gap-10"
//             style={{
//               backgroundColor: "white",
//               padding: "10px",
//               borderRadius: "8px",
//               width: "100%",
//               boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
//               transition: "transform 0.2s",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <div
//               className="flex gap-4 flex-wrap m-3"
//               style={{
//                 width: "100%",
//                 alignItems: "center",
//                 // justifyContent: "center",
//               }}
//             >
//               {" "}
//               <label
//                 htmlFor="phone"
//                 className="text-sm font-medium text-gray-900"
//                 style={{
//                   display: "inline-block",
//                   justifyContent: "center",
//                 }}
//               >
//                 Tìm kiếm
//               </label>
//               <div class="w-2/6 ">
//                 <Input label="Tìm kiếm bất kỳ" />
//               </div>
//               <label
//                 htmlFor="phone"
//                 className="block text-sm font-medium text-gray-900"
//                 style={{
//                   display: "inline-block",
//                 }}
//               >
//                 Loại
//               </label>
//               <div class="w-2/6 ">
//                 <Select variant="outlined" label="Trạng Thái">
//                   <Option>Kích Hoạt </Option>
//                   <Option>Chưa Kích Hoat</Option>
//                 </Select>
//               </div>
//               <div
//                 className="flex gap-4 my-5"
//                 style={{
//                   width: "100%",
//                   alignItems: "center",
//                 }}
//               >
//                 <label
//                   htmlFor="phone"
//                   className="text-sm font-medium text-gray-900 "
//                   style={{
//                     display: "inline-block",
//                   }}
//                 >
//                   Ngày bắt đầu
//                 </label>
//                 <div class="w-2/6 ">
//                   <Input type="date" label="Ngày Bắt Đầu" />
//                 </div>
//                 <label
//                   htmlFor="phone"
//                   className="block text-sm font-medium text-gray-900 "
//                   style={{
//                     display: "inline-block",
//                   }}
//                 >
//                   Ngày kết thúc
//                 </label>
//                 <div class="w-2/6">
//                   <Input type="date" label="Ngày Kết Thúc" />
//                 </div>
//               </div>
//               <div class="flex gap-10 mb-10">
//                 <label
//                   htmlFor="phone"
//                   className="block text-sm font-medium text-gray-900"
//                   style={{
//                     display: "inline-block",
//                   }}
//                 >
//                   Mệnh giá từ
//                 </label>
//                 <div class="w-2/6 ">
//                   <Input
//                     onChange={(e) => handleChangeValue(e)}
//                     value={moneyFrom}
//                     onClick={(e) => handleClick(e)}
//                     label=" Mệnh Giá Từ"
//                     // onMouseLeave={(e) => {
//                     //   setMoneyFrom(
//                     //     `${Intl.NumberFormat().format(e.target.value)} ₫`
//                     //   );
//                     // }}
//                   />
//                 </div>
//                 <label
//                   htmlFor="phone"
//                   className="block text-sm font-medium text-gray-900"
//                   style={{
//                     display: "inline-block",
//                   }}
//                 >
//                   Mệnh giá đến
//                 </label>
//                 <div class="w-2/6 ">
//                   <Input label="Mệnh Giá Đến" />
//                 </div>
//               </div>
//             </div>

//             <div class="bg-white rounded-lg ">
//               <div class="flex justify-center gap-10">
//                 <ButtonAnt
//                   type="primary"
//                   style={{
//                     backgroundColor: "#1976d2",
//                     marginBottom: "2px",
//                   }}
//                 >
//                   Làm mới
//                 </ButtonAnt>
//               </div>
//             </div>
//           </div>
//           <div className="mb-2  border-b-[1px] font-normal relative border-gray-500 text-lg flex  items-center">
//             <HiOutlineClipboardList />
//             <p className="ml-2 mt-1"> Danh sách voucher</p>
//             <Link to={"/"} className="absolute right-0 mb-1">
//               <ButtonAnt
//                 type="primary"
//                 style={{
//                   backgroundColor: "#1976d2",
//                   marginBottom: "2px",
//                 }}
//               >
//                 + Tạo voucher
//               </ButtonAnt>
//             </Link>
//           </div>
//           <div
//             className="font-normal border-gray-500 text-lg mb-5 gap-4"
//             style={{
//               backgroundColor: "white",
//               padding: "10px",
//               borderRadius: "8px",
//               width: "100%",
//               boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
//               transition: "transform 0.2s",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <div className="mb-5 pb-5 mt-10 justify-between border-b-[2px] font-normal border-gray-500 text-lg	flex items-center">
//               <div className="row">
//                 <Button
//                   type="primary"
//                   onClick={() => setModal1Open(true)}
//                   style={{
//                     backgroundColor: "red",
//                     marginBottom: "2px",
//                     marginRight: 4,
//                   }}
//                 >
//                   Thêm Nhanh
//                 </Button>

//                 <Modal
//                   title="Thêm Nhanh Voucher"
//                   style={{ top: 20 }}
//                   open={modal1Open}
//                   onOk={() => setModal1Open(false)}
//                   onCancel={() => setModal1Open(false)}
//                 >
//                   <p>Thêm nhanh voucher</p>
//                 </Modal>

//                 <Button
//                   type="primary"
//                   onClick={() => setModal2Open(true)}
//                   style={{
//                     backgroundColor: "green",
//                     marginBottom: "2px",
//                     marginRight: 4,
//                   }}
//                 >
//                   Thêm Nhiều
//                 </Button>

//                 <Modal
//                   title="Thêm Nhiều Voucher"
//                   style={{ top: 20 }}
//                   open={modal2Open}
//                   onOk={() => setModal2Open(false)}
//                   onCancel={() => setModal2Open(false)}
//                 >
//                   <p>Thêm nhiều voucher</p>
//                 </Modal>

//                 <Button
//                   type="primary"
//                   disabled
//                   style={{
//                     backgroundColor: "#1976d2",
//                     marginBottom: "2px",
//                     marginRight: 4,
//                   }}
//                 >
//                   Import
//                 </Button>

//                 <Link to={"/add-voucher"}>
//                   <Button
//                     type="primary"
//                     style={{
//                       backgroundColor: "#1976d2",
//                       marginBottom: "2px",
//                       marginRight: 4,
//                     }}
//                   >
//                     Thêm
//                   </Button>
//                 </Link>
//               </div>
//             </div>

//             {/* <TableCommon
//               pageSize={5}
//               pageSizeOptions={[5, 10]}
//               rows={list}
//               columns={columns}
//             /> */}

//             <Table
//               aria-label="Example table with dynamic content"
//               className="pb-4"
//               bottomContent={
//                 <div className="flex w-full justify-center ">
//                   <Pagination
//                     isCompact
//                     showControls
//                     showShadow
//                     color="secondary"
//                     page={page}
//                     total={pages}
//                     onChange={(page) => setPage(page)}
//                   />
//                 </div>
//               }
//               classNames={{
//                 wrapper: "min-h-[222px]",
//               }}
//             >
//               <TableHeader columns={columns}>
//                 {(column) => (
//                   <TableColumn key={column.key}>{column.label}</TableColumn>
//                 )}
//               </TableHeader>

//               <TableBody items={items} emptyContent={"No rows to display."}>
//                 {(item) => (
//                   <TableRow key={item.name}>
//                     {(columnKey) => (
//                       <TableCell>{renderCell(item, columnKey)}</TableCell>
//                     )}
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </div>
//         </>
//       )}
//     </>
//   );
// }

import React from "react";
import { Tooltip, Tag, Modal } from "antd";
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
} from "@nextui-org/react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TableCell as TableCellMui,
} from "@mui/material";
import { PlusIcon } from "../components/voucher/common/PlusIcon";
import { VerticalDotsIcon } from "../components/voucher/common/VerticalDotsIcon";
import { SearchIcon } from "../components/voucher/common/SearchIcon";
import { ChevronDownIcon } from "../components/voucher/common/ChevronDownIcon";
import { statusOptions } from "../components/voucher/common/data";
import { capitalize } from "../components/voucher/common/utils";
import { BiFilterAlt } from "react-icons/bi";
import FilterMa from "../common/filter/sanPham/FilterMa";
import FilterTrangThai from "../common/filter/sanPham/FilterTrangThai";
// import Slider from "../common/filter/sanPham/Slider";
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
  "ma",
  "ten",
  "code",
  "ngayBatDau",
  "ngayKetThuc",
  "ngayTao",
  "actions",
  "changeHD",
];

export default function App() {
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
            ngayTao: item.ngayTao,
            giaTriMax: item.giaTriMax,
            trangThai: item.trangThai,
          };
        });
      console.log(rows);

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
    console.log(data);

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
              <p className="ml-2 mt-1"> Danh sách sản phẩm</p>
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
  { uid: "ngayTao", name: "Ngày Tạo", sortable: true },
  { uid: "giaTriMax", name: "Giá trị tối đa", sortable: true },
  { uid: "trangThai", name: "Trạng Thái" },
  { uid: "actions", name: "Thao Tác" },
  { uid: "changeHD", name: "Hoạt Động" },
];
