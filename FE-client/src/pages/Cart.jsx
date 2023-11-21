import React, { useState, useEffect } from "react";
import InfoTop from "../layout/InfoTop";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Link } from "react-router-dom";
import AlsoLike from "../components/AlsoLike";
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
import { getSPCTbyId } from "../api/SanPham";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const getCartItems = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log("cart: ", cart);
    setCartItems(cart);
  };
  useEffect(() => {
    getCartItems();
  }, []);
   //--->>get allSPCT by array isSPCT 
  // const fetchSPCTByIdSP = async () => {
  //   try {
  //     const data = await getSPCTbyId(cartItems.id);
  //   } catch (error) {
  //     console.error("Error fetchSPCTbyId():", error);
  //   }
  // };
  // useEffect(() => {
  //   fetchSPCTByIdSP();
  // }, []);

  const [selectedKeysSize, setSelectedKeysSize] = React.useState(
    new Set(["M 8.5 / W 10"])
  );

  const selectedValueSize = React.useMemo(
    () => Array.from(selectedKeysSize).join(", ").replaceAll("_", " "),
    [selectedKeysSize]
  );

  const [selectedKeysQuantity, setSelectedKeysQuantity] = React.useState(
    new Set(["1"])
  );

  const selectedValueQuantity = React.useMemo(
    () => Array.from(selectedKeysQuantity).join(", ").replaceAll("_", " "),
    [selectedKeysQuantity]
  );

  return (
    <>
      <InfoTop />
      <Header />
      <div className="breadcrumbs-cart w-full sticky top-20">
        <Breadcrumbs size="lg" className="my-3 design-w">
          <BreadcrumbItem>
            <Link to="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/shop">Shop</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link className="text-[#B4B4B3] cursor-default">Cart</Link>
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="grid grid-cols-3 gap-4 main-cart">
        <div className="col-span-2 main-cart-item">
          <h2 className="main-cart-item-title-bag mb-2">BAG</h2>
          <div className="cart-item-card">
            <div className="flex justify-flex-start gap-4">
              <img
                src="https://secure-images.nike.com/is/image/DotCom/FD1437_031?align=0,1&cropN=0,0,0,0&resMode=sharp&bgc=f5f5f5&wid=150&fmt=jpg"
                alt=""
                className="cart-item-card-img-product"
              />
              <div className="cart-item-card-info">
                <h2 className="cart-item-card-name-product">
                  Air Jordan 1 High OG
                </h2>
                <div className="cart-item-card-gender">Men's Shoes</div>
                <div className="cart-item-card-color">Black / White / Blue</div>
                <div className="cart-item-card-size flex align-center">
                  <h2 className="cart-item-card-size-title mr-2">Size</h2>
                  <div className="cart-item-card-size-dropdown">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button
                          variant="bordered"
                          className="capitalize"
                          style={{ fontSize: "13px", padding: "0 12px" }}
                        >
                          {selectedValueSize}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Single selection example"
                        variant="flat"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selectedKeysSize}
                        onSelectionChange={setSelectedKeysSize}
                      >
                        <DropdownItem key="M 8.5 / W 10">
                          M 8.5 / W 10
                        </DropdownItem>
                        <DropdownItem key="M 8 / W 10.5">
                          M 8 / W 10.5
                        </DropdownItem>
                        <DropdownItem key="M 9.5 / W 11">
                          M 9.5 / W 11
                        </DropdownItem>
                        <DropdownItem key="M 10.5 / W 12">
                          M 10.5 / W 12
                        </DropdownItem>
                        <DropdownItem key="M 11 / W 12.5">
                          M 11 / W 12.5
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  <div className="cart-item-card-quantity flex align-center">
                    <h2 className="cart-item-card-size-title mr-2 ml-5">
                      Quantity
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
                              {selectedValueQuantity}
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu
                            aria-label="Single selection example"
                            variant="flat"
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={selectedKeysQuantity}
                            onSelectionChange={setSelectedKeysQuantity}
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
                  <CgTrashEmpty className="cart-item-card-icon-trash" />
                </div>
              </div>
            </div>
            <div className="cart-item-shipping">
              <h2 className="font-medium">Shipping</h2>
              <div className="cart-item-arrives">
                <span>Arrives by Tue, Nov 21</span>
                <Link
                  to="/cart"
                  className="underline ml-3 cart-item-arrives-edit-location"
                >
                  Edit Location
                </Link>
              </div>
            </div>
            <div className="cart-item-horizontal"></div>
          </div>
        </div>
        <div className="main-checkout col-span-1">
          <h2 className="summary-title">Summary</h2>
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
                aria-label="Do you have a Promo Code?"
                title="Do you have a Promo Code?"
                className="font-medium"
              >
                <div className="main-input-promo-code">
                  <input type="text" name="text" className="input-promo-code" />
                  <button className="apply-promo-code-btn">Apply</button>
                </div>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="main-subtotal">
            <div className="flex justify-between">
              <h2 className="subtotal-title">Subtotal</h2>
              <div className="price-subtotal">$140.00</div>
            </div>
            <div className="flex justify-between">
              <h2 className="subtotal-title">Estimated Shipping & Handling</h2>
              <div className="price-subtotal">$7.00</div>
            </div>
            <div className="flex justify-between">
              <h2 className="subtotal-title">Estimated Tax</h2>
              <div className="price-subtotal">
                <MdHorizontalRule />
              </div>
            </div>
            <div className="horizontal"></div>
            <div className="flex justify-between">
              <h2 className="subtotal-title">Total</h2>
              <div className="price-subtotal">$147.00</div>
            </div>
            <div className="horizontal"></div>
            <div className="checkout-button mb-5 flex justify-center">
              <button>Checkout</button>
            </div>
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
