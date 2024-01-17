import { useEffect, useState } from "react";
import { Modal } from "antd";
import Header from "../layout/Header";
import InfoTop from "../layout/InfoTop";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DatePicker } from "antd";
dayjs.extend(customParseFormat);

export default function Profile() {
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  const [ngaySinh, setNgaySinh] = useState("2023-12-31T17:00:00.000+00:00");
  const [user,setUser] = useState({});
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  },[]);
  console.log(user);
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  console.log(formatDate(new Date(ngaySinh)));
  const showPasswordModal = () => {
    setPasswordModalOpen(true);
  };

  const showPhoneModal = () => {
    setPhoneModalOpen(true);
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

  const handleModalCancel = () => {
    console.log("Clicked cancel button");
    setPasswordModalOpen(false);
    setPhoneModalOpen(false);
  };

  return (
    <>
      <InfoTop />
      <Header />
      <div className="container max-w-[600px] p-10">
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
                {/* Phone number input */}
                <div className="inputGroupEmail">
                  <input
                    name="phoneNumber"
                    type="number"
                    required
                    autoComplete="off"
                  />
                  <label htmlFor="phoneNumber">Nhập số điện thoại</label>
                </div>
              </Modal>
            </div>
          </div>

          <div className="pb-10 border-b-[2px]">
            <div className="font-medium py-2">Ngày sinh</div>
            <DatePicker
              className="w-1/2"
              defaultValue={dayjs("15-01-2003", dateFormatList[0])}
              format={dateFormatList}
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="font-medium py-2"></div>
            <button className="main-sign-in-button px-7 py-1 bg-black text-white rounded-[20px]">
              Hoàn tất
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
