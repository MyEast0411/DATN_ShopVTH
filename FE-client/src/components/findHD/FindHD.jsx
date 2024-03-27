import InfoTop from "../../layout/InfoTop";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { Link } from "react-router-dom";
import {
  Breadcrumbs,
  BreadcrumbItem,
  Button,
  Tabs,
  Tab,
  Card,
  CardBody,
} from "@nextui-org/react";

import { ArrowRightOutlined } from "@ant-design/icons";
import { Input, Result, notification } from "antd";
import React from "react";
import axios from "axios";
import InForHD from "./InForHD";

const Context = React.createContext({
  name: "",
});

function FindHD() {
  const [api, contextHolder] = notification.useNotification();
  const [hoadon, setHoaDon] = React.useState([]);
  const [maHD, setMaHD] = React.useState("");

  const handleSearch = (e) => {
    const text = e.target.value.replaceAll(" ", "");
    setMaHD(text);
  };

  const handleSubmit = async () => {
    if (maHD == "") {
      openNotification("topRight");
      return;
    }
    await axios
      .post("http://localhost:8080/hoa_don/findHoaDons", {
        data: maHD.split(","),
      })
      .then((res) => {
        console.log(res.data);
        setHoaDon(res.data);
      });
  };

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openNotification = (placement) => {
    api.error({
      message: "Thông báo ",
      description: (
        <Context.Consumer>
          {({ name }) => `Yêu cầu nhập mã hóa đơn để tìm`}
        </Context.Consumer>
      ),
      placement,
    });
  };

  return (
    <>
      {contextHolder}
      <InfoTop />
      <Header />
      <div
        className="main-shop"
        style={{
          width: "90%",
          margin: "auto",
        }}
      >
        <Breadcrumbs size="lg" className="my-3">
          <BreadcrumbItem>
            <Link to="/">Trang chủ</Link>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <Link className="text-[#B4B4B3] cursor-default">
              Tra cứu hóa đơn
            </Link>
          </BreadcrumbItem>
        </Breadcrumbs>
        <div
          className="product-list w-full col-start-2 col-end-7"
          // style={{
          //   backgroundColor: "white",
          //   padding: "10px",
          //   borderRadius: "8px",
          //   width: "100%",
          //   paddingLeft: "10px",
          //   boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
          //   transition: "transform 0.2s",
          //   justifyContent: "space-between",
          //   alignItems: "center",
          // }}
        >
          <div
            className="grid grid-cols-2 gap-4 mb-4 mt-4"
            style={{
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "8px",
              width: "100%",
              paddingLeft: "10px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.2s",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="search  space-y-5">
              <p
                className="text-xl font-semibold"
                style={{ color: "rgba(68,73,77,1)" }}
              >
                Mã Hóa Đơn
              </p>
              <p
                className="text-base font-normal"
                style={{ color: "rgba(68,73,77,1)" }}
              >
                (Tra cứu nhiều hóa đơn bằng cách thêm dấu phẩy giữa các bưu)
              </p>
              <Input
                placeholder="VD: 1245,2893"
                size="large"
                value={maHD}
                onChange={handleSearch}
              />
              <Button color="danger" onClick={handleSubmit}>
                Tra Cứu <ArrowRightOutlined />
              </Button>
            </div>
            <div className="images">
              <img
                style={{
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                  // width: "50%",
                }}
                //   width={300}
                alt="NextUI hero Image"
                src="https://viettelpost.vn/viettelpost-iframe/assets/images/tracking-img.svg"
              />
            </div>
          </div>

          <div
            className="grid grid-cols-1 gap-4 mb-4 mt-4"
            style={{
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "8px",
              width: "100%",
              paddingLeft: "10px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.2s",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="search  space-y-5">
              <p
                className="text-xl font-semibold"
                style={{ color: "rgba(68,73,77,1)" }}
              >
                Thông tin hóa đơn
              </p>
              {hoadon.length == 0 ? (
                <Result
                  status="404"
                  title="404"
                  subTitle="Không có hóa đơn"
                  // extra={<Button type="primary">Search</Button>}
                  extra={
                    <Button type="primary" onClick={scrollUp}>
                      Search
                    </Button>
                  }
                />
              ) : (
                <div className="flex w-full flex-col">
                  <Tabs variant="underlined" aria-label="Tabs variants">
                    {hoadon.map((item) => (
                      <Tab key={item.hoaDon.ma} title={item.hoaDon.ma}>
                        <Card>
                          <CardBody>
                            <InForHD item={item} />
                          </CardBody>
                        </Card>
                      </Tab>
                    ))}
                  </Tabs>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default FindHD;
