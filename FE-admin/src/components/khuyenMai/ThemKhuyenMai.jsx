import React, { useState, useEffect } from "react";
import { Button, DatePicker } from "antd";
import { toast } from "react-toastify";
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
import { BiSolidMessageAltAdd } from "react-icons/bi";

import TableAllSanPham from "../../common/tableNextUi/khuyenMai/TableAllSanPham";
import TableChiTietSanPham from "../../common/tableNextUi/khuyenMai/TableAllChiTietSP";
import { useParams } from "react-router-dom";
import { getKhuyenMaiById } from "../../api/khuyenMai/KhuyenMaiApi";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export default function ThemKhuyenMai() {
  const { idKM } = useParams();
  const [ten, setTen] = useState("");
  const [giaTriPhanTram, setGiaTriPhanTram] = useState(1);
  const [ngayBatDau, setNgayBatDau] = useState("");
  const [ngayKetThuc, setNgayKetThuc] = useState("");
  const [addConfirmationOpen, setAddConfirmationOpen] = useState(false);

  const chuyenTrang = useNavigate();
  const percentValues = Array.from({ length: 30 }, (_, index) => index + 1);
  const [selectedMaValues, setSelectedMaValues] = useState([]);
  const [selectedMaCTSPValues, setSelectedMaCTSPValues] = useState([]);

  const handleSelectedMaValuesChange = (newSelectedMaValues) => {
    setSelectedMaValues(newSelectedMaValues);
  };

  const handleOnchangeMaCTSP = (newSelectedMaValues) => {
    setSelectedMaCTSPValues(newSelectedMaValues);
  };

  const handleNgayBatDauChange = (date, dateString) => {
    setNgayBatDau(date);
  };

  const handleNgayKetThucChange = (date, dateString) => {
    setNgayKetThuc(date);
  };

  const handleOpenAddConfirmation = () => {
    setAddConfirmationOpen(true);
  };

  const handleCloseAddConfirmation = () => {
    setAddConfirmationOpen(false);
  };

  useEffect(() => {
    const fetchKhuyenMaiById = async () => {
      try {
        const data = await getKhuyenMaiById(idKM);
        console.log("data:", data);
        setTen(data.ten);
        setGiaTriPhanTram(data.giaTriPhanTram);
      } catch (error) {
        console.error("Error fetching KhuyenMai by ID:", error);
      }
    };
    fetchKhuyenMaiById();
  }, [idKM]);

  const handleTenInputChange = (e) => {
    setTen(e.target.value);
  };

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

      if (ngayBatDau >= ngayKetThuc) {
        toast.error("Ngày bắt đầu phải nhỏ hơn ngày kết thúc");
        handleCloseAddConfirmation();
        return;
      }

      if (
        selectedMaCTSPValues == null ||
        selectedMaCTSPValues.length == 0 ||
        selectedMaCTSPValues == ""
      ) {
        toast.error("Vui lòng chọn sản phẩm giảm!");
        handleCloseAddConfirmation();
        return;
      }

      const khuyenMai = {
        id: idKM,
        ten: ten,
        giaTriPhanTram: giaTriPhanTram,
        ngayBatDau: ngayBatDau,
        ngayKetThuc: ngayKetThuc,
      };
      const response = await addKhuyenMai(khuyenMai, selectedMaCTSPValues);
      console.log("response:", response);

      setTen("");
      setGiaTriPhanTram(1);
      setNgayBatDau("");
      setNgayKetThuc("");
      handleCloseAddConfirmation();
      toast("🎉 Thêm thành công!");
      chuyenTrang("/khuyen-mai");
    } catch (error) {
      console.error("Error adding KhuyenMai:", error);
      toast.error("Khuyến mãi trùng thời gian với khuyến mãi khác!");
      handleCloseAddConfirmation();
    }
  };

  // Hàm để vô hiệu hóa các ngày trong quá khứ
  const disabledDate = (current) => {
    const today = dayjs();
    return current && current < today.startOf("day");
  };

  // Hàm để vô hiệu hóa các ngày nhỏ hơn ngày bắt đầu
  function disabledEndDate(current) {
    return current && current < dayjs(ngayBatDau).startOf("day");
  }

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
            boxShadow: " 0 0 5px 1px #ccc",
            height: "710px",
            textOverflow: "none",
          }}
        >
          <form className="bg-slate-500 rounded">
            <h2 className="text-xl mb-10 font-bold text-gray-800">
              Thêm đợt giảm giá
            </h2>
            <div className="grid gap-6 mb-6 md:grid-cols-1">
              <div className="mb-5">
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Tên khuyến mại
                </label>
                <input
                  type="text"
                  value={ten}
                  onInput={handleTenInputChange} 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nhập tên khuyến mại"
                  required
                />
              </div>
              <div className="mb-5">
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
              <DatePicker
                placeholder="Chọn ngày bắt đầu"
                // defaultValue={dayjs("01/01/2015", dateFormatList[0])}
                showTime={{
                  defaultValue: dayjs("00:00:00", "HH:mm:ss"),
                }}
                disabledDate={disabledDate}
                format="DD-MM-YYYY HH:mm:ss"
                onChange={handleNgayBatDauChange}
              />
              <label
                htmlFor="phone"
                className="block -mb-4 mt-1 text-sm font-medium text-gray-900"
              >
                Ngày kết thúc
              </label>
              <DatePicker
                placeholder="Chọn ngày kết thúc"
                showTime={{
                  defaultValue: dayjs("00:00:00", "HH:mm:ss"),
                }}
                format="DD-MM-YYYY HH:mm:ss"
                disabledDate={disabledEndDate}
                onChange={handleNgayKetThucChange}
              />
            </div>
            <div className="flex justify-center">
              <Button
                type="primary"
                style={{
                  backgroundColor: "#1976d2",
                  marginBottom: "2px",
                }}
                onClick={handleOpenAddConfirmation}
              >
                Hoàn tất
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
            <TableAllSanPham
              onSelectedMaValuesChange={handleSelectedMaValuesChange}
            />
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
            <TableChiTietSanPham
              selectedMaValues={selectedMaValues}
              onSelectedMaValuesChange={handleOnchangeMaCTSP}
            />
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
              <BiSolidMessageAltAdd
                className="mr-2"
                style={{
                  color: "#00A9FF",
                  fontSize: "35px",
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
