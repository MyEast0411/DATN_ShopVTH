import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import "./Component.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted with email:", email);
    if (email) {
      navigate("/register"); //trong trường hợp tài khoản không tồn tại
      // navigate("/enter-password"); //trong trường hợp tài khoản tồn tại
    }
  };
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

          <form onSubmit={handleFormSubmit}>
            <div className="sign-in-title mb-10">
            Nhập email của bạn để đăng nhập.
            </div>
            <div className="inputGroupEmail">
              <input
                type="email"
                required
                autocomplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label for="email">Email</label>
            </div>
            <p className="policy">
            Bằng cách tiếp tục, tôi đồng ý với{" "}
              <a href="#" className="underline cursor-pointer">
              Chính sách bảo mật
              </a>{" "}
              và
              <a href="#" className="underline cursor-pointer">
                {" "}
                Điều khoản sử dụng{" "}
              </a>
              của Jordan VTH.
            </p>
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-block main-sign-in-button"
              >
                Tiếp tục
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
