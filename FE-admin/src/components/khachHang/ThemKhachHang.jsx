import React, { useEffect, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { Modal } from "antd";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { getProvinces, getDistricts, getWards } from "../../api/Location";
import { parse } from 'date-fns';
import { Link } from 'react-router-dom';
export default function ThemKhachHang() {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [value, setValue] = useState(''); 
    const [showScanner, setShowScanner] = useState(false); 
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
    const [khachHang, setKhachHang] = useState({
        ma: "",
        ten: "",
        anh_nguoi_dung: "",
        gioi_tinh: "",
        so_dien_thoai: "",
        ngay_sinh: "",
        email: "",
        cccd: "",
        soNha: "",
        xa: "",
        quan: "",
        tinh: ""
    });

    const {
        ma,
        ten,
        anh_nguoi_dung,
        gioi_tinh,
        so_dien_thoai,
        ngay_sinh,
        email,
        cccd,
        soNha,
        xa,
        quan,
        tinh,
    } = khachHang;
    function parseDate(input) {
        var parts = input.match(/(\d{2})(\d{2})(\d{4})/);
        if (parts) {
            var day = +parts[1];
            var month = +parts[2];
            var year = +parts[3];
            return new Date(Date.UTC(year, month - 1, day));
        }
        return null; // Trả về null nếu chuỗi không hợp lệ
    }

    const onChange = (e) => {
        setKhachHang({ ...khachHang, [e.target.name]: e.target.value });
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    const handleStartScanning = () => {
        setShowScanner(true);
    }

    const handleEndScanning = () => {
        setShowScanner(false);
    }

    const handleScan = (data) => {
        if (data) {
        // Xử lý kết quả quét ở đây
        console.log(data);
        handleOk();
        }
    }

    const handleError = (error) => {
        console.error(error);
    }
    const handleChange = (event) => {
        setValue(event.target.value); 
    };

    return (
        <>
            <div class="grid grid-cols-3 gap-4 m-5" style={{
                fontSizfe: "8px",
                backgroundColor: "white",
                padding: "20px 10px",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.2s",
            }}>
                <div className='border-r-4 text-center pt-5' style={{
                    borderColor: "#61677A"
                }}>
                    <h1 className='font-medium text-2xl mb-14'>Ảnh đại diện</h1>
                    <div className="anh-dai-dien flex justify-center">
                        <div className='relative cursor-pointer' style={{
                            width: "300px",
                            height: "300px",
                            backgroundColor: "white",
                            borderRadius: "50%",
                            border: "1px dashed #ccc",
                        }}>
                            <span className='absolute text-4xl'
                                style={{
                                    top: "40%",
                                    left: "47%"
                                }}>
                                +
                            </span>
                            <div className='absolute' style={{
                                top: "54%",
                                left: "42%"
                            }}>Tải ảnh</div>
                        </div>
                    </div>
                </div>
                <div className="col-span-2 m-10">
                    <div className='grid grid-cols-2 gap-4'>
                        <div className="left">
                            <div className='mb-8'>
                                <label
                                    htmlFor="phone"
                                    className="block  text-xl font-medium text-gray-900"
                                >
                                    Tên khách hàng
                                </label>
                                <input
                                    value={ten}
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                    rounded-lg focus:ring-blue-500 focus:border-blue-500 block
                                     w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                      dark:focus:ring-blue-500 mb-20 dark:focus:border-blue-500"
                                    placeholder="Nhập tên khách hàng"
                                    required
                                    onChange={(e) => {onChange(e)}}
                                />
                            </div>
                            <div className='mb-8'>
                                <label
                                    htmlFor="phone"
                                    className="block text-xl font-medium text-gray-900"
                                >
                                    Căn cước công dân
                                </label>
                                <input
                                    type="number"
                                    value={cccd}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                    rounded-lg focus:ring-blue-500 focus:border-blue-500 block
                                     w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                      dark:focus:ring-blue-500 mb-20 dark:focus:border-blue-500"
                                    placeholder="CCCD"
                                    required
                                    onChange={(e) => {onChange(e)}}
                                />
                            </div>
                            <div className='mb-8'>
                                <label
                                    htmlFor="phone"
                                    className="block pt-2 text-xl font-medium text-gray-900"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                    rounded-lg focus:ring-blue-500 focus:border-blue-500 block
                                     w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                      dark:focus:ring-blue-500 mb-20 dark:focus:border-blue-500"
                                    placeholder="Email"
                                    required
                                    onChange={(e) => {onChange(e)}}
                                />
                            </div>
                            <div className="mb-8">
                                <label
                                htmlFor="city"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                Chọn thành phố
                                </label>
                                <select
                                id="city"
                                className="bg-gray-50 border mb-24 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                            htmlFor="wards"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                            Chọn xã phường
                            </label>
                            <select
                            id="wards"
                            className="bg-gray-50 border mb-20 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                            <option value="">Chọn xã phường</option>
                            {wards.map((ward) => (
                                <option key={ward.code} value={ward.code}>
                                {ward.name}
                                </option>
                            ))}
                            </select>
                        </div>
                        </div>

                        <div className="right relative">
                            <div className='mb-8'>
                                <label
                                    htmlFor="phone"
                                    className="block text-xl font-medium text-gray-900"
                                >
                                    Ngày sinh
                                </label>
                                <input
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                rounded-lg focus:ring-blue-500 focus:border-blue-500 block
                                 w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                  dark:focus:ring-blue-500 mb-20 dark:focus:border-blue-500'
                                    type="date"
                                    value={parseDate(ngay_sinh) ? parseDate(ngay_sinh).toISOString().slice(0, 10) : ''}
                                    id="dateInput"
                                    style={{
                                        width: "100%"
                                    }}
                                    required
                                    onChange={(e) => {onChange(e)}}
                                />
                                <button type="button" style={{
                                    position : "absolute",
                                    top : -40,
                                    right :  0,
                                    fontSize : 15,
                                    borderRadius : 5,
                                    align : "left",
                                    
                                }} className='bg-blue-500 text-white rounded w-32 h-10'
                                   onClick={showModal}>
                                    <img src="https://cdn-icons-png.flaticon.com/512/241/241521.png"
                                     className="h-6 w-6 absolute left-4 top-1/2 transform -translate-y-1/2" />
                                    <span className="ml-8">
                                        Quét QR
                                    </span></button>
                                <Modal
                                    open={isModalOpen}
                                    onOk={handleOk}
                                    onCancel={handleCancel}
                                    style={{ position: "relative" }}
                                    className=""
                                >
                                    <div>
                                    <QrReader
                                        onResult={(data) => {
                                            if (data != undefined) {
                                              handleOk();
                                              console.log(data.text);
                                              function splitString(inputString) {
                                                const values = inputString.split('|');
                                                    return values;
                                                }
                                                const result = splitString(data.text);
                                                console.log(result);
                                                setKhachHang({
                                                    ...khachHang,
                                                    ten: result[2],
                                                    cccd : result[0],
                                                    ngay_sinh : result[3],
                                                    gioi_tinh: result[4]
                                                });
                                            }
                                          }}
                                        onError={handleError}
                                        style={{ width: '100%' }}
                                    />
                                    </div>
                                </Modal>
                            </div>
                            <div className="mb-8 flex">
                                <FormControl>
                                    <FormLabel
                                        id="demo-controlled-radio-buttons-group"
                                        style={{
                                            fontWeight: "bold",
                                            color: "#212121",
                                            fontSize: "20px"
                                        }}
                                    >
                                        Giới tính
                                    </FormLabel>
                                    <RadioGroup
                                        style={{
                                            display: "flex",
                                        }}
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        value={value}
                                        onChange={handleChange}
                                    >
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <FormControlLabel
                                                value="nam"
                                                control={<Radio />}
                                                label="Nam"
                                                checked={gioi_tinh === 'Nam'}
                                                style={{ marginRight: "10px" }}
                                            />
                                            <FormControlLabel value="nữ" checked={gioi_tinh === 'Nữ'} control={<Radio />} label="Nữ" />
                                        </div>
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <div className='mb-8'>
                                <label
                                    htmlFor="phone"
                                    className="block pt-14 text-xl font-medium text-gray-900"
                                >
                                    Số điện thoại
                                </label>
                                <input
                                    type="number"
                                    value={so_dien_thoai}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                    rounded-lg focus:ring-blue-500 focus:border-blue-500 block
                                     w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                      dark:focus:ring-blue-500 mb-20  dark:focus:border-blue-500"
                                    placeholder="Số điện thoại"
                                    required
                                    onChange={(e) => {onChange(e)}}
                                />
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
                            className="bg-gray-50 border mb-20 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                        <div className='mb-8'>
                            <label
                                htmlFor="phone"
                                className="block mb-2 text-xl font-medium text-gray-900"
                            >
                                Số nhà/Ngõ/Đường
                            </label>
                            <input
                                type="text"
                                value={soNha}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                rounded-lg focus:ring-blue-500 focus:border-blue-500 block
                                    w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                    dark:focus:ring-blue-500 mb-20 mt-4 dark:focus:border-blue-500"
                                placeholder="Số nhà/Ngõ/Đường"
                                required
                                onChange={(e) => {onChange(e)}}
                            />
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <Link
                            to="/quan-ly-tai-khoan/khach-hang"
                            type="button"
                            className="text-sm rounded-md  font-semibold leading-6 text-gray-900"
                            >
                            Cancel
                            </Link>
                            <button
                            type="button"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                            Thêm khách hàng
                            </button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
