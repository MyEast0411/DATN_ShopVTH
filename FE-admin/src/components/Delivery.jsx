import React, { useEffect, useState } from "react";
import { getProvinces, getDistricts, getWards } from "../api/Location";

export default function Delivery() {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  //API Location VietNam
  useEffect(() => {
    getProvinces().then((data) => {
      setProvinces(data);
    });
  }, []);

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

  return (
    <>
      <div className="flex justify-center ">
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="012 345 6789"
                pattern="/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email 
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="nguyenvanhoi2k3@gmail.com"
              // required
            />
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
            <select
              id="city"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => handleProvinceChange(e.target.value)}
            >
              <option value="">Chọn thành phố</option>
              {provinces.map((province) => (
                <option key={province.code} value={province.code}>
                  {province.name}
                </option>
              ))}
            </select>
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
              onChange={(e) => handleDistrictChange(e.target.value)}
            >
              <option value="">Chọn huyện</option>
              {districts.map((district) => (
                <option key={district.code} value={district.code}>
                  {district.name}
                </option>
              ))}
            </select>
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Chọn xã phường</option>
              {wards.map((ward) => (
                <option key={ward.code} value={ward.code}>
                  {ward.name}
                </option>
              ))}
            </select>
          </div>
          
        </form>
      </div>
    </>
  );
}
