import { Link, useParams } from "react-router-dom";
import InfoTop from "../layout/InfoTop";
import Header from "../layout/Header";

import Footer from "../layout/Footer";

import { Image, Input, Modal, Result, Select, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
// import { Button } from "@nextui-org/react";
import {
  Button,

} from "@material-tailwind/react";
import { CiWarning } from "react-icons/ci";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notification } from "antd";

// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Button,
//   useDisclosure,
// } from "@nextui-org/react";

export default function PurchaseHistory() {
  const { idkh } = useParams();
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [checkBox, setCheckBox] = useState(-1);
  const [isModalOpenCanceled, setIsModalOpenCanceled] = useState(false);
  const [hd , setHD] = useState({});
  // const [open, setOpen] = useState(false);
  // const { isOpen, onOpen, onClose } = useDisclosure();

  // search
  const filterOptions = (data) => {
    return data
      .filter((hd) => {
        if (search === "") return hd;
        if (hd.hoaDon.ma.toLowerCase().includes(search.toLowerCase()))
          return hd;
      })
      .filter((hd) => {
        if (checkBox == -1) return hd;
        if (hd.trangThai == checkBox) return hd;
      });
  };

  const handleChange = (value) => {
    setCheckBox(value);
  };
  // get all dot khuyen mai
  const [kmspcts, setKmspcts] = useState([]);
  const fetchKMSPCT = async () => {
    const response = await axios.get(`http://localhost:8080/khuyen-mai/getAllKMSPCT`);
    setKmspcts(response.data);
  };
  useEffect(() => {
    fetchKMSPCT();
  }, [kmspcts]);

  const DiscountTag = ({ discount }) => {
    if (discount === undefined) {
      return null;
    }

    return <div className="discount-tag">{`${discount}% OFF`}</div>;
  };



  const handleCanceled =  async () => {
   
        await axios
          .post(`http://localhost:8080/lich_su_hoa_don/add/${hd.id}`, {
            moTaHoaDon: "Hủy Hóa Đơn",
            deleted: 1,
            nguoiTao: "Cam",
            ghiChu: "Khách Hàng Đã Hủy",
          })
          .then((response) => {
            cancelCancled();
              getDataById();
              toast.success(`Hủy thành công`, {
                position: "top-right",
                autoClose: 2000,
              });
           
          }).catch((error) => {
            console.log(error.message);
            toast.error(`Hủy thất bại`, {
              position: "top-right",
              autoClose: 2000,
            });
          });
          cancelCancled();
   
  };
  const cancelCancled = () => {
    setIsModalOpenCanceled(false);
  }

  const getDataById = async () => {
    await axios
      .get(`http://localhost:8080/khach-hang/lich-su-mua-hang/${idkh}`)
      .then((response) => {
        setList(
          filterOptions(
            response.data.map((data) => {
              return {
                ...data,
                trangThai: data.hoaDon.trangThai,
              };
            })
          )
        );
      });
  };
  useEffect(() => {
    getDataById();
  }, [search, checkBox, list]);

  return (
    <>
      <InfoTop />
      <Header />

      <div
        className="product-list w-full col-start-2 col-end-7 overflow-y-auto h-70"
        style={{
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "8px",
          width: "100%",
          paddingLeft: "10px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
          transition: "transform 0.2s",
          justifyContent: "space-between",
          alignItems: "center",
          height: 800,
        }}
      >
        <ToastContainer/>
        <div
          className="mb-3 flex justify-between"
          style={{
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "8px",
            width: "80%",
            margin: "auto",
            paddingLeft: "10px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            transition: "transform 0.2s",
            alignItems: "center",
          }}
        >
          <h3>Lịch sử mua hàng</h3>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Mời nhập mã hóa đơn"
            style={{
              width: "30%",
            }}
            size="large"
          />

          <Select
            defaultValue="-1"
            style={{
              width: 200,
            }}
            onChange={handleChange}
            options={data}
          />
        </div>
        {list.length == 0 ? (
          <Result
            status="404"
            title="Lịch sử hóa đơn trống"
            subTitle="Không tìm thấy bất kì hóa đơn nào , mời bạn quay lại mua hàng"
            extra={<Link to={"/"}>Back Home</Link>}
          />
        ) : (
          list.map((ls, i) => (
            <>
              <div
                key={++i}
                className="mb-3"
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "8px",
                  width: "80%",
                  margin: "auto",
                  paddingLeft: "10px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.2s",
                  alignItems: "center",
                }}
              >
                <div className="flex flex-row">
                  <div>
                    <img
                      src="/src/assets/logo.png"
                      style={{ borderRadius: "50%", width: "50", height: 50 }}
                    />
                  </div>
                  <div className="mt-3">
                    <span>Jordan VTH</span>
                  </div>
                  <div className="mt-3 ms-5">
                    <span>Mã đơn hàng : {ls.hoaDon?.ma}</span>
                  </div>
                  <div className="mt-3 ms-5">
                    Trạng Thái Hóa Đơn :{" "}
                    {ls.hoaDon.loaiHd == 0
                      ? GetTrangThai(ls.trangThai)
                      : "Thành Công"}
                  </div>
                </div>
                <hr
                  style={{
                    margin: "20px 0px",
                  }}
                />
                <div
                  className="body overflow-y-auto"
                  style={{
                    backgroundColor: "white",
                    padding: "10px",
                    borderRadius: "8px",
                    width: "100%",
                    paddingLeft: "10px",

                    transition: "transform 0.2s",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: 300,
                  }}
                >
                  {ls.hoaDonChiTiets.map((sp) => (
                    <>
                      <div
                        className="san-pham flex mb-3"
                        style={{
                          backgroundColor: "white",
                          padding: "10px",
                          borderRadius: "8px",
                          width: "80%",
                          margin: "auto",
                          paddingLeft: "10px",
                          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                          transition: "transform 0.2s",
                          alignItems: "center",
                        }}
                      >
                        <div className="w-1/6 me-2" style={{ display: "inline-block" }}>
                          <div style={{ position: "relative" }}>
                            <Image
                              src={sp.id_chi_tiet_san_pham.defaultImg}
                              style={{
                                width: "80",
                                height: 100,
                                borderRadius: 10,
                                marginLeft: 20,
                              }}
                              classNames="m-5 relative"
                            />
                            <div
                              style={{
                                position: "absolute",
                                top: 0,
                                right: 70,
                                left : -10,
                                zIndex: 1,
                              }}
                            >
                              <DiscountTag
                                discount={
                                  kmspcts.find((x) => x.id_chi_tiet_san_pham.id === sp.id_chi_tiet_san_pham.id)
                                    ?.id_khuyen_mai.giaTriPhanTram
                                }
                              />
                            </div>
                          </div>
                        </div>


                        <div className="w-7/12">
                          <p>{`[${sp.id_chi_tiet_san_pham.ma}] ${sp.id_chi_tiet_san_pham.ten}`}</p>
                          <p>
                            {`${sp.id_chi_tiet_san_pham.id_chat_lieu.ten}-${sp.id_chi_tiet_san_pham.id_kich_co.ten}-${sp.id_chi_tiet_san_pham.id_mau_sac.ten}`}
                          </p>
                          <p>x {sp.soLuong}</p>
                        </div>
                        <div className="w-3/12">
                          <span>
                            {" "}
                            {Intl.NumberFormat().format(sp.id_chi_tiet_san_pham.giaBan)}
                          </span>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
                <div className="footer  flex  flex-row-reverse">
                  <span>
                    Tổng số tiền :{" "}
                    {Intl.NumberFormat().format(ls.hoaDon.tongTien)}
                  </span>
                  <div>
                    <Button className="me-4">Mua lại</Button>
                    {ls.hoaDon.trangThai < 2 && ls.hoaDon.loaiHd == 0 ? (
                      <>
                        <Link to={`/client/edit-hoa-don/${ls.hoaDon.id}`}>
                          <Button className="me-4">Sửa hóa đơn</Button>
                        </Link>
                        <Button onPress={() => {
                          setIsModalOpenCanceled(true);
                          setHD(ls.hoaDon);
                        }}>
                          Hủy Hóa Đơn
                        </Button>
                      </>
                    ) : (
                      ""
                    )}

                    {/* <Modal
                      title="Modal 1000px width"
                      centered
                      open={open}
                      onOk={() => setOpen(false)}
                      onCancel={() => setOpen(false)}
                      footer={() => (
                        <>
                          <Button>
                            <BsPen />
                          </Button>
                        </>
                      )}
                      width={1000}
                    >
                      <p>some contents...</p>
                      <p>some contents...</p>
                      <p>some contents...</p>
                    </Modal> */}
                  </div>
                </div>
              </div>
            </>
          ))
        )}

        {/* change TrangThai */}
        <Modal 
      open={isModalOpenCanceled} 
      centered
      onCancel={cancelCancled}
      onOK={handleCanceled}
      width={600}
      height={180}
      footer={[
        <>
        <Button color="black" className="me-3" onClick={cancelCancled}>
        Hủy
      </Button>
      <Button color="red" onClick={handleCanceled} >
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
            bạn có muốn hủy hóa đơn không ?
            </span>
          </div>
       
      </Modal>
      </div>
      <Footer />
    </>
  );
}

const GetTrangThai = (tinhTrang) => {
  if (tinhTrang == 0)
    return (
      <Tag color="#8e008e">
        <span className=" text-sm ">Chờ Xác Nhận</span>
      </Tag>
    );
  if (tinhTrang == 1)
    return (
      <Tag color="#ff8e00">
        {" "}
        <span className=" text-sm ">Xác Nhận</span>
      </Tag>
    );
  if (tinhTrang == 2)
    return (
      <Tag color="#C8D52D">
        {" "}
        <span className=" text-sm ">Chờ Vận Chuyển</span>
      </Tag>
    );
  if (tinhTrang == 3)
    return (
      <Tag color="#C8D52D">
        {" "}
        <span className=" text-sm ">Giao Hàng</span>
      </Tag>
    );
  if (tinhTrang == 4)
    return (
      <Tag color="#400098">
        {" "}
        <span className=" text-sm ">Hoàn Thành</span>
      </Tag>
    );
  if (tinhTrang == 5)
    return (
      <Tag color="#03cffc">
        {" "}
        <span className=" text-sm ">Đã Trả</span>
      </Tag>
    );
  if (tinhTrang == 6)
    return (
      <Tag color="#ff0000">
        {" "}
        <span className=" text-sm ">Hủy</span>
      </Tag>
    );
};
const data = [
  {
    value: "-1",
    label: "Tất cả",
  },
  {
    value: "0",
    label: "Chờ Xác Nhận",
  },
  {
    value: "1",
    label: " Xác Nhận",
  },
  {
    value: "2",
    label: "Chờ Vận Chuyển",
  },
  {
    value: "3",
    label: "Đang Giao",
  },
  {
    value: "4",
    label: "Hoàn Thành",
  },
  {
    value: "5",
    label: "Đã Trả",
  },
  
  {
    value: "6",
    label: "Hủy",
  },
];
