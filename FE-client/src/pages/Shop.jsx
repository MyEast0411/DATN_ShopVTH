import { useEffect, useState } from "react";
import InfoTop from "../layout/InfoTop";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  Breadcrumbs,
  BreadcrumbItem,
} from "@nextui-org/react";
import ProductList from "../components/ProductList";
import { CiSliderHorizontal } from "react-icons/ci";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Checkbox } from "antd";
import { countAllSanPham } from "../apis/SanPham";

export default function Shop() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  console.log("selectedOptions:", selectedOptions);

  const onChangeCheckBox = (option) => {
    const index = selectedOptions.indexOf(option);
    if (index === -1) {
      setSelectedOptions([...selectedOptions, option]);
    } else {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
                  <Checkbox onChange={() => onChangeCheckBox("Ưu đãi")}>
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
                    <Checkbox onChange={() => onChangeCheckBox("Nam")}>
                      Nam
                    </Checkbox>
                    <Checkbox onChange={() => onChangeCheckBox("Nữ")}>
                      Nữ
                    </Checkbox>
                    <Checkbox onChange={() => onChangeCheckBox("Unisex")}>
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
                    <Checkbox>Trai</Checkbox>
                    <Checkbox>Gái</Checkbox>
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
                      onChange={() => onChangeCheckBox("200.000-500.000")}
                    >
                      200.000-500.000
                    </Checkbox>
                    <Checkbox onChange={() => onChangeCheckBox("500.000-1Tr")}>
                      500.000-1Tr
                    </Checkbox>
                    <Checkbox onChange={() => onChangeCheckBox("1Tr-1.5Tr")}>
                      1Tr-1.5Tr
                    </Checkbox>
                    <Checkbox onChange={() => onChangeCheckBox("Trên 1.5Tr")}>
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
                  <div className="grid grid-cols-3 gap-4 pb-2">
                    <div
                      className="main-color relative black flex flex-col justify-center"
                      onClick={() => onChangeCheckBox("Đen")}
                    >
                      <div className="black-circle"></div>
                      <p className="color-text">Đen</p>
                      {selectedOptions.includes("Đen") && (
                        <div className="tick-icon absolute text-white bottom-[22px]">
                          &#10003;
                        </div>
                      )}
                    </div>
                    <div
                      className="main-color relative black flex flex-col justify-center"
                      onClick={() => onChangeCheckBox("Lam")}
                    >
                      <div className="blue-circle"></div>
                      <p className="color-text">Lam</p>
                      {selectedOptions.includes("Lam") && (
                        <div className="tick-icon absolute text-white bottom-[22px]">
                          &#10003;
                        </div>
                      )}
                    </div>
                    <div
                      className="main-color relative black flex flex-col justify-center"
                      onClick={() => onChangeCheckBox("Nâu")}
                    >
                      <div className="brown-circle"></div>
                      <p className="color-text">Nâu</p>
                      {selectedOptions.includes("Nâu") && (
                        <div className="tick-icon absolute text-white bottom-[22px]">
                          &#10003;
                        </div>
                      )}
                    </div>
                    <div
                      className="main-color relative black flex flex-col justify-center"
                      onClick={() => onChangeCheckBox("Lục")}
                    >
                      <div className="green-circle"></div>
                      <p className="color-text">Lục</p>
                      {selectedOptions.includes("Lục") && (
                        <div className="tick-icon absolute text-white bottom-[22px]">
                          &#10003;
                        </div>
                      )}
                    </div>
                    <div
                      className="main-color relative black flex flex-col justify-center"
                      onClick={() => onChangeCheckBox("Xám")}
                    >
                      <div className="grey-circle"></div>
                      <p className="color-text">Xám</p>
                      {selectedOptions.includes("Xám") && (
                        <div className="tick-icon absolute text-white bottom-[22px]">
                          &#10003;
                        </div>
                      )}
                    </div>
                    <div
                      className="main-color relative black flex flex-col justify-center"
                      onClick={() => onChangeCheckBox("Cam")}
                    >
                      <div className="orange-circle"></div>
                      <p className="color-text">Cam</p>
                      {selectedOptions.includes("Cam") && (
                        <div className="tick-icon absolute text-white bottom-[22px]">
                          &#10003;
                        </div>
                      )}
                    </div>
                    <div
                      className="main-color relative black flex flex-col justify-center"
                      onClick={() => onChangeCheckBox("Đỏ")}
                    >
                      <div className="red-circle"></div>
                      <p className="color-text">Đỏ</p>
                      {selectedOptions.includes("Đỏ") && (
                        <div className="tick-icon absolute text-white bottom-[22px]">
                          &#10003;
                        </div>
                      )}
                    </div>
                    <div
                      className="main-color relative black flex flex-col justify-center"
                      onClick={() => onChangeCheckBox("Tím")}
                    >
                      <div className="purple-circle"></div>
                      <p className="color-text">Tím</p>
                      {selectedOptions.includes("Tím") && (
                        <div className="tick-icon absolute text-white bottom-[22px]">
                          &#10003;
                        </div>
                      )}
                    </div>
                    <div
                      className="main-color relative black flex justify-center flex-col"
                      onClick={() => onChangeCheckBox("Trắng")}
                    >
                      <div className="white-circle"></div>
                      <p className="color-text">Trắng</p>
                      {selectedOptions.includes("Trắng") && (
                        <div className="tick-icon absolute text-black bottom-[22px]">
                          &#10003;
                        </div>
                      )}
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
                    <Checkbox onChange={() => onChangeCheckBox("Jordan 1")}>
                      Jordan 1
                    </Checkbox>
                    <Checkbox onChange={() => onChangeCheckBox("Jordan 3")}>
                      Jordan 3
                    </Checkbox>
                    <Checkbox onChange={() => onChangeCheckBox("Jordan 4")}>
                      Jordan 4
                    </Checkbox>
                    <Checkbox onChange={() => onChangeCheckBox("Jordan 5")}>
                      Jordan 5
                    </Checkbox>
                    <Checkbox onChange={() => onChangeCheckBox("Jordan 6")}>
                      Jordan 6
                    </Checkbox>
                    <Checkbox onChange={() => onChangeCheckBox("Jordan 11")}>
                      Jordan 11
                    </Checkbox>
                    <Checkbox onChange={() => onChangeCheckBox("Jordan 13")}>
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
