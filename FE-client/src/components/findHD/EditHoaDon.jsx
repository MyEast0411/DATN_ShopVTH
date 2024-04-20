import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfoTop from "../../layout/InfoTop";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { Image } from "@nextui-org/react";
import { getProvinces, getDistricts, getWards } from "../../apis/Location_2";
const { Option } = Select;
import { Input, Modal, Select, Button, DatePicker } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { notification } from "antd";
import { BsPen, BsTrash } from "react-icons/bs";
import { format } from "date-fns";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CiWarning } from "react-icons/ci";
// import moment from "moment";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

function EditHoaDon() {
  const { id } = useParams();
  const [hoadon, setHoadon] = useState("");
  const [error, setError] = useState({
    soNha: "",
    xa: "",
    huyen: "",
    thanhPho: "",
  });
  // get infor_user
  const [user, setUser] = useState("");
  const [address, setAddress] = useState({
    soNha: "",
    xa: "",
    huyen: "",
    thanhPho: "",
  });

  const [addressEdit, setAddressEdit] = useState({
    soNha: "",
    xa: "",
    huyen: "",
    thanhPho: "",
  });

  useEffect(() => {
    setUser(
      localStorage.getItem("user") == null ||
        localStorage.getItem("user") == undefined ||
        localStorage.getItem("user") == ""
        ? ""
        : JSON.parse(localStorage.getItem("user"))
    );
  }, []);

  // địa chỉ
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState([]);
  const [wards, setWards] = useState([]);
  const [ward, setWard] = useState([]);
  const [valueTP, setValueTP] = useState([]);
  const [valueHuyen, setValueHuyen] = useState([]);
  const [valueXa, setValueXa] = useState([]);
  const [checkEdit, setCheckEdit] = useState(false);
  const [idToUpdate, setIdToUpdate] = useState(null);
  const [isModalOpenUpdateSL, setIsModalOpenUpdateSL] = useState(false);
  const [isModalOpenChangeAddress, setIsModalOpenChangeAddress] = useState(false);

  useEffect(() => {
    getProvinces().then((data) => {
      console.log(data);
      setProvinces(data.results);
    });
  }, [error.huyen, error.soNha, error.xa, error.thanhPho]);
  useEffect(() => {
    // getProvinces().then((data) => {
    //   console.log(data);
    //   setProvinces(data);

    const names = provinces.map((item) => item.name);
    setValueTP(names);

    const provinceCode =
      provinces.find((x) => x.name === address.thanhPho)?.code || 1;
    getDistricts(provinceCode).then((data) => {
      setDistrict(data.results);
    });
    const valueH = district.map((item) => item.name);
    setValueHuyen(valueH);

    const districtCode =
      district.find((x) => x.name === address.huyen)?.code || 1;
    getWards(districtCode).then((data) => {
      setWard(data.results);
    });
    const valueXa = ward.map((item) => item.name);
    setValueXa(valueXa);
    // });
  }, [
    provinces,
    districts,
    address,
    error.huyen,
    error.soNha,
    error.xa,
    error.thanhPho,
  ]);

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
  const DiscountTag = ({ discount }) => {
    if (discount === undefined) {
      return null;
    }

    return <div className="discount-tag">{`${discount}% OFF`}</div>;
  };
  const getInfoHD = async () => {
    const res = await axios.get(
      "http://localhost:8080/hoa_don/getHoaDon/" + id
    );
    const data = await res.data;
    console.log(data);
    setMoney({
      tienGiam: data?.id_voucher?.giaTriMax,
      tienHang: data.tongTien,
      tienShip: data?.tienShip,
      tongTien: data.tongTien,
      ma: data.ma,
    });
    getAddress(data.diaChi);

    setHoadon(() => ({
      ...data,
      ngayTao: format(new Date(data.ngayTao), "yyyy-MM-dd HH:mm:ss"),
      ngayNhan: format(new Date(data.ngayNhan), "yyyy-MM-dd  HH:mm:ss"),
    }));
  };

  const onChange = (e) => {
    // console.log(e.target.name);
    setAddressEdit({ ...address, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getInfoHD();
    getDataChiTietSanPham();
  }, [error.huyen, error.soNha, error.xa, error.thanhPho]);

  const getAddress = (address1) => {
    console.log(address1);
    let address_list = address1.split(",");
    address.soNha = address_list[0];
    address.xa = address_list[1];
    address.huyen = address_list[2];
    address.thanhPho = address_list[3];
    setAddress(address);
  };

  const handleProvinceChange = (provinceCode) => {
    console.log("province_coe " + provinceCode);
    provinces.map((item) => {
      if (item.province_id == provinceCode) {
        // setAddressEdit((prevaddress) => ({
        //   ...prevaddress,
        //   thanhPho: item.province_name,
        // }));
        addressEdit.thanhPho = item.province_name;
        setAddressEdit(addressEdit);
      }
    });

    getDistricts(provinceCode).then((data) => {
      setDistricts(data.results);
    });
  };

  const handleDistrictChange = (districtCode) => {
    districts.map((item) => {
      if (item.district_id == districtCode) {
        setAddressEdit((prevaddress) => ({
          ...prevaddress,
          huyen: item.district_name,
        }));
      }
    });
    getWards(districtCode).then((data) => {
      setWards(data.results);
    });
  };

  const handleWardsChange = (wardsCode) => {
    wards.map((item) => {
      if (item.ward_id == wardsCode) {
        setAddressEdit((prevaddress) => ({
          ...prevaddress,
          xa: item.ward_name,
        }));
      }
    });
  };
  const [kmspcts, setKmspcts] = useState([]);
  const fetchKMSPCT = async () => {
    const response = await axios.get(`http://localhost:8080/khuyen-mai/getAllKMSPCT`);
    setKmspcts(response.data);
  };
  useEffect(() => {
    fetchKMSPCT();
  }, [kmspcts]);
  // sản phẩm
  const [rowsSPCT, setRowsSPCT] = useState([]);
  const getDataChiTietSanPham = async () => {
    const res = await axios.get(
      "http://localhost:8080/hoa_don_chi_tiet/getHDCTByID/" + id
    );
    const data = await res.data;
    setRowsSPCT(
      data.map((item) => {
        return {
          id: item.id_chi_tiet_san_pham.id,
          imageUrl: item.id_chi_tiet_san_pham.defaultImg,
          name: item.id_chi_tiet_san_pham.id_san_pham.ten,
          kichco: item.id_chi_tiet_san_pham.id_kich_co.ten,
          mausac: item.id_chi_tiet_san_pham.id_mau_sac.ten,
          quantity: item.soLuong,
          price: item.id_chi_tiet_san_pham.giaBan,
        };
      })
    );
  };

  const handleChangeAddress = (value) => {
    console.log(value);

    if (value.soNha == "") {
      error.soNha = "Không được để trống số nhà";
      setError(error);
    } else {
      error.soNha = "";
      setError(error);
    }

    if (value.xa == "") {
      error.xa = "Không được để trống xã";
      setError(error);
    } else {
      error.xa = "";
      setError(error);
    }

    if (value.huyen == "") {
      error.huyen = "Không được để trống huyện";
      setError(error);
    } else {
      error.huyen = "";
      setError(error);
    }

    if (value.thanhPho == "") {
      error.thanhPho = "Không được để trống thành phố";
      setError(error);
    } else {
      error.thanhPho = "";
      setError(error);
    }

    if (
      error.xa == "" &&
      error.soNha == "" &&
      error.thanhPho == "" &&
      error.huyen == ""
    ) {
      // chuyển value thành chuỗi
      const dataAddress = `${addressEdit.soNha},${addressEdit.xa},${addressEdit.huyen},${addressEdit.thanhPho}`;
      // tính tiền ship
      console.log(deliveryTime);
      setIsModalOpenChangeAddress(true);
    } else {
      console.log(error);
      toast("Lỗi người dùng , xxin mời nhập đầy đủ địa chỉ");
    }
  };
  const cancelChangeAddress = ()=>{
    setIsModalOpenChangeAddress(false);
  }


  const confirmChangesAddress = async () => {
    const dataAddress = `${addressEdit.soNha},${addressEdit.xa},${addressEdit.huyen},${addressEdit.thanhPho}`;
   
    cancelChangeAddress();
      await axios
        .put(`http://localhost:8080/hoa_don/update_client/${id}`, {
          // addressEdit: dataAddress,
          ...hoadon,
          diaChi: dataAddress,
          tienShip: tienShip,
          ngayNhan: deliveryTime,
        })
        .then((res) => {
          getAddress(res.data.diaChi);
          setHoadon(() => ({
            ...res.data,
            ngayTao: format(
              new Date(res.data.ngayTao),
              "yyyy-MM-dd HH:mm:ss"
            ),
            ngayNhan: format(
              new Date(res.data.ngayNhan),
              "yyyy-MM-dd  HH:mm:ss"
            ),
          }));
          setMoney({
            tienGiam: res.data.tienGiam,
            tienHang: res.data.tongTien,
            tienShip: res.data.tienShip,

            tongTien:
              res.data.tongTien + res.data.tienShip - res.data.tienGiam,
            ma: res.data.ma,
          });
          setCheckEdit(false);
          toast( "Cập nhật thành công");
         
        })
        .catch((error) => {
          toast( "Cập nhật không thành công");
          cancelChangeAddress();
        })
        
    
    
  };


  

  // notifications
  // const [api, contextHolder] = notification.useNotification();
  // const openNotificationWithIcon = (type, description) => {
  //   if (type === "success") {
  //     api[type]({
  //       message: "Thông báo",
  //       description: description,
  //     });
  //   } else if (type === "error") {
  //     api[type]({
  //       message: "Cảnh bảo",
  //       description: description,
  //     });
  //   } else if (type === "canceled") {
  //     api["warning"]({
  //       message: "Thông báo ",
  //       description: description,
  //     });
  //   }
  // };

  // update san pham
  const [openSP, setOpenSP] = useState(false);

  const showModalLichSuSP = () => {
    setOpenSP(true);
  };
  const handleOkLichSuSP = () => {
    setOpenSP(false);
  };

  const handleCancelLichSuSP = () => {
    setOpenSP(false);
  };

  const [spct, setSPCT] = useState({});
  const getSPCT = (id) => {
    setSPCT((value) => (value = rowsSPCT.filter((sp) => sp.id == id)[0]));
  };
  const onHandleUpdate = (idSPCT) => {
      if(spct.quantity == null || spct.quantity == ""){
        toast("Số lượng không được để trống");
      }else if(spct.quantity <= 0){
        toast("Số lượng lớn hơn hoặc bằng 1");
      }else if(spct.quantity > 5){
       toast("Số lượng Không quá 5 sản phẩm");
      }else{
         setIdToUpdate(idSPCT);
      setIsModalOpenUpdateSL(true);
      setOpenSP(false);
      }
    };

    const cancelUpdateSL = ()=>{
      setIdToUpdate(null);
      setIsModalOpenUpdateSL(false);
    }
  // const confirmUpdateSL =async ()=>{

  //         await axios
  //           .post(
  //             `http://localhost:8080/hoa_don_chi_tiet/update/${id}/${idToUpdate}`,
  //             {
  //               quantity: spct.quantity,
  //             }
  //           )
  //           .then((response) => {
  //             getInfoHD();
  //             getDataChiTietSanPham();
  //             handleOkLichSuSP();
  //             toast("Cập nhật thành công");
  //             cancelUpdateSL();

  //           })
  //           .catch((e) => {
  //             console.log(e);
  //             cancelUpdateSL();
  //           });
  //       };

        const confirmUpdateSL = async () => {
          if (idToUpdate) {
            cancelUpdateSL();
            await axios
              .post(
                `http://localhost:8080/hoa_don_chi_tiet/update/${id}/${idToUpdate}`,
                {
                  quantity: spct.quantity,
                }
              )
              .then((response) => {
                if(response.data == "FAIL"){
                  toast("Số lượng tồn không đủ");
                }else{
                
                getInfoHD();
                getDataChiTietSanPham();
                handleOkLichSuSP();
                toast("Cập nhật thành công");
                cancelUpdateSL();
                }
               
              
              })
              .catch((error) => {
                toast("😢 Cập nhật thất bại");
                console.log(e);
                cancelUpdateSL();
              });
          
          }
        };
     

  const onHandleDelete = (idSPCT) => {
    Modal.confirm({
      title: `bạn có muốn xóa sản phẩm không ?`,
      okText: "Yes",
      okType: "danger",
      onOk: async () => {
        const res = await axios
          .delete(
            `http://localhost:8080/hoa_don_chi_tiet/deleteHDCT/${id}/${idSPCT}`
          )
          .then((response) => {
            getInfoHD();
            getDataChiTietSanPham();
          })
          .catch((e) => error());
      },
    });
  };

  // money
  const [money, setMoney] = useState({
    tienHang: 0,
    tienGiam: 0,
    tienShip: 0,
    tongTien: 0,
  });
  // tính ship
  const [idTP, setIdTP] = useState("");
  const [idHuyen, setIdHuyen] = useState("");
  const [idXa, setIdXa] = useState("");
  const [tienShip, setTienShip] = useState("");

  const [deliveryTime, setDeliveryTime] = useState("");

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
        const id_tp = response.data.data.find((item) =>
          addressEdit.thanhPho.includes(item.ProvinceName)
        )?.ProvinceID;
        setIdTP(id_tp);
      })
      .catch((error) => { });
  }, [addressEdit]);

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
          // 'ShopId': shopId,
          Token: token,
        },
        params: requestData,
      })
      .then((response) => {
        const id_huyen = response.data.data.find(
          (item) => item.DistrictName === addressEdit.huyen
        )?.DistrictID;
        setIdHuyen(id_huyen);
      })
      .catch((error) => { });
  }, [addressEdit]);

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
          (item) => item.WardName === addressEdit.xa
        )?.WardCode;
        setIdXa(id_xa);
      })
      .catch((error) => { });
  }, [addressEdit, idHuyen]);

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
        const leadtimeTimestamp = response.data.data.leadtime;
        const leadtimeDate = new Date(leadtimeTimestamp * 1000);
        // const inputDate = '2024-01-29T16:33:27';  // Thay thế bằng ngày bạn muốn định dạng
        // const currentDate = moment(leadtimeDate).format(
        //   "ddd MMM DD HH:mm:ss z YYYY"
        // );
        setDeliveryTime(leadtimeTimestamp * 1000);
        // const day = leadtimeDate.getDate();
        // const month = leadtimeDate.getMonth() + 1;
        // const year = leadtimeDate.getFullYear();

        // const formattedLeadtime = `${year}/${month}/${day}`;
      })
      .catch((error) => { });
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
    // if (calculateSubtotal() > 1000000) {
    //   setShippingCost(0);
    //   setPhiVanChuyen(0);
    //   return;
    // }
    axios
      .post(apiUrl, requestData, {
        headers: {
          "Content-Type": "application/json",
          ShopId: shopId,
          Token: token,
        },
      })
      .then((response) => {
        console.log(response.data);
        setTienShip(response.data.data.total);
        // setShippingCost(response.data.data.total);
        // setPhiVanChuyen(response.data.data.total);
      });
  }, [idTP, idHuyen, idXa]);

  return (
    <>
      <InfoTop />
      <Header />

      <div
        className="mb-3  justify-between "
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
        {/* update số lượng */}
       <Modal 
      open={isModalOpenUpdateSL} 
      centered
      onCancel={cancelUpdateSL}
      onOK={confirmUpdateSL}
      width={600}
      height={180}
      footer={[
        <>
        <Button color="black" className="me-3" onClick={cancelUpdateSL}>
        Hủy
      </Button>
      <Button color="red" onClick={confirmUpdateSL} >
        Tiếp tục
      </Button>
        </>
      ]}
      >
        
      <div className="flex">
        <CiWarning style={{ color: "red", fontSize: 25  }}  /> 
        <p style={{  fontSize: 20  }}>Thông báo</p>
      </div>

         
          <div className="grid">
            <span style={{ fontSize: 15 , marginTop : 20 , marginBottom : 20  }}>
            Bạn có muốn cập nhật số lượng sản phẩm này không ?
            </span>
          </div>
       
      </Modal>
{/* update Address */}
      <Modal 
      open={isModalOpenChangeAddress} 
      centered
      onCancel={cancelChangeAddress}
      onOK={confirmChangesAddress}
      width={600}
      height={180}
      footer={[
        <>
        <Button color="black" className="me-3" onClick={cancelChangeAddress}>
        Hủy
      </Button>
      <Button color="red" onClick={confirmChangesAddress} >
        Tiếp tục
      </Button>
        </>
      ]}
      >
        
      <div className="flex">
        <CiWarning style={{ color: "red", fontSize: 25  }}  /> 
        <p style={{  fontSize: 20  }}>Thông báo</p>
      </div>

         
          <div className="grid">
            <span style={{ fontSize: 15 , marginTop : 20 , marginBottom : 20  }}>
            Bạn có muốn cập nhật địa chỉ này không ?
            </span>
          </div>
       
      </Modal>
      <ToastContainer />
        {/* {contextHolder} */}
        <div className="flex justify-center">
          <p className="text-2xl">Thông tin hóa đơn</p>
        </div>

        <div className="mb-5">
          <p className="text-xl">Thông tin khách hàng</p>
          <hr style={{ backgroundColor: "black", height: 2, padding: 1 }} />
          <div className="grid grid-cols-2 gap-4 m-3">
            <div>
              <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Số Điện Thoại
              </p>
              <Input
                value={hoadon.sdt}
                disabled
                className="bg-gray-50 border border-gray-300 text-black text-sm 
                rounded-lg w-full p-2.5"
              />
            </div>
            <div>
              <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Tên người nhận
              </p>
              <Input
                value={hoadon.tenKhachHang}
                disabled
                className="bg-gray-50 border border-gray-300 text-black text-sm 
                rounded-lg w-full p-2.5"
              />
            </div>
            <div>
              <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Ngày Tạo
              </p>
              <Input
                value={hoadon.ngayTao}
                disabled
                className="bg-gray-50 border border-gray-300 text-black text-sm 
                rounded-lg w-full p-2.5"
              />
            </div>
            <div>
              <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Ngày Nhận
              </p>
              <Input
                value={hoadon.ngayNhan}
                disabled
                className="bg-gray-50 border border-gray-300 text-black text-sm 
                rounded-lg w-full p-2.5"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <p className="text-xl">Địa chỉ khách hàng</p>
            <div>
              {!checkEdit ? (
                <Button onClick={() => setCheckEdit(true)}>
                  Cập nhật địa chỉ
                </Button>
              ) : (
                <>
                  <Button onClick={() => setCheckEdit(false)} className="me-3">
                    Hủy
                  </Button>
                  <Button
                    onClick={() => {
                      // setAddress(addressEdit);
                      console.log(addressEdit);
                      handleChangeAddress(addressEdit);
                    }}
                  >
                    Hoàn Tất
                  </Button>
                </>
              )}
            </div>
          </div>

          <hr style={{ backgroundColor: "black", height: 2, padding: 1 }} />
          <div className="grid grid-cols-2 gap-4 m-3">
            {checkEdit ? (
              <>
                <div className="mb-6">
                  <label
                    htmlFor="city"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Chọn thành phố
                  </label>
                  <select
                    id="city"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => {
                      // handleProvinceChange(e.target.value);
                      provinces.map((item) => {
                        // console.log(item.province_id);
                        if (item.province_id == e.target.value) {
                          setAddressEdit((prevaddress) => ({
                            ...prevaddress,
                            thanhPho: item.province_name,
                          }));
                          // addressEdit.thanhPho = item.province_name;
                          // setAddressEdit(addressEdit);
                        }
                      });

                      getDistricts(e.target.value).then((data) => {
                        //console.log(data);
                        setDistricts(data.results);
                      });
                      setError({ ...error, thanhPho: "" });
                    }}
                  >
                    <option value="">Chọn thành phố</option>
                    {provinces.map((province) => (
                      <option
                        key={province.province_id}
                        value={province.province_id}
                      >
                        {province.province_name}
                      </option>
                    ))}
                  </select>
                  <p className="text-red-300">{error.thanhPho}</p>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="District"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Chọn huyện
                  </label>
                  <select
                    id="District"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => {
                      // handleDistrictChange(e.target.value);
                      districts.map((item) => {
                        if (item.district_id == e.target.value) {
                          setAddressEdit((prevaddress) => ({
                            ...prevaddress,
                            huyen: item.district_name,
                          }));
                        }
                      });
                      getWards(e.target.value).then((data) => {
                        //console.log(data);
                        setWards(data.results);
                      });
                      setError({ ...error, huyen: "" });
                    }}
                  >
                    <option value="">Chọn huyện</option>
                    {districts.map((district) => (
                      <option
                        key={district.district_id}
                        value={district.district_id}
                      >
                        {district.district_name}
                      </option>
                    ))}
                  </select>
                  <p className="text-red-300">{error.huyen}</p>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="wards"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Chọn xã phường
                  </label>
                  <select
                    id="wards"
                    onChange={(e) => {
                      //  handleWardsChange(e.target.value)
                      wards.map((item) => {
                        if (item.ward_id == e.target.value) {
                          setAddressEdit((prevaddress) => ({
                            ...prevaddress,
                            xa: item.ward_name,
                          }));
                        }
                      });
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">Chọn xã phường</option>
                    {wards.map((ward) => (
                      <option key={ward.ward_id} value={ward.ward_id}>
                        {ward.ward_name}
                      </option>
                    ))}
                  </select>
                  <p className="text-red-300">{error.xa}</p>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Số nhà/Ngõ/Đường
                  </label>
                  <input
                    type="text"
                    name="soNha"
                    value={addressEdit.soNha}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                      rounded-lg focus:ring-blue-500 focus:border-blue-500 block
                                          w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                          dark:focus:ring-blue-500  dark:focus:border-blue-500"
                    placeholder="Số nhà/Ngõ/Đường"
                    required
                    onChange={(e) => {
                      // onChange(e);
                      setAddressEdit({ ...addressEdit, soNha: e.target.value });
                    }}
                  />
                  <p className="text-red-300">{error.soNha}</p>
                </div>
              </>
            ) : (
              <>
                <div className="mb-6">
                  <label
                    htmlFor="city"
                    className="block mb-2 text-sm font-medium text-black dark:text-white"
                  >
                    Thành phố
                  </label>
                  <Input
                    type="text"
                    size="large"
                    className="text-black"
                    value={address.thanhPho}
                    placeholder="Thành phố"
                    disabled
                  />
                  {/* <Select
                    placeholder="Thành phố"
                    // onChange={(selectedValue) => handleChangeTP(selectedValue)}
                    value={address.thanhPho}
                    size="large"
                    style={{ width: "100%", marginRight: "10px"}}
                    disabled
                  >
                    {options}
                  </Select> */}
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="city"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Quận huyện
                  </label>
                  <Input
                    type="text"
                    size="large"
                    className="text-black"
                    value={address.huyen}
                    placeholder="Quận huyện"
                    disabled
                  />
                  {/* <Select
                    placeholder="Quận Huyện"
                    // onChange={(selectedValue) =>
                    //   handleChangeHuyen(selectedValue)
                    // }
                    value={address.huyen}
                    size="large"
                    style={{ width: "100%", marginRight: "10px" }}
                    disabled
                  >
                    {optionHuyen}
                  </Select> */}
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="city"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Xã phường
                  </label>
                  <Input
                    type="text"
                    size="large"
                    className="text-black"
                    value={address.xa}
                    placeholder="Xã phường"
                    disabled
                  />
                  {/* <Select
                    placeholder="Xã Phường"
                    // onChange={(selectedValue) => handleChangeXa(selectedValue)}
                    value={address.xa}
                    size="large"
                    style={{ width: "100%", marginRight: "10px" }}
                    disabled
                  >
                    {optionXa}
                  </Select> */}
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="city"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Số nhà / Đường
                  </label>
                  <Input
                    type="text"
                    size="large"
                    name={`duong-${1}`}
                    className="text-black"
                    value={address.soNha}
                    placeholder="Số nhà/Ngõ/Đường"
                    required
                    onChange={(e) =>
                      setAddress({ ...address, soNha: e.target.value })
                    }
                    disabled
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div>
          <p className="text-xl">Sản phẩm</p>
          <hr style={{ backgroundColor: "black", height: 2, padding: 1 }} />
          <div className="row divide-y-4 divide-slate-400/25">
            <div
              className="row table-san-pham  "
              style={{
                margin: "10px auto",
              }}
            >
              {rowsSPCT.map((item, index) => (
                <>
                  <div key={index} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                    <div style={{ position: "relative" }}>
                      <img
                        src={item.imageUrl}
                        alt="product-image"
                        className="w-full rounded-lg sm:w-40 me-10 object-contain"
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 16,
                          left : -10,
                          zIndex: 1, // Đảm bảo DiscountTag hiển thị trên img
                        }}
                      >
                        <DiscountTag
                          discount={
                            kmspcts.find((x) => x.id_chi_tiet_san_pham.id == item.id)
                              ?.id_khuyen_mai.giaTriPhanTram
                          }
                        />
                      </div>
                    </div>
                    <div className="flex justify-between w-full">
                      <div>
                        <div className=" sm:mt-0">
                          <h2 className="text-lg font-medium text-gray-900 mb-3">
                            {item.name}
                            {item.mausac.substring(3)}
                          </h2>
                          <p className="mb-3  font-medium text-gray-900">
                            Size: {item.kichco}
                          </p>
                          <p className="font-medium text-gray-900 mb-3">
                            Số lượng : {/* {check ? ( */}
                            <span className="font-medium text-red-500 mb-3">
                              {item.quantity}
                            </span>
                            {/* // ) : (
                            //   <Input  value={valueSL} onChange={(e)=> setValueSL(e.target.value)} />
                            // )}*/}{" "}
                            sản phẩm
                          </p>
                          <p className="font-medium text-gray-900 mb-3">
                            Đơn giá :{" "}
                            <span className="font-medium text-red-500 mb-3">
                              {Intl.NumberFormat().format(item.price)} &nbsp;₫
                            </span>
                          </p>
                        </div>

                        <div className=" space-x-4 mt-4 me-4"></div>
                      </div>
                      <div className="inline-flex items-center gap-10">
                        <p className="font-medium text-red-500">
                          {Intl.NumberFormat().format(
                            item.price * item.quantity
                          )}
                          &nbsp;₫
                        </p>

                        <Button
                        // onClick={() => onHandleDelete(item.id)}
                        >
                          <BsTrash color="red" />
                        </Button>

                        <Button
                          onClick={() => {
                            showModalLichSuSP();
                            getSPCT(item.id);
                          }}
                        >
                          <BsPen color="orange" />
                        </Button>
                      </div>

                      <Modal
                        open={openSP}
                        title="Cập Nhật Sản Phảm"
                        onOk={handleOkLichSuSP}
                        onCancel={handleCancelLichSuSP}
                        style={{ top: 20 }}
                        footer={() => (
                          <>
                            <Button
                              color="yellow"
                              onClick={() => {
                                // handleCancelLichSuSP();
                                onHandleUpdate(spct.id);
                              }}
                            >
                              <BsPen />
                            </Button>
                          </>
                        )}
                      >
                        <div className="divide-y divide-blue-200">
                          <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                            <img
                              src={spct.imageUrl}
                              alt="product-image"
                              className="w-full rounded-lg sm:w-40 me-10 object-contain"
                            />

                            <div className="flex justify-between w-full">
                              <div>
                                <div className=" sm:mt-0">
                                  <h2 className="text-lg font-medium text-gray-900 mb-3">
                                    {spct.name}
                                    {/* {spct.mausac.substring(3)} */}
                                  </h2>
                                  <p className="mb-3  font-medium text-gray-900">
                                    Size: {spct.kichco}
                                  </p>
                                  <p className="font-medium text-gray-900 mb-3">
                                    Số lượng : {/* {check ? ( */}
                                    <Input
                                      value={spct.quantity}
                                      onChange={
                                        (e) =>
                                          setSPCT({
                                            ...spct,
                                            quantity: e.target.value,
                                          })

                                        //    if (e.target.value > 0) {
                                        //     setSPCT({
                                        //       ...spct,
                                        //       quantity: e.target.value,
                                        //     });
                                        //   } else {
                                        //     api["error"]({
                                        //       message: "Thông báo",
                                        //       description:
                                        //         "Số lượng phải lớn hơn hoặc bằng 1",
                                        //     });
                                        //   }
                                        // }}
                                      }
                                    />
                                    sản phẩm
                                  </p>
                                  <p className="font-medium text-gray-900 mb-3">
                                    Đơn giá :{" "}
                                    <span className="font-medium text-red-500 mb-3">
                                      {Intl.NumberFormat().format(spct.price)}{" "}
                                      &nbsp;₫
                                    </span>
                                  </p>
                                </div>

                                <div className=" space-x-4 mt-4 me-4"></div>
                              </div>
                              {/* <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6"></div> */}
                            </div>
                          </div>
                        </div>
                      </Modal>
                    </div>
                  </div>
                </>
              ))}
            </div>

            <div className="flex justify-end me-4">
              <div>
                <div className="grid grid-cols-2 gap-1  pt-3">
                  <p className="font-normal text-lg">Tiền Hàng : </p>
                  <p
                    className="font-normal text-red-500"
                    style={{ fontSize: "16px" }}
                  >
                    {Intl.NumberFormat().format(money.tienHang)}&nbsp;₫
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-1  ">
                  <p className="font-normal text-lg"> Phí Vận Chuyển : </p>
                  <p
                    className="font-normal text-red-500"
                    style={{ fontSize: "16px" }}
                  >
                    {Intl.NumberFormat().format(money.tienShip)}&nbsp;₫
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-1  ">
                  <p className="font-normal text-lg"> Tiền giảm : </p>
                  <p
                    className="font-normal text-red-500"
                    style={{ fontSize: "16px" }}
                  >
                    {Intl.NumberFormat().format(money.tienGiam)}&nbsp;₫
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-1  pe-3  ">
                  <p className="font-normal text-lg"> Tổng Tiền : </p>
                  <p
                    className="font-normal text-red-500"
                    style={{ fontSize: "16px" }}
                  >
                    {Intl.NumberFormat().format(money.tongTien)}&nbsp;₫
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default EditHoaDon;
