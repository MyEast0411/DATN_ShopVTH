import React, { useEffect, useRef, useState } from "react";
import { QrReader } from "react-qr-reader";
import { Modal, Select, Switch } from "antd";
const { Option } = Select;
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
import { Accordion, AccordionItem, Avatar, Button } from "@nextui-org/react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { TbInfoTriangle } from "react-icons/tb";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineCamera } from "react-icons/ai";
export default function ThemKhachHang() {
  let navigate = useNavigate();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState([]);
  const [wards, setWards] = useState([]);
  const [ward, setWard] = useState([]);
  const [value, setValue] = useState("");
  const [codeHuyen, setCodeHuyen] = useState("");
  const [codeXa, setCodeXa] = useState("");
  const [valueTP, setValueTP] = useState([]);
  const [valueHuyen, setValueHuyen] = useState([]);
  const [valueXa, setValueXa] = useState([]);
  const [showScanner, setShowScanner] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = React.useState(false);
  const [listDiaChi, setListDiaChi] = useState([]);
  const [isOn, setIsOn] = useState(false); // Khởi tạo trạng thái ban đầu là "off"
  const [idToDelete, setIdToDelete] = useState("");
  const handleSwitchChange = (index) => {
    const updatedListDiaChi = [...listDiaChi];
    
    updatedListDiaChi[index].trangThai = 1;
  
    updatedListDiaChi.forEach((item, i) => {
      if (i !== index) {
        item.trangThai = 0;
      }
    });
    setListDiaChi(updatedListDiaChi);
  };
  
  const handleDelete = () => {
    setDeleteConfirmationOpen(true);
  };
  const cancelDelete = () => {
    setDeleteConfirmationOpen(false);
  };
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
    getWards(districtCode).then((data) => {
      setWard(data);
    });
    const valueXa = ward.map(item => item.name);
    setValueXa(valueXa);
  }, [provinces,district]);
  const handleProvinceChange = (provinceCode) => {
    provinces.map((item) => {
      if (item.code == provinceCode) {
        // setKhachHang((prevKhachHang) => ({
        //   ...prevKhachHang,
        //   thanhPho: selectedProvince.name,
        // }));
        setDiaChi((prevDiaChi) => ({
          ...prevDiaChi,
          thanhPho: item.name,
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
        // setKhachHang((prevKhachHang) => ({
        //   ...prevKhachHang,
        //   huyen: item.name,
        // }));
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
        // setKhachHang((prevKhachHang) => ({
        //   ...prevKhachHang,
        //   xa: item.name,
        // }));
        setDiaChi((prevDiaChi) => ({
          ...prevDiaChi,
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

  const [diaChi, setDiaChi] = useState({
    id: "",
    soNha: "",
    xa: "",
    huyen: "",
    thanhPho: "",
  });
  const {
    soNha,
    xa,
    huyen,
    thanhPho,
  } = diaChi;
  const {
    ma,
    ten,
    anhNguoiDung,
    gioi_tinh,
    sdt,
    ngay_sinh,
    email,
    cccd
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
    const khachHangData = result.data;

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
      cccd: khachHangData.cccd
    });
    setDiaChi((prevDiaChi) => ({
      ...prevDiaChi,
      id: khachHangData.id,
    }));
  };
  const getDiaChi = async () => {
    const result = await axios.get(`http://localhost:8080/dia-chi/findByMa/${maKH}`);
    setListDiaChi(result.data);
  };
  const setBackgroundImage = (url) => {
    imgDivRef.current.style.backgroundImage = `url(${url})`;
  };
  useEffect(() => {
    getKhachHang();
    getDiaChi();
  }, [listDiaChi,khachHang]);

  const onChange = (e) => {
    setKhachHang({ ...khachHang, [e.target.name]: e.target.value });
    setDiaChi({ ...diaChi, [e.target.name]: e.target.value });
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    console.log(diaChi);
    await axios.post("http://localhost:8080/dia-chi/add",diaChi)
      .then((response) => {
          toast.success(`🎉 Thêm thành công`)
          getDiaChi();
      })
      .catch((error) => {
        console.log(error);
          toast.error(`${error.response.data}`)
      });
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
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

  const handleChangeTP = (selectedValue, index) => {
    const updatedListDiaChi = [...listDiaChi];
    const updatedItem = { ...updatedListDiaChi[index] };
    updatedItem.thanhPho = selectedValue;
    updatedListDiaChi[index] = updatedItem;
    setListDiaChi(updatedListDiaChi);
  };

  const handleChangeHuyen = (selectedValue, index) => {
    const updatedListDiaChi = [...listDiaChi];
    const updatedItem = { ...updatedListDiaChi[index] };
    updatedItem.huyen = selectedValue;
    updatedListDiaChi[index] = updatedItem;
    setListDiaChi(updatedListDiaChi);
  };

  const handleChangeXa = (selectedValue, index) => {
    const updatedListDiaChi = [...listDiaChi];
    const updatedItem = { ...updatedListDiaChi[index] };
    updatedItem.xa = selectedValue;
    updatedListDiaChi[index] = updatedItem;
    setListDiaChi(updatedListDiaChi);
  };

  const handleDuongChange = (e, index) => {
    const { value } = e.target;
    const updatedListDiaChi = [...listDiaChi];
    updatedListDiaChi[index] = { ...updatedListDiaChi[index], duong: value };
    setListDiaChi(updatedListDiaChi);
  };
  
  
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
              className="relative mb-10"
              style={{
                width: "250px",
                height: "250px",
                backgroundColor: "white",
                borderRadius: "50%",
                border: "1px dashed #ccc",
                backgroundSize: "cover",
              }}
              ref={imgDivRef}
            >
              <div
                className="absolute blue-hover inline-block cursor-pointer hover:text-sky-700 text-center text-3xl"
                style={{ bottom: "-35px", left: "45%" }}
              >
                <AiOutlineCamera onClick={() => fileInputRef.current.click()} />
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
            <label htmlFor="phone" className="block  font-medium text-gray-900">
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
            <label htmlFor="phone" className="block  font-medium text-gray-900">
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
              className="block pt-2  font-medium text-gray-900"
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
            <label htmlFor="phone" className="block  font-medium text-gray-900">
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
            <label htmlFor="phone" className="block  font-medium text-gray-900">
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
                  color: "#212125",
                  fontWeight: "bold",
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
              key="2"
              aria-label="+ Thêm mới địa chỉ"
              startContent={
                <Avatar
                  isBordered
                  color="success"
                  radius="lg"
                  src="https://as1.ftcdn.net/v2/jpg/02/43/68/08/1000_F_243680848_4OlSv4lr4t3ljl3ikjG6v9vawqtqcbDW.jpg"
                />
              }
              subtitle="Thêm địa chỉ cho khách hàng"
              title="Thêm mới địa chỉ"
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
                    onChange={(e) => handleWardsChange(e.target.value)}
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
              <Button 
                onClick={async() => {
                  await axios.post("http://localhost:8080/dia-chi/add",diaChi)
                  .then((response) => {
                      toast.success(`🎉 Thêm thành công`)
                      getDiaChi();
                  })
                  .catch((error) => {
                    console.log(error);
                      toast.error(`${error.response.data}`)
                  });
                }}
              >
                Thêm địa chỉ
              </Button>
            </AccordionItem>
          </Accordion>
          <Accordion selectionMode="multiple">
            {listDiaChi.map((item,index) => (
              <AccordionItem
              key={index}
              aria-label="Địa chỉ 1"
              startContent={
                <Avatar
                  isBordered
                  color="primary"
                  radius="lg"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBzzKBzwgurWanjvQl4kpN9w_CEtc27ryw5A&usqp=CAU"
                />
              }
              subtitle="Xem chi tiết"
              title={"Địa chỉ "+(index + 1)}
              >
              <div>
              <Select
                placeholder="Thành phố"
                onChange={(selectedValue) => handleChangeTP(selectedValue, index)}
                value={item.thanhPho}
                style={{width : "20%", marginRight : "10px"}}
              >
                {options}
              </Select>

              <Select
                placeholder="Thành phố"
                onChange={(selectedValue) => handleChangeHuyen(selectedValue, index)}
                value={item.huyen}
                style={{width : "21%", marginRight : "15px"}}
              >
                {optionHuyen}
              </Select>

              <Select
                placeholder="Thành phố"
                onChange={(selectedValue) => handleChangeXa(selectedValue, index)}
                value={item.xa}
                style={{width : "23%", marginRight : "10px"}}
              >
                {optionXa}
              </Select>

              <input
                  type="text"
                  name={`duong-${index}`}
                  value={item.duong}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                rounded-lg focus:ring-blue-500 focus:border-blue-500 block
                                    w-2/3 p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                    dark:focus:ring-blue-500 mt-4 dark:focus:border-blue-500"
                  placeholder="Số nhà/Ngõ/Đường"
                  required
                  onChange={(e) => handleDuongChange(e, index)}
              />
                <div className="flex mt-10">
                  <p className="mr-5">Địa chỉ mặc định</p>
                  <Switch
                    checked={item.trangThai === 1}
                    onChange={() => handleSwitchChange(index)}
                    className={`${
                      isOn
                        ? 'bg-gray-800'
                        : 'bg-gray-800'
                    }`}
                  />
                  <div className="flex-grow" />
                  <Button
                    className="justify-end"
                    style={{
                      backgroundColor: "#1976d2",
                      color: "#fff",
                      marginBottom: "2px",
                      marginLeft: "auto"
                    }}
                    onClick={() => {
                      setIdToDelete(item.id);
                      handleDelete();
                    }}
                  >
                    Xóa địa chỉ
                  </Button>
                </div>
              </div>
            </AccordionItem>
            ))}
            
            {/* <AccordionItem
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
            </AccordionItem> */}
            {/* <AccordionItem
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
            </AccordionItem> */}
          </Accordion>
          <div className="">
            <Button
              className="mt-5"
              style={{
                backgroundColor: "#1976d2",
                color: "#fff",
                marginBottom: "2px",
              }}
              onClick={showModal}
            >
              + Thêm địa chỉ
            </Button>
            {/* <Modal
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
                    onChange={(e) => handleWardsChange(e.target.value)}
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
            </Modal> */}

            <div className="mt-36 flex items-center justify-end gap-x-6">
              <Button
                onClick={() => navigate("/quan-ly-tai-khoan/khach-hang")}
                style={{
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  marginBottom: "2px",
                }}
              >
                Hủy
              </Button>

              <Button
                style={{
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  marginBottom: "2px",
                }}
                onClick={handleAdd}
              >
                Cập nhật
              </Button>
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
      <Dialog
        open={deleteConfirmationOpen}
        onClose={cancelDelete}
        fullWidth
      >
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
            <span>Xác nhận xóa</span>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc muốn xóa địa chỉ này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="warning">
            Hủy
          </Button>
          <Button color="primary" onClick={async() => {
            console.log(idToDelete);
            await axios
            .delete(`http://localhost:8080/dia-chi/delete/${idToDelete}`)
            .then((response) => {
              toast("🎉 Xóa thành công");
              cancelDelete();
            })
            .catch((error) => {
              toast("😿 "+error.response.data);
            });
            cancelDelete();
          }}>
            Vẫn xóa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
