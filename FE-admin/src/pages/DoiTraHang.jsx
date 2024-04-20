import { Button, Input, Table, Space, InputNumber } from "antd";
import React, { useState, useRef } from "react";
import { FaShippingFast } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa6";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { Tooltip } from "antd";
import { Result } from "antd";
import axios from "axios";
import InforBill from "../components/tra_hang/InforBill";
import { IoIosAddCircleOutline } from "react-icons/io";
import { HiOutlineMinusCircle } from "react-icons/hi";
// To use Html5QrcodeScanner (more info below)
import { Html5QrcodeScanner } from "html5-qrcode";
import { QrReader } from "react-qr-reader";
import { CiWarning } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "antd";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TbInfoTriangle,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// To use Html5Qrcode (more info below)
import { Html5Qrcode } from "html5-qrcode";
import InHoaDonTra from "../components/thu_chi/InHoaDonTra";
const { TextArea } = Input;

function AfterSearch({ hdDoiTra }) {
  const [maHD, setMaHD] = useState("");
  const [hdChosed, setHdChosed] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [hdTra, setHDtra] = useState([]);
  const [inforKH, setInforKH] = useState(null);
  const [tongTien, setTongTien] = useState(0);
  const [tienTra, setTienTra] = useState(0);
  const [tienTongSauTra, setTienTongSauTra] = useState(0);
  const [tienGiam, setTienGiam] = useState(0);
  const [soLuongHoanTra, setSoLuongHoanTra] = useState(0);

  const navigate = useNavigate();
  const componentRef = useRef();

  const [result, setResult] = useState(""); // Lưu trữ kết quả quét
  const [modalOpen, setModalOpen] = useState(false); // Trạng thái mở/closed của modal

  // comfirm tra hàng
  const [traHangConfirmationOpen, setTraHangConfirmationOpen] = useState(false);
  const [isModalOpenHD, setIsModalOpenHD] = useState(false);
  const getData = async () => {
    if (maHD == "" || maHD == null) {
      setInforKH(null);
      setTongTien(0);
      setTienGiam(0);
      setHDtra([]);
      setHdChosed([]);
      toast("Bạn chưa nhập hóa đơn ✍🏻✍🏻✍🏻✍🏻");
    } else {
      await axios
        .get(`http://localhost:8080/hoa_don_chi_tiet/getHDDoiTra/${maHD}`)
        .then((res) => {
          setInforKH(null);
          setTongTien(0);
          setTienGiam(0);
          setHDtra([]);
          setHdChosed([]);
          console.log(res.data.listHDCT);
          const dataCheck = res.data.listHDCT.filter(
            (item) => item.deleted == 1
          );
          console.log(dataCheck);
          setHdChosed(
            dataCheck.map((res, i) => {
              return {
                ...res,
                ma: res.id_chi_tiet_san_pham.ma,
                key: res.id_chi_tiet_san_pham.ma,
                quantity: res.soLuong,
              };
            })
          );
          if (dataCheck.length > 0) {
            console.log(res.data.hoaDon);
            setInforKH(res.data.hoaDon);
            setTongTien(res.data.hoaDon.tongTien);
            setTienGiam(res.data.hoaDon?.id_voucher?.giaTriMax);
          }

          setHDtra([]);
        })
        .catch((err) => {
          setInforKH(null);
          setTongTien(0);
          setTienGiam(0);
          setHDtra([]);
          setHdChosed([]);
          setSoLuongHoanTra(0);
          toast("Hóa đơn không hợp lệ 😞😞😞😞");
        });
    }
  };

  //const handleChange = (selectedRowKeys, selectedRows) => {
  // if (selectedRows.length == 0) {
  //   const updatedHdChosed = hdChosed.map((hd) => {
  //     return { ...hd, quantity: hd.soLuong, ghiChu: "Sản phẩm lỗi" };
  //   });

  //   setHdChosed(updatedHdChosed);
  // }
  // const updatedHdChosed = hdChosed.map((hd) => {
  //   const selected = selectedRows.find((row) => row.ma === hd.ma);
  //   if (selected) {
  //     return { ...hd, quantity: 0 };
  //   }
  //   return { ...hd, quantity: hd.soLuong };
  // });

  // if (hdTra.length > 0) {
  //   const updatedHdTra = selectedRows.map((hd) => {
  //     const selected = hdTra.find((row) => row.ma === hd.ma);
  //     if (selected) {
  //       return {
  //         ...hd,
  //         quantity: hd.soLuong - hd.quantity,
  //         ghiChu: hd.ghiChu,
  //       };
  //     }
  //     return { ...hd, quantity: hd.soLuong, ghiChu: "Sản phẩm lỗi" };
  //   });
  //   console.log(updatedHdTra);
  //   setHDtra(updatedHdTra);
  //   const soLuongHoan = updatedHdTra.reduce((total, hd) => {
  //     return total + hd.quantity;
  //   }, 0);

  //   setSoLuongHoanTra(soLuongHoan);
  //   const tongConLai = updatedHdTra.reduce((total, hd) => {
  //     return total + hd.id_chi_tiet_san_pham.giaBan * hd.quantity;
  //   }, 0);

  //   setTienTongSauTra(tongTien - tongConLai);
  //   console.log(tongConLai);
  //   getVoucherWhenSelected(tongConLai);
  // } else {
  //   const updatedHdTra = selectedRows.map((hd) => {
  //     return { ...hd, quantity: hd.soLuong, ghiChu: "Sản phẩm lỗi" };
  //   });
  //   setHDtra(updatedHdTra);
  //   const soLuongHoan = updatedHdTra.reduce((total, hd) => {
  //     return total + hd.quantity;
  //   }, 0);

  //   setSoLuongHoanTra(soLuongHoan);
  //   const tongConLai = updatedHdTra.reduce((total, hd) => {
  //     return total + hd.id_chi_tiet_san_pham.giaBan * hd.quantity;
  //   }, 0);

  //   setTienTongSauTra(tongTien - tongConLai);
  //   console.log(tongConLai);
  //   getVoucherWhenSelected(tongConLai);
  // }

  // // const updatedHdTra = selectedRows.map((hd) => {
  // //   return { ...hd, quantity: hd.soLuong, ghiChu: "Sản phẩm lỗi" };

  // // });
  // console.log(selectedRows);
  // console.log(updatedHdTra);
  // setHDtra(updatedHdTra);
  // setSelectedRowKeys(selectedRowKeys);
  // setHdChosed(updatedHdChosed);
  //console.log(updatedHdChosed);

  // const tongConLai = updatedHdChosed.reduce((total, hd) => {
  //   return total + hd.giaTien;
  // }, 0);
  // console.log(updatedHdChosed);

  // const tongConLai = hdTra.reduce((total, hd) => {
  //   return total + hd.id_chi_tiet_san_pham.giaBan * hd.quantity;
  // }, 0);

  // setTienTongSauTra(tongTien - tongConLai);
  // console.log(tongConLai);
  // getVoucherWhenSelected(tongConLai);
  //};
  const handleChange = (selectedRowKeys, selectedRows) => {
    if (selectedRows.length == 0) {
      const updatedHdChosed = hdChosed.map((hd) => {
        return { ...hd, quantity: hd.soLuong, ghiChu: "Sản phẩm lỗi" };
      });

      setHdChosed(updatedHdChosed);
    }
    const updatedHdChosed = hdChosed.map((hd) => {
      const selected = selectedRows.find((row) => row.ma === hd.ma);
      if (selected) {
        return { ...hd, quantity: 0 };
      }
      return { ...hd, quantity: hd.soLuong };
    });

    const updatedHdTra = selectedRows.map((hd) => {
      return { ...hd, quantity: hd.soLuong, ghiChu: "Sản phẩm lỗi" };
    });
    setHDtra(updatedHdTra);
    setSelectedRowKeys(selectedRowKeys);
    setHdChosed(updatedHdChosed);
    console.log(updatedHdChosed);
    console.log(selectedRows);

    const tongConLai = updatedHdChosed.reduce((total, hd) => {
      return total + hd.id_chi_tiet_san_pham.giaBan * hd.quantity;
    }, 0);
    // const tongConLai = updatedHdChosed.reduce((total, hd) => {
    //   return total + hd.giaTien;
    // }, 0);

    const soLuongHoan = updatedHdTra.reduce((total, hd) => {
      return total + hd.quantity;
    }, 0);

    setSoLuongHoanTra(soLuongHoan);

    setTienTongSauTra(tongConLai);
    console.log(tongConLai);
    getVoucherWhenSelected(tongConLai);
  };

  const getVoucherWhenSelected = async (tongConLai) => {
    if (maHD != null) {
      await axios
        .post(
          `http://localhost:8080/hoa_don_chi_tiet/updateHDVoucher/${maHD}`,
          {
            tongTienSauTra: tongConLai,
          }
        )
        .then((res) => {
          console.log();
          setInforKH(res.data.hoaDon);

          setTienGiam(
            res.data.hoaDon?.id_voucher == null
              ? 0
              : res.data.hoaDon?.id_voucher?.giaTriMax
          );
        });
    }
  };
  const handleTraHang = async () => {
    // console.log(hdChosed);
    // console.log(hdTra);

    if (hdTra.length > 0) {
      await axios
        .post(`http://localhost:8080/hoa_don_chi_tiet/updateHDDoiTra/${maHD}`, {
          tongTienSauTra: tienTongSauTra,
          listSPST: hdChosed,
          listSPCTDoiTra: hdTra,
        })
        .then((res) => {
          toast("Trả hàng thành công 🎉🎉🎉🎉");
          cancelTraHang();
          setIsModalOpenHD(true);
          setTimeout(() => {
            navigate(`/quan-ly-hoa-don/detail-hoa-don/${inforKH.id}`);
          }, 2000);
        });
      cancelTraHang();
    }
  };

  // in hoa đơn

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

      // Convert PDF to Blob
      const pdfBlob = pdf.output("blob");

      // Create object URL for the Blob
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Calculate position for centering the print window
      const windowHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      const windowWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      const popupWidth = 1200; // Width of the print window
      const popupHeight = 950; // Height of the print window
      const left = (windowWidth - popupWidth) / 2;
      const top = (windowHeight - popupHeight) / 2;

      // Open print dialog with the PDF
      window.open(
        pdfUrl,
        "_blank",
        `location=yes,height=${popupHeight},width=${popupWidth},scrollbars=yes,status=yes,top=${top},left=${left}`
      );
    });
    setIsModalOpenHD(false);
    // const input = componentRef.current;
    // html2canvas(input).then((canvas) => {
    //   const imgData = canvas.toDataURL("image/png");
    //   const pdf = new jsPDF("p", "mm", "a4", true);
    //   const pdfHeight = pdf.internal.pageSize.getHeight();
    //   const pdfWidth = pdf.internal.pageSize.getWidth();
    //   const imgWidth = canvas.width;
    //   const imgHeight = canvas.height;
    //   const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    //   const imgX = (pdfWidth - imgWidth * ratio) / 2;
    //   const imgY = 20;
    //   pdf.addImage(
    //     imgData,
    //     "PNG",
    //     imgX,
    //     imgY,
    //     imgWidth * ratio,
    //     imgHeight * ratio
    //   );
    //   pdf.save(`billHD_${format(new Date(), " hh-mm-ss, dd-MM-yyyy")}`);
    // });
    // setIsModalOpenHD(false);
  };

  const cancelTraHang = () => {
    setTraHangConfirmationOpen(false);
  };

  const columns = [
    {
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: "Sản phẩm",
      dataIndex: "sanPham",
      key: "sanPham",
      render: (_, record) => (
        <div style={{ borderBottom: 2 }}>
          <div>
            <div className="flex items-center w-full space-x-4">
              <img
                src={record.id_chi_tiet_san_pham.defaultImg}
                alt="product-image"
                style={{ width: "70px" }}
              />
              <div>
                <div className=" sm:mt-0">
                  <p className=" font-medium text-gray-900 mb-3">
                    {record.id_chi_tiet_san_pham.ten} "
                    {record.id_chi_tiet_san_pham.id_mau_sac.ten}" [
                    {record.id_chi_tiet_san_pham.id_kich_co.ten}]
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Số Lượng",
      dataIndex: "soLuong",
      key: "soLuong",
    },
    {
      title: "Đơn giá",
      dataIndex: "giaTien",
      key: "giaTien",
      render: (_, record) => (
        <div style={{ borderBottom: 2 }}>
          <Space size="middle">
            <span>
              {Intl.NumberFormat().format(record.id_chi_tiet_san_pham.giaBan)}{" "}
              VND
            </span>
          </Space>
        </div>
      ),
    },

    {
      title: "Thành tiền",
      dataIndex: "giaTien",
      key: "giaTien",
      render: (_, record) => (
        <div style={{ borderBottom: 2 }}>
          <Space size="middle">
            <span>{Intl.NumberFormat().format(record.giaTien)} VND</span>
          </Space>
        </div>
      ),
    },
  ];

  const columnsTra = [
    {
      title: "Sản phẩm",
      dataIndex: "sanPham",
      align: "center",
      key: "sanPham",
      render: (_, record) => (
        <div style={{ borderBottom: 2 }}>
          <div>
            <div className="flex items-center w-full space-x-4">
              <img
                src={record.id_chi_tiet_san_pham.defaultImg}
                alt="product-image"
                style={{ width: "70px" }}
                // className="w-full rounded-lg sm:w-40 me-10 object-contain"
              />
              <div>
                <div className=" sm:mt-0">
                  <p className=" font-medium text-gray-900 mb-3">
                    {record.id_chi_tiet_san_pham.ten} "
                    {record.id_chi_tiet_san_pham.id_mau_sac.ten}" [
                    {record.id_chi_tiet_san_pham.id_kich_co.ten}]
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Số Lượng",
      dataIndex: "quantity",
      align: "center",
      key: "quantity",
      render: (_, record) => (
        <Space size="middle">
          <Button
            style={{ backgroundColor: "#c0b1b1", borderRadius: "50%" }}
            onClick={() => handleDecreaseQuantity(record.ma)}
          >
            <HiOutlineMinusCircle style={{ color: "white" }} />
          </Button>
          <InputNumber
            readOnly
            value={record.quantity}
            onChange={(value) => handleQuantityChange(record.ma, value)}
            style={{ width: 70, textAlign: "center", justifyContent: "center" }}
          />
          /{record.soLuong}
          <Button
            style={{ backgroundColor: "#c0b1b1", borderRadius: "50%" }}
            onClick={() => handleIncreaseQuantity(record.ma)}
          >
            <IoIosAddCircleOutline style={{ color: "white" }} />
          </Button>
        </Space>
      ),
    },

    {
      title: "Đơn giá",
      dataIndex: "giaTien",
      align: "center",
      key: "giaTien",
      render: (_, record) => (
        <div style={{ borderBottom: 2 }}>
          <Space size="middle">
            <span>
              {Intl.NumberFormat().format(record.id_chi_tiet_san_pham.giaBan)}{" "}
              VND
            </span>
          </Space>
        </div>
      ),
    },
    {
      title: "Ghi chú",
      dataIndex: "ghiChu",
      align: "center",
      key: "ghiChu",
      render: (_, record) => (
        <div style={{ borderBottom: 2 }}>
          <Space size="middle">
            <TextArea
              value={record.ghiChu}
              onChange={(e) => handleNoteChange(record.ma, e.target.value)}
              placeholder="Controlled autosize"
              autoSize={{
                minRows: 3,
                maxRows: 5,
              }}
            />
          </Space>
        </div>
      ),
    },
  ];
  const handleNoteChange = (ma, value) => {
    const updatedHdChosed = hdTra.map((hd) => {
      if (hd.ma === ma) {
        return { ...hd, ghiChu: value };
      }
      return hd;
    });

    setHDtra(updatedHdChosed);
  };

  const handleDecreaseQuantity = (ma) => {
    const updatedHdTra = hdTra.map((hd) => {
      if (hd.ma === ma && hd.quantity > 1) {
        const updatedHdChosed = hdChosed.map((hd) => {
          if (hd.ma === ma) {
            return { ...hd, quantity: hd.quantity + 1 };
          }
          return hd;
        });
        setHdChosed(updatedHdChosed);
        // const tongConLai = updatedHdChosed.reduce((total, hd) => {
        //   return total + hd.giaTien * hd.quantity;
        // }, 0);

        const tongConLai = updatedHdChosed.reduce((total, hd) => {
          return total + hd.id_chi_tiet_san_pham.giaBan * hd.quantity;
        }, 0);

        setTienTongSauTra(tongConLai);
        console.log(tongConLai);

        getVoucherWhenSelected(tongConLai);
        return { ...hd, quantity: hd.quantity - 1 };
      }
      return hd;
    });

    setHDtra(updatedHdTra);
    const soLuongHoan = updatedHdTra.reduce((total, hd) => {
      return total + hd.quantity;
    }, 0);

    setSoLuongHoanTra(soLuongHoan);
  };

  const handleIncreaseQuantity = (ma) => {
    const updatedHdTra = hdTra.map((hd) => {
      if (hd.ma === ma && hd.quantity < hd.soLuong) {
        const updatedHdChosed = hdChosed.map((hd) => {
          if (hd.ma === ma) {
            return { ...hd, quantity: hd.quantity - 1 };
          }
          return hd;
        });
        // const tongConLai = updatedHdChosed.reduce((total, hd) => {
        //   return total + hd.giaTien * hd.quantity;
        // }, 0);
        const tongConLai = updatedHdChosed.reduce((total, hd) => {
          return total + hd.id_chi_tiet_san_pham.giaBan * hd.quantity;
        }, 0);
        setTienTongSauTra(tongConLai);
        console.log(tongConLai);
        getVoucherWhenSelected(tongConLai);
        setHdChosed(updatedHdChosed);
        return { ...hd, quantity: hd.quantity + 1 };
      }
      return hd;
    });

    setHDtra(updatedHdTra);
    const soLuongHoan = updatedHdTra.reduce((total, hd) => {
      return total + hd.quantity;
    }, 0);

    setSoLuongHoanTra(soLuongHoan);
  };

  const handleQuantityChange = (ma, value) => {
    const updatedHdChosed = hdChosed.map((hd) => {
      if (hd.ma === ma && value >= 0 && value <= hd.soLuong) {
        return { ...hd, quantity: value };
      }
      return hd;
    });
    setHdChosed(updatedHdChosed);
  };

  const handleScan = (data) => {
    if (data) {
      setResult(data); // Lưu kết quả quét
      setModalOpen(false); // Đóng modal sau khi có kết quả
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const openModal = () => {
    setModalOpen(true); // Mở modal để bắt đầu quét
  };

  const closeModal = () => {
    setModalOpen(false); // Đóng modal
  };

  const handleCancelHD = () => {
    setIsModalOpenHD(false);
    navigate("/quan-ly-hoa-don");
  };

  return (
    <div
      className="font-normal border-gray-500 text-lg mb-5 gap-4"
      style={{
        backgroundColor: "white",
        padding: "10px",
        borderRadius: "8px",
        width: "100%",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
        transition: "transform 0.2s",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className="icon-title">
        <FaShippingFast style={{ display: "inline", fontSize: 30 }} />{" "}
        <span>Trả hàng</span>
      </div>

      <div
        className="filter-scan flex justify-center mt-5
        space-x-8
      "
      >
        <div className="flex items-center">
          <FaClipboardList /> <p>Mã hóa đơn</p>
        </div>
        <div className="flex space-x-4 items-center">
          <Input
            placeholder="Mời nhập mã hóa đơn"
            size="large"
            style={{ width: 300 }}
            value={maHD}
            onChange={(e) => setMaHD(e.target.value)}
          />
          <Button size="large" onClick={() => getData()}>
            Tìm kiếm
          </Button>
        </div>
        <div className="flex items-center">
          <Tooltip title="Quét mã hóa đơn">
            <Button size="large">
              <MdOutlineQrCodeScanner />
            </Button>
          </Tooltip>
        </div>

        <div>
          {/* Nút bấm để mở modal quét */}
          <button onClick={openModal}>Mở màn hình quét</button>

          {/* Modal cho màn hình quét */}
          {modalOpen && (
            <div className="modal">
              <div className="modal-content">
                {/* Component QrReader */}
                <QrReader
                  delay={300}
                  onError={handleError}
                  onScan={handleScan} // Thay đổi onResult thành onScan
                  style={{ width: "100%" }}
                />
                {/* Nút đóng modal */}
                <button onClick={closeModal}>Đóng màn hình quét</button>
              </div>
            </div>
          )}

          {/* Hiển thị kết quả quét */}
          <p>{result}</p>
        </div>
      </div>
      <div className="infor mt-5">
        <div
          className="font-normal border-gray-500 text-lg mb-5 gap-4 mt-4"
          style={{
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "8px",
            width: "100%",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            transition: "transform 0.2s",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p> Sản phẩm cần trả </p>
          <Table
            columns={columns}
            dataSource={hdChosed}
            rowSelection={{
              selectedRowKeys,
              onChange: handleChange,
            }}
            pagination={false}
          />
          {/*
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={hdChosed}
            pagination={false}
          /> */}
        </div>

        <div
          className="font-normal border-gray-500 text-lg mb-5 gap-4 mt-4

      "
        >
          <div className="flex space-x-4  ">
            <div
              className="w-2/3 ..."
              style={{
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "8px",
                //width: "100%",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.2s",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p>Danh sách sản phẩm </p>
              <Table
                columns={columnsTra}
                dataSource={hdTra}
                pagination={false}
              />
            </div>
            <div
              className="w-1/3 ..."
              style={{
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "8px",
                //width: "100%",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.2s",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p className="text-center mb-4">Thông tin trả hàng</p>

              <div
                className="infor mb-4 space-y-4"
                style={{
                  backgroundColor: "#c0b1b1",
                  borderRadius: 10,
                  padding: 10,
                }}
              >
                <p>
                  <span className="font-medium">Khách hàng</span> :{" "}
                  {inforKH?.tenKhachHang || "Khách lẻ"}
                </p>
                {/* <p>
                  <span className="font-medium">Người Nhận</span> : 
                </p> */}
                <p>
                  <span className="font-medium">SDT</span> : {inforKH?.sdt || "Khách lẻ"}
                </p>
                <p>
                  <span className="font-medium">Địa chỉ</span>:{" "}
                  {inforKH?.diaChi || "Khách lẻ"}
                </p>
              </div>
              <div
                className="tongGia mb-4 p-5
                space-y-8
              "
              >
                <p class="flex justify-between">
                  <span className="font-medium">Tổng tiền hóa đơn ban đầu</span>
                  <span className="italic ">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {Intl.NumberFormat().format(tongTien)} VND
                  </span>
                </p>
                <p class="flex justify-between">
                  <span className="font-medium">Tiền giảm giá</span>
                  <span className="italic ">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {Intl.NumberFormat().format(
                      inforKH == null
                        ? 0
                        : inforKH?.id_voucher == null
                        ? 0
                        : inforKH?.id_voucher?.giaTriMax
                    )}{" "}
                    VND
                  </span>
                </p>
                <p class="flex justify-between">
                  <span className="font-medium">Số lượng hoàn trả</span>
                  <span className="italic ">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {soLuongHoanTra} sản phẩm
                  </span>
                </p>

                <p class="flex justify-between">
                  <span className="font-medium">Số tiền hoàn trả</span>
                  <span className="italic ">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {Intl.NumberFormat().format(
                      hdTra.length > 0
                        ? tongTien - tienTongSauTra + tienGiam
                        : 0
                    )}{" "}
                    VND
                  </span>
                </p>

                <p class="flex justify-between">
                  <span className="font-medium">Số tiền hóa đơn sau hoàn </span>
                  <span className="italic ">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {Intl.NumberFormat().format(
                      hdTra.length > 0 ? tienTongSauTra : 0
                    )}{" "}
                    VND
                  </span>
                </p>
              </div>
              <div>
                <Button
                  disabled={hdTra.length > 0 ? false : true}
                  style={{
                    width: "100%",
                    backgroundColor: "black",
                    color: "white",
                    height: "50px",
                  }}
                  onClick={() => setTraHangConfirmationOpen(true)}
                >
                  TRẢ HÀNG
                </Button>
              </div>
            </div>
          </div>

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
            <InHoaDonTra
              ref={componentRef}
              dataTra={hdTra}
              dataHD={hdChosed}
              inforKH={inforKH}
              tongTienSauTra={tienTongSauTra}
              tongTien={tongTien}
              tienGiam={tienGiam}
            />
          </Modal>

          <Dialog open={traHangConfirmationOpen} handler={cancelTraHang}>
            <DialogHeader>
              <CiWarning style={{ color: "red", fontSize: 40 }} />
              <span>Cảnh báo</span>
            </DialogHeader>
            <DialogBody>
              <div className="grid justify-items-center">
                <span style={{ fontSize: 20 }}>
                  Bạn có muốn trả hàng không ?
                </span>
              </div>
            </DialogBody>
            <DialogFooter>
              <Button color="black" className="me-3" onClick={cancelTraHang}>
                Hủy
              </Button>
              <Button color="red" onClick={handleTraHang}>
                Xác Nhận
              </Button>
            </DialogFooter>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default AfterSearch;
