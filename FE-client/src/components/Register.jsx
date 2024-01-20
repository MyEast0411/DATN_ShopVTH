import { useState } from "react";
import Logo from "../assets/logo.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Checkbox } from "@nextui-org/react";
import axios from "axios";
import { Button, DatePicker, Form, Input } from "antd";
export default function Register() {
  const navigate = useNavigate();

  const onFinish = (values) => {
    handleRegister();
  };
  const onFinishFailed = (errorInfo) => {
    console.log(userRegister);
    console.log("Failed:", errorInfo);
  };

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
    console.log(userRegister);
    await axios
      .post("http://localhost:8080/user/register", userRegister)
      .then((res) => {
        console.log(res.data);
        navigate(`/enter-password/${res.data.email}`);
      });
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

          <div className="sign-up-title mb-2">
            Bây giờ hãy biến bạn thành Thành viên Jordan VTH.
          </div>
          <div className="send-code mb-3">
            <span>
              Chúng tôi đã gửi mã tới
              <span className="email-sended-code"> {email}</span>
            </span>
            <a
              href="/sign-in"
              className="underline inline-block font-normal sign-up-edit link-underline"
            >
              Thay đổi email
            </a>
          </div>

          {/* <div className="inputGroupCodeSignUp">
            <input
              type="text"
              required
              autoComplete="off"
              value={userRegister.ma}
              onChange={(e) =>
                setUserRegister({ ...userRegister, ma: e.target.value })
              }
            />

            <label htmlFor="Code">Mã</label>
          </div>
          <span className="text-red-400">{err.ma}</span>
          <div className="flex name-user justify-between">
            <div className="inputGroupCodeSignUp">
              <input
                type="text"
                required
                autoComplete="off"
                value={userRegister.ten}
                onChange={(e) =>
                  setUserRegister({ ...userRegister, ten: e.target.value })
                }
              />
              <label htmlFor="First name">Tên</label>
            </div>
            <span className="text-red-400">{err.ten}</span>

            <div className="inputGroupCodeSignUp">
              <input
                type="text"
                required
                autoComplete="off"
                value={userRegister.hoTenDem}
                onChange={(e) =>
                  setUserRegister({
                    ...userRegister,
                    hoTenDem: e.target.value,
                  })
                }
              />
              <label htmlFor="Last name">Họ, đệm</label>
            </div>
            <span className="text-red-400">{err.hoTenDem}</span>
          </div>
          <div className="inputGroupCodeSignUp">
            <input
              type="password"
              required
              autoComplete="off"
              value={userRegister.pass}
              onChange={(e) =>
                setUserRegister({ ...userRegister, pass: e.target.value })
              }
            />
            <label htmlFor="Password">Mật khẩu</label>
          </div>
          <span className="text-red-400">{err.pass}</span>
          <div className="inputGroupNoMove mt-8">
            <input
              type="date"
              required
              autoComplete="off"
              value={userRegister.ngaySinh}
              onChange={(e) =>
                setUserRegister({ ...userRegister, ngaySinh: e.target.value })
              }
            />
            <label htmlFor="Ngày sinh">Ngày sinh</label>
          </div>
          <div className="inputGroupNoMove mt-8">
            <input
              required
              autoComplete="off"
              value={userRegister.sdt}
              onChange={(e) =>
                setUserRegister({ ...userRegister, sdt: e.target.value })
              }
            />
            <label htmlFor="Ngày sinh">Số điện thoại</label>
          </div> */}

          <Form
            name="basic"
            layout={"vertical"}
            // labelCol={{
            //   span: 8,
            // }}
            // wrapperCol={{
            //   span: 16,
            // }}
            // style={{
            //   maxWidth: 600,
            // }}
            // initialValues={{
            //   remember: true,
            // }}
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
                  Mã
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
                  message: <span className="mb-3">Không để trống mã</span>,
                },
              ]}
            >
              <Input
                value={userRegister.ma}
                onChange={(e) =>
                  setUserRegister({ ...userRegister, ma: e.target.value })
                }
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
            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                label={
                  <span
                    style={{ color: "black", fontWeight: 500, fontSize: 16 }}
                  >
                    Tên
                  </span>
                }
                style={{
                  width: "100%",
                }}
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Mời nhập  tên ",
                  },
                ]}
              >
                <Input
                  value={userRegister.ten}
                  onChange={(e) =>
                    setUserRegister({ ...userRegister, ten: e.target.value })
                  }
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

              <Form.Item
                label={
                  <span
                    style={{ color: "black", fontWeight: 500, fontSize: 16 }}
                  >
                    Họ Tên Đệm
                  </span>
                }
                style={{
                  width: "100%",
                }}
                name="hoTenDem"
                rules={[
                  {
                    required: true,
                    message: "Mời nhập họ tên đệm",
                  },
                ]}
              >
                <Input
                  value={userRegister.hoTenDem}
                  onChange={(e) =>
                    setUserRegister({
                      ...userRegister,
                      hoTenDem: e.target.value,
                    })
                  }
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
            </div>

            <Form.Item
              label={
                <span style={{ color: "black", fontWeight: 500, fontSize: 16 }}>
                  Số điện thoại
                </span>
              }
              style={{
                width: "100%",
              }}
              name="sdt"
              rules={[
                {
                  required: true,
                  message: "Mời nhập số ddienj thoại",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const phoneRegex = /^[0-9]{10}$/;
                    if (!value || phoneRegex.test(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Số điện thoại không đúng định dạng")
                    );
                  },
                }),
              ]}
            >
              <Input
                value={userRegister.sdt}
                onChange={(e) =>
                  setUserRegister({ ...userRegister, sdt: e.target.value })
                }
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

            <Form.Item
              label={
                <span style={{ color: "black", fontWeight: 500, fontSize: 16 }}>
                  Mật Khẩu
                </span>
              }
              style={{
                width: "100%",
              }}
              name="pass"
              rules={[
                {
                  required: true,
                  message: "Mời nhập mật khẩu",
                },
              ]}
            >
              <Input.Password
                value={userRegister.ngaySinh}
                onChange={(e) =>
                  setUserRegister({ ...userRegister, pass: e.target.value })
                }
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

            <Form.Item
              label={
                <span style={{ color: "black", fontWeight: 500, fontSize: 16 }}>
                  Ngày Sinh
                </span>
              }
              name="ngaysinh"
              rules={[
                {
                  required: true,
                  message: "Mời nhập ngày sinh!",
                },
              ]}
            >
              <DatePicker
                value={userRegister.ngaySinh}
                onChange={(date, dateString) => {
                  console.log(date, dateString);
                  setUserRegister({
                    ...userRegister,
                    ngaySinh: dateString,
                  });
                }}
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
                  Tạo tài khoản
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
