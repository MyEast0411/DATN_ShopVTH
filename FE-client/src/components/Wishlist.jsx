import InfoTop from "../layout/InfoTop";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Link } from "react-router-dom";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

export default function Wishlist() {
  return (
    <>
      <InfoTop />
      <Header />
      <div className="container">
        <Breadcrumbs size="lg" className="my-3">
          <BreadcrumbItem>
            <Link to="/">Trang chủ</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/shop">Sản phẩm</Link>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <Link className="text-[#B4B4B3] cursor-default">Yêu thích</Link>
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <Footer />
    </>
  );
}
