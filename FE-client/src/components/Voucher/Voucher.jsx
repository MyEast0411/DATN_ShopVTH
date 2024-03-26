import { useState, useEffect } from "react";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import InfoTop from "../../layout/InfoTop";
import { Link } from "react-router-dom";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import CouponPrivate from "./CouponPrivate";
import CouponPublic from "./CouponPublic";

export default function Voucher() {
  const [coupons, setCoupons] = useState([]);

  const initialCoupons = [
    {
      id: "voucher001",
      percentOff: "25% OFF",
      maxValue: "300.000",
      minValue: "1.000.000",
      expirationDate: "tháng 7, 2024",
    },
    {
      id: "voucher002",
      percentOff: "20% OFF",
      maxValue: "250.000",
      minValue: "900.000",
      expirationDate: "tháng 8, 2024",
    },
  ];

  useEffect(() => {
    setCoupons(initialCoupons);
  }, []);

  return (
    <>
      <InfoTop />
      <Header />
      <div className=" container">
        <div className="pb-10">
          <Breadcrumbs size="lg" className="my-3">
            <BreadcrumbItem>
              <Link to="/">Trang chủ</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to="/shop">Sản phẩm</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link className="text-[#B4B4B3] cursor-default">
                Phiếu giảm giá
              </Link>
            </BreadcrumbItem>
          </Breadcrumbs>
        </div>

        <div className="flex w-full flex-col ">
          <Tabs aria-label="Options">
            <Tab key="public" title="Công khai">
              <Card>
                <CardBody>
                  {" "}
                  <div className="coupon-item  min-h-[400px]">
                    {coupons.map((coupon, index) => (
                      <CouponPublic key={index} {...coupon} />
                    ))}
                  </div>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="private" title="Cá nhân">
              <Card>
                <CardBody>
                  <div className="coupon-item min-h-[400px]">
                    {coupons.map((coupon, index) => (
                      <CouponPrivate key={index} {...coupon} />
                    ))}
                  </div>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
}
