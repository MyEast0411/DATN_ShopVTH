import React, { useEffect, useRef, useState } from "react";
import { QrReader } from "react-qr-reader";
import { Modal, Form, Input } from "antd";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { getProvinces, getDistricts, getWards } from "../../api/Location";
import { parse } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { Button as ButtonAnt } from "antd";
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
  const [showScanner, setShowScanner] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = React.useState(false);
  const handleAdd = () => {
    setDeleteConfirmationOpen(true);
  };

  const cancelAdd = () => {
    setDeleteConfirmationOpen(false);
  };

  useEffect(() => {
    getProvinces().then((data) => {
      setProvinces(data.results);
    });
  }, []);

  const handleProvinceChange = (provinceCode) => {
    provinces.map((item) => {
      if (item.code == provinceCode) {
        setKhachHang((prevKhachHang) => ({
          ...prevKhachHang,
          thanhPho: item.name,
        }));
      }
    });
    getDistricts(provinceCode).then((data) => {
      setDistricts(data.results);
    });
  };

  const handleDistrictChange = (districtCode) => {
    districts.map((item) => {
      if (item.code == districtCode) {
        setKhachHang((prevKhachHang) => ({
          ...prevKhachHang,
          huyen: item.name,
        }));
      }
    });
    getWards(districtCode).then((data) => {
      setWards(data.results);
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
  };
  const [khachHang, setKhachHang] = useState({
    ma: "",
    ten: "",
    anhNguoiDung: "",
    gioi_tinh: "Nam",
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
    console.log(e.target.name);
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
    console.log(e);
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log(file.name);
        const imageUrl = e.target.result;
        console.log(imageUrl);
        setKhachHang({ ...khachHang, anhNguoiDung: file.name });
        console.log(khachHang);
        imgDivRef.current.style.backgroundImage = `url(${imageUrl})`;
        imgDivRef.current.style.backgroundSize = "cover";
        // Sử dụng useRef để đặt nền ảnh
      };
      reader.readAsDataURL(file);
    }
  };
  const [errSoNha, setErrSoNha] = useState("");
  const [errNgaySinh, setErrNgaySinh] = useState("");
  // sdt
  function validatePhoneNumber(phoneNumber) {
    var regex = /^(0[2-9][0-9]{8})$/;
    return regex.test(phoneNumber);
  }
  // email
  function validateEmail(email) {
    // Biểu thức chính quy cho địa chỉ email
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    // Kiểm tra xem email có khớp với định dạng không
    return regex.test(email);
  }
  const onSubmit = async () => {
    var currentDate = new Date();
    var dateObject = new Date(khachHang.ngay_sinh);
    // Lấy thông tin ngày, tháng và năm
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1; // Lưu ý: Tháng trong JavaScript bắt đầu từ 0
    var year = currentDate.getFullYear();
    var check = true;
    if (check) {
      await axios
        .post("http://localhost:8080/khach-hang/add", khachHang)
        .then((response) => {
          toast.success(`🎉 Thêm thành công`);
          navigate("/quan-ly-tai-khoan/khach-hang");
        })
        .catch((error) => {
          toast.error(`😢 Thêm thất bại`);
        });
    }
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
          className="border-r-4 text-center pt-5"
          style={{
            borderColor: "#61677A",
          }}
        >
          <h1 className="font-medium text-2xl mb-14">Ảnh đại diện</h1>
          <div className="anh-dai-dien flex justify-center">
            <div
              className="relative cursor-pointer"
              style={{
                width: "300px",
                height: "300px",
                backgroundColor: "white",
                borderRadius: "50%",
                border: "1px dashed #ccc",
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
        </div>

        <div className="col-span-2 m-10">
          <Form
            initialValues={{
              remember: true,
            }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="left">
                <div className="mb-20">
                  <p className="pb-2">Họ khách hàng</p>
                  <Form.Item
                    name="ho"
                    rules={[
                      {
                        required: true,
                        message: "Họ khách hàng không được để trống!",
                      },
                      {
                        pattern: /^[^\d\s]+$/,
                        message:
                          "Họ khách hàng không hợp lệ!",
                      },
                    ]}
                  >
                    <Input
                      value={ten}
                      name="ho"
                      style={{ height: "42px" }}
                      onChange={(e) => {
                        onChange(e);
                      }}
                      placeholder="Nhập họ khách hàng"
                    />
                  </Form.Item>
                </div>

                <div className="mb-20">
                  <p className="pb-2 text-xl">Tên khách hàng</p>
                  <Form.Item
                    name="ten"
                    rules={[
                      {
                        required: true,
                        message: "Tên khách hàng không được để trống!",
                      },
                      {
                        pattern: /^[^\d]*$/,
                        message:
                          "Tên khách hàng không hợp lệ! Không được nhập số.",
                      },
                    ]}
                  >
                    <Input
                      value={ten}
                      name="ten"
                      style={{ height: "42px" }}
                      onChange={(e) => {
                        onChange(e);
                      }}
                      placeholder="Nhập tên khách hàng"
                    />
                  </Form.Item>
                </div>

                <div className="mb-8">
                  <p className="pb-2 text-xl">Email khách hàng</p>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Email khách hàng đang để trống!",
                      },
                      {
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Email khách hàng không hợp lệ!",
                      },
                    ]}
                  >
                    <Input
                      value={email}
                      name="email"
                      style={{ height: "42px" }}
                      onChange={(e) => {
                        onChange(e);
                      }}
                      placeholder="Nhập email khách hàng"
                    />
                  </Form.Item>
                </div>
                <div className="mb-8 mt-20">
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
                      <option key={province.province_id} value={province.province_id}>
                        {province.province_name}
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
                    className="bg-gray-50 border mb-20 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">Chọn xã phường</option>
                    {wards.map((ward) => (
                      <option key={ward.ward_id} value={ward.ward_id}>
                        {ward.ward_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="right relative">
                <div className="mb-12">
                  <label htmlFor="phone" className="block text-xl font-bold">
                    Ngày sinh
                  </label>
                  <Input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                rounded-lg focus:ring-blue-500 focus:border-blue-500 block
                                 w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                  dark:focus:ring-blue-500 mb-20 dark:focus:border-blue-500"
                    type="date"
                    name="ngay_sinh"
                    value={
                      parseDate(ngay_sinh)
                        ? parseDate(ngay_sinh).toISOString().slice(0, 10)
                        : ngay_sinh
                    }
                    id="dateInput"
                    style={{
                      width: "100%",
                    }}
                    max={new Date().toISOString().slice(0, 10)}
                    onChange={(e) => {
                      onChange(e);
                    }}
                  />
                  <p style={{ color: "red" }}>{errNgaySinh}</p>
                  <button
                    type="button"
                    style={{
                      position: "absolute",
                      top: -40,
                      right: 0,
                      fontSize: 15,
                      borderRadius: 5,
                      align: "left",
                    }}
                    className="bg-blue-500 text-white rounded w-32 h-10"
                    onClick={showModal}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/241/241521.png"
                      className="h-6 w-6 absolute left-4 top-1/2 transform -translate-y-1/2"
                    />
                    <span className="ml-8">Quét QR</span>
                  </button>
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
                            function splitString(inputString) {
                              const values = inputString.split("|");
                              return values;
                            }
                            const result = splitString(data.text);
                            console.log(result);
                            setKhachHang({
                              ...khachHang,
                              ten: result[2],
                              cccd: result[0],
                              ngay_sinh: result[3],
                              gioi_tinh: result[4],
                            });
                          }
                        }}
                        onError={handleError}
                        style={{ width: "100%" }}
                      />
                    </div>
                  </Modal>
                </div>
                <div className="flex" style={{ marginBottom: "87px" }}>
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
                <div className="mb-20">
                  <p className="pb-2 text-xl">Số điện thoại</p>
                  <Form.Item
                    name="sdt"
                    rules={[
                      {
                        required: true,
                        message: "Số điện thoại đang trống!",
                      },
                      {
                        pattern: /^0[0-9]{9}$/,
                        message:
                          "Sai định dạng số điện thoại!",
                      }
                    ]}
                  >
                    <Input
                      value={sdt}
                      name="sdt"
                      style={{ height: "42px" }}
                      onChange={(e) => {
                        onChange(e);
                      }}
                      placeholder="Nhập số điện thoại"
                    />
                  </Form.Item>
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
                      <option key={district.district_id} value={district.district_id}>
                        {district.district_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="phone"
                    className="block text-xl font-medium text-gray-900"
                  >
                    Số nhà/Ngõ/Đường
                  </label>
                  <Form.Item
                    name="soNha"
                    rules={[
                      {
                        required: true,
                        message: "Số nhà/Ngõ/Đường đang trống!",
                      }
                    ]}
                  >
                  <input
                    type="text"
                    name="soNha"
                    value={soNha}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                rounded-lg focus:ring-blue-500 focus:border-blue-500 block
                                    w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                    dark:focus:ring-blue-500 mt-4 dark:focus:border-blue-500"
                    placeholder="Số nhà/Ngõ/Đường"
                    onChange={(e) => {
                      onChange(e);
                    }}
                  />
                  </Form.Item>
                  
                  <p style={{ color: "red" }}>{errSoNha}</p>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <Link
                    to="/quan-ly-tai-khoan/khach-hang"
                    type="button"
                    className="text-sm rounded-md  font-semibold leading-6 text-gray-900"
                  >
                    Cancel
                  </Link>

                  <ButtonAnt
                    htmlType="submit"
                    style={{
                      backgroundColor: "#1976d2",
                      marginBottom: "2px",
                    }}
                    onClick={onSubmit}
                  >
                    Hoàn tất
                  </ButtonAnt>
                </div>
              </div>
            </div>
          </Form>
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
            <span>Xác nhận thêm</span>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc muốn thêm khách hàng này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelAdd} color="warning">
            Hủy
          </Button>
          <Button color="primary" onClick={onSubmit}>
            Vẫn thêm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
