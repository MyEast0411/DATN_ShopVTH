// import {
//   MdOutlineArrowCircleUp,
//   MdOutlineArrowCircleDown,
// } from "react-icons/md";
import { Button } from "@nextui-org/button";
import { FaArrowDown, FaArrowUp, FaCrown, FaEye, FaStar } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Image,
  Avatar,
  Chip,
  Tooltip,
  Pagination,
  getKeyValue,
} from "@nextui-org/react";

import { Select } from "antd";
import { Link } from "react-router-dom";
import {
  ColumnChart,
  TableTheoOption,
} from "../components/thong_ke/ColumnChart";
import { PieChart } from "../components/thong_ke/PieChart";
import { LineChart } from "../components/thong_ke/LineChart";
import { AiTwotoneCrown } from "react-icons/ai";
import axios from "axios";

const columns = [
  { uid: "ma", name: "Mã Hóa Đơn" },
  { uid: "name", name: "Product Name" },
  { uid: "status", name: "Thời gian" },
  { uid: "totalorder", name: "Total Order" },
  { uid: "tongTien", name: "Tổng Tiền" },
];

// const colorRanks = ["#ffd600", "#5D6595", "#AA5619"];
const colorRanks = ["rgb(253 224 71)", "rgb(125 211 252)", "rgb(234 88 12)"];

// const users = [
//   {
//     id: "#JY7685	",
//     name: "Nike Air max 170",
//     price: 560000,
//     totalorder: 325,
//     totalamount: 8000000,
//     avatar: "https://uko-react.vercel.app/static/products/shoe-1.png",
//   },
//   {
//     id: "#JY7686	",
//     name: "Nike Air Panda 1",
//     price: 325000,
//     totalorder: 25,
//     totalamount: 56789000,
//     avatar: "https://uko-react.vercel.app/static/products/black-keds.png",
//   },
//   {
//     id: "#JY7687	",
//     name: "Nike Air Lion ",
//     price: 4530000,
//     totalorder: 325,
//     totalamount: 17904000,
//     avatar: "https://uko-react.vercel.app/static/products/green-keds.png",
//   },
//   {
//     id: "#JY7688	",
//     name: "Nike Air Basic ",
//     price: 399000,
//     totalorder: 325,
//     totalamount: 2689900,
//     avatar: "https://uko-react.vercel.app/static/products/yellow-keds.png",
//   },
//   {
//     id: "#JY7689	",
//     name: "Nike Air Basic 1 ",
//     price: 200000,
//     totalorder: 325,
//     totalamount: 6000000,
//     avatar: "https://uko-react.vercel.app/static/products/yellow-keds.png",
//   },
// ];

