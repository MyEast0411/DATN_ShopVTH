import InfoTop from "../../layout/InfoTop";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  Checkbox,
  Breadcrumbs,
  BreadcrumbItem,
  Button,
  Tabs,
  Tab,
  Card,
  CardBody,
} from "@nextui-org/react";

import { CiSliderHorizontal } from "react-icons/ci";
import { ArrowRightOutlined, DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Input, Result } from "antd";
import { useState } from "react";
import axios from "axios";
import InForHD from "./InForHD";

function FindHD() {
  // const url = "http://localhost:8080/hoa_don/";
  const [hoadon, setHoaDon] = useState([]);
  const [maHD, setMaHD] = useState("");

  const handleSearch = (e) => {
    const text = e.target.value.replaceAll(" ", "");
    setMaHD(text);
  };

  const handleSubmit = async () => {
    if (maHD == "") {
      // thong bao
      console.log("khongo dfeer trong");
      return;
    }
    await axios
      .post("http://localhost:8080/hoa_don/findHoaDons", {
        data: maHD.split(","),
      })
      .then((res) => {
        console.log(res.data);
        setHoaDon(res.data);
      });
  };

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <InfoTop />
      <Header />
      <div
        className="main-shop"
        style={{
          width: "90%",
          margin: "auto",
        }}
      >
        <Breadcrumbs size="lg" className="my-3">
          <BreadcrumbItem>
            <Link to="/">Trang chủ</Link>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <Link className="text-[#B4B4B3] cursor-default">
              Tra cứu hóa đơn
            </Link>
          </BreadcrumbItem>
        </Breadcrumbs>
        <div className="sort w-full flex justify-between">
          <h2 className="font-medium mb-8 text-2xl">
            {/* GIÀY JORDAN({countSanPham}) */}
            GIÀY JORDAN
          </h2>
          <div className="flex justify-center cursor-pointer">
            <p
              className="mr-3"
              style={{
                fontSize: "18px",
              }}
            >
              Ẩn bộ lọc
            </p>
            <CiSliderHorizontal
              className="mt-0.5"
              style={{
                fontSize: "22px",
              }}
            />
            <div className="cursor-pointer ml-10">
              <Dropdown
                menu={{
                  items,
                }}
                trigger={["click"]}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space
                    style={{
                      fontSize: "18px",
                    }}
                  >
                    Lọc theo
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>
          </div>
        </div>
        <div
          className="grid grid-cols-6 gap-4"
          style={{ position: "relative" }}
        >
          <div className="filter-side">
            <div
              className="filter-accordion pr-5"
              style={{
                maxHeight: "530px",
                overflowY: "auto",
                position: "sticky",
                top: "100px",
              }}
            >
              <Accordion className="px-0" selectionMode="multiple">
                <AccordionItem
                  key="1"
                  aria-label="Giảm giá & Ưu đãi"
                  title="Giảm giá & Ưu đãi"
                  className="font-medium"
                >
                  <Checkbox
                    defaultSelected={false}
                    radius="md"
                    className="font-normal"
                    color="default"
                  >
                    Ưu đãi nổi bật - Giảm tối đa tới 60%
                  </Checkbox>
                </AccordionItem>
                <AccordionItem
                  key="2"
                  aria-label="Giới tính"
                  title="Giới tính"
                  className="font-medium"
                >
                  <div className="flex flex-col">
                    <Checkbox
                      defaultSelected={false}
                      radius="md"
                      className="font-normal"
                      color="default"
                    >
                      Nam
                    </Checkbox>
                    <Checkbox
                      defaultSelected={false}
                      radius="md"
                      className="font-normal"
                      color="default"
                    >
                      Nữ
                    </Checkbox>
                    <Checkbox
                      defaultSelected={false}
                      radius="md"
                      className="font-normal"
                      color="default"
                    >
                      Unisex
                    </Checkbox>
                  </div>
                </AccordionItem>
                <AccordionItem
                  key="3"
                  aria-label="Trẻ em"
                  title="Trẻ em"
                  className="font-medium"
                >
                  <div className="flex flex-col">
                    <Checkbox
                      defaultSelected={false}
                      radius="md"
                      className="font-normal"
                      color="default"
                    >
                      Trai
                    </Checkbox>
                    <Checkbox
                      defaultSelected={false}
                      radius="md"
                      className="font-normal"
                      color="default"
                    >
                      Gái
                    </Checkbox>
                  </div>
                </AccordionItem>
                <AccordionItem
                  key="4"
                  aria-label="Mua sắm theo giá  "
                  title="Mua sắm theo giá "
                  className="font-medium"
                >
                  <div className="flex flex-col">
                    <Checkbox
                      defaultSelected={false}
                      radius="md"
                      className="font-normal"
                      color="default"
                    >
                      200.000-500.000
                    </Checkbox>
                    <Checkbox
                      defaultSelected={false}
                      radius="md"
                      className="font-normal"
                      color="default"
                    >
                      500.000-1Tr
                    </Checkbox>
                    <Checkbox
                      defaultSelected={false}
                      radius="md"
                      className="font-normal"
                      color="default"
                    >
                      1Tr-1.5Tr
                    </Checkbox>
                    <Checkbox
                      defaultSelected={false}
                      radius="md"
                      className="font-normal"
                      color="default"
                    >
                      Trên 1.5Tr
                    </Checkbox>
                  </div>
                </AccordionItem>
                <AccordionItem
                  key="5"
                  aria-label="Màu sắc"
                  title="Màu sắc"
                  className="font-medium"
                >
                  <div className="grid grid-cols-3 gap-4 pb-5">
                    <div className="main-color black flex flex-col justify-center">
                      <div className="black-circle"></div>
                      <p className="color-text">Đen</p>
                    </div>
                    <div className="main-color black flex flex-col justify-center">
                      <div className="blue-circle"></div>
                      <p className="color-text">Lam</p>
                    </div>
                    <div className="main-color black flex flex-col justify-center">
                      <div className="brown-circle"></div>
                      <p className="color-text">Nâu</p>
                    </div>
                    <div className="main-color black flex flex-col justify-center">
                      <div className="green-circle"></div>
                      <p className="color-text">Lục</p>
                    </div>
                    <div className="main-color black flex flex-col justify-center">
                      <div className="grey-circle"></div>
                      <p className="color-text">Xám</p>
                    </div>
                    <div className="main-color black flex flex-col justify-center">
                      <div className="orange-circle"></div>
                      <p className="color-text">Cam</p>
                    </div>
                    <div className="main-color black flex flex-col justify-center">
                      <div className="red-circle"></div>
                      <p className="color-text">Đỏ</p>
                    </div>
                    <div className="main-color black flex flex-col justify-center">
                      <div className="purple-circle"></div>
                      <p className="color-text">Tím</p>
                    </div>
                    <div className="main-color black flex justify-center flex-col">
                      <div className="white-circle"></div>
                      <p className="color-text">Trắng</p>
                    </div>
                  </div>
                </AccordionItem>
                <AccordionItem
                  key="6"
                  aria-label="Dòng giày"
                  title="Dòng giày"
                  className="font-medium"
                >
                  <div className="flex flex-col">
                    <Checkbox
                      defaultSelected={false}
                      radius="md"
                      className="font-normal mb-0.5"
                      color="default"
                    >
                      Jordan 1
                    </Checkbox>
                    <Checkbox
                      defaultSelected={false}
                      radius="md"
                      className="font-normal mb-0.5"
                      color="default"
                    >
                      Jordan 3
                    </Checkbox>
                    <Checkbox
                      defaultSelected={false}
                      radius="md"
                      className="font-normal mb-0.5"
                      color="default"
                    >
                      Jordan 4
                    </Checkbox>
                    <Checkbox
                      defaultSelected={false}
                      radius="md"
                      className="font-normal mb-0.5"
                      color="default"
                    >
                      Jordan 5
                    </Checkbox>
                    <Checkbox
                      defaultSelected={false}
                      radius="md"
                      className="font-normal mb-0.5"
                      color="default"
                    >
                      Jordan 6
                    </Checkbox>
                    <Checkbox
                      defaultSelected={false}
                      radius="md"
                      className="font-normal mb-0.5"
                      color="default"
                    >
                      Jordan 11
                    </Checkbox>
                    <Checkbox
                      defaultSelected={false}
                      radius="md"
                      className="font-normal mb-0.5"
                      color="default"
                    >
                      Jordan 13
                    </Checkbox>
                  </div>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <div
            className="product-list w-full col-start-2 col-end-7"
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
            <div
              className="grid grid-cols-2 gap-4 mb-4 mt-4"
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
              <div className="search  space-y-5">
                <p
                  className="text-xl font-semibold"
                  style={{ color: "rgba(68,73,77,1)" }}
                >
                  Mã Hóa Đơn
                </p>
                <p
                  className="text-base font-normal"
                  style={{ color: "rgba(68,73,77,1)" }}
                >
                  (Tra cứu nhiều hóa đơn bằng cách thêm dấu phẩy giữa các bưu)
                </p>
                <Input
                  placeholder="VD: 1245,2893"
                  size="large"
                  value={maHD}
                  onChange={handleSearch}
                />
                <Button color="danger" onClick={handleSubmit}>
                  Tra Cứu <ArrowRightOutlined />
                </Button>
              </div>
              <div className="images">
                <img
                  style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    // width: "50%",
                  }}
                  //   width={300}
                  alt="NextUI hero Image"
                  src="https://viettelpost.vn/viettelpost-iframe/assets/images/tracking-img.svg"
                />
              </div>
            </div>

            <div
              className="grid grid-cols-1 gap-4 mb-4 mt-4"
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
              <div className="search  space-y-5">
                <p
                  className="text-xl font-semibold"
                  style={{ color: "rgba(68,73,77,1)" }}
                >
                  Thông tin hóa đơn
                </p>
                {hoadon.length == 0 ? (
                  <Result
                    status="404"
                    title="404"
                    subTitle="Chưa có hóa đơn"
                    // extra={<Button type="primary">Search</Button>}
                    extra={
                      <Button type="primary" onClick={scrollUp}>
                        Search
                      </Button>
                    }
                  />
                ) : (
                  <div className="flex w-full flex-col">
                    <Tabs variant="underlined" aria-label="Tabs variants">
                      {hoadon.map((item) => (
                        <Tab key={item.hoaDon.ma} title={item.hoaDon.ma}>
                          <Card>
                            <CardBody>
                              <InForHD item={item} />
                            </CardBody>
                          </Card>
                        </Tab>
                      ))}
                    </Tabs>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default FindHD;

const items = [
  {
    label: <a href="http://localhost:5173/shop">Nổi bật</a>,
    key: "0",
  },
  {
    label: <a href="http://localhost:5173/shop">Mới nhất</a>,
    key: "1",
  },
  {
    label: <a href="http://localhost:5173/shop">Giá: Cao-Thấp</a>,
    key: "3",
  },
  {
    label: <a href="http://localhost:5173/shop">Giá: Thấp-Cao</a>,
    key: "4",
  },
];
