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

export default function ModalChiTietSanPham() {
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
    return (
        <div style={{width : "900px"}}>
            <Form form={form} >
                <Form.Item
                    label="Tên sản phẩm"
                    name="productId"
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
                            label="Thương hiệu"
                            name="brandId"
                            style={{ fontWeight: "bold" }}
                            rules={[
                                { required: true, message: "Vui lòng chọn thương hiệu" },
                            ]}
                        >
                            <Select placeholder="Chọn thương hiệu">
                                {thuongHieu.map((brand, index) => (
                                    <Option key={index} value={brand.id}>
                                        <span style={{ fontWeight: "bold" }}>{brand.ten}</span>
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            label="Trạng thái"
                            name="status"
                            style={{ fontWeight: "bold" }}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn trạng thái sản phẩm",
                                },
                            ]}
                        >
                            <Select>
                                <Option value="1">
                                    <span style={{ fontWeight: "bold" }}>Đang bán</span>
                                </Option>
                                <Option value="0">
                                    <span style={{ fontWeight: "bold" }}>Ngừng bán</span>
                                </Option>
                            </Select>
                        </Form.Item>
                    </Col>

                </Row>

                <Row gutter={7} justify="space-around">
                    <Col span={8}>
                        <Form.Item
                            label="Chất Liệu"
                            name="id_chat_lieu"
                            style={{ fontWeight: "bold" }}
                            rules={[
                                { required: true, message: "Vui lòng chọn chất liệu" },
                            ]}
                        >
                            <Select placeholder="Chọn chất liệu">
                                {chatLieu.map((material, index) => (
                                    <Option key={index} value={material.id}>
                                        <span style={{ fontWeight: "bold" }}>
                                            {material.ten}
                                        </span>
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            label="Đế Giày"
                            name="id_de_giay"
                            style={{ fontWeight: "bold" }}
                            rules={[{ required: true, message: "Vui lòng chọn đế giày" }]}
                        >
                            <Select placeholder="Chọn đế giày">
                                {deGiay.map((sole, index) => (
                                    <Option key={index} value={sole.id}>
                                        <span style={{ fontWeight: "bold" }}>{sole.ten}</span>
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                </Row>

                <Row gutter={7} justify="space-around">
                    <Col span={8}>
                        <Form.Item
                            label="Thể loại"
                            name="id_the_loai"
                            style={{ fontWeight: "bold" }}
                            rules={[{ required: true, message: "Vui lòng chọn thể loại" }]}
                        >
                            <Select placeholder="Chọn thể loại">
                                {theLoai.map((category, index) => (
                                    <Option key={index} value={category.id}>
                                        <span style={{ fontWeight: "bold" }}>
                                            {category.ten}
                                        </span>
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                </Row>

                <Row gutter={7} justify="space-around">
                    <Col span={8}>
                        <Form.Item
                            label="Màu Sắc"
                            name="id_mau_sac"
                            style={{ fontWeight: "bold" }}
                            rules={[{ required: true, message: "Vui lòng chọn màu sắc" }]}
                        >
                            <Select placeholder="Chọn màu sắc">
                                {mauSac.map((color, index) => (
                                    <Option key={index} value={color.id}>
                                        <div
                                            style={{
                                                backgroundColor: color.maMau,
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: "5px",
                                            }}
                                        ></div>
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            label="Kích Cỡ"
                            name="sizeId"
                            style={{ fontWeight: "bold" }}
                            rules={[
                                { required: true, message: "Vui lòng nhập kích cỡ sản phẩm" },
                            ]}
                        >
                            <Select placeholder="Chọn kích cỡ">
                                {kichCo.map((size, index) => (
                                    <Option key={index} value={size.id}>
                                        <span style={{ fontWeight: "bold" }}>{size.ten}</span>
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

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