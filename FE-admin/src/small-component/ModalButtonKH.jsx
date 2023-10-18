import React, { useState } from "react";
import { Modal } from "antd";
import { Button as MaterialButton } from "@material-tailwind/react";

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
        backgroundColor: "bg-blue-500",
        color: "white"
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
        className="poppins-font text-sm btn-primary font-medium tracking-wide bg-blue-500"
        onClick={showModal}
      >
        <div className="flex items-center">
            <img src="https://cdn-icons-png.flaticon.com/512/241/241521.png" alt="Icon" className="w-6 h-6 mr-2" />
            {titleButton}
        </div>
      </MaterialButton>
      <Modal
        title={titleModal}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={okButtonProps}
        width={1000}
        style={{modalStyle ,background: "#007bff"}}
      >
      </Modal>
    </>
  );
};

export default ModalButton;
