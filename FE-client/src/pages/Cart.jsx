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
import { AiOutlineHeart } from "react-icons/ai"; //heart icon
import { CgTrashEmpty } from "react-icons/cg"; //trash icon
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { getAllHA, getSanPhamChiTietByMaListSPCT } from "../api/SanPham";

export default function Cart() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [api, contextHolder] = notification.useNotification();
  const [cartItems, setCartItems] = useState([]);
  const [hinhAnhs, setHinhAnhs] = useState([]);
  const [arrayLocal, setArrayLocal] = useState([]);
  const [isCartEmpty, setIsCartEmpty] = useState(false);

  const [selectedKeys, setSelectedKeys] = React.useState(new Set([""]));

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
    } catch (error) {
      return;
    }
  };

  const fetchCartItemsFromLocalStorage = () => {
    try {
      const data = localStorage.getItem("maList");
      setArrayLocal(data);
      const maList = data ? JSON.parse(data).map((item) => item.ma) : [];

      const fetchAllCartItem = async () => {
        try {
          if (maList.length > 0) {
            const data = await getSanPhamChiTietByMaListSPCT(maList);
            setCartItems(data);
          } else {
            setCartItems([]);
            setIsCartEmpty(true);
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchAllCartItem();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllHinhAnh();
    fetchCartItemsFromLocalStorage();
  }, []);

  const handleDelete = (cart) => {
    console.log("arrayLocal", arrayLocal);
    console.log("cart:", cart);
    confirmDialog({
      message: "Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?",
      header: "Xác nhận xóa",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => {
        try {
          const maList = localStorage.getItem("maList");
          const arrayLocal = maList ? JSON.parse(maList) : [];

          const indexToDelete = arrayLocal.findIndex(
            (item) => item.ma === cart.ma
          );

          if (indexToDelete !== -1) {
            arrayLocal.splice(indexToDelete, 1);

            localStorage.setItem("maList", JSON.stringify(arrayLocal));

            fetchCartItemsFromLocalStorage();
            if (window.cartUpdatedCallback) {
              window.cartUpdatedCallback();
            }
            openNotificationWithIcon("success", "Xóa thành công!");
          } else {
            console.log("Item not found in arrayLocal");
          }
        } catch (error) {
          console.error(error);
        }
      },
    });
  };

  const handleQuantityChange = (soLuong, ma) => {
    setSelectedKeys(new Set([soLuong]));

    console.log("soLuong:", soLuong);
    console.log("ma:", ma);

    updateCartItemQuantity(soLuong, ma);
  };

  const updateCartItemQuantity = (soLuong, ma) => {
    try {
      const maList = localStorage.getItem("maList")
        ? JSON.parse(localStorage.getItem("maList"))
        : [];

      console.log("maList:", maList);
      const indexToUpdate = maList.findIndex((item) => item.ma === ma);
      console.log("indexToUpdate", indexToUpdate);

      if (indexToUpdate !== -1) {
        maList[indexToUpdate].quantity = soLuong;
        localStorage.setItem("maList", JSON.stringify(maList));
        console.log("Updated maList:", maList);
        openNotificationWithIcon("success", "Cập nhật số lượng thành công!");
      } else {
        console.log("Item not found in maList");
      }
      fetchCartItemsFromLocalStorage();
    } catch (error) {
      console.error(error);
    }
  };

  const calculateSubtotal = () => {
    let subtotal = 0;

    cartItems.forEach((cart) => {
      const quantity =
        JSON.parse(arrayLocal).find((item) => item.ma === cart.ma)?.quantity ||
        1;

      subtotal += cart.giaBan * quantity;
    });

    return subtotal;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    // const tax = 25000;
    const total = subtotal;
    return total;
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
                    src={cart.defaultImg}
                    alt=""
                    className="cart-item-card-img-product"
                  />
                  <div className="cart-item-card-info">
                    <h2 className="cart-item-card-name-product">{cart.ten}</h2>
                    <div className="cart-item-card-gender">
                      {cart.id_san_pham.theLoai}
                    </div>
                    <div className="cart-item-card-color mb-2">
                      {hinhAnhs.find(
                        (ha) => ha?.id_san_pham_chi_tiet?.id === cart.id
                      )?.mauSac || ""}
                    </div>
                    <div className="gia-ban-cartItem">
                      VNĐ {Intl.NumberFormat().format(cart.giaBan)}
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
                              {cart.id_kich_co.ten}
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
                                  {JSON.parse(arrayLocal).find(
                                    (item) => item.ma === cart.ma
                                  )?.quantity || "1"}
                                </Button>
                              </DropdownTrigger>
                              <DropdownMenu
                                aria-label="Single selection example"
                                variant="flat"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selectedKeys}
                                onSelectionChange={(selected) => {
                                  setSelectedKeys(selected);
                                  handleQuantityChange(
                                    selected.currentKey,
                                    cart.ma
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
                        onClick={() => handleDelete(cart)}
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
              <div className="price-subtotal items-center">_</div>
            </div>
            <div className="horizontal"></div>
            <div className="flex justify-between">
              <h2 className="subtotal-title">Tổng</h2>
              <div className="price-subtotal">VNĐ {Intl.NumberFormat().format(calculateTotal())}</div>
            </div>
            <div className="horizontal"></div>
            {calculateTotal() > 0 ? (
              <Link
                to={"/checkout"}
                className="checkout-button mb-4 flex justify-center"
              >
                <button>Thanh toán</button>
              </Link>
            ) : (
              <div className="checkout-button mb-4 flex justify-center cursor-not-allowed">
                <button className="cursor-not-allowed" disabled>
                  Thanh toán
                </button>
              </div>
            )}

            <div className="paypal-button flex justify-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/PayPal_logo.svg/2560px-PayPal_logo.svg.png"
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
