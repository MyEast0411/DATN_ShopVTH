import { Link, useParams } from "react-router-dom";
import InfoTop from "../layout/InfoTop";
import Header from "../layout/Header";

import Footer from "../layout/Footer";
import { Button } from "@nextui-org/react";
import { Image, Input, Result, Select, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

export default function PurchaseHistory() {
  const { idkh } = useParams();
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [checkBox, setCheckBox] = useState(0);

  // search
  const filterOptions = (data) => {
    return data
      .filter((hd) => {
        if (search === "") return hd;
        if (hd.hoaDon.ma.toLowerCase().includes(search.toLowerCase()))
          return hd;
      })
      .filter((hd) => {
        if (checkBox == 0) return hd;
        if (hd.trangThai == checkBox) return hd;
      });
  };

  const handleChange = (value) => {
    setCheckBox(value);
  };

  const getDataById = async () => {
    await axios
      .get(`http://localhost:8080/khach-hang/lich-su-mua-hang/${idkh}`)
      .then((response) => {
        setList(
          filterOptions(
            response.data.map((data) => {
              return {
                ...data,
                trangThai: data.hoaDon.trangThai,
              };
            })
          )
        );
      });
  };
  useEffect(() => {
    getDataById();
  }, [search, checkBox]);

  return (
    <>
      <InfoTop />
      <Header />

      <div
        className="product-list w-full col-start-2 col-end-7 overflow-y-auto h-70"
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
          height: 800,
        }}
      >
        <div
          className="mb-3 flex justify-between"
          style={{
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "8px",
            width: "80%",
            margin: "auto",
            paddingLeft: "10px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            transition: "transform 0.2s",
            alignItems: "center",
          }}
        >
          <h3>Lịch sử mua hàng</h3>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Mời nhập mã hóa đơn"
            style={{
              width: "30%",
            }}
            size="large"
          />

          <Select
            defaultValue="0"
            style={{
              width: 200,
            }}
            onChange={handleChange}
            options={data}
          />
        </div>
        {list.length == 0 ? (
          <Result
            status="404"
            title="Lịch sử hóa đơn trống"
            subTitle="Không tìm thấy bất kì hóa đơn nào , mời bạn quay lại mua hàng"
            extra={<Link to={"/"}>Back Home</Link>}
          />
        ) : (
          list.map((ls, i) => (
            <>
              <div
                key={++i}
                className="mb-3"
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "8px",
                  width: "80%",
                  margin: "auto",
                  paddingLeft: "10px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.2s",
                  alignItems: "center",
                }}
              >
                <div className="flex flex-row">
                  <div>
                    <img
                      src="/src/assets/logo.png"
                      style={{ borderRadius: "50%", width: "50", height: 50 }}
                    />
                  </div>
                  <div className="mt-3">
                    <span>VTH jordon</span>
                  </div>
                  <div className="mt-3 ms-5">
                    <span>Mã đơn hàng : {ls.hoaDon?.ma}</span>
                  </div>
                  <div className="mt-3 ms-5">
                    Trạng Thái Hóa Đơn : {GetTrangThai(ls.trangThai)}
                  </div>
                </div>
                <hr
                  style={{
                    margin: "20px 0px",
                  }}
                />
                <div
                  className="body overflow-y-auto"
                  style={{
                    backgroundColor: "white",
                    padding: "10px",
                    borderRadius: "8px",
                    width: "100%",
                    paddingLeft: "10px",

                    transition: "transform 0.2s",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: 300,
                  }}
                >
                  {ls.hoaDonChiTiets.map((sp) => (
                    <>
                      <div
                        className="san-pham flex mb-3"
                        style={{
                          backgroundColor: "white",
                          padding: "10px",
                          borderRadius: "8px",
                          width: "80%",
                          margin: "auto",
                          paddingLeft: "10px",
                          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                          transition: "transform 0.2s",
                          alignItems: "center",
                        }}
                      >
                        <div className="w-1/6 me-2">
                          <Image
                            src={sp.id_chi_tiet_san_pham.defaultImg}
                            style={{
                              width: "100",
                              height: 100,
                              borderRadius: "10",
                              marginLeft: 20,
                            }}
                          />
                        </div>

                        <div className="w-7/12">
                          <p>{`[${sp.id_chi_tiet_san_pham.ma}] ${sp.id_chi_tiet_san_pham.ten}`}</p>
                          <p>
                            {`${sp.id_chi_tiet_san_pham.id_chat_lieu.ten}-${sp.id_chi_tiet_san_pham.id_kich_co.ten}-${sp.id_chi_tiet_san_pham.id_mau_sac.ten}`}
                          </p>
                          <p>x {sp.soLuong}</p>
                        </div>
                        <div className="w-3/12">
                          <span>
                            {" "}
                            {Intl.NumberFormat().format(
                              sp.soLuong * sp.giaTien
                            )}
                          </span>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
                <div className="footer  flex  flex-row-reverse">
                  <span>
                    Tổng số tiền :{" "}
                    {Intl.NumberFormat().format(ls.hoaDon.tongTien)}
                  </span>
                  <div>
                    <Button className="me-4">Mua lại</Button>
                    <Button>Sửa Hóa Đơn</Button>
                  </div>
                </div>
              </div>
            </>
          ))
        )}
      </div>
      <Footer />
    </>
  );
}

const GetTrangThai = (tinhTrang) => {
  if (tinhTrang == 0)
    return (
      <Tag color="#8e008e">
        <span className=" text-sm ">Chờ Xác Nhận</span>
      </Tag>
    );
  if (tinhTrang == 1)
    return (
      <Tag color="#ff8e00">
        {" "}
        <span className=" text-sm ">Xác Nhận</span>
      </Tag>
    );
  if (tinhTrang == 2)
    return (
      <Tag color="#C8D52D">
        {" "}
        <span className=" text-sm ">Chờ Vận Chuyển</span>
      </Tag>
    );
  if (tinhTrang == 3)
    return (
      <Tag color="#C8D52D">
        {" "}
        <span className=" text-sm ">Giao Hàng</span>
      </Tag>
    );
  if (tinhTrang == 4)
    return (
      <Tag color="#400098">
        {" "}
        <span className=" text-sm ">Hoàn Thành</span>
      </Tag>
    );
  if (tinhTrang == 5)
    return (
      <Tag color="#ff0000">
        {" "}
        <span className=" text-sm ">Hủy</span>
      </Tag>
    );
};
const data = [
  {
    value: "0",
    label: "Tất cả",
  },
  {
    value: "1",
    label: "Chờ Xác Nhận",
  },
  {
    value: "2",
    label: " Xác Nhận",
  },
  {
    value: "3",
    label: "Chờ Vận Chuyển",
  },
  {
    value: "4",
    label: "Hoàn Thành",
  },
  {
    value: "5",
    label: "Hủy",
  },
];
