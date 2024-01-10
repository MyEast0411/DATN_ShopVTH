import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Checkbox, user } from "@nextui-org/react";
import { Button } from "antd";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const { email } = useParams();
  const [userRegister, setUserRegister] = useState({
    email: email,
    pass: "",
    ma: "",
    hoTenDem: "",
    ten: "",
    ngaySinh: "",
    sdt: "",
  });

  const handleRegister = async () => {
    await axios.post("http://localhost:8080/user/register", userRegister).then((res) => {
      console.log(res.data);
      navigate(`/enter-password/${res.data.email}`);
    });
  };

  return (
    <>
      <div className="main-sign-in flex justify-center">
        <div>
          <Link to="/" className="flex justify-center align-center container-logo ctnlogo-signUp">
            <img className="logo cursor-pointer" src={Logo} alt="" />
            <div className="flex justify-center">Jordan VTH</div>
          </Link>

          <div className="sign-up-title mb-2">Bây giờ hãy biến bạn thành Thành viên Jordan VTH.</div>
          <div className="send-code">
            <span>
              Chúng tôi đã gửi mã tới
              <span className="email-sended-code"> {email}</span>
            </span>
            <a href="/sign-in" className="underline inline-block font-normal sign-up-edit link-underline">
              Thay đổi email
            </a>
          </div>
          <form>
            <div className="inputGroupCodeSignUp">
              <input
                type="text"
                required
                autocomplete="off"
                value={userRegister.ma}
                onChange={(e) => setUserRegister({ ...userRegister, ma: e.target.value })}
              />
              <label for="Code">Mã</label>
            </div>
            <div className="flex name-user justify-between">
              <div className="inputGroupCodeSignUp">
                <input
                  type="text"
                  required
                  autocomplete="off"
                  value={userRegister.ten}
                  onChange={(e) => setUserRegister({ ...userRegister, ten: e.target.value })}
                />
                <label for="First name">Tên</label>
              </div>
              <div className="inputGroupCodeSignUp">
                <input
                  type="text"
                  required
                  autocomplete="off"
                  value={userRegister.hoTenDem}
                  onChange={(e) =>
                    setUserRegister({
                      ...userRegister,
                      hoTenDem: e.target.value,
                    })
                  }
                />
                <label for="Last name">Họ, đệm</label>
              </div>
            </div>
            <div className="inputGroupCodeSignUp">
              <input
                type="password"
                required
                autocomplete="off"
                value={userRegister.pass}
                onChange={(e) => setUserRegister({ ...userRegister, pass: e.target.value })}
              />
              <label for="Password">Mật khẩu</label>
            </div>
            <div className="inputGroupNoMove mt-8">
              <input
                type="date"
                required
                autocomplete="off"
                value={userRegister.ngaySinh}
                onChange={(e) => setUserRegister({ ...userRegister, ngaySinh: e.target.value })}
              />
              <label for="Ngày sinh">Ngày sinh</label>
            </div>
            <div className="inputGroupNoMove mt-8">
              <input required autocomplete="off" value={userRegister.sdt} onChange={(e) => setUserRegister({ ...userRegister, sdt: e.target.value })} />
              <label for="Ngày sinh">Số điện thoại</label>
            </div>

            <div className="agree-sign-up">
              <Checkbox defaultSelected={false} radius="md" className="font-normal" color="default" required>
                Đăng ký email để nhận thông tin cập nhật từ Jordan VTH về sản phẩm, ưu đãi và lợi ích Thành viên của bạn.
              </Checkbox>
              <Checkbox defaultSelected={false} radius="md" className="font-normal" color="default" required>
                Chúng tôi đồng ý với{" "}
                <a href="#" className="link-underline underline">
                  Điều khoản
                </a>{" "}
                và{" "}
                <a href="#" className="link-underline underline">
                  Chính sách bảo mật{" "}
                </a>
                của Jordan VTH.
              </Checkbox>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => handleRegister()} className="inline-block main-sign-up-button">
                Tạo tài khoản
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
