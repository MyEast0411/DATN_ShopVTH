import React from "react";
import InfoTop from "../layout/InfoTop";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Link } from "react-router-dom";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";
import ProductList from "../components/ProductList";
import { CiSliderHorizontal } from "react-icons/ci";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

export default function Shop() {
  const items = [
    {
      label: <a href="http://localhost:5173/shop">Featured</a>,
      key: "0",
    },
    {
      label: <a href="http://localhost:5173/shop">Newest</a>,
      key: "1",
    },
    {
      label: <a href="http://localhost:5173/shop">Price: High-Low</a>,
      key: "3",
    },
    {
      label: <a href="http://localhost:5173/shop">Price: Low-High</a>,
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
            <Link to="/">Home</Link>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <Link to="/shop">Shop</Link>
          </BreadcrumbItem>
        </Breadcrumbs>
        <div className="sort w-full flex justify-between">
          <h2 className="font-medium mb-8 text-2xl">JORDAN SHOES (29)</h2>
          <div className="flex justify-center cursor-pointer">
            <p
              className="mr-3"
              style={{
                fontSize: "18px",
              }}
            >
              Hide Filters
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
                    Sort by
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-6 gap-4" style={{ position: "relative" }}>
          <div class="filter-side">
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
                  aria-label="Sale & Offers"
                  title="Sale & Offers"
                  className="font-medium"
                >
                  <Checkbox
                    defaultSelected={false}
                    radius="md"
                    className="font-normal"
                    color="default"
                  >
                    Shop All - Up to 60% OFF
                  </Checkbox>
                </AccordionItem>
                <AccordionItem
                  key="2"
                  aria-label="Gender"
                  title="Gender"
                  className="font-medium"
                >
                  <div className="flex flex-col">
                    <Checkbox
                      defaultSelected={false}
                      radius="md"
                      className="font-normal"
                      color="default"
                    >
                      Men
                    </Checkbox>
                    <Checkbox
                      defaultSelected={false}
                      radius="md"
                      className="font-normal"
                      color="default"
                    >
                      Women
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
                  aria-label="Kids"
                  title="Kids"
                  className="font-medium"
                >
                  <div className="flex flex-col">
                    <Checkbox
                      defaultSelected={false}
                      radius="md"
                      className="font-normal"
                      color="default"
                    >
                      Boys
                    </Checkbox>
                    <Checkbox
                      defaultSelected={false}
                      radius="md"
                      className="font-normal"
                      color="default"
                    >
                      Girls
                    </Checkbox>
                  </div>
                </AccordionItem>
                <AccordionItem
                  key="4"
                  aria-label="Shop by price"
                  title="Shop by price"
                  className="font-medium"
                >
                  <div className="flex flex-col">
                    <Checkbox
                      defaultSelected={false}
                      radius="md"
                      className="font-normal"
                      color="default"
                    >
                      $25-$50
                    </Checkbox>
                    <Checkbox
                      defaultSelected={false}
                      radius="md"
                      className="font-normal"
                      color="default"
                    >
                      $50-$100
                    </Checkbox>
                    <Checkbox
                      defaultSelected={false}
                      radius="md"
                      className="font-normal"
                      color="default"
                    >
                      $100-$150
                    </Checkbox>
                    <Checkbox
                      defaultSelected={false}
                      radius="md"
                      className="font-normal"
                      color="default"
                    >
                      Over $150
                    </Checkbox>
                  </div>
                </AccordionItem>
                <AccordionItem
                  key="5"
                  aria-label="Color"
                  title="Color"
                  className="font-medium"
                >
                  <div className="grid grid-cols-3 gap-4 pb-5">
                    <div className="main-color black flex flex-col justify-center">
                      <div className="black-circle"></div>
                      <p className="color-text">Black</p>
                    </div>
                    <div className="main-color black flex flex-col justify-center">
                      <div className="blue-circle"></div>
                      <p className="color-text">Blue</p>
                    </div>
                    <div className="main-color black flex flex-col justify-center">
                      <div className="brown-circle"></div>
                      <p className="color-text">Brown</p>
                    </div>
                    <div className="main-color black flex flex-col justify-center">
                      <div className="green-circle"></div>
                      <p className="color-text">Green</p>
                    </div>
                    <div className="main-color black flex flex-col justify-center">
                      <div className="grey-circle"></div>
                      <p className="color-text">Grey</p>
                    </div>
                    <div className="main-color black flex flex-col justify-center">
                      <div className="orange-circle"></div>
                      <p className="color-text">Orange</p>
                    </div>
                    <div className="main-color black flex flex-col justify-center">
                      <div className="red-circle"></div>
                      <p className="color-text">Red</p>
                    </div>
                    <div className="main-color black flex flex-col justify-center">
                      <div className="purple-circle"></div>
                      <p className="color-text">Purple</p>
                    </div>
                    <div className="main-color black flex justify-center flex-col">
                      <div className="white-circle"></div>
                      <p className="color-text">White</p>
                    </div>
                  </div>
                </AccordionItem>
                <AccordionItem
                  key="6"
                  aria-label="Brand"
                  title="Brand"
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
                <AccordionItem
                  key="7"
                  aria-label="Shoe hieght"
                  title="Shoe hieght"
                  className="font-medium"
                >
                  <div className="flex flex-col font-normal">
                    <Checkbox
                      defaultSelected={false}
                      radius="md"
                      className="font-normal mb-0.5"
                      color="default"
                    >
                      Low Top
                    </Checkbox>
                    <Checkbox
                      defaultSelected={false}
                      radius="md"
                      className="font-normal mb-0.5"
                      color="default"
                    >
                      Mid Top
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
