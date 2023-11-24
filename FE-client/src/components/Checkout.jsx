import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { getProvinces, getDistricts, getWards } from "../api/Location";
import { Radio, Space, Input } from "antd";
import { IoIosArrowBack } from "react-icons/io";
import { notification } from "antd";
import successIcon from "../assets/successIcon.png";
import { getAllHA } from "../api/SanPham";
import axios from "axios";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

export default function Checkout() {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [hinhAnhs, setHinhAnhs] = useState([]);
  const [shippingCost, setShippingCost] = useState("");
  const [tongTien, setTongTien] = useState(0);
  const [value, setValue] = useState(1);

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
  };

  const fetchAllHinhAnh = async () => {
    try {
      const data = await getAllHA();
      setHinhAnhs(data);
    } catch (error) {}
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
    getDistricts(provinceCode).then((data) => {
      setDistricts(data);
    });
  };

  const handleDistrictChange = (districtCode) => {
    getWards(districtCode).then((data) => {
      setWards(data);
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
    const localShippingCost = value === 2 ? 0 : 10;
    let updatedShippingCost;

    if (value === 2) {
      updatedShippingCost = "Miễn phí";
    } else {
      updatedShippingCost = localShippingCost.toString();
    }
    const total = parseFloat(subtotal) + localShippingCost;

    useEffect(() => {
      setShippingCost(updatedShippingCost);
      setTongTien(total.toFixed(0));
    }, [updatedShippingCost, total]);

    return total.toFixed(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // ...
  
    const hoTen = e.target.elements.hoTen.value;
    const soDienThoai = e.target.elements.soDienThoai.value;
    const diaChi = e.target.elements.diaChi.value;
    const thanhPho =
      e.target.elements.city.options[e.target.elements.city.selectedIndex].text;
    const quanHuyen =
      e.target.elements.District.options[
        e.target.elements.District.selectedIndex
      ].text;
    const xaPhuong =
      e.target.elements.wards.options[e.target.elements.wards.selectedIndex].text;
  
    const phuongThucThanhToan =
      shippingCost === "Miễn phí"
        ? "Chuyển khoản qua ngân hàng"
        : "Thanh toán khi nhận hàng";
  
    const confirmSubmission = () => {
      axios
        .post("http://localhost:8080/hoa_don_chi_tiet/addHoaDonChiTietToHoaDon", {
          hoTen: hoTen,
          sdt: soDienThoai,
          diaChi: diaChi,
          thanhPho: thanhPho,
          huyen: quanHuyen,
          xa: xaPhuong,
          hinhThucThanhToan: phuongThucThanhToan,
          gioHang: cartItems,
          tongTien: tongTien,
        })
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
        });
    };
  
    confirmDialog({
      message: "Bạn có chắc muốn hoàn tất đơn hàng?",
      header: "Xác nhận đơn hàng",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-success",
      accept: confirmSubmission,
    });
  };
  

  return (
    <>
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
                  <Link to="/">Home</Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <Link to="/shop">Shop</Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <Link to="/cart">Cart</Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <Link className="text-[#B4B4B3] cursor-default">
                    Checkout
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
                <input name="hoTen" type="text" required autocomplete="off" />
                <label for="Code">Họ và tên</label>
              </div>
              <div className="inputGroupCodeSignUp">
                <input
                  name="soDienThoai"
                  type="number"
                  required
                  autocomplete="off"
                />
                <label for="Password">Số điện thoại</label>
              </div>
              <div className="inputGroupCodeSignUp">
                <input name="diaChi" type="text" required autocomplete="off" />
                <label for="Password">Địa chỉ</label>
              </div>

              <div className="flex justify-between gap-1 text-[13px]">
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
              <div className="cart-checkout flex gap-4 mb-3">
                <div className="relative inline-block">
                  <img
                    className="cart-checkout-img"
                    src={cart.product.defaultImg}
                    alt=""
                  />
                  <p className="badge badge-cart-checkout absolute">
                    {cart.product.soLuong}
                  </p>
                </div>
                <div className="cart-checkout-info text-[16px] font-normal">
                  <h2 className="mb-2">{cart.product.ten}</h2>
                  <p className="cart-checkout-mau-sac link-underline text-[14px]">
                    <span className="text-[#0F0E0E]">Màu sắc: </span>
                    {hinhAnhs.find(
                      (ha) => ha.id_san_pham_chi_tiet.id === cart.product.id
                    )?.mauSac || ""}
                  </p>
                  <p className="cart-checkout-size link-underline text-[14px]">
                    <span className="text-[#0F0E0E]">Kích cỡ: </span>
                    {cart.product.kichCo}
                  </p>
                  <p className="cart-checkout-gia-ban font-medium">
                    ${cart.product.giaBan}
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
                  <p>${calculateSubtotal()}</p>
                </div>
                <div className="flex justify-between">
                  <h3>Phí vận chuyển</h3>
                  <p>{shippingCost}</p>
                </div>
                <div className="horizontal"></div>
                <div className="flex justify-between">
                  <h3 className="font-medium text-[20px]">Tổng cộng</h3>
                  <p className="text-[20px] font-medium">${calculateTotal()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
