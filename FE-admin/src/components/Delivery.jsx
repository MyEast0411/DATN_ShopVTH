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
        console.log(response.data[0]?.id_hoa_don.id_khach_hang.id);
        listKhachHang.map((kh) => {
          if(kh.id == response.data[0]?.id_hoa_don.id_khach_hang.id) {
            setKhachHang1(kh);
            console.log(kh);
          }else {
            setKhachHang1("");
          }
        })
      });
  };
  useEffect(() => {
    getKhachHang();
  }, [khachHang1]);
  // console.log(khachHang);
  useEffect(() => {
    getProvinces().then((data) => {
      setProvinces(data);
    });
  }, []);
  useEffect(() => {
    const names = provinces.map(item => item.name);
    setValueTP(names);
    const provinceCode = provinces.find((x) => x.name === khachHang.thanhPho)?.code || 1;
    getDistricts(provinceCode).then((data) => {
      setDistrict(data);
    });
    const valueH = district.map(item => item.name);
    setValueHuyen(valueH);

    const districtCode = district.find((x) => x.name === khachHang.huyen)?.code || 1;
    // getWards(districtCode).then((data) => {
    //   setWard(data);
    // });

    // const valueX = ward.map(item => item.name);
    // setValueXa(valueX);
  }, [provinces,district]);
  const getDiaChi = async () => {
    const result = await axios.get(`http://localhost:8080/dia-chi/findDiaChiMacDinh/${khachHang.maKH}`);
    setDiaChi(result.data);
  };

  useEffect(() => {
    getDiaChi();
  },[khachHang])
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
    const api_key = 'bda7dbab-85de-11ee-b394-8ac29577e80e';
    const origin = 'Hanoi';
    const destination = 'HoChiMinh';

    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/leadtime',
          {
            params: { 
              from_district: origin,
              to_district: destination
            },
            headers: {
              Token: api_key,
            },
          }
        );

        setDeliveryTime(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const options = valueTP.map(name => (
    <Option key={name} value={name}>
      {name}
    </Option>
  ));

  const optionHuyen = valueHuyen.map(name => (
    <Option key={name} value={name}>
      {name}
    </Option>
  ));

  const optionXa = valueXa.map(name => (
    <Option key={name} value={name}>
      {name}
    </Option>
  ));
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
              onChange={(e) => {}}
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
              onChange={(e) => {}}
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
              onChange={(e) => {}}
              value={diaChi.xa}
              style={{width : "100%", height : "40px", marginRight : "10px"}}
            >
              {optionXa}
            </Select>
          </div>
          <div>
            {loading ? (
              <p>Đang tải thông tin thời gian giao hàng...</p>
            ) : (
              <p>Thời gian dự kiến giao hàng: {deliveryTime}</p>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
