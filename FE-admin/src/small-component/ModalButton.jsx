import React, { useState } from "react";
import { Modal } from "antd";
import { Button as MaterialButton } from "@material-tailwind/react";
import ThongTinThanhToan from "../components/ThongTinThanhToan";

const ModalButton = ({ titleButton, titleModal }) => {
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

  const okButtonProps = {
    style: {
      backgroundColor: "black",
      color: "white",
    },
  };
  const modalStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "-80px"
  };

  return (
    <>
      <MaterialButton
        variant="gradient"
        className="poppins-font text-sm font-medium tracking-wide"
        onClick={showModal}
      >
        {titleButton}
      </MaterialButton>
      <Modal
        title={titleModal}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={okButtonProps}
        width={1000}
        okText="Xác nhận thanh toán"
        cancelText="Hủy"
        style={modalStyle}
      >
        <ThongTinThanhToan />
      </Modal>
    </>
  );
};

export default ModalButton;
