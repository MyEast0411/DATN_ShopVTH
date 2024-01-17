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
import { Checkbox } from "antd";

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
  const [diaChi, setDiaChi] = useState({
    thanhPho: "",
    huyen: "",
    xa: "",
  });
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  const [addressModalOpoen, setAddressModalOpoen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

  // lay id tp
  useEffect(() => {
    const apiUrl =
      "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province";
    const token = "83b3ca14-88ad-11ee-a6e6-e60958111f48"; // Thay YOUR_TOKEN bằng token của bạn

    axios
      .get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Token: token,
        },
      })
      .then((response) => {
        const id_tp = response.data.data.find((item) =>
          diaChi.thanhPho.includes(item.ProvinceName)
        )?.ProvinceID;
        console.log(id_tp);
        setIdTP(id_tp);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [diaChi]);

  // lay id huyen theo api theo id tp
  useEffect(() => {
    const apiUrl =
      "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district";
    const token = "83b3ca14-88ad-11ee-a6e6-e60958111f48"; // Thay YOUR_TOKEN bằng token của bạn

    const requestData = {
      province_id: idTP,
    };

    axios
      .get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          // 'ShopId': shopId,
          Token: token,
        },
        params: requestData,
      })
      .then((response) => {
        const id_huyen = response.data.data.find(
          (item) => item.DistrictName === diaChi.huyen
        )?.DistrictID;
        setIdHuyen(id_huyen);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [diaChi]);

  // lay id xa theo api theo id huyen
  useEffect(() => {
    const apiUrl =
      "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id";
    const token = "83b3ca14-88ad-11ee-a6e6-e60958111f48"; // Thay YOUR_TOKEN bằng token của bạn

    const requestData = {
      district_id: idHuyen,
    };

    axios
      .post(apiUrl, requestData, {
        headers: {
          "Content-Type": "application/json",
          // 'ShopId': shopId,
          Token: token,
        },
      })
      .then((response) => {
        const id_xa = response.data.data.find(
          (item) => item.WardName === diaChi.xa
        )?.WardCode;
        setIdXa(id_xa);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [diaChi, idHuyen]);

  useEffect(() => {
    getProvinces().then((data) => {
      setProvinces(data);
    });
  }, []);

  const handleProvinceChange = (provinceCode) => {
    provinces.map((item) => {
      if (item.code == provinceCode) {
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
    districts.map((item) => {
      if (item.code == districtCode) {
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
        setDiaChi((prevDiaChi) => ({
          ...prevDiaChi,
          xa: item.name,
        }));
      }
    });
  };

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
              <label htmlFor="email">Email*</label>
            </div>

            <div>
              <div className="font-medium">Password</div>
              <div className="flex justify-between items-center">
                <span className="pt-2">••••••••••••••••</span>
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
                  --------------
                  {/* load phone number here */}
                  {/* 0379209871 */}
                </div>
                <button className="underline" onClick={showPhoneModal}>
                  Thêm
                </button>
                <Modal
                  title="Thêm số điện thoại"
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
                </Modal>
              </div>
            </div>

            <div className="pb-10 border-b-[2px]">
              <div className="font-medium py-2">Ngày sinh</div>
              <DatePicker
                className="w-1/2"
                defaultValue={dayjs("01/01/2015", dateFormatList[0])}
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
          {diaChiUser === "" ? (
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
