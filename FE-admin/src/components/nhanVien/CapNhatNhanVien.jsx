import React, { useEffect, useRef, useState } from "react";
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
import { AiOutlinePlus, AiOutlineCamera } from "react-icons/ai";
import { Form, Link, useNavigate, useParams } from "react-router-dom";
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
import { useForm } from "antd/es/form/Form";
export default function CapNhatNhanVien() {
  const form = useForm();
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
  const [selectedProvince, setSelectedProvince] = useState("");
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = React.useState(false);
  const [listDiaChi, setListDiaChi] = useState([]);
  const [listChucVu, setListChucVu] = useState([]);
  const [idToDelete, setIdToDelete] = useState("");

  const [openComfirm, setOpenComfirm] = useState(false);

  const cancelComfirm = () => {
    setOpenComfirm(false);
  };
  const [indexDiaChi, setIndexDiaChi] = useState("");

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
    id: "",
    ma: "",
    ten: "",
    anhNguoiDung: "",
    gioiTinh: "",
    sdt: "",
    ngaySinh: "",
    email: "",
    chucVu: "Nhân viên",
    cccd: "",
    soNha: "",
    xa: "",
    huyen: "",
    thanhPho: "",
  });

  const { ma, ten, anhNguoiDung, gioiTinh, sdt, ngaySinh, email, chucVu, cccd, soNha, xa, huyen, thanhPho } = khachHang;

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
  const { maNV } = useParams();
  const getNhanVien = async () => {
    const result = await axios.get(
      `http://localhost:8080/nhan_vien/findByMa/${maNV}`
    );

    const khachHangData = result.data;
    console.log(khachHangData);

    const fullAddress = khachHangData.diaChi;
    const parts = fullAddress.split(',');

    const streetAddress = parts[0].trim(); // đường
    const village = parts[1].trim(); // xã
    const district = parts[2].trim(); // huyện
    const city = parts[3].trim(); // tp
    console.log(district);
    setBackgroundImage(khachHangData.anh);
    setKhachHang({
      id: khachHangData.id,
      ma: khachHangData.ma,
      ten: khachHangData.ten,
      anhNguoiDung: khachHangData.anh,
      gioiTinh: khachHangData.gioiTinh,
      sdt: khachHangData.sdt,
      ngaySinh: khachHangData.ngaySinh,
      email: khachHangData.email,
      chucVu: khachHangData.id_chuc_vu.ten,
      cccd: khachHangData.cccd,
      thanhPho: city,
      huyen: district,
      xa: village,
      soNha: streetAddress
    });
  };

  const setBackgroundImage = (url) => {
    imgDivRef.current.style.backgroundImage = `url(${url})`;
  };
  useEffect(() => {
    getNhanVien();
  }, []);

  const onChange = (e) => {
    setKhachHang({ ...khachHang, [e.target.name]: e.target.value });
  };

  const handleError = (error) => {
    console.error(error);
  };
  const handleChange = (event) => {
    console.log(event.target.value);
    setKhachHang({ ...khachHang, gioiTinh: event.target.value });
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
  useEffect(() => {
    if (khachHang.id != '') {
      const names = provinces.map((item) => item.province_name);
      setValueTP(names);

      const provinceCode = provinces.find((x) => x.province_name === khachHang.thanhPho)?.province_id;

      getDistricts(provinceCode).then((data) => {
        const valueH = data.results.map((item) => item.district_name);
        setValueHuyen(valueH);
        setDistrict(data.results);
      });

      const districtCode = district.find((x) => x.district_name === khachHang.huyen)?.district_id;
      getWards(districtCode).then((data) => {
        const valueXa = data.results.map((item) => item.ward_name);
        setValueXa(valueXa);
      });
    }
  }, [khachHang, district]);
  const handleChangeTP = (selectedValue) => {
    const updatedKhachHang = { ...khachHang };

    updatedKhachHang.thanhPho = selectedValue;

    setKhachHang(updatedKhachHang);
    const provinceCode = provinces.find((x) => x.province_name === selectedValue)?.province_id;

    getDistricts(provinceCode).then((data) => {
      const valueH = data.results.map((item) => item.district_name);
      setValueHuyen(valueH);
    });
  };

  const handleChangeHuyen = (selectedValue) => {
    const updatedKhachHang = { ...khachHang };

    updatedKhachHang.huyen = selectedValue;

    setKhachHang(updatedKhachHang);

    const districtCode = district.find((x) => x.district_name === selectedValue)?.district_id;
    getWards(districtCode).then((data) => {
      const valueXa = data.results.map((item) => item.ward_name);
      setValueXa(valueXa);
    });
  };

  const handleChangeXa = (selectedValue) => {
    const updatedKhachHang = { ...khachHang };

    updatedKhachHang.xa = selectedValue;

    setKhachHang(updatedKhachHang);
  };

  const handleDuongChange = (e, index) => {
    const { value } = e.target;
    const updatedListDiaChi = [...listDiaChi];
    updatedListDiaChi[index] = { ...updatedListDiaChi[index], duong: value };
    setListDiaChi(updatedListDiaChi);
  };

  const options = valueTP.map((name) => (
    <Option key={name} value={name}>
      {name}
    </Option>
  ));

  const optionHuyen = valueHuyen.map((name) => (
    <Option key={name} value={name}>
      {name}
    </Option>
  ));

  const optionXa = valueXa.map((name) => (
    <Option key={name} value={name}>
      {name}
    </Option>
  ));

  const onSubmit = async () => {
    console.log(khachHang);
    await axios
      .put("http://localhost:8080/nhan_vien/update", {
        id : khachHang.id,
        ma : khachHang.ma,
        ten : khachHang.ten,
        email : khachHang.email,
        ngaySinh : khachHang.ngaySinh,
        gioiTinh : khachHang.gioiTinh,
        diaChi : `${khachHang.soNha},${khachHang.xa},${khachHang.huyen},${khachHang.thanhPho}`,
        sdt : khachHang.sdt,
        anh : khachHang.anh,
        id_chuc_vu : listChucVu.find((x) => x.ten == khachHang.chucVu),
      })
      .then((response) => {
        toast.success(`🎉 Cập nhật thành công`);
        navigate("/quan-ly-tai-khoan/nhan-vien");
      })
      .catch((error) => {
        toast.error(`😢 Thêm thất bại`);
      });
    cancelAdd();
  };
  return (
    <>
      <div
        className="grid grid-cols-3 gap-4 m-5"
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
          <h1 className="absolute top-3">Thông tin nhân viên</h1>
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
        </div>
        <div className="col-span-2 m-10">
          {/* <Form form={form}> */}
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
              </div>
              <div className="mb-8">
                <Select
                  placeholder="Thành phố"
                  onChange={(selectedValue) =>
                    handleChangeTP(selectedValue)
                  }
                  value={thanhPho}
                  style={{ width: "100%", height: "40px", marginRight: "10px" }}
                  className="mb-16 mt-7"
                >
                  {options}
                </Select>
              </div>
              <div className="mb-6">
                <Select
                  placeholder="Xã"
                  onChange={(selectedValue) =>
                    handleChangeXa(selectedValue)
                  }
                  value={xa}
                  style={{ width: "100%", height: "40px", marginRight: "10px" }}
                  className="mb-16 mt-9"
                >
                  {optionXa}
                </Select>
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
                  name="ngaySinh"
                  value={formatDate(ngaySinh)}
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
                    checked={gioiTinh === "Nam"}
                    onChange={handleChange}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <FormControlLabel
                        value="Nam"
                        control={<Radio />}
                        label="Nam"
                        checked={gioiTinh === "Nam"}
                        style={{ marginRight: "10px" }}
                        name="gioiTinh"
                      />
                      <FormControlLabel value="Nữ" name="gioiTinh" checked={gioiTinh === "Nữ"} control={<Radio />} label="Nữ" />
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
              </div>

              <div className="mb-6">
                <Select
                  placeholder="Huyện"
                  onChange={(selectedValue) =>
                    handleChangeHuyen(selectedValue)
                  }
                  value={huyen}
                  style={{ width: "100%", height: "40px", marginRight: "15px" }}
                  className="mb-16 mt-7"
                >
                  {optionHuyen}
                </Select>
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
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link to="/quan-ly-tai-khoan/nhan-vien" type="button" className="text-sm rounded-md  font-semibold leading-6 text-gray-900">
                  Cancel
                </Link>

                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#1976d2",
                    marginBottom: "2px",
                  }}
                  onClick={handleAdd}
                >
                  Hoàn tất
                </Button>
              </div>
            </div>
          </div>
          {/* </Form> */}
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
            Bạn có chắc muốn sửa nhân viên này?
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
