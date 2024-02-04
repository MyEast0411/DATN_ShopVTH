import { useEffect, useState, useCallback } from "react";
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
  getSPCTByIdSP,
  getSanPhamChiTietByDefaultImg,
} from "../apis/SanPham";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import AlsoLike from "./AlsoLike";
import { notification } from "antd";
import successIcon from "../assets/successIcon.png";
import errorIcon from "../assets/errorIcon.png";
import { getAllKMSPCT } from "../apis/KhuyenMai";

export default function DetailProduct() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { idSP } = useParams();
  const [sanPhamChiTiets, setSanPhamChiTiets] = useState([]);
  const [hinhAnhs, setHinhAnhs] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageDisplay, setSelectedImageDisplay] = useState("");
  const [selectedSize, setSelectedSize] = useState([]);
  const [selectedIdSPCT, setSelectedIdSPCT] = useState("");
  const [runFirstTime, setRunFirstTime] = useState(false);
  const [selectedTheLoai, setSelectedTheLoai] = useState("");
  const [cartItem, setCartItem] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [sizeBorder, setSizeBorder] = useState("");
  const [ma, setMa] = useState("");
  const [maList, setMaList] = useState([]);
  const [user, setUser] = useState({});
  const [selectedGiaBan, setSelectedGiaBan] = useState(0);
  const [kmspcts, setKmspcts] = useState([]);

  const fetchKMSPCT = async () => {
    const data = await getAllKMSPCT();
    console.log("kmspct:", data);
    setKmspcts(data);
  };
  useEffect(() => {
    fetchKMSPCT();
  }, [kmspcts]);

  useEffect(() => {
    const storedUser = localStorage?.getItem("user");
  
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, []);

  
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
  }, [idSP]);
  const openNotificationWithIcon = (type, message, icon) => {
    api[type]({
      message,
      duration: 1.3,
      icon: (
        <img
          src={icon}
          alt=""
          style={{
            width: "7%",
          }}
        />
      ),
    });
  };

  useEffect(() => {
    const fetchSPCTbyUrlImg = async () => {
      try {
        const data = await getSanPhamChiTietByDefaultImg(selectedImage);
        // console.log("data:", data);
        setCartItem(data);

        setSelectedGiaBan(data[0].giaBan);
        setSelectedSize(data.map((item) => item.id_kich_co.ten));
        setSelectedTheLoai(data[0].id_the_loai.ten);
        setSelectedIdSPCT(data[0].id);
      } catch (error) {
        console.error("fetchSPCTbyUrlImg:", error);
      }
    };
    fetchSPCTbyUrlImg();
  }, [selectedImage]);

  const addToCart = () => {
    // console.log(sizeBorder);
    if (!sizeBorder) {
      openNotificationWithIcon("error", "Vui lòng chọn kích cỡ!", errorIcon);
      return;
    }

    let maList = localStorage.getItem("maList");

    if (maList) {
      maList = JSON.parse(maList);

      const existingItem = maList.find(
        (item) => item.ma === ma && item.size === sizeBorder
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        maList.push({ ma, size: sizeBorder, quantity: 1 });
      }
    } else {
      maList = [{ ma, size: sizeBorder, quantity: 1 }];
    }
    localStorage.setItem("maList", JSON.stringify(maList));
    setMaList(maList);
    console.log("maList:", maList);
    if (typeof window.cartUpdatedCallback === "function") {
      window.cartUpdatedCallback();
    }

    openNotificationWithIcon("success", "Đã thêm vào giỏ hàng!", successIcon);
  };

  const handleImageClick = (img) => {
    setSizeBorder("");
    setSelectedImageDisplay(img);
    setSelectedImage(img);
  };

  const handleSizeClick = (size) => {
    setSizeBorder(size);
  };

  useEffect(() => {
    const filterIdSP = async () => {
      if (Array.isArray(cartItem)) {
        const data = cartItem.filter(
          (item) => item.id_kich_co.ten === sizeBorder
        );
        setMa(data[0].ma);
        return data[0].ma;
      } else {
        return null;
      }
    };
    filterIdSP();
  }, [cartItem, sizeBorder]);

  const DiscountTag = ({ discount }) => {
    if (discount === undefined) {
      return null;
    }

    return (
      <div className="discount-tag-detail-product">{`${discount}% OFF`}</div>
    );
  };

  useEffect(() => {
    const fetchSanPhamById = async () => {
      try {
        const data = await getAllSanPhamChiTietByIdSanPham(idSP);
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
        console.error("Error fetchSanPhamById:", error);
      }
    };

    fetchSanPhamById();
  }, [idSP, runFirstTime]);

  const fetchHinhAnhByIdSPCT = useCallback(async () => {
    try {
      const data = await getHinhAnhByIdSPCT(selectedIdSPCT);
      setHinhAnhs(data);
    } catch (error) {
      console.error("Error fetchHinhAnhByIdSPCT:", error);
    }
  }, [selectedIdSPCT]);

  useEffect(() => {
    fetchHinhAnhByIdSPCT();
  }, [fetchHinhAnhByIdSPCT, idSP]);

  useEffect(() => {
    if (runFirstTime && selectedImage) {
      const selectedId = sanPhamChiTiets.find(
        (spct) => spct.defaultImg === selectedImage
      )?.id;
      setSelectedIdSPCT(selectedId);
      fetchHinhAnhByIdSPCT();
    }
  }, [selectedImage, runFirstTime, sanPhamChiTiets, fetchHinhAnhByIdSPCT]);

  const handleImageHover = (image) => {
    // setSelectedImageGocChup(image);
    setSelectedImageDisplay(image);
  };

  if (sanPhamChiTiets.length === 0) {
    return null;
  }

  const uniqueArraySize = [
    ...new Set(sanPhamChiTiets.map((item) => item.id_kich_co.ten)),
  ];

  const uniqueArrayImg = [
    ...new Set(sanPhamChiTiets.map((item) => item.defaultImg)),
  ];

  return (
    <>
      {contextHolder}

      <InfoTop />
      <Header maList={maList} />

      <div className="main-detail-product">
        <Breadcrumbs size="lg" className="my-3">
          <BreadcrumbItem>
            <Link to="/">Trang chủ</Link>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <Link to="/shop">Sản phẩm</Link>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <Link className="text-[#B4B4B3] cursor-default">
              Chi tiết sản phẩm
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
            <div className="detail-pro-price mt-5">
              VNĐ {Intl.NumberFormat().format(selectedGiaBan)}
            </div>
            <div className="choose-color-product flex flex-wrap">
              {uniqueArrayImg.map((img) => (
                <div className="relative mr-3" key={img}>
                  <img
                    key={img}
                    src={img}
                    alt=""
                    className={`img-detail-product choose-color-img-pro ${
                      selectedImage === img ? "selected-border" : ""
                    }`}
                    onClick={() => handleImageClick(img)}
                  />
                  <DiscountTag
                    discount={
                      kmspcts.find(
                        (x) => x.id_chi_tiet_san_pham.defaultImg == img
                      )?.id_khuyen_mai.giaTriPhanTram
                    }
                  />
                </div>
              ))}
            </div>
            <div className="detail-pro-select-size-title flex justify-between mt-10">
              <div> Chọn kích cỡ</div>
              <Link to="/size-guide" className="size-guide underline">
                {" "}
                Bảng kích cỡ
              </Link>
            </div>
            <div className="detail-pro-select-size-button-choose grid grid-cols-2 gap-4">
              {uniqueArraySize.map((size) => (
                <div
                  key={size}
                  id={size}
                  className={`detail-pro-select-size-button text-center ${
                    selectedSize.includes(size) && sizeBorder === size
                      ? "selected-border"
                      : selectedSize.includes(size)
                      ? "..."
                      : "out-of-size cursor-not-allowed"
                  }`}
                  onClick={() => handleSizeClick(size)}
                >
                  {size}
                </div>
              ))}
            </div>
            <div className="interested flex justify-center text-center mt-10">
              {!user && (
                <div>
                  Đăng nhập để nhận nhiều ưu đãi {""}
                  <Link to="/sign-in" className="size-guide underline">
                    {" "}
                    Đăng nhập
                  </Link>
                </div>
              )}
            </div>
            <div
              className="flex flex-col detail-pro-group-btn"
              onClick={addToCart}
            >
              <div className="checkout-button mb-3 flex justify-center">
                <button>Thêm vào giỏ hàng</button>
              </div>
              <div className="paypal-button flex justify-center align-center">
                <button>Yêu thích</button>
                <AiOutlineHeart className="ml-2" />
              </div>
            </div>
            <div className="detail-pro-review mt-10">
              <Accordion className="px-0" selectionMode="multiple">
                <AccordionItem
                  key="1"
                  aria-label="Đánh giá"
                  title="Đánh giá"
                  className="font-medium"
                >
                  <div className="review-card">
                    <div className="flex align-center">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStarHalfAlt />
                      <p className="ml-5">4.9 Sao</p>
                    </div>
                  </div>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="cart-item-horizontal max-w-[60%]"></div>
          </div>
        </div>
      </div>

      <AlsoLike />
      <Footer />
    </>
  );
}
