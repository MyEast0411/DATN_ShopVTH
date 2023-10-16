import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { InputNumber } from "antd";
import { TableCell } from "@mui/material";
//icon
import { AiOutlinePlus } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { Button, Modal, Table } from "antd";
import Badge from "@mui/material/Badge";

export default function ThemSanPham() {
  let navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedKichCo, setSelectedKichCo] = useState([]);
  const [isBlur, setIsBlur] = useState(false);
  const [mauSac, setMauSac] = useState([]);
  const [thuongHieu, setThuongHieu] = useState([]);
  const [chatLieu, setChatLieu] = useState([]);
  const [deGiay, setDeGiay] = useState([]);
  const [kichCo, setKichCo] = useState([]);
  const [nhanHieu, setNhanHieu] = useState([]);
  const [sanPham, setSanPham] = useState({
    ma: "",
    ten: "",
    soLuongTon: "",
    khoiLuong: "",
    moTa: "",
    giaNhap: "",
    giaBan: "",
    id_mau_sac: "",
    id_kich_co: "",
    id_chat_lieu: "",
    id_de_giay: "",
    id_thuong_hieu: "",
    id_nhan_hieu: "",
  });

  const {
    ma,
    ten,
    soLuongTon,
    khoiLuong,
    moTa,
    giaBan,
    giaNhap,
    id_thuong_hieu,
    id_chat_lieu,
    id_de_giay,
    id_kich_co,
    id_mau_sac,
    id_nhan_hieu,
  } = sanPham;

  //table data
  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === "id" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "tenSanPham",
      key: "tenSanPham",
      filteredValue: filteredInfo.tenSanPham || null,
      onFilter: (value, record) => record.tenSanPham.includes(value),
      sorter: (a, b) => a.tenSanPham.length - b.tenSanPham.length,
      sortOrder:
        sortedInfo.columnKey === "tenSanPham" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Số lượng",
      dataIndex: "soLuongTon",
      sorter: (a, b) => a.soLuongTon - b.soLuongTon,
      sortOrder: sortedInfo.columnKey === "soLuongTon" ? sortedInfo.order : null,
      ellipsis: true,
      render: (text, record) => (
        <InputNumber
          value={record.soLuongTon}
          onChange={(value) => handleSoLuongChange(record.key, value)}
        />
      ),
    },
    {
      title: "Giá bán",
      dataIndex: "giaBan",
      sorter: (a, b) => a.giaBan - b.giaBan,
      sortOrder: sortedInfo.columnKey === "giaBan" ? sortedInfo.order : null,
      ellipsis: true,
      render: (text, record) => (
        <InputNumber
          value={record.giaBan}
          onChange={(value) => handleGiaBanChange(record.key, value)}
        />
      ),
    },
    {
      dataIndex: "hanhDong",
      title: "Hành động",
      width: 200,
      render: (params) => (
        <div className="flex items-center">
          <div className="group relative">
            <MdDeleteOutline
              className="cursor-pointer text-xl delete-hover relative"
              onClick={() => {
              }}
            />
            <span className="text invisible group-hover:visible absolute -top-2 left-8 border border-gray-500 p-2">Xóa</span>
          </div>
        </div>
      ),
    },
    {
      title: "Ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
    }
  ];
  
  const paginationOptions = {
    defaultPageSize: 5
  };

  const handleSoLuongChange = (key, value) => {
    // Tìm dòng dữ liệu theo key và cập nhật giá trị soLuong
    const updatedData = dataSource.map((item) => {
      if (item.key === key) {
        return { ...item, soLuong: value };
      }
      return item;
    });
    // Cập nhật dữ liệu
    //setDataSource(updatedData);
  };
  
  const handleGiaBanChange = (key, value) => {
    // Tìm dòng dữ liệu theo key và cập nhật giá trị giaBan
    const updatedData = dataSource.map((item) => {
      if (item.key === key) {
        return { ...item, giaBan: value };
      }
      return item;
    });
    // Cập nhật dữ liệu
    //setDataSource(updatedData);
  };
  
