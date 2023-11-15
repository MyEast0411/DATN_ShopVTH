import React from "react";
import InfoTop from "../layout/InfoTop";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Link } from "react-router-dom";
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

export default function Cart() {
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
      <div className="grid grid-cols-3 gap-4 main-cart">
        <div className="col-span-2 main-cart-item">
          <h2 className="main-cart-item-title-bag mb-2">BAG</h2>
          <div className="cart-item-card">
            <div className="flex justify-flex-start gap-4">
              <img
                src="https://secure-images.nike.com/is/image/DotCom/FD6812_400?align=0,1&cropN=0,0,0,0&resMode=sharp&bgc=f5f5f5&wid=150&fmt=jpg"
                alt=""
                className="cart-item-card-img-product"
              />
              <div className="cart-item-card-info">
                <h2 className="cart-item-card-name-product">
                  Air Jordan 5 "Navy"
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
      <div className="cart-also-like">
        <h2 className="cart-also-like-title">You Might Also Like</h2>
        <div className="main-shop-recommend main-popular">
          <div className="x-scroll-product flex snap-x overflow-x-auto w-full">
            <Link to="/shop" className="x-scroll-product-card snap-center">
              <img
                className="x-scroll-product-card-img"
                src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/649c0ead-0d4a-45b5-aa57-e5904c0317e4/air-jordan-1-high-og-big-kids-shoes-r70xJ0.png"
                alt=""
              />
              <h2>AIR JORDAN 1S</h2>
              <p className="popular-des">MEN'S SHOES</p>
              <p className="popular-price">$180</p>
              <p className="popular-price-discount">$200</p>
            </Link>
            <Link to="/shop" className="x-scroll-product-card snap-center">
              <img
                className="x-scroll-product-card-img"
                src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/05b0d7e9-9688-49db-8266-8ee16fa33307/air-jordan-5-navy-mens-shoes-Qw4dtb.png"
                alt=""
              />
              <h2>AIR JORDAN 1 HIGH OG</h2>
              <p className="popular-des">BIG KIDS' SHOES</p>
              <p className="popular-price">$140</p>
            </Link>
            <Link to="/shop" className="x-scroll-product-card snap-center">
              <img
                className="x-scroll-product-card-img"
                src="https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/h_467,c_limit/21e5acfb-6d5b-4322-971d-280da55791f7/jordan-1-retro-high-og-little-kids-shoes-xB8DZ1.png"
                alt=""
              />
              <h2>JORDAN 1 RETRO HIGH OG</h2>
              <p className="popular-des">LITTLE KIDS' SHOES</p>
              <p className="popular-price">$80</p>
            </Link>
            <Link to="/shop" className="x-scroll-product-card snap-center">
              <img
                className="x-scroll-product-card-img"
                src="https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/h_467,c_limit/de1a1d13-58e6-4a36-9060-03c9cfbb46fb/jordan-1-retro-high-og-baby-toddler-shoes-WZPRKx.png"
                alt=""
              />
              <h2>JORDAN 1 RETRO HIGH OG</h2>
              <p className="popular-des">BABY/TODDLER SHOES</p>
              <p className="popular-price">$70</p>
            </Link>
            <Link to="/shop" className="x-scroll-product-card snap-center">
              <img
                className="x-scroll-product-card-img"
                src="https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/h_467,c_limit/lyb0odnnpuveai0a6ycg/jordan-1-baby-crib-bootie-bDCbGm.png"
                alt=""
              />
              <h2>JORDAN 1</h2>
              <p className="popular-des">BABY CRIB BOOTIE</p>
              <p className="popular-price">$60</p>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
