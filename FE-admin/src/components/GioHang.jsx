import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

import {
  Button,
  Input,
  Switch,
  Button as MaterialButton,
} from "@material-tailwind/react";
// import "./GioHang";
import { QrReader } from "react-qr-reader";
import { Modal, Tag } from "antd";

// icons
import { BsQrCodeScan } from "react-icons/bs";
import CartItem from "./CartItem";

import { Link, useNavigate } from "react-router-dom";

import { MdPayments } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";

const GioHang = ({ columns, users, activeKey, changeData, updateSoLuong }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenThem, setIsModalOpenThem] = useState(false);
  const [isModalOpenVoucher, setIsModalOpenVoucher] = useState(false);
  const [isModalOpenTK, setIsModalOpenTK] = useState(false);
  const history = useNavigate();
  // modal thêm sản phẩm
  const showModalThem = () => {
    setIsModalOpenThem(true);
  };
  const handleOkThem = () => {
    setIsModalOpenThem(false);
  };
  const handleCancelThem = () => {
    setIsModalOpenThem(false);
  };

  // modal list tài khoản
  const showModalTK = () => {
    setIsModalOpenTK(true);
  };
  const handleOkTK = () => {
    setIsModalOpenTK(false);
  };
  const handleCancelTK = () => {
    setIsModalOpenTK(false);
  };

  // modal list mã voucher
  const showModalVoucher = () => {
    setIsModalOpenVoucher(true);
  };
  const handleOkVoucher = () => {
    setIsModalOpenVoucher(false);
  };
  const handleCancelVoucher = () => {
    setIsModalOpenVoucher(false);
  };

  // modal thêm sp QR
  const showModalQR = () => {
    setIsModalOpen(true);
  };

  const handleOkQR = () => {
    setIsModalOpen(false);
  };

  const handleCancelQR = () => {
    setIsModalOpen(false);
  };

  const handleStartScanningQR = () => {
    setShowScanner(true);
  };

  const handleEndScanningQR = () => {
    setShowScanner(false);
  };

  const handleScanQR = (data) => {
    if (data) {
      console.log(data);
      handleOkQR();
    }
  };

  const handleErrorQR = (error) => {
    console.error(error);
  };

  return (
    <>
      <div className=" p-5">
        <div className="flex items-center gap-4">
          <Modal
            onOk={handleOkThem}
            onCancel={handleCancelThem}
            open={isModalOpenThem}
          >
            <p>Hello</p>
          </Modal>
          <MaterialButton
            variant="gradient"
            className="poppins-font text-sm font-medium tracking-wide"
            onClick={showModalThem}
          >
            Thêm sản phẩm
          </MaterialButton>

          <MaterialButton
            variant="gradient"
            className="poppins-font flex text-sm items-center gap-4 font-medium tracking-wide"
            onClick={showModalQR}
          >
            <BsQrCodeScan />
            QR Sản phẩm
          </MaterialButton>

          <Modal
            open={isModalOpen}
            onOk={handleOkQR}
            onCancel={handleCancelQR}
            style={{ position: "relative" }}
            className=""
          >
            <div>
              <QrReader
                onResult={(data) => {
                  if (data != undefined) {
                    handleOkQR();
                    console.log(data.text);
                    function splitString(inputString) {
                      const values = inputString.split("|");
                      return values;
                    }
                    const result = splitString(data.text);
                    console.log(result);
                    setKhachHang({
                      ...khachHang,
                      ten: result[2],
                      cccd: result[0],
                      ngay_sinh: result[3],
                      gioi_tinh: result[4],
                    });
                  }
                }}
                onError={handleErrorQR}
                style={{ width: "100%" }}
              />
            </div>
          </Modal>
          <Link to="/quan-ly-hoa-don">
            <MaterialButton
              variant="outlined"
              className="poppins-font tracking-wide"
              style={{
                marginLeft: "600px",
              }}
            >
              Xem danh sách hóa đơn
            </MaterialButton>
          </Link>
        </div>
        <div className="pt-4">
          <CartItem
            users={users}
            columns={columns}
            updateSoLuong={updateSoLuong}
          />
        </div>

        <div className="flex justify-between mt-5 mb-3">
          <span className="poppins-font normal-case h-10 text-lg text-lg font-bold uppercase ">
            Tài khoản{" "}
          </span>
          <Modal
            onOk={handleOkTK}
            onCancel={handleCancelTK}
            open={isModalOpenTK}
          >
            <Table removeWrapper aria-label="Example static collection table">
              <TableHeader>
                <TableColumn>NAME</TableColumn>
                <TableColumn>ROLE</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>THAO TÁC</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow key="1">
                  <TableCell>Tony Reichert</TableCell>
                  <TableCell>CEO</TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell>
                    <Button
                      style={{ backgroundColor: "white" }}
                      onClick={() => alert("hello")}
                    >
                      <IoAddCircle style={{ color: "red", fontSize: 25 }} />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow key="2">
                  <TableCell>Zoey Lang</TableCell>
                  <TableCell>Technical Lead</TableCell>
                  <TableCell>Paused</TableCell>
                  <TableCell>
                    <Button>
                      <IoAddCircle />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow key="3">
                  <TableCell>Jane Fisher</TableCell>
                  <TableCell>Senior Developer</TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell>
                    <Button>
                      <IoAddCircle />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow key="4">
                  <TableCell>William Howard</TableCell>
                  <TableCell>Community Manager</TableCell>
                  <TableCell>Vacation</TableCell>
                  <TableCell>
                    <Button>
                      <IoAddCircle />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Modal>

          <Button
            variant="outlined"
            className="inline-block  font-semibold"
            onClick={showModalTK}
          >
            Chọn tài khoản
          </Button>
        </div>
        <p
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "#232D3F",
          }}
        />
        <div className="flex justify-between mt-5 mb-3">
          <span className="poppins-font normal-case h-10  ms-5 font-bold">
            Tên khách hàng :{" "}
            <Tag color="magenta" style={{ fontSize: 15 }}>
              Khách lẻ
            </Tag>
          </span>
        </div>
        <p
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "#232D3F",
          }}
        />
        <div className="flex justify-between mt-5 mb-3">
          <span className="poppins-font normal-case h-10 text-lg text-lg font-bold uppercase ">
            Khách Hàng{" "}
          </span>
        </div>

        <div class="flex justify-end ... ">
          <div className="w-6/12 space-y-8">
            <p className="font-bold text-lg text-center">
              <span>Thông tin thanh toán</span>{" "}
            </p>

            <div class="flex ... gap-20">
              <div class="w-4/6 ... font-medium text-s ">Khách thanh toán</div>
              <div class="w-2/6 ...">
                <span style={{ color: "red", fontWeight: "bold" }}>
                  {" "}
                  {Intl.NumberFormat().format(700000)}&nbsp;₫
                </span>
              </div>
            </div>

            <div class="flex ... gap-6">
              <div class="w-4/6 ... font-">
                <Input label="mời nhập mã" />
              </div>
              <Modal
                onOk={handleOkVoucher}
                onCancel={handleCancelVoucher}
                open={isModalOpenVoucher}
              >
                <Table
                  removeWrapper
                  aria-label="Example static collection table"
                >
                  <TableHeader>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>ROLE</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>THAO TÁC</TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow key="1">
                      <TableCell>Tony Reichert</TableCell>
                      <TableCell>CEO</TableCell>
                      <TableCell>Active</TableCell>
                      <TableCell>
                        <Button>
                          <IoAddCircle />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow key="2">
                      <TableCell>Zoey Lang</TableCell>
                      <TableCell>Technical Lead</TableCell>
                      <TableCell>Paused</TableCell>
                      <TableCell>
                        <Button>
                          <IoAddCircle />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow key="3">
                      <TableCell>Jane Fisher</TableCell>
                      <TableCell>Senior Developer</TableCell>
                      <TableCell>Active</TableCell>
                      <TableCell>
                        <Button>
                          <IoAddCircle />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow key="4">
                      <TableCell>William Howard</TableCell>
                      <TableCell>Community Manager</TableCell>
                      <TableCell>Vacation</TableCell>
                      <TableCell>
                        <Button>
                          <IoAddCircle />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Modal>

              <div class="w-2/6 ...">
                <Button onClick={showModalVoucher}>Chọn mã</Button>
              </div>
            </div>
            <div class="flex ...">
              <Switch
                id="custom-switch-component"
                ripple={false}
                className="h-full w-full checked:bg-[#2ec946]"
                containerProps={{
                  className: "w-11 h-6",
                }}
                circleProps={{
                  className: "before:hidden left-0.5 border-none",
                }}
                label={
                  <span
                    className="
                  font-bold checked:text-[#2ec946]"
                  >
                    Giao hàng
                  </span>
                }
              />
            </div>
            <div class="flex ... gap-20">
              <div class="w-4/6 ... font-medium text-s">Tiền hàng</div>
              <div class="w-2/6 ...">
                <span style={{ color: "red", fontWeight: "bold" }}>
                  {" "}
                  {Intl.NumberFormat().format(700000)}&nbsp;₫
                </span>
              </div>
            </div>
            <div class="flex ... gap-20">
              <div class="w-4/6 ... font-medium text-s">Giảm giá </div>
              <div class="w-2/6 ...">
                <span style={{ color: "red", fontWeight: "bold" }}>
                  {" "}
                  {Intl.NumberFormat().format(0)}&nbsp;₫
                </span>
              </div>
            </div>
            <div class="flex ... gap-20">
              <div class="w-4/6 ... font-medium text-s">Tổng tiền</div>
              <div class="w-2/6 ...">
                <span style={{ color: "red", fontWeight: "bold" }}>
                  {" "}
                  {Intl.NumberFormat().format(700000)}&nbsp;₫
                </span>
              </div>
            </div>
            <div class="flex ... justify-center">
              <Button>Thanh Toán</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GioHang;
