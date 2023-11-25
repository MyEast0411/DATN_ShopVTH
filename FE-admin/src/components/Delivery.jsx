import React, { useEffect, useState } from "react";
import { getProvinces, getDistricts, getWards } from "../api/Location";
import axios from "axios";
import { Select } from "antd";
const { Option } = Select;
export default function Delivery({ activeKey, khachHang,setKhachHang }) {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [diaChi, setDiaChi] = useState([]);
  const [valueTP, setValueTP] = useState([]);
  const [valueHuyen, setValueHuyen] = useState([]);
  const [valueXa, setValueXa] = useState([]);
  const [khachHang1, setKhachHang1] = useState([]);
  const [listKhachHang, setListKhachHang] = useState([]);
  const [idTP, setIdTP] = useState("");
  const [idHuyen, setIdHuyen] = useState("");
  const [idXa, setIdXa] = useState("");
  async function fetchKhachHang() {
    try {
      const response = await axios.get(
        "http://localhost:8080/khach-hang/getAll"
      );
      setListKhachHang(response.data);
    } catch (error) {
      console.error("Lỗi khi gọi API: ", error);
    }
  }
  useEffect(() => {
    fetchKhachHang();
  }, [listKhachHang]);
  const getKhachHang = async () => {
    await axios
      .get(`http://localhost:8080/hoa_don_chi_tiet/getHDCTByMa/${activeKey}`)
      .then((response) => {
        listKhachHang.map((kh) => {
          if(kh.id == response.data[0]?.id_hoa_don.id_khach_hang.id) {
            setKhachHang1(kh);
          }else {
            setKhachHang1("");
          }
        })
      });
  };
  useEffect(() => {
    getKhachHang();
  }, [khachHang1]);
  const getDiaChi = async () => {
    const result = await axios.get(`http://localhost:8080/dia-chi/findDiaChiMacDinh/${khachHang.maKH}`);
    setDiaChi(result.data);
  };

  useEffect(() => {
    getDiaChi();
  },[khachHang])
  useEffect(() => {
    getProvinces().then((data) => {
      setProvinces(data);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {

      const provinceNames = provinces.map(item => item.name);
      setValueTP(provinceNames);
  
      const provinceCode = provinces.find(x => x.name === diaChi.thanhPho)?.code;
  
      if (provinceCode) {
        try {
          const districtData = await getDistricts(provinceCode);
          setDistrict(districtData);
        } catch (error) {
          console.error('Error fetching districts:', error);
        }
      }
  
      const districtNames = district.map(item => item.name);
      setValueHuyen(districtNames);
  
      const districtCode = district.find(x => x.name === diaChi.huyen)?.code;
  
      if (districtCode) {
        try {
          const wardData = await getWards(districtCode);
          setWard(wardData);
        } catch (error) {
          console.error('Error fetching wards:', error);
        }
      }
  
      const wardNames = ward.map(item => item.name);
      setValueXa(wardNames);
    };
  
    fetchData();
  }, [diaChi, provinces, district]);
  
  const handleProvinceChange = (provinceCode) => {
    getDistricts(provinceCode).then((data) => {
      setDistricts(data);
    });
  };

  const handleDistrictChange = (districtCode) => {
    getWards(districtCode).then((data) => {
      setWards(data);
    });
  };
  const [deliveryTime, setDeliveryTime] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = 'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/leadtime';
    const token = '83b3ca14-88ad-11ee-a6e6-e60958111f48'; // Thay YOUR_TOKEN bằng token của bạn
    const shopId = '190374 - 0964457125'; // Thay YOUR_SHOP_ID bằng ID cửa hàng của bạn
    const requestData = {
      from_district_id: 1804,
      from_ward_code: "1B2211",
      to_district_id: idHuyen,
      to_ward_code: idXa,
      service_id: 53320,
    };

    axios.post(apiUrl, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'ShopId': shopId,
        'Token': token,
      },
    })
      .then(response => {
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
      .catch(error => {
        console.error(error);
      });
  }, [idTP,idHuyen,idXa]);
  //{ProvinceID: 201, ProvinceName: 'Hà Nội', CountryID: 1
  // lay id tp
  useEffect(() => {
    const apiUrl = 'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province';
    const token = '83b3ca14-88ad-11ee-a6e6-e60958111f48'; // Thay YOUR_TOKEN bằng token của bạn

    axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Token': token,
      }
    })
      .then(response => {
        console.log(response.data);
        const id_tp = response.data.data.find(item => diaChi.thanhPho.includes(item.ProvinceName))?.ProvinceID;
        console.log(id_tp);
        setIdTP(id_tp);
      })
      .catch(error => {
        console.error(error);
      });
  }, [diaChi]);

  // lay id huyen theo api theo id tp
  useEffect(() => {
    const apiUrl = 'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district';
    const token = '83b3ca14-88ad-11ee-a6e6-e60958111f48'; // Thay YOUR_TOKEN bằng token của bạn

    const requestData = {
      province_id : idTP
    };

    axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        // 'ShopId': shopId,
        'Token': token,
      },
      params: requestData,
    })
      .then(response => {
        const id_huyen = response.data.data.find(item => item.DistrictName === diaChi.huyen)?.DistrictID;
        setIdHuyen(id_huyen);
      })
      .catch(error => {
        console.error(error);
      });
  }, [diaChi]);
  
  // lay id xa theo api theo id huyen
  useEffect(() => {
    const apiUrl = 'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id';
    const token = '83b3ca14-88ad-11ee-a6e6-e60958111f48'; // Thay YOUR_TOKEN bằng token của bạn

    const requestData = {
      district_id : idHuyen
    };

    axios.post(apiUrl, requestData, {
      headers: {
        'Content-Type': 'application/json',
        // 'ShopId': shopId,
        'Token': token,
      },
    })
      .then(response => {
        const id_xa = response.data.data.find(item => item.WardName === diaChi.xa)?.WardCode;
        setIdXa(id_xa);
      })
      .catch(error => {
        console.error(error);
      });
  }, [diaChi,idHuyen]);

  const options = valueTP.map(name => (
    <Option key={name} value={name}>
      {name}
    </Option>
  ));
  const [optionHuyen, setOptionHuyen] = useState([]);
  useEffect(() => {
    const valueH = district.map(item => item.name);
    const newOptionHuyen = valueH.map(name => (
      <Select.Option key={name} value={name}>
        {`${name}`}
      </Select.Option>
    ));
    setOptionHuyen(newOptionHuyen);
  }, [diaChi,optionHuyen]);
  const [optionXa, setOptionXa] = useState([]);
  useEffect(() => {
    const valueX = ward.map(item => item.name);
    const newOptionXa = valueX.map(name => (
      <Select.Option key={name} value={name}>
        {`${name}`}
      </Select.Option>
    ));
    setOptionXa(newOptionXa);
  }, [diaChi,optionXa]);
  // const optionXa = valueXa.map(name => (
  //   <Option key={name} value={name}>
  //     {name}
  //   </Option>
  // ));
  return (
    <>
      <div className="flex justify-center">
        <form className="bg-slate-500 rounded">
          <h2 className="text-center text-2xl font-bold text-gray-800">
            Địa chỉ nhận hàng
          </h2>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="full_name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Họ tên
              </label>
              <input
                type="text"
                id="full_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Ten"
                value={khachHang?.ten || ""}
                required
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900"
                
              >
                Số điện thoại
              </label>
              <input
                type="tel"
                id="phone"
                value={khachHang?.sdt || ""}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="012 345 6789"
                pattern="/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/"
                required
                onChange={(e) => {
                  setKhachHang(prevState => ({
                    ...prevState,
                    sdt: e.target.value
                  }));
                }}
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="so_nha"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Số nhà | Thôn
            </label>
            <input
              type="text"
              id="so_nha"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Địa chỉ cụ thể"
              value={diaChi?.duong || ""}
              required
              onChange={(e) => {
                setDiaChi(prevState => ({
                  ...prevState,
                  duong: e.target.value
                }));
              }}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="city"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Chọn thành phố
            </label>
            <Select
              placeholder="Thành phố"
              onChange={(value) => {
                setDiaChi(prevState => ({
                  ...prevState,
                  thanhPho: value
                }));
                const provinceCode = provinces.find((x) => x.name === value)?.code;
                console.log(value);
                getDistricts(provinceCode).then((data) => {
                  console.log(data);
                  setDistrict(data);
                });

              }}
              value={diaChi.thanhPho}
              style={{width : "100%", height : "40px", marginRight : "10px"}}
            >
              {options}
            </Select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="District"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Chọn huyện
            </label>
            <Select
              placeholder="Huyện"
              onChange={(value) => {
                setDiaChi(prevState => ({
                  ...prevState,
                  huyen: value
                }));
                const districtCode = district.find((x) => x.name === value)?.code;
                getWards(districtCode).then((data) => {
                  setWard(data);
                });
              }}
              value={diaChi.huyen}
              style={{width : "100%", height : "40px", marginRight : "10px"}}
            >
              {optionHuyen}
            </Select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="wards"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Chọn xã phường
            </label>
            <Select
              placeholder="Xã phường"
              onChange={(value) => {
                setDiaChi(prevState => ({
                  ...prevState,
                  xa: value
                }));
              }}
              value={diaChi.xa}
              style={{width : "100%", height : "40px", marginRight : "10px"}}
            >
              {optionXa}
            </Select>
          </div>
          <div>
            <img src="https://api.ghn.vn/themes/angulr/img/logo-ghn-new.png" width={"30%"} />
            <p>Thời gian dự kiến giao hàng : {deliveryTime}</p>
          </div>
        </form>
      </div>
    </>
  );
}
