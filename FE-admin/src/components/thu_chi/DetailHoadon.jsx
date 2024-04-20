import { useEffect, useState, useRef } from "react";
import {
  Button,
  // Dialog,
  // DialogActions,
  // DialogContent,
  // DialogContentText,
  // DialogTitle,
  TbInfoTriangle,
  // DialogHeader,
  // DialogBody,
  // DialogFooter,
} from "@material-tailwind/react";
import moment from "moment";
import { format } from "date-fns";
import TableSanPham from "./TableSanPham";
import QRCode from "qrcode.react";
import numeral from "numeral";

import React from "react";
import { ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";



import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { MdAddCircle, MdCancel } from "react-icons/md";
import { Modal, Tag, Tooltip, Input, Radio, Divider } from "antd";
import { DeleteIcon } from "./icon/DeleteIcon";
import { EditIcon } from "./icon/EditIcon";
import { FaFileInvoice } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Timeline, TimelineEvent } from "@mailtop/horizontal-timeline";
import { faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CiWarning } from "react-icons/ci";
import { Table as TableAntd } from "antd";
import ComponentToPrint from "./InHoaDon";
import { notification} from 'antd';


function DetailHoadon() {
  // const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  // const [updateConfirmationOpen, setUpdateConfirmationOpen] = useState(false);
  // const [addLSHDConfirmationOpen, setAddLSHDConfirmationOpen] = useState(false);
  // const [cancleHDConfirmationOpen, setCancleHDConfirmationOpen] =
  //   useState(false);
  // const [luiHDConfirmationOpen, setLuiHDConfirmationOpen] = useState(false);
  const [thanhToanConfirmationOpen, setThanhToanConfirmationOpen] =
    useState(false);
  const [isModalOpenCK, setIsModalOpenCK] = useState(false);
  const [open, setOpen] = useState(false);
  const [kmspcts, setKmspcts] = useState([]);
  const [rowsSPCT, setRowsSPCT] = useState([]);
  const [rowsSPCTTra, setRowsSPCTTra] = useState([]);
  const [rowsLichSu, setRowsLichSu] = useState([]);
  const [rowsLichSuThanhToan, setRowsLichSuThanhToan] = useState([]);
  const { id } = useParams();
  const [info, setInfo] = useState({});
  const [listTimeLineOnline, setListTimeLineOnline] = useState([]);
  const [spct, setSPCT] = useState({});
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToUpdate, setIdToUpdate] = useState(null);
  const [isModalOpenThem, setIsModalOpenThem] = useState(false);
  const [note, setNote] = useState("");
  const [isModalOpenTT, setIsModalOpenTT] = useState(false);
  const [openTimeLine, setOpenTimeLine] = useState(false);
  const [openModalLui, setOpenModalLui] = useState(false);
  const [openModalHuy, setOpenModalHuy] = useState(false);
  const [inputValue, setInputValue] = useState(null);
  const [maGiaoDich, setMaGiaoDich] = useState("");
  const [khachCanTra, setKhachCanTra] = useState("");
  const [thanhToan, setThanhToan] = useState([]);
  const [httt, setHTTT] = useState("TM");

  const [tongTien, setTongTien] = useState(0);
  const [tienThua, setTienThua] = useState(0);
  const [tienKhachDua, setTienKhachDua] = useState(0);
  const [tienThanhToan, setTienThanhToan] = useState(0);

  const [openFixHD, setOpenFixHD] = useState(false);
  const [isModalOpenHD, setIsModalOpenHD] = useState(false);
  const componentRef = useRef();




  const [isModalOpenTienTrangThai, setIsModalOpenTienTrangThai] = useState(false);
  const [isModalOpenLuiTrangThai, setIsModalOpenLuiTrangThai] = useState(false);
  const [isModalOpenXoaSP, setIsModalOpenXoaSP] = useState(false);
  const [isModalOpenHuy, setIsModalOpenHuy] = useState(false);
  const [isModalOpenUpdateSL, setIsModalOpenUpdateSL] = useState(false);
  const [isModalOpenThanhToan, setIsModalOpenThanhToan] = useState(false);
  const [isModalOpenLichSu, setIsModalOpenLichSu] = useState(false);

  //in hoa đơn
  const showModalHD = () => {
    setIsModalOpenHD(true);
  };
  const handleCancelHD = () => {
    setIsModalOpenHD(false);
  };


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


