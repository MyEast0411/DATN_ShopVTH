import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { Tag, Table, Space, Modal, Input } from "antd";
import { Button } from "@material-tailwind/react";

export default function DetailVoucher() {
  const { id } = useParams();
  const [voucherDetail, setVoucherDetail] = useState({});
  const [modalHD, setModalHD] = useState(false);
  const [trangThai, setTrangThai] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const res = await axios
        .get(`http://localhost:8080/voucher/getVoucher/${id}`)
        .then((response) => {
          console.log(response.data);
          setVoucherDetail({
            ...response.data,
            ngayBatDau: format(
              new Date(response.data.ngayBatDau),
              "yyyy-MM-dd hh:mm:ss"
            ),
            ngayKetThuc: format(
              new Date(response.data.ngayKetThuc),
              "yyyy-MM-dd hh:mm:ss"
            ),
          });

          setTrangThai(
            convertTinhTrang(
              format(new Date(item.ngayBatDau), "yyyy-MM-dd hh:mm:ss"),
              format(new Date(item.ngayKetThuc), "yyyy-MM-dd hh:mm:ss")
            )
          );
        })
        .catch((error) => console.log(error));
    };
    getData();
  }, []);

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

  const columns = [
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

    {
      title: "Chức năng",
      key: "chucNang",
      render: (_, record) => (
        <Space size="middle">
          <Button
            style={{ backgroundColor: "red" }}
            onClick={() => setModalHD(true)}
          >
            Hiển thị hóa đơn
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="conatiner mx-auto space-y-5">
        <div className="row thong-tin-hoa-don bg-white space-y-5 ">
          <div className="row mb-10">
            <p className="font-bold p-4 text-2xl"> Thông tin voucher</p>
            <hr style={{ backgroundColor: "black", height: 2, padding: 1 }} />
          </div>
          <div className="row divide-y-8 divide-slate-400/25 ">
            <div className="row mb-10 space-y-8" style={{ padding: "0 60px" }}>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div className="grid grid-cols-2 gap-1  ">
                  <p className="font-bold text-lg">Mã voucher : </p>
                  <p className="italic text-sm font-bold ">
                    {" "}
                    {voucherDetail.ma}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-1 ">
                  <p className="font-bold text-lg"> Tên voucher : </p>
                  <p className="italic text-sm font-bold">
                    {" "}
                    {voucherDetail.ten}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div className="grid grid-cols-2 gap-1 ">
                  <p className="font-bold text-lg">Tình Trạng : </p>
                  <div>
                    {trangThai === 1 ? (
                      <Tag color="black">Đã hết hạn</Tag>
                    ) : trangThai == 2 ? (
                      <Tag color="green">Đang diễn ra</Tag>
                    ) : (
                      <Tag color="yellow">Sắp diễn ra</Tag>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-1 ">
                  <p className="font-bold text-lg">Trạng Thái : </p>
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
                  <p className="font-bold text-lg">Code : </p>
                  <div>
                    <p className="italic text-sm font-bold">
                      {" "}
                      {voucherDetail.code}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-1 ">
                  <p className="font-bold text-lg">Mệnh Giá : </p>
                  <p
                    className="italic text-sm font-bold"
                    style={{ color: "red" }}
                  >
                    {Intl.NumberFormat().format(voucherDetail.giaTriMax)}&nbsp;₫
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div className="grid grid-cols-2 gap-1 ">
                  <p className="font-bold text-lg"> Ngày Bắt Đầu </p>
                  <p className="italic text-sm font-bold">
                    {/* {format(
                      new Date(voucherDetail.ngayBatDau),
                      "yyyy-MM-dd hh:mm:ss"
                    )} */}
                    {/* {format(
                      } */}
                    {voucherDetail.ngayBatDau}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-1 ">
                  <p className="font-bold text-lg"> Ngày Kêt Thúc </p>
                  <p className="italic text-sm font-bold">
                    {voucherDetail.ngayKetThuc}
                    {/* {format(
                      new Date(voucherDetail.ngayKetThuc),
                      "yyyy-MM-dd hh:mm:ss"
                    )} */}
                  </p>
                </div>
              </div>
            </div>

            <div className="row divide-y-4 divide-slate-400/25">
              <div className="row table-san-pham "></div>
            </div>
          </div>
        </div>
        <div className="row thong-tin-hoa-don bg-white space-y-5 ">
          <div className="row mb-10">
            <p className="font-bold p-4 text-2xl"> Lịch sử áp dụng</p>
            <hr style={{ backgroundColor: "black", height: 2, padding: 1 }} />
          </div>
          <div className="row divide-y-8 divide-slate-400/25 ">
            <div className="row mb-10 space-y-8" style={{ padding: "0 60px" }}>
              <Table columns={columns} dataSource={data} />
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
                    <p class="text-black font-bold text-sm">Mã hóa đơn : </p>
                  </div>
                  <div>
                    <p>HD112</p>
                  </div>
                  <div>
                    <p class="text-black font-bold text-sm">Thời gian : </p>
                  </div>
                  <div>
                    <p>20-11-2000</p>
                  </div>
                  <div>
                    <p class="text-black font-bold text-sm">Khách Hàng : </p>
                  </div>
                  <div>
                    <p>Admin</p>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-4 p-4">
                  <div>
                    <p class="text-black font-bold text-sm">Trạng thái : </p>
                  </div>
                  <div>
                    <p>HD112</p>
                  </div>
                  <div>
                    <p class="text-black font-bold text-sm">Nhân viên bán : </p>
                  </div>
                  <div>
                    <p>20-11-2000</p>
                  </div>
                  <div>
                    <p class="text-black font-bold text-sm">Người tạo : </p>
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
                    <p class="text-black font-bold text-sm">Tổng số lượng : </p>
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
                    <p class="text-black font-bold text-sm">
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
                    <p class="text-black font-bold text-sm">
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
                    <p class="text-black font-bold text-sm">Khách cần trả : </p>
                  </div>
                  <div>
                    <p style={{ color: "red", fontWeight: "bold" }}>
                      {" "}
                      {Intl.NumberFormat().format(1000)}
                      &nbsp;₫
                    </p>
                  </div>

                  <div>
                    <p class="text-black font-bold text-sm">Khách đưa : </p>
                  </div>
                  <div>
                    <p style={{ color: "red", fontWeight: "bold" }}>
                      {" "}
                      {Intl.NumberFormat().format(1000)}
                      &nbsp;₫
                    </p>
                  </div>

                  <div>
                    <p class="text-black font-bold text-sm">Tổng tiền : </p>
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
