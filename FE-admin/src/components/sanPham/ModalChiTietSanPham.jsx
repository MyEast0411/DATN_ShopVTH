import React, { useEffect, useState } from "react";

import {
    Button,
    Radio,
    Form,
    Input,
    InputNumber,
    Select
  } from "antd";
import axios from "axios";

export default function ModalChiTietSanPham() {
const [mauSac, setMauSac] = useState([]);
const [thuongHieu, setThuongHieu] = useState([]);
const [chatLieu, setChatLieu] = useState([]);
const [deGiay, setDeGiay] = useState([]);
const [kichCo, setKichCo] = useState([]);
const [nhanHieu, setNhanHieu] = useState([]);

useEffect(() => {
    getAllNH();
    getAllMS();
    getAllKC();
    getAllDG();
    getAllCL();
    getAllTH();
    // getAllHA();
}, []);

// const getAllHA = async () => {
// await axios
//     .get(`http://localhost:8080/getHinhAnhByMau/${selectMau}`)
//     .then((response) => {
//     setImg(response.data);
//     });
// };
const getAllNH = async () => {
await axios.get("http://localhost:8080/getAllNH").then((response) => {
    setNhanHieu(response.data);
});
};
const getAllMS = async () => {
await axios.get("http://localhost:8080/getAllMS").then((response) => {
    setMauSac(response.data);
});
};

const getAllTH = async () => {
await axios.get("http://localhost:8080/getAllTH").then((response) => {
    setThuongHieu(response.data);
});
};

const getAllCL = async () => {
await axios.get("http://localhost:8080/getAllCL").then((response) => {
    setChatLieu(response.data);
});
};

const getAllDG = async () => {
await axios.get("http://localhost:8080/getAllDG").then((response) => {
    setDeGiay(response.data);
});
};

const getAllKC = async () => {
await axios.get("http://localhost:8080/getAllKC").then((response) => {
    setKichCo(response.data);
});
};
return (
<div>
    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3 ml-6">
            <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                Thương hiệu
            </label>
            <div className="mt-2 space-x-2 flex">
                <select
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                <option selected>--Chọn Thương Hiệu--</option>
                {thuongHieu.map((x) => (
                    <option
                    key={x.id}
                    value={x.id}
                    >
                    {x.ten}
                    </option>
                ))}
                </select>
            </div>
        </div>
        <div className="sm:col-span-3 ml-6">
            <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                Nhãn hiệu
            </label>
            <div className="mt-2 space-x-2 flex">
                <select
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                <option selected>--Chọn Nhãn Hiệu--</option>
                {nhanHieu.map((x) => (
                    <option
                    key={x.id}
                    value={x.id}
                    >
                    {x.ten}
                    </option>
                ))}
                </select>
            </div>
        </div>
        <div className="sm:col-span-3 ml-6">
            <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                Chất liệu
            </label>
            <div className="mt-2 space-x-2 flex">
                <select
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                <option selected>--Chọn Chất Liệu--</option>
                {chatLieu.map((x) => (
                    <option
                    key={x.id}
                    value={x.id}
                    >
                    {x.ten}
                    </option>
                ))}
                </select>
            </div>
        </div>
        <div className="sm:col-span-3 ml-6">
            <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                Đế giày
            </label>
            <div className="mt-2 space-x-2 flex">
                <select
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                <option selected>--Chọn Đế Giày--</option>
                {deGiay.map((x) => (
                    <option
                    key={x.id}
                    value={x.id}
                    >
                    {x.ten}
                    </option>
                ))}
                </select>
            </div>
        </div>
        <div className="sm:col-span-3 ml-6">
            <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                Màu sắc
            </label>
            <div className="mt-2 space-x-2 flex">
                <select
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                <option selected>--Chọn Màu Sắc--</option>
                {mauSac.map((x) => (
                    <option
                    key={x.id}
                    value={x.id}
                    >
                    {x.ten}
                    </option>
                ))}
                </select>
            </div>
        </div>
        <div className="sm:col-span-3 ml-6">
            <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                Kích cỡ
            </label>
            <div className="mt-2 space-x-2 flex">
                <select
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                <option selected>--Chọn Kích Cỡ--</option>
                {kichCo.map((x) => (
                    <option
                    key={x.id}
                    value={x.id}
                    >
                    {x.ten}
                    </option>
                ))}
                </select>
            </div>
        </div>
    </div>

    
</div>
)}