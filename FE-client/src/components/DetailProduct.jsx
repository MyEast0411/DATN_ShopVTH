import React from "react";
import InfoTop from "../layout/InfoTop";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";

export default function DetailProduct() {
  return (
    <>
      <InfoTop />
      <Header />
      <div className="main-detail-product">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1 detail-product-left relative">
            <div className="grid grid-cols-6 gap-4 sticky-grid">
              <div className="col-start-1 col-end-2">
                <div className="flex flex-col container-main-detail-img-pro">
                  <img
                    src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/36d03e6f-614e-47b3-a950-1fb12fbc023f/air-jordan-5-navy-mens-shoes-Qw4dtb.png"
                    alt=""
                    className="main-detail-product-img"
                  />
                  <img
                    src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/36d03e6f-614e-47b3-a950-1fb12fbc023f/air-jordan-5-navy-mens-shoes-Qw4dtb.png"
                    alt=""
                    className="main-detail-product-img"
                  />
                  <img
                    src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/36d03e6f-614e-47b3-a950-1fb12fbc023f/air-jordan-5-navy-mens-shoes-Qw4dtb.png"
                    alt=""
                    className="main-detail-product-img"
                  />
                  <img
                    src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/36d03e6f-614e-47b3-a950-1fb12fbc023f/air-jordan-5-navy-mens-shoes-Qw4dtb.png"
                    alt=""
                    className="main-detail-product-img"
                  />
                  <img
                    src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/36d03e6f-614e-47b3-a950-1fb12fbc023f/air-jordan-5-navy-mens-shoes-Qw4dtb.png"
                    alt=""
                    className="main-detail-product-img"
                  />
                  <img
                    src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/36d03e6f-614e-47b3-a950-1fb12fbc023f/air-jordan-5-navy-mens-shoes-Qw4dtb.png"
                    alt=""
                    className="main-detail-product-img"
                  />
                  <img
                    src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/36d03e6f-614e-47b3-a950-1fb12fbc023f/air-jordan-5-navy-mens-shoes-Qw4dtb.png"
                    alt=""
                    className="main-detail-product-img"
                  />
                  <img
                    src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/36d03e6f-614e-47b3-a950-1fb12fbc023f/air-jordan-5-navy-mens-shoes-Qw4dtb.png"
                    alt=""
                    className="main-detail-product-img"
                  />
                </div>
              </div>
              <div className="col-start-2 col-end-6">
                <img
                  src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/36d03e6f-614e-47b3-a950-1fb12fbc023f/air-jordan-5-navy-mens-shoes-Qw4dtb.png"
                  alt=""
                  className="main-img-detail-pro"
                />
              </div>
            </div>
          </div>

          <div className="col-span-1 detail-product-right">
            <div className="detail-pro-name">Air Jordan 5 "Navy"</div>
            <div className="detail-pro-gender">Men's Shoes</div>
            <div className="detail-pro-price mt-5">$210</div>
            <div className="choose-color-product flex">
              <img
                src="https://static.nike.com/a/images/t_PDP_144_v1/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/89b9c5f5-9049-422d-aa76-19ea5323ef58/air-jordan-1-mid-shoes-7wnzmw.png"
                alt=""
                className="choose-color-img-pro"
              />
              <img
                src="https://static.nike.com/a/images/t_PDP_144_v1/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b8e08e8d-d273-4500-a0c5-eceba7210943/air-jordan-1-mid-shoes-7wnzmw.png"
                alt=""
                className="choose-color-img-pro"
              />
              <img
                src="https://static.nike.com/a/images/t_PDP_144_v1/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/46f55604-0c16-43d7-8d74-05b379c140dc/air-jordan-1-mid-shoes-7wnzmw.png"
                alt=""
                className="choose-color-img-pro"
              />
            </div>
            <div className="detail-pro-select-size-title flex justify-between mt-10">
              <div> Select Size</div>
              <Link to="/size-guide" className="size-guide underline">
                {" "}
                Size Guide
              </Link>
            </div>
            <div className="detail-pro-select-size-button-choose grid grid-cols-2 gap-4">
              <div className="out-of-size text-center">M 7 / W 8.5</div>
              <div className="detail-pro-select-size-button text-center">
                M 8 / W 9
              </div>
              <div className="detail-pro-select-size-button text-center">
                M 9 / W 9.5
              </div>
              <div className="detail-pro-select-size-button text-center">
                M 9.5 / W 10
              </div>
              <div className="out-of-size text-center">M 9.5 / W 10</div>
              <div className="out-of-size text-center">M 9.5 / W 10</div>
              <div className="detail-pro-select-size-button text-center">
                M 9.5 / W 10
              </div>
              <div className="detail-pro-select-size-button text-center">
                M 9.5 / W 10
              </div>
              <div className="detail-pro-select-size-button text-center">
                M 9.5 / W 10
              </div>
              <div className="detail-pro-select-size-button text-center">
                M 9.5 / W 10
              </div>
              <div className="detail-pro-select-size-button text-center">
                M 9.5 / W 10
              </div>
              <div className="out-of-size text-center">M 9.5 / W 10</div>
              <div className="out-of-size text-center">M 9.5 / W 10</div>
              <div className="out-of-size text-center">M 9.5 / W 10</div>
              <div className="detail-pro-select-size-button text-center">
                M 9.5 / W 10
              </div>
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
            <div className="flex flex-col detail-pro-group-btn">
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
