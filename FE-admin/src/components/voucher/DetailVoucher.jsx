import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { Tag, Table, Space } from "antd";

export default function DetailVoucher() {
  const { id } = useParams();
  const [voucherDetail, setVoucherDetail] = useState({});
  const [trangThai, setTrangThai] = useState("");
  useEffect(() => {
    const getData = async () => {
      const res = await axios
        .get(`http://localhost:8080/voucher/getVoucher/${id}`)
        .then((response) => {
          console.log(response.data);
          setVoucherDetail(response.data);
          setTrangThai(
            convertTinhTrang(
              format(new Date(response.data.ngayBatDau), "yyyy-MM-dd hh:mm:ss"),
              format(new Date(response.data.ngayKetThuc), "yyyy-MM-dd hh:mm:ss")
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
        </div>
        <div className="row thong-tin-hoa-don bg-white space-y-5 ">
          <div className="row mb-10">
            <p className="font-bold p-4 text-2xl"> Danh sách hóa đơn áp dụng</p>
            <hr style={{ backgroundColor: "black", height: 2, padding: 1 }} />
          </div>
          <div
            className="row divide-y-8 divide-slate-400/25  "
            style={{ padding: "0 60px" }}
          >
            <Table columns={columns} dataSource={data} />
          </div>
        </div>
      </div>
    </>
  );
}

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
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
