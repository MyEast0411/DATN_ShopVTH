import React, { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useParams } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import axios from "axios";
import { Table, Tag, message, Modal, Input, Tooltip } from "antd";
import { format } from "date-fns";
import { Timeline, TimelineEvent } from "@mailtop/horizontal-timeline";
import { GiConfirmed, GiReceiveMoney } from "react-icons/gi";
import { LuPackageCheck } from "react-icons/lu";
import { FaShippingFast, FaFileInvoice, FaPen, FaCircle } from "react-icons/fa";
import { TbPackages } from "react-icons/tb";
import { MdAddCircle } from "react-icons/md";
import {
  exportComponentAsJPEG,
  exportComponentAsPDF,
  exportComponentAsPNG,
} from "react-component-export-image";
// import { useReactToPrint } from "react-to-print";
import ComponentToPrint from "./InHoaDon";
import { toast } from "react-toastify";
import { FiLoader } from "react-icons/fi";
import { FaMoneyBillTransfer, FaPenClip, FaTrash } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { Spinner, Skeleton } from "@nextui-org/react";
import TableSanPham from "./TableSanPham";

export default function   DetailHoaDon() {
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
  // const [currentTimeLine, setCurrentTimeLine] = useState(0);
  const [listTimeLineOnline, setListTimeLineOnline] = useState([]);
  const [rowsLichSu, setRowsLichSu] = useState([]);

  // modal message
  const [messageApi, contextHolder] = message.useMessage();
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [openTimeLine, setOpenTimeLine] = useState(false);

  //  modal xuất hóa đơn
  // const componentRef = useRef();

  const [isModalOpenHD, setIsModalOpenHD] = useState(false);
  const showModalHD = () => {
    setIsModalOpenHD(true);
  };
  // updateSL
  const [spct, setSPCT] = useState({});

  // const pdfRef = useRef();
  const downloadPDF = () => {
    const input = componentRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 20;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save(`billHD_${format(new Date(), " hh-mm-ss, dd-MM-yyyy")}`);
    });
    setIsModalOpenHD(false);
  };
  // const handleOkHD = () => {
  //   exportComponentAsPDF(componentRef, {
  //     fileName: ,
  //   });

  // };
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

  // modal thêm sản phẩm
  const [isModalOpenThem, setIsModalOpenThem] = useState(false);
  const [soLuongSP, setSoLuongSP] = useState({});
  const showModalThem = () => {
    setIsModalOpenThem(true);
  };
  const handleOkThem = () => {
    setIsModalOpenThem(false);
  };
  const handleCancelThem = () => {
    setIsModalOpenThem(false);
  };

  // modal sl
  const [isModalOpenThemSL, setIsModalOpenThemSL] = useState(false);
  // const handleCancelThemSL = () => {
  //   setIsModalOpenThemSL(false);
  // };
  // const showModalThemSL = () => {
  //   setIsModalOpenThemSL(true);
  // };

  // const handleOkThemSL = async () => {
  //   await axios
  //     .post("http://localhost:8080/hoa_don_chi_tiet/addHDCT", {
  //       id_hoa_don: money.ma,
  //       id_san_pham: soLuongSP.id,
  //       so_luong: soLuongDat,
  //     })
  //     .then((response) => {
  //       toast("🎉 Thêm thành công");
  //     })
  //     .catch((error) => {
  //       toast(error.response.data);
  //     });

  //   setIsModalOpenThemSL(false);
  // };

  const componentRef = useRef();

  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  //   documentTitle: `billHD_${format(new Date(), " hh-mm-ss, dd-MM-yyyy")}`,
  //   imageOptions: { allowTaint: true, width: "100%", height: "100%" },
  //   onAfterPrint: (e) => console.log(e),
  // });

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
        moTaHoaDon: listTitleTimline[info.trangThai + 1].title,
        deleted: 1,
        nguoiTao: "Cam",
        ghiChu: note,
      })
      .then((response) => {
        setIsLoading(false);
        // setCurrentTimeLine(currentTimeLine + 1);
        // setCurrentTimeLine(response.data.trangThai);
        toast.success(`${listTitleTimline[info.trangThai].title} thành công`);
        // success(`${listTitleTimline[currentTimeLine].title} thành công`);
        getDataLichSu();
      });
  };

  const onHandleTimeLineChange = () => {
    if (info.trangThai < 6) {
      Modal.confirm({
        title: `Bạn có muốn ${
          listTitleTimline[info.trangThai + 1].title
        } không ?`,
        okText: "Yes",
        okType: "danger",
        onOk: () => {
          addLichSuHoaDon();
          getDataLichSuThanhToan();
          getInfoHD();
          getDataChiTietSanPham();
          getDataLichSu();
        },
      });
    } else {
      alert("Please select : ", info.trangThai);
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

  const getSPCT = (id) => {
    setSPCT((value) => (value = rowsSPCT.filter((sp) => sp.id == id)[0]));
  };

  // modal upcdate sp
  const [openSP, setOpenSP] = useState(false);

  const showModalLichSuSP = () => {
    setOpenSP(true);
  };
  const handleOkLichSuSP = () => {
    setOpenSP(false);
  };

  const handleCancelLichSuSP = () => {
    setOpenSP(false);
  };

  useEffect(() => {
    getDataLichSuThanhToan();
    getInfoHD();
    getDataChiTietSanPham();
    getDataLichSu();
  }, [rowsSPCT, info, money]);

  const getDataLichSuThanhToan = async () => {
    const res = await axios.get(`http://localhost:8080/htth/getHTTT/${id}`);
    const data = await res.data;

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

    setRowsSPCT(
      data.map((item, index) => {
        return {
          id: item.id_chi_tiet_san_pham.id,
          imageUrl: item.id_chi_tiet_san_pham.defaultImg,
          name: item.id_chi_tiet_san_pham.id_san_pham.ten,
          kichco: item.id_chi_tiet_san_pham.id_kich_co.ten,
          mausac: item.id_chi_tiet_san_pham.id_mau_sac.ten,
          quantity: item.soLuong,
          price: item.id_chi_tiet_san_pham.giaBan,
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

  const onHandleUpdate = (idSPCT) => {
    Modal.confirm({
      title: `bạn có muốn xóa sản phẩm không ?`,
      okText: "Yes",
      okType: "danger",
      onOk: async () => {
        const res = await axios
          .post(
            `http://localhost:8080/hoa_don_chi_tiet/update/${id}/${idSPCT}`,
            {
              quantity: spct.quantity,
            }
          )
          .then((response) => {
            getDataLichSuThanhToan();
            getInfoHD();
            getDataChiTietSanPham();
            getDataLichSu();
            toast.success("Update thành công");
          })
          .catch((e) => error());
      },
    });
    // alert(idSPCT);
    console.log(spct);
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
        // setCurrentTimeLine(data.length);

        setListTimeLineOnline(
          data.map((item, index) => {
            return {
              ...item,
              subtitle: format(new Date(item.ngayTao), " hh:mm:ss ,dd-MM-yyyy"),
              description: item.moTaHoaDon,
              icon:
                item.moTaHoaDon == "Hủy Hóa Đơn"
                  ? MdCancel
                  : FaMoneyBillTransfer,
            };
          })
        );

        // console.log(listTimeLineOnline);
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

    setMoney({
      tienGiam: data.tienGiam,

      // tienHang: data.tongTien,
      // tienShip: data.tienShip,
      // tongTien: data.tongTien + data.tienShip - data.tienGiam,

      tienHang: data.tongTien + data.tienGiam - data.tienShip,
      tienShip: data.tienShip,
      tongTien: data.tongTien,

      ma: data.ma,
    });
    setInfo(data);
  };

  return (
    <>
      {contextHolder}

      <div className="conatiner mx-auto space-y-5">
        <div className=" bg-white">
          <div
            className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
            style={{ width: "100%" }}
          >
            <div style={{ width: "3000px" }}>
              {info.loaiHd === 0 ? (
                // <Skeleton isLoaded={isLoading} className="rounded-lg">
                <Timeline minEvents={20} placeholder>
                  {listTimeLineOnline.map((item, i) => (
                    <TimelineEvent
                      key={i}
                      style={{ marginLeft: 0 }}
                      color="#9c2919"
                      icon={TbPackages}
                      title={
                        <p
                          style={{ fontSize: 12, marginTop: 10, width: "70%" }}
                        >
                          {item.description}
                        </p>
                      }
                      subtitle={
                        <p
                          style={{ fontSize: 12, marginTop: 10, width: "70%" }}
                        >
                          {item.subtitle}
                        </p>
                      }
                    />
                  ))}
                </Timeline>
              ) : (
                // </Skeleton>
                <Timeline minEvents={1} placeholder>
                  {listTimeLineOnline.map((item, i) => (
                    <TimelineEvent
                      color="#9c2919"
                      icon={TbPackages}
                      title={
                        <p style={{ fontSize: 12, marginTop: 10 }}>
                          {item.description}
                        </p>
                      }
                      subtitle={item.subtitle}
                    />
                  ))}
                </Timeline>
              )}
            </div>
          </div>
        </div>

        <div className="row button-contact p-4 grid grid-cols-2">
          <div className="row ">
            {info.loaiHd === 0 && info.trangThai != 4 ? (
              <Button
                className="me-4"
                color="blue"
                type="primary"
                onClick={showModal}
                style={{ marginRight: 5 }}
              >
                {listTitleTimline[info.trangThai].title}
                {/* {info.trangThai} */}
                {/* Bước Tiếp Theo */}
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
              // onOk={handleOkHD}
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
                  onClick={downloadPDF}
                  style={{ backgroundColor: "red" }}
                >
                  In Hóa Đơn
                </Button>,
              ]}
            >
              <ComponentToPrint
                ref={componentRef}
                data={rowsSPCT}
                columns={columns}
                inforKH={info}
              />
            </Modal>
            <Button className="me-4" color="green" onClick={showModalHD}>
              Xuất hoá đơn
            </Button>
            {info.loaiHd == !1 && info.trangThai < 4 && (
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
                {rowsLichSu.map((item, index) => (
                  <div className="mb-4" key={index}>
                    <p>
                      <span className="font-bold">Mô tả : </span>
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
          <div className="row  ">
            <div className="flex justify-between">
              <div>
                <p className="font-bold p-4 text-2xl"> Thông tin hóa đơn</p>
              </div>
              <div>
                <Button>Sửa địa chỉ</Button>
              </div>
            </div>
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
            <div className="flex justify-end">
              {info.trangThai < 4 && (
                <Button
                  onClick={() => {
                    showModalThem();
                    // getSPCT(item.id);
                  }}
                >
                  Thêm sản phẩm <MdAddCircle style={{ display: "inline" }} />
                </Button>
              )}

              <Modal
                onOk={handleOkThem}
                onCancel={handleCancelThem}
                open={isModalOpenThem}
                width={1500}
                footer={[]}
              >
                <div className="mt-5">
                  <TableSanPham gioHang={info.ma} setIsModalOpenThem={setIsModalOpenThem} getInfoHD={getInfoHD}/>
                </div>
              </Modal>
            </div>

            <div className="row divide-y-4 divide-slate-400/25">
              <div className="row table-san-pham ">
                {rowsSPCT.map((item, index) => (
                  <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start" key={index}>
                    <img
                      src={item.imageUrl}
                      alt="product-image"
                      className="w-full rounded-lg sm:w-40 me-10 object-contain"
                    />

                    <div className="flex justify-between w-full">
                      <div>
                        <div className=" sm:mt-0">
                          <h2 className="text-lg font-medium text-gray-900 mb-3">
                            {item.name}
                            {item.mausac.substring(3)}
                          </h2>
                          <p className="mb-3  font-medium text-gray-900">
                            Size: {item.kichco}
                          </p>
                          <p className="font-medium text-gray-900 mb-3">
                            Số lượng : {/* {check ? ( */}
                            <span className="font-medium text-red-500 mb-3">
                              {item.quantity}
                            </span>
                            sản phẩm
                          </p>
                          <p className="font-medium text-gray-900 mb-3">
                            Đơn giá :{" "}
                            <span className="font-medium text-red-500 mb-3">
                              {Intl.NumberFormat().format(item.price)} &nbsp;₫
                            </span>
                          </p>
                        </div>

                        <div className=" space-x-4 mt-4 me-4"></div>
                      </div>
                      <div className="inline-flex items-center gap-10">
                        <p className="font-medium text-red-500">
                          {Intl.NumberFormat().format(
                            item.price * item.quantity
                          )}
                          &nbsp;₫
                        </p>

                        {listTimeLineOnline.length < 4 &&
                          info.trangThai < 4 && (
                            <Tooltip title="Xóa sản phẩm" arrow={true}>
                            <Button
                              color="red"
                              onClick={() => onHandleDelete(item.id)}
                            >
                              <FaTrash />
                            </Button>
                            </Tooltip>
                          )}
                        {listTimeLineOnline.length < 4 &&
                          info.trangThai < 4 && (
                            <Tooltip title="Chỉnh sửa số lượng" arrow={true}>
                            <Button
                              color="yellow"
                              onClick={() => {
                                showModalLichSuSP();;
                                getSPCT(item.id);
                              }}
                            >
                              <FaPen />
                            </Button>
                            </Tooltip>
                          )}
                      </div>

                      {/* <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6"></div> */}
                    </div>
                  </div>
                ))}
              </div>
              <Modal
                open={openSP}
                title="Cập Nhật Sản Phảm"
                onOk={handleOkLichSuSP}
                onCancel={handleCancelLichSuSP}
                style={{ top: 20 }}
                footer={() => (
                  <>
                    <Button
                      color="yellow"
                      onClick={() => {
                        handleCancelLichSuSP();
                        onHandleUpdate(spct.id);
                      }}
                    >
                      <FaPen />
                    </Button>
                  </>
                )}
              >
                <div className="divide-y divide-blue-200">
                  <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                    <img
                      src={spct.imageUrl}
                      alt="product-image"
                      className="w-full rounded-lg sm:w-40 me-10 object-contain"
                    />

                    <div className="flex justify-between w-full">
                      <div>
                        <div className=" sm:mt-0">
                          <h2 className="text-lg font-medium text-gray-900 mb-3">
                            {spct.name}
                            {/* {spct.mausac.substring(3)} */}
                          </h2>
                          <p className="mb-3  font-medium text-gray-900">
                            Size: {spct.kichco}
                          </p>
                          <p className="font-medium text-gray-900 mb-3">
                            Số lượng : {/* {check ? ( */}
                            <Input
                              value={spct.quantity}
                              onChange={(e) =>
                                setSPCT({ ...spct, quantity: e.target.value })
                              }
                            />
                            sản phẩm
                          </p>
                          <p className="font-medium text-gray-900 mb-3">
                            Đơn giá :{" "}
                            <span className="font-medium text-red-500 mb-3">
                              {Intl.NumberFormat().format(spct.price)} &nbsp;₫
                            </span>
                          </p>
                        </div>

                        <div className=" space-x-4 mt-4 me-4"></div>
                      </div>
                      {/* <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6"></div> */}
                    </div>
                  </div>
                </div>
              </Modal>

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
                    <p className="font-normal text-lg"> Tiền giảm : </p>
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
                      {Intl.NumberFormat().format(money.tongTien)}
                      &nbsp;₫
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
  {
    title: `Xác Nhận`,
    icon: GiConfirmed,
  },
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
    render: (_, record) => (
      <span>
        {record.name}
        {" ( "}
        {record.mausac}
        {" , "}
        {record.kichco}
        {" ) "}
      </span>
    ),
  },
  {
    title: "Số lượng",
    dataIndex: "quantity",
    key: "quantity",
    render: (text) => <span>{text} sản phẩm</span>,
  },
  {
    title: "Đơn Giá",
    dataIndex: "price",
    key: "price",
    render: (text) => (
      <span className="text-red-300">{Intl.NumberFormat().format(text)} ₫</span>
    ),
  },
];
