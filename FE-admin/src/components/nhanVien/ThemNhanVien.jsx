import React, { useEffect, useRef, useState } from "react";
import { QrReader } from "react-qr-reader";
import { Modal, Form, Input, Select } from "antd";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { getProvinces, getDistricts, getWards } from "../../api/Location";
import { AiOutlinePlus } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { Button as ButtonAnt } from "antd";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import TailSpinLoading from "../loading/TailSpinLoading";
import { Button } from "@nextui-org/react";
import { TbInfoTriangle } from "react-icons/tb";
import axios from "axios";
import { toast } from "react-toastify";
export default function ThemNhanVien() {
  let navigate = useNavigate();
  const [listChucVu, setListChucVu] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [value, setValue] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
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
      if (item.province_id == provinceCode) {
        setKhachHang((prevKhachHang) => ({
          ...prevKhachHang,
          thanhPho: item.province_name,
        }));
      }
    });
    getDistricts(provinceCode).then((data) => {
      setDistricts(data.results);
    });
  };

  const handleDistrictChange = (districtCode) => {
    districts.map((item) => {
      if (item.district_id == districtCode) {
        setKhachHang((prevKhachHang) => ({
          ...prevKhachHang,
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
        setKhachHang((prevKhachHang) => ({
          ...prevKhachHang,
          xa: item.ward_name,
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
    chucVu: "",
    soNha: "",
    xa: "",
    huyen: "",
    thanhPho: ""
  });

  const { ma, ten, anhNguoiDung, gioi_tinh, sdt, ngay_sinh, email, chucVu, soNha, xa, huyen, thanhPho } = khachHang;

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

  // modal thêm chức vụ
  const [isModalOpenCV, setIsModalOpenCV] = useState(false);
  const [tenChucVu, setTenChucVu] = useState("");
  const showModalCV = () => {
    setIsModalOpenCV(true);
  };
  const handleOkCV = async () => {
    if(tenChucVu == '') {
      toast.error("Không được để trống tên chức vụ");
      setIsModalOpenCV(false);
      return;
    }
    await axios
      .post("http://localhost:8080/nhan_vien/addChucVu", {
        tenChucVu: tenChucVu,
      })
      .then((response) => {
        toast.success(`Thêm thành công`, {
          position: "top-right",
          autoClose: 2000,
        });
        getAllChucVu();
      })
      .catch((error) => {
        toast.error(`Thêm thất bại`, {
          position: "top-right",
          autoClose: 2000,
        });
      });
    setIsModalOpenCV(false);
  };
  const handleCancelCV = () => {
    setIsModalOpenCV(false);
  };
  const onChangeCV = (e) => {
    setTenChucVu(e.target.value);
    setKhachHang({ ...khachHang, id_chuc_vu: e.target.value });
  };
  const getAllChucVu = async () => {
    await axios.get("http://localhost:8080/nhan_vien/getAllChucVu").then((response) => {
      setListChucVu(response.data);
    });
  };

  useEffect(() => {
    getAllChucVu();
  }, []);

  const options = listChucVu.map((item) => (
    <Option key={item.id} value={item.id} className="relative flex items-center">
    {item.ten}
    {chucVu !== item.id && (
      <button onClick={async (e) => {
        e.stopPropagation();
        await axios.delete(`http://localhost:8080/nhan_vien/deleteChucVu/${item.id}`).then((response) => {
          if(response.status == 200) {
            toast.success("Xóa chức vụ thành công");
            getAllChucVu();
          }
        })
      }} className="absolute right-0 top-0 p-1 bg-red-500 text-white rounded hover:bg-red-600 h-5 flex justify-center items-center">
        <span className="inline-block">-</span>
      </button>
    )}
  </Option>
  
  ));


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

  const [form] = Form.useForm();

  const onSubmit = async () => {
    try {
      setLoading(true);
      // Kiểm tra hợp lệ của form
      await form.validateFields();
      cancelAdd();

      if (chucVu == '') {
        toast.error("Bạn chưa chọn chức vụ !");
        setLoading(false);
        return;
      }
      await axios
        .post("http://localhost:8080/nhan_vien/add", khachHang)
        .then((response) => {
          toast.success(`🎉 Thêm thành công`);
          setLoading(false);
          navigate("/quan-ly-tai-khoan/nhan-vien");
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          toast.error(`😢 ${error.response.data}`);
        });
      cancelAdd();
    } catch (error) {
      setLoading(false);
      console.log(error);
      cancelAdd();
    }
  };
  return (
    <>
      {loading && <TailSpinLoading />}
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
            form={form}
            initialValues={{
              remember: true,
            }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="left">
                <div className="mb-20">
                  <p className="pb-2 font-bold">Tên nhân viên</p>
                  <Form.Item
                    name="ten"
                    rules={[
                      {
                        required: true,
                        message: "Họ tên nhân viên không được để trống!",
                      },
                      {
                        validator: (_, value) => {
                          if (/\d/.test(value)) {
                            return Promise.reject("Họ tên nhân viên không được chứa số!");
                          } else {
                            return Promise.resolve();
                          }
                        }
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
                      placeholder="Nhập họ tên nhân viên"
                    />
                  </Form.Item>
                </div>

                <div className="mb-8" style={{ display: "block" }}>
                  <p className="pb-2 font-bold">Chức vụ </p>
                  <Form.Item
                    name="chucVu"
                  >
                    <div className="flex">
                      <Select
                        placeholder="Chức vụ"
                        value={chucVu == '' ? "Chọn chức vụ" : chucVu}
                        name="id_nhan_vien"
                        onChange={(e) => {
                          setKhachHang({ ...khachHang, chucVu: e });
                        }}
                        style={{
                          width: "90%",
                          height: "40px",
                          marginRight: "10px",
                          marginBottom: "54px",
                        }}

                      >
                        {options}

                        {/* {options.map((option, index) => (
                          <div className="d-flex">
                          <option key={index} value={option.props.value} className="relative">
                            {option.props.children}
                          </option>
                          <button onClick={(e) => {
                              e.stopPropagation();
                              console.log(option.props.value);
                            }} className="absolute right-0 top-0 p-2 bg-red-500 text-white rounded hover:bg-red-600 flex justify-center items-center h-3">
                              <span>-</span>
                          </button>
                          </div>
                        ))} */}
                      </Select>
                      <div
                        className="p-3"
                        style={{
                          backgroundColor: "#00C5CD",
                          borderRadius: "5px",
                          color: "white",
                          cursor: "pointer",
                          height: "40px",
                        }}
                        onClick={showModalCV}
                      >
                        <AiOutlinePlus />
                      </div>
                    </div>
                    <Modal
                      title="Thêm chức vụ"
                      open={isModalOpenCV}
                      onOk={handleOkCV}
                      onCancel={handleCancelCV}
                      cancelText="Hủy"
                      okText="Thêm"
                      style={{ position: "relative" }}
                    >
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                          Tên chức vụ
                        </label>
                        <input
                          type="text"
                          name="tenChucVu"
                          value={tenChucVu}
                          className="block p-2 mt-3 flex-1 w-full border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Nhập tên chức vụ"
                          onChange={(e) => onChangeCV(e)}
                          style={{ borderRadius: "5px" }}
                        />
                      </div>
                    </Modal>
                  </Form.Item>
                </div>

                <div className="mb-20">
                  <p className="pb-2 text-xl">Email nhân viên</p>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Email nhân viên đang để trống!",
                      },
                      {
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Email nhân viên không hợp lệ!",
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
                      placeholder="Nhập email nhân viên"
                    />
                  </Form.Item>
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
                <div className="flex" style={{ marginBottom: "89px" }}>
                  <FormControl>
                    <FormLabel
                      id="demo-controlled-radio-buttons-group"
                      style={{
                        fontWeight: "bold",
                        color: "#212121",
                        fontSize: "17px",
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
                    onClick={handleAdd}
                    type="primary"
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
            Bạn có chắc muốn thêm nhân viên này?
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
