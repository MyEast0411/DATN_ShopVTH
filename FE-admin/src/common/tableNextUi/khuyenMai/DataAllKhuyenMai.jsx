import React from "react";
const columns = [
  { name: "Mã", uid: "ma", sortable: true },
  { name: "Tên", uid: "ten", sortable: true },
  { name: "Giá trị giảm (%)", uid: "giaTriPhanTram", sortable: true },
  { name: "Ngày bắt đầu", uid: "ngayBatDau", sortable: true },
  { name: "Ngày kết thúc", uid: "ngayKetThuc", sortable: true },
  { name: "Trạng thái", uid: "trangThai", sortable: true },
  { name: "Hành Động", uid: "hanhDong" },
];

const statusOptions = [
  { name: "Đang diễn ra", uid: "Đang diễn ra" },
  { name: "Đã kết thúc", uid: "Đã kết thúc" },
  { name: "Sắp diễn ra", uid: "Sắp diễn ra" },
];

const khuyenMais = [
  {
    id: 1,
    ma: "KM123",
    ten: "Khuyến mại A",
    giaTriPhanTram: 10,
    ngayBatDau: "2023-10-15",
    ngayKetThuc: "2023-10-30",
    trangThai: "Sắp diễn ra",
  },
  {
    id: 2,
    ma: "KM456",
    ten: "Khuyến mại C",
    giaTriPhanTram: 20,
    ngayBatDau: "2023-10-15",
    ngayKetThuc: "2023-10-30",
    trangThai: "Đang diễn ra",
  },
  {
    id: 3,
    ma: "KM525",
    ten: "Khuyến mại B",
    giaTriPhanTram: 15,
    ngayBatDau: "2023-10-15",
    ngayKetThuc: "2023-10-30",
    trangThai: "Đã kết thúc",
  },
];

export { columns, khuyenMais, statusOptions };