// -------------------------end table data-------------------------


  // ------------------------modal mau sac-------------------------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // ------------------------modal kich co-------------------------
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const showModal1 = () => {
    setIsModalOpen1(true);
  };
  const handleOk1 = () => {
    setIsModalOpen1(false);
  };
  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };
  // ---------------------------------------------------------------
  const onChange = (e) => {
    setSanPham({ ...sanPham, [e.target.name]: e.target.value });
  };
  const data = [
    {
      key: "1",
      STT: 1,
      tenSanPham: "JORDAN-AIR",
      soLuong: 1,
      giaBan: "320,000"
    }
  ];
  const loadTable = () => {
    const tableData = [];
    let index = 1;
    for (const mau of selectedColors) {
      for (const kichCo of selectedKichCo) {
        const sp = {
          id: index,
          ten: sanPham.ten,
          tenSanPham: sanPham.ten + ` [ ${kichCo} - ${mau} ]`,
          soLuongTon: 1,
          khoiLuong: 1,
          moTa: sanPham.moTa,
          giaNhap: "100,000",
          giaBan: "200,000",
          id_mau_sac: mau,
          id_kich_co: kichCo,
          id_thuong_hieu : sanPham.id_thuong_hieu,
          id_nhan_hieu : sanPham.id_nhan_hieu,
          id_chat_lieu : sanPham.id_chat_lieu,
          id_de_giay : sanPham.id_de_giay
        };
        tableData.push(sp);
        index+=1;
      }
    }
    setTableData(tableData);
    console.log(tableData);
  };
  useEffect(() => {
    loadTable();
  },[data])
  useEffect(() => {
    getAllKC();
    getAllNH();
    getAllMS();
    getAllCL();
    getAllDG();
    getAllTH();
  }, []);
  const getAllNH = async () => {
    await axios.get("http://localhost:8080/getAllNH").then((response) => {
      setNhanHieu(response.data);
    });
  };
  const getAllMS = async () => {
    await axios.get("http://localhost:8080/getAllMS").then((response) => {
      setMauSac(response.data);
    });
  };

  const getAllTH = async () => {
    await axios.get("http://localhost:8080/getAllTH").then((response) => {
      setThuongHieu(response.data);
    });
  };

  const getAllCL = async () => {
    await axios.get("http://localhost:8080/getAllCL").then((response) => {
      setChatLieu(response.data);
    });
  };

  const getAllDG = async () => {
    await axios.get("http://localhost:8080/getAllDG").then((response) => {
      setDeGiay(response.data);
    });
  };

  const getAllKC = async () => {
    await axios.get("http://localhost:8080/getAllKC").then((response) => {
      setKichCo(response.data);
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = tableData.map((sp) => [sp.id, sp.ten, sp.tenSanPham, sp.soLuongTon, sp.khoiLuong,
       sp.moTa, sp.giaNhap, sp.giaBan, sp.id_mau_sac, sp.id_kich_co,sp.id_thuong_hieu,sp.id_nhan_hieu,
       sp.id_chat_lieu,sp.id_de_giay]);
    console.log(data);
    await axios
      .post("http://localhost:8080/san-pham/add", data)
      .then((response) => {
        console.log(response);
        toast.success(`Thêm thành công`, {
          position: "top-right",
          autoClose: 2000,
        });
        navigate("/quan-ly-san-pham/san-pham");
      })
      .catch((error) => {
        toast.error(`Thêm thất bại`, {
          position: "top-right",
          autoClose: 2000,
        });
        console.log(error);
      });
  };

  const handleRemoveColor = (maMau) => {
    setSelectedColors((prevSelected) =>
      prevSelected.filter((color) => color !== maMau)
    );
  };

  const handleRemoveKichCo = (ten) => {
    setSelectedKichCo((prevSelected) =>
      prevSelected.filter((kichCo) => kichCo !== ten)
    );
  };
  return (
    <>
      <div className="mx-5 md:mx-12">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Thêm mới sản phẩm
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Điền thông tin chi tiết sản phẩm
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Tên sản phẩm
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="ten"
                        value={ten}
                        className="block p-2 flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Nhập tên sản phẩm"
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Mô tả
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="moTa"
                      name="moTa"
                      placeholder=" Nhập mô tả sản phẩm"
                      rows={4}
                      className="block w-11/12 p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600"></p>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                {/* <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Giá bán
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="giaBan"
                      id="giaBan"
                      placeholder=" ..."
                      className="block w-80 rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div> */}
                {/* <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Giá nhập
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="giaNhap"
                      id="giaNhap"
                      placeholder=" ..."
                      className="block w-80 rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div> */}

                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Thương hiệu
                  </label>
                  <div className="mt-2 space-x-2 flex">
                    <select
                      id="thuongHieu"
                      name="id_thuong_hieu"
                      autoComplete="country-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      onChange={(e) => onChange(e)}
                    >
                      <option selected>--Chọn Thương Hiệu--</option>
                      {thuongHieu.map((x) => (
                        <option
                          key={x.id}
                          value={x.id}
                          //style={{ backgroundColor: x.maMau, color: "white" }}
                        >
                          {x.ten}
                        </option>
                      ))}
                    </select>
                    <div className="p-2" style={{
                      backgroundColor: "#00C5CD",
                      borderRadius: "5px",
                      color: "white",
                      cursor: "pointer",
                    }}>
                      <AiOutlinePlus />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Nhãn hiệu
                  </label>
                  <div className="mt-2 space-x-2 flex">
                    <select
                      id="nhanHieu"
                      name="id_nhan_hieu"
                      autoComplete="country-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      onChange={(e) => onChange(e)}
                    >
                      <option selected>--Chọn Nhãn Hiệu--</option>
                      {nhanHieu.map((x) => (
                        <option key={x.id} value={x.id}>
                          {x.ten}
                        </option>
                      ))}
                    </select>
                    <div className="p-2" style={{
                      backgroundColor: "#00C5CD",
                      borderRadius: "5px",
                      color: "white",
                      cursor: "pointer",
                    }}>
                      <AiOutlinePlus />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="chatLieu"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Chất Liệu
                  </label>
                  <div className="mt-2 space-x-2 flex">
                    <select
                      id="chatLieu"
                      name="id_chat_lieu"
                      onChange={(e) => onChange(e)}
                      autoComplete="country-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value="" selected>
                        --Chọn Chất Liệu--
                      </option>
                      {chatLieu.map((x) => (
                        <option key={x.id} value={x.id}>
                          {x.ten}
                        </option>
                      ))}
                    </select>
                    <div className="p-2" style={{
                      backgroundColor: "#00C5CD",
                      borderRadius: "5px",
                      color: "white",
                      cursor: "pointer",
                    }}>
                      <AiOutlinePlus />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="deGiay"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Đế giày
                  </label>
                  <div className="mt-2 space-x-2 flex">
                    <select
                      id="deGiay"
                      name="id_de_giay"
                      onChange={(e) => onChange(e)}
                      autoComplete="country-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option selected>--Chọn Đế Giày--</option>
                      {deGiay.map((x) => (
                        <option key={x.id} value={x.id}>
                          {x.ten}
                        </option>
                      ))}
                    </select>
                    <div className="p-2" style={{
                      backgroundColor: "#00C5CD",
                      borderRadius: "5px",
                      color: "white",
                      cursor: "pointer",
                    }}>
                      <AiOutlinePlus />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Màu sắc
                  </label>
                  <div className="mt-2 space-x-3 flex">
                    {
                      selectedColors.map((item,index) => (
                        <Badge
                          className="cursor-pointer"
                          badgeContent={"--"}
                          color="error"
                          key={index}
                          onClick={() => handleRemoveColor(item)}
                        >
                          <div
                            style={{
                              backgroundColor: item,
                              border: "1px solid #ccc",
                              borderRadius: "5px",
                              padding: "5px 7px",
                              width: "35px",
                              height: "35px",
                            }}
                          ></div>
                        </Badge>
                      ))
                    }
                    <div
                      className="inline-block "
                      style={{
                        backgroundColor: "#00C5CD",
                        borderRadius: "5px",
                        color: "white",
                        cursor: "pointer",
                        width: "35px",
                        height: "35px",
                        padding: "9px",
                      }}
                    >
                      <AiOutlinePlus onClick={showModal} />
                    </div>
                    <Modal
                      title="Chọn màu sắc"
                      open={isModalOpen}
                      onOk={handleOk}
                      onCancel={handleCancel}
                      cancelText="Hủy"
                      okText="Thêm"
                      style={{ position: "relative" }}
                    >
                      <div style={{ display: "flex", flexWrap: "wrap"}}>
                      {
                        mauSac.map((item) => (
                          <div
                          key={item.id}
                          className={`flex justify-center text-white cursor-pointer ${
                            selectedColors.includes(item.maMau) ? "border-2" : "border-none"
                          }`}
                          style={{
                            width: "20%",
                            height: "25px",
                            backgroundColor: item.maMau,
                            borderRadius: "5px",
                            alignItems: "center",
                            marginTop: "35px",
                            borderColor: "yellow",
                            marginRight: "5px"
                          }}
                          onClick={() => {
                            if (selectedColors.includes(item.maMau)) {
                              setSelectedColors((prevSelected) =>
                                prevSelected.filter((color) => color !== item.maMau)
                              );
                            } else {
                              if (selectedColors.length < 3) {
                                setSelectedColors((prevSelected) => [...prevSelected, item.maMau]);
                              }
                            }
                            console.log(selectedColors);
                          }}>
                          {item.maMau}
                          </div>
                        ))
                      }
                      
                      </div>
                      <div>
                        <Button
                          className="flex drop-shadow-lg"
                          type="primary"
                          style={{
                            backgroundColor: "white",
                            alignItems: "center",
                            position: "absolute",
                            right: 5,
                            top: 50,
                            color: "black",
                            border: "0.5px solid #ccc",
                            marginRight: "3.5%",
                          }}
                        >
                          <AiOutlinePlus className="mr-2" />
                          Thêm màu sắc
                        </Button>
                      </div>
                    </Modal>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Kích cỡ
                  </label>
                  <div className="mt-2 space-x-3 flex">
                    {
                      selectedKichCo.map((item,index) => (
                        <Badge
                          className="cursor-pointer"
                          badgeContent={"--"}
                          color="error"
                          key={index}
                          onClick={() => handleRemoveKichCo(item)}
                        >
                          <div
                            style={{
                              border: "1px solid #ccc",
                              borderRadius: "5px",
                              padding: "5px 7px",
                              width: "35px",
                              height: "35px",
                              color: "black"
                            }}
                          >{item}</div>
                        </Badge>
                      ))
                    }
                    <div
                      className="inline-block "
                      style={{
                        borderRadius: "5px",
                        backgroundColor : "#00C5CD",
                        color: "black",
                        cursor: "pointer",
                        width: "35px",
                        height: "35px",
                        padding: "9px",
                      }}
                    >
                      <AiOutlinePlus onClick={showModal1}/>
                    </div>
                    <Modal
                      title="Chọn kích cỡ"
                      open={isModalOpen1}
                      onOk={handleOk1}
                      onCancel={handleCancel1}
                      cancelText="Hủy"
                      okText="Thêm"
                      style={{ position: "relative" }}
                      className=""
                    >
                      <div style={{ display: "flex", flexWrap: "wrap"}}>
                      {
                        kichCo.map((item) => (
                          <div
                          key={item.id}
                          className={`flex justify-center text-white cursor-pointer ${
                            selectedKichCo.includes(item.ten) ? "selectedKichCo" : "border-none"
                          }`}
                          style={{
                            width: "70px",
                            height: "35px",
                            borderRadius: "5px",
                            alignItems: "center",
                            marginTop: "35px",
                            borderColor: "yellow",
                            marginRight: "5px",
                            color:"black",
                          }}
                          onClick={() => {
                            if (selectedKichCo.includes(item.ten)) {
                              setSelectedKichCo((prevSelected) =>
                                prevSelected.filter((kichCo) => kichCo !== item.ten)
                              );
                            } else {
                              if (selectedKichCo.length < 3) {
                                setSelectedKichCo((prevSelected) => [...prevSelected, item.ten]);
                              }
                            }
                            console.log(selectedKichCo);
                          }}>
                          {item.ten}
                          </div>
                        ))
                      }
                      </div>

                      <div>
                        <Button
                          className="flex drop-shadow-lg"
                          type="primary"
                          style={{
                            backgroundColor: "white",
                            alignItems: "center",
                            position: "absolute",
                            right: 5,
                            top: 50,
                            color: "black",
                            border: "0.5px solid #ccc",
                            marginRight: "3.5%",
                          }}
                        >
                          <AiOutlinePlus className="mr-2" />
                          Thêm kích cỡ
                        </Button>
                      </div>
                    </Modal>
                  </div>
                </div>

                {/* <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Số lượng tồn
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      min={1}
                      name="soLuongTon"
                      placeholder="1"
                      className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div> */}
                {/* <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Khối lượng
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      placeholder="Nhập khối lượng"
                      name="khoiLuong"
                      className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div> */}
                {/* <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Hình ảnh sản phẩm
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="https://assets.nike.com/medias/sys_master/root/20211224/1tuJ/61c4c229aeb26901101a29d1/-1117Wx1400H-469034008-black-MODEL.jpg"
                      className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
            type="button"
              className="rounded-md mb-5 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={loadTable}
            >
              Hoàn tất
            </button>
          </div>
          <Table
            columns={columns}
            dataSource={tableData}
            onChange={handleChange}
            pagination={paginationOptions} 
            scroll={{ y: 2000 }}
          />
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Link
              to="/quan-ly-san-pham/san-pham"
              type="button"
              className="text-sm rounded-md  font-semibold leading-6 text-gray-900"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Thêm sản phẩm
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
