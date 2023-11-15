// import {
//   MdOutlineArrowCircleUp,
//   MdOutlineArrowCircleDown,
// } from "react-icons/md";
import { Button } from "@nextui-org/button";
import { FaArrowDown, FaArrowUp, FaEye, FaStar } from "react-icons/fa";
import React from "react";
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
} from "@nextui-org/react";
import { Select } from "antd";
import { Link } from "react-router-dom";
import { ColumnChart } from "../components/thong_ke/ColumnChart";
import { PieChart } from "../components/thong_ke/PieChart";
import { LineChart } from "../components/thong_ke/LineChart";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "ROLE", uid: "role" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

const users = [
  {
    id: 1,
    name: "Tony Reichert",
    role: "CEO",
    team: "Management",
    status: "active",
    age: "29",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "tony.reichert@example.com",
  },
  {
    id: 2,
    name: "Zoey Lang",
    role: "Technical Lead",
    team: "Development",
    status: "paused",
    age: "25",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey.lang@example.com",
  },
  {
    id: 3,
    name: "Jane Fisher",
    role: "Senior Developer",
    team: "Development",
    status: "active",
    age: "22",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    email: "jane.fisher@example.com",
  },
  {
    id: 4,
    name: "William Howard",
    role: "Community Manager",
    team: "Marketing",
    status: "vacation",
    age: "28",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    email: "william.howard@example.com",
  },
  {
    id: 5,
    name: "Kristen Copper",
    role: "Sales Manager",
    team: "Sales",
    status: "active",
    age: "24",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    email: "kristen.cooper@example.com",
  },
];

const ThongKe = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            // color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <FaEye />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <FaEye />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <FaEye />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <div className="overflow-auto w-full bg-white p-3 space-y-8" style={{}}>
        <div className="block-1 flex space-x-8">
          <div className="block-1-1 w-1/2 space-y-4">
            <div
              className="gap-4  flex"
              style={{
                borderRadius: 5,
                backgroundColor: "#ECEBEB",
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
                    {Intl.NumberFormat().format(3000000)} ₫{" "}
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
                  backgroundColor: "#ECEBEB",
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
                      fontSize: 24,
                      fontWeight: 700,
                      marginBottom: 16,

                      color: "rgb(47, 67, 101)",
                    }}
                  >
                    {Intl.NumberFormat().format(3000000)} ₫{" "}
                  </p>
                  <span style={{ color: "red" }}>
                    <FaArrowDown
                      style={{
                        display: "inline",

                        paddingRight: 5,
                      }}
                    />
                    <span style={{ fontWeight: "bold" }}>-30</span>%
                  </span>
                </div>
              </div>
              <div
                style={{
                  borderRadius: 5,
                  backgroundColor: "#ECEBEB",
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
                      fontSize: 24,
                      fontWeight: 700,
                      marginBottom: 16,

                      color: "rgb(47, 67, 101)",
                    }}
                  >
                    {Intl.NumberFormat().format(3000000)} ₫{" "}
                  </p>
                  <span style={{ color: "#32d08e" }}>
                    <FaArrowUp
                      style={{
                        display: "inline",

                        paddingRight: 5,
                      }}
                    />
                    <span style={{ fontWeight: "bold" }}>+30</span>%
                  </span>
                </div>
              </div>
              <div
                style={{
                  borderRadius: 5,
                  backgroundColor: "#ECEBEB",
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
                      fontSize: 24,
                      fontWeight: 700,
                      marginBottom: 16,

                      color: "rgb(47, 67, 101)",
                    }}
                  >
                    {Intl.NumberFormat().format(3000000)} ₫{" "}
                  </p>
                  <span style={{ color: "#32d08e" }}>
                    <FaArrowUp
                      style={{
                        display: "inline",

                        paddingRight: 5,
                      }}
                    />
                    <span style={{ fontWeight: "bold" }}>+30</span>%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="block-1-2 w-1/2 earning-report"
            style={{ backgroundColor: "#ECEBEB", borderRadius: 5 }}
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
                Earning report
              </h5>
              <div className="fiter  mt-2">
                <Select
                  defaultValue="week"
                  style={{ width: 120 }}
                  onChange={handleChange}
                  options={[
                    { value: "week", label: "Theo tuần" },
                    { value: "month", label: "Theo Tháng" },
                    { value: "year", label: "Theo  Năm" },
                  ]}
                />
              </div>
            </div>
            <div className="content">
              <ColumnChart />
            </div>
          </div>
        </div>
        <div className="block-2 flex space-x-8">
          <div
            className="block-1-2 w-1/2 earning-report"
            style={{ backgroundColor: "#ECEBEB", borderRadius: 5 }}
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
                Tổng Giá Và Lợi Nhuận
              </h5>
            </div>
            <div className="content justify-center">
              <LineChart />
            </div>
          </div>
          <div
            className="block-1-2 w-1/2 earning-report"
            style={{ backgroundColor: "#ECEBEB", borderRadius: 5 }}
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
            <div className="content justify-center">
              <PieChart />
            </div>
          </div>
        </div>
        <div className="block-3 flex space-x-8">
          <div
            className="block-3-1 w-2/3  p-3 space-4"
            style={{ backgroundColor: "#ECEBEB", borderRadius: 5 }}
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
                <TableBody items={users}>
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
          <div
            className="block-3-2 w-1/3  p-3 space-4"
            style={{ backgroundColor: "#ECEBEB", borderRadius: 5 }}
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
              <div
                className="recent flex mb-4 p-4"
                style={{ backgroundColor: "white", borderRadius: 5 }}
              >
                <div className="w-5/6 ...">
                  <div class="flex space-x-6">
                    <div class="w-2/4 ...">
                      <Image
                        width={200}
                        alt="NextUI hero Image"
                        src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
                      />
                    </div>

                    <div class="w-2/4 ...">
                      <p className="text-lg font-semibold mb-2">Nike Air 170</p>

                      <p
                        className="text-base  font-medium mb-2"
                        style={{ color: "rgb(140, 163, 186)" }}
                      >
                        {new Array(5).fill(null).map((_, i) => (
                          <FaStar
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
              </div>
              <div
                className="recent flex mb-4 p-4"
                style={{ backgroundColor: "white", borderRadius: 5 }}
              >
                <div className="w-5/6 ...">
                  <div class="flex space-x-6">
                    <div class="w-2/4 ...">
                      <Image
                        width={200}
                        alt="NextUI hero Image"
                        src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
                      />
                    </div>

                    <div class="w-2/4 ...">
                      <p className="text-lg font-semibold mb-2">Nike Air 170</p>

                      <p
                        className="text-base  font-medium mb-2"
                        style={{ color: "rgb(140, 163, 186)" }}
                      >
                        {new Array(5).fill(null).map((_, i) => (
                          <FaStar
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
              </div>
              <div
                className="recent flex mb-4 p-4"
                style={{ backgroundColor: "white", borderRadius: 5 }}
              >
                <div className="w-5/6 ...">
                  <div class="flex space-x-6">
                    <div class="w-2/4 ...">
                      <Image
                        width={200}
                        alt="NextUI hero Image"
                        src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
                      />
                    </div>

                    <div class="w-2/4 ...">
                      <p className="text-lg font-semibold mb-2">Nike Air 170</p>

                      <p
                        className="text-base  font-medium mb-2"
                        style={{ color: "rgb(140, 163, 186)" }}
                      >
                        {new Array(5).fill(null).map((_, i) => (
                          <FaStar
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThongKe;
