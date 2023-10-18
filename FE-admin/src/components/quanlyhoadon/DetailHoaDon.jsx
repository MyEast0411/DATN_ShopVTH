import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import TableCommon from "../../small-component/common/TableCommon";
import axios from "axios";
import { Space, Table, Tag } from "antd";
import { format } from "date-fns";
import TabsComponent from "../../small-component/Tabs";
import Cart from "../CartItem";

export default function DetailHoaDon() {
  const { id } = useParams();
  const [info, setInfo] = useState({});
  const [rowsLichSuThanhToan, setRowsLichSuThanhToan] = useState([]);
  useEffect(() => {
    getDataLichSuThanhToan();
    getInfoHD();
  }, []);

  const getDataLichSuThanhToan = async () => {
    const res = await axios.get(`http://localhost:8080/htth/getHTTT/${id}`);
    const data = await res.data;
    if (data.length != 0) {
      const list = data.map((item, index) => {
        return {
          id: index + 1,
          maGiaoDich: item.id_thanh_toan.ma_giao_dich,
          soTien: item.id_hoa_don.tongTien,
          trangThai: item.id_thanh_toan.hinhThuc,
          thoiGian: item.ngayTao,
          loaiGiaoDich: item.id_thanh_toan.trangThai,
          phuongThucThanhToan: item.id_thanh_toan.hinhThuc,
          ghiChu: item.moTa,
          nguoiXacNhan: item.nguoiTao,
        };
      });
      setRowsLichSuThanhToan(list);
    }
  };

  const getInfoHD = async () => {
    const res = await axios.get(
      `http://localhost:8080/hoa_don/getHoaDon/${id}`
    );
    const data = await res.data;
    console.log(data);
    setInfo(data);
  };

  return (
    <div className="conatiner mx-auto space-y-5">
      <div className="row timeline bg-white">
        <div className="row timeline " style={{ height: 300 }}>
          Time line đây
        </div>
        <div className="row button-contact p-4 grid grid-cols-2">
          <div className="row ">
            <Button className="me-4" color="blue">
              Xac nhan
            </Button>
            <Button className="me-4" color="green">
              Xuất hoá đơn
            </Button>
          </div>
          <div className="row grid justify-items-end">
            <Button className="me-4" color="red">
              Lịch Sử
            </Button>
          </div>
        </div>
      </div>

      <div className="row lich-su-thanh-toan bg-white">
        <div className="row mb-10">
          <p className="font-bold p-4 text-2xl"> Lịch Sử Thanh Toán</p>
          <hr style={{ backgroundColor: "black", height: 2, padding: 1 }} />
        </div>

        <div className="row table-thanh-toan p-4">
          {" "}
          {/* <TableCommon
            pageSize={2}
            pageSizeOptions={[1, 1]}
            columns={columnsThanhToan}
            rows={rowsLichSuThanhToan}
          /> */}
          <Table
            columns={columnsThanhToan}
            dataSource={rowsLichSuThanhToan}
            pagination={false}
          />
        </div>
      </div>
      <div className="row thong-tin-hoa-don bg-white space-y-5 ">
        <div className="row mb-10">
          <p className="font-bold p-4 text-2xl"> Thông tin hóa đơn</p>
          <hr style={{ backgroundColor: "black", height: 2, padding: 1 }} />
        </div>
        <div className="row divide-y-8 divide-slate-400/25 ">
          <div className="row mb-10 space-y-8" style={{ padding: "0 60px" }}>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <div className="grid grid-cols-2 gap-1  ">
                <p className="font-bold text-lg">Trạng Thái : </p>
                <div>
                  <Tag
                    bordered={false}
                    style={{ background: "purple", borderRadius: "10px" }}
                  >
                    <span className="uppercase text-white">Thành Công</span>
                  </Tag>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1 ">
                <p className="font-bold text-lg"> Tên Khách hàng : </p>
                <p> {info.hoTen}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <div className="grid grid-cols-2 gap-1 ">
                <p className="font-bold text-lg">Loại : </p>
                <div>
                  <Tag
                    bordered={false}
                    style={{
                      background: "green",
                      borderRadius: "10px",
                      color: "white",
                    }}
                  >
                    {info.loaiHd === 1 ? "TẠI QUẦY" : "ONLINE"}
                  </Tag>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1 ">
                <p className="font-bold text-lg">Số Điện Thoại : </p>
                <div>{info.sdt}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <div className="grid grid-cols-2 gap-1 ">
                <p className="font-bold text-lg"> Địa Chỉ : </p>
                <div> {info.diaChi}</div>
              </div>
              <div className="grid grid-cols-2 gap-1 ">
                <p className="font-bold text-lg"> Ghi Chú : </p>
                <div> {info.ghiChu}</div>
              </div>
            </div>
          </div>

          <div className="row divide-y-4 divide-slate-400/25">
            <div className="row table-san-pham ">
              <Cart />
            </div>

            <div class="grid grid-rows-3 grid-flow-col gap-4">
              <div class="row-start-2 row-span-2 ..."></div>
              <div class="row-end-3 row-span-2 ..."></div>

              <div class="row-start-1 row-end-4 ...">
                <div className="grid grid-cols-1 gap-x-8 gap-y-4 space-y-3">
                  <div className="grid grid-cols-2 gap-1  pt-3">
                    <p className="font-bold text-lg">Tiền Hàng : </p>
                    <p>10000</p>
                  </div>

                  <div className="grid grid-cols-2 gap-1  ">
                    <p className="font-bold text-lg"> Phí Vận Chuyển : </p>
                    <p>10000</p>
                  </div>

                  <div className="grid grid-cols-2 gap-1  ">
                    <p className="font-bold text-lg"> Tien Giam : </p>
                    <p>10000</p>
                  </div>

                  <div className="grid grid-cols-2 gap-1  pe-3  ">
                    <p className="font-bold text-lg"> Tổng Tiền : </p>
                    <p>10000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const columnsThanhToan = [
  { key: "id", title: "STT", dataIndex: "id", width: 15 },
  {
    key: "maGiaoDich",
    title: "Mã Giao Dịch",
    width: 150,
    dataIndex: "maGiaoDich",
  },
  {
    key: "soTien",
    title: "Số Tiền",
    width: 150,
    dataIndex: "soTien",
    render: (text) => (
      <span className="text-red-600">
        {Intl.NumberFormat().format(text)} &nbsp;₫
      </span>
    ),
  },
  { key: "trangThai", title: "Trạng Thái", width: 110, dataIndex: "trangThai" },
  {
    key: "thoiGian",
    title: "Thời Gian",
    width: 150,
    dataIndex: "thoiGian",
    render: (text) => format(new Date(text), " hh:mm ,   dd-MM-yyyy"),
  },
  {
    key: "loaiGiaoDich",
    title: "Loại Giao Dịch",
    width: 110,
    dataIndex: "loaiGiaoDich",

    render: (_, record) =>
      record.loaiGiaoDich == 1 ? (
        <Tag color="green"> Thanh toán</Tag>
      ) : (
        <Tag color="red">Chưa thanh toán</Tag>
      ),
  },
  {
    key: "phuongThucThanhToan",
    title: "Phương Thức Thanh Toán",
    dataIndex: "phuongThucThanhToan",
    width: 200,
  },
  { key: "ghiChu", title: "Ghi Chú", width: 110, dataIndex: "ghiChu" },
  {
    key: "nguoiXacNhan",
    title: "Người xác Nhận",
    width: 200,
    dataIndex: "nguoiXacNhan",
  },
];
