import React, { useEffect, useState } from "react";
import InfoTop from "../layout/InfoTop";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  Checkbox,
  Breadcrumbs,
  BreadcrumbItem,
} from "@nextui-org/react";
import ProductList from "../components/ProductList";
import { CiSliderHorizontal } from "react-icons/ci";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { countAllSanPham } from "../api/SanPham";

export default function Shop() {
  const [countSanPham, setCountSanPham] = useState(0);
  const fetchCountSanPham = async () => {
    try {
      const data = await countAllSanPham();
      setCountSanPham(data);
    } catch (error) {
      console.error("Error fetchSanPham():", error);
    }
  };
  useEffect(() => {
    fetchCountSanPham();
  }, [countSanPham]);
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
            <Link className="text-[#B4B4B3] cursor-default">Sản phẩm</Link>
          </BreadcrumbItem>
        </Breadcrumbs>
        <div className="sort w-full flex justify-between">
          <h2 className="font-medium mb-8 text-2xl">
            GIÀY JORDAN({countSanPham})
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
          <div className="product-list w-full col-start-2 col-end-7">
            <ProductList />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
