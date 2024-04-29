import React, { useEffect, useState } from "react";

import {
    Button,
    Radio,
    Form,
    Input,
    InputNumber,
    Select,
    Row,
    Col,
    Tooltip
} from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import ThreeDotsLoading from "../loading/ThreeDotsLoading";

export default function ModalChiTietSanPham({ idDetailProduct, sanPhamChiTiet, setSanPhamChiTiet }) {
    const [mauSac, setMauSac] = useState([]);
    const [thuongHieu, setThuongHieu] = useState([]);
    const [chatLieu, setChatLieu] = useState([]);
    const [deGiay, setDeGiay] = useState([]);
    const [kichCo, setKichCo] = useState([]);
    const [nhanHieu, setNhanHieu] = useState([]);
    const [theLoai, setTheLoai] = useState([]);
    const [listHinhAnh, setListHinhAnh] = useState({});

    useEffect(() => {
        getAllNH();
        getAllMS();
        getAllKC();
        getAllDG();
        getAllCL();
        getAllTH();
        getAllTL();
        // getAllHA();
    }, []);

    // const getAllHA = async () => {
    // await axios
    //     .get(`http://localhost:8080/getHinhAnhByMau/${selectMau}`)
    //     .then((response) => {
    //     setImg(response.data);
    //     });
    // };
    const getAllTL = async () => {
        await axios.get("http://localhost:8080/getAllTL").then((response) => {
            setTheLoai(response.data);
        });
    };
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
    const [form] = Form.useForm();
    const [initialValues, setInitialValues] = useState({
        id: "",
        description: "",
        price: "",
        quantity: "",
        status: "",
        id_de_giay: "",
        productName: "",
        id_chat_lieu: "",
        id_mau_sac: "",
        id_the_loai: "",
        id_thuong_hieu: "",
        qrcode: "",
        id_kich_co: "",
    });

    const getDetailProductById = async () => {
        const result = await axios.get(`http://localhost:8080/detailSP/${idDetailProduct}`);
        const danhSachHinhAnh = await axios.get(`http://localhost:8080/getHinhAnhByIdSPCT/${idDetailProduct}`);
        console.log(danhSachHinhAnh.data);
        setInitialValues({
            id: result.data.id,
            productName: result.data.ten,
            description: result.data.moTa,
            id_mau_sac: result.data.id_mau_sac.ten,
            id_kich_co: result.data.id_kich_co.id,
            id_thuong_hieu: result.data.id_thuong_hieu.id,
            id_the_loai: result.data.id_the_loai.id,
            id_chat_lieu: result.data.id_chat_lieu.id,
            id_de_giay: result.data.id_de_giay.id,
            quantity: result.data.soLuongTon,
            price: Intl.NumberFormat().format(result.data.giaBan),
            qrcode: result.data.maQR
        })
        setSanPhamChiTiet({
            id: result.data.id,
            productName: result.data.ten,
            description: result.data.moTa,
            id_mau_sac: result.data.id_mau_sac.ten,
            id_kich_co: result.data.id_kich_co.id,
            id_thuong_hieu: result.data.id_thuong_hieu.id,
            id_the_loai: result.data.id_the_loai.id,
            id_chat_lieu: result.data.id_chat_lieu.id,
            id_de_giay: result.data.id_de_giay.id,
            quantity: result.data.soLuongTon,
            price: result.data.giaBan,
            qrcode: result.data.maQR
        })
        setListHinhAnh(danhSachHinhAnh.data);
    }

    useEffect(() => {
        getDetailProductById();
    }, [idDetailProduct]);
    
    const [loadingImg, setLoadingImg] = useState(false);
    const handleImageChange = async (event) => {
        setLoadingImg(true);
        const file = event.target.files[0];
        if (file) {
            const fileName = file.name;
            await axios
                .post("http://localhost:8080/addHinhAnhSanPhamChiTiet", {
                    imgUrl: fileName,
                    mauSac: sanPhamChiTiet.id_mau_sac,
                    idSanPhamChiTiet: sanPhamChiTiet.id
                })
                .then((response) => {
                    toast.success(`Thêm hình ảnh thành công`);
                    getDetailProductById();
                    setLoadingImg(false);
                })
                .catch((error) => {
                    toast.error(`Thêm thất bại`);
                    console.log(error);
                    setLoadingImg(false);
                });
        }
    };
    const onChange = (e) => {
        console.log(e);
        setSanPhamChiTiet({ ...sanPhamChiTiet, [e.target.name]: e.target.value });
    }
    useEffect(() => {
        form.resetFields();
    }, [initialValues]);
    return (
        <div style={{ width: "700px" }}>
            <Form form={form} initialValues={initialValues}>
                <Form.Item
                    label="Tên sản phẩm"
                    name="productName"
                    style={{ fontWeight: "bold" }}
                    rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
                >
                    <Input style={{ fontWeight: "bold", height: "40px" }} readOnly />
                </Form.Item>

                <Form.Item
                    label="Mô tả"
                    name="description"
                    style={{ fontWeight: "bold" }}
                    rules={[
                        { required: true, message: "Vui lòng nhập mô tả sản phẩm" },
                    ]}
                >
                    <Input.TextArea rows={4} name="description" placeholder="Nhập mô tả sản phẩm" onChange={onChange} />
                </Form.Item>
                <br />

                <Row gutter={7} justify="space-around">
                    <Col span={8}>
                        <Form.Item
                            label="Màu Sắc"
                            name="id_mau_sac"
                            style={{ fontWeight: "bold" }}
                            rules={[{ required: true, message: "Vui lòng chọn màu sắc" }]}
                        >
                            <Select placeholder="Chọn màu sắc" className="ml-7" name="id_mau_sac" onChange={(e) => {
                                setSanPhamChiTiet({ ...sanPhamChiTiet, id_mau_sac: e });
                            }}>
                                {mauSac.map((color, index) => (
                                    <Option key={index} value={color.ten}>
                                        <div
                                            style={{
                                                backgroundColor: color.maMau,
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: "5px",
                                                border: "1px solid #CCC"
                                            }}
                                        >{color.maMau}</div>

                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={5}></Col>
                    <Col span={8}>
                        <Form.Item
                            label="Kích cỡ"
                            name="id_kich_co"
                            style={{ fontWeight: "bold" }}
                            rules={[{ required: true, message: "Vui lòng chọn kích cỡ" }]}
                        >
                            <Select placeholder="Chọn kích cỡ" name="id_kich_co" onChange={(e) => {
                                setSanPhamChiTiet({ ...sanPhamChiTiet, id_kich_co: e });
                            }}>
                                {kichCo.map((kichCo, index) => (
                                    <Option key={index} value={kichCo.id}>
                                        {kichCo.ten}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={2}></Col>
                </Row>

                <Row gutter={7} justify="space-around">
                    <Col span={8}>
                        <Form.Item
                            label="Thương Hiệu"
                            name="id_thuong_hieu"
                            style={{ fontWeight: "bold", width: "256px" }}
                            rules={[{ required: true, message: "Vui lòng chọn thương hiệu" }]}
                        >
                            <Select placeholder="Chọn thương hiệu" name="id_thuong_hieu" onChange={(e) => {
                                setSanPhamChiTiet({ ...sanPhamChiTiet, id_thuong_hieu: e });
                            }}>
                                {thuongHieu.map((item, index) => (
                                    <Option key={index} value={item.id}>
                                        {item.ten}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={5}></Col>
                    <Col span={8}>
                        <Form.Item
                            label="Thể loại"
                            name="id_the_loai"
                            style={{ fontWeight: "bold" }}
                            rules={[{ required: true, message: "Vui lòng chọn thể loại" }]}
                        >
                            <Select placeholder="Chọn thể loại" name="id_the_loai" onChange={(e) => {
                                setSanPhamChiTiet({ ...sanPhamChiTiet, id_the_loai: e });
                            }}>
                                {theLoai.map((item, index) => (
                                    <Option key={index} value={item.id}>
                                        {item.ten}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={2}></Col>
                </Row>

                <Row gutter={7} justify="space-around">
                    <Col span={8}>
                        <Form.Item
                            label="Chất liệu"
                            name="id_chat_lieu"
                            style={{ fontWeight: "bold" }}
                            rules={[{ required: true, message: "Vui lòng chọn chất liệu" }]}
                        >
                            <Select placeholder="Chọn chất liệu" className="ml-7" name="id_chat_lieu" onChange={(e) => {
                                setSanPhamChiTiet({ ...sanPhamChiTiet, id_chat_lieu: e });
                            }}>
                                {chatLieu.map((item, index) => (
                                    <Option key={index} value={item.id}>
                                        {item.ten}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={5}></Col>
                    <Col span={8}>
                        <Form.Item
                            label="Đế giày"
                            name="id_de_giay"
                            style={{ fontWeight: "bold" }}
                            rules={[{ required: true, message: "Vui lòng chọn đế giày" }]}
                        >
                            <Select placeholder="Chọn đế giày" name="id_de_giay" onChange={(e) => {
                                setSanPhamChiTiet({ ...sanPhamChiTiet, id_de_giay: e });
                            }}>
                                {deGiay.map((item, index) => (
                                    <Option key={index} value={item.id}>
                                        {item.ten}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <Row gutter={7} justify="space-around">
                    <Col span={8}>
                        <Form.Item
                            label="Số Lượng"
                            name="quantity"
                            style={{ fontWeight: "bold" }}
                            rules={[
                                { required: true, message: "Vui lòng nhập số lượng" },
                                {
                                    type: "number",
                                    min: 1,
                                    message: "Số lượng tối thiểu là 1",
                                },
                            ]}
                        >
                            <InputNumber
                                className="ml-7"
                                name="quantity"
                                onChange={(e) => {
                                    setSanPhamChiTiet({ ...sanPhamChiTiet, quantity: e });
                                }}
                                style={{ fontWeight: "bold", width: "100%", height: "40px" }}
                                placeholder="Nhập số lượng"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={5}></Col>
                    <Col span={8}>
                        <Form.Item
                            label="Giá Bán"
                            // name="price"
                            style={{ fontWeight: "bold" }}
                            rules={[
                                { required: true, message: "Vui lòng nhập giá sản phẩm" },
                            ]}
                        >
                            <InputNumber
                                name="price"
                                value={Intl.NumberFormat().format(sanPhamChiTiet?.price)}
                                onChange={(e) => {
                                    setSanPhamChiTiet({ ...sanPhamChiTiet, price: e });
                                }}
                                style={{ fontWeight: "bold", width: "100%", height: "40px" }}
                                placeholder="Nhập giá sản phẩm"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={2}></Col>
                </Row>

                <Row gutter={7} justify="start">
                    <Col span={8}>
                        <Form.Item
                            label="QR Code : "
                            name="qrcode"
                            style={{ fontWeight: "bold" }}
                            rules={[{ required: true, message: "Ảnh Qr sản phẩm" }]}
                        >
                            <Tooltip showArrow={true} title={"Ấn vào đây để lấy mã qr"}>
                                <img
                                    src={initialValues.qrcode}
                                    alt="QR Code"
                                    onClick={() => {
                                        window.open(initialValues.qrcode, '_blank');
                                    }}
                                    style={{ width: "70%", height: "auto", cursor: "pointer" }}
                                />
                            </Tooltip>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={7} justify="start">
                    <Col span={24}>
                        <Form.Item
                            label="Hình ảnh : "
                            name="hinhAnh"
                            style={{ fontWeight: "bold" }}
                            rules={[{ required: true, message: "Ảnh Sản phẩm" }]}
                        >
                            {loadingImg ? (
                                <ThreeDotsLoading />
                            ) : (
                                <>
                                    <div className="text-center grid grid-cols-4 gap-4">

                                        {listHinhAnh.length >= 1 && listHinhAnh.map((hinhAnh, index) => (
                                            <div className="mb-4 relative" key={hinhAnh.id}>
                                                <img
                                                    src={hinhAnh.ten}
                                                    alt="Hình ảnh sản phẩm"
                                                    className="w-full"
                                                />
                                                <Button onClick={async () => {
                                                    if(listHinhAnh.length <= 1) {
                                                        toast.error("Phải có ít nhất 1 hình ảnh!");
                                                        return;
                                                    }
                                                    await axios.post(`http://localhost:8080/deleteHinhAnh/${hinhAnh.id}`).then((response) => {
                                                        if (response.status == 200) {
                                                            toast("Xóa hình ảnh thành công!");
                                                            getDetailProductById();
                                                        }
                                                    })
                                                }} className="absolute w-8 h-5 top-0 right-0 mt-2 mr-2 bg-red-500 text-white px-2 py-1 rounded-full flex items-center justify-center">
                                                    -
                                                </Button>
                                            </div>
                                        ))}

                                    </div>
                                    <div className="mb-4 relative flex flex-col">
                                        <div className="w-full h-full border border-dashed border-gray-400 rounded-lg flex items-center justify-center cursor-pointer" onClick={() => {
                                            const imageInput = document.getElementById("imageInput");
                                            if (imageInput) {
                                                imageInput.click();
                                            }
                                        }}>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                style={{ display: "none" }}
                                                id="imageInput"
                                            />
                                            <span className="text-4xl" >+</span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
            </Form >
        </div >
    )
}