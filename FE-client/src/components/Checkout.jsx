import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { getProvinces, getDistricts, getWards } from "../apis/Location";
import { Button, Modal, Radio, Space, Spin, Select, Tooltip } from "antd";
import { Row, Col } from 'antd';
import { IoIosArrowBack } from "react-icons/io";
import { notification } from "antd";
import successIcon from "../assets/successIcon.png";
import { getAllHA } from "../apis/SanPham";
import axios from "axios";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import IconGiaoHangNhanh from "../assets/iconGiaoHangNhanh.webp";
import { getSanPhamChiTietByMaListSPCT } from "../apis/SanPham";
import Header from "../layout/Header";
import InfoTop from "../layout/InfoTop";
import { addToHoaDon } from "../apis/HoaDon";
import { PaymentVNPAYAPI } from "../apis/paymentVNPAYAPI";
const { Option } = Select;
export default function Checkout() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [deliveryTime, setDeliveryTime] = useState(null);
  const [phiVanChuyen, setPhiVanChuyen] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [hinhAnhs, setHinhAnhs] = useState([]);
  const [shippingCost, setShippingCost] = useState("");
  const [tongTien, setTongTien] = useState(0);
  const [value, setValue] = useState(1);
  const [idTP, setIdTP] = useState("");
  const [idHuyen, setIdHuyen] = useState("");
  const [idXa, setIdXa] = useState("");
  const [valueTP, setValueTP] = useState([]);
  const [valueHuyen, setValueHuyen] = useState([]);
  const [valueXa, setValueXa] = useState([]);
  const [diaChi, setDiaChi] = useState({
    thanhPho: "",
    huyen: "",
    xa: "",
  });
  const [khachHang, setKhachHang] = useState({
    id: "",
    ma: "",
    ten: "",
    anhNguoiDung: "",
    gioi_tinh: "",
    sdt: "",
    ngay_sinh: "",
    email: "",
    cccd: "",
    soNha: "",
    xa: "",
    huyen: "",
    thanhPho: "",
  });
  const [codeVC, setCodeVC] = useState("");
  const [muaThem, setMuaThem] = useState("");
  const [duocGiam, setDuocGiam] = useState("100");
  const [listVoucher, setListVoucher] = useState([]);

  //get list voucher dang co'
  const getVocherDuocDung = async () => {
    const result = await axios.get("http://localhost:8080/voucher/getVouchers");
    setListVoucher(result.data);
  }
  useEffect(() => {
    getVocherDuocDung();
    listVoucher.sort((b, a) => b.giaTriMin - a.giaTriMin);

    listVoucher.map((x, index) => {
      if (codeVC == undefined && calculateSubtotal() > 0 || codeVC == "" && calculateSubtotal() > 0) {
        if (calculateSubtotal() >= x.giaTriMin) {
          setCodeVC(listVoucher[index]?.code);
          setMuaThem(
            listVoucher[index]?.giaTriMin - calculateSubtotal() == Number(NaN)
              ? ""
              : listVoucher[index]?.giaTriMin - calculateSubtotal()
          );
          setDuocGiam(
            listVoucher[index]?.giaTriMax == undefined
              ? ""
              : listVoucher[index]?.giaTriMax
          );
        }
      } else {
        if (x.giaTriMax == listVoucher.filter((item) => item.code == codeVC)[0]?.giaTriMax) {
          setCodeVC(x.code);
          setMuaThem(
            listVoucher[index + 1]?.giaTriMin - calculateSubtotal() == Number(NaN)
              ? ""
              : listVoucher[index + 1]?.giaTriMin - calculateSubtotal()
          );
          setDuocGiam(
            listVoucher[index + 1]?.giaTriMax == undefined
              ? ""
              : listVoucher[index + 1]?.giaTriMax
          );
        }
      }
    });
  }, [tongTien, listVoucher]);


  //get thong tin khach hang 
  const getKhachHang = async () => {
    const result = await axios.get(`http://localhost:8080/khach-hang/findByMa/${JSON.parse(localStorage.getItem("user")).ma}`);
    const khachHangData = result.data;

    setKhachHang({
      id: khachHangData.id,
      ma: khachHangData.ma,
      ten: khachHangData.ten,
      anhNguoiDung: khachHangData.anhNguoiDung,
      gioi_tinh: khachHangData.gioiTinh,
      sdt: khachHangData.sdt,
      ngay_sinh: khachHangData.ngaySinh,
      email: khachHangData.email,
      cccd: khachHangData.cccd,
    });
    setDiaChi((prevDiaChi) => ({
      ...prevDiaChi,
      id: khachHangData.id,
    }));
  };
  // get dia chi khach hang 
  const [listDiaChi, setListDiaChi] = useState([]);

  const getDiaChi = async () => {
    const result = await axios.get(`http://localhost:8080/dia-chi/findByMa/${JSON.parse(localStorage.getItem("user")).ma}`);
    setListDiaChi(result.data);
    result.data.map((item) => {
      if (item.trangThai == 1) {
        setDiaChi(item);
      }
    })
  };
  useEffect(() => {
    getDiaChi();
    // getKhachHang();
  }, []);
  // useEffect(() => {
  //   getProvinces().then((data) => {
  //     setProvinces(data);
  //   });
  // }, []);
  // lay id tp
  useEffect(() => {
    const apiUrl =
      "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province";
    const token = "83b3ca14-88ad-11ee-a6e6-e60958111f48";

    axios
      .get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Token: token,
        },
      })
      .then((response) => {
        setProvinces(response.data.data);
        const id_tp = response.data.data.find((item) =>
          diaChi.thanhPho.includes(item.ProvinceName)
        )?.ProvinceID;
        setIdTP(id_tp);
      })
      .catch((error) => {
      });
  }, [diaChi]);
  // lay id huyen theo api theo id tp
  useEffect(() => {
    const apiUrl =
      "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district";
    const token = "83b3ca14-88ad-11ee-a6e6-e60958111f48";

    const requestData = {
      province_id: idTP,
    };

    axios
      .get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Token: token,
        },
        params: requestData,
      })
      .then((response) => {
        const id_huyen = response.data.data.find(
          (item) => item.DistrictName === diaChi.huyen
        )?.DistrictID;

        setDistrict(response.data.data);
        setIdHuyen(id_huyen);
      })
      .catch((error) => {
      });
  }, [diaChi]);

  // lay id xa theo api theo id huyen
  useEffect(() => {
    const apiUrl =
      "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id";
    const token = "83b3ca14-88ad-11ee-a6e6-e60958111f48";

    const requestData = {
      district_id: idHuyen,
    };

    axios
      .post(apiUrl, requestData, {
        headers: {
          "Content-Type": "application/json",
          // 'ShopId': shopId,
          Token: token,
        },
      })
      .then((response) => {
        const id_xa = response.data.data.find(
          (item) => item.WardName === diaChi.xa
        )?.WardCode;
        setIdXa(id_xa);
        setWard(response.data.data);
      })
      .catch((error) => {
      });
  }, [diaChi, idHuyen]);

  useEffect(() => {
    const names = provinces.map((item) => item.ProvinceName);
    setValueTP(names);
    const provinceCode = provinces.find((x) => x.ProvinceName === khachHang.thanhPho)?.code || 1;

    const valueH = district.map((item) => item.DistrictName);
    setValueHuyen(valueH);

    const districtCode = district.find((x) => x.name === khachHang.huyen)?.code || 1;

    const valueXa = ward.map((item) => item.WardName);
    setValueXa(valueXa);
  }, [provinces, district]);

  const [sanPhams, setSanPhams] = useState([]);
  const [dataLocal, setDataLocal] = useState([]);
  const [spinning, setSpinning] = React.useState(false);
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const showLoader = (callback) => {
    setSpinning(true);
    callback();
  };
  const options = valueTP.map((name) => (
    <Option key={name} value={name}>
      {name}
    </Option>
  ));

  const optionHuyen = valueHuyen.map((name) => (
    <Option key={name} value={name}>
      {name}
    </Option>
  ));

  const optionXa = valueXa.map((name) => (
    <Option key={name} value={name}>
      {name}
    </Option>
  ));
  

  
  // Tính thời gian dự kiến
  useEffect(() => {
    const apiUrl =
      "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/leadtime";
    const token = "83b3ca14-88ad-11ee-a6e6-e60958111f48";
    const shopId = "190374 - 0964457125";
    const requestData = {
      from_district_id: 1804,
      from_ward_code: "1B2211",
      to_district_id: idHuyen,
      to_ward_code: idXa,
      service_id: 53320,
    };

    axios
      .post(apiUrl, requestData, {
        headers: {
          "Content-Type": "application/json",
          ShopId: shopId,
          Token: token,
        },
      })
      .then((response) => {
        console.log(response.data.data.leadtime);
        const leadtimeTimestamp = response.data.data.leadtime;
        const leadtimeDate = new Date(leadtimeTimestamp * 1000);

        const day = leadtimeDate.getDate();
        const month = leadtimeDate.getMonth() + 1;
        const year = leadtimeDate.getFullYear();

        const formattedLeadtime = `${day}/${month}/${year}`;

        console.log(formattedLeadtime);
        setDeliveryTime(formattedLeadtime);
      })
      .catch((error) => {
      });
  }, [idTP, idHuyen, idXa]);

  // Tính phí vận chuyển
  useEffect(() => {
    const apiUrl =
      "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee";
    const token = "83b3ca14-88ad-11ee-a6e6-e60958111f48";
    const shopId = "190374 - 0964457125";

    const requestData = {
      service_type_id: 2,
      from_district_id: 1804,
      to_district_id: idHuyen,
      to_ward_code: idXa,
      height: 20,
      length: 30,
      weight: 1000,
      width: 40,
      insurance_value: 0,
      coupon: null,
    };
    if (calculateSubtotal() > 1000000) {
      setShippingCost(0);
      setPhiVanChuyen(0);
      return;
    }
    axios
      .post(apiUrl, requestData, {
        headers: {
          "Content-Type": "application/json",
          ShopId: shopId,
          Token: token,
        },
      })
      .then((response) => {
        setShippingCost(response.data.data.total);
        setPhiVanChuyen(response.data.data.total);
      });
  }, [idTP, idHuyen, idXa]);

  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message,
      duration: 1,
      icon: (
        <img
          src={successIcon}
          alt=""
          style={{
            width: "7%",
          }}
        />
      ),
    });
  };
  //modal chon dia chi 
  const [isModalChonDiaChi, setIsModalChonDiaChi] = useState(false);

  const showModalChonDiaChi = () => {
    setIsModalChonDiaChi(true);
  }
  const okModalChonDiaChi = () => {
    setIsModalChonDiaChi(false);
  }
  const cancelModalChonDiaChi = () => {
    setIsModalChonDiaChi(false);
  }
  useEffect(() => {
    const fetchAllHinhAnh = async () => {
      try {
        const data = await getAllHA();
        setHinhAnhs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllHinhAnh();
  }, []);

  useEffect(() => {
    const fetchSanPham = async () => {
      try {
        const data = localStorage.getItem("maList") || "[]";
        const maList = JSON.parse(data).map((item) => item.ma);
        const dataJson = JSON.parse(data);
        setDataLocal(dataJson);
        if (maList.length > 0) {
          const sanPhams = await getSanPhamChiTietByMaListSPCT(maList);
          setSanPhams(sanPhams);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchSanPham();
  }, []);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    getProvinces().then((data) => {
      setProvinces(data);
    });
  }, []);

  const handleProvinceChange = (provinceCode) => {
    provinces.map((item) => {
      if (item.code == provinceCode) {
        setDiaChi((prevDiaChi) => ({
          ...prevDiaChi,
          thanhPho: item.name,
        }));
      }
    });
  };

  const handleDistrictChange = (districtCode) => {
    districts.map((item) => {
      if (item.code == districtCode) {
        setDiaChi((prevDiaChi) => ({
          ...prevDiaChi,
          huyen: item.name,
        }));
      }
    });
    getWards(districtCode).then((data) => {
      setWards(data);
    });
  };

  const handleWardsChange = (wardsCode) => {
    wards.map((item) => {
      if (item.code == wardsCode) {
        setDiaChi((prevDiaChi) => ({
          ...prevDiaChi,
          xa: item.name,
        }));
      }
    });
  };

  const calculateSubtotal = () => {
    return sanPhams.reduce((subtotal, sanPham) => {
      const quantity =
        dataLocal.find((item) => item.ma === sanPham.ma)?.quantity || 0;
      return subtotal + sanPham.giaBan * quantity;
    }, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const localShippingCost = value === 2 ? 0 : shippingCost;
    let updatedShippingCost;

    if (value === 2) {
      updatedShippingCost = "Miễn phí";
    } else {
      updatedShippingCost = localShippingCost;
    }
    const total = parseFloat(subtotal) + localShippingCost - listVoucher.filter((item) => item.code == codeVC)[0]?.giaTriMax;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setPhiVanChuyen(updatedShippingCost);
      setTongTien(total);
    }, [updatedShippingCost, total]);

    return total;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoader(() => {
      const email = e.target.elements.email.value;
      const hoTen = e.target.elements.hoTen.value;
      const soDienThoai = e.target.elements.soDienThoai.value;
      const duong = e.target.elements.diaChi.value;
      const thanhPho = diaChi.thanhPho;
      const quanHuyen = diaChi.huyen;
      const xaPhuong = diaChi.xa;

      const phuongThucThanhToan =
        shippingCost === "Miễn phí"
          ? "Chuyển khoản qua ngân hàng"
          : "Thanh toán khi nhận hàng";
      var soLuong = 0;
      dataLocal.map((item) => {
        let index = 0;
        if (item.ma == sanPhams[index].ma) {
          soLuong = item.quantity;
        }
        index++;
      });
      const cartNotLoginDTO = {
        email,
        hoTen,
        soDienThoai,
        duong,
        thanhPho,
        quanHuyen,
        xaPhuong,
        phuongThucThanhToan,
        deliveryTime,
        phiVanChuyen,
        sanPhams,
        tongTien,
        soLuong,
      };
      console.log(cartNotLoginDTO);
      if (value == 3) {
        const data = {
          vnp_Ammount: tongTien,
        };
        PaymentVNPAYAPI.paymentVnpay(data).then(
          (res) => {
            window.location.replace(res.data);
            sessionStorage.setItem("formBill", JSON.stringify(dataLocal));
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        const confirmSubmission = async () => {
          try {
            const result = await addToHoaDon(cartNotLoginDTO);
            console.log("result:", result);
            localStorage.removeItem("maList");
            setSpinning(true);
            openNotificationWithIcon("success", "Hoàn tất thanh toán");
            setTimeout(() => {
              navigate("/");
            }, 2000);
          } catch (error) {
            console.error("Error adding to HoaDon:", error);
          } finally {
            setSpinning(false);
          }
        };

        confirmDialog({
          message: "Bạn có chắc muốn hoàn tất đơn hàng?",
          header: "Xác nhận đơn hàng",
          icon: "pi pi-info-circle",
          acceptClassName: "p-button-success",
          accept: confirmSubmission,
        });
      }
    });
  };

  return (
    <>
      <Spin spinning={spinning} fullscreen />
      {contextHolder}
      <ConfirmDialog />
      <InfoTop />
      <Header />
      <div className="main-checkout mt-1 w-[80%] mx-auto">
        <div className="breadcrumbs-cart pb-4 text-[15px]">
          <Breadcrumbs className="my-3">
            <BreadcrumbItem>
              <Link to="/">Trang chủ</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to="/shop">Sản phẩm</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to="/cart">Giỏ hàng</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link className="text-[#B4B4B3] cursor-default">
                Thủ tục thanh toán
              </Link>
            </BreadcrumbItem>
          </Breadcrumbs>
        </div>
        <div className="grid grid-cols-2 gap-4 cursor-pointer">
          <div className="checkout-left sticky-grid">
            {!user && (
              <div className="flex">
                <span>Bạn đã có tài khoản?</span>
                <Link
                  to="/sign-in"
                  className="link-underline ml-2 underline cursor-pointer"
                >
                  {" "}
                  Đăng nhập
                </Link>
              </div>
            )}
            {user && (
              <div className="content-end cursor-pointer" onClick={showModalChonDiaChi}>
                <Button className="bg-black text-white float-right mb-2 h-12 cursor-pointer">
                  Chọn địa chỉ
                </Button>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="inputGroupCodeSignUp">
                <input name="email" type="email" value={user.email} required autoComplete="off" />
                <label htmlFor="email">Email</label>
              </div>
              <div className="inputGroupCodeSignUp">
                <input name="hoTen" type="text" value={user?.ten} required autoComplete="off" />
                <label htmlFor="hoTen">Họ và tên</label>
              </div>
              <div className="inputGroupCodeSignUp">
                <input
                  name="soDienThoai"
                  type="number"
                  required
                  autoComplete="off"
                  value={user.sdt}
                />
                <label htmlFor="soDienThoai">Số điện thoại</label>
              </div>
              <div className="inputGroupCodeSignUp">
                <input name="diaChi" type="text" required autoComplete="off" value={diaChi.duong} />
                <label htmlFor="diaChi">Địa chỉ</label>
              </div>

              <div className="flex gap-1 justify-between">
                <div className="mb-6">
                  {/* <select
                    name="thanhPho"
                    id="city"
                    className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => handleProvinceChange(e.target.value)}
                    required
                  > */}
                  {/* <option value="">Chọn thành phố</option> */}
                  <Select
                    placeholder="Thành phố"
                    // onChange={(selectedValue) => handleChangeTP(selectedValue, index)}
                    value={diaChi?.thanhPho}
                    style={{ marginRight: "10px", width: "240px", height: "44px" }}
                  >
                    {options}
                  </Select>
                  {/* {provinces.map((province) => (
                      <option key={province.code} value={province.code}>
                        {province.name}
                      </option>
                    ))} */}
                  {/* </select> */}
                </div>
                <div className="mb-6">
                  {/* <select
                    id="District"
                    name="huyen"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-56 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => handleDistrictChange(e.target.value)}
                    required
                  >
                    <option value="">Chọn huyện</option>
                    {districts.map((district) => (
                      <option key={district.code} value={district.code}>
                        {district.name}
                      </option>
                    ))}
                  </select> */}
                  <Select
                    placeholder="Huyện"
                    // onChange={(selectedValue) => handleChangeHuyen(selectedValue, index)}
                    value={diaChi?.huyen}
                    style={{ marginRight: "15px", width: "240px", height: "44px" }}
                  >
                    {optionHuyen}
                  </Select>
                </div>
                <div className="mb-6">
                  {/* <select
                    name="xaPhuong"
                    id="wards"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-56 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={(e) => handleWardsChange(e.target.value)}
                  >
                    <option value="">Chọn xã phường</option>
                    {wards.map((ward) => (
                      <option key={ward.code} value={ward.code}>
                        {ward.name}
                      </option>
                    ))}
                  </select> */}
                  <Select
                    placeholder="Xã"
                    // onChange={(selectedValue) => handleChangeXa(selectedValue, index)}
                    value={diaChi.xa}
                    style={{ marginRight: "10px", width: "230px", height: "44px" }}
                  >
                    {optionXa}
                  </Select>
                </div>
              </div>

              <h2 className="text-[16px] pb-2">Phương thức thanh toán</h2>
              <div className="main-choose-payment-method">
                <Radio.Group onChange={onChange} value={value}>
                  <Space direction="vertical">
                    <Radio value={1} className="rdo">
                      <div className="flex items-center pt-1">
                        <img
                          src="https://dienthoaigiasoc.vn/wp-content/uploads/2018/12/capitech_hinhthucthanhtoan.png"
                          alt=""
                          className="mr-3"
                        />
                        <p>Thanh toán khi nhận hàng</p>
                      </div>
                    </Radio>
                    <Radio value={2} className="rdo">
                      <div className="flex items-center pt-1">
                        <img
                          src="https://static.thenounproject.com/png/407799-200.png"
                          alt=""
                          className="mr-3"
                        />
                        <p>Chuyển khoản qua ngân hàng</p>
                      </div>
                      {value === 2 ? (
                        <div className="sub-rdo">
                          <p className="font-medium">*Lưu ý:</p>
                          <div className="ml-5 text-[13px]">
                            •Nhân viên sẽ gọi xác nhận và thông báo số tiền cần
                            chuyển khoản của quý khách, quý khách vui lòng không
                            chuyển khoản trước.
                            <p>•ACB: 21148947 - NGUYỄN VĂN HỘI </p>
                            <p>
                              •Khi chuyển khoản quý khách ghi nội dung CK là:
                              TÊN FB CÁ NHÂN + MÃ ĐƠN HÀNG + SĐT
                            </p>
                          </div>
                        </div>
                      ) : null}
                    </Radio>
                    <Radio value={3} className="rdo">
                      <div className="flex items-center pt-1">
                        <img
                          src="data:image/png;base64,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"
                          alt=""
                          className="mr-3"
                        />
                        <p>Thanh toán qua <span className="text-red-700">VN</span><span className="text-blue-700">PAY</span></p>
                      </div>
                    </Radio>
                  </Space>
                </Radio.Group>
              </div>
              <div className="giao-hang-nhanh flex items-center">
                <img width={140} src={IconGiaoHangNhanh} alt="" />
                <span>Thời gian dự kiến: &nbsp;</span>
                <span className="font-medium">{deliveryTime}</span>
              </div>
              <div className="flex justify-between items-center">
                <Link
                  to={"/cart"}
                  className="flex items-center link-underline underline"
                >
                  <IoIosArrowBack /> Giỏ hàng
                </Link>
                <button
                  type="submit"
                  className="inline-block main-sign-up-button"
                >
                  Hoàn tất đơn hàng
                </button>
              </div>
            </form>
          </div>
          <div className="checkout-right">
            {sanPhams.map((sanPham) => (
              <div className="cart-checkout flex gap-4 mb-3" key={sanPham.id}>
                <div className="relative inline-block">
                  <img
                    className="cart-checkout-img"
                    src={sanPham.defaultImg}
                    alt=""
                  />
                  <p className="badge badge-cart-checkout absolute">
                    {dataLocal.map((item) => {
                      if (item.ma == sanPham.ma) {
                        return item.quantity;
                      }
                    })}
                  </p>
                </div>
                <div className="cart-checkout-info text-[16px] font-normal">
                  <h2 className="mb-2">{sanPham.ten}</h2>
                  <p className="cart-checkout-mau-sac link-underline text-[14px]">
                    <span className="text-[#0F0E0E]">Màu sắc: </span>
                    {hinhAnhs.find(
                      (ha) => ha?.id_san_pham_chi_tiet?.id === sanPham.id
                    )?.mauSac || ""}
                  </p>
                  <p className="cart-checkout-size link-underline text-[14px]">
                    <span className="text-[#0F0E0E]">Kích cỡ: </span>
                    {sanPham.id_kich_co.ten}
                  </p>
                  <p className="cart-checkout-gia-ban font-medium">
                    VNĐ {Intl.NumberFormat().format(sanPham.giaBan)}
                  </p>
                </div>
              </div>
            ))}

            <div className="horizontal"></div>

            <div className="checkout-giamGia">
              <input
                placeholder="Mã phiếu giảm giá"
                type="text"
                name="codeVC"
                className="input-maGiamGia"
                value={codeVC}
              />
              <Tooltip arrow={true} title={"Chọn phiếu giảm giá"}>
                <button className="btn-apply-giamGia">🔖</button>
              </Tooltip>
              <span style={{ color: "red", fontSize: "16px", display: "block" }}>
                {duocGiam == ""
                  ? ""
                  : "Mua thêm " + Intl.NumberFormat().format(muaThem) + " ₫ để được giảm " + Intl.NumberFormat().format(duocGiam) + " ₫"}
              </span>
              <div className="horizontal"></div>
              <div className="checkout-tinhTien">
                <div className="flex justify-between">
                  <h3>Tạm tính</h3>
                  <p>VNĐ {Intl.NumberFormat().format(calculateSubtotal())}</p>
                </div>
                <div className="flex justify-between">
                  <h3>Giảm giá</h3>
                  <p>VNĐ {Intl.NumberFormat().format(listVoucher.filter((item) => item.code == codeVC)[0]?.giaTriMax == null ? 0 : listVoucher.filter((item) => item.code == codeVC)[0]?.giaTriMax)}</p>
                </div>
                <div className="flex justify-between">
                  <h3>Phí vận chuyển</h3>
                  <p>
                    VNĐ{" "}
                    {phiVanChuyen == "Miễn phí"
                      ? "Miễn phí"
                      : Intl.NumberFormat().format(phiVanChuyen)}
                  </p>
                </div>
                <div className="horizontal"></div>
                <div className="flex justify-between">
                  <h3 className="font-medium text-[20px]">Tổng cộng</h3>
                  <p className="text-[20px] font-medium">
                    VNĐ {Intl.NumberFormat().format(calculateTotal())}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          open={isModalChonDiaChi}
          onOk={okModalChonDiaChi}
          onCancel={cancelModalChonDiaChi}
          okText="Xác nhận"
          cancelText="Hủy"
          title="Địa chỉ của tôi"
          className="mt-24"
          width={800}
        >
          <div className="w-full">
            <div className="flex justify-end">
              <Button>Thêm địa chỉ</Button>
            </div>
          </div>
          {
            listDiaChi.map((item, index) => (
              <div className="w-full mb-10">
                <div className="flex justify-between space-x-4">
                  <div className="flex items-center">
                    <input type="radio" name="checkBoxDiaChi" id="checkBoxDiaChi" checked />
                  </div>
                  <div className="w-1/2">
                    <p className="mb-3">Địa chỉ {index + 1}</p>
                    <p className="mb-3">{`${item.duong}, xã ${item.xa}, huyện ${item.huyen}, thành phố ${item.thanhPho}`}</p>
                    {item.trangThai === 1 ? (
                      <p className="w-1/4 p-1" style={{ border: "3px solid red", fontSize: "15px" }}>Mặc định</p>
                    ) : null}
                  </div>
                  <div className="flex items-center">
                    <Button>Đặt địa chỉ mặc định</Button>
                  </div>
                </div>
              </div>
            ))
          }


          {/* <div className="w-full">
            <div className="flex justify-between space-x-4">
              <div className="flex items-center">
              <input type="radio" name="checkBoxDiaChi" id="checkBoxDiaChi" />
              </div>
              <div className="w-1/2">
                <p className="mb-3">Địa chỉ 2</p>
                <p className="mb-3">Số 125 Đường Nhuệ Giang, xã Tân Hội, huyện Đan Phượng, thành phố Hà Nội</p>
              </div>
              <div className="flex items-center">
                <Button>Đặt địa chỉ mặc định</Button>
              </div>
            </div>
          </div> */}
        </Modal>
      </div>
    </>
  );
}
