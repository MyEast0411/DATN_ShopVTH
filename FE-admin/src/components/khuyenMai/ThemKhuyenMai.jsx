import React, { useState } from "react";
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

export default function ThemKhuyenMai() {
  const [ten, setTen] = useState("");
  const [giaTriPhanTram, setGiaTriPhanTram] = useState(1);
  const [ngayBatDau, setNgayBatDau] = useState("");
  const [ngayKetThuc, setNgayKetThuc] = useState("");
  const [addConfirmationOpen, setAddConfirmationOpen] = useState(false);

  const chuyenTrang = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductSelection = (product) => {
    setSelectedProduct(product);
  };

  // Tạo một mảng giá trị phần trăm từ 1 đến 90
  const percentValues = Array.from({ length: 90 }, (_, index) => index + 1);

  const handleOpenAddConfirmation = () => {
    setAddConfirmationOpen(true);
  };

  const handleCloseAddConfirmation = () => {
    setAddConfirmationOpen(false);
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
      const startDate = new Date(ngayBatDau);
      const endDate = new Date(ngayKetThuc);

      if (startDate >= endDate) {
        toast.error("Ngày bắt đầu phải nhỏ hơn ngày kết thúc");
        handleCloseAddConfirmation();
        return;
      }

      const khuyenMai = {
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
      <div className="grid grid-cols-3 gap-4 fixed ">
        <div className="grid ">
          <form className="bg-slate-500 rounded">
            <h2 className="text-xl mb-10 font-bold text-gray-800">
              Thêm khuyến mại
            </h2>
            <div className="grid gap-6 mb-6 md:grid-cols-1">
              {/* <div>
                <label
                  htmlFor="full_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Mã khuyến mại
                </label>
                <input
                  type="text"
                  value={ma}
                  onChange={(e) => setMa(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nhập mã khuyến mại"
                  disabled
                />
              </div> */}

              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Tên khuyến mại
                </label>
                <input
                  type="text"
                  // value={ten}
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
                  onChange={(e) => setGiaTriPhanTram(e.target.value)}
                  style={{
                    width: "100%",
                    borderRadius: "5px",
                    borderColor: "#e1e1e1",
                    padding: "2px 5px",
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
                id="dateInput"
                onChange={(e) => setNgayBatDau(e.target.value)}
                required
              />

              <label
                htmlFor="phone"
                className="block -mb-4 mt-1 text-sm font-medium text-gray-900"
              >
                Ngày kết thúc
              </label>
              <input
                type="datetime-local"
                id="dateInput"
                onChange={(e) => setNgayKetThuc(e.target.value)}
                required
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
                Thêm
              </Button>
            </div>
          </form>
        </div>
        <div
          className="pl-5 border-l-[2px] col-span-2 overflow-y-auto"
          style={{
            borderColor: "#ccc",
            height: "80%",
            width: "100%",
          }}
        >
          <h2
            className="text-xl mb-1 font-bold text-gray-800"
            style={{ backgroundColor: "#f1f1f1" }}
          >
            Sản phẩm
          </h2>
          <div className="">
            <TableAllSanPham />
          </div>
          <h2 className="text-xl mt-7 mb-1 mr-5 font-bold text-gray-800">
            Chi tiết sản phẩm
          </h2>
          <div className="">
            <TableAllSanPham />
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
