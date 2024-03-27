/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useCallback } from "react";
import Logo from "../assets/logo.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Component.css";
import axios from "axios";

export default function EnterPassword() {
  const { email } = useParams();
  const navigate = useNavigate();

  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleLogin = useCallback(async () => {
    if (pass.trim() === "" || pass === null) {
      setError("Bạn chưa nhập mật khẩu");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/user/login", {
        email: email,
        pass: pass,
      }, {
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer your_access.token.here'
        }
      });

      if (response.data === "FAILED") {
        setError("Mật khẩu không chính xác");
      } else {
        console.log(response.data);
        // if(response.data.ma.includes("NV")) {
        //   console.log("ê");
        //   localStorage.setItem("user", JSON.stringify(response.data));
        //   window.location.href = "http://localhost:5174/";
        // } else {
          localStorage.setItem("user", JSON.stringify(response.data));
          navigate("/");
        // }
      }
    } catch (error) {
      console.error("Error login:", error);
    }
  }, [pass, email, navigate]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        handleLogin();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleLogin]);

  return (
    <>
      <div className="main-sign-in main-enter-password flex justify-center">
        <div className="main-enter-password">
          <Link
            to="/"
            className="flex justify-center align-center container-logo ctnlogo-signUp"
          >
            <img className="logo cursor-pointer" src={Logo} alt="" />
            <div className="flex justify-center">Jordan VTH</div>
          </Link>

          <div className="sign-in-title mb-10">Nhập mật khẩu của bạn!</div>
          <div className="send-code">
            <span className="email-sended-code"> {email}</span>
            <a
              href="#"
              className="underline ml-2 inline-block font-normal sign-up-edit link-underline"
            >
              Thay đổi
            </a>
          </div>
          <div className="inputGroupCodeSignUp">
            <input
              type="password"
              required
              autoComplete="off"
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
                setError("");
              }}
            />
            <label htmlFor="Password">Mật khẩu</label>
            <p className="text-red-400">{error}</p>
          </div>
          <a
            href="#"
            className="forgot-password underline link-underline text-small"
          >
            Quên mật khẩu?
          </a>
          <div className="flex justify-end">
            <button
              onClick={() => handleLogin()}
              className="inline-block enter-password-signIn-button main-sign-in-button"
            >
              Đăng nhập
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
