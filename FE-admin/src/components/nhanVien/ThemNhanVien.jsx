import React, { useEffect, useRef, useState } from "react";
import { QrReader } from "react-qr-reader";
import { Modal, Select } from "antd";
const { Option } = Select;
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { AiOutlinePlus } from "react-icons/ai";
import { getProvinces, getDistricts, getWards } from "../../api/Location";
import { parse } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { Button as ButtonAnt } from "antd";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
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
          thanhPho: item.name,
        }));
      }
    });
    getDistricts(provinceCode).then((data) => {
      setDistricts(data);
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
  };
  const [khachHang, setKhachHang] = useState({
    ma: "",
    ten: "",
    anhNguoiDung: "",
    gioi_tinh: "Nam",
    sdt: "",
    ngay_sinh: "",
    email: "",
    chucVu: "Nhân viên",
    soNha: "",
    xa: "",
    huyen: "",
    thanhPho: "",
    id_thuong_hieu: "",
  });

  const { ma, ten, anhNguoiDung, gioi_tinh, sdt, ngay_sinh, email, chucVu, soNha, xa, huyen, tinh, id_thuong_hieu } = khachHang;

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
    await axios
      .post("http://localhost:8080/nhan_vien/addChucVu", {
        tenChucVu: tenChucVu,
      })
      .then((response) => {
        toast.success(`Thêm thành công`, {
          position: "top-right",
          autoClose: 2000,
        });
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
  }, [listChucVu]);

  const options = listChucVu.map((item) => (
    <Option key={item.id} value={item.id}>
      {item.ten}
    </Option>
  ));

  const onChange = (e) => {
    console.log(e.target.value);
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
        console.log(imageUrl);
        setKhachHang({ ...khachHang, anhNguoiDung: file.name });
        console.log(khachHang);
        imgDivRef.current.style.backgroundImage = `url(${imageUrl})`;
        imgDivRef.current.style.backgroundSize = "cover";
      };
      reader.readAsDataURL(file);
    }
  };
  const [errTen, setErrTen] = useState("");
  const [errSdt, setErrSDT] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errSoNha, setErrSoNha] = useState("");
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
    // check validate
    // ten
    var check = true;
    if (khachHang.ten == "") {
      setErrTen("* Không được để trống tên");
      check = false;
    } else {
      setErrTen("");
    }
    // so nha
    var check = true;
    if (khachHang.soNha == "") {
      setErrSoNha("* Không được để trống số nhà/ngõ/đường");
      check = false;
    } else {
      setErrSoNha("");
    }
    // sdt

    if (khachHang.sdt == "") {
      setErrSDT("* Không được để trống số điện thoại");
      check = false;
    } else {
      if (validatePhoneNumber(khachHang.sdt)) {
        setErrSDT("");
      } else {
        setErrSDT("* SDT không hợp lệ");
        check = false;
      }
    }

    // email
    if (khachHang.email == "") {
      setErrEmail("* Không được để trống email");
      check = false;
    } else {
      if (validateEmail(khachHang.email)) {
        setErrEmail("");
      } else {
        setErrEmail("* Email không hợp lệ");
        check = false;
      }
    }

    if (check) {
      await axios
        .post("http://localhost:8080/nhan_vien/add", khachHang)
        .then((response) => {
          toast.success(`🎉 Thêm thành công`);
          navigate("/quan-ly-tai-khoan/nhan-vien");
        })
        .catch((error) => {
          toast.error(`😢 Thêm thất bại`);
        });
    }
    cancelAdd();
  };

  return (
    <>
      <div className="mb-2 font-normal border-gray-500 text-lg flex items-center">
        <p className="mt-1 mb-3" style={{ fontSize: "30px", fontWeight: "bolder" }}>
          👥 Thêm nhân viên
        </p>
      </div>
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
              <span className="absolute text-4xl" style={{ top: "40%", left: "47%" }}>
                +
              </span>
              <div className="absolute" style={{ top: "54%", left: "42%" }}>
                <button onClick={() => fileInputRef.current.click()}>Tải ảnh</button>
              </div>
            </div>
          </div>
          <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} ref={fileInputRef} />
        </div>
        <div className="col-span-2 m-10">
          <div className="grid grid-cols-2 gap-4">
            <div className="left">
              <div className="mb-8">
                <label htmlFor="phone" className="block  text-xl font-medium text-gray-900">
                  Tên nhân viên
                </label>
                <input
                  value={ten}
                  name="ten"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                    rounded-lg focus:ring-blue-500 focus:border-blue-500 block
                                     w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                      dark:focus:ring-blue-500 mb-20 dark:focus:border-blue-500"
                  placeholder="Nhập tên nhân viên"
                  required
                  onChange={(e) => {
                    onChange(e);
                  }}
                />
                <p style={{ color: "red" }}>{errTen}</p>
              </div>
              <div className="mb-8" style={{ display: "block" }}>
                <label htmlFor="phone" className="block text-xl font-medium text-gray-900">
                  Chức vụ
                </label>
                <div className="flex">
                  <Select
                    placeholder="Chức vụ"
                    value={chucVu}
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
              </div>
              <div className="mb-8">
                <label htmlFor="phone" className="block pt-2 text-xl font-medium text-gray-900">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                    rounded-lg focus:ring-blue-500 focus:border-blue-500 block
                                     w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                      dark:focus:ring-blue-500 mb-20 dark:focus:border-blue-500"
                  placeholder="Email"
                  required
                  onChange={(e) => {
                    onChange(e);
                  }}
                />
                <p style={{ color: "red" }}>{errEmail}</p>
              </div>
              <div className="mb-8">
                <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                <label htmlFor="wards" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Chọn xã phường
                </label>
                <select
                  id="wards"
                  onChange={(e) => handleWardsChange(e.target.value)}
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
              <div className="mb-8">
                <label htmlFor="phone" className="block text-xl font-medium text-gray-900">
                  Ngày sinh
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                rounded-lg focus:ring-blue-500 focus:border-blue-500 block
                                 w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                  dark:focus:ring-blue-500 mb-20 dark:focus:border-blue-500"
                  type="date"
                  name="ngay_sinh"
                  value={parseDate(ngay_sinh) ? parseDate(ngay_sinh).toISOString().slice(0, 10) : ngay_sinh}
                  id="dateInput"
                  style={{
                    width: "100%",
                  }}
                  required
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
                  <img src="https://cdn-icons-png.flaticon.com/512/241/241521.png" className="h-6 w-6 absolute left-4 top-1/2 transform -translate-y-1/2" />
                  <span className="ml-8">Quét QR</span>
                </button>
                <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} style={{ position: "relative" }} className="">
                  <div>
                    <QrReader
                      onResult={(data) => {
                        if (data != undefined) {
                          handleOk();
                          console.log(data.text);
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
              <div className="mb-8 flex">
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
                    checked={gioi_tinh === "Nam"}
                    onChange={handleChange}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <FormControlLabel
                        value="Nam"
                        control={<Radio />}
                        label="Nam"
                        checked={gioi_tinh === "Nam"}
                        style={{ marginRight: "10px" }}
                        name="gioi_tinh"
                      />
                      <FormControlLabel value="Nữ" name="gioi_tinh" checked={gioi_tinh === "Nữ"} control={<Radio />} label="Nữ" />
                    </div>
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="mb-8">
                <label htmlFor="phone" className="block pt-14 text-xl font-medium text-gray-900">
                  Số điện thoại
                </label>
                <input
                  type="number"
                  name="sdt"
                  value={sdt}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                    rounded-lg focus:ring-blue-500 focus:border-blue-500 block
                                     w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                      dark:focus:ring-blue-500 mb-20  dark:focus:border-blue-500"
                  placeholder="Số điện thoại"
                  required
                  onChange={(e) => {
                    onChange(e);
                  }}
                />
                <p style={{ color: "red" }}>{errSdt}</p>
              </div>

              <div className="mb-6">
                <label htmlFor="District" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
              <div className="mb-8">
                <label htmlFor="phone" className="block mb-2 text-xl font-medium text-gray-900">
                  Số nhà/Ngõ/Đường
                </label>
                <input
                  type="text"
                  name="soNha"
                  value={soNha}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                rounded-lg focus:ring-blue-500 focus:border-blue-500 block
                                    w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                    dark:focus:ring-blue-500 mb-20 mt-4 dark:focus:border-blue-500"
                  placeholder="Số nhà/Ngõ/Đường"
                  required
                  onChange={(e) => {
                    onChange(e);
                  }}
                />
                <p style={{ color: "red" }}>{errSoNha}</p>
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link to="/quan-ly-tai-khoan/nhan-vien" type="button" className="text-sm rounded-md  font-semibold leading-6 text-gray-900">
                  Cancel
                </Link>

                <ButtonAnt
                  type="primary"
                  style={{
                    backgroundColor: "#1976d2",
                    marginBottom: "2px",
                  }}
                  onClick={handleAdd}
                >
                  Hoàn tất
                </ButtonAnt>
              </div>
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
            <span>Xác nhận thêm</span>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Bạn có chắc muốn thêm nhân viên này?</DialogContentText>
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
