import React, { useEffect, useRef, useState } from "react";
import { QrReader } from "react-qr-reader";
import { Modal } from "antd";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { getProvinces, getDistricts, getWards } from "../../api/Location";
import { parse } from "date-fns";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Accordion, AccordionItem, Avatar } from "@nextui-org/react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Button } from "@nextui-org/react";
import { TbInfoTriangle } from "react-icons/tb";
import axios from "axios";
import { toast } from "react-toastify";
export default function ThemKhachHang() {
  let navigate = useNavigate();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [value, setValue] = useState("");
  const [valueTP, setValueTP] = useState("");
  const [valueHuyen, setValueHuyen] = useState("");
  const [valueXa, setValueXa] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = React.useState(false);
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  const handleAdd = () => {
    setDeleteConfirmationOpen(true);
  };

  const cancelAdd = () => {
    setDeleteConfirmationOpen(false);
  };
  useEffect(() => {
    getProvinces().then((data) => {
      setProvinces(data);
    });
  }, []);
  const handleProvinceChange = (provinceCode) => {
    provinces.map((item) => {
      if (item.code == provinceCode) {
        setKhachHang((prevKhachHang) => ({
          ...prevKhachHang,
          thanhPho: selectedProvince.name,
        }));
      }
    });

    getDistricts(provinceCode).then((data) => {
      setDistricts(data);
    });
  };

  const handleDistrictChange = (districtCode) => {
    console.log(districtCode);
    districts.map((item) => {
      if (item.code == districtCode) {
        setKhachHang((prevKhachHang) => ({
          ...prevKhachHang,
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
        setKhachHang((prevKhachHang) => ({
          ...prevKhachHang,
          xa: item.name,
        }));
      }
    });
    console.log(khachHang);
  };
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

  const {
    ma,
    ten,
    anhNguoiDung,
    gioi_tinh,
    sdt,
    ngay_sinh,
    email,
    cccd,
    soNha,
    xa,
    huyen,
    thanhPho,
  } = khachHang;

  function formatDate(dateString) {
    if (dateString) {
      const date = new Date(dateString);
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, "0");
      const day = String(date.getUTCDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    return "";
  }

  const { maKH } = useParams();
  const getKhachHang = async () => {
    const result = await axios.get(
      `http://localhost:8080/khach-hang/findByMa/${maKH}`
    );
    const khachHangData = result.data; // Dữ liệu khách hàng từ phản hồi API
    provinces.map((item) => {
      if (item.name == khachHangData.id_dia_chi.thanhPho) {
        setValueTP(item.code);
      }
    });
    // getDistricts(valueTP).then((data) => {
    //     setDistricts(data);
    // });
    console.log(khachHangData.ngaySinh);
    setBackgroundImage(khachHangData.anhNguoiDung);
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
      thanhPho: khachHangData.id_dia_chi.thanhPho,
      huyen: khachHangData.id_dia_chi.huyen,
      xa: khachHangData.id_dia_chi.xa,
      soNha: khachHangData.id_dia_chi.duong,
    });
  };

  const setBackgroundImage = (url) => {
    imgDivRef.current.style.backgroundImage = `url(${url})`;
  };
  useEffect(() => {
    getKhachHang();
  }, [valueTP, khachHang]);

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
  };

  const handleEndScanning = () => {
    setShowScanner(false);
  };

  const handleScan = (data) => {
    if (data) {
      console.log(data);
      handleOk();
    }
  };

  const handleError = (error) => {
    console.error(error);
  };
  const handleChange = (event) => {
    console.log(event.target.value);
    setKhachHang({ ...khachHang, gioi_tinh: event.target.value });
    setValue(event.target.value);
  };
  const fileInputRef = useRef(null);
  const imgDivRef = useRef(null);
  const imgLink = "https://i.ibb.co/TKQqYvT/";
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log(file.name);
        const imageUrl = e.target.result;
        setKhachHang({ ...khachHang, anhNguoiDung: imgLink + file.name });
        console.log(khachHang);
        imgDivRef.current.style.backgroundImage = `url(${imageUrl})`;
        imgDivRef.current.style.backgroundSize = "cover";
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async () => {
    await axios
      .post("http://localhost:8080/khach-hang/add", khachHang)
      .then((response) => {
        toast.success(`🎉 Thêm thành công`);
        navigate("/quan-ly-tai-khoan/khach-hang");
      })
      .catch((error) => {
        toast.error(`😢 Thêm thất bại`);
      });
    cancelAdd();
  };
  return (
    <>
      <div
        class="grid grid-cols-3 gap-4 m-5"
        style={{
          fontSizfe: "8px",
          backgroundColor: "white",
          padding: "20px 10px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
          transition: "transform 0.2s",
        }}
      >
        <div
          className="border-r-4 pt-5 relative"
          style={{
            borderColor: "#61677A",
          }}
        >
          <h1 className="absolute -top-3">Thông tin khách hàng</h1>
          {/* <h1 className='font-medium mt-4 text-2xl mb-5'>Ảnh đại diện</h1> */}
          <div className="anh-dai-dien mt-14 flex justify-center">
            <div
              className="relative cursor-pointer"
              style={{
                width: "300px",
                height: "300px",
                backgroundColor: "white",
                borderRadius: "50%",
                border: "1px dashed #ccc",
                backgroundSize: "cover",
              }}
              ref={imgDivRef}
            >
              <span
                className="absolute text-4xl"
                style={{ top: "40%", left: "47%" }}
              >
                +
              </span>
              <div className="absolute" style={{ top: "54%", left: "42%" }}>
                <button onClick={() => fileInputRef.current.click()}>
                  Tải ảnh
                </button>
              </div>
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
            ref={fileInputRef}
          />
          <div className="mb-1 p-5">
            <label
              htmlFor="phone"
              className="block text-xl font-medium text-gray-900"
            >
              Tên khách hàng
            </label>
            <input
              value={ten}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                rounded-lg focus:ring-blue-500 focus:border-blue-500 block
                                w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                dark:focus:ring-blue-500 mb-0 dark:focus:border-blue-500"
              placeholder="Nhập tên khách hàng"
              required
              onChange={(e) => {
                onChange(e);
              }}
            />
          </div>
          <div className="p-5">
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
                                    dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="CCCD"
              required
              onChange={(e) => {
                onChange(e);
              }}
            />
          </div>
          <div className="p-5">
            <label
              htmlFor="email"
              className="block pt-2 text-xl font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                rounded-lg focus:ring-blue-500 focus:border-blue-500 block
                                    w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                    dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Email"
              required
              onChange={(e) => {
                onChange(e);
              }}
            />
          </div>
          <div className="p-5">
            <label
              htmlFor="phone"
              className="block text-xl font-medium text-gray-900"
            >
              Ngày sinh
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                    rounded-lg focus:ring-blue-500 focus:border-blue-500 block
                                    w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="date"
              name="ngay_sinh"
              value={formatDate(ngay_sinh)}
              id="dateInput"
              style={{
                width: "100%",
              }}
              required
              onChange={(e) => {
                onChange(e);
              }}
            />
          </div>

          <div className="p-5">
            <label
              htmlFor="phone"
              className="block text-xl font-medium text-gray-900"
            >
              Số điện thoại
            </label>
            <input
              type="number"
              name="sdt"
              value={sdt}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                    rounded-lg focus:ring-blue-500 focus:border-blue-500 block
                                     w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                      dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Số điện thoại"
              required
              onChange={(e) => {
                onChange(e);
              }}
            />
          </div>
          <div className="p-5 flex">
            <FormControl>
              <FormLabel
                id="demo-controlled-radio-buttons-group"
                style={{
                  fontWeight: "bold",
                  color: "#212121",
                  fontSize: "20px",
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
                    value="Nam"
                    control={<Radio />}
                    label="Nam"
                    checked={gioi_tinh === "Nam"}
                    style={{ marginRight: "10px" }}
                  />
                  <FormControlLabel
                    value="Nữ"
                    checked={gioi_tinh === "Nữ"}
                    control={<Radio />}
                    label="Nữ"
                  />
                </div>
              </RadioGroup>
            </FormControl>
          </div>
        </div>

        <div className="col-span-2 m-10">
          <Accordion selectionMode="multiple">
            <AccordionItem
              key="1"
              aria-label="Địa chỉ 1"
              startContent={
                <Avatar
                  isBordered
                  color="primary"
                  radius="lg"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBzzKBzwgurWanjvQl4kpN9w_CEtc27ryw5A&usqp=CAU"
                />
              }
              subtitle="Cập nhật ngay"
              title="Địa chỉ 1"
            >
              <div>
                <label>Thành phố</label>
                <input type="text" />
              </div>
            </AccordionItem>
            <AccordionItem
              key="2"
              aria-label="Địa chỉ 2"
              startContent={
                <Avatar
                  isBordered
                  color="success"
                  radius="lg"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBzzKBzwgurWanjvQl4kpN9w_CEtc27ryw5A&usqp=CAU"
                />
              }
              subtitle="Cập nhật ngay"
              title="Địa chỉ 2"
            >
              {defaultContent}
            </AccordionItem>
            <AccordionItem
              key="3"
              aria-label="Địa chỉ 3"
              startContent={
                <Avatar
                  isBordered
                  color="warning"
                  radius="lg"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBzzKBzwgurWanjvQl4kpN9w_CEtc27ryw5A&usqp=CAU"
                />
              }
              subtitle="Cập nhật ngay"
              title="Địa chỉ 3"
            >
              {defaultContent}
            </AccordionItem>
          </Accordion>
          <div className="">
            <Button type="primary" onClick={showModal}>
              Thêm địa chỉ
            </Button>
            <Modal
              title="Thêm địa chỉ"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              okText="Xác nhận"
              cancelText="Hủy"
            >
              <div className="">
                <div className="mb-8">
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
                      handleProvinceChange(e.target.value);
                    }}
                    value={valueTP}
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
                    value={valueHuyen}
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
                    onChange={(e) => handleWardsChange(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={valueXa}
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
              <div className="mb-8">
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Số nhà/Ngõ/Đường
                </label>
                <input
                  type="text"
                  name="soNha"
                  value={soNha}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                rounded-lg focus:ring-blue-500 focus:border-blue-500 block
                                    w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                    dark:focus:ring-blue-500 mt-4 dark:focus:border-blue-500"
                  placeholder="Số nhà/Ngõ/Đường"
                  required
                  onChange={(e) => {
                    onChange(e);
                  }}
                />
              </div>
            </Modal>

            <div className="mt-36 flex items-center justify-end gap-x-6">
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
                onClick={handleAdd}
              >
                Cập nhật thông tin
              </button>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={deleteConfirmationOpen} onClose={cancelAdd} fullWidth>
        <DialogTitle>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingBottom: "15px",
            }}
          >
            <TbInfoTriangle
              className="mr-2"
              style={{
                color: "red",
                fontSize: "25px",
              }}
            />
            <span>Xác nhận sửa</span>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc muốn sửa khách hàng này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelAdd} color="warning">
            Hủy
          </Button>
          <Button color="primary" onClick={onSubmit}>
            Vẫn sửa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
