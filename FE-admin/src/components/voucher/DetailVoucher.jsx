import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { Tag, Table, Space, Modal, Input, InputNumber, Form } from "antd";
import { Button } from "@material-tailwind/react";
import moment from "moment/moment";
import TableKhachHang from "./TableKhachHang";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Link } from "react-router-dom";
import { TbInfoTriangle } from "react-icons/tb";
import { toast } from "react-toastify";
import { useForm } from "antd/es/form/Form";
export default function DetailVoucher() {
  const { id } = useParams();
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [voucherDetail, setVoucherDetail] = useState({});
  const [modalHD, setModalHD] = useState(false);
  const [trangThai, setTrangThai] = useState(false);
  const [data, setData] = useState([]);
  const [dataKhachHang, setDataKhachHang] = useState([]);
  const [dataHoaDon, setDataHoaDon] = useState([]);
  const [modalThemKachHang, setModalThemKhachHang] = useState(false);
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState({
    id: "",
    ma: "",
    ten: "",
    code: "",
    trangThai: "",
    giaTriMax: "",
    giaTriMin: "",
    soLuong: "",
    loai: ""
  });
  useEffect(() => {
    const getData = async () => {
      const res = await axios
        .get(`http://localhost:8080/voucher/getVoucher/${id}`)
        .then((response) => {
          console.log(response.data);
          setInitialValues({
            id: response.data.id,
            ma: response.data.ma,
            ten: response.data.ten,
            code: response.data.code,
            trangThai: response.data.trangThai,
            giaTriMax: Intl.NumberFormat().format(response.data.giaTriMax),
            giaTriMin: Intl.NumberFormat().format(response.data.giaTriMin),
            soLuong: response.data.soLuong,
            loai: response.data.loai,
          })
          const nbd = moment(new Date(response.data.ngayBatDau)).format(
            "  HH:mm:ss   , DD-MM-YYYY"
          );
          const nkt = moment(new Date(response.data.ngayKetThuc)).format(
            "  HH:mm:ss   , DD-MM-YYYY"
          );
          setVoucherDetail({
            ...response.data,
            ngayBatDau: nbd,

            ngayKetThuc: nkt,
          });

          setTrangThai(
            convertTinhTrang(
              format(new Date(item?.ngayBatDau), "yyyy-MM-dd hh:mm:ss"),
              format(new Date(item?.ngayKetThuc), "yyyy-MM-dd hh:mm:ss")
            )
          );
        })
        .catch((error) => console.log(error));
    };
    getData();
  }, []);

  useEffect(() => {
    const getKhachHang = async () => {
      const res = await axios
        .get(`http://localhost:8080/voucher/getKhachHang/${id}`)
        .then((response) => {
          setDataKhachHang(response.data.map((data, i) => ({ ...data, stt: ++i })))

        })
        .catch((error) => console.log(error));
    };
    getKhachHang();
  }, []);

  useEffect(() => {
    const getHoaDon = async () => {
      const res = await axios
        .get(`http://localhost:8080/hoa_don/getHoaDonbyVoucher/${id}`)
        .then((response) => {
          setDataHoaDon(response.data.map((data) => ({
            id: data.id,
            ma: data.ma,
            giaTriMax: Intl.NumberFormat().format(data.id_voucher.giaTriMax),
            ngaySuDung: data.ngayTao,
            khachHang: data.id_khach_hang == null ? "Trang" : data.id_khach_hang.ten,
          })))
          console.log(response.data)
        })
        .catch((error) => console.log(error));
    };
    getHoaDon();
  }, []);

  useEffect(() => {
    const fetchHoaDonByIdVoucher = async () => {
      const res = await axios.get(
        `http://localhost:8080/hoa_don/getHoaDonByIdVoucher/${id}`
      );
      console.log("res:", res.data);
      const updateRows = res.data.map((item, index) => ({
        key: index,
        id: item.id,
        maHd: item.ma,
        giaTriMax: Intl.NumberFormat().format(item.id_voucher.giaTriMax),
        ngaySuDung: item.id_voucher?.ngaySuDung || "null",
        khachHang: item?.id_khach_hang?.ten || "Khách lẻ",
      }));
      console.log("updateRows:", updateRows);
      setData(updateRows);
    };
    fetchHoaDonByIdVoucher();
  }, []);

  const showModalThemKhachHang = () => {
    console.log(123);
    setModalThemKhachHang(true);
  }

  const okModalThemKhachHang = () => {
    setModalThemKhachHang(false);
  }

  const cancelModalThemKhachHang = () => {
    setModalThemKhachHang(false);
  }

  const onChange = (e) => {
    const { name, value } = e.target;
    setVoucherDetail((preVoucher) => ({
      ...preVoucher,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    setConfirmationOpen(true);
  };

  const cancelConfirm = () => {
    setConfirmationOpen(false);
  };

  const confirmUpdate = async () => {
    try {
      await form.validateFields();
      console.log(voucherDetail);

      await axios.put(`http://localhost:8080/voucher/updateVoucher`, {
        id: voucherDetail.id,
        ten: voucherDetail.ten,
        ma: voucherDetail.ma,
        code: voucherDetail.code,
        giaTriMax: voucherDetail.giaTriMax,
        giaTriMin: voucherDetail.giaTriMin,
        soLuong: voucherDetail.soLuong
      }
      ).then((response) => {
        toast("Cập nhật phiếu giảm giá thành công");
        const nbd = moment(new Date(response.data.ngayBatDau)).format(
          "  HH:mm:ss   , DD-MM-YYYY"
        );
        const nkt = moment(new Date(response.data.ngayKetThuc)).format(
          "  HH:mm:ss   , DD-MM-YYYY"
        );
        setVoucherDetail({
          ...response.data,
          ngayBatDau: nbd,

          ngayKetThuc: nkt,
        });
      })
        .catch((error) => {
          console.log(error);
        });
      cancelConfirm();

    } catch (error) {
      console.log(error);
      cancelConfirm();
    }

  };

  function convertTinhTrang(ngayBatDau, ngayKetThuc) {
    const timeBD = new Date(ngayBatDau).getTime();
    const timeKT = new Date(ngayKetThuc).getTime();
    const now = Date.now();
    var mess = 1;

    if (now > timeBD && now > timeKT) {
      mess = 1;
    } else if (now > timeBD && now < timeKT) {
      mess = 2;
    } else {
      mess = 3;
    }
    return mess;
  }

  const columns1 = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Mã khách hàng",
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "ten",
      key: "ten",
    },

    {
      title: "Số điện thọai",
      dataIndex: "sdt",
      key: "sdt",
    },
  ];

  const columns = [
    {
      title: "Mã hóa đơn",
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: "Mệnh giá voucher",
      dataIndex: "giaTriMax",
      key: "giaTriMax",
    },
    {
      title: "Ngày sử dụng",
      dataIndex: "ngaySuDung",
      key: "ngaySuDung",
    },

    {
      title: "Người sử dụng",
      dataIndex: "khachHang",
      key: "khachHang",
    },

    {
      title: "Chức năng",
      key: "chucNang",
      render: (_, record) => (
        <Space size="middle">
          <Link
            className="underline"
            to={`/quan-ly-hoa-don/detail-hoa-don/${record.id}`}
            onClick={() => setModalHD(true)}
          >
            Hiển thị hóa đơn
          </Link>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    form.resetFields();
  }, [initialValues]);
  return (
    <>
      <div className="conatiner mx-auto space-y-5">
        <div className="row thong-tin-hoa-don bg-white space-y-5 ">
          <div className="row mb-10">
            <p className="font-medium p-4 text-2xl"> Thông tin phiếu giảm giá</p>
            <hr style={{ backgroundColor: "black", height: 2, padding: 1 }} />
          </div>
          <div className="row divide-y-8 divide-slate-400/25 ">
            <Form form={form} initialValues={initialValues}>
              <div className="row mb-10 space-y-8" style={{ padding: "0 60px" }}>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  <div className="grid grid-cols-2 gap-1">
                    <p className="font-medium text-lg">Mã giảm giá : </p>
                    <p className="italic text-sm font-medium ">
                      <Form.Item
                        name="ma"
                        rules={[
                          {
                            required: true,
                            message: "Mã phiếu giảm giá không được để trống!",
                          }
                        ]}
                      >
                        <Input value={voucherDetail.ma} className="w-2/3" onChange={onChange} name="ma" />
                      </Form.Item>
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-1 ">
                    <p className="font-medium text-lg"> Tên giảm giá : </p>
                    <p className="italic text-sm font-medium">
                      <Form.Item
                        name="ten"
                        rules={[
                          {
                            required: true,
                            message: "Tên phiếu giảm giá không được để trống!",
                          }
                        ]}
                      >
                        <Input value={voucherDetail.ten} className="w-2/3" onChange={onChange} name="ten" />
                      </Form.Item>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  {/* <div className="grid grid-cols-2 gap-1 ">
                  <p className="font-medium text-lg">Tình Trạng : </p>
                  <div>
                    {trangThai === 1 ? (
                      <Tag color="black">Đã hết hạn</Tag>
                    ) : trangThai == 2 ? (
                      <Tag color="green">Đang diễn ra</Tag>
                    ) : (
                      <Tag color="yellow">Sắp diễn ra</Tag>
                    )}
                  </div>
                </div> */}
                  <div className="grid grid-cols-2 gap-1 ">
                    <p className="font-medium text-lg">Code : </p>
                    <div>
                      <p className="italic text-sm font-medium">
                        <Form.Item
                          name="code"
                          rules={[
                            {
                              required: true,
                              message: "Code phiếu giảm giá không được để trống!",
                            }
                          ]}
                        >
                          <Input value={voucherDetail.code} className="w-2/3" onChange={onChange} name="code" />
                        </Form.Item>
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-1 ">
                    <p className="font-medium text-lg">Trạng Thái : </p>
                    <p>
                      {" "}
                      {voucherDetail.trangThai == 1 ? (
                        <Tag color="red">Kích Hoạt</Tag>
                      ) : (
                        <Tag color="green">Chưa Kích Hoạt</Tag>
                      )}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  <div className="grid grid-cols-2 gap-1 ">
                    <p className="font-medium text-lg">Giá trị tối thiểu : </p>
                    <div>
                      <p className="italic text-sm font-medium" style={{ color: "red" }}>
                        <Form.Item
                          name="giaTriMin"
                          rules={[
                            {
                              required: true,
                              message: "Giá trị tối thiểu phiếu giảm giá không được để trống!",
                            }
                          ]}
                        >
                          <InputNumber value={Intl.NumberFormat().format(voucherDetail.giaTriMin)} className="w-2/3"
                            onChange={(value) => {
                              setVoucherDetail((preVoucher) => ({
                                ...preVoucher,
                                giaTriMin: value,
                              }))
                            }} name="giaTriMin" />
                        </Form.Item>
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-1 ">
                    <p className="font-medium text-lg">Mệnh Giá : </p>
                    <p
                      className="italic text-sm font-medium"
                      style={{ color: "red" }}
                    >
                      <Form.Item
                        name="giaTriMax"
                        rules={[
                          {
                            required: true,
                            message: "Mệnh giá phiếu giảm giá không được để trống!",
                          }
                        ]}
                      >
                        <InputNumber value={Intl.NumberFormat().format(voucherDetail.giaTriMax)} className="w-2/3"
                          onChange={(value) => {
                            setVoucherDetail((preVoucher) => ({
                              ...preVoucher,
                              giaTriMax: value,
                            }))
                          }} name="giaTriMax" />
                      </Form.Item>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  <div className="grid grid-cols-2 gap-1 ">
                    <p className="font-medium text-lg"> Số lượng : </p>
                    <p className="italic text-sm font-medium">
                      <Form.Item
                        name="soLuong"
                        rules={[
                          {
                            required: true,
                            message: "Số lượng phiếu giảm giá không được để trống!",
                          }
                        ]}
                      >
                        <InputNumber value={voucherDetail.soLuong} className="w-2/3"
                          onChange={(value) => {
                            setVoucherDetail((preVoucher) => ({
                              ...preVoucher,
                              soLuong: value,
                            }))
                          }} name="soLuong" />
                      </Form.Item>

                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-1 ">
                    <p className="font-medium text-lg"> Loại : </p>
                    <p className="italic text-sm font-medium">
                      {voucherDetail.loai}
                      {/* Riêng tư */}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  <div className="grid grid-cols-2 gap-1 ">
                    <p className="font-medium text-lg"> Ngày Bắt Đầu :</p>
                    <p className="italic text-sm font-medium">
                      {voucherDetail.ngayBatDau}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-1 ">
                    <p className="font-medium text-lg"> Ngày Kết Thúc :</p>
                    <p className="italic text-sm font-medium">
                      {voucherDetail.ngayKetThuc}
                    </p>
                  </div>
                </div>
              </div>

              <div className="row divide-y-4 divide-slate-400/25">
                <div className="row table-san-pham flex justify-end">
                  <Button onClick={handleUpdate}>
                    Cập nhật
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
        <div className="row thong-tin-hoa-don bg-white space-y-5 ">
          <div className="row mb-10">
            <p className="font-medium p-4 text-2xl"> Người sở hữu</p>
            <hr style={{ backgroundColor: "black", height: 2, padding: 1 }} />
          </div>
          <div className="row divide-y-8 divide-slate-400/25 ">
            <div className="row mb-10 space-y-8" style={{ padding: "0 60px" }}>
              <Table columns={columns1} dataSource={dataKhachHang} />
            </div>
            <div className="row divide-y-4 divide-slate-400/25">
              <div className="row table-san-pham flex justify-end">
                <Button onClick={showModalThemKhachHang}>
                  Thêm khách hàng
                </Button>

                <Modal
                  onOk={okModalThemKhachHang}
                  onCancel={cancelModalThemKhachHang}
                  open={modalThemKachHang}
                  width={1000}
                  footer={[]}
                >
                  <div className="mt-5">
                    <TableKhachHang idVoucher={voucherDetail.id} setDataKhachHang={setDataKhachHang} setModalThemKhachHang={setModalThemKhachHang} />
                  </div>
                </Modal>
              </div>
            </div>
          </div>

          <div className="row mb-10">
            <p className="font-medium p-4 text-2xl"> Lịch sử áp dụng</p>
            <hr style={{ backgroundColor: "black", height: 2, padding: 1 }} />
          </div>
          <div className="row divide-y-8 divide-slate-400/25 ">
            <div className="row mb-10 space-y-8" style={{ padding: "0 60px" }}>
              <Table columns={columns} dataSource={dataHoaDon} />
            </div>
          </div>
          <Modal
            title="Hóa đơn"
            style={{
              top: 5,
            }}
            open={modalHD}
            onOk={() => setModalHD(false)}
            onCancel={() => setModalHD(false)}
            footer={null}
            width={1000}
            height={200}
          >
            <div className="modal mt-5 divide-y divide-black ">
              <div class="grid grid-cols-3 gap-4 divide-x divide-black pb-3">
                <div class="grid grid-cols-2 gap-4 p-4">
                  <div>
                    <p class="text-black font-medium text-sm">Mã hóa đơn : </p>
                  </div>
                  <div>
                    <p>HD112</p>
                  </div>
                  <div>
                    <p class="text-black font-medium text-sm">Thời gian : </p>
                  </div>
                  <div>
                    <p>20-11-2000</p>
                  </div>
                  <div>
                    <p class="text-black font-medium text-sm">Khách Hàng : </p>
                  </div>
                  <div>
                    <p>Admin</p>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-4 p-4">
                  <div>
                    <p class="text-black font-medium text-sm">Trạng thái : </p>
                  </div>
                  <div>
                    <p>HD112</p>
                  </div>
                  <div>
                    <p class="text-black font-medium text-sm">
                      Nhân viên bán :{" "}
                    </p>
                  </div>
                  <div>
                    <p>20-11-2000</p>
                  </div>
                  <div>
                    <p class="text-black font-medium text-sm">Người tạo : </p>
                  </div>
                  <div>
                    <p>Admin</p>
                  </div>
                </div>
                <div class="grid gap-4 p-4">
                  <Input.TextArea placeholder="Ghi chú ...." rows={5} />
                </div>
              </div>
              <div className="">
                <Table columns={column} dataSource={data} />
              </div>
              <div class="grid  grid-cols-3 gap-4 " style={{ height: "150px" }}>
                <div class="grid grid-cols-2 gap-2 p-2">
                  <div>
                    <p class="text-black font-medium text-sm">
                      Tổng số lượng :{" "}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        {Intl.NumberFormat().format(1000)}
                      </span>
                      <span style={{ color: "black", fontWeight: "bold" }}>
                        &nbsp;sản phẩm
                      </span>
                    </p>
                  </div>
                  <div>
                    <p class="text-black font-medium text-sm">
                      Tổng tiền hàng :{" "}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: "red", fontWeight: "bold" }}>
                      {" "}
                      {Intl.NumberFormat().format(1000)}
                      &nbsp;₫
                    </p>
                  </div>
                  <div>
                    <p class="text-black font-medium text-sm">
                      Giảm giá hóa đơn :{" "}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: "red", fontWeight: "bold" }}>
                      {" "}
                      {Intl.NumberFormat().format(1000)}
                      &nbsp;₫
                    </p>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-2 p-2">
                  <div>
                    <p class="text-black font-medium text-sm">
                      Khách cần trả :{" "}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: "red", fontWeight: "bold" }}>
                      {" "}
                      {Intl.NumberFormat().format(1000)}
                      &nbsp;₫
                    </p>
                  </div>

                  <div>
                    <p class="text-black font-medium text-sm">Khách đưa : </p>
                  </div>
                  <div>
                    <p style={{ color: "red", fontWeight: "bold" }}>
                      {" "}
                      {Intl.NumberFormat().format(1000)}
                      &nbsp;₫
                    </p>
                  </div>

                  <div>
                    <p class="text-black font-medium text-sm">Tổng tiền : </p>
                  </div>
                  <div>
                    <p style={{ color: "red", fontWeight: "bold" }}>
                      {" "}
                      {Intl.NumberFormat().format(1000)}
                      &nbsp;₫
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
          <Dialog open={confirmationOpen} onClose={cancelConfirm} fullWidth>
            <DialogTitle>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingBottom: "15px",
                }}
              >
                <TbInfoTriangle
                  className="mr-2"
                  style={{
                    color: "red",
                    fontSize: "25px",
                  }}
                />
                <span>Xác nhận cập nhật</span>
              </div>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Bạn có chắc muốn cập nhật phiếu giảm giá này?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={cancelConfirm} color="warning">
                Hủy
              </Button>
              <Button color="primary" onClick={confirmUpdate}>
                Hoàn tất
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
}

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const column = [
  {
    title: "Mã hóa đơn",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Thoi gian áp dụng",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Nhân viên xác nhận",
    dataIndex: "address",
    key: "address",
  },

  {
    title: "Người sử dụng",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Mệnh giá voucher",
    dataIndex: "address",
    key: "address",
  },
];


