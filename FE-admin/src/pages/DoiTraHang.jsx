import { Button, Input, Table, Space, InputNumber } from "antd";
import React, { useState } from "react";
import { FaShippingFast } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa6";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { Tooltip } from "antd";
import { Result } from "antd";
import axios from "axios";
import InforBill from "../components/tra_hang/InforBill";
import { IoIosAddCircleOutline } from "react-icons/io";
import { HiOutlineMinusCircle } from "react-icons/hi";
import { Info } from "luxon";
const { TextArea } = Input;

export default function DoiTraHang() {
  const [maHD, setMaHD] = useState("");
  const [hdChosed, setHdChosed] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [hdTra, setHDtra] = useState([]);
  const [inforKH, setInforKH] = useState(null);
  const [tongTien, setTongTien] = useState(0);
  const [tienTra, setTienTra] = useState(0);
  const [tienTongSauTra, setTienTongSauTra] = useState(0);

  // const handleChange = (selectedRowKeys, selectedRows) => {
  //   // Lưu lại selectedRowKeys
  //   setSelectedRowKeys(selectedRowKeys);

  //   // Cập nhật hdChosed với số lượng mới
  //   const updatedHdChosed = hdChosed.map((hd) => {
  //     const selected = selectedRows.find((row) => row.ma === hd.ma);
  //     if (selected) {
  //       return { ...hd, quantity: selected.soLuong };
  //     }
  //     return hd;
  //   });
  //   setHdChosed(updatedHdChosed);
  //   setHDtra(selectedRows);
  // };
  const handleChange = (selectedRowKeys, selectedRows) => {
    const updatedHdChosed = hdChosed.map((hd) => {
      const selected = selectedRows.find((row) => row.ma === hd.ma);
      if (selected) {
        return { ...hd, quantity: selected.soLuong };
      }
      return { ...hd, quantity: 0 };
    });

    setHdChosed(updatedHdChosed);
    setSelectedRowKeys(selectedRowKeys);

    if (hdTra.length > 0) {
      const updateHDTra = selectedRows.map((hd) => {
        const selected = hdTra.find((row) => row.ma === hd.ma);
        if (selected) {
          return { ...hd, ghiChu: selected.ghiChu };
        }
        return { ...hd, ghiChu: "Lý do đổi trả" };
      });
      setHDtra(updateHDTra);
    } else {
      setHDtra(
        selectedRows.map((row) => ({ ...row, ghiChu: "Lý do đổi hàng" }))
      );
    }

    if (selectedRows.length > 0) {
      const spConLai = hdChosed.filter((hd) => {
        return !selectedRows.some((row) => row.ma === hd.ma);
      });

      const tongConLai = spConLai.reduce((total, hd) => {
        return total + hd.giaTien * hd.soLuong; // Giả sử 'gia' là thuộc tính chứa giá của sản phẩm
      }, 0);

      setTienTra(tongConLai);
      console.log(tongTien, tongConLai);
      setTienTongSauTra(tongConLai);
    }
  };
  const handleNoteChange = (ma, value) => {
    const updatedHdChosed = hdTra.map((hd) => {
      if (hd.ma === ma) {
        return { ...hd, ghiChu: value };
      }
      return hd;
    });
    // console.log(updatedHdChosed);
    setHDtra(updatedHdChosed);
  };

  const columns = [
    // {
    //   dataIndex: "ma",
    //   key: "ma",
    // },
    // {
    //   title: "Sản phẩm",
    //   dataIndex: "sanPham",
    //   key: "sanPham",
    //   render: (_, record) => (
    //     <Space>
    //       <img
    //         src={record.id_chi_tiet_san_pham.defaultImg}
    //         alt="product-image"
    //         style={{ width: "70px" }}
    //       />
    //       <span>{record.id_chi_tiet_san_pham.ten}</span>
    //     </Space>
    //   ),
    // },
    {
      title: "Sản phẩm",
      dataIndex: "sanPham",
      key: "sanPham",
      render: (_, record) => (
        <div style={{ borderBottom: 2 }}>
          {/* <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"> */}
          <div>
            {/* <div style={{ position: "relative" }}> */}

            {/* <div
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
              </div> */}
            {/* </div> */}

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
      dataIndex: "soLuong",
      key: "soLuong",
      render: (_, record) => (
        <Space size="middle">
          <Button
            style={{ backgroundColor: "#c0b1b1", borderRadius: "50%" }}
            onClick={() => handleDecreaseQuantity(record.ma)}
          >
            <HiOutlineMinusCircle style={{ color: "white" }} />
          </Button>
          <InputNumber
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

  const handleDecreaseQuantity = (ma) => {
    const updatedHdChosed = hdChosed.map((hd) => {
      if (hd.ma === ma && hd.quantity > 0) {
        return { ...hd, quantity: hd.quantity - 1 };
      }
      return hd;
    });
    setHdChosed(updatedHdChosed);
  };

  const handleIncreaseQuantity = (ma) => {
    const updatedHdChosed = hdChosed.map((hd) => {
      if (hd.ma === ma && hd.quantity < hd.soLuong) {
        return { ...hd, quantity: hd.quantity + 1 };
      }
      return hd;
    });
    setHdChosed(updatedHdChosed);
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
  const getData = async (value) => {
    setMaHD(value);
    await axios
      .get(`http://localhost:8080/hoa_don_chi_tiet/getHDDoiTra/${value}`)
      .then((res) => {
        //  console.log(res.data);
        setHdChosed(
          res.data.listHDCT.map((res) => {
            return {
              ...res,
              ma: res.id_chi_tiet_san_pham.ma,
              key: res.id_chi_tiet_san_pham.ma,
              quantity: 0,
              ghiChu: "",
            };
          })
        );
        // console.log(res.data.hoaDon);
        setInforKH(res.data.hoaDon);
        setTongTien(res.data.hoaDon.tongTien);
      });
  };

  const columns1 = [
    // {
    //   dataIndex: "ma",
    //   key: "ma",
    // },
    {
      title: "Sản phẩm",
      dataIndex: "sanPham",
      key: "sanPham",
      render: (_, record) => (
        <div style={{ borderBottom: 2 }}>
          {/* <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"> */}
          <div>
            {/* <div style={{ position: "relative" }}> */}

            {/* <div
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
              </div> */}
            {/* </div> */}

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
            <span>{Intl.NumberFormat().format(record.giaTien)} VND</span>
          </Space>
        </div>
      ),
    },
    {
      title: "Ghi chú",
      dataIndex: "ghiChu",
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
        <span>Đổi trả</span>
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
            onChange={(e) => getData(e.target.value)}
          />
          <Button size="large">Tìm kiếm</Button>
        </div>
        <div className="flex items-center">
          <Tooltip title="Quét mã hóa đơn">
            <Button size="large">
              <MdOutlineQrCodeScanner />
            </Button>
          </Tooltip>
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
              <Table columns={columns1} dataSource={hdTra} pagination={false} />
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
                  {inforKH?.tenKhachHang}
                </p>
                <p>
                  <span className="font-medium">Người Nhận</span> : A Chàng Đẹp
                  TRoai
                </p>
                <p>
                  <span className="font-medium">Địa chỉ</span>:{" "}
                  {inforKH?.diaChi}
                </p>
              </div>
              <div
                className="tongGia mb-4 p-5
                space-y-4
              "
              >
                <p class="flex justify-between">
                  <span className="font-medium">Tổng tiền</span>
                  <span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {Intl.NumberFormat().format(
                      hdTra.length > 0 ? tienTongSauTra : tongTien
                    )}{" "}
                    VND
                  </span>
                </p>
                <p class="flex justify-between">
                  <span className="font-medium">Giảm giá</span>
                  <span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {Intl.NumberFormat().format(
                      inforKH == null ? 0 : inforKH.id_voucher.giaTriMax
                    )}{" "}
                    VND
                  </span>
                </p>
                <p class="flex justify-between">
                  <span className="font-medium">Số tiền hoàn trả</span>
                  <span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {Intl.NumberFormat().format(
                      hdTra.length > 0 ? tongTien - tienTra : 0
                    )}{" "}
                    VND
                  </span>
                </p>
              </div>
              <div>
                <Button
                  style={{
                    width: "100%",
                    backgroundColor: "black",
                    color: "white",
                    height: "50px",
                  }}
                >
                  TRẢ HÀNG
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
