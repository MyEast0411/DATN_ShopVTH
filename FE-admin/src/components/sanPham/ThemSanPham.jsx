import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Form, InputNumber } from "antd";
import { TableCell } from "@mui/material";
import { TbInfoTriangle } from "react-icons/tb";
import {
  Button as ButtonMaterial,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
//loading
import TailSpinLoading from "../loading/TailSpinLoading";
import ThreeDotsLoading from "../loading/ThreeDotsLoading";

//icon
const { Option } = Select;
import { AiOutlinePlus } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { Button, Modal, Table, Tooltip, Select } from "antd";
import { Table as TableImg } from "antd";
import Badge from "@mui/material/Badge";
import { PlusIcon } from "../../common/otherComponents/PlusIcon";

export default function ThemSanPham() {
  let navigate = useNavigate();
  const [addConfirmationOpen, setAddConfirmationOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [tables, setTables] = useState([]);
  const [tableImg, setTableImg] = useState([]);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedKichCo, setSelectedKichCo] = useState([]);
  const [img, setImg] = useState([]);
  const [mauSac, setMauSac] = useState([]);
  const [theLoai, setTheLoai] = useState([]);
  const [thuongHieu, setThuongHieu] = useState([]);
  const [chatLieu, setChatLieu] = useState([]);
  const [deGiay, setDeGiay] = useState([]);
  const [kichCo, setKichCo] = useState([]);
  const [nhanHieu, setNhanHieu] = useState([]);
  const [selectMau, setSelectMau] = useState("");
  const [checkboxStates, setCheckboxStates] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingImg, setLoadingImg] = useState(false);
  const [form] = Form.useForm();
  const customText = {
    emptyText: "Không có hình ảnh",
  };
  const [sanPham, setSanPham] = useState({
    ma: "",
    ten: "",
    soLuongTon: "",
    khoiLuong: "",
    moTa: "",
    giaNhap: "",
    giaBan: "",
    id_san_pham: "",
    id_mau_sac: "",
    id_kich_co: "",
    id_chat_lieu: "",
    id_de_giay: "",
    id_thuong_hieu: "",
    id_the_loai: "",
  });
  const [deGiayModal, setDeGiayModal] = useState({
    tenDeGiay: "",
  });
  const { tenDeGiay } = deGiayModal;

  const [kichCoModal, setKichCoModal] = useState({
    tenKichCo: "",
  });

  const [sanPhamModal, setSanPhamModal] = useState({
    tenSanPham: "",
  });
  const { tenSanPham } = sanPhamModal;


  const [hinhAnhModal, setHinhAnhModal] = useState({
    imgUrl: "",
    mauSac: "",
  });

  const { tenKichCo } = kichCoModal;

  const {
    ma,
    ten,
    soLuongTon,
    khoiLuong,
    moTa,
    giaBan,
    giaNhap,
    id_san_pham,
    id_thuong_hieu,
    id_chat_lieu,
    id_de_giay,
    id_kich_co,
    id_mau_sac,
    id_the_loai,
    hinhAnh,
  } = sanPham;


  const handleImageChange = async (event) => {
    setLoadingImg(true);
    const file = event.target.files[0];
    if (file) {
      const fileName = file.name;

      await axios
        .post("http://localhost:8080/addHinhAnh", {
          imgUrl: fileName,
          mauSac: selectMau
        })
        .then((response) => {
          if (response.data != null) {
            // <Section>
            //   <Article key={"spin"}>
            //     <Prop>{"Đang tải ảnh"}</Prop>
            //   </Article>
            // </Section>
          }
          toast.success(`Thêm hình ảnh thành công`);
          getAllHA();
          setLoadingImg(false);
        })
        .catch((error) => {
          toast.error(`Thêm thất bại`);
          setLoadingImg(false);
        });
    }
  };

  const handleAddImageClick = () => {
    const imageInput = document.getElementById("imageInput");
    if (imageInput) {
      imageInput.click();
    }
  };

  //table data
  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };


  const columnImg = [
    {
      title: "Hình ảnh",
      dataIndex: "imageUrl",
      key: "imageUrl",
      align: "center",
      render: (text, record, index) => {
        return {
          children: (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={record}
                alt="Hình ảnh"
                style={{ width: "130px", height: "100px" }}
              />
            </div>
          ),
          props: {
            rowSpan: 3,
            style: {
              justifyContent: "center",
              alignItems: "center",
            },
          },
        };
      },
    },
  ];
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
      sortOrder:
        sortedInfo.columnKey === "soLuongTon" ? sortedInfo.order : null,
      ellipsis: true,
      render: (text, record, index) => {
        const isSelected = selectedRows.some(row => row.id === record.id);
        return isSelected ? (
          <InputNumber
            min={1}
            value={record.soLuongTon}
            onChange={(value) => handleSoLuongChange(record.id, value, record.id_mau_sac)}
          />
        ) : (
          <span>{record.soLuongTon}</span>
        )
      },
    },
    {
      title: "Giá bán",
      dataIndex: "giaBan",
      sorter: (a, b) => a.giaBan - b.giaBan,
      sortOrder: sortedInfo.columnKey === "giaBan" ? sortedInfo.order : null,
      ellipsis: true,
      render: (text, record) => {
        const isSelected = selectedRows.some(row => row.id === record.id);
        return isSelected ? (
          <InputNumber
            min={1}
            value={record.giaBan}
            onChange={(value) => handleGiaBanChange(record.id, value, record.id_mau_sac)}
          />
        ) : (
          <span>{record.giaBan}</span>
        )
      },
    },
    {
      dataIndex: "hanhDong",
      title: "Hành động",
      width: 200,
      render: (index, record) => (
        <div className="flex items-center">
          <div className="group relative">
            <MdDeleteOutline
              className="cursor-pointer text-xl delete-hover relative"
              onClick={() => {
                const updatedProducts = tables[record.id_mau_sac].filter(product => product.id !== record.id);
                setTables((prevTables) => ({
                  ...prevTables,
                  [record.id_mau_sac]: updatedProducts,
                }));
              }}
            />
            <span className="text invisible group-hover:visible absolute -top-2 left-8 border border-gray-500 p-2">
              Xóa
            </span>
          </div>
        </div>
      ),
    },
    {
      title: "Thêm ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (text, record, index) => {
        // console.log(tables[record.id_mau_sac].length);
        return {
          children: (
            <>
              <PlusIcon
                style={{
                  cursor: "pointer",
                  marginLeft: "100px",
                  // marginTop: "-50px",
                }}
                onClick={async () => {
                  let tenSP =
                    mauSac.find((x) => x.maMau === record.id_mau_sac)?.ten ||
                    "";
                  setSelectMau(tenSP);
                  await axios
                    .get(`http://localhost:8080/getHinhAnhByMau/${tenSP}`)
                    .then((response) => {
                      setImg(response.data);
                    });
                  showModalHA();
                }}
              />
              <Modal
                title="Thêm hình ảnh"
                open={isModalOpenHA}
                onOk={handleOkHA}
                onCancel={handleCancelHA}
                cancelText="Hủy"
                okText="Hoàn tất"
                style={{ position: "relative", top: "5px", left: "100px" }}
                width={800}
              >
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Tất cả hình ảnh theo : {selectMau}
                  </label>
                  {loadingImg ? (
                    <ThreeDotsLoading />
                  ) : (
                    <div className="flex flex-wrap">
                      {
                        img.map((x, index) => (
                          <div key={index} className="w-1/3 p-2 cursor-pointer">
                            <div className="relative w-60 h-56 bg-gray-300 mt-10">
                              <input
                                type="checkbox"
                                id={x.id}
                                checked={selectedImages.includes(x.id)}
                                onChange={(e) => handleCheckboxChange(e, x.id)}
                                className="absolute top-2 right-2 z-10"
                              />
                              <img
                                src={x.ten}
                                alt="Load Image"
                                style={{ objectFit: "contain" }}
                                className="w-full h-full object-cover"
                                onClick={() => {
                                  const checkbox = document.getElementById(
                                    x.id
                                  );
                                  if (checkbox) {
                                    checkbox.click();
                                  }
                                  if (selectedImages.includes(x.id)) {
                                    setSelectedImages(
                                      selectedImages.filter((id) => id != x.id)
                                    );
                                  } else {
                                    setSelectedImages([
                                      ...selectedImages,
                                      x.id,
                                    ]);
                                  }
                                }}
                              />
                            </div>
                          </div>
                        ))
                      }

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
                          marginTop: "1px",
                        }}
                        onClick={handleAddImageClick}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          style={{ display: "none" }}
                          id="imageInput"
                        />
                        <AiOutlinePlus className="mr-2" />
                        Thêm hình ảnh
                      </Button>
                    </div>)}
                </div>
              </Modal>
            </>
          ),
          props: {
            // rowSpan: record.rowSpan,
            style: {
              justifyContent: "center",
              alignItems: "center",
            },
          },
        };
      },
      onCell: (record, index) => {
        if (index === 3) {
          return {
            rowSpan: 1,
          };
        }

        if (index === 4) {
          return {
            rowSpan: 0,
          };
        }
        if (index === 1) {
          return {
            colSpan: 0,
          };
        }
        return {};
      },
      align: "center",
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowSoLuong, setSelectedRowSoLuong] = useState({});

  const onSelectChange = (newSelectedRowKeys, selectedRows) => {
    console.log("newSelectedRowKeys : ", newSelectedRowKeys);
    console.log("selectedRows : ", selectedRows);
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRows(selectedRows);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleSoLuongChange = (key, value, mau) => {
    let index = key - 1;
    const updatedTableData = [...tableData];

    selectedRowKeys.map((key) => {
      updatedTableData[key - 1].soLuongTon = value;
      console.log(updatedTableData[key - 1]);
      setTableData(updatedTableData);
    });

    const updatedTables = { ...tables };
    for (const color in updatedTables) {
      updatedTables[color] = updatedTables[color].map((item) => {
        if (selectedRowKeys.includes(item.id) && item.id_mau_sac === mau) {

          return { ...item, soLuongTon: value };
        }
        return item;
      });
    }
    setTables(updatedTables);
    // setTableData(updatedTableData);
  };

  const handleGiaBanChange = (key, value, mau) => {
    let index = key - 1;
    const updatedTableData = [...tableData];

    selectedRowKeys.map((key) => {
      updatedTableData[key - 1].giaBan = value;
      setTableData(updatedTableData);
    });

    const updatedTables = { ...tables };
    for (const color in updatedTables) {
      updatedTables[color] = updatedTables[color].map((item) => {
        if (selectedRowKeys.includes(item.id) && item.id_mau_sac === mau) {
          return { ...item, giaBan: value };
        }
        return item;
      });
    }
    setTables(updatedTables);
  };

  // -------------------------end table data-------------------------

  // ------------------------modal hinh anh-------------------------
  const [isModalOpenHA, setIsModalOpenHA] = useState(false);
  const showModalHA = () => {
    setIsModalOpenHA(true);
  };
  const handleOkHA = () => {
    setIsModalOpenHA(false);
  };
  const handleCancelHA = () => {
    setIsModalOpenHA(false);
  };

  const maxSelectedImages = 3;
  const removeImageByColor = (mau, imgUrl) => {
    setTableImg((prevTableImg) => {
      const updatedTableImg = { ...prevTableImg };
      if (updatedTableImg[mau]) {
        updatedTableImg[mau] = updatedTableImg[mau].filter(
          (imageUrl) => imageUrl !== imgUrl
        );
        if (updatedTableImg[mau].length === 0) {
          delete updatedTableImg[mau];
        }
      }
      return updatedTableImg;
    });
  };

  const handleCheckboxChange = (e, id) => {
    const updatedStates = [...checkboxStates];
    updatedStates[id] = !updatedStates[id];
    setCheckboxStates(updatedStates);
    const imageUrl = e.target.nextElementSibling.src;
    const checkedCount = updatedStates.filter((state) => state).length;
    if (e.target.checked) {
      if (checkedCount <= maxSelectedImages) {
        updatedStates[id] = true;
        setCheckboxStates(updatedStates);
        setTableImg((prevTableImg) => ({
          ...prevTableImg,
          [selectMau]: [...(prevTableImg[selectMau] || []), imageUrl],
        }));
      } else {
        toast.error("😢 Chỉ được chọn 3 ảnh !");
        updatedStates[id] = false;
        setCheckboxStates(updatedStates);
      }
    } else {
      updatedStates[id] = false;
      setCheckboxStates(updatedStates);
      removeImageByColor(selectMau, imageUrl);
    }
  };
  // modal san pham
  const [listSanPham, setListSanPham] = useState([]);

  const getAllSP = async () => {
    await axios
      .get("http://localhost:8080/getAllSP")
      .then((response) => {
        setListSanPham(response.data);
      });
  };

  useEffect(() => {
    getAllSP();
  }, []);

  const options = listSanPham.map(item => (
    <Option key={item.id} value={item.id}>
      {item.ten}
    </Option>
  ));

  const [isModalOpenSP, setIsModalOpenSP] = useState(false);

  const showModalSP = () => {
    setIsModalOpenSP(true);
  };
  const handleOkSP = async () => {
    await axios
      .post("http://localhost:8080/addSanPham", sanPhamModal)
      .then((response) => {
        toast.success(`Thêm thành công`, {
          position: "top-right",
          autoClose: 2000,
        });
        getAllSP();
      })
      .catch((error) => {
        toast.error(error.response.data, {
          position: "top-right",
          autoClose: 2000,
        });
      });
    setIsModalOpenSP(false);
  };
  const handleCancelSP = () => {
    setIsModalOpenSP(false);
  };
  const onChangeSP = (e) => {
    setSanPhamModal({ [e.target.name]: e.target.value });
  };
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

  const [isModalOpenKC, setIsModalOpenKC] = useState(false);
  const showModalKC = () => {
    setIsModalOpenKC(true);
  };
  const handleOkKC = async () => {
    await axios
      .post("http://localhost:8080/addKichCo", kichCoModal)
      .then((response) => {
        toast.success(`Thêm thành công`, {
          position: "top-right",
          autoClose: 2000,
        });
        getAllKC();
      })
      .catch((error) => {
        toast.error(error.response.data, {
          position: "top-right",
          autoClose: 2000,
        });
      });
    setIsModalOpenKC(false);
  };
  const handleCancelKC = () => {
    setIsModalOpenKC(false);
  };
  const onChangeKC = (e) => {
    setKichCoModal({ [e.target.name]: e.target.value });
  };

  // ------------------------modal de giay-------------------------
  const [isModalOpenDG, setIsModalOpenDG] = useState(false);
  const showModalDG = () => {
    setIsModalOpenDG(true);
  };
  const handleOkDG = async () => {
    await axios
      .post("http://localhost:8080/addDeGiay", deGiayModal)
      .then((response) => {
        toast.success(`Thêm thành công`, {
          position: "top-right",
          autoClose: 2000,
        });
        getAllDG();
      })
      .catch((error) => {
        toast.error(`Thêm thất bại`, {
          position: "top-right",
          autoClose: 2000,
        });
      });
    setIsModalOpenDG(false);
  };
  const handleCancelDG = () => {
    setIsModalOpenDG(false);
  };
  const onChangeDG = (e) => {
    setDeGiayModal({ [e.target.name]: e.target.value });
  };
  // --------------------------comfirm-------------------------------
  const handleOpenAddConfirmation = () => {
    setIsConfirmed(true);
    setAddConfirmationOpen(true);
  };

  const handleCloseAddConfirmation = () => {
    setIsConfirmed(false);
    setAddConfirmationOpen(false);
  };
  // -----------------------end comfirm ----------------------------
  const onChange = (e) => {
    setSanPham({ ...sanPham, [e.target.name]: e.target.value });
  };
  const tableDataa = [];
  const mauTableData = {};

  const groupProductsByColor = () => {
    let index = 0;
    for (const mau of selectedColors) {
      mauTableData[mau] = [];
      for (const kichCo of selectedKichCo) {
        const sanPhamItem = {
          // id: index,
          ten: sanPham.ten,
          tenSanPham: `${listSanPham.find((item) => item.id == id_san_pham)?.ten}` +
            `${sanPham.ten} [ ${kichCo} - ${mauSac.find((item) => item.maMau === mau)?.ten || ""} ]`,
          //soLuongTon: sanPham.soLuongTon, // soLuongTon va` giaBan do nguoi dung nhap vao`
          khoiLuong: 1,
          moTa: sanPham.moTa,
          giaNhap: "100,000",
          //giaBan: "",
          id_mau_sac: mau,
          id_kich_co: kichCo,
          id_thuong_hieu: sanPham.id_thuong_hieu,
          id_the_loai: sanPham.id_the_loai,
          id_chat_lieu: sanPham.id_chat_lieu,
          id_de_giay: sanPham.id_de_giay,
          id_san_pham: sanPham.id_san_pham
        };
        tableDataa.push(sanPhamItem);
      }
      if (selectMau == mauSac.find((item) => item.maMau === mau)?.ten || "") {
        mauTableData[mau].push(tableImg);
      }
    }
    setTableData(tableDataa);

    for (const mau of selectedColors) {
      const spByColor = selectedKichCo.map((kichCo) => ({
        id: (index += 1),
        ten: sanPham.ten,
        tenSanPham: `${listSanPham.find((item) => item.id == id_san_pham)?.ten}` + ` ${sanPham.ten} [ ${kichCo} - ${mauSac.find((item) => item.maMau === mau)?.ten || ""
          } ]`,
        khoiLuong: 1,
        moTa: sanPham.moTa,
        // soLuongTon: sanPham.soLuongTon,
        giaNhap: "100,000",
        id_mau_sac: mau,
        id_kich_co: kichCo,
        id_thuong_hieu: sanPham.id_thuong_hieu,
        id_id_the_loai: sanPham.id_the_loai,
        id_chat_lieu: sanPham.id_chat_lieu,
        id_de_giay: sanPham.id_de_giay,
        id_san_pham: sanPham.id_san_pham,
        hinhAnh: mauTableData[mau],
      }));
      setTables((prevTables) => ({
        ...prevTables,
        [mau]: spByColor,
      }));
    }
  };

  useEffect(() => {
    groupProductsByColor();
  }, [selectedColors, selectedKichCo, tableImg]);

  useEffect(() => {
    getAllDG();
  }, []);

  useEffect(() => {
    getAllKC();
  }, []);

  useEffect(() => {
    getAllTL();
    getAllMS();
    getAllCL();
    getAllTH();
    getAllHA();
  }, [img]);

  const getAllHA = async () => {
    await axios
      .get(`http://localhost:8080/getHinhAnhByMau/${selectMau}`)
      .then((response) => {
        setImg(response.data);
      });
  };
  const getAllTL = async () => {
    await axios.get("http://localhost:8080/getAllTL").then((response) => {
      setTheLoai(response.data);
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
    if(selectedKichCo.length == 0) {
      toast.error("Vui lòng chọn kích cỡ!");
      handleCloseAddConfirmation();
      return;
    }
    if(selectedColors.length == 0) {
      toast.error("Vui lòng chọn màu sắc!");
      handleCloseAddConfirmation();
      return;
    }
    setLoading(true);
    handleCloseAddConfirmation();
    try {
      await form.validateFields();

      const data = tableData.map((sp) => [
        sp.id,
        sp.id_san_pham,
        sp.tenSanPham,
        sp.soLuongTon,
        sp.khoiLuong,
        sp.moTa,
        sp.giaNhap,
        sp.giaBan,
        sp.id_mau_sac,
        sp.id_kich_co,
        sp.id_thuong_hieu,
        sp.id_the_loai,
        sp.id_chat_lieu,
        sp.id_de_giay,
        tableImg,
      ]);
      console.log(data);
      if (isConfirmed) {
        await axios
          .post("http://localhost:8080/san-pham/add", data)
          .then((response) => {
            if (response.status == 200) {
              toast.success(`Thêm thành công`, {
                position: "top-right",
                autoClose: 2000,
              });
              setLoading(false);
              navigate("/quan-ly-san-pham/san-pham");
            }
          })
          .catch((error) => {
            toast.error(`${error.response.data}`, {
              position: "top-right",
              autoClose: 2000,
            });
            setLoading(false);
            handleCloseAddConfirmation();
          });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      handleCloseAddConfirmation();
    }
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
        {loading && <TailSpinLoading />}
        <Form form={form} >
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-5">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Thêm mới sản phẩm
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Điền thông tin chi tiết sản phẩm
              </p>

              <div
                className="grid drop-shadow-lg grid-cols-1"
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
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4 ml-6">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Tên sản phẩm
                    </label>

                    <div className="mt-2 flex">
                      <Form.Item
                        name="id_san_pham"
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng chọn sản phẩm!',
                          },
                        ]}
                      >
                        <Select
                          placeholder="Sản phẩm"
                          value={id_san_pham}
                          name="id_san_pham"
                          onChange={(e) => {
                            setSanPham({ ...sanPham, "id_san_pham": e });
                          }}
                          style={{ width: "400px" }}
                        >
                          {options}
                        </Select>
                      </Form.Item>
                      <div
                        className="p-2"
                        style={{
                          backgroundColor: "#00C5CD",
                          borderRadius: "5px",
                          color: "white",
                          cursor: "pointer",
                          marginLeft: "10px",
                          height: "33px"
                        }}
                        onClick={showModalSP}
                      >
                        <AiOutlinePlus />
                      </div>
                      <div className="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                        <Modal
                          title="Thêm sản phẩm"
                          open={isModalOpenSP}
                          onOk={handleOkSP}
                          onCancel={handleCancelSP}
                          cancelText="Hủy"
                          okText="Thêm"
                          style={{ position: "relative" }}
                        >
                          <div>
                            <label
                              htmlFor="country"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Tên sản phẩm
                            </label>
                            <input
                              type="text"
                              name="tenSanPham"
                              value={tenSanPham}
                              className="block p-2 mt-3 flex-1 w-full border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                              placeholder="Nhập tên sản phẩm"
                              onChange={(e) => onChangeSP(e)}
                              style={{ borderRadius: "5px" }}
                            />
                          </div>
                        </Modal>
                      </div>

                    </div>
                  </div>

                  <div className="col-span-full ml-6">
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Mô tả
                    </label>
                    <div className="mt-2">
                      <Form.Item
                        name="moTa"
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng nhập mô tả!',
                          },
                        ]}
                      >
                        <textarea
                          id="moTa"
                          name="moTa"
                          placeholder=" Nhập mô tả sản phẩm"
                          rows={4}
                          className="block w-11/12 p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                          onChange={(e) => onChange(e)}
                        />
                      </Form.Item>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-gray-600"></p>
                  </div>
                </div>
              </div>
              <h2 className="text-base font-semibold leading-7 mt-10 text-gray-900">
                Thêm các thuộc tính sản phẩm
              </h2>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <div
                className="grid drop-shadow-lg grid-cols-1"
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
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3 ml-6">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Thương hiệu
                    </label>
                    <Form.Item
                      name="id_thuong_hieu"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng chọn thương hiệu!',
                        },
                      ]}
                    >
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
                        <div
                          className="p-2"
                          style={{
                            backgroundColor: "#00C5CD",
                            borderRadius: "5px",
                            color: "white",
                            cursor: "pointer",
                          }}
                        >
                          <AiOutlinePlus />
                        </div>
                      </div>
                    </Form.Item>
                  </div>

                  <div className="sm:col-span-3 ml-6">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Thể loại
                    </label>
                    <Form.Item
                      name="id_the_loai"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng chọn thể loại!',
                        },
                      ]}
                    >
                    <div className="mt-2 space-x-2 flex">
                      <select
                        id="nhanHieu"
                        name="id_the_loai"
                        autoComplete="country-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        onChange={(e) => onChange(e)}
                      >
                        <option selected>--Chọn Thể Loại--</option>
                        {theLoai.map((x) => (
                          <option key={x.id} value={x.id}>
                            {x.ten}
                          </option>
                        ))}
                      </select>
                      <Modal
                        title="Thêm thể loại"
                        open={isModalOpenDG}
                        onOk={handleOkDG}
                        onCancel={handleCancelDG}
                        cancelText="Hủy"
                        okText="Thêm"
                        style={{ position: "relative" }}
                      >
                        <div>
                          <label
                            htmlFor="country"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Tên thể loại
                          </label>
                          <input
                            type="text"
                            name="tenTheLoai"
                            // value={tenTheLoai}
                            className="block p-2 mt-3 flex-1 w-full border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Nhập tên thể loại"
                            onChange={(e) => onChangeDG(e)}
                            style={{ borderRadius: "5px" }}
                          />
                        </div>
                      </Modal>
                      <div
                        className="p-2"
                        style={{
                          backgroundColor: "#00C5CD",
                          borderRadius: "5px",
                          color: "white",
                          cursor: "pointer",
                        }}
                      >
                        <AiOutlinePlus />
                      </div>
                    </div>
                    </Form.Item>
                  </div>

                  <div className="sm:col-span-3 ml-6">
                    <label
                      htmlFor="chatLieu"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Chất Liệu
                    </label>
                    <Form.Item
                      name="id_chat_lieu"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng chọn chất liệu!',
                        },
                      ]}
                    >
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
                      <div
                        className="p-2"
                        style={{
                          backgroundColor: "#00C5CD",
                          borderRadius: "5px",
                          color: "white",
                          cursor: "pointer",
                        }}
                      >
                        <AiOutlinePlus />
                      </div>
                    </div>
                    </Form.Item>
                  </div>
                  <div className="sm:col-span-3 ml-6">
                    <label
                      htmlFor="deGiay"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Đế giày
                    </label>
                    <Form.Item
                      name="id_de_giay"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng chọn đế giày!',
                        },
                      ]}
                    >
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
                      <div
                        className="p-2"
                        style={{
                          backgroundColor: "#00C5CD",
                          borderRadius: "5px",
                          color: "white",
                          cursor: "pointer",
                        }}
                        onClick={showModalDG}
                      >
                        <AiOutlinePlus />
                      </div>
                      <Modal
                        title="Thêm đế giày"
                        open={isModalOpenDG}
                        onOk={handleOkDG}
                        onCancel={handleCancelDG}
                        cancelText="Hủy"
                        okText="Thêm"
                        style={{ position: "relative" }}
                      >
                        <div>
                          <label
                            htmlFor="country"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Tên đế giày
                          </label>
                          <input
                            type="text"
                            name="tenDeGiay"
                            value={tenDeGiay}
                            className="block p-2 mt-3 flex-1 w-full border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Nhập tên đế giày"
                            onChange={(e) => onChangeDG(e)}
                            style={{ borderRadius: "5px" }}
                          />
                        </div>
                      </Modal>
                    </div>
                    </Form.Item>
                  </div>
                  <div className="sm:col-span-3 ml-6">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Màu sắc
                    </label>
                    {/* <Form.Item
                      name="id_mau_sac"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng chọn màu sắc!',
                        },
                      ]}
                    > */}
                    <div className="mt-2 space-x-3 flex">
                      {selectedColors.map((item, index) => (
                        <Badge
                          className="cursor-pointer"
                          badgeContent={"--"}
                          color="error"
                          key={index}
                          onClick={() => handleRemoveColor(item)}
                        >
                          <Tooltip
                            title={
                              mauSac.find((x) => x.maMau === item)?.ten || ""
                            }
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
                          </Tooltip>
                        </Badge>
                      ))}
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
                        onClick={showModal}
                      >
                        <AiOutlinePlus />
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
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                          {mauSac.map((item) => (
                            <div
                              key={item.id}
                              className={`flex justify-center text-white cursor-pointer ${selectedColors.includes(item.maMau)
                                ? "border-2 border-yellow-500"
                                : "border-none"
                                }`}
                              style={{
                                width: "20%",
                                height: "25px",
                                backgroundColor: item.maMau,
                                color: "#7A8B8B",
                                border: "1px solid #CCC",
                                borderRadius: "5px",
                                alignItems: "center",
                                marginTop: "35px",
                                borderColor: "yellow",
                                marginRight: "5px",
                              }}
                              onClick={() => {
                                if (selectedColors.includes(item.maMau)) {
                                  setSelectedColors((prevSelected) =>
                                    prevSelected.filter(
                                      (color) => color !== item.maMau
                                    )
                                  );
                                } else {
                                  if (selectedColors.length < 3) {
                                    setSelectedColors((prevSelected) => [
                                      ...prevSelected,
                                      item.maMau,
                                    ]);
                                  }
                                }
                              }}
                            >
                              {item.maMau}
                            </div>
                          ))}
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
                    {/* </Form.Item> */}
                  </div>

                  <div className="sm:col-span-3 ml-6">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Kích cỡ
                    </label>
                    {/* <Form.Item
                      name="id_kich_co"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng chọn kích cỡ!',
                        },
                      ]}
                    > */}
                    <div className="mt-2 space-x-3 flex">
                      {selectedKichCo.map((item, index) => (
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
                              color: "black",
                            }}
                          >
                            {item}
                          </div>
                        </Badge>
                      ))}
                      <div
                        className="inline-block "
                        style={{
                          borderRadius: "5px",
                          backgroundColor: "#00C5CD",
                          color: "white",
                          cursor: "pointer",
                          width: "35px",
                          height: "35px",
                          padding: "9px",
                        }}
                        onClick={showModal1}
                      >
                        <AiOutlinePlus />
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
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                          {kichCo.map((item) => (
                            <div
                              key={item.id}
                              className={`flex justify-center text-white cursor-pointer ${selectedKichCo.includes(item.ten)
                                ? "selectedKichCo"
                                : "border-none"
                                }`}
                              style={{
                                width: "70px",
                                height: "35px",
                                borderRadius: "5px",
                                alignItems: "center",
                                marginTop: "35px",
                                borderColor: "yellow",
                                marginRight: "5px",
                                color: "black",
                              }}
                              onClick={() => {
                                if (selectedKichCo.includes(item.ten)) {
                                  setSelectedKichCo((prevSelected) =>
                                    prevSelected.filter(
                                      (kichCo) => kichCo !== item.ten
                                    )
                                  );
                                } else {
                                  if (selectedKichCo.length < 3) {
                                    setSelectedKichCo((prevSelected) => [
                                      ...prevSelected,
                                      item.ten,
                                    ]);
                                  }
                                }
                              }}
                            >
                              {item.ten}
                            </div>
                          ))}
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
                            onClick={() => {
                              // handleCancel1();
                              showModalKC();
                            }}
                          >
                            <AiOutlinePlus className="mr-2" />
                            Thêm kích cỡ
                          </Button>
                        </div>
                      </Modal>
                      <Modal
                        title="Thêm kích cỡ"
                        open={isModalOpenKC}
                        onOk={handleOkKC}
                        onCancel={handleCancelKC}
                        cancelText="Cancel"
                        okText="Thêm"
                        style={{ position: "relative" }}
                      >
                        <div>
                          <label
                            htmlFor="country"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Tên kích cỡ
                          </label>
                          <input
                            type="text"
                            name="tenKichCo"
                            value={tenKichCo}
                            className="block p-2 mt-3 flex-1 w-full border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Nhập tên kích cỡ"
                            onChange={(e) => onChangeKC(e)}
                            style={{ borderRadius: "5px" }}
                          />
                        </div>
                      </Modal>
                    </div>
                    {/* </Form.Item> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button
              type="primary"
              style={{
                backgroundColor: "#1976d2",
                marginBottom: "2px",
              }}
              onClick={handleOpenAddConfirmation}
            >
              Hoàn tất
            </Button>
          </div>
          {selectedColors.map((mau) => (
            <div key={mau}>
              <h2>
                Sản phẩm theo :
                {" " + mauSac.find((item) => item.maMau === mau)?.ten || ""}{" "}
              </h2>
              <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={tables[mau] || []}
                pagination={false}
                scroll={{ y: 2000 }}
                rowKey="id"
              />
              <TableImg
                columns={columnImg}
                dataSource={
                  tableImg[mauSac.find((item) => item.maMau === mau)?.ten || ""]
                }
                pagination={false}
                scroll={{ y: 2000 }}
                locale={customText}
              />
            </div>
          ))}

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button
              type="primary"
              style={{
                backgroundColor: "#1976d2",
                marginBottom: "2px",
              }}
              onClick={groupProductsByColor}
            >
              <Link
                to="/quan-ly-san-pham/san-pham"
                type="button"
                className="text-sm rounded-md  font-semibold leading-6 text-gray-900"
              >
                Cancel
              </Link>
            </Button>

            <Button
              type="primary"
              style={{
                backgroundColor: "#1976d2",
                marginBottom: "2px",
              }}
              onClick={handleOpenAddConfirmation}
            >
              Thêm sản phẩm
            </Button>
          </div>
        </Form>
        <div>
          <Dialog open={addConfirmationOpen} onClose={handleCloseAddConfirmation} fullWidth>
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
              <DialogContentText>Bạn có chắc muốn thêm sản phẩm này?</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseAddConfirmation} color="warning">
                Hủy
              </Button>
              <Button onClick={onSubmit}>
                Vẫn thêm
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
}
