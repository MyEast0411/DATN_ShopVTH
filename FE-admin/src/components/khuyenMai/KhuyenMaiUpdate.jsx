import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import { Button } from "antd";
import { useParams } from "react-router-dom";
import { Settings } from "luxon";
import { toast } from "react-toastify";
import {
  getKhuyenMaiById,
  updateKhuyenMai,
} from "../../api/khuyenMai/KhuyenMaiApi";
import {
  Button as ButtonMaterial,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
Settings.defaultZoneName = "Asia/Ho_Chi_Minh";

export default function KhuyenMaiUpdate() {
  let { idKM } = useParams();
  const chuyenTrang = useNavigate();
  const [updateConfirmationOpen, setUpdateConfirmationOpen] = useState(false);

  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");

  function formatDateToISOString(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  const handleOpenUpdateConfirmation = () => {
    setUpdateConfirmationOpen(true);
  };
  const handleCloseUpdateConfirmation = () => {
    setUpdateConfirmationOpen(false);
  };

  const [currentDateTime, setCurrentDateTime] = useState(
    moment().format("YYYY-MM-DDTHH:mm:ss")
  );
  const percentValues = Array.from({ length: 90 }, (_, index) => index + 1);

  const [khuyenMai, setKhuyenMai] = useState({
    ma: "",
    ten: "",
    ngayBatDau: "",
    ngayKetThuc: "",
    giaTriPhanTram: 1,
  });

  const handleStartDateChange = (event) => {
    setSelectedStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setSelectedEndDate(event.target.value);
  };

  useEffect(() => {
    const fetchKhuyenMaiData = async () => {
      try {
        const response = await getKhuyenMaiById(idKM);

        setKhuyenMai({
          ma: response.ma,
          ten: response.ten,
          ngayBatDau: response.ngayBatDau,
          ngayKetThuc: response.ngayKetThuc,
          giaTriPhanTram: response.giaTriPhanTram,
        });
        setSelectedStartDate(
          formatDateToISOString(new Date(response.ngayBatDau))
        );
        setSelectedEndDate(
          formatDateToISOString(new Date(response.ngayKetThuc))
        );
      } catch (error) {
        console.error("Error fetching KhuyenMai data:", error);
      }
    };

    fetchKhuyenMaiData();
  }, [idKM]);

  const handleUpdateKhuyenMai = async () => {
    if (khuyenMai.ngayBatDau >= khuyenMai.ngayKetThuc) {
      toast.error("Ngày bắt đầu phải nhỏ hơn ngày kết thúc");
      handleCloseUpdateConfirmation();
      return;
    }

    if (!khuyenMai.ten || !khuyenMai.ngayBatDau || !khuyenMai.ngayKetThuc) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      handleCloseUpdateConfirmation();
      return;
    }

    const updatedKhuyenMai = {
      ma: khuyenMai.ma,
      ten: khuyenMai.ten,
      ngayBatDau: selectedStartDate,
      ngayKetThuc: selectedEndDate,
      giaTriPhanTram: khuyenMai.giaTriPhanTram,
      ngaySua: currentDateTime,
      nguoiTao: "Nguyễn Văn Hội",
      nguoiSua: "Nguyễn Văn Hội",
    };

    try {
      const response = await updateKhuyenMai(idKM, updatedKhuyenMai);
      handleCloseUpdateConfirmation();
      toast.success(`Cập nhật thành công`, {
        position: "top-right",
        autoClose: 2000,
      });
      chuyenTrang("/khuyen-mai");
    } catch (error) {
      toast.error("Dữ liệu không hợp lệ");
      console.error("Lỗi khi cập nhật khuyến mãi:", error);
    }
  };

  return (
    <>
      <div
        className="flex justify-center m-auto"
        style={{
          width: "80%",
          fontSizfe: "8px",
          backgroundColor: "white",
          padding: "20px 10px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
          transition: "transform 0.2s",
        }}
      >
        <form
          className="bg-slate-500 rounded"
          style={{
            width: "100%",
          }}
        >
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-5 ">
            Chỉnh sửa khuyến mại
          </h2>
          <div>
            <label
              htmlFor="idKM"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              ID khuyến mại
            </label>
            <input
              type="text"
              id="idKM"
              className="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="ID khuyến mại"
              value={idKM}
              required
              readOnly
            />
          </div>

          <div className="mt-5">
            <label
              htmlFor="ma"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Mã khuyến mại
            </label>
            <input
              type="text"
              id="ma"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nhập mã khuyến mại"
              value={khuyenMai.ma}
              required
              readOnly
            />
          </div>
          <div className="mb-6 mt-5">
            <label
              htmlFor="ten"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Tên
            </label>
            <input
              type="text"
              id="ten"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nhập tên khuyến mại"
              required
              onChange={(e) =>
                setKhuyenMai({ ...khuyenMai, ten: e.target.value })
              }
              value={khuyenMai.ten}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="so_nha"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Ngày bắt đầu
            </label>
            <input
              type="datetime-local"
              id="startDateInput"
              value={selectedStartDate}
              onChange={handleStartDateChange}
              style={{
                width: "100%",
                border: "1px solid #e4e4e4",
                borderRadius: "4px",
                padding: "3px 7px",
              }}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="so_nha"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Ngày kết thúc
            </label>
            <input
              type="datetime-local"
              id="endDateInput"
              value={selectedEndDate}
              onChange={handleEndDateChange}
              style={{
                width: "100%",
                border: "1px solid #e4e4e4",
                borderRadius: "4px",
                padding: "3px 7px",
              }}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Giá trị phần trăm
            </label>
            <select
              onChange={(e) =>
                setKhuyenMai({ ...khuyenMai, giaTriPhanTram: e.target.value })
              }
              style={{
                width: "100%",
                border: "1px solid #e4e4e4",
                borderRadius: "4px",
                padding: "3px 7px",
              }}
              value={khuyenMai.giaTriPhanTram}
            >
              {percentValues.map((percent) => (
                <option key={percent} value={percent}>
                  {percent}%
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label
              htmlFor="so_nha"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Ngày cập nhật
            </label>
            <input
              type="datetime-local"
              value={currentDateTime}
              format="DD/MM/YYYY"
              disabled
              style={{
                width: "100%",
                border: "1px solid #e4e4e4",
                borderRadius: "4px",
                padding: "3px 7px",
              }}
            />
          </div>
          <div className="text-center">
            <Button
              type="primary"
              style={{
                backgroundColor: "#1976d2",
                marginBottom: "2px",
              }}
              onClick={handleOpenUpdateConfirmation}
            >
              Cập nhật
            </Button>
          </div>
        </form>
        <Dialog
          open={updateConfirmationOpen}
          onClose={handleCloseUpdateConfirmation}
        >
          <DialogTitle>Xác nhận cập nhật</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Bạn có chắc muốn chỉnh sửa khuyến mại này?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <ButtonMaterial
              onClick={handleCloseUpdateConfirmation}
              color="primary"
            >
              Hủy
            </ButtonMaterial>
            <ButtonMaterial onClick={handleUpdateKhuyenMai} color="primary">
              Xác nhận
            </ButtonMaterial>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
