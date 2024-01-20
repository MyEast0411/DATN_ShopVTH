import { useState } from "react";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import "./Component.css";
import axios from "axios";
import { Button, Form, Input, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    handleFormSubmit();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleFormSubmit = async () => {
    // console.log("Form submitted with email:", email);

    if (email) {
      setCheck(true);
      await axios
        .post("http://localhost:8080/user/check-mail", {
          email: email,
        })
        .then((response) => {
          setCheck(false);
          if (response.data == "NOT_FOUND") navigate(`/register/${email}`);
          else navigate(`/enter-password/${email}`);
        });
      //navigate("/register"); //trong trường hợp tài khoản không tồn tại
      //trong trường hợp tài khoản tồn tại
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

          <div className="sign-in-title mb-10">
            Nhập email của bạn để đăng nhập.
          </div>

          <Form
            name="basic"
            layout={"vertical"}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label={
                <span
                  style={{
                    color: "rgb(100, 100, 100)",

                    fontWeight: 500,
                    fontSize: 16,
                  }}
                >
                  Email của bạn
                </span>
              }
              style={{
                width: "100%",
                marginBottom: 20,
              }}
              name="ma"
              rules={[
                {
                  required: true,
                  message: <span className="mb-3">Không để trống mail</span>,
                },
                {
                  type: "email",
                  message: "Mời nhập đúng định dạng email",
                },
              ]}
            >
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  fontSize: "100%",
                  padding: "0.8em",
                  outline: "none",
                  marginBottom: 10,
                  border: "2px solid rgb(200, 200, 200)",
                  backgroundColor: "transparent",
                  borderRadius: "20px",
                  width: "100%",
                }}
              />
            </Form.Item>

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
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button
                  // onClick={() => handleRegister()}
                  // className="inline-block main-sign-up-button"
                  htmlType="submit"
                  style={{
                    padding: "12px 24px",
                    backgroundColor: "black",
                    color: "#fff",
                    borderRadius: "40px",
                    height: "auto",
                  }}
                >
                  {check ? (
                    <Spin
                      indicator={
                        <LoadingOutlined
                          style={{
                            fontSize: 24,
                          }}
                          spin
                        />
                      }
                    />
                  ) : (
                    "Tiếp tục"
                  )}
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
