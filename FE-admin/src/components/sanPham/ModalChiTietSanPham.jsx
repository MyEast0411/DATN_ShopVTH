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

export default function ModalChiTietSanPham({ idDetailProduct }) {
    const [mauSac, setMauSac] = useState([]);
    const [thuongHieu, setThuongHieu] = useState([]);
    const [chatLieu, setChatLieu] = useState([]);
    const [deGiay, setDeGiay] = useState([]);
    const [kichCo, setKichCo] = useState([]);
    const [nhanHieu, setNhanHieu] = useState([]);
    const [theLoai, setTheLoai] = useState([]);

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
        QRCode: "",
        id_kich_co: "",
    });

    const getDetailProductById = async () => {
        console.log(idDetailProduct);
        const result = await axios.get(`http://localhost:8080/detailSP/${idDetailProduct}`);
        console.log(result.data);
        setInitialValues({
            id: result.data.id,
            productName: result.data.ten,
            description : result.data.moTa,
            id_mau_sac : result.data.id_mau_sac.ten,
            id_kich_co: result.data.id_kich_co.id,
            id_thuong_hieu: result.data.id_thuong_hieu.id,
            id_the_loai: result.data.id_the_loai.id,
            id_chat_lieu: result.data.id_chat_lieu.id,
            id_de_giay: result.data.id_de_giay.id,
            quantity : result.data.soLuongTon,
            price : result.data.giaBan
        })
    }
    useEffect(() => {
        if (idDetailProduct != null && idDetailProduct !== "") {
            getDetailProductById();
        }
    }, [idDetailProduct])
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
                    <Input.TextArea rows={4} placeholder="Nhập mô tả sản phẩm" />
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
                            <Select placeholder="Chọn màu sắc" className="ml-7">
                                {mauSac.map((color, index) => (
                                    <Option key={index} value={color.ten}>
                                        <div
                                            style={{
                                                backgroundColor: color.maMau,
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: "5px",
                                                border : "1px solid #CCC"
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
                            <Select placeholder="Chọn kích cỡ">
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
                            <Select placeholder="Chọn thương hiệu">
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
                            <Select placeholder="Chọn thể loại">
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
                            <Select placeholder="Chọn chất liệu" className="ml-7">
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
                            <Select placeholder="Chọn đế giày">
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
                                style={{ fontWeight: "bold", width: "100%", height: "40px" }}
                                placeholder="Nhập số lượng"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={5}></Col>
                    <Col span={8}>
                        <Form.Item
                            label="Giá Bán"
                            name="price"
                            style={{ fontWeight: "bold" }}
                            rules={[
                                { required: true, message: "Vui lòng nhập giá sản phẩm" },
                            ]}
                        >
                            <InputNumber
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
                            name="QRCode"
                            style={{ fontWeight: "bold" }}
                            rules={[{ required: true, message: "Ảnh Qr sản phẩm" }]}
                        >
                            <img
                                src=""
                                alt="QR Code"
                                style={{ width: "50%", height: "auto" }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>

        </div>
    )
}