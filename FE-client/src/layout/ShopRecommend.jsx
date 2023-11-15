import React from "react";
import { Link } from "react-router-dom";

export default function ShopRecommend() {
  return (
    <>
      <div className="main-shop-recommend">
        <h1>SHOP JORDAN ESSENTIALS</h1>
        <div className="x-scroll-product flex snap-x overflow-x-auto w-full">
          <Link to="/shop" className="x-scroll-product-card snap-center">
            <img
              className="x-scroll-product-card-img"
              src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/ba141816-b71f-4632-b78e-fa4cac57df73/air-jordan-11-neapolitan-womens-shoes-rHKMNx.png"
              alt=""
            />
            <h2>AIR JORDAN 1S</h2>
          </Link>
          <Link to="/shop" className="x-scroll-product-card snap-center">
            <img
              className="x-scroll-product-card-img"
              src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/05b0d7e9-9688-49db-8266-8ee16fa33307/air-jordan-5-navy-mens-shoes-Qw4dtb.png"
              alt=""
            />
            <h2>AIR JORDAN 12 "WHEAT"</h2>
          </Link>
          <Link to="/shop" className="x-scroll-product-card snap-center">
            <img
              className="x-scroll-product-card-img"
              src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b0a8292e-84b1-4a70-b5d1-43529af31b2f/air-jordan-1-high-og-big-kids-shoes-r70xJ0.png"
              alt=""
            />
            <h2>AIR JORDAN "CELEBRATION"</h2>
          </Link>
          <Link to="/shop" className="x-scroll-product-card snap-center">
            <img
              className="x-scroll-product-card-img"
              src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/1c056164-d485-4dff-b96a-c5d4337e1db5/air-jordan-xxxviii-big-kids-shoes-zjsc9G.png"
              alt=""
            />
            <h2>AIR JORDAN LEGACY 312 LOW</h2>
          </Link>
          <Link to="/shop" className="x-scroll-product-card snap-center">
            <img
              className="x-scroll-product-card-img"
              src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/83e2954a-26e4-49ff-9c8d-271d6ba871ce/air-jordan-4-craft-olive-mens-shoes.png"
              alt=""
            />
            <h2>AIR JORDAN 3 "OFF Noir"</h2>
          </Link>
        </div>
      </div>

      <div className="main-shop-recommend main-shop-recommend-2">
        <h1>JORDAN GEAR FOR THE ENTIRE FAM</h1>
        <div className="x-scroll-product flex justify-between w-full">
          <div className="x-scroll-product-card snap-center">
            <Link to="/shop">
              <img
                className="x-scroll-product-card-img"
                src="https://5.imimg.com/data5/SELLER/Default/2021/4/EY/SE/AO/86432004/whatsapp-image-2021-04-10-at-9-52-28-am-500x500.jpeg"
                alt=""
              />
            </Link>
            <h2>JORDAN MEN</h2>
            <div className="shop-button mb-10">
              <Link to="/shop">
                <button class="btn-shop-button">Shop</button>
              </Link>
            </div>
          </div>
          <div className="x-scroll-product-card snap-center">
            <Link to="/shop">
              <img
                className="x-scroll-product-card-img"
                src="https://i.pinimg.com/originals/b5/1b/cc/b51bccf63ad0e6aefe59c1e8a50a2445.jpg"
                alt=""
              />
            </Link>
            <h2>JORDAN WOMEN</h2>
            <div className="shop-button mb-10">
              <Link to="/shop">
                <button class="btn-shop-button">Shop</button>
              </Link>
            </div>
          </div>
          <div className="x-scroll-product-card snap-center">
            <Link to="/shop">
              <img
                className="x-scroll-product-card-img"
                src="https://www.marmonsports.com/img/p/4/7/0/4/5/47045.jpg"
                alt=""
              />
            </Link>
            <h2>JORDAN KIDS</h2>
            <div className="shop-button mb-10">
              <Link to="/shop">
                <button class="btn-shop-button">Shop</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
