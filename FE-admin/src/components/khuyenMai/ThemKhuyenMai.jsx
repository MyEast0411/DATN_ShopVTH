import React, { useState, useEffect } from "react";
import { Button } from "antd"; // Import from antd
import { toast } from "react-toastify";
import { DateTime } from "luxon";
import { addKhuyenMai } from "../../api/khuyenMai/KhuyenMaiApi";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button as NextuiButton } from "@nextui-org/button";
import { TbInfoTriangle } from "react-icons/tb";
import TableAllSanPham from "../../common/tableNextUi/khuyenMai/TableAllSanPham";
import TableAllChiTietSanPham from "../../common/tableNextUi/khuyenMai/TableAllChiTietSP";
import { useParams } from "react-router-dom";
import { getKhuyenMaiById } from "../../api/khuyenMai/KhuyenMaiApi";
import moment from "moment/moment";

export default function ThemKhuyenMai() {
  const { idKM } = useParams();
  console.log(idKM);
  const [ten, setTen] = useState("");
  const [giaTriPhanTram, setGiaTriPhanTram] = useState(1);
  const [ngayBatDau, setNgayBatDau] = useState("");
  const [ngayKetThuc, setNgayKetThuc] = useState("");
  const [addConfirmationOpen, setAddConfirmationOpen] = useState(false);
  // const [khuyenMai, setKhuyenMai] = useState({});
  const chuyenTrang = useNavigate();
  // Tạo một mảng giá trị phần trăm từ 1 đến 90
  const percentValues = Array.from({ length: 90 }, (_, index) => index + 1);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const currentDay = currentDate.getDate().toString().padStart(2, "0");
  const currentHour = currentDate.getHours().toString().padStart(2, "0");
  const currentMinute = currentDate.getMinutes().toString().padStart(2, "0");
  const [selectedStartDate, setSelectedStartDate] = useState("");

  function formatDateToISOString(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  const minDate = `${currentYear}-${currentMonth}-${currentDay}T${currentHour}:${currentMinute}`;
  const handleOpenAddConfirmation = () => {
    setAddConfirmationOpen(true);
  };

  const handleCloseAddConfirmation = () => {
    setAddConfirmationOpen(false);
  };

  useEffect(() => {
    const fetchKhuyenMaiById = async () => {
      try {
        const response = await getKhuyenMaiById(idKM);
        const data = response;
        console.log("Data:", data);
        setTen(data.ten);
        setGiaTriPhanTram(data.giaTriPhanTram);
        // setNgayBatDau(formatDateToISOString(new Date(data.ngayBatDau)));
        // setNgayKetThuc(formatDateToISOString(new Date(data.ngayKetThuc)));

        // setSelectedStartDate(formatDateToISOString(new Date(data.ngayBatDau)));
      } catch (error) {
        console.error("Error fetching KhuyenMai by ID:", error);
      }
    };
    fetchKhuyenMaiById();
  }, [idKM]);

  const confirmAdd = async () => {
    try {
      if (ten === "") {
        toast.error("Tên khuyên mại đang trống!");
        handleCloseAddConfirmation();
        return;
      }
      if (ngayBatDau === "" || ngayKetThuc === "") {
        toast.error("Bạn chưa chọn ngày!");
        handleCloseAddConfirmation();
        return;
      }
      const startDate = new Date(ngayBatDau);
      const endDate = new Date(ngayKetThuc);

      if (startDate >= endDate) {
        toast.error("Ngày bắt đầu phải nhỏ hơn ngày kết thúc");
        handleCloseAddConfirmation();
        return;
      }

      const khuyenMai = {
        id: idKM,
        ten: ten,
        giaTriPhanTram: giaTriPhanTram,
        ngayBatDau: new Date(ngayBatDau).toISOString(),
        ngayKetThuc: new Date(ngayKetThuc).toISOString(),
      };
      console.log(khuyenMai);
      const response = await addKhuyenMai(khuyenMai);

      setTen("");
      setGiaTriPhanTram(1);
      setNgayBatDau("");
      setNgayKetThuc("");
      handleCloseAddConfirmation();
      toast("🎉 Thêm thành công!");
      chuyenTrang("/khuyen-mai");
    } catch (error) {
      console.error("Error adding KhuyenMai:", error);
      toast.error("Thêm thất bại.");
      handleCloseAddConfirmation();
    }
  };

  return (
    <>
      <div className="flex justify-between gap-4">
        <div
          className="grid pl-5 sticky top-0"
          style={{
            width: "30%",
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: " 0 0 5px 2px #ccc",
            height: "100%",
            textOverflow: "none",
          }}
        >
          <form className="bg-slate-500 rounded">
            <h2 className="text-xl mb-10 font-bold text-gray-800">
              Thêm khuyến mại
            </h2>
            <div className="grid gap-6 mb-6 md:grid-cols-1">
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Tên khuyến mại
                </label>
                <input
                  type="text"
                  value={ten}
                  onChange={(e) => setTen(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nhập tên khuyến mại"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Giá trị giảm
                </label>
                <select
                  value={giaTriPhanTram}
                  onChange={(e) => setGiaTriPhanTram(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "2px 5px",
                    border: "1.5px solid #e1e1e1",
                    borderRadius: "5px",
                  }}
                >
                  {percentValues.map((percent) => (
                    <option key={percent} value={percent}>
                      {percent}%
                    </option>
                  ))}
                </select>
              </div>

              <label
                htmlFor="phone"
                className="block -mb-4 mt-1 text-sm font-medium text-gray-900"
              >
                Ngày bắt đầu
              </label>
              <input
                type="datetime-local"
                id="ngayBatDauInput"
                onChange={(e) => {
                  setNgayBatDau(e.target.value);
                  setSelectedStartDate(e.target.value);
                }}
                required
                min={minDate}
                value={ngayBatDau}
                style={{
                  width: "100%",
                  padding: "2px 5px",
                  border: "1.5px solid #e1e1e1",
                  borderRadius: "5px",
                }}
              />

              <label
                htmlFor="phone"
                className="block -mb-4 mt-1 text-sm font-medium text-gray-900"
              >
                Ngày kết thúc
              </label>
              <input
                value={ngayKetThuc}
                type="datetime-local"
                id="ngayKetThucInput"
                onChange={(e) => setNgayKetThuc(e.target.value)}
                required
                min={selectedStartDate} // Set the minimum date based on selected start date
                style={{
                  width: "100%",
                  padding: "2px 5px",
                  border: "1.5px solid #e1e1e1",
                  borderRadius: "5px",
                }}
              />
            </div>
            <div className="flex justify-center">
              <Button
                type="primary"
                style={{
                  backgroundColor: "#1976d2",
                  marginBottom: "2px",
                }}
                onClick={handleOpenAddConfirmation} // Open confirmation dialog
              >
                Cập nhật
              </Button>
            </div>
          </form>
        </div>
        <div
          className="pl-5 border-l-[2px]"
          style={{
            borderColor: "#ccc",
            height: "80%",
            width: "100%",
          }}
        >
          <h2 className="text-xl mb-1 -mt-2 font-bold text-gray-800">
            Sản phẩm
          </h2>
          <div
            className="p-5"
            style={{
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "5px",
              boxShadow: " 0 0 5px 2px #ccc",
            }}
          >
            <TableAllSanPham />
          </div>
          <h2 className="text-xl mt-7 mb-1 mr-5 font-bold text-gray-800">
            Chi tiết sản phẩm
          </h2>
          <div
            className="p-5"
            style={{
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "5px",
              boxShadow: " 0 0 5px 2px #ccc",
            }}
          >
            <TableAllChiTietSanPham />
          </div>
        </div>

        <Dialog open={addConfirmationOpen} onClose={handleCloseAddConfirmation}>
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
            <DialogContentText>
              Bạn có chắc muốn thêm khuyến mại này?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <NextuiButton onClick={handleCloseAddConfirmation} color="warning">
              Hủy
            </NextuiButton>
            <NextuiButton onClick={confirmAdd} color="success">
              Vẫn thêm
            </NextuiButton>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
