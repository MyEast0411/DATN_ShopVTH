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

export { columns, statusOptions };
