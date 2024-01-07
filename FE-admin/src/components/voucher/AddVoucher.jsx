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
  DatePicker,
  InputNumber,
} from "antd";
import TableAntd from "../../small-component/common/TableAntd";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
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
  console.log("voucherNew:", voucherNew);

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
    if (
      !voucherNew.code ||
      !voucherNew.ten ||
      !voucherNew.giaTriMax ||
      !voucherNew.giaTriMin ||
      !voucherNew.soLuong ||
      !voucherNew.ngayBatDau ||
      !voucherNew.ngayKetThuc ||
      voucherNew.giaTriMin > voucherNew.giaTriMax
      // !voucherNew.hinhAnhVoucher //Không cần nhất thiết phải thêm ảnh
    ) {
      // toast.error(`Giá trị tối thiểu đang lớn hơn giá trị tối đa!`, {
      //   position: "top-right",
      //   autoClose: 2000,
      // });
      return;
    }

    if (value === 2 && listKhachHang.length === 0) {
      toast.error(`Bạn chưa chọn user để áp dụng !!!`, {
        position: "top-right",
        autoClose: 2000,
      });
    } else {
      Modal.confirm({
        title: `Bạn có muốn thêm voucher không?`,
        okText: "Yes",
        okType: "danger",
        onOk: async () => {
          try {
            const response = await axios.post(url + `voucher/add-voucher`, {
              voucher: voucherNew,
              listKhachHang: listKhachHang,
            });

            toast.success(`Thêm thành công`, {
              position: "top-right",
              autoClose: 2000,
            });

            navigate("/giam-gia/voucher");
          } catch (error) {
            toast.error(`Thêm thất bại`, {
              position: "top-right",
              autoClose: 2000,
            });
          }
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
      <div className="w-full">
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
                  <div
                    className="border-r-4 text-center pt-5"
                    style={{
                      borderColor: "#61677A",
                    }}
                  >
                    <h1 className="font-medium text-2xl mb-14">Ảnh voucher</h1>
                    <div className="anh-dai-dien flex justify-center">
                      <div
                        className="relative cursor-pointer mb-10"
                        style={{
                          width: "263px",
                          height: "263px",
                          backgroundColor: "white",
                          borderRadius: "5px",
                          border: "1px dashed #ccc",
                        }}
                        ref={imgDivRef}
                        onClick={() => fileInputRef.current.click()}
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
                          <button>Tải ảnh</button>
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
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Tên phiếu giảm giá đang trống!",
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
                      name="max"
                      rules={[
                        {
                          required: true,
                          message: "Mã code phiếu giảm giá đang trống!",
                        },
                      ]}
                    >
                      <Input
                        value={voucherNew.code}
                        onChange={(e) => {
                          setVoucherNew({
                            ...voucherNew,
                            code: e.target.value,
                          });
                        }}
                      />
                    </Form.Item>
                  </div>
                  <p className="pb-2">Giá trị tối thiểu</p>
                  <Form.Item
                    name="giaTriMin"
                    rules={[
                      {
                        required: true,
                        message: "Giá trị tối thiểu đang trống!",
                      },
                      {
                        pattern: /^[0-9]*$/,
                        message: "Vui lòng nhập chỉ số!",
                      },
                      {
                        validator(_, value) {
                          const maxValue = 500000;
                          if (value > maxValue) {
                            return Promise.reject(
                              new Error(
                                `Giá trị tối thiểu không được vượt quá 500000 VNĐ!`
                              )
                            );
                          }

                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) =>
                        setVoucherNew({
                          ...voucherNew,
                          giaTriMin: checkData(e.target.value),
                        })
                      }
                      value={voucherNew.giaTriMax}
                    />
                  </Form.Item>
                  <p className="pb-2">Giá trị tối đa</p>
                  <Form.Item
                    name="giaTriMax"
                    rules={[
                      {
                        required: true,
                        message: "Giá trị tối đa đang trống!",
                      },
                      {
                        pattern: /^[0-9]*$/,
                        message: "Vui lòng nhập chỉ số!",
                      },
                      {
                        validator(_, value) {
                          const maxValue = 500000;
                          if (value > maxValue) {
                            return Promise.reject(
                              new Error(
                                `Giá trị tối đa không được vượt quá 500000 VNĐ!`
                              )
                            );
                          }

                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) =>
                        setVoucherNew({
                          ...voucherNew,
                          giaTriMax: checkData(e.target.value),
                        })
                      }
                      value={voucherNew.giaTriMax}
                    />
                  </Form.Item>
                </div>

                <div class="w-2/6 ">
                  {value === 1 ? (
                    <div className="mb-6">
                      <p className="pb-2">Số Lượng</p>
                      <Form.Item
                        name="soLuong"
                        rules={[
                          {
                            required: true,
                            message: "Số lượng đang trống!",
                          },
                          {
                            pattern: /^[0-9]*$/,
                            message: "Vui lòng nhập chỉ số!",
                          },
                          {
                            validator(_, value) {
                              const maxValue = 1000;
                              if (value > maxValue) {
                                return Promise.reject(
                                  new Error(
                                    `Số lượng không vượt quá 1 nghìn phiếu!`
                                  )
                                );
                              }

                              return Promise.resolve();
                            },
                          },
                        ]}
                      >
                        <Input
                          onChange={(e) =>
                            setVoucherNew({
                              ...voucherNew,
                              soLuong: checkData(e.target.value),
                            })
                          }
                          value={voucherNew.soLuong}
                        />
                      </Form.Item>
                    </div>
                  ) : null}

                  <p className="pb-2">Ngày</p>
                  <Form.Item
                    name="dateRange"
                    rules={[
                      {
                        // type: "object",
                        required: true,
                        message: "Vui lòng chọn khoảng ngày!",
                      },
                    ]}
                  >
                    <RangePicker
                      renderExtraFooter={() => "extra footer"}
                      showTime
                      onChange={onRangeChange}
                    />
                  </Form.Item>

                  <Form.Item {...tailFormItemLayout}>
                    <Button className="me-4" type="primary" danger>
                      Hủy
                    </Button>
                    <Button htmlType="submit" onClick={() => onHandleAdd()}>
                      Tạo
                    </Button>
                  </Form.Item>
                </div>
              </div>
            </Form>
          </div>
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
