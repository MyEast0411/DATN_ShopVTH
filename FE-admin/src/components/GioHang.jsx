import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@nextui-org/react";
import { Table as TableAntd, InputNumber } from "antd";
import {
  Button,
  Input,
  Switch,
  Button as MaterialButton,
} from "@material-tailwind/react";
import { TbInfoTriangle } from "react-icons/tb";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { CloseOutlined } from "@ant-design/icons";
import { QrReader } from "react-qr-reader";
import { Modal, Tag } from "antd";
import TableSanPhamChiTiet from "../common/table/sanPham/TableSanPhamChiTiet";
import TableHoaDon from "../common/table/sanPham/TableAllHoaDon";
import TableKhachHang from "./ban_hang/TableKhachHang";
import TableVoucher from "./ban_hang/TableVoucher";
// icons
import { BsQrCodeScan } from "react-icons/bs";
import CartItem from "./CartItem";
import Delivery from "./Delivery";
import { Link, useNavigate } from "react-router-dom";
import { MdPayments } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import { DeleteIcon } from "../common/otherComponents/DeleteIcon";

import axios from "axios";
import { toast } from "react-toastify";

const GioHang = ({
  columns,
  users,
  setItems,
  activeKey,
  changeData,
  updateSoLuong,
  onDataSelect,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenThem, setIsModalOpenThem] = useState(false);
  const [isModalOpenHD, setIsModalOpenHD] = useState(false);
  const [isModalOpenTT, setIsModalOpenTT] = useState(false);
  const [isModalOpenCK, setIsModalOpenCK] = useState(false);
  const [isModalOpenVoucher, setIsModalOpenVoucher] = useState(false);
  const [isModalOpenTK, setIsModalOpenTK] = useState(false);
  const [khachHang, setKhachHang] = useState({});
  const [tienKhachDua, setTienKhachDua] = useState("");
  const [tongTien, setTongTien] = useState("");
  const [tienHang, setTienHang] = useState("");
  const [tienShip, setTienShip] = useState("");
  const [tienThua, setTienThua] = useState("");
  const [khachCanTra, setKhachCanTra] = useState("");
  const [maGiaoDich, setMaGiaoDich] = useState("");
  const [voucher, setVoucher] = useState(0);
  const [codeVC, setCodeVC] = useState("");
  const [muaThem, setMuaThem] = useState("");
  const [duocGiam, setDuocGiam] = useState("");
  const [isModalOpenThemPhiShip, setIsModalOpenThemPhiShip] = useState(false);
  const [phiVanChuyen, setPhiVanChuyen] = useState("");
  const [ngayNhan, setNgayNhan] = useState("");

  const [tienMatConfirmationOpen, setTienMatConfirmationOpen] =
    React.useState(false);
  const textRef = useRef("");
  const navigate = useNavigate();
  const column = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Mã giao dịch",
      dataIndex: "maGiaoDich",
      key: "maGiaoDich",
    },
    {
      title: "Số tiền",
      dataIndex: "soTien",
      align: "center",
    },
    {
      title: "Phương thức",
      dataIndex: "phuongThuc",
      align: "center",
    },
    {
      dataIndex: "hanhDong",
      title: "Hành động",
      key: "hanhDong",
      ellipsis: true,
      render: (record, index) => {
        return {
          children: (
            <div className="flex items-center justify-center">
              <Tooltip color="danger" content="Xóa" showArrow={true}>
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon onClick={() => handleDelete(index)} />
                </span>
              </Tooltip>
            </div>
          ),
        };
      },
      align: "center",
    },
  ];
  const [inputValue, setInputValue] = useState(null);
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleTienMat = () => {
    setTienMatConfirmationOpen(true);
  };

  const cancelTienMat = () => {
    setTienMatConfirmationOpen(false);
  };

  const confirmTienMat = async () => {
    if (inputValue == null) {
      toast.error(`Chưa nhập tiền khách đưa`);
      cancelTienMat();
      return;
    }
    if (inputValue > tongTien) {
      setTienThua(inputValue - tongTien);
      setTienKhachDua(tongTien);
      setInputValue("");
    } else {
      setTienKhachDua(inputValue);
      setKhachCanTra(tongTien - inputValue);
      setInputValue("");
    }
    if (inputValue != null) {
      await axios
        .post("http://localhost:8080/thanh-toan/addThanhToan", {
          maHD: activeKey,
          maGiaoDich: "",
          soTien: inputValue,
          phuongThuc: "Tiền mặt",
        })
        .then((response) => {
          toast("🎉 Thêm thành công");
          getThanhToan();
          cancelTienMat();
        })
        .catch((error) => {
          toast("😢 Thêm thất bại");
        });
      cancelTienMat();
    }
  };

  const [thanhToan, setThanhToan] = useState([]);

  const getThanhToan = async () => {
    console.log(activeKey);
    await axios
      .get(`http://localhost:8080/htth/getThanhToan/${activeKey}`)
      .then((response) => {
        console.log(response.data);
        const updatedRows = response.data.map((item, index) => ({
          id: index + 1,
          id_hoa_don: item.id_hoa_don.id,
          id_thanh_toan: item.id_thanh_toan.id,
          maGiaoDich: item.id_thanh_toan.ma_giao_dich,
          soTien: Intl.NumberFormat().format(item.id_thanh_toan.soTien),
          phuongThuc: item.id_thanh_toan.hinhThuc,
        }));

        setThanhToan(updatedRows);
        console.log(updatedRows);

        const totalSoTien = updatedRows.reduce(
          (sum, row) => sum + parseFloat(row.soTien.replaceAll(".", "")),
          0
        );

        console.log(totalSoTien);

        setKhachCanTra(totalSoTien);
        setTienKhachDua(totalSoTien);

        setTienThua("");
        if (totalSoTien > tongTien) {
          setTienThua(totalSoTien - tongTien);
          setTienKhachDua(totalSoTien);
          setKhachCanTra("");
        } else if (totalSoTien == tongTien) {
          setTienThua("");
          setTienKhachDua(totalSoTien);
          setKhachCanTra("");
        } else if (totalSoTien < tongTien) {
          console.log(3);
          setKhachCanTra(tongTien - totalSoTien);
          setTienKhachDua(totalSoTien);
          setTienThua("");
        }
      });
  };
  const [listVoucher, setListVoucher] = useState([]);

  const getListVoucher = async () => {
    await axios
      .get(`http://localhost:8080/voucher/getVouchers`)
      .then((response) => {
        setListVoucher(response.data);
      });
  };
  useEffect(() => {
    getThanhToan();
    getListVoucher();
  }, []);
  const [thanhToanConfirmationOpen, setThanhToanConfirmationOpen] =
    useState(false);
  const handleThanhToan = () => {
    setThanhToanConfirmationOpen(true);
  };

  const cancelThanhToan = () => {
    setThanhToanConfirmationOpen(false);
  };
  const [diaChi, setDiaChi] = useState([]);
  const getDiaChi = async () => {
    const result = await axios.get(
      `http://localhost:8080/dia-chi/findDiaChiMacDinh/${khachHang.maKH}`
    );
    setDiaChi(result.data);
  };
  useEffect(() => {
    getDiaChi();
  }, [khachHang]);
  const confirmThanhToan = async () => {
    if (tienKhachDua < tongTien && isBlur == false) {
      toast.error(`Khách chưa trả đủ tiền`);
      cancelThanhToan();
      return;
    }
    try {
      if (isBlur == true) {
        if (khachHang.sdt == "" && khachHang.sdt == undefined) {
          toast.error("Bạn chưa nhập số điện thoại khách hàng");
          return;
        }
        if (khachHang.ten == "" && khachHang.ten == undefined) {
          toast.error("Bạn chưa nhập tên khách hàng");
          return;
        }
        console.log(diaChi);
        if (
          diaChi.thanhPho == "" ||
          diaChi.thanhPho == undefined ||
          diaChi.huyen == "" ||
          diaChi.huyen == undefined ||
          diaChi.xa == "" ||
          diaChi.xa == undefined ||
          diaChi.duong == undefined ||
          diaChi.duong == ""
        ) {
          toast.error("Bạn chưa chọn địa chỉ nhận hàng");
          return;
        }
        await axios
          .put(`http://localhost:8080/hoa_don/thanhToanHoaDon/${activeKey}`, {
            sdt: khachHang.sdt,
            tenKhachHang: khachHang.ten,
            maKH: khachHang.maKH,
            soTien: inputValue,
            tongTien: tongTien,
            diaChi:
              diaChi.duong +
              "," +
              diaChi.thanhPho +
              "," +
              diaChi.xa +
              "," +
              diaChi.huyen,
            trangThai: 1,
            ngayNhan: ngayNhan,
            loaiHd: 0, //1 - tại quầy 0 - online
          })
          .then((response) => {
            toast("🎉 Thanh toán thành công");
            cancelThanhToan();
            navigate(`/quan-ly-hoa-don/detail-hoa-don/${response.data.id}`);
          });
      } else {
        console.log(tienHang);
        if (tienHang == 0 || tienHang == undefined || tienHang == "") {
          toast.error("Bạn chưa chọn sản phẩm cho hóa đơn");
          cancelThanhToan();
          return;
        }
        await axios
          .put(`http://localhost:8080/hoa_don/thanhToanHoaDon/${activeKey}`, {
            sdt: khachHang.sdt,
            tenKhachHang: khachHang.ten,
            soTien: inputValue,
            maKH: khachHang.maKH,
            tongTien: tongTien,
            tienGiam: duocGiam,
            trangThai: 4,
            loaiHd: 1, //1 - tại quầy 0 - online
          })
          .then((response) => {
            toast("🎉 Thanh toán thành công");
            cancelThanhToan();
            navigate(`/quan-ly-hoa-don/detail-hoa-don/${response.data.id}`);
          });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
      cancelThanhToan();
    }
  };
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  const handleDelete = (idToDelete) => {
    setIdToDelete(idToDelete);
    setDeleteConfirmationOpen(true);
  };

  const cancelDelete = () => {
    setIdToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const confirmDelete = async () => {
    if (idToDelete) {
      await axios
        .delete(
          `http://localhost:8080/htth/deleteHinhThuc/${idToDelete.id_hoa_don}/${idToDelete.id_thanh_toan}`
        )
        .then((response) => {
          toast("🎉 Xóa thành công");
          cancelDelete();
          getThanhToan();
        })
        .catch((error) => {
          toast("😢 Xóa thất bại");
        });
      cancelDelete();
    }
  };
  //modal chuyen khoan
  const showModalCK = () => {
    setIsModalOpenCK(true);
  };
  const handleOkCK = async () => {
    if (inputValue == null) {
      toast.error(`Chưa nhập tiền khách đưa`);
      cancelTienMat();
      return;
    }
    if (inputValue > tongTien) {
      setTienThua(inputValue - tongTien);
      setTienKhachDua(tongTien);
      setInputValue("");
    } else {
      setTienKhachDua(inputValue);
      setKhachCanTra(tongTien - inputValue);
      setInputValue("");
    }
    if (inputValue != null) {
      await axios
        .post("http://localhost:8080/thanh-toan/addThanhToan", {
          maHD: activeKey,
          soTien: inputValue,
          maGiaoDich: maGiaoDich,
          phuongThuc: "Chuyển khoản",
        })
        .then((response) => {
          toast("🎉 Thêm thành công");
          getThanhToan();
          cancelTienMat();
        })
        .catch((error) => {
          toast("😢 Thêm thất bại");
        });
      cancelTienMat();
    }
    setIsModalOpenCK(false);
  };
  const handleCancelCK = () => {
    setIsModalOpenCK(false);
  };
  //modal nhap tien khach dua
  const showModalTT = () => {
    setIsModalOpenTT(true);
  };
  const handleOkTT = () => {
    setIsModalOpenTT(false);
  };
  const handleCancelTT = () => {
    setIsModalOpenTT(false);
  };
  // modal chọn hóa đơn
  const [selectedData, setSelectedData] = useState(null);

  const handleDataSelected = (data) => {
    console.log(data);
    setSelectedData(data);
    if (data != null) {
      activeKey = data;
      if (typeof onDataSelect === "function") {
        onDataSelect(data);
      } else {
        toast.error(`404 `);
      }
      getData();
      getThanhToan();
      handleCancelHD();
      setTienHang(tongTien);
    }
  };
  const showModalHD = () => {
    setIsModalOpenHD(true);
  };
  const handleOkHD = () => {
    setIsModalOpenHD(false);
  };
  const handleCancelHD = () => {
    setIsModalOpenHD(false);
  };
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
    if (activeKey == "💖💖") {
      toast(`Không được dùng hóa đơn này`);
      return;
    }
    setIsModalOpen(true);
  };

  const handleOkQR = async (id_sp) => {
    setIsModalOpen(false);

    await axios
      .post("http://localhost:8080/hoa_don_chi_tiet/addHDCT", {
        id_hoa_don: activeKey,
        id_san_pham: id_sp,
        so_luong: 1,
      })
      .then((response) => {
        toast("🎉 Thêm thành công");
        handleCancelQR();
        textRef.current = "";
        setItems((prevItems) => {
          return prevItems.map((item) => {
            if (item.key === activeKey) {
              return {
                ...item,
                soLuong: 1,
              };
            }
            return item;
          });
        });
        setTienHang(response?.data?.tongTien);
      })
      .catch((error) => {
        toast.error("Mã qr không hợp lệ");
      });
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

  const tinhTongTien = (dataArray) => {
    const tongTien = dataArray.reduce((tong, item) => {
      const giaTien = Number(item.giaTien) || 0;
      const soLuong = Number(item.soLuong) || 0;
      return tong + giaTien;
    }, 0);

    return tongTien;
  };

  const [list, setList] = useState([]);
  const [isBlur, setIsBlur] = useState(false);
  const [isGiaoHangHoaToc, setGiaoHangHoaToc] = useState(false);
  const handleSwitchChange = () => {
    setIsBlur(!isBlur);
  };
  const handleSwitchChangeShipHoaToc = () => {
    if (isBlur != true) {
      toast.warning("Bạn cần chọn giao hàng trước");
      return;
    }
    setGiaoHangHoaToc(!isGiaoHangHoaToc);
    if (!isGiaoHangHoaToc == true) {
      showModalThemPhiShip();
      setIsBlur(true);
    } else {
      setTienShip(0);
    }
  };
  const getData = async () => {
    await axios
      .get(`http://localhost:8080/hoa_don_chi_tiet/getHDCTByMa/${activeKey}`)
      .then((response) => {
        console.log("da call api getHDCTByMa");
        setList(response.data);
        // const tongTien = tinhTongTien(response.data);
        const tongTien = response.data[0].id_hoa_don.tongTien;
        console.log(response.data[0]);
        console.log(tongTien);
        const vc =
          response.data[0]?.id_hoa_don?.id_voucher?.giaTriMax == undefined
            ? 0
            : response.data[0]?.id_hoa_don?.id_voucher?.giaTriMax;
        console.log(vc);
        const codeVoucher =
          response.data[0]?.id_hoa_don.id_voucher?.code == undefined
            ? ""
            : response.data[0]?.id_hoa_don.id_voucher?.code;
        listVoucher.sort((b, a) => b.giaTriMin - a.giaTriMin);
        if (codeVoucher == "" && tienHang < listVoucher[0]?.giaTriMin) {
          console.log(tongTien);
          console.log(listVoucher[0]?.giaTriMin);
          setMuaThem(
            listVoucher[0]?.giaTriMin - tienHang == Number(NaN)
              ? ""
              : listVoucher[0]?.giaTriMin - tienHang
          );
          setDuocGiam(
            listVoucher[0]?.giaTriMax == undefined
              ? ""
              : listVoucher[0]?.giaTriMax
          );
        }
        // else if(codeVoucher == "" && tongTien > listVoucher[0]?.giaTriMin) {

        // }
        console.log(voucher);
        listVoucher.map((x, index) => {
          if (x.giaTriMax == vc) {
            setMuaThem(
              listVoucher[index + 1]?.giaTriMin - tienHang == Number(NaN)
                ? ""
                : listVoucher[index + 1]?.giaTriMin - tienHang
            );
            setDuocGiam(
              listVoucher[index + 1]?.giaTriMax == undefined
                ? ""
                : listVoucher[index + 1]?.giaTriMax
            );
          }
        });
        if (tienHang == 0) {
          setMuaThem("");
          setDuocGiam("");
          // setTienShip("");
        }
        // if(khachHang?.ten == '' || khachHang?.ten == undefined) {
        //   setTienShip("");
        // }
        setCodeVC(codeVoucher);
        setVoucher(vc);
        // setTienHang(tongTien);
        console.log(tienHang);
        if (tienHang == undefined || tienHang == "") {
          setTongTien(tongTien);
          setTienHang(tongTien);
        } else {
          setTongTien(tienHang - vc + tienShip);
        }
      });
  };
  const showModalThemPhiShip = () => {
    setIsModalOpenThemPhiShip(true);
  };
  const handleOkPhiShip = () => {
    setTienShip(phiVanChuyen);
    setIsModalOpenThemPhiShip(false);
    getData();
  };
  const handleCancelPhiShip = () => {
    setIsModalOpenThemPhiShip(false);
  };
  const getKhachHang = async () => {
    await axios
      .get(`http://localhost:8080/hoa_don_chi_tiet/getHDCTByMa/${activeKey}`)
      .then((response) => {
        setKhachHang({
          maKH: response.data[0]?.id_hoa_don.id_khach_hang?.ma,
          ten: response.data[0]?.id_hoa_don.id_khach_hang?.ten,
          sdt: response.data[0]?.id_hoa_don.id_khach_hang?.sdt,
          thanhPho: "",
          huyen: "",
          xa: "",
          soNha: "",
        });
      });
  };
  useEffect(() => {
    getKhachHang();
  }, []);
  useEffect(() => {
    console.log("get data");
    getData();
  }, [tienHang, activeKey, tienShip]);
  return (
    <>
      <div className="p-5">
        <div className="flex items-center gap-4">
          <Modal
            onOk={handleOkThem}
            onCancel={handleCancelThem}
            open={isModalOpenThem}
            width={1500}
            footer={[]}
          >
            <div className="mt-5">
              <TableSanPhamChiTiet
                gioHang={activeKey}
                setIsModalOpenThem={setIsModalOpenThem}
                setItems={setItems}
                setTienHang={setTienHang}
                tienHang={tienHang}
              />
            </div>
          </Modal>
          <Modal
            onOk={handleOkTT}
            onCancel={handleCancelTT}
            open={isModalOpenTT}
            width={700}
            okText="Xác nhận"
          >
            <div className="mt-3">
              <p style={{ fontSize: "17px" }}>Thanh toán</p>
              <div className="flex mt-3">
                <b className="mt-2">Số tiền</b>
                <div style={{ marginLeft: "50px" }}>
                  <Input
                    value={inputValue}
                    onChange={handleInputChange}
                    style={{ width: "450px", fontSize: "19px" }}
                    placeholder="Vui lòng nhập số tiền"
                  />
                </div>
              </div>
              <div className="flex mt-3 space-x-3">
                <button
                  className="w-48 px-4 py-2 bg-pink-300 hover:bg-pink-500 text-white font-semibold rounded-full"
                  onClick={handleTienMat}
                >
                  Tiền mặt
                </button>
                <button
                  className="w-48 px-4 py-2 bg-pink-300 hover:bg-pink-500 text-white font-semibold rounded-full"
                  onClick={showModalCK}
                >
                  Chuyển khoản
                </button>
                <Modal
                  onOk={handleOkCK}
                  onCancel={handleCancelCK}
                  open={isModalOpenCK}
                  width={500}
                >
                  <div className="mt-5">
                    <Input
                      placeholder="Nhập mã giao dịch"
                      value={maGiaoDich}
                      onChange={(e) => {
                        setMaGiaoDich(e.target.value);
                      }}
                    />
                  </div>
                </Modal>
                {/* <button className="w-48 px-4 py-2 bg-pink-300 hover:bg-pink-500 text-white font-semibold rounded-full">
                  Thẻ
                </button> */}
              </div>
              <div className="flex justify-between mt-5">
                <span className="poppins-font normal-case h-10 font-bold">
                  Khách cần trả : {""}
                </span>
                <span
                  style={{ fontSize: "20px", color: "#FF1493" }}
                  className="poppins-font normal-case h-10 ms-5 font-bold"
                >
                  {Intl.NumberFormat().format(khachCanTra)}&nbsp;₫
                </span>
              </div>
              <TableAntd
                columns={column}
                dataSource={thanhToan}
                pagination={true}
              />
              <div className="flex justify-between mt-5">
                <span className="poppins-font normal-case h-10 font-bold">
                  Khách thanh toán : {""}
                </span>
                <span
                  style={{ fontSize: "20px", color: "#FF1493" }}
                  className="poppins-font normal-case h-10 ms-5 font-bold"
                >
                  {Intl.NumberFormat().format(tienKhachDua)}&nbsp;₫
                </span>
              </div>
              <div className="flex justify-between mt-5">
                <span className="poppins-font normal-case h-10 font-bold">
                  Tiền thừa : {""}
                </span>
                <span
                  style={{ fontSize: "20px", color: "blue" }}
                  className="poppins-font normal-case h-10 ms-5 font-bold"
                >
                  {Intl.NumberFormat().format(tienThua)}&nbsp;₫
                </span>
              </div>
            </div>
          </Modal>
          <MaterialButton
            variant="gradient"
            className="poppins-font text-sm font-medium tracking-wide"
            onClick={() => {
              showModalThem();
            }}
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
                    const newText = data.text;
                    if (newText !== textRef.current && newText != "") {
                      textRef.current = newText;
                      console.log(newText);
                      handleOkQR(newText);
                    }
                  }
                }}
                onError={handleErrorQR}
                style={{ width: "100%" }}
              />
            </div>
          </Modal>
          <MaterialButton
            variant="outlined"
            className="poppins-font tracking-wide"
            style={{
              marginLeft: "600px",
            }}
            onClick={showModalHD}
          >
            Xem danh sách hóa đơn
          </MaterialButton>
          <Modal
            onOk={handleOkHD}
            onCancel={handleCancelHD}
            open={isModalOpenHD}
            width={1300}
            footer={[]}
          >
            <div className="mt-5">
              <TableHoaDon onDataSelected={handleDataSelected} />
            </div>
          </Modal>
        </div>
        <div className="pt-4">
          <CartItem
            users={list}
            setItems={setItems}
            columns={columns}
            updateSoLuong={updateSoLuong}
            gioHang={activeKey}
            setTienHang={setTienHang}
            tienHang={tienHang}
          />
        </div>

        <div className="flex justify-between mt-5 mb-3">
          <span className="poppins-font h-10 text-lg font-bold uppercase">
            Khách hàng{" "}
          </span>
          <Modal
            onOk={handleOkTK}
            onCancel={handleCancelTK}
            open={isModalOpenTK}
            width={1000}
            footer={[]}
          >
            <div className="mt-5">
              <TableKhachHang
                hoaDon={activeKey}
                setKhachHang={setKhachHang}
                setIsModalOpenTK={setIsModalOpenTK}
              />
            </div>
          </Modal>

          <Button
            variant="outlined"
            className="inline-block  font-semibold"
            onClick={showModalTK}
          >
            Chọn khách hàng
          </Button>
        </div>
        <p
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "#232D3F",
          }}
        />
        <div className="flex flex-col mt-5 mb-12">
          <div className="poppins-font normal-case h-10 ms-5 font-bold">
            <span style={{ marginRight: "5px" }}>Tên khách hàng : </span>
            <Tag color="magenta" style={{ fontSize: 15 }}>
              {khachHang?.ten || "Khách lẻ"}
            </Tag>
          </div>
          <div className="poppins-font normal-case h-10 ms-5 font-bold">
            <span style={{ marginRight: "5px" }}>Số điện thoại : </span>
            <Tag color="magenta" style={{ fontSize: 15 }}>
              {khachHang.sdt}
            </Tag>
          </div>
          <Button
            type="text"
            onClick={async () => {
              setKhachHang("");
              await axios.put(
                "http://localhost:8080/hoa_don_chi_tiet/addKH_HD",
                {
                  maHD: activeKey,
                  id_khach_hang: "",
                }
              );
            }}
            style={{ marginLeft: "auto", marginTop: "-70px" }}
          >
            <CloseOutlined />
          </Button>
        </div>
        <p
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "#232D3F",
          }}
        />

        <div class="flex justify-between mt-7">
          <div className={`relative ${!isBlur ? "h-0 overflow-hidden" : ""}`}>
            <div className="delivery-content">
              <Delivery
                diaChi={diaChi}
                setDiaChi={setDiaChi}
                activeKey={activeKey}
                khachHang={khachHang}
                setKhachHang={setKhachHang}
                tienHang={tienHang}
                tienShip={tienShip}
                setTienShip={setTienShip}
                setNgayNhan={setNgayNhan}
                phiVanChuyen={phiVanChuyen}
              />
            </div>
          </div>
          <div className="w-6/12 space-y-8 block">
            <p className="font-bold text-lg">
              <span>Thông tin thanh toán</span>{" "}
            </p>

            <div class="flex gap-20">
              <div class="w-2/6 font-medium text-s">Khách thanh toán</div>

              <div class="w-1/6">
                <Tooltip content="Nhập tiền khách đưa" showArrow={true}>
                  <div
                    onClick={() => {
                      showModalTT();
                      getThanhToan();
                    }}
                    style={{
                      cursor: "pointer",
                      width: "50px",
                      height: "40px",
                      border: "1px solid #000",
                      borderRadius: "5px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGHAoC6gqoEDXMUDn7BY1F6qvi2ZEVWGV2RA&usqp=CAU"
                      alt="Mô tả hình ảnh"
                      style={{ maxWidth: "50%", maxHeight: "100%" }}
                    />
                  </div>
                </Tooltip>
              </div>
              <div class="w-2/6">
                <span
                  style={{ color: "red", fontWeight: "bold", fontSize: "20px" }}
                >
                  {" "}
                  {Intl.NumberFormat().format(tienKhachDua)}&nbsp;₫
                </span>
              </div>
            </div>

            <div class="flex gap-6">
              <div class="w-4/6 ">
                <Input label="Mã phiếu giảm giá" value={codeVC} />
              </div>
              <Modal
                onOk={handleOkVoucher}
                onCancel={handleCancelVoucher}
                open={isModalOpenVoucher}
                width={800}
                height={50}
                footer={[]}
              >
                <TableVoucher
                  activeKey={activeKey}
                  setVoucher={setVoucher}
                  tongTien={tongTien}
                  setTongTien={setTongTien}
                />
              </Modal>

              <div class="w-2/6 flex">
                <Button onClick={showModalVoucher}>Chọn mã</Button>

                <Button
                  type="text"
                  style={{ marginLeft: "10px" }}
                  onClick={async () => {
                    console.log(codeVC);
                    if (codeVC == undefined) {
                      toast.warning(`Chưa có phiếu giảm giá`);
                      return;
                    }
                    await axios
                      .put(
                        "http://localhost:8080/hoa_don_chi_tiet/removeVC_HD",
                        {
                          maHD: activeKey,
                          id_khach_hang: "",
                        }
                      )
                      .then((response) => {
                        setVoucher(0);
                        setCodeVC("");
                        setTongTien(tongTien);
                        toast(`Xóa voucher thành công`);
                      });
                  }}
                >
                  <CloseOutlined />
                </Button>
              </div>
            </div>

            <span style={{ color: "red", fontSize: "16px" }}>
              {duocGiam == ""
                ? ""
                : "Mua thêm " +
                  Intl.NumberFormat().format(muaThem) +
                  " ₫ để được giảm " +
                  Intl.NumberFormat().format(duocGiam) +
                  " ₫"}
            </span>
            <div class="flex ...">
              <Switch
                id="custom-switch-component-1"
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
                  font-bold checked:text-[#2ec946] mr-5"
                  >
                    Giao hàng
                  </span>
                }
                checked={isBlur}
                onChange={handleSwitchChange}
              />

              <Switch
                id="custom-switch-component-2"
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
                    Giao hàng hỏa tốc
                  </span>
                }
                checked={isGiaoHangHoaToc}
                onChange={handleSwitchChangeShipHoaToc}
              />
              <Modal
                onOk={handleOkPhiShip}
                onCancel={handleCancelPhiShip}
                open={isModalOpenThemPhiShip}
                width={350}
                okText="Nhập vận chuyển"
              >
                <div className="mt-5">
                  <h2>Phí vận chuyển khi giao hàng hỏa tốc</h2>
                  <br />
                  <p>Nhập phí vận chuyển</p>
                  <InputNumber
                    value={Intl.NumberFormat().format(phiVanChuyen)}
                    onChange={(value) => {
                      setPhiVanChuyen(value);
                    }}
                  />
                </div>
              </Modal>
            </div>

            <div class="flex ... gap-20">
              <div class="w-4/6 ... font-medium text-s">Tiền hàng</div>
              <div class="w-2/6 ...">
                <span
                  style={{ color: "red", fontWeight: "bold", fontSize: "20px" }}
                >
                  {" "}
                  {Intl.NumberFormat().format(tienHang)}&nbsp;₫
                </span>
              </div>
            </div>
            <div class="flex ... gap-20">
              <div class="w-4/6 ... font-medium text-s">Tiền ship</div>
              <div class="w-2/6 ...">
                <span
                  style={{ color: "red", fontWeight: "bold", fontSize: "20px" }}
                >
                  {" "}
                  {Intl.NumberFormat().format(tienShip)}&nbsp;₫
                </span>
              </div>
            </div>
            <div class="flex ... gap-20">
              <div class="w-4/6 ... font-medium text-s">Giảm giá </div>
              <div class="w-2/6 ...">
                <span
                  style={{ color: "red", fontWeight: "bold", fontSize: "15px" }}
                >
                  {" "}
                  {Intl.NumberFormat().format(voucher)}&nbsp;₫
                </span>
              </div>
            </div>
            <div class="flex gap-20">
              <div class="w-4/6 font-medium text-s">Tổng tiền</div>
              <div class="w-2/6">
                <span
                  style={{ color: "red", fontWeight: "bold", fontSize: "20px" }}
                >
                  {" "}
                  {Intl.NumberFormat().format(tongTien)}&nbsp;₫
                </span>
              </div>
            </div>
            <div class="flex justify-center">
              <Button onClick={handleThanhToan}>Thanh Toán</Button>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={tienMatConfirmationOpen} onClose={cancelTienMat} fullWidth>
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
            <span>Xác nhận thêm</span>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc muốn chọn hình thức thanh toán này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelTienMat} color="warning">
            Hủy
          </Button>
          <Button color="primary" onClick={confirmTienMat}>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={deleteConfirmationOpen} onClose={cancelDelete} fullWidth>
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
            <span>Xác nhận xóa</span>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc muốn xóa thanh toán?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="warning">
            Hủy
          </Button>
          <Button color="primary" onClick={confirmDelete}>
            Vẫn xóa
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={thanhToanConfirmationOpen}
        onClose={cancelThanhToan}
        fullWidth
      >
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
            <span>Xác nhận thanh toán</span>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Bạn có chắc muốn thanh toán?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelThanhToan} color="warning">
            Hủy
          </Button>
          <Button color="primary" onClick={confirmThanhToan}>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GioHang;
