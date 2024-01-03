import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { getProvinces, getDistricts, getWards } from "../api/Location";
import { Radio, Space, Spin } from "antd";
import { IoIosArrowBack } from "react-icons/io";
import { notification } from "antd";
import successIcon from "../assets/successIcon.png";
import { getAllHA } from "../api/SanPham";
import axios from "axios";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import IconGiaoHangNhanh from "../assets/iconGiaoHangNhanh.webp";

export default function Checkout() {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [deliveryTime, setDeliveryTime] = useState(null);
  const [phiVanChuyen, setPhiVanChuyen] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [hinhAnhs, setHinhAnhs] = useState([]);
  const [shippingCost, setShippingCost] = useState("");
  const [tongTien, setTongTien] = useState(0);
  const [value, setValue] = useState(1);
  const [idTP, setIdTP] = useState("");
  const [idHuyen, setIdHuyen] = useState("");
  const [idXa, setIdXa] = useState("");
  const [diaChi, setDiaChi] = useState({
    thanhPho: "",
    huyen: "",
    xa: "",
  });

  const [spinning, setSpinning] = React.useState(false);
  // const [showNotification, setShowNotification] = useState(false);

  const showLoader = (callback) => {
    setSpinning(true);
    callback(); // call the callback to indicate loading has started
  };

  // lay id tp
  useEffect(() => {
    const apiUrl =
      "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province";
    const token = "83b3ca14-88ad-11ee-a6e6-e60958111f48"; // Thay YOUR_TOKEN bằng token của bạn

    axios
      .get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Token: token,
        },
      })
      .then((response) => {
        const id_tp = response.data.data.find((item) =>
          diaChi.thanhPho.includes(item.ProvinceName)
        )?.ProvinceID;
        console.log(id_tp);
        setIdTP(id_tp);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [diaChi]);

  // lay id huyen theo api theo id tp
  useEffect(() => {
    const apiUrl =
      "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district";
    const token = "83b3ca14-88ad-11ee-a6e6-e60958111f48"; // Thay YOUR_TOKEN bằng token của bạn

    const requestData = {
      province_id: idTP,
    };

    axios
      .get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          // 'ShopId': shopId,
          Token: token,
        },
        params: requestData,
      })
      .then((response) => {
        const id_huyen = response.data.data.find(
          (item) => item.DistrictName === diaChi.huyen
        )?.DistrictID;
        setIdHuyen(id_huyen);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [diaChi]);

  // lay id xa theo api theo id huyen
  useEffect(() => {
    const apiUrl =
      "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id";
    const token = "83b3ca14-88ad-11ee-a6e6-e60958111f48"; // Thay YOUR_TOKEN bằng token của bạn

    const requestData = {
      district_id: idHuyen,
    };

    axios
      .post(apiUrl, requestData, {
        headers: {
          "Content-Type": "application/json",
          // 'ShopId': shopId,
          Token: token,
        },
      })
      .then((response) => {
        const id_xa = response.data.data.find(
          (item) => item.WardName === diaChi.xa
        )?.WardCode;
        setIdXa(id_xa);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [diaChi, idHuyen]);
  // Tính thời gian dự kiến
  useEffect(() => {
    const apiUrl =
      "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/leadtime";
    const token = "83b3ca14-88ad-11ee-a6e6-e60958111f48"; // Thay YOUR_TOKEN bằng token của bạn
    const shopId = "190374 - 0964457125"; // Thay YOUR_SHOP_ID bằng ID cửa hàng của bạn
    const requestData = {
      from_district_id: 1804,
      from_ward_code: "1B2211",
      to_district_id: idHuyen,
      to_ward_code: idXa,
      service_id: 53320,
    };

    axios
      .post(apiUrl, requestData, {
        headers: {
          "Content-Type": "application/json",
          ShopId: shopId,
          Token: token,
        },
      })
      .then((response) => {
        console.log(response.data.data.leadtime);
        const leadtimeTimestamp = response.data.data.leadtime;
        const leadtimeDate = new Date(leadtimeTimestamp * 1000);

        const day = leadtimeDate.getDate();
        const month = leadtimeDate.getMonth() + 1;
        const year = leadtimeDate.getFullYear();

        const formattedLeadtime = `${day}/${month}/${year}`;

        console.log(formattedLeadtime);
        setDeliveryTime(formattedLeadtime);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [idTP, idHuyen, idXa]);
  // Tính phí vận chuyển
  useEffect(() => {
    const apiUrl =
      "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee";
    const token = "83b3ca14-88ad-11ee-a6e6-e60958111f48";
    const shopId = "190374 - 0964457125";

    const requestData = {
      service_type_id: 2,
      from_district_id: 1804,
      to_district_id: idHuyen,
      to_ward_code: idXa,
      height: 20,
      length: 30,
      weight: 1000,
      width: 40,
      insurance_value: 0,
      coupon: null,
    };

    axios
      .post(apiUrl, requestData, {
        headers: {
          "Content-Type": "application/json",
          ShopId: shopId,
          Token: token,
        },
      })
      .then((response) => {
        console.log("API Response:", response.data);
        setShippingCost(response.data.data.total);
        setPhiVanChuyen(response.data.data.total);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [idTP, idHuyen, idXa]);

  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message,
      duration: 1,
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
    // setShowNotification(true);
  };

  const fetchAllHinhAnh = async () => {
    try {
      const data = await getAllHA();
      setHinhAnhs(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCartItems = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(cart);
    setCartItems(cart);
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    getProvinces().then((data) => {
      setProvinces(data);
    });
  }, []);

  useEffect(() => {
    fetchAllHinhAnh();
    getCartItems();
  }, []);

  const handleProvinceChange = (provinceCode) => {
    provinces.map((item) => {
      if (item.code == provinceCode) {
        setDiaChi((prevDiaChi) => ({
          ...prevDiaChi,
          thanhPho: item.name,
        }));
      }
    });
    getDistricts(provinceCode).then((data) => {
      setDistricts(data);
    });
  };

  const handleDistrictChange = (districtCode) => {
    districts.map((item) => {
      if (item.code == districtCode) {
        setDiaChi((prevDiaChi) => ({
          ...prevDiaChi,
          huyen: item.name,
        }));
      }
    });
    getWards(districtCode).then((data) => {
      setWards(data);
    });
  };

  const handleWardsChange = (wardsCode) => {
    wards.map((item) => {
      if (item.code == wardsCode) {
        setDiaChi((prevDiaChi) => ({
          ...prevDiaChi,
          xa: item.name,
        }));
      }
    });
  };
  const calculateSubtotal = () => {
    const subtotal = cartItems.reduce(
      (total, cart) => total + cart.product.soLuong * cart.product.giaBan,
      0
    );
    return subtotal.toFixed(0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const localShippingCost = value === 2 ? 0 : shippingCost;
    let updatedShippingCost;

    if (value === 2) {
      updatedShippingCost = "Miễn phí";
    } else {
      updatedShippingCost = localShippingCost;
    }
    const total = parseFloat(subtotal) + localShippingCost;
    console.log(updatedShippingCost);

    useEffect(() => {
      setPhiVanChuyen(updatedShippingCost);
      setTongTien(total);
    }, [updatedShippingCost, total]);

    return total;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoader(() => {
      // ...
      const email = e.target.elements.email.value;
      const hoTen = e.target.elements.hoTen.value;
      const soDienThoai = e.target.elements.soDienThoai.value;
      const diaChi = e.target.elements.diaChi.value;
      const thanhPho =
        e.target.elements.city.options[e.target.elements.city.selectedIndex]
          .text;
      const quanHuyen =
        e.target.elements.District.options[
          e.target.elements.District.selectedIndex
        ].text;
      const xaPhuong =
        e.target.elements.wards.options[e.target.elements.wards.selectedIndex]
          .text;

      const phuongThucThanhToan =
        shippingCost === "Miễn phí"
          ? "Chuyển khoản qua ngân hàng"
          : "Thanh toán khi nhận hàng";

      const confirmSubmission = () => {
        axios
          .post(
            "http://localhost:8080/hoa_don_chi_tiet/addHoaDonChiTietToHoaDon",
            {
              hoTen: hoTen,
              sdt: soDienThoai,
              diaChi: diaChi,
              thanhPho: thanhPho,
              huyen: quanHuyen,
              xa: xaPhuong,
              hinhThucThanhToan: phuongThucThanhToan,
              gioHang: cartItems,
              tongTien: tongTien,
              email: email,
              thoiGianNhanHang: deliveryTime + "",
              phiShip: Intl.NumberFormat().format(phiVanChuyen) + "",
              total: Intl.NumberFormat().format(tongTien) + "",
            }
          )
          .then((response) => {
            console.log(response.data);
            localStorage.clear();
            openNotificationWithIcon("success", "Cảm ơn bạn đã mua hàng!");
            setTimeout(() => {
              navigate("/");
            }, 2000);
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            setSpinning(false);
          });
      };

      confirmDialog({
        message: "Bạn có chắc muốn hoàn tất đơn hàng?",
        header: "Xác nhận đơn hàng",
        icon: "pi pi-info-circle",
        acceptClassName: "p-button-success",
        accept: confirmSubmission,
      });
    });
  };

  return (
    <>
      <Spin spinning={spinning} fullscreen />
      {contextHolder}
      <ConfirmDialog />
      <div className="main-checkout w-[80%] mx-auto">
        <div className="grid grid-cols-2 gap-4">
          <div className="checkout-left sticky-grid">
            <Link to={"/"} className="flex container-logo">
              <img className="logo cursor-pointer" src={Logo} alt="" />
              <div className="flex justify-center">Jordan VTH</div>
            </Link>
            <div className="breadcrumbs-cart text-[15px]">
              <Breadcrumbs className="my-3">
                <BreadcrumbItem>
                  <Link to="/">Trang chủ</Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <Link to="/shop">Sản phẩm</Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <Link to="/cart">Giỏ hàng</Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <Link className="text-[#B4B4B3] cursor-default">
                    Thủ tục thanh toán
                  </Link>
                </BreadcrumbItem>
              </Breadcrumbs>
            </div>
            <div className="flex">
              <span>Bạn đã có tài khoản?</span>
              <Link
                to="/sign-in"
                className="link-underline ml-2 underline cursor-pointer"
              >
                {" "}
                Đăng nhập
              </Link>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="inputGroupCodeSignUp">
                <input name="email" type="email" required autoComplete="off" />
                <label htmlFor="email">Email</label>
              </div>
              <div className="inputGroupCodeSignUp">
                <input name="hoTen" type="text" required autoComplete="off" />
                <label htmlFor="hoTen">Họ và tên</label>
              </div>
              <div className="inputGroupCodeSignUp">
                <input
                  name="soDienThoai"
                  type="number"
                  required
                  autoComplete="off"
                />
                <label htmlFor="soDienThoai">Số điện thoại</label>
              </div>
              <div className="inputGroupCodeSignUp">
                <input name="diaChi" type="text" required autoComplete="off" />
                <label htmlFor="diaChi">Địa chỉ</label>
              </div>

              <div className="flex gap-1 justify-between">
                <div className="mb-6">
                  <select
                    name="thanhPho"
                    id="city"
                    className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => handleProvinceChange(e.target.value)}
                    required
                  >
                    <option value="">Chọn thành phố</option>
                    {provinces.map((province) => (
                      <option key={province.code} value={province.code}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-6">
                  <select
                    id="District"
                    name="huyen"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => handleDistrictChange(e.target.value)}
                    required
                  >
                    <option value="">Chọn huyện</option>
                    {districts.map((district) => (
                      <option key={district.code} value={district.code}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-6">
                  <select
                    name="xaPhuong"
                    id="wards"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={(e) => handleWardsChange(e.target.value)}
                  >
                    <option value="">Chọn xã phường</option>
                    {wards.map((ward) => (
                      <option key={ward.code} value={ward.code}>
                        {ward.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <h2 className="text-[16px]">Phương thức thanh toán</h2>
              <div className="main-choose-payment-method">
                <Radio.Group onChange={onChange} value={value}>
                  <Space direction="vertical">
                    <Radio value={1} className="rdo">
                      <div className="flex items-center pt-1">
                        <img
                          src="https://dienthoaigiasoc.vn/wp-content/uploads/2018/12/capitech_hinhthucthanhtoan.png"
                          alt=""
                          className="mr-3"
                        />
                        <p>Thanh toán khi nhận hàng</p>
                      </div>
                    </Radio>
                    <Radio value={2} className="rdo">
                      <div className="flex items-center pt-1">
                        <img
                          src="https://static.thenounproject.com/png/407799-200.png"
                          alt=""
                          className="mr-3"
                        />
                        <p>Chuyển khoản qua ngân hàng</p>
                      </div>
                      {value === 2 ? (
                        <div className="sub-rdo">
                          <p className="font-medium">*Lưu ý:</p>
                          <div className="ml-5 text-[13px]">
                            •Nhân viên sẽ gọi xác nhận và thông báo số tiền cần
                            chuyển khoản của quý khách, quý khách vui lòng không
                            chuyển khoản trước.
                            <p>•ACB: 21148947 - NGUYỄN VĂN HỘI </p>
                            <p>
                              •Khi chuyển khoản quý khách ghi nội dung CK là:
                              TÊN FB CÁ NHÂN + MÃ ĐƠN HÀNG + SĐT
                            </p>
                          </div>
                        </div>
                      ) : null}
                    </Radio>
                  </Space>
                </Radio.Group>
              </div>
              <div className="giao-hang-nhanh flex items-center">
                <img width={140} src={IconGiaoHangNhanh} alt="" />
                <span>Thời gian dự kiến: &nbsp;</span>
                <span className="font-medium">{deliveryTime}</span>
              </div>
              <div className="flex justify-between items-center">
                <Link
                  to={"/cart"}
                  className="flex items-center link-underline underline"
                >
                  <IoIosArrowBack /> Giỏ hàng
                </Link>
                <button
                  type="submit"
                  className="inline-block main-sign-up-button"
                >
                  Hoàn tất đơn hàng
                </button>
              </div>
            </form>
          </div>
          <div className="checkout-right">
            {cartItems.map((cart) => (
              <div className="cart-checkout flex gap-4 mb-3" key={cart.ids}>
                <div className="relative inline-block">
                  <img
                    className="cart-checkout-img"
                    src={cart?.product.defaultImg}
                    alt=""
                  />
                  <p className="badge badge-cart-checkout absolute">
                    {cart?.product.soLuong}
                  </p>
                </div>
                <div className="cart-checkout-info text-[16px] font-normal">
                  <h2 className="mb-2">{cart.product.ten}</h2>
                  <p className="cart-checkout-mau-sac link-underline text-[14px]">
                    <span className="text-[#0F0E0E]">Màu sắc: </span>
                    {hinhAnhs.find(
                      (ha) => ha?.id_san_pham_chi_tiet?.id === cart.product.id
                    )?.mauSac || ""}
                  </p>
                  <p className="cart-checkout-size link-underline text-[14px]">
                    <span className="text-[#0F0E0E]">Kích cỡ: </span>
                    {cart.product.kichCo}
                  </p>
                  <p className="cart-checkout-gia-ban font-medium">
                    VNĐ {Intl.NumberFormat().format(cart.product.giaBan)}
                  </p>
                </div>
              </div>
            ))}

            <div className="horizontal"></div>

            <div className="checkout-giamGia">
              <input
                placeholder="Mã giảm giá"
                type="text"
                name="text"
                className="input-maGiamGia"
              />
              <button className="btn-apply-giamGia">Sử dụng</button>
              <div className="horizontal"></div>

              <div className="checkout-tinhTien">
                <div className="flex justify-between">
                  <h3>Tạm tính</h3>
                  <p>VNĐ {Intl.NumberFormat().format(calculateSubtotal())}</p>
                </div>
                <div className="flex justify-between">
                  <h3>Phí vận chuyển</h3>
                  <p>
                    VNĐ{" "}
                    {phiVanChuyen == "Miễn phí"
                      ? "Miễn phí"
                      : Intl.NumberFormat().format(phiVanChuyen)}
                  </p>
                </div>
                <div className="horizontal"></div>
                <div className="flex justify-between">
                  <h3 className="font-medium text-[20px]">Tổng cộng</h3>
                  <p className="text-[20px] font-medium">
                    VNĐ {Intl.NumberFormat().format(calculateTotal())}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
