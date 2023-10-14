import React, { useState } from "react";
import { Modal } from "antd";
import GiaoDienUpdateKhuyenMai from "../ModalUpdateKhuyenMai/GiaoDienUpdateKhuyenMai";
import { PiPencilSimpleBold } from "react-icons/pi";

const ModalUpdateKhuyenMai = ({ titleButton, titleModal, idKM }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log(idKM);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const modalStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "-80px",
  };

  return (
    <>
      <PiPencilSimpleBold
        className="cursor-pointer text-xl ml-2 mr-3 blue-hover"
        onClick={showModal}
      >
        {titleButton}
      </PiPencilSimpleBold>

      <Modal
        title={titleModal}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        cancelText="Hủy"
        style={modalStyle}
      >
        <GiaoDienUpdateKhuyenMai idKM={idKM} />
      </Modal>
    </>
  );
};

export default ModalUpdateKhuyenMai;
