import React, { useState, useEffect, useRef } from "react";
import "./common/style.css";
import FilterDatePicker from "../../small-component/FilterKhuyenMai/FilterDate";
import {
  Button,
  Radio,
  Image,
  Modal,
  Form,
  Upload,
  Avatar,
  Input,
  Typography,
} from "antd";
import TableAntd from "../../small-component/common/TableAntd";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

import { format, parseISO } from "date-fns";
import moment from "moment";

export default function AddVoucher() {
  const url = "http://localhost:8080/";

  const [value, setValue] = useState(1);
  const [giaTri, setGiaTri] = useState("");
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);
  const [anh, setAnh] = useState("");

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
    console.log(value);
    console.log(listKhachHang.length);
    if (e.target.value === 2) {
      setListKhachHang([]);
    }
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  useEffect(() => {
    getDataKhachHang();
  }, []);

  const [listKhachHang, setListKhachHang] = useState([]);
  const [dataKhachHang, setDataKhachHang] = useState([]);
  const [voucherNew, setVoucherNew] = useState({
    code: "",
    ten: "",
    giaTriMax: "",
    giaTriMin: "",
    soLuong: "",
    ngayBatDau: "",
    ngayKetThuc: "",
    hinhAnhVoucher: "",
    deleted: 0,
    trangThai: 0,
  });

  const normFile = (e) => {
    console.log("Upload event:", e.thumbUrl);
    setAnh(e.thumbUrl);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(selectedRows);
      setListKhachHang(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      ma: record.ma,
    }),
  };

  const onFinish = (values) => {
    console.log(values);
  };

  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      const ngayBD = moment(dateStrings[0], "YYYY-MM-DD HH:mm:ss");
      const ngayKT = moment(dateStrings[1], "YYYY-MM-DD HH:mm:ss");
      const newFormatNgayBD = ngayBD.format("YYYY-MM-DDTHH:mm");
      const newFormatNgayKT = ngayKT.format("YYYY-MM-DDTHH:mm");
      setVoucherNew({
        ...voucherNew,
        ngayBatDau: new Date(newFormatNgayBD).toISOString(),
        ngayKetThuc: new Date(newFormatNgayKT).toISOString(),
      });
    } else {
      console.log("Clear");
    }
  };

  const checkData = (input) => {
    const reg = /^-?\d*(\.\d*)?$/;
    if (/^-?\d*(\.\d*)?$/.test(input) || input === "" || input === "-") {
      return input;
    }
  };

  const fileInputRef = useRef(null);
  const imgDivRef = useRef(null);
  const imgLink = "https://i.ibb.co/TKQqYvT/";
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log(file.name);
        const imageUrl = e.target.result;
        setVoucherNew({ ...voucherNew, hinhAnhVoucher: file.name });
        console.log(voucherNew);
        imgDivRef.current.style.backgroundImage = `url(${imageUrl})`;
        imgDivRef.current.style.backgroundSize = "cover";
      };
      reader.readAsDataURL(file);
    }
  };

  // add data
  const onHandleAdd = async () => {
    console.log(value, listKhachHang.length);
    if (value === 2 && listKhachHang.length == 0) {
      toast.error(`Bạn chưa chọn user để áp dung !!!`, {
        position: "top-right",
        autoClose: 2000,
      });
      // return;
    } else {
      // const listDataService =
      Modal.confirm({
        title: `bạn có muốn thêm voucher không ?`,
        okText: "Yes",
        okType: "danger",
        onOk: async () => {
          await axios
            .post(url + `voucher/add-voucher`, {
              voucher: voucherNew,
              listKhachHang: listKhachHang,
            })
            .then((response) => {
              toast.success(`Thêm thành công`, {
                position: "top-right",
                autoClose: 2000,
              });
              navigate("/giam-gia/voucher");
            })
            .catch((e) =>
              toast.error(`Thêm  thất bại`, {
                position: "top-right",
                autoClose: 2000,
              })
            );
        },
      });
    }
  };

  // get data user from service
  const getDataKhachHang = async () => {
    await axios
      .get(url + "khach-hang/getAll")
      .then((response) => {
        console.log(response.data);
        setDataKhachHang(
          response.data.map((data, index) => {
            return {
              ...data,
              key: index + 1,
            };
          })
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {/* <div className="grid grid-cols-10 gap-5">
        <div className="col-span-2">
          <form className="bg-slate-500 rounded">
            <h2 className="text-xl mb-10 font-bold text-gray-800">
              Thêm voucher
            </h2>
            <div className="grid gap-6 mb-6 md:grid-cols-1">
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Code voucher
                </label>
                <input
                  type="text"
                  name="code"
                  value={voucherNew.code}
                  onChange={(e) => {
                    setVoucherNew({ ...voucherNew, code: e.target.value });
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nhập code voucher"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Tên voucher
                </label>
                <input
                  type="text"
                  name="ten"
                  value={voucherNew.ten}
                  onChange={(e) => {
                    setVoucherNew({ ...voucherNew, ten: e.target.value });
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nhập tên khuyến mại"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Giá trị tối thiểu
                </label>
                <input
                  type="text"
                  name="giaTriMin"
                  value={voucherNew.giaTriMin}
                  onChange={(e) => {
                    setVoucherNew({
                      ...voucherNew,
                      giaTriMin: e.target.value,
                    });
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nhập giá trị tối thiểu"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Giá trị tối đa
                </label>
                <input
                  type="text"
                  name="giaTriMax"
                  value={voucherNew.giaTriMax}
                  onChange={(e) => {
                    setVoucherNew({ ...voucherNew, giaTriMax: e.target.value });
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nhập giá trị tối đa"
                  required
                />
              </div>
              {value === 1 ? (
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Số lượng
                  </label>
                  <input
                    type="text"
                    name="soLuong"
                    value={voucherNew.soLuong}
                    disabled={check}
                    onChange={(e) => {
                      setVoucherNew({
                        ...voucherNew,
                        soLuong:
                          value == 1 && listKhachHang.length != 0
                            ? listKhachHang.length
                            : e.target.value,
                      });
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nhập số lượng"
                    required
                  />
                </div>
              ) : (
                ""
              )}

              <label
                htmlFor="phone"
                className="block -mb-4 mt-1 text-sm font-medium text-gray-900"
              >
                Ngày bắt đầu
              </label>
              <input
                type="datetime-local"
                name="ngayBatDau"
                // onChange={handleNgayBatDauChange}
                required
                onChange={(e) => {
                  setVoucherNew({ ...voucherNew, ngayBatDau: e.target.value });
                }}
                // min={minDate}
                value={voucherNew.ngayBatDau}
                style={{
                  width: "100%",
                  padding: "2px 5px",
                  border: "1.5px solid #e1e1e1",
                  borderRadius: "5px",
                }}
              />

              <label
                htmlFor="phone"
                className="block -mb-4 mt-1 text-sm font-medium text-gray-900"
              >
                Ngày kết thúc
              </label>
              <input
                // value={ngayKetThuc}
                type="datetime-local"
                name="ngayKetThuc"
                onChange={(e) => {
                  setVoucherNew({ ...voucherNew, ngayKetThuc: e.target.value });
                }}
                // min={minDate}
                value={voucherNew.ngayKetThuc}
                // onChange={handleNgayKetThucChange}
                required
                // min={selectedStartDate} // Set the minimum date based on selected start date
                style={{
                  width: "100%",
                  padding: "2px 5px",
                  border: "1.5px solid #e1e1e1",
                  borderRadius: "5px",
                }}
              />
            </div>
            <div className="flex justify-center">
              <Button
                type="submit"
                style={{
                  backgroundColor: "#1976d2",
                  marginBottom: "2px",
                }}
                onClick={() => onHandleAdd()}
              >
                Thêm
              </Button>
            </div>

            <div className="flex">
              <div className="w-1/3"></div>
              <div className="w-2/3">

              </div>
            </div>
          </form>
        </div>
        {/* <div className="col-span-1"></div> */}
      {/* <div
          className=" col-span-7"
          // className="pl-5 border-l-[2px] col-span-6 "
          style={{
            borderColor: "#ccc",
            // height: "80%",
          }}
        >
          <div className="row mb-5">
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={1}>Tất cả hệ thống</Radio>
              <Radio value={2}>Chọn user</Radio>
            </Radio.Group>
          </div>
          {value === 2 ? (
            <>
              <h2
                className="text-xl mb-1 font-bold text-gray-800"
                style={{ backgroundColor: "#f1f1f1" }}
              >
                Danh sách khách hàng
              </h2>
              <div className="">
                <TableAntd
                  rowSelection={{
                    type: "checkbox",
                    ...rowSelection,
                  }}
                  columns={columns}
                  dataSource={dataKhachHang}
                  size={4}
                />
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div> */}
      <h2 class="mb-5 font-bold text-2xl">Tạo phiếu giảm giá</h2>

      <div
        className="user ms-4 mb-4"
        style={{
          backgroundColor: "white",
          padding: 15,
          borderRadius: 8,
          width: "100%",
          boxShadow: "rgba(0, 0, 0, 0.2) 0px 2px 10px",
          transition: "transform 0.2s ease 0s",
        }}
      >
        <p className="mb-3 ms-2 text-xl">Tùy Chọn</p>
        <hr
          style={{
            marginBottom: 30,
            color: "black",
            width: 110,
            height: 6,
            backgroundColor: "black",
          }}
        />
        <Radio.Group onChange={onChange} value={value}>
          <Radio value={1}>Tất cả hệ thống</Radio>
          <Radio value={2}>Chọn khách hàng áp dụng</Radio>
        </Radio.Group>
        {value === 2 ? (
          <TableAntd
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            columns={columns}
            dataSource={dataKhachHang}
            size={3}
          />
        ) : (
          ""
        )}
      </div>

      <div
        className="form-add ms-4 "
        style={{
          backgroundColor: "white",
          padding: 15,
          borderRadius: 8,
          width: "100%",
          boxShadow: "rgba(0, 0, 0, 0.2) 0px 2px 10px",
          transition: "transform 0.2s ease 0s",
        }}
      >
        <p className="mb-3 ms-2 text-xl" id="tai">
          Thông tin khởi tạo
        </p>
        <hr
          id="vien"
          style={{
            marginBottom: 30,
            color: "black",
            width: 200,
            height: 6,
            backgroundColor: "black",
          }}
        />
        <div className="form">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <div class="flex space-x-5 space-y-5">
              <div class="w-2/6">
                {/* <div
                  className="h-80 justify-items-center"
                  style={{
                    marginTop: 40,
                    marginLeft: 80,
                  }}
                >
                  <Avatar
                    shape="square"
                    size={200}
                    icon={<UserOutlined />}
                    // className="justify-center"
                  />
                </div>
                <div className="">
                  <Form.Item
                    name="upload"
                    label="Upload"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    // extra="longgggggggggggggggggggggggggggggggggg"
                  >
                    <Upload name="logo" action="/upload.do" listType="picture">
                      <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                  </Form.Item>
                </div> */}
                <div
                  className="border-r-4 text-center pt-5"
                  style={{
                    borderColor: "#61677A",
                  }}
                >
                  <h1 className="font-medium text-2xl mb-14">Ảnh voucher</h1>
                  <div className="anh-dai-dien flex justify-center">
                    <div
                      className="relative cursor-pointer"
                      style={{
                        width: "400px",
                        height: "200px",
                        backgroundColor: "white",
                        borderRadius: "5px",
                        border: "1px dashed #ccc",
                      }}
                      ref={imgDivRef}
                    >
                      <span
                        className="absolute text-4xl"
                        style={{ top: "40%", left: "47%" }}
                      >
                        +
                      </span>
                      <div
                        className="absolute"
                        style={{ top: "54%", left: "42%" }}
                      >
                        <button onClick={() => fileInputRef.current.click()}>
                          Tải ảnh
                        </button>
                      </div>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                    ref={fileInputRef}
                  />
                </div>
              </div>
              <div class="w-2/6 ">
                <div>
                  <p className="pb-2">Tên phiếu giảm giá</p>
                  <Form.Item
                    // label="Tên phiếu giảm giá"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input
                      value={voucherNew.ten}
                      onChange={(e) => {
                        setVoucherNew({ ...voucherNew, ten: e.target.value });
                      }}
                    />
                  </Form.Item>
                </div>

                <div>
                  <p className="pb-2">Code</p>
                  <Form.Item
                    // label="Giá trị tối đa"
                    name="max"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input
                      value={voucherNew.code}
                      onChange={(e) => {
                        setVoucherNew({ ...voucherNew, code: e.target.value });
                      }}
                    />
                  </Form.Item>
                </div>

                <div className="mb-6">
                  <p className="pb-2">Giá trị tối đa</p>
                  <Input
                    name="giaTriMax"
                    onChange={(e) =>
                      setVoucherNew({
                        ...voucherNew,
                        giaTriMax: checkData(e.target.value),
                      })
                    }
                    value={voucherNew.giaTriMax}
                  />
                </div>

                <div className="mb-6">
                  <p className="pb-2">Giá trị tối thiểu</p>
                  <Input
                    name="giaTriMin"
                    onChange={(e) =>
                      setVoucherNew({
                        ...voucherNew,
                        giaTriMin: e.target.value,
                      })
                    }
                    value={voucherNew.giaTriMin}
                  />
                </div>
              </div>

              <div class="w-2/6 ">
                {value === 1 ? (
                  <div className="mb-6">
                    <p className="pb-2">Số Lượng</p>
                    <Input
                      value={voucherNew.soLuong}
                      onChange={(e) =>
                        setVoucherNew({
                          ...voucherNew,
                          soLuong:
                            value == 1 && listKhachHang.length != 0
                              ? listKhachHang.length
                              : e.target.value,
                        })
                      }
                      name="soLuong"
                      // // onChange={(e) => {
                      // //   setVoucherNew({
                      // //     ...voucherNew,
                      // //     soLuong: e.target.value,
                      // //   });
                      // // }}
                    />
                  </div>
                ) : (
                  ""
                )}

                <div className="mb-6">
                  <p className="pb-2">Ngày</p>
                  <RangePicker
                    renderExtraFooter={() => "extra footer"}
                    showTime
                    onChange={onRangeChange}
                  />
                </div>

                <Form.Item {...tailFormItemLayout}>
                  <Button className="me-4" type="primary" danger>
                    Cancel
                  </Button>
                  <Button htmlType="submit" onClick={() => onHandleAdd()}>
                    Register
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

const columns = [
  {
    title: "Mã Khách Hàng",
    dataIndex: "ma",
    key: "ma",
    width: "20%",
  },
  {
    title: "Avatar",
    dataIndex: "anhNguoiDung",
    key: "anhNguoiDung",
    render: (text) => <Image width={70} height={100} src={text} />,
  },
  {
    title: "Tên Khách Hàng",
    dataIndex: "ten",
    key: "ten",
  },
  {
    title: "SDT",
    dataIndex: "sdt",
    key: "sdt",
  },
  {
    title: "Giới Tính",
    dataIndex: "gioiTinh",
    key: "gioiTinh",
  },
];
