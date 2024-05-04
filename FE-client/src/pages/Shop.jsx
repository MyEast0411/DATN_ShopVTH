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
import {
  getAllSanPham,
} from "../apis/SanPham";
import axios from "axios";

export default function Shop() {
  const [hideFilter, setHideFilter] = useState(false);
  const [countSanPham, setCountSanPham] = useState(0);
  const [selectedFilterTop, setSelectedFilterTop] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOptionsTheLoai, setSelectedOptionsTheLoai] = useState([]);
  const [selectedOptionsMauSac, setSelectedOptionsMauSac] = useState([]);
  const [selectedOptionsThuongHieu, setSelectedOptionsThuongHieu] = useState([]);
  const [theLoai, setTheLoai] = useState([]);
  const [mauSac, setMauSac] = useState([]);
  const [thuongHieu, setThuongHieu] = useState([]);
  const [sanPhams, setSanPhams] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [toPrice, setToPrice] = useState(0);
  const [fromPrice, setFromPrice] = useState(0);

  const onChangeCheckBox = (option) => {
    console.log(option);
    setSelectedOption(option);
    if(option == "200.000-500.000") {
      console.log("option 1");
      setToPrice(200000);
      setFromPrice(500000);
    } else if(option == "500.000-1Tr") {
      console.log("option 2");
      setToPrice(500000);
      setFromPrice(1000000);
    }else if(option == "1Tr-1.5Tr") {
      console.log("option 3");
      setToPrice(1000000);
      setFromPrice(1500000);
    }else {
      console.log("option 5");
      setToPrice(1500000);
      setFromPrice(10000000);
    }
    // const index = selectedOptions.indexOf(option);
    // if (index === -1) {
    //   setSelectedOptions([...selectedOptions, option]);
    // } else {
    //   setSelectedOptions(selectedOptions.filter((item) => item !== option));
    // }
  };
  const onChangeCheckBoxTheLoai = (option) => {
    const index = selectedOptionsTheLoai.indexOf(option);
    if (index === -1) {
      setSelectedOptionsTheLoai([...selectedOptionsTheLoai, option]);
    } else {
      setSelectedOptionsTheLoai(selectedOptionsTheLoai.filter((item) => item !== option));
    }
  };
  const onChangeCheckBoxMauSac = (option) => {
    const index = selectedOptionsMauSac.indexOf(option);
    if (index === -1) {
      setSelectedOptionsMauSac([...selectedOptionsMauSac, option]);
    } else {
      setSelectedOptionsMauSac(selectedOptionsMauSac.filter((item) => item !== option));
    }
  };
  const onChangeCheckBoxThuongHieu = (option) => {
    const index = selectedOptionsThuongHieu.indexOf(option);
    if (index === -1) {
      setSelectedOptionsThuongHieu([...selectedOptionsThuongHieu, option]);
    } else {
      setSelectedOptionsThuongHieu(selectedOptionsThuongHieu.filter((item) => item !== option));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchCountSanPham = async () => {
    try {
      const data = await countAllSanPham();
      setCountSanPham(data);
    } catch (error) {
      console.error("Error fetchSanPham():", error);
    }
  };
  const fetchData = async () => {
    try {
      const data = await getAllSanPham();
      // has been filter unique
      setSanPhams(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const filterSanPhamClient = async () => {
    console.log("da call filter");
    await axios.post("http://localhost:8080/filterSanPhamClient", {
      listTheLoai: selectedOptionsTheLoai,
      listMauSac: selectedOptionsMauSac,
      listThuongHieu: selectedOptionsThuongHieu,
      toPrice: toPrice,
      fromPrice: fromPrice
    }).then((response) => {
      if (response.status == 200) {
        setSanPhams(response.data);
        console.log(response.data);
      }
    }).catch((error) => {
      console.log(error);
    })
  }
  useEffect(() => {
    console.log("useEffect");
    console.log(toPrice);
    console.log(fromPrice);
    if (selectedOptionsTheLoai.length == 0 && selectedOptionsMauSac.length == 0 && selectedOptionsThuongHieu.length == 0 && toPrice <= 0 && fromPrice <= 0) {
      fetchData();
      console.log("fecth data");
    } else {
      filterSanPhamClient();
      console.log("filter");
    }
  }, [selectedOptionsTheLoai, selectedOptionsMauSac, selectedOptionsThuongHieu, selectedOption])
  useEffect(() => {
    fetchCountSanPham();
  }, [countSanPham]);

  const getAllTH = async () => {
    await axios.get("http://localhost:8080/getAllTH").then((response) => {
      setThuongHieu(response.data);
    });
  };

  const getAllTL = async () => {
    await axios.get("http://localhost:8080/getAllTL").then((response) => {
      setTheLoai(response.data);
    });
  };
  const getAllMS = async () => {
    await axios.get("http://localhost:8080/getAllMS").then((response) => {
      setMauSac(response.data);
      console.log(response.data);
    });
  };
  useEffect(() => {
    getAllTL();
    getAllTH();
    getAllMS();
  }, [])
  const items = [
    {
      label: "Nổi bật",
      key: "0",
    },
    {
      label: "Mới nhất",
      key: "1",
    },
    {
      label: "Giá: Cao-Thấp",
      key: "2",
    },
    {
      label: "Giá: Thấp-Cao",
      key: "3",
    },
  ];

  const handleItemClick = (item) => {
    setSelectedFilterTop(item);
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
            <Link className="text-[#B4B4B3] cursor-default">Sản phẩm</Link>
          </BreadcrumbItem>
        </Breadcrumbs>
        <div className="sort w-full flex justify-between">
          <h2 className="font-medium mb-8 text-2xl">
            DANH SÁCH GIÀY ĐANG BÁN
          </h2>
          <div className="flex justify-center cursor-pointer">
            <p
              className="mr-3"
              style={{
                fontSize: "18px",
              }}
              onClick={() => setHideFilter(!hideFilter)}
            >
              {hideFilter ? "Hiện bộ lọc" : "Ẩn bộ lọc"}
            </p>
            <CiSliderHorizontal
              className="mt-0.5"
              style={{
                fontSize: "22px",
              }}
            />
            <div className="cursor-pointer ml-10">
              <Dropdown
                overlay={
                  <Space direction="vertical">
                    {items.map((item) => (
                      <a
                        key={item.key}
                        onClick={() => handleItemClick(item)}
                        style={{ display: "block", padding: "8px 12px" }}
                      >
                        {item.label}
                        {selectedFilterTop &&
                          selectedFilterTop.key === item.key && (
                            <span
                              style={{ marginLeft: "auto", color: "green" }}
                            >
                              ✓
                            </span>
                          )}
                      </a>
                    ))}
                  </Space>
                }
                trigger={["click"]}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space style={{ fontSize: "18px" }}>
                    Lọc theo <DownOutlined />
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
          <div className={`filter-side ${hideFilter ? "hidden" : "show"}`}>
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
                  aria-label="Thể loại"
                  title="Thể loại"
                  className="font-medium"
                >
                  <div className="flex flex-col">
                    {theLoai.map((item, index) => (
                      <Checkbox key={index.id} onChange={() => onChangeCheckBoxTheLoai(item.id)}>
                        {item.ten}
                      </Checkbox>
                    ))}
                    {/* <Checkbox onChange={() => onChangeCheckBox("Nam")}>
                      Nam
                    </Checkbox>
                    <Checkbox onChange={() => onChangeCheckBox("Nữ")}>
                      Nữ
                    </Checkbox>
                    <Checkbox onChange={() => onChangeCheckBox("Unisex")}>
                      Unisex
                    </Checkbox> */}
                  </div>
                </AccordionItem>
                {/* <AccordionItem
                  key="3"
                  aria-label="Trẻ em"
                  title="Trẻ em"
                  className="font-medium"
                >
                  <div className="flex flex-col">
                    <Checkbox>Trai</Checkbox>
                    <Checkbox>Gái</Checkbox>
                  </div>
                </AccordionItem> */}
                <AccordionItem
                  key="4"
                  aria-label="Mua sắm theo giá  "
                  title="Mua sắm theo giá "
                  className="font-medium"
                >
                  <div className="flex flex-col">
                    <Checkbox
                      onChange={() => onChangeCheckBox("200.000-500.000")}
                      checked={selectedOption === "200.000-500.000"}
                    >
                      200.000-500.000
                    </Checkbox>
                    <Checkbox
                      onChange={() => onChangeCheckBox("500.000-1Tr")}
                      checked={selectedOption === "500.000-1Tr"}
                    >
                      500.000-1Tr
                    </Checkbox>
                    <Checkbox
                      onChange={() => onChangeCheckBox("1Tr-1.5Tr")}
                      checked={selectedOption === "1Tr-1.5Tr"}
                    >
                      1Tr-1.5Tr
                    </Checkbox>
                    <Checkbox
                      onChange={() => onChangeCheckBox("Trên 1.5Tr")}
                      checked={selectedOption === "Trên 1.5Tr"}
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
                  <div className="grid grid-cols-3 gap-4 pb-2">
                    {mauSac.map((item, index) => (
                      <div
                        key={index}
                        className="main-color relative black flex flex-col items-center justify-center"
                        onClick={() => onChangeCheckBoxMauSac(item.id)}
                      >
                        <div className={`circle-color`} style={{backgroundColor : item.maMau}}></div>
                        <p className="color-text text-center">{item.ten}</p>
                        {selectedOptionsMauSac.includes(item.id) && (
                          <div className="tick-icon absolute text-white bottom-[22px]">
                            &#10003;
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </AccordionItem>
                <AccordionItem
                  key="6"
                  aria-label="Thương hiệu"
                  title="Thương hiệu"
                  className="font-medium"
                >
                  <div className="flex flex-col">
                    {thuongHieu.map((item, index) => (
                      <Checkbox key={index} onChange={() => onChangeCheckBoxThuongHieu(item.id)}>
                        {item.ten}
                      </Checkbox>
                    ))}
                    {/* <Checkbox onChange={() => onChangeCheckBox("Jordan 1")}>
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
                    </Checkbox> */}
                  </div>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          <div className="product-list w-full col-start-2 col-end-7">
            <ProductList sanPhams={sanPhams} setSanPhams={setSanPhams} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
