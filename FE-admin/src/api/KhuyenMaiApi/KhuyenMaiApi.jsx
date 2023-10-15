// const express = require('express');
// const app = express();
// const port = 3000; // Chọn cổng tùy ý

// app.use(express.json());

// // Đây là một mảng giả định để lưu trữ dữ liệu KhuyenMai (tương tự như bạn lưu trữ trong database)
// let khuyenMaiData = [];

// // GET /khuyen-mai - Lấy tất cả dữ liệu KhuyenMai
// app.get('/khuyen-mai', (req, res) => {
//   res.json(khuyenMaiData);
// });

// // POST /khuyen-mai/add - Thêm mới KhuyenMai
// app.post('/khuyen-mai/add', (req, res) => {
//   const newKhuyenMai = req.body;
//   khuyenMaiData = [...khuyenMaiData, newKhuyenMai]; // Thêm mới KhuyenMai vào mảng dữ liệu

//   res.json({ message: 'Thêm mới KhuyenMai thành công', khuyenMai: newKhuyenMai });
// });

// app.listen(port, () => {
//   console.log(`Server đang lắng nghe tại http://localhost:${port}`);
// });
