import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Coupon.css";
import { Form, Input, Modal } from 'antd';
import axios from "axios";
import { format } from 'date-fns';

interface CouponProps {
  id: string;
  percentOff: string;
  maxValue: string;
  minValue: string;
  expirationDate: string;
}

const CouponPublic: React.FC<CouponProps> = ({
  id,
  percentOff,
  maxValue,
  minValue,
  expirationDate,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [detailVoucher, setDetailVoucher] = useState({
    id: "",
    ten: "",
    code: "",
    giaTriMax: "",
    giaTriMin: "",
    ngayKetThuc: "",
    ngayBatDau: "",

  });
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    form.resetFields();
  }, [detailVoucher]);
  return (
    <div className="coupon-container">
      <div className="coupon-container__brand">Jordan VTH</div>
      <div className="coupon-value flex flex-col justify-center items-center">
        <div className="coupon-value__percent text-xl font-bold py-2">
          {percentOff}
        </div>
        <small className="coupon-container__max font-normal">
          Tối đa: {maxValue} VNĐ
        </small>
        <small className="coupon-container__max font-light">
          Tối thiểu: {minValue} VNĐ
        </small>
        <div className="coupon__code cursor-pointer underline" onClick={async () => {
          await axios.get(`http://localhost:8080/voucher/getVoucher/${id}`).then((response) => {
            console.log(response.data);
            setDetailVoucher({
              id : response.data.id,
              ten : response.data.ten,
              code : response.data.code,
              ngayBatDau : format(response.data.ngayBatDau, 'dd-MM-yyyy'),
              ngayKetThuc : format(response.data.ngayKetThuc, 'dd-MM-yyyy'),
              giaTriMax : response.data.giaTriMax,
              giaTriMin : response.data.giaTriMin
            });
          }).catch((error) => {
            console.log(error);
          });
          showModal();
        }}>
          Xem
        </div>
        <small className="coupon-container__max font-light">
          Giá trị đến {expirationDate}
        </small>
      </div>
      
      <Modal title="Chi tiết phiếu giảm giá" open={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form form={form} initialValues={detailVoucher}>
          <div>
            <label htmlFor="ma" className="block text-sm font-medium leading-6 text-gray-900">
              Code phiếu giảm giá
            </label>
            <Form.Item
              name="code"
            >
              <Input
                value={detailVoucher.code}
                name="code"
                placeholder="Code phiếu giảm giá"
                style={{ borderRadius: "5px" }}
              />
            </Form.Item>
            <label htmlFor="ten" className="block text-sm font-medium leading-6 text-gray-900">
              Tên phiếu giảm giá
            </label>
            <Form.Item
              name="ten"
            >
              <Input
                value={detailVoucher.ten}
                name="ten"
                placeholder="Tên phiếu giảm giá"
                style={{ borderRadius: "5px" }}
              />
            </Form.Item>
            <label htmlFor="ten" className="block text-sm font-medium leading-6 text-gray-900">
              Ngày bắt đầu
            </label>
            <Form.Item
              name="ngayBatDau"
            >
              <Input
                value={detailVoucher.ngayBatDau}
                name="ngayBatDau"
                placeholder="Ngày bắt đầu phiếu giảm giá"
                style={{ borderRadius: "5px" }}
              />
            </Form.Item>
            <label htmlFor="ten" className="block text-sm font-medium leading-6 text-gray-900">
              Ngày kết thúc
            </label>
            <Form.Item
              name="ngayKetThuc"
            >
              <Input
                value={detailVoucher.ngayKetThuc}
                name="ngayKetThuc"
                placeholder="Ngày kết thúc phiếu giảm giá"
                style={{ borderRadius: "5px" }}
              />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default CouponPublic;