// chuyển trang thái
 
  const handleCancelChuyenTrangThai = () => {
    setIsModalOpenTienTrangThai(false);
  };
 

  const showModalFixHD = () => {
    setOpenFixHD(true);
  };
  const handleOkFixHD = () => {
    setOpenFixHD(false);
  };
  const handleCancelFixHD = () => {
    setOpenFixHD(false);
  };

  const onChange = (e) => {
    setHTTT(e.target.value);
    if (e.target.value == "TM") {
      setMaGiaoDich("");
    }
  };

  const showModal = () => {
    setOpenTimeLine(true);
  };

  const hideModal = () => {
    setNote("");
    setOpenTimeLine(false);
  };



  // Lùi Trạng Thái Hóa Đơn
  const showModalLui = () => {
    setOpenModalLui(true);
  };

  const hideModalLui = () => {
    setNote("");
    setOpenModalLui(false);
  };

  const onHandleLuiHD = () => {
    if (note) {
      setIsModalOpenLuiTrangThai(true);
      hideModalLui();

    } else {
      toast("Bạn chưa nhập ghi chú");
    }
  };

  const cancelLuiHD = () => {
    setIsModalOpenLuiTrangThai(false);
  };
  const confirmLuiHD = async () => {
    cancelLuiHD();
        hideModalLui();
    await axios
      .post(`http://localhost:8080/lich_su_hoa_don/add/${id}`, {
        moTaHoaDon: "Lùi Hóa Đơn",
        deleted: 1,
        nguoiTao: "Cam",
        ghiChu: note,
      })
      .then((response) => {
        toast("🎉 Chuyển trạng thái thành công");
        fetchKMSPCT();
        getDataLichSuThanhToan();
        getInfoHD();
        getDataChiTietSanPham();
        getDataLichSu();
        cancelLuiHD();
        hideModalLui();
      })
      .catch((error) => {
        toast("😢 Chuyển trạng thái thất bại");
        console.log(error);
      });
  };

  const showModalThem = () => {
    setIsModalOpenThem(true);
  };
  const handleOkThem = () => {
    setIsModalOpenThem(false);
  };
  const handleCancelThem = () => {
    setIsModalOpenThem(false);
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

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };
  // update sanr pham
  const onHandleUpdate = (idToDelete) => {
    if(  spct.quantity == null || spct.quantity == ""){
      toast("Số lượng không được để trống");
    }else if(spct.quantity <= 0){
      toast("Số lượng lớn hơn hoặc bằng 1");
    }else if(spct.quantity > 5){
      //toast("Số lượng Không quá 5 sản phẩm");
      openNotificationWithIcon('error');
    }else{
       setIdToUpdate(idToDelete);
    setIsModalOpenUpdateSL(true);
    }
  };

  

  const cancelUpdate = () => {
    setIdToUpdate(null);
    setIsModalOpenUpdateSL(false);
  };
  const confirmUpdate = async () => {
    if (idToUpdate) {
      cancelUpdate();
      await axios
        .post(
          `http://localhost:8080/hoa_don_chi_tiet/update/${id}/${idToUpdate}`,
          {
            quantity: spct.quantity,
          }
        )
        .then((response) => {
          if(response.data == "FAIL"){
            toast("Số lượng tồn không đủ");
          }else{
          toast("🎉 Cập nhật thành công");
          hideModal();
          fetchKMSPCT();
          getDataLichSuThanhToan();
          getInfoHD();
          getDataChiTietSanPham();
          getDataLichSu();
          cancelUpdate();
          }
         
        
        })
        .catch((error) => {
          toast("😢 Cập nhật thất bại");
          console.log(error);
        });
      cancelUpdate();
    }
  };
  // add lich su hoa don

  const onHandleAddLSHD = () => {
    if (note) {
      hideModal();
      setIsModalOpenTienTrangThai(true);
    } else {
      toast("Bạn chưa nhập ghi chú");
    }
  };

  const cancelAddLSHD = () => {
    setAddLSHDConfirmationOpen(false);
  };
  const confirmAddLSHD = async () => {
    setIsModalOpenTienTrangThai(false);
    await axios
      .post(`http://localhost:8080/lich_su_hoa_don/add/${id}`, {
        moTaHoaDon: listTitleTimline[info.trangThai + 1].title,
        deleted: 1,
        nguoiTao: "Cam",
        ghiChu: note,
      })
      .then((response) => {
        toast("🎉 Chuyển trạng thái thành công");
        fetchKMSPCT();
        getDataLichSuThanhToan();
        getInfoHD();
        getDataChiTietSanPham();
        getDataLichSu();
        setIsModalOpenTienTrangThai(false);
       
      })
      .catch((error) => {
        toast("😢 Chuyển trạng thái thất bại");
        console.log(error);
      });
      
  };
  // khach nhap tien
  const showModalTT = () => {
    setIsModalOpenTT(true);
  };
  const handleOkTT = () => {
    // if(tongTien <= tienKhachDua){
      setIsModalOpenTT(false);
    onHandleThanhToan();
    
    // }else{
    //   toast("Tiền Khách Đưa Không Đủ ");
    // }
    
  };
  const handleCancelTT = () => {
    setIsModalOpenTT(false);
  };

  const onHandleThanhToan = () => {
    setIsModalOpenThanhToan(true);
  };

  const cancelThanhToan = () => {
    setIsModalOpenThanhToan(false);
  };

  const confirmThanhToan = async () => {
    // if (inputValue != null) {
      setIsModalOpenThanhToan(false);
    await axios
      .post("http://localhost:8080/thanh-toan/addThanhToan", {
        maHD: info.ma,
        maGiaoDich: maGiaoDich,
        soTien: tienKhachDua,
        phuongThuc: httt,
      })
      .then((response) => {
        toast("🎉 Thêm thanh toán thành công");
        getDataLichSuThanhToan();
        setIsModalOpenThanhToan(false);
        setTienKhachDua(0);
      })
      .catch((error) => {
        toast("😢 Thêm thanh toán thất bại");
      });
      
    // cancelTienMat();
    // }
  };
  //modal chuyen khoan
  // const showModalCK = () => {
  //   setIsModalOpenCK(true);
  // };
  // const handleOkCK = async () => {
  //   if (inputValue == null) {
  //     toast.error(`Chưa nhập tiền khách đưa`);
  //     cancelTienMat();
  //     return;
  //   }
  //   if (inputValue > tongTien) {
  //     setTienThua(inputValue - tongTien);
  //     setTienKhachDua(tongTien);
  //     setInputValue("");
  //   } else {
  //     setTienKhachDua(inputValue);
  //     setKhachCanTra(tongTien - inputValue);
  //     setInputValue("");
  //   }
  //   if (inputValue != null) {
  //     await axios
  //       .post("http://localhost:8080/thanh-toan/addThanhToan", {
  //         maHD: activeKey,
  //         soTien: inputValue,
  //         maGiaoDich: maGiaoDich,
  //         phuongThuc: "Chuyển khoản",
  //       })
  //       .then((response) => {
  //         toast("🎉 Thêm thành công");
  //         getThanhToan();
  //         cancelTienMat();
  //       })
  //       .catch((error) => {
  //         toast("😢 Thêm thất bại");
  //       });
  //     cancelTienMat();
  //   }
  //   setIsModalOpenCK(false);
  // };
  // const handleCancelCK = () => {
  //   setIsModalOpenCK(false);
  // };

  const handleOpen = () => setOpen(!open);
  // get spct

  const getSPCT = (id) => {
    setSPCT((value) => (value = rowsSPCT.filter((sp) => sp.id == id)[0]));
  };

  // call khuyên mai

  const fetchKMSPCT = async () => {
    const response = await axios.get(
      `http://localhost:8080/khuyen-mai/getAllKMSPCT`
    );
    setKmspcts(response.data);
  };

  const DiscountTag = ({ discount }) => {
    if (discount === undefined) {
      return null;
    }

    return <div className="discount-tag">{`${discount}% OFF`}</div>;
  };

  // get data LSHD

  const getDataLichSu = async () => {
    await axios
      .get(`http://localhost:8080/lich_su_hoa_don/getLichSuHoaDons/${id}`)
      .then((res) => {
        setRowsLichSu(
          res.data.map((item, index) => {
            return {
              ...item,
              description: item.moTaHoaDon == null ? "Trống" : item.moTaHoaDon,
              maNV:
                item.id_hoa_don.id_nhan_vien == null
                  ? "Trống"
                  : item.id_hoa_don.id_nhan_vien.ma,
              date: moment(new Date(item.ngayTao)).format(
                "  HH:mm:ss , DD-MM-YYYY"
              ),
              tenNV:
                item.id_hoa_don.id_nhan_vien == null
                  ? "Trống"
                  : item.id_hoa_don.id_nhan_vien.ten,

              ghiChu: item.ghiChu == null ? "trống" : item.ghiChu,
              nguoiXacNhan: " Admin ",
              icon:
                item.moTaHoaDon == "Hủy Hóa Đơn"
                  ? MdCancel
                  : faMoneyBillTransfer,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // get data LSTT
  const getDataLichSuThanhToan = async () => {
    const res = await axios.get(`http://localhost:8080/htth/getHTTT/${id}`);
    const data = await res.data;

    if (data.length != 0) {
      const list = data.map((item, index) => {
        return {
          id: index + 1,
          maGiaoDich: item.id_thanh_toan.ma_giao_dich,
          soTien: item.id_thanh_toan.soTien,
          trangThai: item.id_thanh_toan.trangThai,
          thoiGian: item.ngayTao,
          // loaiGiaoDich: item.id_thanh_toan.trangThai,
          phuongThucThanhToan: item.id_thanh_toan.hinhThuc,
          ghiChu: item.moTa,
          nguoiXacNhan: "Đông",
        };
      });
      setRowsLichSuThanhToan(list);
      const tien = list.reduce((a, b) => a + parseFloat(b.soTien), 0);
      // console.log(tien);
      setTienThanhToan(tien);
    }
  };
  // get data TTHD
  const getInfoHD = async () => {
    const res = await axios.get(
      "http://localhost:8080/hoa_don/getHoaDon/" + id
    );
    const data = await res.data;

    setInfo(data);
  };

  // get data HDCT

  const getDataChiTietSanPham = async () => {
    const res = await axios.get(
      "http://localhost:8080/hoa_don_chi_tiet/getHDCTByID/" + id
    );
    const data = await res.data;
    // console.log(data);
    const checkData = data.filter((item) => item.deleted == 1);
    setRowsSPCT(
      checkData.map((item, index) => {
        return {
          id: item.id_chi_tiet_san_pham.id,
          imageUrl: item.id_chi_tiet_san_pham.defaultImg,
          name: item.id_chi_tiet_san_pham.ten,
          kichco: item.id_chi_tiet_san_pham.id_kich_co.ten,
          mausac: item.id_chi_tiet_san_pham.id_mau_sac.ten,
          quantity: item.soLuong,
          price: item.id_chi_tiet_san_pham.giaBan,
          giaTien: item.giaTien,
        };
      })
    );
    const checkDataTra = data.filter((item) => item.deleted == 0);
    setRowsSPCTTra(
      checkDataTra.map((item, index) => {
        return {
          id: item.id_chi_tiet_san_pham.id,
          imageUrl: item.id_chi_tiet_san_pham.defaultImg,
          name: item.id_chi_tiet_san_pham.ten,
          kichco: item.id_chi_tiet_san_pham.id_kich_co.ten,
          mausac: item.id_chi_tiet_san_pham.id_mau_sac.ten,
          quantity: item.soLuong,
          price: item.id_chi_tiet_san_pham.giaBan,
          ghiChu: item.ghiChu,
          giaTien: item.giaTien,
        };
      })
    );
    setTongTien(
      data.reduce(
        (sum, element) =>
          sum + element.soLuong * element.id_chi_tiet_san_pham.giaBan,
        0
      )
    );

    fetchKMSPCT();
    getDataLichSuThanhToan();
    getInfoHD();
    getDataChiTietSanPham();
    getDataLichSu();
  };

  // hủy hóa đơn
  const showModalHuy = () => {
    setOpenModalHuy(true);
  };

  const hideModalHuy = () => {
    setNote("");
    setOpenModalHuy(false);
  };
  const onHandleCancelHD = () => {
    hideModalHuy();
    setIsModalOpenHuy(true);
  };

  const cancelCancelHD = () => {
    setIsModalOpenHuy(false);
  };
  const confirmCancelHD = async () => {
    cancelCancelHD();
    await axios
      .post(`http://localhost:8080/lich_su_hoa_don/add/${id}`, {
        moTaHoaDon: "Hủy Hóa Đơn",
        deleted: 1,
        nguoiTao: "Cam",
        ghiChu: note,
      })
      .then((response) => {
        toast("🎉 Xóa thành công");
        fetchKMSPCT();
        getDataLichSuThanhToan();
        getInfoHD();
        getDataChiTietSanPham();
        getDataLichSu();
      })

      .catch((error) => {
        toast("😢 Xóa thất bại");
      });
      cancelCancelHD();
  };
  // xóa sp
  const onHandleDelete = (idToDelete) => {
    setIdToDelete(idToDelete);
    setIsModalOpenXoaSP(true);
  };

  const cancelDelete = () => {
    setIdToDelete(null);
    setIsModalOpenXoaSP(false);
  };
  const confirmDelete = async () => {

    if (idToDelete) {
      cancelDelete();
      await axios
        .delete(
          `http://localhost:8080/hoa_don_chi_tiet/deleteHDCT/${id}/${idToDelete}`
        )
        .then((response) => {
          toast("🎉 Xóa thành công");
          fetchKMSPCT();
          getDataLichSuThanhToan();
          getInfoHD();
          getDataChiTietSanPham();
          getDataLichSu();
        })

        .catch((error) => {
          toast("😢 Xóa thất bại");
        });
      cancelDelete();
    }
  };

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
        const totalSoTien = updatedRows.reduce(
          (sum, row) => sum + parseFloat(row.soTien.replace(".", "")),
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

  const handleMoney = (value) => {
    setTienKhachDua(value);
    if (value >= tongTien) {
      setTienThua(value - tongTien);
    } else if (value == 0 || value < tongTien) {
      setTienThua(0);
    }
  };

  const listTitleTimline = [
    {
      title: `Chờ xác nhận`,
      key: 0,
    },
    {
      title: `Xác Nhận`,
      key: 1,
    },
    {
      title: `Chờ Vận Chuyển`,
      key: 2,
    },
    {
      title: `Giao Hàng`,
      key: 3,
    },
    {
      title: `Hoàn Thành`,
      key: 4,
    },
  ];
  useEffect(() => {
    fetchKMSPCT();
    getDataLichSuThanhToan();
    getInfoHD();
    getDataChiTietSanPham();
    getDataLichSu();
  }, []);

  return (
    <>
     {contextHolder}
     <ToastContainer/>
      <div
        className="conatiner mx-auto space-y-5"
        style={{
          backgroundColor: "white",
        }}
      >
        <div className=" bg-white">
          <div
            className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
            style={{ width: "100%" }}
          >
            <div style={{ width: "4000px" }}>
              <Timeline minEvents={20} placeholder>
                {rowsLichSu.map((item, i) => (
                  <TimelineEvent
                    key={i}
                    style={{ marginLeft: 0 }}
                    // color="#9c2919"
                    color="#891652"
                    icon={FaFileInvoice}
                    title={
                      <p style={{ fontSize: 12, marginTop: 10, width: "70%" }}>
                        {item.description}
                      </p>
                    }
                    subtitle={
                      <p style={{ fontSize: 12, marginTop: 10, width: "70%" }}>
                        {item.date}
                      </p>
                    }
                  />
                ))}
              </Timeline>
            </div>
          </div>
        </div>

        <div className="row button-contact p-4 grid grid-cols-2">
          <div className="row ">
            {info.trangThai > 1 && info.trangThai <= 3 && (
              <Button
                className="me-4"
                type="primary"
                onClick={showModalLui}
                style={{ marginRight: 10 }}
              >
                Lùi lại
              </Button>
            )}
            {info.loaiHd === 0 && info.trangThai != 4 && info.trangThai < 4 ? (
              <Button
                className="me-4"
                type="primary"
                //  onClick={showModal1}
                onClick={showModal}
                style={{ marginRight: 10 }}
              >
               
                Chuyển Trạng Thái
                {/* {listTitleTimline[info.trangThai].title} */}
              </Button>
            ) : (
              ""
            )}

            <Button
              className="me-4"
              style={{ marginRight: 10 }}
              onClick={showModalHD}
            >
              Xuất hoá đơn
            </Button>
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
                //columns={columns}
                inforKH={info}
              />
            </Modal>

            {info.loaiHd == !1 && info.trangThai < 4 && (
              <Button className="me-4" onClick={showModalHuy}>
                Hủy Hóa Đơn
              </Button>
            )}

            <Modal
              title="Ghi Chú"
              style={{
                top: 20,
              }}
              open={openModalHuy}
              onOk={hideModalHuy}
              onCancel={hideModalHuy}
              okText="Xác Nhận Thao Tác"
              cancelText="Hủy"
              footer={() => (
                <>
                  <Button className="me-1" color="blue" onClick={hideModalHuy}>
                    Hủy
                  </Button>
                  <Button color="red" onClick={onHandleCancelHD}>
                    Xác Nhận
                  </Button>
                </>
              )}
            >
              <Input.TextArea
                rows={4}
                placeholder="Lý do hủy hóa đơn ...."
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                }}
                // maxLength={}
              />
            </Modal>
          </div>
          <div className="row grid justify-items-end">
            <Button className="me-4 " onClick={()=>setIsModalOpenLichSu(true)} variant="gradient">
              Lịch Sử
            </Button>

            <Modal
              onOk={handleOkTT}
              onCancel={handleCancelTT}
              open={isModalOpenTT}
              width={500}
              okText="Xác nhận"
              footer={[
                <Button onClick={handleCancelTT} className="me-4">
                  Cancel
                </Button>,
                <Button type="primary" onClick={handleOkTT} >
                 Xác Nhận
                 
                 
                </Button>,
              ]}
            >
              <div className="mt-3">
                <div className="flex justify-center">
                  <p style={{ fontSize: "23px" }}>Xác Nhận Thanh toán</p>
                </div>

                <div className="mb-3">
                  <p>Tổng Tiền</p>
                  <Input value={`${Intl.NumberFormat().format(tongTien - tienThanhToan)} ₫`} />
                </div>
                <div className="mb-3">
                  <p>Tiền Khách Đưa</p>
                  <Input
                    min={1}
                    value={tienKhachDua}
                    onChange={(e) => handleMoney(e.target.value)}
                  />
                  {/* <Input onChange={(e) => handleMoney(e.target.value)} /> */}
                </div>
                <div className="mb-3">
                  <p>Tiền Thừa</p>
                  <Input
                    value={`${Intl.NumberFormat().format(tienThua)} ₫`}
                    readOnly
                  />
                </div>

                <div className="mb-3">
                  <Input.TextArea rows={4} placeholder="Ghi chú" />
                </div>
                <div className="mb-3">
                  <p>Phương thức thanh toán</p>
                  <Radio.Group onChange={onChange} value={httt}>
                    <Radio value={"TM"}>Tiền Mặt</Radio>
                    <Radio value={"CK"}>Chuyển Khoản</Radio>
                  </Radio.Group>
                </div>
                {httt == "CK" && (
                  <div className="mb-3">
                    <p>Mã giao dịch</p>
                    <Input
                      onChange={(e) => setMaGiaoDich(e.target.value)}
                      value={maGiaoDich}
                    />
                  </div>
                )}
              </div>
            </Modal>

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
                  <Button color="red" onClick={onHandleAddLSHD}>
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

            <Modal
              title="Ghi Chú"
              style={{
                top: 20,
              }}
              open={openModalLui}
              onOk={hideModalLui}
              onCancel={hideModalLui}
              okText="Xác Nhận Thao Tác"
              cancelText="Hủy"
              footer={() => (
                <>
                  <Button className="me-1" color="blue" onClick={hideModalLui}>
                    Hủy
                  </Button>
                  <Button color="red" onClick={onHandleLuiHD}>
                    Xác Nhận
                  </Button>
                </>
              )}
            >
              <Input.TextArea
                rows={4}
                placeholder="Ghi chú để trở về trạng thái cũ ...."
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                }}
                // maxLength={}
              />
            </Modal>
          </div>
        </div>

        <div className="row lich-su-thanh-toan bg-white">
          <div className="row  ">
            <div className="flex justify-between">
              <div>
                <p className="font-bold pb-2 pt-4 text-2xl">
                  {" "}
                  Lịch Sử Thanh Toán
                </p>
              </div>
              <div className="pt-3">
                {tienThanhToan ==  tongTien ? (
                  ""
                ) : (
                  <Button onClick={showModalTT}>Xác nhận thanh toán</Button>
                )}
              </div>
            </div>
            <hr style={{ backgroundColor: "black", height: 2, padding: 1 }} />
          </div>

          <div className="row table-thanh-toan p-4">
            <TableAntd
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
                <p className="font-bold pb-2 pt-4 text-2xl">
                  {" "}
                  Thông tin hóa đơn
                </p>
              </div>
              <div className="pt-3">
                {/* <Button type="primary" onClick={showModalFixHD}>
                  Cập nhật hóa đơn
                </Button> */}
                <Modal
                  open={openFixHD}
                  width={700}
                  title="Chỉnh sửa thông tin hóa đơn"
                  onOk={handleOkFixHD}
                  onCancel={handleCancelFixHD}
                  footer={[
                    <Button className="me-4">Cancel</Button>,
                    <Button>Xác Nhận</Button>,
                  ]}
                >
                  Chỉnh sửa thong tin hóa đơn
                </Modal>
              </div>
            </div>
            <hr style={{ backgroundColor: "black", height: 2, padding: 1 }} />
          </div>

          <div className="row divide-y-8 divide-slate-400/25 ">
            <div class="grid grid-cols-3 gap-4 mb-10 ms-5">
              <div>
                <p className="mb-5">Mã : {info.ma}</p>
                <p>
                  Loại hóa đơn :{" "}
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
                </p>
              </div>
              <div>
                <p className="mb-5">Tên Khách Hàng : {info.tenKhachHang}</p>
                <p>Số điện thoại : {info.sdt}</p>
              </div>
              <div>
                <p className="mb-5">Địa chỉ : {info.diaChi}</p>
              </div>
            </div>
            {/* <div className="row mb-10 space-y-8" style={{ padding: "0 60px" }}>
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
            </div> */}
            <div className="flex justify-end">
              <Button
                onClick={() => {
                  showModalThem();
                }}
              >
                Thêm sản phẩm <MdAddCircle style={{ display: "inline" }} />
              </Button>

              <Modal
                onOk={handleOkThem}
                onCancel={handleCancelThem}
                open={isModalOpenThem}
                width={1500}
                footer={[]}
              >
                <div className="mt-5">
                  <TableSanPham gioHang={info.ma} />
                </div>
              </Modal>
            </div>

            <div className="row divide-y-4 divide-slate-400/25">
              <div className="row table-san-pham ">
                <h1 className="m-3">Danh sách sản phẩm</h1>
                <Divider />
                {rowsSPCT.map((item, index) => (
                  <div
                    className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                    key={index}
                  >
                    <div style={{ position: "relative" }}>
                      <img
                        src={item.imageUrl}
                        alt="product-image"
                        className="w-full rounded-lg sm:w-20 me-10 object-contain"
                        style={{
                          width: "7rem",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 16,
                          left: -10,
                          zIndex: 1,
                        }}
                      >
                        <DiscountTag
                          discount={
                            kmspcts.find(
                              (x) => x.id_chi_tiet_san_pham.id == item.id
                            )?.id_khuyen_mai.giaTriPhanTram
                          }
                        />
                      </div>
                    </div>

                    <div className="flex justify-between w-full">
                      <div>
                        <div className=" sm:mt-0">
                          <h2 className="text-lg font-medium text-gray-900 mb-3">
                            {item.name}
                          </h2>
                          <p className="mb-3  font-medium text-gray-900">
                            Size: {item.kichco}
                          </p>
                          <p className="font-medium text-gray-900 mb-3">
                            Số lượng :
                            <span className="font-medium text-red-500 mb-3">
                              {item.quantity}&nbsp;
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
                      </div>
                      <div className="inline-flex items-center gap-10">
                        <p className="font-medium text-red-500">
                          {Intl.NumberFormat().format(item.giaTien)}
                          &nbsp;₫
                        </p>

                        {info.trangThai < 4 && (
                          <Tooltip title="Xóa sản phẩm" arrow={true}>
                            <Button
                              color="red"
                              onClick={() => onHandleDelete(item.id)}
                            >
                              <DeleteIcon />
                            </Button>
                          </Tooltip>
                        )}
                        {info.trangThai < 4 && (
                          <Tooltip title="Chỉnh sửa số lượng" arrow={true}>
                            <Button
                              color="yellow"
                              onClick={() => {
                                showModalLichSuSP();
                                getSPCT(item.id);
                              }}
                            >
                              <EditIcon />
                            </Button>
                          </Tooltip>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {rowsSPCTTra.length > 0 && (
                <div className="row table-san-pham ">
                  <h1 className="m-3">Danh sách sản phẩm trả</h1>
                  <Divider />
                  {rowsSPCTTra.map((item, index) => (
                    <div
                      className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                      key={index}
                    >
                      <div style={{ position: "relative" }}>
                        <img
                          src={item.imageUrl}
                          alt="product-image"
                          className="w-full rounded-lg sm:w-20 me-10 object-contain"
                          style={{
                            width: "7rem",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            right: 16,
                            left: -10,
                            zIndex: 1,
                          }}
                        >
                          <DiscountTag
                            discount={
                              kmspcts.find(
                                (x) => x.id_chi_tiet_san_pham.id == item.id
                              )?.id_khuyen_mai.giaTriPhanTram
                            }
                          />
                        </div>
                      </div>

                      <div className="flex justify-between w-full">
                        <div>
                          <div className=" sm:mt-0">
                            <h2 className="text-lg font-medium text-gray-900 mb-3">
                              {item.name}
                            </h2>
                            <p className="mb-3  font-medium text-gray-900">
                              Size: {item.kichco}
                            </p>
                            <p className="font-medium text-gray-900 mb-3">
                              Số lượng :
                              <span className="font-medium text-red-500 mb-3">
                                {item.quantity}&nbsp;
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
                        </div>
                        <div className="inline-flex items-center gap-10">
                          <p className="font-medium text-red-500">
                            {Intl.NumberFormat().format(item.giaTien)}
                            &nbsp;₫
                          </p>

                          {info.trangThai < 4 && (
                            <Tooltip title="Xóa sản phẩm" arrow={true}>
                              <Button
                                color="red"
                                onClick={() => onHandleDelete(item.id)}
                              >
                                <DeleteIcon />
                              </Button>
                            </Tooltip>
                          )}
                          {info.trangThai < 4 && (
                            <Tooltip title="Chỉnh sửa số lượng" arrow={true}>
                              <Button
                                color="yellow"
                                onClick={() => {
                                  showModalLichSuSP();
                                  getSPCT(item.id);
                                }}
                              >
                                <EditIcon />
                              </Button>
                            </Tooltip>
                          )}
                        </div>
                        <div>
                          <h2 className="text-sm font-medium text-gray-900 mb-3">
                            Lý do đỏi trả : {item.ghiChu}
                          </h2>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

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
                        //handleCancelLichSuSP();
                        onHandleUpdate(spct.id);
                      }}
                    >
                      <EditIcon />
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
                          </h2>
                          <p className="mb-3  font-medium text-gray-900">
                            Size: {spct.kichco}
                          </p>
                          <p className="font-medium text-gray-900 mb-3">
                            Số lượng :
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
                      </div>
                    </div>
                  </div>
                </div>
              </Modal>

              <div className="flex justify-end me-4">
                <div>
                  <div className="grid grid-cols-2 gap-1  pt-3">
                    <p className="font-normal text-lg">Tiền Hàng : </p>
                    <p
                      className="font-normal text-red-500"
                      style={{ fontSize: "16px" }}
                    >
                      {Intl.NumberFormat().format(
                        rowsSPCT.reduce(
                          (sum, element) =>
                            sum + element.quantity * element.price,
                          0
                        )
                      )}
                      &nbsp;₫
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <p className="font-normal text-lg"> Phí Vận Chuyển : </p>
                    <p
                      className="font-normal text-red-500"
                      style={{ fontSize: "16px" }}
                    >
                      {Intl.NumberFormat().format(info.tienShip)}&nbsp;₫
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-1  ">
                    <p className="font-normal text-lg"> Tiền giảm : </p>
                    <p
                      className="font-normal text-red-500"
                      style={{ fontSize: "16px" }}
                    >
                      {Intl.NumberFormat().format(info.tienGiam)}&nbsp;₫
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-1  pe-3  ">
                    <p className="font-normal text-lg"> Tổng Tiền : </p>
                    <p
                      className="font-normal text-red-500"
                      style={{ fontSize: "16px" }}
                    >
                      {Intl.NumberFormat().format(
                        rowsSPCT.reduce(
                          (sum, element) =>
                            sum + element.quantity * element.price,
                          0
                        )
                      )}
                      &nbsp;₫
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* dialog lịch su hoa don */}
      <Modal 
      open={isModalOpenLichSu} 
     
      onCancel={()=> setIsModalOpenLichSu(false)}
      // onOK={()=> setIsModalOpenLichSu(false)}
      width={1000}
      
      footer={[
        <>
      <Button color="red" onClick={()=> setIsModalOpenLichSu(false)} >
       Thoát
      </Button>
        </>
      ]}
      ><div>
        <p style={{fontSize : 20 , marginBottom : 15}}>Lịch sử hóa đơn</p>
        <div>
            <Table aria-label="Example table with dynamic content">
            <TableHeader columns={columnsLSHD}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={rowsLichSu}>
              {(item) => (
                <TableRow key={item.key}>
                  {(columnKey) => (
                    <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
          
      </div>
        
    
      </Modal>
      {/* <Dialog open={open} handler={handleOpen} size="xl">
        <DialogHeader>Lịch sử hóa đơn</DialogHeader>
        <DialogBody>
          <Table aria-label="Example table with dynamic content">
            <TableHeader columns={columnsLSHD}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={rowsLichSu}>
              {(item) => (
                <TableRow key={item.key}>
                  {(columnKey) => (
                    <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Thoát</span>
          </Button>
        </DialogFooter>
      </Dialog> */}

      {/* confirm xóa */}
      <Modal 
      open={isModalOpenXoaSP} 
      centered
      onCancel={cancelDelete}
      onOK={confirmDelete}
      width={600}
      height={180}
      footer={[
        <>
        <Button color="black" className="me-3" onClick={cancelDelete}>
        Hủy
      </Button>
      <Button color="red" onClick={confirmDelete} >
        Tiếp tục
      </Button>
        </>
      ]}
      >
        
      <div className="flex">
        <CiWarning style={{ color: "red", fontSize: 25  }}  /> 
        <p style={{  fontSize: 20  }}>Thông báo</p>
      </div>

         
          <div className="grid">
            <span style={{ fontSize: 15 , marginTop : 20 , marginBottom : 20  }}>
            Bạn có muốn xóa sản phẩm này không ?
            </span>
          </div>
       
      </Modal>

      {/* <Dialog open={deleteConfirmationOpen} handler={cancelDelete}>
        <DialogHeader>
          <CiWarning style={{ color: "red", fontSize: 40 }} />
          <span>Cảnh báo</span>
        </DialogHeader>
        <DialogBody>
          <div className="grid justify-items-center">
            <span style={{ fontSize: 20 }}>
              Bạn có muốn xóa sản phẩm này không ?
            </span>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button color="black" className="me-3" onClick={cancelDelete}>
            Hủy
          </Button>
          <Button color="red" onClick={confirmDelete}>
            Vẫn xóa
          </Button>
        </DialogFooter>
      </Dialog> */}

      {/* confirm lùi */}
      <Modal 
      open={isModalOpenLuiTrangThai} 
      centered
      onCancel={cancelLuiHD}
      onOK={confirmLuiHD}
      width={600}
      height={180}
      footer={[
        <>
        <Button color="black" className="me-3" onClick={cancelLuiHD}>
        Hủy
      </Button>
      <Button color="red" onClick={confirmLuiHD} >
        Tiếp tục
      </Button>
        </>
      ]}
      >
        
      <div className="flex">
        <CiWarning style={{ color: "red", fontSize: 25  }}  /> 
        <p style={{  fontSize: 20  }}>Thông báo</p>
      </div>

         
          <div className="grid">
            <span style={{ fontSize: 15 , marginTop : 20 , marginBottom : 20  }}>
            Bạn có muốn cập nhật về trạng thái trước của hóa đơn này không ?
            </span>
          </div>
       
      </Modal>
      {/* <Dialog open={luiHDConfirmationOpen} onClose={cancelLuiHD}>
        <DialogHeader>
          <CiWarning style={{ color: "yellow", fontSize: 40 }} />
          <span>Thông báo</span>
        </DialogHeader>
        <DialogBody>
          <div className="grid justify-items-center">
            <span style={{ fontSize: 20 }}>
              Bạn có muốn cập nhật về trạng thái trước của hóa đơn này không ?
            </span>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button color="black" className="me-3" onClick={cancelLuiHD}>
            Hủy
          </Button>
          <Button color="red" onClick={confirmLuiHD}>
            Vẫn cập nhật
          </Button>
        </DialogFooter>
      </Dialog> */}
      
      {/* confirm tiến */}
      <Modal 
      open={isModalOpenTienTrangThai} 
      centered
      onCancel={handleCancelChuyenTrangThai}
      onOK={confirmAddLSHD}
      width={600}
      height={180}
      footer={[
        <>
        <Button color="black" className="me-3" onClick={handleCancelChuyenTrangThai}>
        Hủy
      </Button>
      <Button color="red" onClick={confirmAddLSHD} >
        Tiếp tục
      </Button>
        </>
      ]}
      >
        
      <div className="flex">
        <CiWarning style={{ color: "red", fontSize: 25  }}  /> 
        <p style={{  fontSize: 20  }}>Thông báo</p>
      </div>

         
          <div className="grid">
            <span style={{ fontSize: 15 , marginTop : 20 , marginBottom : 20  }}>
            Bạn có muốn cập nhật trạng thái hóa đơn này không ?
            </span>
          </div>
       
      </Modal>
      {/* <Dialog open={addLSHDConfirmationOpen} onClose={cancelAddLSHD}>
        <DialogHeader>
          <CiWarning style={{ color: "yellow", fontSize: 40 }} />
          <span>Thông báo</span>
        </DialogHeader>
        <DialogBody>
          <div className="grid justify-items-center">
            <span style={{ fontSize: 20 }}>
              Bạn có muốn cập nhật trạng thái hóa đơn này không ?
            </span>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button color="black" className="me-3" onClick={cancelAddLSHD}>
            Hủy
          </Button>
          <Button color="red" onClick={confirmAddLSHD}>
            Vẫn cập nhật
          </Button>
        </DialogFooter>
      </Dialog> */}

      {/* confirm hủy hóa đơn */}
      <Modal 
      open={isModalOpenHuy} 
      centered
      onCancel={cancelCancelHD}
      onOK={confirmCancelHD}
      width={600}
      height={180}
      footer={[
        <>
        <Button color="black" className="me-3" onClick={cancelCancelHD}>
        Hủy
      </Button>
      <Button color="red" onClick={confirmCancelHD} >
        Tiếp tục
      </Button>
        </>
      ]}
      >
        
      <div className="flex">
        <CiWarning style={{ color: "red", fontSize: 25  }}  /> 
        <p style={{  fontSize: 20  }}>Thông báo</p>
      </div>

         
          <div className="grid">
            <span style={{ fontSize: 15 , marginTop : 20 , marginBottom : 20  }}>
            Bạn có muốn hủy hóa đơn này không ?
            </span>
          </div>
       
      </Modal>
      {/* <Dialog open={cancleHDConfirmationOpen} handler={cancelCancelHD}>
        <DialogHeader>
          <CiWarning style={{ color: "yellow", fontSize: 40 }} />
          <span>Thông báo</span>
        </DialogHeader>
        <DialogBody>
          <div className="grid justify-items-center">
            <span style={{ fontSize: 20 }}>
              Bạn có muốn hủy hóa đơn này không ?
            </span>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button color="black" className="me-3" onClick={cancelCancelHD}>
            Hủy
          </Button>
          <Button color="red" onClick={confirmCancelHD}>
            Vẫn Hủy
          </Button>
        </DialogFooter>
      </Dialog> */}
      {/* confirm update sl */}
      <Modal 
      open={isModalOpenUpdateSL} 
      centered
      onCancel={cancelUpdate}
      onOK={confirmUpdate}
      width={600}
      height={180}
      footer={[
        <>
        <Button color="black" className="me-3" onClick={cancelUpdate}>
        Hủy
      </Button>
      <Button color="red" onClick={confirmUpdate} >
        Tiếp tục
      </Button>
        </>
      ]}
      >
        
      <div className="flex">
        <CiWarning style={{ color: "red", fontSize: 25  }}  /> 
        <p style={{  fontSize: 20  }}>Thông báo</p>
      </div>

         
          <div className="grid">
            <span style={{ fontSize: 15 , marginTop : 20 , marginBottom : 20  }}>
            Bạn có muốn cập nhật số lượng sản phẩm này không ?
            </span>
          </div>
       
      </Modal>
      {/* <Dialog open={updateConfirmationOpen} handler={cancelUpdate}>
        <DialogHeader>
          <CiWarning style={{ color: "yellow", fontSize: 40 }} />
          <span>Thông báo</span>
        </DialogHeader>
        <DialogBody>
          <div className="grid justify-items-center">
            <span style={{ fontSize: 20 }}>
              Bạn có muốn cập nhật số lượng sản phẩm này không ?
            </span>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button color="black" className="me-3" onClick={cancelUpdate}>
            Hủy
          </Button>
          <Button color="red" onClick={confirmUpdate}>
            Vẫn cập nhật
          </Button>
        </DialogFooter>
      </Dialog> */}

      {/* confirm thanh toán */}
      <Modal 
      open={isModalOpenThanhToan} 
      centered
      onCancel={cancelThanhToan}
      onOK={confirmThanhToan}
      width={600}
      height={180}
      footer={[
        <>
        <Button color="black" className="me-3" onClick={cancelThanhToan}>
        Hủy
      </Button>
      <Button color="red" onClick={confirmThanhToan} >
        Tiếp tục
      </Button>
        </>
      ]}
      >
        
      <div className="flex">
        <CiWarning style={{ color: "red", fontSize: 25  }}  /> 
        <p style={{  fontSize: 20  }}>Thông báo</p>
      </div>

         
          <div className="grid">
            <span style={{ fontSize: 15 , marginTop : 20 , marginBottom : 20  }}>
              Bạn có muốn thanh toán này không ?
            </span>
          </div>
       
      </Modal>
      {/* <Dialog open={thanhToanConfirmationOpen} onClose={cancelThanhToan}>
        <DialogHeader>
          <CiWarning style={{ color: "yellow", fontSize: 40 }} />
          <span>Thông báo</span>
        </DialogHeader>
        <DialogBody>
          <div className="grid justify-items-center">
            <span style={{ fontSize: 20 }}>
              Bạn có muốn thanh toán này không ?
            </span>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button color="black" className="me-3" onClick={cancelThanhToan}>
            Hủy
          </Button>
          <Button color="red" onClick={confirmThanhToan}>
            Tiếp tục
          </Button>
        </DialogFooter>
      </Dialog> */}




    
   {/* chuyển trang thái hóa đơn */}
      {/* <Modal 
      open={isModalOpenTienTrangThai} 
      centered
      onCancel={handleCancelChuyenTrangThai}
      onOK={confirmAddLSHD}
      width={600}
      height={180}
      footer={[
        <>
        <Button color="black" className="me-3" onClick={handleCancelChuyenTrangThai}>
        Hủy
      </Button>
      <Button color="red" onClick={confirmAddLSHD} >
        Tiếp tục
      </Button>
        </>
      ]}
      >
        
      <div className="flex">
        <CiWarning style={{ color: "red", fontSize: 25  }}  /> 
        <p style={{  fontSize: 20  }}>Thông báo</p>
      </div>
          <div className="grid">
            <span style={{ fontSize: 15 , marginTop : 20 , marginBottom : 20  }}>
              Bạn có muốn chuyển trạng thái không   ?
            </span>
          </div>
       
      </Modal> */}

    </>
  );
}

export default DetailHoadon;



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

const columnsLSHD = [
  {
    key: "description",
    label: "Mô tả",
  },
  {
    key: "ghiChu",
    label: "Ghi chú",
  },
  {
    key: "maNV",
    label: "Mã nhân viên",
  },
  {
    key: "tenNV",
    label: "Tên nhân viên",
  },
  {
    key: "date",
    label: "Thời gian",
  },
  // {
  //   key: "nguoiXacNhan",
  //   label: "Người xác nhận",
  // },
];


