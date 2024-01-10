/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import Logo from "../assets/logo.png";

import { Link, useNavigate, useParams } from "react-router-dom";

import "./Component.css";
import axios from "axios";
import { Button } from "antd";

export default function EnterPassword() {
  const { email } = useParams();
  const navigate = useNavigate();

  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  console.log(email);
  const handleLogin = async () => {
    if (pass.trim() == "" || pass == null) {
      setError("Bạn chưa nhập mật khẩu");
      return;
    }
    await axios
      .post("http://localhost:8080/user/login", {
        email: email,
        pass: pass,
      })
      .then((response) => {
        if (response.data === "FAILED") {
          setError("Mật khẩu không chính xác");
        } else {
          console.log(response.data);
          localStorage.setItem("user", response.data.ten);
          navigate("/");
        }
      });
  };
  return (
    <>
      <div className="main-sign-in main-enter-password flex justify-center">
        <div className="main-enter-password">
          <Link to="/" className="flex justify-center align-center container-logo ctnlogo-signUp">
            <img className="logo cursor-pointer" src={Logo} alt="" />
            <div className="flex justify-center">Jordan VTH</div>
          </Link>

          <form>
            <div className="sign-in-title mb-10">What's your password?</div>
            <div className="send-code">
              <span className="email-sended-code"> {email}</span>
              <a href="#" className="underline ml-2 inline-block font-normal sign-up-edit link-underline">
                Edit
              </a>
            </div>
            <div className="inputGroupCodeSignUp">
              <input
                type="password"
                required
                autocomplete="off"
                value={pass}
                onChange={(e) => {
                  setPass(e.target.value);
                  setError("");
                }}
              />
              <label for="Password">Password</label>
              <p className="text-red-400">{error}</p>
            </div>
            <a href="#" className="forgot-password underline link-underline text-small">
              Forgot password?
            </a>
            <div className="flex justify-end">
              <Button onClick={() => handleLogin()} className="inline-block enter-password-signIn-button main-sign-in-button">
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
