import React from "react";
import InfoTop from "./InfoTop";
import Header from "./Header";
import Popular from "./Popular";
import SaleBar from "./SaleBar";
import "./Layout.css";
import ShopRecommend from "./ShopRecommend";
import Footer from "./Footer";

export default function Layout() {
  return (
    <>
      <div className="w-full">
        <InfoTop />
        <Header />
        <SaleBar />
        <ShopRecommend />
        <Popular />
        <Footer />
      </div>
    </>
  );
}
