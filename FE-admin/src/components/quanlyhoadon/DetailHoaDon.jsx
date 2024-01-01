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
import { FiLoader } from "react-icons/fi";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { Spinner, Skeleton } from "@nextui-org/react";

export default function DetailHoaDon() {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [info, setInfo] = useState({});
  const [note, setNote] = useState("");
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
  // const success = (mess) => {
  //   messageApi.open({
  //     type: "success",
  //     content: mess,
  //   });
  //   getDataLichSuThanhToan();
  //   getInfoHD();
  //   getDataChiTietSanPham();
  // };

  // const error = () => {
  //   messageApi.open({
  //     type: "error",
  //     content: "Xóa Thất Bại",
  //   });
  // };

  const cancelHD = () => {
    Modal.confirm({
      title: `Bạn có muốn hủy hóa đơn này không ?`,
      okText: "Yes",
      okType: "danger",
      onOk: async () => {
        await axios
          .post(`http://localhost:8080/lich_su_hoa_don/add/${id}`, {
            moTaHoaDon: "Hủy Hóa Đơn",
            deleted: 1,
            nguoiTao: "Cam",
            ghiChu: note,
          })
          .then((response) => {
            toast.success("Hủy Thành Công");
            getDataLichSuThanhToan();
            getInfoHD();
            getDataChiTietSanPham();
            getDataLichSu();
          });
      },
    });
  };

  const addLichSuHoaDon = async () => {
    setIsLoading(true);
    hideModal();
    await axios
      .post(`http://localhost:8080/lich_su_hoa_don/add/${id}`, {
        moTaHoaDon: listTitleTimline[currentTimeLine].title,
        deleted: 1,
        nguoiTao: "Cam",
        ghiChu: note,
      })
      .then((response) => {
        setIsLoading(false);
        setCurrentTimeLine(currentTimeLine + 1);
        toast.success(`${listTitleTimline[currentTimeLine].title} thành công`);
        // success(`${listTitleTimline[currentTimeLine].title} thành công`);
        getDataLichSu();
      });
  };

  const onHandleTimeLineChange = () => {
    if (currentTimeLine < 6) {
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
    console.log(data);
    if (data.length != 0) {
      const list = data.map((item, index) => {
        return {
          id: index + 1,
          maGiaoDich: item.id_thanh_toan.ma_giao_dich,
          soTien: item.id_thanh_toan.soTien,
          trangThai: item.id_thanh_toan.hinhThuc,
          thoiGian: item.ngayTao,
          // loaiGiaoDich: item.id_thanh_toan.trangThai,
          phuongThucThanhToan: item.id_thanh_toan.hinhThuc,
          ghiChu: item.moTa,
          nguoiXacNhan: "Đông",
        };
      });
      setRowsLichSuThanhToan(list);
    }
  };

  const getDataChiTietSanPham = async () => {
    const res = await axios.get(
      "http://localhost:8080/hoa_don_chi_tiet/getHDCTByID/" + id
    );
    const data = await res.data;
    console.log("spct", res.data);
    setRowsSPCT(
      data.map((item, index) => {
        return {
          id: item.id_chi_tiet_san_pham.id,
          imageUrl: item.id_chi_tiet_san_pham.defaultImg,
          name: item.id_chi_tiet_san_pham.id_san_pham.ten,
          kichco: item.id_chi_tiet_san_pham.id_kich_co.ten,
          mausac: item.id_chi_tiet_san_pham.id_mau_sac.ten,
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
          .delete(
            `http://localhost:8080/hoa_don_chi_tiet/deleteHDCT/${id}/${idSPCT}`
          )
          .then((response) => {
            getDataLichSuThanhToan();
            getInfoHD();
            getDataChiTietSanPham();
            getDataLichSu();
            toast.success("Xóa thành công");
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
        setIsLoading(true);
        setRowsLichSu(
          data.map((item, index) => {
            return {
              ...item,
              description: item.moTaHoaDon,
            };
          })
        );
        setCurrentTimeLine(data.length);

        setListTimeLineOnline(
          data.map((item, index) => {
            return {
              ...item,
              subtitle: format(new Date(item.ngayTao), " hh:mm:ss ,dd-MM-yyyy"),
              description: item.moTaHoaDon,
              icon:
                item.moTaHoaDon == "Hủy Hóa Đơn"
                  ? MdCancel
                  : listTitleTimline[index].icon,
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
      "http://localhost:8080/hoa_don/getHoaDon/" + id
    );
    const data = await res.data;
    console.log(data);
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
              <Skeleton isLoaded={isLoading} className="rounded-lg">
                <Timeline minEvents={5} placeholder>
                  {listTimeLineOnline.map((item, i) => (
                    <TimelineEvent
                      color="#9c2919"
                      // icon={<TbPackages />}
                      icon={item.icon}
                      title={item.description}
                      subtitle={item.subtitle}
                    />
                  ))}
                </Timeline>
              </Skeleton>
            ) : (
              <Timeline minEvents={1} placeholder>
                {listTimeLineOnline.map((item, i) => (
                  <TimelineEvent
                    color="#9c2919"
                    icon={TbPackages}
                    title="Thành công"
                    subtitle={item.subtitle}
                  />
                ))}
              </Timeline>
            )}
          </div>

          <div className="row button-contact p-4 grid grid-cols-2">
            <div className="row ">
              {currentTimeLine < 5 &&
              info.loaiHd === 0 &&
              info.trangThai != 5 ? (
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
                  value={note}
                  onChange={(e) => {
                    setNote(e.target.value);
                  }}
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
              {listTimeLineOnline.length < 4 &&
                info.loaiHd == !1 &&
                info.trangThai < 4 && (
                  <Button className="me-4" color="red" onClick={cancelHD}>
                    Hủy Hóa Đơn
                  </Button>
                )}
            </div>
            <div className="row grid justify-items-end">
              <Button
                className="me-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                onClick={showModalLichSu}
              >
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
                      {item.ghiChu && (
                        <p>
                          <span className="font-bold">Ghi Chú : </span>
                          &nbsp;&nbsp;
                          {item.ghiChu}
                        </p>
                      )}

                      <p>
                        <span className="font-bold">Mã Nhân Viên : </span>
                        &nbsp;&nbsp;
                        {item?.id_hoa_don?.id_nhan_vien?.ma}
                      </p>
                      <p>
                        <span className="font-bold">Tên Nhân Viên : </span>
                        &nbsp;&nbsp;
                        {item?.id_hoa_don?.id_nhan_vien?.ten}
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
                  <p> {info.tenKhachHang}</p>
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

                    <div
                      className="flex cols-3 gap-4"
                      style={{ marginRight: 200 }}
                    >
                      <div className=" sm:mt-0" style={{ marginRight: 300 }}>
                        <h2 className="text-lg font-medium text-gray-900 mb-3">
                          {item.name}
                          {item.mausac.substring(3)}
                        </h2>
                        <p className="mb-3  font-medium text-gray-900">
                          Size: {item.kichco}
                        </p>
                        <p className="font-medium text-gray-900 mb-3">
                          Số lượng :{" "}
                          <span className="font-medium text-red-500 mb-3">
                            {item.quantity}
                          </span>{" "}
                          sản phẩm
                        </p>
                        <p className="font-medium text-gray-900 mb-3">
                          Đơn giá :{" "}
                          <span className="font-medium text-red-500 mb-3">
                            {Intl.NumberFormat().format(item.price)} &nbsp;₫
                          </span>
                        </p>
                      </div>

                      <div className=" space-x-4 mt-4 me-4">
                        <p className="font-medium text-red-500">
                          {Intl.NumberFormat().format(
                            item.price * item.quantity
                          )}
                          &nbsp;₫
                        </p>
                      </div>

                      <div className="row">
                        <Button
                          color="red"
                          onClick={() => onHandleDelete(item.id)}
                          disabled
                        >
                          Trả Hàng
                        </Button>
                      </div>

                      {/* <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6"></div> */}
                    </div>
                  </div>
                ))}
              </div>

              <div class="flex justify-end me-4">
                <div>
                  <div className="grid grid-cols-2 gap-1  pt-3">
                    <p className="font-normal text-lg">Tiền Hàng : </p>
                    <p
                      className="font-normal text-red-500"
                      style={{ fontSize: "16px" }}
                    >
                      {Intl.NumberFormat().format(money.tienHang)}&nbsp;₫
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-1  ">
                    <p className="font-normal text-lg"> Phí Vận Chuyển : </p>
                    <p
                      className="font-normal text-red-500"
                      style={{ fontSize: "16px" }}
                    >
                      {Intl.NumberFormat().format(money.tienShip)}&nbsp;₫
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-1  ">
                    <p className="font-normal text-lg"> Tien Giam : </p>
                    <p
                      className="font-normal text-red-500"
                      style={{ fontSize: "16px" }}
                    >
                      {Intl.NumberFormat().format(money.tienGiam)}&nbsp;₫
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-1  pe-3  ">
                    <p className="font-normal text-lg"> Tổng Tiền : </p>
                    <p
                      className="font-normal text-red-500"
                      style={{ fontSize: "16px" }}
                    >
                      {Intl.NumberFormat().format(money.tongTien)}&nbsp;₫
                    </p>
                  </div>
                </div>
              </div>

              {/* <div class="grid grid-rows-3 grid-flow-col gap-4">
                <div class="row-start-2 row-span-2 ..."></div>
                <div class="row-end-3 row-span-2 ..."></div>

                <div class="row-start-1 row-end-4 ...">
                  <div className="grid grid-cols-1 gap-x-8 gap-y-4 space-y-3">
                    
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const listTitleTimline = [
  {
    title: `Chờ xác nhận`,
    icon: FiLoader,
  },
  // {
  //   title: `Xác Nhận`,
  //   icon: GiConfirmed,
  // },
  {
    title: `Chờ Vận Chuyển`,
    icon: FaShippingFast,
  },
  {
    title: `Giao Hàng`,
    icon: FaMoneyBillTransfer,
  },
  {
    title: `Hoàn Thành`,
    icon: LuPackageCheck,
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
