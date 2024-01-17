import { useState, useEffect } from "react";
import { Modal } from "antd";
import Header from "../layout/Header";
import InfoTop from "../layout/InfoTop";
import axios from "axios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DatePicker } from "antd";
import Footer from "../layout/Footer";
import { getProvinces, getDistricts, getWards } from "../api/Location";
import { Checkbox, Select, Switch } from "antd";
import { Accordion, AccordionItem, Avatar,Button } from "@nextui-org/react";

const { Option } = Select;
dayjs.extend(customParseFormat);

export default function Profile() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [idTP, setIdTP] = useState("");
  const [idHuyen, setIdHuyen] = useState("");
  const [idXa, setIdXa] = useState("");
  const [diaChiUser, setDiaChiUser] = useState("");
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  const [addressModalOpoen, setAddressModalOpoen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  const [user,setUser] = useState({});
  const [listDiaChi, setListDiaChi] = useState([]);
  const [valueTP, setValueTP] = useState([]);
  const [valueHuyen, setValueHuyen] = useState([]);
  const [valueXa, setValueXa] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [isOn, setIsOn] = useState(false);

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
  const getKhachHang = async () => {
    const result = await axios.get(`http://localhost:8080/khach-hang/findByMa/${JSON.parse(localStorage.getItem("user")).ma}`);
    const khachHangData = result.data;

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
    });
    setDiaChi((prevDiaChi) => ({
      ...prevDiaChi,
      id: khachHangData.id,
    }));
  };
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

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  },[]);

  const date = new Date(JSON.parse(localStorage.getItem("user")).ngaySinh);
  const formatter = new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
  const output =  formatter.format(date);

  // get dia chi khach hang 

  const getDiaChi = async () => {
    const result = await axios.get(`http://localhost:8080/dia-chi/findByMa/${JSON.parse(localStorage.getItem("user")).ma}`);
    setListDiaChi(result.data);
    console.log(JSON.parse(localStorage.getItem("user")).ma);
    console.log(result.data);
  };
  useEffect(() => {
    getDiaChi();
    getKhachHang();
  },[]);


  useEffect(() => {
    getProvinces().then((data) => {
      setProvinces(data);
    });
  }, []);
  useEffect(() => {
    const names = provinces.map((item) => item.name);
    setValueTP(names);
    const provinceCode = provinces.find((x) => x.name === khachHang.thanhPho)?.code || 1;
    getDistricts(provinceCode).then((data) => {
      setDistrict(data);
    });
    const valueH = district.map((item) => item.name);
    setValueHuyen(valueH);

    const districtCode = district.find((x) => x.name === khachHang.huyen)?.code || 1;
    getWards(districtCode).then((data) => {
      setWard(data);
    });
    const valueXa = ward.map((item) => item.name);
    setValueXa(valueXa);
  }, [provinces, district]);

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

  const showPasswordModal = () => {
    setPasswordModalOpen(true);
  };

  const showPhoneModal = () => {
    setPhoneModalOpen(true);
  };

  const showAddressModal = () => {
    setAddressModalOpoen(true);
  };

  const handlePasswordModalOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setPasswordModalOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handlePhoneModalOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setPhoneModalOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleAddressModalOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setAddressModalOpoen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleModalCancel = () => {
    console.log("Clicked cancel button");
    setPasswordModalOpen(false);
    setPhoneModalOpen(false);
    setAddressModalOpoen(false);
  };

  const onChangeDefaultAddress = (e) => {
    console.log(`checked = ${e.target.checked}`);
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
  return (
    <>
      <InfoTop />
      <Header />
      <div className="container p-10 flex justify-center">
        <div className="left w-full pr-[60px] border-r-[1px]">
          <div className="font-medium text-[20px]">Thông tin tài khoản</div>
          <div className="flex flex-col gap-3">
            <div className="inputGroupEmail">
              <input type="email" required autoComplete="off" />
              <label htmlFor="email">{user.email}</label>
            </div>

            <div>
              <div className="font-medium">Password</div>
              <div className="flex justify-between items-center">
                <span className="pt-2">{user.matKhau}</span>
                <button className="underline" onClick={showPasswordModal}>
                  Sửa
                </button>
                <Modal
                  title="Thay đổi mật khẩu"
                  visible={passwordModalOpen}
                  onOk={handlePasswordModalOk}
                  confirmLoading={confirmLoading}
                  onCancel={handleModalCancel}
                  okText="Lưu"
                  cancelText="Hủy"
                  okButtonProps={{
                    style: {
                      background: "#000",
                      borderColor: "transparent",
                    },
                  }}
                >
                  {/* Password change form inputs */}
                  <div className="inputGroupEmail">
                    <input
                      name="currentPassword"
                      type="password"
                      required
                      autoComplete="off"
                    />
                    <label htmlFor="currentPassword">Mật khẩu hiện tại*</label>
                  </div>
                  <div className="inputGroupEmail">
                    <input
                      name="newPassword"
                      type="password"
                      required
                      autoComplete="off"
                    />
                    <label htmlFor="newPassword">Mật khẩu mới*</label>
                  </div>
                  <div className="inputGroupEmail">
                    <input
                      name="confirmNewPassword"
                      type="password"
                      required
                      autoComplete="off"
                    />
                    <label htmlFor="confirmNewPassword">
                      Xác nhận mật khẩu mới*
                    </label>
                  </div>
                </Modal>
              </div>
            </div>

            <div>
              <div className="font-medium py-2">Số điện thoại</div>
              <div className="flex justify-between items-center">
                <div>
                  {user.sdt}
                </div>
                <button className="underline" onClick={showPhoneModal}>
                  Sửa
                </button>
                <Modal
                  title="Sửa số điện thoại"
                  visible={phoneModalOpen}
                  onOk={handlePhoneModalOk}
                  confirmLoading={confirmLoading}
                  onCancel={handleModalCancel}
                  okText="Lưu"
                  cancelText="Hủy"
                  okButtonProps={{
                    style: {
                      background: "#000",
                      borderColor: "transparent",
                    },
                  }}
                >
                  <div className="inputGroupCodeSignUp">
                    <input
                      name="diaChi"
                      type="text"
                      required
                      autoComplete="off"
                    />
                    <label htmlFor="diaChi">Số điện thoại</label>
                  </div>
                </Modal>
              </div>
            </div>

            <div className="pb-10 border-b-[2px]">
              <div className="font-medium py-2">Ngày sinh</div>
              <DatePicker
                className="w-1/2"
                defaultValue={dayjs(output, dateFormatList[0])}
                format={dateFormatList}
              />
            </div>

            <div className="flex justify-between items-center">
              <div className="font-medium py-2">Xóa tài khoản</div>
              <button className="main-sign-in-button px-3 text-sm py-1 bg-black text-white rounded-[20px]">
                Xóa
              </button>
            </div>
          </div>
        </div>
        <div className="right w-full pl-[50px]">
          <div className="font-medium text-[20px]">Địa chỉ</div>
          {listDiaChi.length == 0 ? (
            <div>
              <p className="text-sm py-3 opacity-80">
                Hiện tại bạn không lưu bất kỳ địa chỉ giao hàng nào. Thêm địa
                chỉ vào đây để điền trước nhằm thanh toán nhanh hơn.
              </p>
              <div className="flex justify-end items-center">
                <button
                  onClick={showAddressModal}
                  className="main-sign-in-button px-3 text-sm py-1 bg-black text-white rounded-[20px]"
                >
                  Thêm địa chỉ
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* load address data here */}
              <Accordion selectionMode="multiple">
            {listDiaChi.map((item, index) => (
              <AccordionItem
                key={index}
                aria-label="Địa chỉ 1"
                startContent={
                  <Avatar
                    isBordered
                    color="success"
                    radius="lg"
                    // src="https://img.freepik.com/premium-vector/pin-point-icon-with-red-map-location-pointer-symbol-isolated-white-background_120819-234.jpg"
                  />
                }
                subtitle="Xem chi tiết"
                title={"Địa chỉ " + (index + 1)}
              >
                <div>
                  <Select
                    placeholder="Thành phố"
                    onChange={(selectedValue) => handleChangeTP(selectedValue, index)}
                    value={item.thanhPho}
                    style={{ width: "20%", marginRight: "10px" }}
                  >
                    {options}
                  </Select>

                  <Select
                    placeholder="Thành phố"
                    onChange={(selectedValue) => handleChangeHuyen(selectedValue, index)}
                    value={item.huyen}
                    style={{ width: "21%", marginRight: "15px" }}
                  >
                    {optionHuyen}
                  </Select>

                  <Select
                    placeholder="Thành phố"
                    onChange={(selectedValue) => handleChangeXa(selectedValue, index)}
                    value={item.xa}
                    style={{ width: "23%", marginRight: "10px" }}
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
                    <Switch checked={item.trangThai === 1} onChange={() => handleSwitchChange(index)} className={`${isOn ? "bg-gray-800" : "bg-gray-800"}`} />
                    <div className="flex-grow" />
                    <Button
                      className="justify-end"
                      style={{
                        backgroundColor: "#1976d2",
                        color: "#fff",
                        marginBottom: "2px",
                        marginLeft: "auto",
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
          </Accordion>
              <button
                onClick={showAddressModal}
                className="main-sign-in-button px-3 text-sm py-1 bg-black text-white rounded-[20px]"
              >
                Thêm địa chỉ
              </button>
            </div>
          )}
          <Modal
            title="Thêm địa chỉ"
            visible={addressModalOpoen}
            onOk={handleAddressModalOk}
            confirmLoading={confirmLoading}
            onCancel={handleModalCancel}
            width={"560px"}
            okText="Lưu"
            cancelText="Hủy"
            okButtonProps={{
              style: {
                background: "#000",
                borderColor: "transparent",
              },
            }}
          >
            <div className="inputGroupCodeSignUp">
              <input name="hoTen" type="text" required autoComplete="off" />
              <label htmlFor="hoTen">Họ và tên</label>
            </div>

            <div className="inputGroupCodeSignUp">
              <input
                name="soDienThoai"
                type="number"
                required
                autoComplete="off"
              />
              <label htmlFor="soDienThoai">Số điện thoại</label>
            </div>

            <div className="inputGroupCodeSignUp">
              <input name="diaChi" type="text" required autoComplete="off" />
              <label htmlFor="diaChi">Địa chỉ</label>
            </div>

            <div className="flex gap-1 justify-between">
              <div className="mb-6">
                <select
                  name="thanhPho"
                  id="city"
                  className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => handleProvinceChange(e.target.value)}
                  required
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
                <select
                  id="District"
                  name="huyen"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => handleDistrictChange(e.target.value)}
                  required
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
                <select
                  name="xaPhuong"
                  id="wards"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  onChange={(e) => handleWardsChange(e.target.value)}
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

            <Checkbox onChange={onChangeDefaultAddress}>
              Đặt làm địa chỉ mặc định
            </Checkbox>
          </Modal>
        </div>
      </div>
      <div className="flex justify-center pb-10 items-center">
        <button className="main-sign-in-button px-10 py-2 bg-black text-white rounded-[20px]">
          Lưu thay đổi
        </button>
      </div>

      <Footer />
    </>
  );
}
