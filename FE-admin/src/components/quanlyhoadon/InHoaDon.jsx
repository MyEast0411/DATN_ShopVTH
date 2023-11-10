import { Divider, Table } from "antd";
import logo from "../../assets/logo.png";
import React from "react";
import { format } from "date-fns";

// xuất ảnh
const ComponentToPrint = React.forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{
      backgroundColor: "wheat",
      borderRadius: 10,
    }}
  >
    <div
      className="bill p-5"
      style={{
        backgroundColor: "wheat",
        borderRadius: 10,
        margin: " 5px auto",
      }}
    >
      <div className="flex">
        <div>
          <img
            src={logo}
            width={50}
            alt="Ảnh logo"
            style={{ display: "inline-block" }}
          />
          <span className="text-sm whitespace-pre font-semibold text-right">
            Jordan VTH
          </span>
        </div>
      </div>
      <div class="flex ...gap-20 m-4 justify-center">
        <p className="text-xl whitespace-pre font-semibold text-center">
          Hóa Đơn
        </p>
      </div>
      <div class="flex ... gap-10 " style={{ fontSize: 12 }}>
        <div class="w-2/3 ...">
          <p>Khách Hàng : Hoàng Quỳnh Thúy Ngân</p>
          <p>Số Điện thoại : 038456279</p>
          <p>
            Địa chỉ khách hàng : Đường số 1 , Nguyên Xá , Bắc Từ Nam , Hà Nội
          </p>
        </div>
        <div class="w-1/3 ...">
          <p>Hóa đơn : #1234</p>
          <p>
            Thời gian :{" "}
            <span> {format(new Date(), " hh:mm ,   dd-MM-yyyy")}</span>
          </p>
        </div>
      </div>
    </div>
    <Divider />
    <div className="sp  p-5">
      <Table
        dataSource={props.data}
        columns={props.columns}
        pagination={false}
      />
      <div className="mt-4  space-y-5">
        <p className="text-end">Tổng cộng : 10000VNĐ</p>
        <p className="text-end">Thuế(%) : 0VNĐ</p>
        <p className="text-end">
          <span className="uppercase font-bold"> Tổng tiền : </span>{" "}
          <span className="text-red-600 font-bold">10000VNĐ</span>
        </p>
      </div>
    </div>

    <Divider />

    <div class="inforpayment ...mb-2  p-5">
      <div class="headerTitle mb-1">
        <p className="font-bold text-red-600">Thông tin thanh toán</p>
      </div>
      <div class="content">
        <p>Ngân Hàng VCB</p>
        <p>Chủ tài khoản : Nguyễn Ngọc Linh</p>
        <p>Số Tài Khoản : 123-567-238</p>
        <p>Hạn thanh toán : 17/02/2024</p>
      </div>
    </div>

    <div class="inforstore ... p-5">
      <div className="headerTitle mb-1 w-full">
        <p className="font-bold text-red-600">Thông tin cửa hàng</p>
      </div>
      <div className="content">
        <p>vthstore1234@gmail.com</p>
        <p>Số 11 , Đường Nhuệ , Tân Hội , Tân Lập , Đan Phượng</p>
      </div>
    </div>
  </div>
));

export default ComponentToPrint;
