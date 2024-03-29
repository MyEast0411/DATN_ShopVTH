import { useState, useEffect } from "react";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import InfoTop from "../../layout/InfoTop";
import { Link } from "react-router-dom";
import { Breadcrumbs, BreadcrumbItem, user } from "@nextui-org/react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import CouponPrivate from "./CouponPrivate";
import CouponPublic from "./CouponPublic";
import axios from "axios";
import { format } from 'date-fns';

export default function Voucher() {
  const [coupons, setCoupons] = useState([]);
  const [activeTab, setActiveTab] = useState('Công khai');
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

  const getVoucherByIdKhachHang = async () => {
    await axios.get(`http://localhost:8080/voucher/getVoucherByIdKhachHang/${JSON.parse(localStorage.getItem("user"))?.id}`).then((response) => {
      setCoupons([]);
      response.data.map((item) => {
        console.log(response.data);
        const newCoupon = {
          id: item.idVoucher,
          percentOff: item.tenVoucher,
          maxValue: Intl.NumberFormat().format(item.giaTriMax),
          minValue: Intl.NumberFormat().format( item.giaTriMin),
          expirationDate:  format(item.ngayKetThuc, 'dd-MM-yyyy') 
        };
        setCoupons((prevCoupons) => [...prevCoupons, newCoupon]);
      });
    })
  }
  const getVocherDuocDung = async () => {
    await axios.get("http://localhost:8080/voucher/getVouchers").then((response) => {
      setCoupons([]);
      response.data.map((item) => {
        const newCoupon = {
          id: item.id,
          percentOff: item.code,
          maxValue: Intl.NumberFormat().format(item.giaTriMax),
          minValue: Intl.NumberFormat().format( item.giaTriMin),
          expirationDate:  format(item.ngayKetThuc, 'dd-MM-yyyy') 
        };
        setCoupons((prevCoupons) => [...prevCoupons, newCoupon]);
      });
    }).catch((err) => { 
      console.log(err);
    });
  };
  useEffect(() => {
    // getVoucherByIdKhachHang();
    // setCoupons(initialCoupons);
    getVocherDuocDung();
  }, []);
  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      if (tab == 'Công khai') {
        getVocherDuocDung();
      } else if (tab == 'Cá nhân') {
        getVoucherByIdKhachHang();
      }
    }
  }
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
          <Tabs aria-label="Options" onClick={(e) => {
            console.log(e.target.innerText);
             toggleTab(e.target.innerText)
            }}>
            <Tab key="public" title="Công khai">
              <Card>
                <CardBody>
                  {" "}
                  <div className="coupon-item  min-h-[400px]" >
                    {coupons.length >= 1 && coupons.map((coupon, index) => (
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
                    {coupons.length >= 1 && coupons.map((coupon, index) => (
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
