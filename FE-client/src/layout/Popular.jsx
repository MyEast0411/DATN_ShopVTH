import React from "react";
import { Link } from "react-router-dom";

export default function Popular() {
  return (
    <>
      <div className="main-shop-recommend main-popular">
        <h1>POPULAR RIGHT NOW</h1>
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

      <div className="main-shop-recommend main-popular">
        <h1>EXPLORE MORE FROM JORDAN</h1>
        <div className="flex explore-main">
          <Link to="/shop" className="explore relative">
            <img
              src="https://static.nike.com/a/images/f_auto,cs_srgb/w_1536,c_limit/89d420b9-7e07-4f52-a3cb-e7731450faf3/jordan.jpg"
              alt=""
            />
            <div className="explore-absolute">
              <h2>JORDAN IN SNKRS</h2>
              <div className="explore-dowload">Download</div>
            </div>
          </Link>
          <Link to="/shop" className="explore relative">
            <img
              src="https://i.ebayimg.com/images/g/pu8AAOSwlARixEf3/s-l1200.webp"
              alt=""
            />
            <div className="explore-absolute">
              <h2>AIRE JORDAN COLLECTION</h2>
              <div className="explore-button">Explore</div>
            </div>
          </Link>
          <Link to="/shop" className="explore relative">
            <img
              src="https://cdn.britannica.com/02/204502-050-01D48E43/Chicago-Bulls-basketball-Michael-Jordan.jpg"
              alt=""
            />
            <div className="explore-absolute">
              <h2>JORDAN BASKETBALL</h2>
              <div className="explore-button">Explore</div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
