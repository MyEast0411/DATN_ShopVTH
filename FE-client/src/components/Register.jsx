// import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { Checkbox } from "@nextui-org/react";

export default function Register() {
  return (
    <>
      <div className="main-sign-in flex justify-center">
        <div>
          <Link
            to="/"
            className="flex justify-center align-center container-logo ctnlogo-signUp"
          >
            <img className="logo cursor-pointer" src={Logo} alt="" />
            <div className="flex justify-center">Jordan VTH</div>
          </Link>

          <div className="sign-up-title mb-2">
            Bây giờ hãy biến bạn thành Thành viên Jordan VTH.
          </div>
          <div className="send-code">
            <span>
              Chúng tôi đã gửi mã tới
              <span className="email-sended-code">
                {" "}
                nguyenvanhoi2k3@gmail.com
              </span>
            </span>
            <a
              href="/sign-in"
              className="underline inline-block font-normal sign-up-edit link-underline"
            >
              Thay đổi email
            </a>
          </div>
          <form>
            <div className="inputGroupCodeSignUp">
              <input type="text" required autoComplete="off" />
              <label htmlFor="Code">Mã</label>
            </div>
            <div className="flex name-user justify-between">
              <div className="inputGroupCodeSignUp">
                <input type="text" required autoComplete="off" />
                <label htmlFor="First name">Tên</label>
              </div>
              <div className="inputGroupCodeSignUp">
                <input type="text" required autoComplete="off" />
                <label htmlFor="Last name">Họ, đệm</label>
              </div>
            </div>
            <div className="inputGroupCodeSignUp">
              <input type="password" required autoComplete="off" />
              <label htmlFor="Password">Mật khẩu</label>
            </div>
            <div className="inputGroupNoMove mt-8">
              <input type="date" required autoComplete="off" />
              <label htmlFor="Ngày sinh">Ngày sinh</label>
            </div>

            <div className="agree-sign-up">
              <Checkbox
                defaultSelected={false}
                radius="md"
                className="font-normal"
                color="default"
                required
              >
                Đăng ký email để nhận thông tin cập nhật từ Jordan VTH về sản
                phẩm, ưu đãi và lợi ích Thành viên của bạn.
              </Checkbox>
              <Checkbox
                defaultSelected={false}
                radius="md"
                className="font-normal"
                color="default"
                required
              >
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
              <button
                type="submit"
                className="inline-block main-sign-up-button"
              >
                Tạo tài khoản
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
