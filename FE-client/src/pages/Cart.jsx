import React, { useState, useEffect } from "react";
import InfoTop from "../layout/InfoTop";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Link } from "react-router-dom";
import AlsoLike from "../components/AlsoLike";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { notification } from "antd";
import successIcon from "../assets/successIcon.png";
import {
  Accordion,
  AccordionItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { MdHorizontalRule } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai"; //heart icon
import { CgTrashEmpty } from "react-icons/cg"; //trash icon
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { getAllHA } from "../api/SanPham";

export default function Cart() {
  const [api, contextHolder] = notification.useNotification();
  const [cartItems, setCartItems] = useState([]);
  const [hinhAnhs, setHinhAnhs] = useState([]);
  // const [kichCo, setKichCo] = useState(25);
  const [isCartEmpty, setIsCartEmpty] = useState(false);

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
      console.log(data);
      setHinhAnhs(data);
    } catch (error) {
      return;
    }
  };

  const getCartItems = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
    console.log("cart", cart);
    setIsCartEmpty(cart.length === 0);
  };

  useEffect(() => {
    fetchAllHinhAnh();
    getCartItems();
  }, []);

  const handleDelete = (product) => {
    confirmDialog({
      message: "Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?",
      header: "Xác nhận xóa",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const updatedCart = cart.filter(
          (item) => item.product.ids !== product.ids
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        getCartItems();
        if (window.cartUpdatedCallback) {
          window.cartUpdatedCallback();
        }
        openNotificationWithIcon("success", "Xóa thành công!");
      },
    });
  };

  const [selectedKeysQuantity, setSelectedKeysQuantity] = React.useState(
    new Set([""])
  );

  const selectedValueQuantity = React.useMemo(
    () => Array.from(selectedKeysQuantity).join(", ").replaceAll("_", " "),
    [selectedKeysQuantity]
  );

  const handleQuantityChange = (selected) => {
    setSelectedKeysQuantity(new Set([selected]));
  };

  const updateCartItemQuantity = (productId, newQuantity) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = cart.map((item) => {
      if (item.product.ids === productId) {
        return {
          ...item,
          product: {
            ...item.product,
            soLuong: newQuantity,
          },
        };
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    getCartItems();
    if (window.cartUpdatedCallback) {
      window.cartUpdatedCallback();
    }
    openNotificationWithIcon("success", "Cập nhật số lượng thành công!");
  };
  const calculateSubtotal = () => {
    let subtotal = 0;

    cartItems.forEach((cart) => {
      const quantity =
        parseInt(selectedValueQuantity) || parseInt(cart.product.soLuong);
      subtotal += quantity * cart.product.giaBan;
    });

    return subtotal;
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const total = subtotal;
    return Intl.NumberFormat().format(total);
  };

  return (
    <>
      {contextHolder}
      <ConfirmDialog />
      <InfoTop />
      <Header />
      <div className="breadcrumbs-cart w-full sticky top-20">
        <Breadcrumbs size="lg" className="my-3 design-w">
          <BreadcrumbItem>
            <Link to="/">Trang chủ</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/shop">Sản phẩm</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link className="text-[#B4B4B3] cursor-default">Giỏ hàng</Link>
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="grid grid-cols-3 gap-4 main-cart">
        <div className="col-span-2 main-cart-item">
          <h2 className="main-cart-item-title-bag mb-2">Túi</h2>
          {isCartEmpty ? (
            <>
              <span className="link-underline font-medium">
                Không có sản phẩm nào trong giỏ hàng!
              </span>
              <img
                className="mt-10"
                src="https://rackstore.be/assets/images/empty-cart.png"
                alt=""
              />
            </>
          ) : (
            cartItems.map((cart) => (
              <div className="cart-item-card" key={cart.id}>
                <div className="flex justify-flex-start gap-4">
                  <img
                    src={cart.product.defaultImg}
                    alt=""
                    className="cart-item-card-img-product"
                  />
                  <div className="cart-item-card-info">
                    <h2 className="cart-item-card-name-product">
                      {cart.product.ten}
                    </h2>
                    <div className="cart-item-card-gender">
                      {cart.product.theLoai}
                    </div>
                    <div className="cart-item-card-color mb-2">
                      {hinhAnhs.find(
                        (ha) => ha?.id_san_pham_chi_tiet?.id === cart.product.id
                      )?.mauSac || ""}
                    </div>
                    <div className="gia-ban-cartItem">
                      VNĐ {Intl.NumberFormat().format(cart.product.giaBan)}
                    </div>
                    <div className="cart-item-card-size flex align-center">
                      <h2 className="cart-item-card-size-title mr-2">
                        Kích cỡ
                      </h2>
                      <div className="cart-item-card-size-dropdown">
                        <Dropdown>
                          <DropdownTrigger>
                            <Button
                              variant="bordered"
                              className="capitalize"
                              style={{ fontSize: "13px", padding: "0 12px" }}
                            >
                              {cart.product.kichCo}
                            </Button>
                          </DropdownTrigger>
                        </Dropdown>
                      </div>
                      <div className="cart-item-card-quantity flex align-center">
                        <h2 className="cart-item-card-size-title mr-2 ml-5">
                          Số lượng
                        </h2>
                        <div className="cart-item-card-quantity">
                          <div className="cart-item-card-size-dropdown">
                            <Dropdown>
                              <DropdownTrigger>
                                <Button
                                  variant="bordered"
                                  className="capitalize"
                                  style={{ fontSize: "13px", padding: "0" }}
                                >
                                  {selectedValueQuantity ||
                                    cart.product.soLuong}
                                </Button>
                              </DropdownTrigger>
                              <DropdownMenu
                                aria-label="Single selection example"
                                variant="flat"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={
                                  selectedKeysQuantity[cart.product.ids] ||
                                  new Set([""])
                                }
                                onSelectionChange={(selected) => {
                                  handleQuantityChange(selected);
                                  const productId = cart.product.ids;
                                  const newQuantity = selected.currentKey;
                                  setSelectedKeysQuantity((prev) => ({
                                    ...prev,
                                    [productId]: new Set([
                                      newQuantity.toString(),
                                    ]),
                                  }));
                                  updateCartItemQuantity(
                                    productId,
                                    newQuantity
                                  );
                                }}
                              >
                                <DropdownItem key="1">1</DropdownItem>
                                <DropdownItem key="2">2</DropdownItem>
                                <DropdownItem key="3">3</DropdownItem>
                                <DropdownItem key="4">4</DropdownItem>
                                <DropdownItem key="5">5</DropdownItem>
                                <DropdownItem key="6">6</DropdownItem>
                                <DropdownItem key="7">7</DropdownItem>
                                <DropdownItem key="8">8</DropdownItem>
                                <DropdownItem key="9">9</DropdownItem>
                                <DropdownItem key="10">10</DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="cart-item-card-icon flex align-center">
                      <AiOutlineHeart className="cart-item-card-icon-heart" />
                      <CgTrashEmpty
                        className="cart-item-card-icon-trash"
                        onClick={() => handleDelete(cart.product)}
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="cart-item-shipping">
                  <h2 className="font-medium">Giao hàng dự kiến</h2>
                  <div className="cart-item-arrives">
                    <span>25/11/2023</span>
                    <Link
                      to="/cart"
                      className="underline ml-3 cart-item-arrives-edit-location"
                    >
                      Cập nhật địa chỉ  
                    </Link>
                  </div>
                </div> */}
                <div className="cart-item-horizontal"></div>
              </div>
            ))
          )}
        </div>
        <div className="main-checkout col-span-1 sticky-grid">
          <h2 className="summary-title">Tạm tính</h2>
          <div className="accordion">
            <Accordion
              style={{
                fontSize: "10px",
                margin: "0 !important",
                padding: "0 !important",
              }}
            >
              <AccordionItem
                key="1"
                aria-label="Bạn có mã giảm giá?"
                title="Bạn có mã giảm giá?"
                className="font-medium"
              >
                <div className="main-input-promo-code">
                  <input type="text" name="text" className="input-promo-code" />
                  <button className="apply-promo-code-btn">Áp dụng</button>
                </div>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="main-subtotal">
            <div className="flex justify-between">
              <h2 className="subtotal-title">Tổng phụ</h2>
              <div className="price-subtotal">
                VNĐ {Intl.NumberFormat().format(calculateSubtotal())}
              </div>
            </div>

            <div className="flex justify-between">
              <h2 className="subtotal-title">Thuế ước tính</h2>
              <div className="price-subtotal">
                <MdHorizontalRule />
              </div>
            </div>
            <div className="horizontal"></div>
            <div className="flex justify-between">
              <h2 className="subtotal-title">Tổng</h2>
              <div className="price-subtotal">VNĐ {calculateTotal()}</div>
            </div>
            <div className="horizontal"></div>
            <Link
              to={"/checkout"}
              className="checkout-button mb-5 flex justify-center"
            >
              <button>Thanh toán</button>
            </Link>
            <div className="paypal-button flex justify-center">
              <img
                src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-VNPAY-QR.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <AlsoLike />
      <Footer />
    </>
  );
}
