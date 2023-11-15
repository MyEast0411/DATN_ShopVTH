import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import axios from "axios";
import { Table, Tag, message, Modal, Input } from "antd";
import { format } from "date-fns";
import { Timeline, TimelineEvent } from "@mailtop/horizontal-timeline";
import { GiConfirmed, GiReceiveMoney } from "react-icons/gi";
import { LuPackageCheck } from "react-icons/lu";
import { FaShippingFast, FaFileInvoice } from "react-icons/fa";
import { TbPackages } from "react-icons/tb";
import {
  exportComponentAsJPEG,
  exportComponentAsPDF,
  exportComponentAsPNG,
} from "react-component-export-image";
import ComponentToPrint from "./InHoaDon";
import { toast } from "react-toastify";

export default function DetailHoaDon() {
  const { id } = useParams();
  const [info, setInfo] = useState({});
  const [rowsLichSuThanhToan, setRowsLichSuThanhToan] = useState([]);
  const [quantityEdit, setQuantityEdit] = useState(0);
  const [money, setMoney] = useState({
    tienHang: 0,
    tienGiam: 0,
    tienShip: 0,
    tongTien: 0,
  });
  const [rowsSPCT, setRowsSPCT] = useState([]);
  // Timline and history
  const [currentTimeLine, setCurrentTimeLine] = useState(0);
  const [listTimeLineOnline, setListTimeLineOnline] = useState([]);
  const [rowsLichSu, setRowsLichSu] = useState([]);

  // modal message
  const [messageApi, contextHolder] = message.useMessage();
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [openTimeLine, setOpenTimeLine] = useState(false);

  //  modal xuất hóa đơn
  const componentRef = useRef();

  const [isModalOpenHD, setIsModalOpenHD] = useState(false);
  const showModalHD = () => {
    setIsModalOpenHD(true);
  };
  const handleOkHD = () => {
    exportComponentAsPNG(componentRef, {
      fileName: `billHD_${format(new Date(), " hh-mm-ss, dd-MM-yyyy")}`,
    });
    setIsModalOpenHD(false);
  };
  const handleCancelHD = () => {
    setIsModalOpenHD(false);
  };

  const showModal = () => {
    setOpenTimeLine(true);
  };

  const hideModal = () => {
    setOpenTimeLine(false);
  };
  // xóa spct
  const success = (mess) => {
    messageApi.open({
      type: "success",
      content: mess,
    });
    getDataLichSuThanhToan();
    getInfoHD();
    getDataChiTietSanPham();
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Xóa Thất Bại",
    });
  };

  const addLichSuHoaDon = async () => {
    await axios
      .post(`http://localhost:8080/lich_su_hoa_don/add/${id}`, {
        moTaHoaDon: listTitleTimline[currentTimeLine].title,
        deleted: 0,
        nguoiTao: "Cam",
      })
      .then((response) => {
        setCurrentTimeLine(currentTimeLine + 1);
        toast.success(`${listTitleTimline[currentTimeLine].title} thành công`);
        // success(`${listTitleTimline[currentTimeLine].title} thành công`);
        hideModal();
        getDataLichSu();
      });
  };

  const onHandleTimeLineChange = () => {
    if (currentTimeLine < 5) {
      Modal.confirm({
        title: `Bạn có muốn ${listTitleTimline[currentTimeLine].title} không ?`,
        okText: "Yes",
        okType: "danger",
        onOk: () => {
          addLichSuHoaDon();
        },
      });
    }
  };

  // modal lich su
  const [open, setOpen] = useState(false);

  const showModalLichSu = () => {
    setOpen(true);
  };
  const handleOkLichSu = () => {
    setOpen(false);
  };

  const handleCancelLichSu = () => {
    setOpen(false);
  };

  useEffect(() => {
    getDataLichSuThanhToan();
    getInfoHD();
    getDataChiTietSanPham();
    getDataLichSu();
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
          // loaiGiaoDich: item.id_thanh_toan.trangThai,
          phuongThucThanhToan: item.id_thanh_toan.hinhThuc,
          ghiChu: item.moTa,
          nguoiXacNhan: item.nguoiTao,
        };
      });
      setRowsLichSuThanhToan(list);
    }
  };

  const getDataChiTietSanPham = async () => {
    const res = await axios.get(`http://localhost:8080/hdct/getHDCT/${id}`);
    const data = await res.data;
    console.log(res.data);
    var tong = 0;
    setRowsSPCT(
      data.map((item, index) => {
        return {
          id: item.id_chi_tiet_san_pham.ids,
          imageUrl:
            "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
          name: item.id_chi_tiet_san_pham.id_san_pham.ten,
          size: "6",
          quantity: item.soLuong,
          price: item.giaTien,
        };
      })
    );
  };

  const onHandleDelete = (idSPCT) => {
    Modal.confirm({
      title: `bạn có muốn xóa sản phẩm không ?`,
      okText: "Yes",
      okType: "danger",
      onOk: async () => {
        const res = await axios
          .delete(`http://localhost:8080/hdct/deleteHDCT/${id}/${idSPCT}`)
          .then((response) => {
            response.data == true ? success("Xóa thành công") : error();
          })
          .catch((e) => error());
      },
    });
  };
  const getDataLichSu = async () => {
    await axios
      .get(`http://localhost:8080/lich_su_hoa_don/getLichSuHoaDons/${id}`)
      .then((res) => {
        const data = res.data;
        console.log(res.data);
        setRowsLichSu(
          data.map((item, index) => {
            return {
              ...item,
              description: listTitleTimline[index].title,
            };
          })
        );
        setCurrentTimeLine(data.length);

        setListTimeLineOnline(
          data.map((item, index) => {
            return {
              ...item,
              subtitle: format(
                new Date(item.ngayTao),
                " hh:mm:ss ,   dd-MM-yyyy"
              ),
              description: listTitleTimline[index].title,
              icon: listTitleTimline[index].icon,
            };
          })
        );

        console.log(listTimeLineOnline);
      })
      .catch((err) => {
        console.log(err);
      });
    //  for (let index = 0; index < rowsLichSu.length; index++) {

    //  }
  };

  const getInfoHD = async () => {
    const res = await axios.get(
      `http://localhost:8080/hoa_don/getHoaDon/${id}`
    );
    const data = await res.data;
    setMoney({
      tienGiam: data.tienGiam,
      tienHang: data.tongTien + data.tienGiam,
      tienShip: data.tienShip,
      tongTien: data.tongTien + data.tienShip,
    });
    setInfo(data);
    console.log(data);
  };

  return (
    <>
      {contextHolder}

      <div className="conatiner mx-auto space-y-5">
        <div className="row timeline bg-white">
          <div className="row timeline justify-center" style={{ height: 300 }}>
            {info.loaiHd === 0 ? (
              <Timeline minEvents={6} placeholder>
                {listTimeLineOnline.map((item) => (
                  <TimelineEvent
                    color="#9c2919"
                    icon={GiConfirmed}
                    title={item.description}
                    subtitle={item.subtitle}
                  />
                ))}
              </Timeline>
            ) : (
              <Timeline minEvents={1} placeholder>
                <TimelineEvent
                  color="#9c2919"
                  icon={TbPackages}
                  title="Thành công"
                  subtitle="dfasda"
                />
              </Timeline>
            )}
          </div>
          <div className="row button-contact p-4 grid grid-cols-2">
            <div className="row ">
              {currentTimeLine < 6 &&
              info.loaiHd === 0 &&
              info.trangThai != 6 ? (
                <Button
                  className="me-4"
                  color="blue"
                  type="primary"
                  onClick={showModal}
                  style={{ marginRight: 5 }}
                >
                  {listTitleTimline[currentTimeLine].title}
                </Button>
              ) : (
                ""
              )}

              <Modal
                title="Ghi Chú"
                style={{
                  top: 20,
                }}
                open={openTimeLine}
                onOk={hideModal}
                onCancel={hideModal}
                okText="Xác Nhận Thao Tác"
                cancelText="Hủy"
                footer={() => (
                  <>
                    <Button className="me-1" color="blue" onClick={hideModal}>
                      Hủy
                    </Button>
                    <Button color="red" onClick={onHandleTimeLineChange}>
                      Xác Nhận
                    </Button>
                  </>
                )}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Ghi chu ...."
                  // maxLength={}
                />
              </Modal>

              {/* modal in hoa đơn */}

              <Modal
                title="Xuất Hóa Đơn"
                open={isModalOpenHD}
                onOk={handleOkHD}
                onCancel={handleCancelHD}
                width={700}
                style={{ top: 10 }}
                footer={[
                  <Button
                    key="back"
                    onClick={handleCancelHD}
                    className="me-3 "
                    style={{ backgroundColor: "blue" }}
                  >
                    Cancel
                  </Button>,
                  <Button
                    key="submit"
                    type="primary"
                    onClick={handleOkHD}
                    style={{ backgroundColor: "red" }}
                  >
                    In Hóa Đơn
                  </Button>,
                ]}
              >
                <ComponentToPrint
                  ref={componentRef}
                  data={dataSource}
                  columns={columns}
                />
              </Modal>
              <Button className="me-4" color="green" onClick={showModalHD}>
                Xuất hoá đơn
              </Button>
            </div>
            <div className="row grid justify-items-end">
              <Button className="me-4" color="red" onClick={showModalLichSu}>
                Lịch Sử
              </Button>

              <Modal
                open={open}
                title="Lịch Sử Hóa Đơn"
                onOk={handleOkLichSu}
                onCancel={handleCancelLichSu}
                style={{ top: 20 }}
                footer={() => (
                  <>
                    <Button onClick={handleCancelLichSu}>OK</Button>
                  </>
                )}
              >
                <div className="divide-y divide-blue-200">
                  {rowsLichSu.map((item) => (
                    <div className="mb-4">
                      <p>
                        <span className="font-bold">Trạng Thái : </span>
                        &nbsp;&nbsp;
                        {item.description}
                      </p>
                      <p>
                        <span className="font-bold">Mã Nhân Viên : </span>
                        &nbsp;&nbsp;
                        {item.id_hoa_don.id_nhan_vien.ma}
                      </p>
                      <p>
                        <span className="font-bold">Tên Nhân Viên : </span>
                        &nbsp;&nbsp;
                        {item.id_hoa_don.id_nhan_vien.ten}
                      </p>
                      <p>
                        <span className="font-bold">Thoi gian : </span>
                        &nbsp;&nbsp;
                        {format(
                          new Date(item.ngayTao),
                          " hh:mm:ss ,   dd-MM-yyyy"
                        )}
                      </p>
                      <p>
                        <span className="font-bold">Nguoi xac nhan : </span>
                        &nbsp;&nbsp;
                        {item.id_hoa_don.nguoiXacNhan == null
                          ? "Admin"
                          : item.id_hoa_don.nguoiXacNhan.ten}
                      </p>
                    </div>
                  ))}
                </div>
              </Modal>
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
                {rowsSPCT.map((item) => (
                  <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                    <img
                      src={item.imageUrl}
                      alt="product-image"
                      className="w-full rounded-lg sm:w-40 me-10"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <div className=" sm:mt-0" style={{ marginRight: 400 }}>
                        <h2 className="text-lg font-bold text-gray-900">
                          {item.name}
                        </h2>
                        <p className="mt-1 text-xs text-gray-700">
                          Size: {item.size}
                        </p>
                        <p className="font-bold text-gray-700">
                          x{item.quantity}
                        </p>
                      </div>

                      <div className=" space-x-4 mt-4">
                        <p className="font-bold text-red-500">
                          {Intl.NumberFormat().format(item.price)}&nbsp;₫
                        </p>
                      </div>

                      {/* <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6"></div> */}
                    </div>
                    <div className="row">
                      <Button
                        color="red"
                        onClick={() => onHandleDelete(item.id)}
                      >
                        Xóa
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div class="grid grid-rows-3 grid-flow-col gap-4">
                <div class="row-start-2 row-span-2 ..."></div>
                <div class="row-end-3 row-span-2 ..."></div>

                <div class="row-start-1 row-end-4 ...">
                  <div className="grid grid-cols-1 gap-x-8 gap-y-4 space-y-3">
                    <div className="grid grid-cols-2 gap-1  pt-3">
                      <p className="font-bold text-lg">Tiền Hàng : </p>
                      <p className="font-bold text-red-500">
                        {Intl.NumberFormat().format(money.tienHang)}&nbsp;₫
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-1  ">
                      <p className="font-bold text-lg"> Phí Vận Chuyển : </p>
                      <p className="font-bold text-red-500">
                        {Intl.NumberFormat().format(money.tienShip)}&nbsp;₫
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-1  ">
                      <p className="font-bold text-lg"> Tien Giam : </p>
                      <p className="font-bold text-red-500">
                        {Intl.NumberFormat().format(money.tienGiam)}&nbsp;₫
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-1  pe-3  ">
                      <p className="font-bold text-lg"> Tổng Tiền : </p>
                      <p className="font-bold text-red-500">
                        {Intl.NumberFormat().format(money.tongTien)}&nbsp;₫
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// const items = [
//   `Chờ xác nhận`,
//   `Xác Nhận`,
//   `Chờ Thanh Toán`,
//   `Chờ Vận Chuyển`,
//   `Giao Hàng`,
//   `Hoàn Thành`,
//   `Hủy`,
// ];

const listTitleTimline = [
  {
    title: "Chờ Xác Nhận",
    icon: { GiConfirmed },
  },
  {
    title: "Xác Nhận",
    icon: { GiConfirmed },
  },
  {
    title: "Chờ Thanh Toán",
    icon: { LuPackageCheck },
  },
  {
    title: "Chờ Vận Chuyển",
    icon: { FaFileInvoice },
  },
  {
    title: "Hoàn Thành",
    icon: { FaShippingFast },
  },
];

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
  // {
  //   key: "loaiGiaoDich",
  //   title: "Loại Giao Dịch",
  //   width: 110,
  //   dataIndex: "loaiGiaoDich",

  //   render: (_, record) =>
  //     record.loaiGiaoDich == 1 ? (
  //       <Tag color="green"> Thanh toán</Tag>
  //     ) : (
  //       <Tag color="red">Chưa thanh toán</Tag>
  //     ),
  // },
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

const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
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
];
