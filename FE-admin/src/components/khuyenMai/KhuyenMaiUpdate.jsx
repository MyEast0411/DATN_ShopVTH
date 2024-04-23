import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  getKhuyenMaiById,
  updateKhuyenMai,
} from "../../api/khuyenMai/KhuyenMaiApi";
import TableAllSanPham from "../../common/tableNextUi/khuyenMai/TableAllSanPham";
import TableChiTietSanPham from "../../common/tableNextUi/khuyenMai/TableAllChiTietSPForUpdate";
import { BiSolidMessageAltAdd } from "react-icons/bi";
import { Button as NextuiButton } from "@nextui-org/button";

export default function KhuyenMaiUpdate() {
  let { idKM } = useParams();
  const [khuyenMai, setKhuyenMai] = useState({});
  const percentValues = Array.from({ length: 30 }, (_, index) => index + 1);
  const [ngayBatDau, setNgayBatDau] = useState("");
  const [ngayKetThuc, setNgayKetThuc] = useState("");
  const [updateConfirmationOpen, setUpdateConfirmationOpen] = useState(false);
  const chuyenTrang = useNavigate();
  const [ten, setTen] = useState("");
  const [giaTriPhanTram, setGiaTriPhanTram] = useState("");
  const [rowKey, setRowKey] = useState([]);

  // start 2 table: TableAllChiTietSP, TableAllSanPham
  const [selectedMaValues, setSelectedMaValues] = useState([]);
  const [selectedMaCTSPValues, setSelectedMaCTSPValues] = useState([]);

  const handleSelectedMaValuesChange = (newSelectedMaValues) => {
    setSelectedMaValues(newSelectedMaValues);
  };

  const handleOnchangeMaCTSP = (newSelectedMaValues) => {
    console.log("newSelectedMaValues", newSelectedMaValues);
    setSelectedMaCTSPValues(newSelectedMaValues);
  };

  const handleRowKey = (rowKey) => {
    console.log("handleRowKey", rowKey);
    if (rowKey.length === 0) {
      setSelectedMaCTSPValues("do-not-change");
    }
    setRowKey(rowKey);
  };
  // end 2 table: TableAllChiTietSP, TableAllSanPham

  const handleOpenUpdateConfirmation = () => {
    setUpdateConfirmationOpen(true);
  };

  const handleCloseUpdateConfirmation = () => {
    setUpdateConfirmationOpen(false);
  };

  useEffect(() => {
    const fetchKhuyenMaiData = async () => {
      try {
        const response = await getKhuyenMaiById(idKM);
        setNgayBatDau(response.ngayBatDau);
        setNgayKetThuc(response.ngayKetThuc);
        setKhuyenMai(response);
        setGiaTriPhanTram(response.giaTriPhanTram);
        setTen(response.ten);
      } catch (error) {
        console.log(error);
      }
    };
    fetchKhuyenMaiData();
  }, []);

  const handleTenInputChange = (e) => {
    setTen(e.target.value);
  };
  

  const confirmUpdate = async () => {
    try {
      console.log("ten: ", ten);
      console.log("ngayBatDau: ", ngayBatDau);
      console.log("ngayKetThuc: ", ngayKetThuc);
      if (ten === "") {
        toast.error("Tên khuyên mại đang trống!");
        handleCloseUpdateConfirmation();
        return;
      }
      if (ngayBatDau === "" || ngayKetThuc === "") {
        toast.error("Bạn chưa chọn ngày!");
        handleCloseUpdateConfirmation();
        return;
      }

      if (ngayBatDau >= ngayKetThuc) {
        toast.error("Ngày bắt đầu phải nhỏ hơn ngày kết thúc");
        handleCloseUpdateConfirmation();
        return;
      }

      if(selectedMaCTSPValues != 'do-not-change' && selectedMaCTSPValues.length === 0){
        toast.error("Vui lòng chọn sản phẩm giảm!");
        handleCloseUpdateConfirmation();
        return;
      }

      const khuyenMai = {
        id: idKM,
        ten: ten.trim(),
        giaTriPhanTram: giaTriPhanTram,
        ngayBatDau: ngayBatDau,
        ngayKetThuc: ngayKetThuc,
      };
      console.log("khuyenMai:", khuyenMai);
      const response = await updateKhuyenMai(khuyenMai, selectedMaCTSPValues);

      setTen("");
      // setGiaTriPhanTram(1);
      setNgayBatDau("");
      setNgayKetThuc("");
      handleCloseUpdateConfirmation();
      toast("🎉 Chỉnh sửa thành công!");
      chuyenTrang("/khuyen-mai");
    } catch (error) {
      console.error("Error updating KhuyenMai:", error);
      toast.error("Khuyến mãi trùng thời gian với khuyến mãi khác!");
      handleCloseUpdateConfirmation();
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
              Chỉnh sửa đợt giảm giá
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
                  defaultValue={ten}
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
                showTime={{
                  defaultValue: dayjs("00:00:00", "HH:mm:ss"),
                }}
                disabledDate={disabledDate}
                format="DD-MM-YYYY HH:mm:ss"
                value={dayjs(ngayBatDau)}
                // defaultValue={dayjs('2019-09-03', dateFormat)}
                onChange={(date, dateString) => setNgayBatDau(date)}
              />
              <label
                htmlFor="phone"
                className="block -mb-4 mt-1 text-sm font-medium text-gray-900"
              >
                Ngày kết thúc
              </label>
              <DatePicker
                placeholder="Chọn ngày kết thúc"
                disabledDate={disabledEndDate}
                showTime={{
                  defaultValue: dayjs("00:00:00", "HH:mm:ss"),
                }}
                format="DD-MM-YYYY HH:mm:ss"
                value={dayjs(ngayKetThuc)}
                onChange={(date, dateString) => setNgayKetThuc(date)}
              />
            </div>
            <div className="flex justify-center">
              <Button
                type="primary"
                style={{
                  backgroundColor: "#1976d2",
                  marginBottom: "2px",
                }}
                onClick={handleOpenUpdateConfirmation}
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
              idKM={idKM}
              onSelectedRowKey={handleRowKey}
            />
          </div>
        </div>

        <Dialog
          open={updateConfirmationOpen}
          onClose={handleCloseUpdateConfirmation}
        >
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
              <span>Xác nhận chỉnh sửa</span>
            </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Bạn có chắc muốn chỉnh sửa khuyến mại này?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <NextuiButton
              onClick={handleCloseUpdateConfirmation}
              color="warning"
            >
              Hủy
            </NextuiButton>
            <NextuiButton onClick={confirmUpdate} color="success">
              Xác nhận
            </NextuiButton>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
