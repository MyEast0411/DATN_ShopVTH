import React, { useEffect, useState } from "react";
import InfoTop from "../layout/InfoTop";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Link, useParams } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import {
  getAllSanPhamChiTietByIdSanPham,
  getHinhAnhByIdSPCT,
  getSPCTbyId,
  getSPCTByIdSP,
} from "../api/SanPham";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import AlsoLike from "./AlsoLike";
import { notification } from "antd";
import successIcon from "../assets/successIcon.png";
import { v4 as uuidv4 } from "uuid";; 

export default function DetailProduct() {
  const { idSP } = useParams();
  const [sanPhamChiTiets, setSanPhamChiTiets] = useState([]);
  const [hinhAnhs, setHinhAnhs] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageGocChup, setSelectedImageGocChup] = useState("");
  const [selectedImageDisplay, setSelectedImageDisplay] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedIdSPCT, setSelectedIdSPCT] = useState("");
  const [runFirstTime, setRunFirstTime] = useState(false);
  const [selectedGiaBan, setSelectedGiaBan] = useState(0);
  const [selectedTheLoai, setSelectedTheLoai] = useState("");
  const [cartItem, setCartItem] = useState({});

  const [api, contextHolder] = notification.useNotification();


  useEffect(() => {
    const fetchSPCTByIdSP = async () => {
      try {
        const data = await getSPCTByIdSP(idSP);
        setSelectedIdSPCT(data[0].id);
        setCartItem(data[0]);
      } catch (error) {
        console.error("Error fetchSPCTbyId():", error);
      }
    };
    fetchSPCTByIdSP();
  }, []);
  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message,
      duration: 1.3,
      icon: (
        <img
          src={successIcon}
          alt=""
          style={{
            width: "7%",
          }}
        />
      ),
    });
  };

  const fetchSPCTbyId = async (id) => {
    try {
      const data = await getSPCTbyId(id);
      setCartItem(data);
    } catch (error) {
      console.error("Error fetchSPCTbyId():", error);
    }
  };

  const renderID = () => {
    const uniqueID = uuidv4();
    return uniqueID;
  };

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!selectedSize) {
      openNotificationWithIcon("error", "Vui lòng chọn kích cỡ!");
      return;
    }

    const existingItemIndex = cart.findIndex(
      (item) =>
        item.product.id === cartItem.id && item.product.kichCo === selectedSize
    );

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].product.soLuong += 1;
    } else {
      cart.push({
        product: {
          ids: renderID(),
          id: cartItem.id,
          defaultImg: selectedImageDisplay,
          ten: sanPhamChiTiets[0].ten,
          kichCo: selectedSize,
          soLuong: 1,
          theLoai: selectedTheLoai,
          giaBan: selectedGiaBan,
        },
      });
    }

    console.log("cart: ", cart);
    localStorage.setItem("cart", JSON.stringify(cart));

    if (typeof window.cartUpdatedCallback === "function") {
      window.cartUpdatedCallback();
    }
    openNotificationWithIcon("success", "Đã thêm vào giỏ hàng!");
  };

  const handleImageClick = (spct) => {
    setSelectedImage(spct.defaultImg);
    setSelectedImageDisplay(spct.defaultImg);
    setSelectedGiaBan(spct.giaBan);
    setSelectedTheLoai(spct.id_the_loai.ten);
    setSelectedIdSPCT(spct.id);
    fetchSPCTbyId(spct.id);
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const fetchSanPhamById = async () => {
    try {
      const data = await getAllSanPhamChiTietByIdSanPham(idSP);
      // console.log("fetchSanPhamById:", data);
      setSanPhamChiTiets(data);
      setSelectedIdSPCT(data[0].id);
      if (!runFirstTime) {
        setSelectedImage(data.length > 0 ? data[0].defaultImg : "");
        setSelectedImageDisplay(data.length > 0 ? data[0].defaultImg : "");
        setSelectedGiaBan(data.length > 0 ? data[0].giaBan : "");
        setSelectedTheLoai(data.length > 0 ? data[0].id_the_loai.ten : "");
        setRunFirstTime(true);
      }
    } catch (error) {
      console.error("Error fetchSanPham():", error);
    }
  };

  const fetchHinhAnhByIdSPCT = async () => {
    try {
      const data = await getHinhAnhByIdSPCT(selectedIdSPCT);
      // console.log("ha: ", data);
      setHinhAnhs(data);
    } catch (error) {
      console.error("Error fetchHinhAnhByIdSPCT():", error);
    }
  };
  useEffect(() => {
    fetchSanPhamById();
    fetchHinhAnhByIdSPCT();
  }, [idSP]);

  useEffect(() => {
    if (runFirstTime && selectedImage) {
      const selectedId = sanPhamChiTiets.find(
        (spct) => spct.defaultImg === selectedImage
      )?.id;
      setSelectedIdSPCT(selectedId);
      fetchHinhAnhByIdSPCT();
    }
  }, [selectedImage, runFirstTime]);

  const handleImageHover = (image) => {
    setSelectedImageGocChup(image);
    setSelectedImageDisplay(image);
  };

  if (sanPhamChiTiets.length === 0) {
    return null;
  }

  return (
    <>
      {contextHolder}
    
      <InfoTop />
      <Header />

      <div className="main-detail-product">
        <Breadcrumbs size="lg" className="my-3">
          <BreadcrumbItem>
            <Link to="/">Home</Link>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <Link to="/shop">Shop</Link>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <Link className="text-[#B4B4B3] cursor-default">
              Detail product
            </Link>
          </BreadcrumbItem>
        </Breadcrumbs>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1 detail-product-left relative">
            <div className="grid grid-cols-6 gap-4 sticky-grid">
              <div className="col-start-1 col-end-2">
                <div className="flex flex-col container-main-detail-img-pro">
                  {hinhAnhs.map((item) => (
                    <img
                      key={item.id}
                      src={item.ten}
                      alt=""
                      className="main-detail-product-img"
                      onMouseOver={() => handleImageHover(item.ten)}
                    />
                  ))}
                </div>
              </div>
              <div className="col-start-2 col-end-6">
                <img
                  src={selectedImageDisplay}
                  alt=""
                  className="main-img-detail-pro"
                />
              </div>
            </div>
          </div>

          <div className="col-span-1 detail-product-right">
            <div className="detail-pro-name">{sanPhamChiTiets[0].ten}</div>
            {sanPhamChiTiets[0].id_the_loai && (
              <div className="detail-pro-gender">{selectedTheLoai}</div>
            )}
            <div className="detail-pro-price mt-5">${selectedGiaBan}</div>
            <div className="choose-color-product flex">
              {/* Tổng Sản phẩm chi tiết phải tương ứng với tổng số màu sắc*/}
              {sanPhamChiTiets.map((spct) => (
                <img
                  key={spct.id}
                  src={spct.defaultImg}
                  alt=""
                  className={`choose-color-img-pro ${
                    selectedImage === spct.defaultImg ? "selected-border" : ""
                  }`}
                  onClick={() => handleImageClick(spct)}
                />
              ))}
            </div>
            <div className="detail-pro-select-size-title flex justify-between mt-10">
              <div> Select Size</div>
              <Link to="/size-guide" className="size-guide underline">
                {" "}
                Size Guide
              </Link>
            </div>
            <div className="detail-pro-select-size-button-choose grid grid-cols-2 gap-4">
              {sanPhamChiTiets.map((spct) => (
                <div
                  key={spct.id}
                  id={spct.id}
                  className={`detail-pro-select-size-button text-center ${
                    selectedSize === spct.id_kich_co.ten
                      ? "selected-border"
                      : ""
                  }`}
                  onClick={() => handleSizeClick(spct.id_kich_co.ten)}
                >
                  {spct.id_kich_co.ten}
                </div>
              ))}
              <div className="out-of-size text-center">46.5</div>
            </div>
            <div className="interested flex justify-center text-center mt-10">
              <div>
                4 interest-free payments of $52.50 with{" "}
                <span className="font-medium"> Klarna</span>.{" "}
                <a href="#" className="underline link-underline">
                  Learn More
                </a>
              </div>
            </div>
            <div
              className="flex flex-col detail-pro-group-btn"
              onClick={addToCart}
            >
              <div className="checkout-button mb-5 flex justify-center">
                <button>Add to bag</button>
              </div>
              <div className="paypal-button flex justify-center align-center">
                <button>Favorite</button>
                <AiOutlineHeart className="ml-2" />
              </div>
            </div>
            <div className="detail-pro-review mt-10">
              <Accordion className="px-0" selectionMode="multiple">
                <AccordionItem
                  key="1"
                  aria-label="Review"
                  title="Review (8)"
                  className="font-medium"
                >
                  <div className="review-card">
                    <div className="flex align-center">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStarHalfAlt />
                      <p className="ml-5">4.9 Stars</p>
                    </div>
                  </div>
                </AccordionItem>
                <AccordionItem
                  key="2"
                  aria-label="Sale & Offers"
                  title="Sale & Offers"
                  className="font-medium"
                >
                  Shop All - Up to 60% OFF
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      <AlsoLike />
      <Footer />
    </>
  );
}
