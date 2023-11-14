import React from "react";
import InfoTop from "../layout/InfoTop";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { MdHorizontalRule } from "react-icons/md";

export default function Cart() {
  return (
    <>
      <InfoTop />
      <Header />
      <div className="grid grid-cols-3 gap-4 main-cart">
        <div className="col-span-2 main-cart-item">
          <h2 className="main-cart-item-title-bag">BAG</h2>
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
                <div className="cart-item-card-size">
                  <h2 className="cart-item-card-size-title">Size</h2>
                  <div className="cart-item-card-size-dropdown">
                    {/* dang lam do o day */}
                  </div>
                </div>
              </div>
            </div>
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
      <Footer />
    </>
  );
}