const ThongKe = () => {
  const url = "http://localhost:8080/thong-ke/";
  const [valueColumnChart, setValueColumnChart] = useState("week");
  const [countHD, setCountHD] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalSP, setTotalSP] = useState(0);
  const [top5HD, setTop5HD] = useState([]);
  const [top3SP, setTop3SP] = useState([]);
  const [spctMin, setSPCTMin] = useState([]);

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(spctMin.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return spctMin.slice(start, end);
  }, [page, spctMin]);

  // change select columnchart
  const handleChange = (value) => {
    if (value == "week") {
      setValueColumnChart(value);
    }

    if (value == "month") {
      setValueColumnChart(value);
    }

    if (value == "year") {
      setValueColumnChart(value);
    }
  };

  const changeDateToStatus = (ngayTao) => {
    var startDate = new Date(ngayTao);
    var endDate = new Date();

    // Tính khoảng thời gian giữa hai ngày (tính bằng mili giây)
    var timeDifference = endDate - startDate;

    // Chuyển đổi khoảng thời gian từ mili giây sang giây, phút, giờ
    var seconds = Math.floor(timeDifference / 1000);

    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);
    if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else if (minutes > 0) {
      return `${minutes} minutes ago`;
    } else {
      return `Just seconds ago`;
    }
  };

  const renderCell1 = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return <span className="text-black-700 font-bold">{cellValue}</span>;
      case "price":
        return (
          <p className="text-red-700 font-bold">
            {" "}
            {Intl.NumberFormat().format(cellValue)} ₫{" "}
          </p>
        );
      case "avatar":
        return <Image width={50} alt="NextUI hero Image" src={cellValue} />;
      case "quantitySaled":
        return cellValue <= 0 ? (
          <span className="text-red-500 font-medium">Hết Hàng</span>
        ) : (
          <span className="text-black-700 font-medium">
            <span className="text-red-500 font-bold ">{cellValue} </span>
            sản phẩm
          </span>
        );

      default:
        return cellValue;
    }
  }, []);

  //  call data
  const getTotal = async () => {
    await axios.get(url + "getTotal").then((res) => {
      setTotal(res.data);
    });
  };
  const getTotalSP = async () => {
    await axios.get(url + "totalSPSaled").then((res) => {
      setTotalSP(res.data);
    });
  };

  const getCountHD = async () => {
    await axios.get(url + "countHD").then((res) => {
      setCountHD(res.data);
    });
  };

  const getTop3SP = async () => {
    await axios.get(url + "top3SP").then((res) => {
      setTop3SP(res.data);
    });
  };

  const getTop5HD = async () => {
    await axios.get(url + "top5HDNew").then((res) => {
      setTop5HD(
        res.data.map((hd) => {
          var st = changeDateToStatus(hd.ngayTao);
          return {
            ...hd,
            status: st,
          };
        })
      );
    });
  };

  const getSPCTMin = async () => {
    await axios.get(url + "SPCTMin").then((res) => {
      setSPCTMin(
        res.data.map((item, i) => {
          return {
            id: i + 1,
            name: item.ten,
            price: item.giaBan,
            avatar: item.defaultImg,
            quantitySaled: item.soLuongTon,
          };
        })
      );
    });
  };

  useEffect(() => {
    getTotal();
    getCountHD();
    getTop5HD();
    getTotalSP();
    getTop3SP();
    getSPCTMin();
  }, [total, countHD, top5HD, totalSP, spctMin]);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "ma":
        return <span className="text-sm font-semibold">{cellValue}</span>;
      case "name":
        return (
          <>
            {user.listHDCT.map((spct) => (
              <div className="mb-1 text-black-400 ">
                <User
                  avatarProps={{
                    radius: "lg",
                    src: spct.id_chi_tiet_san_pham.defaultImg,
                  }}
                  description={`${Intl.NumberFormat().format(spct.giaTien)} ₫`}
                  name={`${spct.id_chi_tiet_san_pham.ten} x ${spct.soLuong}`}
                >
                  {spct.id_chi_tiet_san_pham.ten}
                </User>
              </div>
            ))}
          </>
        );
      case "status":
        return <span>{cellValue}</span>;
      case "totalorder":
        return (
          <span className=" text-sm font-semibold">
            {user.listHDCT.length} sản phẩm
          </span>
        );
      case "tongTien":
        return (
          <span className=" text-sm font-semibold text-red-500">
            {Intl.NumberFormat().format(cellValue)} ₫{" "}
          </span>
        );

      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <div className="overflow-auto w-full bg-white p-3 space-y-8" style={{}}>
        <h2 className="mb-5 font-bold text-2xl">Quản Lý Thống Kê</h2>
        <div className="block-1 flex space-x-8">
          <div className="block-1-1 w-1/2 space-y-4">
            <div
              className="gap-4  flex"
              style={{
                borderRadius: 5,
                backgroundColor: "#F3F4F9",
              }}
            >
              <div className=" p-4 w-2/3">
                <p
                  style={{
                    fontSize: 15,
                    fontWeight: 500,
                    lineHeight: 1.6,
                    color: "rgb(95, 116, 141)",
                    marginBottom: 8,
                  }}
                >
                  Tổng doanh thu
                </p>
                <div className="content">
                  <p
                    style={{
                      fontSize: 24,
                      fontWeight: 700,
                      marginBottom: 16,

                      color: "rgb(47, 67, 101)",
                    }}
                  >
                    {Intl.NumberFormat().format(total)} ₫{" "}
                  </p>
                  <Button style={{ backgroundColor: "#2499ef" }}>
                    <span className="text-white font-semibold">Tải về</span>
                  </Button>
                </div>
              </div>
              <div className="w-1/3">
                <img
                  src="https://uko-react.vercel.app/static/illustration/sales-earning.svg"
                  width="100%"
                  alt="Earnings"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center bottom",
                    width: 200,
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div
                className="total-order "
                style={{
                  borderRadius: 5,
                  backgroundColor: "#F3F4F9",
                  padding: "1rem 1.5rem",
                }}
              >
                <p
                  style={{
                    fontSize: 15,
                    fontWeight: 500,
                    lineHeight: 1.6,
                    color: "rgb(95, 116, 141)",
                    marginBottom: 8,
                  }}
                >
                  Lợi nhuận tuần
                </p>
                <div className="content">
                  <p
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      marginBottom: 16,

                      color: "rgb(47, 67, 101)",
                    }}
                  >
                    {Intl.NumberFormat().format(3040000)} ₫{" "}
                  </p>
                  <span
                    style={{
                      color: "red",
                      backgroundColor: "white",
                      borderRadius: 10,
                      padding: 5,
                    }}
                  >
                    <FaArrowDown
                      style={{
                        display: "inline",

                        paddingRight: 5,
                      }}
                    />

                    <Chip color="danger">
                      {" "}
                      <span style={{ fontWeight: "bold" }}>-30</span>%
                    </Chip>
                  </span>
                </div>
              </div>
              <div
                style={{
                  borderRadius: 5,
                  backgroundColor: "#F3F4F9",
                  padding: "1rem 1rem",
                }}
              >
                <p
                  style={{
                    fontSize: 15,
                    fontWeight: 500,
                    lineHeight: 1.6,
                    color: "rgb(95, 116, 141)",
                    marginBottom: 8,
                  }}
                >
                  Tổng sản phẩm đã bán
                </p>
                <div className="content">
                  <p
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      marginBottom: 16,
                      color: "rgb(47, 67, 101)",
                    }}
                  >
                    {totalSP} sản phẩm
                  </p>
                  <span
                    style={{
                      backgroundColor: "white",
                      borderRadius: 10,
                      padding: 5,
                      color: "#32d08e",
                    }}
                  >
                    <FaArrowUp
                      style={{
                        display: "inline",

                        paddingRight: 5,
                      }}
                    />
                    <Chip color="success">
                      {" "}
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        +30%
                      </span>
                    </Chip>
                  </span>
                </div>
              </div>
              <div
                style={{
                  borderRadius: 5,
                  backgroundColor: "#F3F4F9",
                  padding: "1rem 1.5rem",
                }}
              >
                <p
                  style={{
                    fontSize: 15,
                    fontWeight: 500,
                    lineHeight: 1.6,
                    color: "rgb(95, 116, 141)",
                    marginBottom: 8,
                  }}
                >
                  Tổng đơn hàng
                </p>
                <div className="content">
                  <p
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      marginBottom: 16,

                      color: "rgb(47, 67, 101)",
                    }}
                  >
                    {countHD} đơn hàng
                  </p>
                  <span
                    style={{
                      backgroundColor: "white",
                      borderRadius: 10,
                      padding: 5,
                      color: "#32d08e",
                    }}
                  >
                    <FaArrowUp
                      style={{
                        display: "inline",

                        paddingRight: 5,
                      }}
                    />
                    <Chip color="success">
                      {" "}
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        +30%
                      </span>
                    </Chip>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="block-1-2 w-1/2 earning-report"
            style={{ backgroundColor: "#F3F4F9", borderRadius: 5 }}
          >
            <div
              className="heaer"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginLeft: 16,
                marginRight: 16,
              }}
            >
              <h5
                style={{
                  fontSize: 14,
                  lineHeight: 1,
                  fontWeight: 600,
                }}
              >
                Báo cáo thu nhập
              </h5>
              <div className="fiter  mt-2">
                <Select
                  defaultValue="week"
                  style={{ width: 125 }}
                  onChange={handleChange}
                  options={[
                    { value: "week", label: "Theo tuần" },
                    { value: "month", label: "Theo Tháng" },
                    { value: "year", label: "Theo  Năm" },
                  ]}
                />
              </div>
            </div>
            <div className="content flex items-center">
              <ColumnChart value={valueColumnChart} />
            </div>
          </div>
        </div>
        <div className="block-2 flex space-x-8">
          <div
            className="block-1-2 w-1/2 earning-report"
            style={{ backgroundColor: "#F3F4F9", borderRadius: 5 }}
          >
            <div
              className="header"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: 24,
              }}
            >
              <h5
                style={{
                  fontSize: 17,
                  lineHeight: 1,
                  fontWeight: 600,
                }}
              >
                Tình trạng dự án
              </h5>
            </div>
            <div className="content justify-center mb-5">
              <PieChart />
            </div>
            <div
              className="header"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: 24,
              }}
            >
              <h5
                style={{
                  fontSize: 17,
                  lineHeight: 1,
                  fontWeight: 600,
                }}
              >
                Sản Phẩm Sắp Hết Hàng
              </h5>
            </div>
            <div
              className="content  "
              style={{
                marginTop: 18,
                marginLeft: 18,
                marginRight: 18,
                marginBottom: 5,
              }}
            >
              <Table
                aria-label="Example table with client side pagination"
                style={{ height: "100%" }}
                bottomContent={
                  <div className="flex w-full justify-center">
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
                  wrapper: "min-h-[100%] p-0",
                }}
              >
                <TableHeader columns={columns1}>
                  {(column) => (
                    <TableColumn key={column.uid}>{column.name}</TableColumn>
                  )}
                </TableHeader>
                <TableBody items={items}>
                  {(item) => (
                    <TableRow key={item.id}>
                      {(columnKey) => (
                        <TableCell>{renderCell1(item, columnKey)}</TableCell>
                      )}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
          <div
            className="block-1-2 w-1/2 earning-report"
            style={{ backgroundColor: "#F3F4F9", borderRadius: 5 }}
          >
            <div
              className="header"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 50,
                marginLeft: 24,
                marginRight: 24,
              }}
            >
              <h5
                style={{
                  fontSize: 17,
                  lineHeight: 1,
                  fontWeight: 600,
                }}
              >
                Tóp 5 Sản Phẩm Bán Chạy Theo {valueColumnChart}
              </h5>
            </div>
            {/* <div className="content justify-center">
              <LineChart />
            </div> */}
            <div
              className="content "
              style={{
                marginTop: 100,
                marginLeft: 18,
                marginRight: 18,
                marginBottom: 5,
              }}
            >
              <TableTheoOption value={valueColumnChart} />
            </div>
          </div>
        </div>
        <div className="block-3 flex space-x-8">
          <div
            className="block-3-1 w-2/3  p-3 space-4"
            style={{ backgroundColor: "#F3F4F9", borderRadius: 5 }}
          >
            <div
              className="header"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: 24,
              }}
            >
              <h5
                style={{
                  fontSize: 17,
                  lineHeight: 1,
                  fontWeight: 600,
                }}
              >
                Danh sách hóa đơn gần đây
              </h5>
            </div>
            <div
              className="content "
              style={{
                marginTop: 18,
                marginLeft: 18,
                marginRight: 18,
                marginBottom: 5,
              }}
            >
              <Table isStriped aria-label="Example table with custom cells">
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
                <TableBody items={top5HD}>
                  {(item) => (
                    <TableRow key={item.ma}>
                      {(columnKey) => (
                        <TableCell>{renderCell(item, columnKey)}</TableCell>
                      )}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
          <div
            className="block-3-2 w-1/3  p-3 space-4"
            style={{ backgroundColor: "#F3F4F9", borderRadius: 5 }}
          >
            <div
              className="header"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: 24,
              }}
            >
              <h5
                style={{
                  fontSize: 17,
                  lineHeight: 1,
                  fontWeight: 600,
                }}
              >
                Sản phẩm bán chạy
              </h5>
            </div>
            <div className="content">
              {top3SP.map((sp, i) => (
                <div
                  className="recent flex mb-4 p-4 outline outline-offset-2 bg-gradient-to-r from-yellow-500 
                hover:from-pink-500 hover:to-yellow-500"
                  style={{
                    backgroundColor: "white",
                    borderRadius: 5,
                    outlineColor: colorRanks[i],
                  }}
                >
                  <div className="flex space-x-6">
                    <div className="w-1/6">
                      <span className="font-bold" style={{ marginLeft: 10 }}>
                        NO.{i + 1}
                      </span>
                      <AiTwotoneCrown
                        color={colorRanks[i]}
                        style={{ display: "inline", width: 55, height: 70 }}
                      />
                    </div>
                    <div className="w-2/6 ...">
                      <Avatar
                        isBordered
                        radius="sm"
                        src={sp.sanPhamChiTiet.defaultImg}
                        className="w-25 h-25 text-large"
                      />
                    </div>

                    <div className="w-3/6 ...">
                      <p className="text-base  font-semibold mb-2">
                        {sp.sanPhamChiTiet.ten}
                      </p>

                      <p
                        className="text-base  font-medium mb-2"
                        style={{ color: "rgb(140, 163, 186)" }}
                      >
                        {new Array(5).fill(null).map((_, i) => (
                          <FaStar
                            key={i + 1}
                            color="#ffd600"
                            style={{ display: "inline", marginRight: 5 }}
                          />
                        ))}
                      </p>
                      <p className=" text-base font-semibold mb-2">
                        {Intl.NumberFormat().format(sp.sanPhamChiTiet.giaBan)} ₫{" "}
                      </p>
                      <p className=" text-base font-semibold ">
                        {sp.soLuong} sản phẩm
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* <div
                className="recent flex mb-4 p-4 outline outline-offset-2 bg-gradient-to-r from-blue-500 
                hover:from-pink-500 hover:to-blue-500"
                style={{
                  backgroundColor: "white",
                  borderRadius: 5,
                  outlineColor: colorRanks[1],
                }}
              >
                <div className="flex space-x-6">
                  <div className="w-1/6">
                    <span className="font-bold" style={{ marginLeft: 10 }}>
                      NO.2
                    </span>
                    <AiTwotoneCrown
                      color={colorRanks[1]}
                      style={{ display: "inline", width: 55, height: 70 }}
                    />
                  </div>
                  <div className="w-2/6 ...">
                    <Avatar
                      isBordered
                      radius="sm"
                      src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
                      className="w-25 h-25 text-large"
                    />
                  </div>

                  <div className="w-3/6 ...">
                    <p className="text-base  font-semibold mb-1">
                      Nike Air 170{" "}
                    </p>

                    <p
                      className="text-base  font-medium mb-1"
                      style={{ color: "rgb(140, 163, 186)" }}
                    >
                      {new Array(5).fill(null).map((_, i) => (
                        <FaStar
                          key={i + 1}
                          color="#ffd600"
                          style={{ display: "inline", marginRight: 5 }}
                        />
                      ))}
                    </p>
                    <p className=" text-base font-semibold ">
                      {Intl.NumberFormat().format(30000)} ₫{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="recent flex mb-4 p-4 outline outline-offset-2 bg-gradient-to-r from-amber-700 
               hover:from-pink-500 hover:to-amber-700"
                style={{
                  backgroundColor: "white",
                  borderRadius: 5,
                  outlineColor: colorRanks[2],
                }}
              >
                <div className="flex space-x-6">
                  <div className="w-1/6">
                    <span className="font-bold" style={{ marginLeft: 10 }}>
                      NO.3
                    </span>
                    <AiTwotoneCrown
                      color={colorRanks[2]}
                      style={{ display: "inline", width: 55, height: 70 }}
                    />
                  </div>
                  <div className="w-2/6 ...">
                    <Avatar
                      isBordered
                      radius="sm"
                      src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
                      className="w-25 h-25 text-large"
                    />
                  </div>

                  <div className="w-3/6 ...">
                    <p className="text-base  font-semibold mb-1">
                      Nike Air 170{" "}
                    </p>

                    <p
                      className="text-base  font-medium mb-1"
                      style={{ color: "rgb(140, 163, 186)" }}
                    >
                      {new Array(5).fill(null).map((_, i) => (
                        <FaStar
                          key={i + 1}
                          color="#ffd600"
                          style={{ display: "inline", marginRight: 5 }}
                        />
                      ))}
                    </p>
                    <p className=" text-base font-semibold ">
                      {Intl.NumberFormat().format(30000)} ₫{" "}
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThongKe;

const usersWeek = [
  {
    id: 1,
    name: "Zion 3 PF",
    price: 4109000,
    avatar:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/84c6e45a-77d0-450e-87a2-e3b4c4fbaa83/air-jordan-1-zoom-cmft-2-shoes-nX8Qqx.png",
    quantitySaled: 2,
  },
  {
    id: 2,
    name: "Air Jordan 1 Low",
    price: 3239000,
    avatar:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/eed06a38-dc83-4bd6-a4f3-209d70980736/air-jordan-1-zoom-cmft-2-shoes-nX8Qqx.png",
    quantitySaled: 1,
  },
  {
    id: 3,
    name: "Air Jordan 1 Elevate Low",
    price: 3829000,
    avatar:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/964cfa9e-5ce9-4c66-b11c-e70b7fbb8890/air-jordan-1-elevate-low-shoes-XlkVrM.png",
    quantitySaled: 4,
  },
  {
    id: 4,
    name: "Jordan One Take 4 PF",
    price: 2929000,
    avatar:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/54ff2b77-3635-4c89-99f5-963722644364/jordan-one-take-4-pf-shoes-v5trdl.png",
    quantitySaled: 6,
  },
  {
    id: 5,
    name: "Jordan Max Aura 5",
    price: 3829000,
    avatar:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/bd294664-d21a-4b39-86a9-0ee269e51513/jordan-max-aura-5-shoes-ZBZ4Pz.png",
    quantitySaled: 8,
  },
  {
    id: 6,
    name: "Air Jordan 1 Elevate Low",
    price: 3829000,
    avatar:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/964cfa9e-5ce9-4c66-b11c-e70b7fbb8890/air-jordan-1-elevate-low-shoes-XlkVrM.png",
    quantitySaled: 4,
  },
  {
    id: 7,
    name: "Jordan One Take 4 PF",
    price: 2929000,
    avatar:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/54ff2b77-3635-4c89-99f5-963722644364/jordan-one-take-4-pf-shoes-v5trdl.png",
    quantitySaled: 6,
  },
  {
    id: 8,
    name: "Jordan Max Aura 11",
    price: 3829000,
    avatar:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/bd294664-d21a-4b39-86a9-0ee269e51513/jordan-max-aura-5-shoes-ZBZ4Pz.png",
    quantitySaled: 8,
  },
];

const columns1 = [
  { uid: "id", name: "STT" },
  { uid: "avatar", name: "Hình Ảnh" },
  { uid: "name", name: "Tên Sản Phẩm" },
  { uid: "price", name: "Giá" },
  { uid: "quantitySaled", name: "Số Lượng" },
];
