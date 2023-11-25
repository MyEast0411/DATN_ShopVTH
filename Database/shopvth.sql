    drop database shopVTH;
    create database shopVTH;
	use shopVTH;
--     -- run intelliJ IDEA

    ------------------------------
    
	INSERT INTO khuyen_mai (id, ma, ten, ngay_bat_dau, ngay_ket_thuc,
    gia_tri_phan_tram, ngay_tao, ngay_sua, nguoi_tao, nguoi_sua, trang_thai,  deleted, switchKM)
    VALUES
    ('4aefa60e-89f2-11ee-af38-17da04848a28','KM001','Khuyến mại tháng 1/2023','2023-01-01 00:00:00.000000',
    '2023-01-30 00:00:00.000000',10,'2023-01-01 00:00:00.000000','2023-01-01 00:00:00.000000','Hội','Hội','Đã kết thúc',
    0,'Đã kết thúc'),
     ('4aefa669-89f2-11ee-af38-17da04848a28','KM002','Khuyến mại tháng 1/2025','2025-01-01 00:00:00.000000',
    '2025-01-30 00:00:00.000000',10,'2023-01-01 00:00:00.000000','2023-01-01 00:00:00.000000','Hội','Hội','Chưa diễn ra',
    0,'Chưa diễn ra');
    
    ------------------------------


    INSERT INTO chat_lieu (id, deleted, ma, ngay_sua, ngay_tao,nguoi_sua,nguoi_tao, ten)
    VALUES
    ('5C28B9B8-281F-4838-B6A9-AE3606A15CCF', 1, 'CL1', '2023-10-01', '2023-11-01','Hiền','Hiền', 'Da'),
    ('F47F6B68-26B7-4C62-80F4-2A3D21DBEEEF', 1, 'CL2', '2023-10-02', '2023-11-02','Hiền','Hiền', 'Vải'),
    ('D8C675DB-1537-4899-B6E4-14B06B47147D', 1, 'CL3', '2023-10-03', '2023-11-03', 'Hiền','Hiền','Nylon'),
    ('D8C675DB-1537-4899-B6E4-14B06B47147E', 1, 'CL4', '2023-10-04', '2023-11-04', 'Cam','Cam','Da Bò'),
    ('D8C675DB-1537-4899-B6E4-14B06B471471', 1, 'CL5', '2023-10-05', '2023-11-05', 'Cam','Cam','Lụa'),
    ('D8C675DB-1537-4899-B6E4-14B06B471472', 1, 'CL6', '2023-10-06', '2023-11-06', 'Đông','Đông','Mesh'),
    ('D8C675DB-1537-4899-B6E4-14B06B471473', 1, 'CL7', '2023-10-07', '2023-11-07', 'Hội ','Hội ','Canvas'),
    ('D8C675DB-1537-4899-B6E4-14B06B471474', 1, 'CL8', '2023-10-08', '2023-11-08', 'Hội ','Hội ','Da bò'),
    ('D8C675DB-1537-4899-B6E4-14B06B471475', 1, 'CL10', '2023-10-08', '2023-11-08', 'Trang','Trang','Da báo'),
    ('D8C675DB-1537-4899-B6E4-14B06B471476', 1, 'CL11', '2023-10-08', '2023-11-08', 'Trang','Trang',' Cao Su');


    INSERT INTO chuc_vu (id, deleted, ma, ngay_sua, ngay_tao,nguoi_sua,nguoi_tao, ten)
    VALUES

    ('59EE616B-1991-4A21-8087-5A3E636C0121', 1, 'CV2', '2023-10-02', '2023-11-02', 'Hiền','Hiền','Quản lý'),
    ('59EE616B-1991-4A21-8087-5A3E636C0122', 1, 'CV3', '2023-10-03', '2023-11-03', 'Trang','Trang','Nhân viên'),
    ('0d98288c-7d99-11ee-88fd-f889d261a6fa',1,'CV1','2023-10-01','2023-01-02','Hội','Hội','Nhân viên bán hàng');

    INSERT INTO de_giay (id, deleted, ma, ngay_sua, ngay_tao,nguoi_sua,nguoi_tao, ten)
    VALUES

    ('2acd739b-856a-11ee-9f61-f889d261a6fa', 1, 'DG2', '2023-10-02', '2023-11-02', 'Hiền','Hiền','Đế nén khí'),
    ('2acd739b-856a-11ee-9f61-f889d261a6f1', 1, 'DG3', '2023-10-03', '2023-11-03', 'Trang','Trang','Đế phylon'),
    ('2acd739b-856a-11ee-9f61-f889d261a6f2',1,'DG1','2023-10-01','2023-01-02','Hội','Hội','Đế giày Crepe'),
    ('2acd739b-856a-11ee-9f61-f889d261a6f4',1,'DG4','2023-10-01','2023-01-02','Hội','Cam','Đế giày TRP'),
    ('2acd739b-856a-11ee-9f61-f889d261a6f5',1,'DG5','2023-10-01','2023-01-02','Cam','Cam','Đế giày ABS');

    INSERT INTO khach_hang (id, anh_nguoi_dung, cccd, deleted, email, gioi_tinh, ma, ngay_sinh,
    ngay_sua, ngay_tao, nguoi_sua, nguoi_tao, so_dien_thoai, ten, trang_thai)
    VALUES

    ('94f1ac27-856f-11ee-9f61-f889d261a6fa', 'https://i.imgur.com/LdisWqLh.jpg', '030203006062', '1',
    'hoi2003@gmail.com', 'Nam','KH1','2003-01-01','2023-01-01','2023-10-10','Hội','Hội','0123456789','Trang',0),
    ('94f1ac27-856f-11ee-9f61-f889d261a6f1',
    'https://vapa.vn/wp-content/uploads/2022/12/anh-cute-001-1.jpg','020203006062', '1', 'hoi2003@gmail.com',
    'Nữ','KH2','2003-01-01','2023-01-01','2023-10-10','Trang','Hội','0123456789','Trang',0);

    INSERT INTO dia_chi (id, deleted, duong, huyen, ngay_sua, ngay_tao, nguoi_sua, nguoi_tao, quoc_gia, thanh_pho,
    trang_thai, xa, id_khach_hang)
    VALUES

    ('492c1c4a-8571-11ee-9f61-f889d261a6fa', 1, 'Mạch Lũng','Đông Anh','2023-10-03','2023-10-01','Cam','Cam','Việt
    Nam','Hà Nội', 0,'Đại Mạch','94f1ac27-856f-11ee-9f61-f889d261a6fa'),
    ('492c1c4a-8571-11ee-9f61-f889d261a6f1', 1, 'Thôn Mạch Lũng ','Đông
    Anh','2023-10-05','2023-10-02','Đông','Cam','Việt Nam','Hà Nội', 1,'Đại
    Mạch','94f1ac27-856f-11ee-9f61-f889d261a6fa'),
    ('492c1c4a-8571-11ee-9f61-f889d261a6f2',1,'Cổ Điển','Đông Anh','2023-11-03','2023-11-01','Hội','Cam','Việt
    Nam','Hà Nội', 0,'Hải Bối','94f1ac27-856f-11ee-9f61-f889d261a6f1'),
    ('492c1c4a-8571-11ee-9f61-f889d261a6f3',1,'Trường THCS Cổ Điển ','Đông
    Anh','2023-11-05','2023-11-02','Hiền','Hiền','Việt Nam','Hà Nội', 1,'Hải
    Bối','94f1ac27-856f-11ee-9f61-f889d261a6f1');

    INSERT INTO gio_hang (id, deleted, ma, ngay_sua, ngay_tao, nguoi_sua, nguoi_tao, id_khach_hang)
    values('ca58d03f-8572-11ee-9f61-f889d261a6fa',1,'GH1','2023-10-03','2023-10-01','Cam','Cam','94f1ac27-856f-11ee-9f61-f889d261a6fa')
    ,
    ('ca58d03f-8572-11ee-9f61-f889d261a6f1',1,'GH2','2023-10-11','2023-10-03','Cam','Cam','94f1ac27-856f-11ee-9f61-f889d261a6f1');
    --


    -- ('0d6c88b1-8574-11ee-9f61-f889d261a6fa',1,'SP1','2023-10-03','2023-01-01','Hiền','Hiền','Jordan Retro 6 GNRG'),
    -- ('0d6c88b1-8574-11ee-9f61-f889d261a6f1',1,'SP2','2023-10-04','2023-01-02','Hội','Hội','Jordan Stay Loyal 3'),
    -- ('0d6c88b1-8574-11ee-9f61-f889d261a6f2',1,'SP3','2023-10-05','2023-01-03','Hiền','Hiền','Air Jordan 1ElevateHigh'),
    -- ('0d6c88b1-8574-11ee-9f61-f889d261a6f3',1,'SP4','2023-10-06','2023-01-04','Hiền','Hiền','Jordan Fadeaway'),

    -- ----

    INSERT INTO kich_co (id, deleted, ma, ngay_sua, ngay_tao,nguoi_sua,nguoi_tao, ten)
    VALUES
    ('6f6b72c7-8575-11ee-9f61-f889d261a6f10',1,'KC11','2023-10-22','2023-01-11','Cam','Hội','38.5'),
    ('6f6b72c7-8575-11ee-9f61-f889d261a6f11',1,'KC12','2023-10-22','2023-01-11','Cam','Hội','37.5'),
    ('6f6b72c7-8575-11ee-9f61-f889d261a6f12',1,'KC13','2023-10-22','2023-01-11','Cam','Hội','39'),
    ('6f6b72c7-8575-11ee-9f61-f889d261a6f13',1,'KC14','2023-10-22','2023-01-11','Cam','Hội','39.5'),
    ('6f6b72c7-8575-11ee-9f61-f889d261a6f14',1,'KC15','2023-10-22','2023-01-11','Cam','Hội','40'),
    ('6f6b72c7-8575-11ee-9f61-f889d261a6fa', 1, 'KC1', '2023-10-01', '2023-01-02', 'Hiền','Hiền','20'),
    ('6f6b72c7-8575-11ee-9f61-f889d261a6f1', 1, 'KC2', '2023-10-02', '2023-01-03', 'Trang','Trang','20.5'),
    ('6f6b72c7-8575-11ee-9f61-f889d261a6f2',1,'KC3','2023-10-03','2023-01-04','Hội','Hội','30'),
    ('6f6b72c7-8575-11ee-9f61-f889d261a6f3',1,'KC4','2023-10-04','2023-01-05','Hội','Hội','30.5'),
    ('6f6b72c7-8575-11ee-9f61-f889d261a6f4',1,'KC5','2023-10-05','2023-01-06','Cam','Hội','35'),
    ('6f6b72c7-8575-11ee-9f61-f889d261a6f5',1,'KC6','2023-10-06','2023-01-07','Hội','Đông','35.5'),
    ('6f6b72c7-8575-11ee-9f61-f889d261a6f6',1,'KC7','2023-10-07','2023-01-08','Hiền','Hội','36'),
    ('6f6b72c7-8575-11ee-9f61-f889d261a6f7',1,'KC8','2023-10-08','2023-01-09','Hội','Hiền','36.5'),
    ('6f6b72c7-8575-11ee-9f61-f889d261a6f8',1,'KC9','2023-10-09','2023-01-10','Đông','Hội','37'),
    ('6f6b72c7-8575-11ee-9f61-f889d261a6f9',1,'KC10','2023-10-22','2023-01-11','Cam','Hội','38');


    --

    INSERT INTO mau_sac (id, deleted, ma, ngay_sua, ngay_tao,nguoi_sua,nguoi_tao, ten)
    VALUES
      ('9d348eab-8576-11ee-9f61-f829d266a6fa', 1, '#006272', '2023-10-01', '2023-01-01', 'Hiền','Hiền','Màu xanh ngọc'),
    ('9d348eab-8576-11ee-9f61-f889d261a6fa', 1, '#000000', '2023-10-01', '2023-01-01', 'Hiền','Hiền','Màu
    đen'),
    ('9d348eab-8576-11ee-9f61-f889d261a6f1', 1, '#00A9FF', '2023-10-02', '2023-01-02', 'Cam','Cam','Màu xanh
    dương'),
    ('9d348eab-8576-11ee-9f61-f889d261a6f2', 1, '#FFF', '2023-10-03', '2023-01-03', 'Hội','Hiền','Màu trắng'),
    ('9d348eab-8576-11ee-9f61-f889d261a6f3', 1, '#A7D397', '2023-10-04', '2023-01-04', 'Hiền','Hiền','Màu xanh lá
    cây'),
    ('9d348eab-8576-11ee-9f61-f889d261a6f4', 1, '#FF4B91', '2023-10-05', '2023-01-05', 'Hiền','Hiền','Màu hồng'),
    ('9d348eab-8576-11ee-9f61-f889d261a6f5', 1, '#A9A9A9', '2023-10-06', '2023-01-06', 'Cam','Cam','Màu xám'),
    ('9d348eab-8576-11ee-9f61-f889d261a6f6', 1, '#B931FC', '2023-10-07', '2023-01-07', 'Hiền','Hiền','Máu tím '),
    ('9d348eab-8576-11ee-9f61-f889d261a6f7', 1, '#6C5F5B', '2023-10-08', '2023-01-08', 'Hiền','Hiền','Màu nâu'),
    ('9d348eab-8576-11ee-9f61-f889d261a6f8', 1, '#F4CE14', '2023-10-09', '2023-01-09', 'Đông','Đông','Màu vàng'),
    ('9d348eab-8576-11ee-9f61-f889d261a6f9', 1, '#BB2525', '2023-10-10', '2023-01-22', 'Hiền','Hiền','Màu đỏ');
    --

    INSERT INTO nhan_hieu (id, deleted, ma, ngay_sua, ngay_tao,nguoi_sua,nguoi_tao, ten)
    values('d6e398dd-8579-11ee-9f61-f889d261a6fa',1,'NH1', '2023-10-01', '2023-01-01', 'Hiền','Hiền','Nike');
    --

    INSERT INTO thuong_hieu (id, deleted, ma, ngay_sua, ngay_tao,nguoi_sua,nguoi_tao, ten)
    values('46acf97c-857a-11ee-9f61-ff889d261a6fa',1,'NH1', '2023-10-01', '2023-01-01', 'Hiền','Hiền','Nike');
    --

    INSERT INTO the_loai (id, deleted, ma, ngay_sua, ngay_tao,nguoi_sua,nguoi_tao, ten)
    values('9c3026bb-87bf-11ee-9e05-25821f161216',1,'TL1', '2023-10-01', '2023-01-01', 'Hiền','Hiền','Bóng rổ'),
    ('9c3026c7-87bf-11ee-9e05-25821f161216',1,'TL2', '2023-10-01', '2023-01-01', 'Hiền','Hiền','Thể thao'),
    ('9c3026c9-87bf-11ee-9e05-25821f161216',1,'TL3', '2023-10-01', '2023-01-01', 'Hiền','Hiền','Trẻ em'),
    ('9c3026cc-87bf-11ee-9e05-25821f161216',1,'TL4', '2023-10-01', '2023-01-01', 'Hiền','Hiền','Người lớn tuổi'),
    ('9c3026cf-87bf-11ee-9e05-25821f161216',1,'TL5', '2023-10-01', '2023-01-01', 'Hiền','Hiền','Phụ nữ'),
    ('9c3026d1-87bf-11ee-9e05-25821f161216',1,'TL6', '2023-10-01', '2023-01-01', 'Hiền','Hiền','Cổ cao'),
    ('9c3026d4-87bf-11ee-9e05-25821f161216',1,'TL7', '2023-10-01', '2023-01-01', 'Hiền','Hiền','Cổ thấp'),
    ('9c3026d6-87bf-11ee-9e05-25821f161216',1,'TL8', '2023-10-01', '2023-01-01', 'Hiền','Hiền','Nam giới'),
    ('9c3026d9-87bf-11ee-9e05-25821f161216',1,'TL9', '2023-10-01', '2023-01-01', 'Hiền','Hiền','Vận động viên'),
    ('9c3026db-87bf-11ee-9e05-25821f161216',1,'TL10', '2023-10-01', '2023-01-01', 'Hiền','Hiền','Bóng đá');

	select * from san_pham;
    ---------------- -- sản phẩm
    INSERT INTO san_pham (id, deleted, ma, ngay_sua, ngay_tao, nguoi_sua, nguoi_tao, ten) values
    ('0d6c88b1-8574-11ee-9f61-f889d261a6f4',1,'SP5','2023-10-07','2023-01-05','Hiền','Hiền','Air Jordan 1 Mid');

    select * from thuong_hieu;
    select * from mau_sac;
    ------------ -- sản phẩm chi tiết
    INSERT INTO san_pham_chi_tiet(id, deleted, gia_ban, gia_nhap, khoi_luong, ma, mo_ta, ngay_sua, ngay_tao, nguoi_sua, nguoi_tao, so_luong_ton, ten, trang_thai, id_chat_lieu,
 id_de_giay, id_kich_co, id_mau_sac, id_nhan_hieu, id_san_pham, id_the_loai, id_thuong_hieu, default_img)
 values
 
('f7b71662-8641-11ee-9533-f889d261a6fa', '1', '200.00', '180.00', '0.5', 'SPCT41', ' Khi bạn cần một đôi giày luôn sẵn sàng 24/7, đó phải là Max Aura 5. Lấy cảm hứng từ AJ3, đôi giày này tạo nên nét hiện đại trên nền cổ điển. ', '2023-10-01 00:00:00.000000', '2023-01-01 00:00:00.000000', 'Hiền', 'Hiền', '12', 'Jordan Max Aura 5', '1', '5C28B9B8-281F-4838-B6A9-AE3606A15CCF', '2acd739b-856a-11ee-9f61-f889d261a6f1', (SELECT id FROM kich_co WHERE ma = 'KC1'), '9d348eab-8576-11ee-9f61-f889d261a6f1', (select id from nhan_hieu where nhan_hieu.ma = 'NH1'), '0d6c88b1-8574-11ee-9f61-f889d261a6f4', (select id from the_loai where the_loai.ma = 'TL1'), (select id from thuong_hieu where thuong_hieu.ma = 'TH1'), 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/0d265602-b5fa-46c1-8eb6-b3e56c7f52b9/air-jordan-1-mid-shoes-SQf7DM.png'),

('f0d0f191-8641-11ee-9533-f889d261a6fa', '1', '150.00', '100.00', '0.8', 'SPCT42', ' Khi bạn cần một đôi giày luôn sẵn sàng 24/7, đó phải là Max Aura 5. Lấy cảm hứng từ AJ3, đôi giày này tạo nên nét hiện đại trên nền cổ điển. ', '2023-10-01 00:00:00.000000', '2023-01-01 00:00:00.000000', 'Hiền', 'Hiền', '12', 'Jordan Max Aura 5', '1', '5C28B9B8-281F-4838-B6A9-AE3606A15CCF', '2acd739b-856a-11ee-9f61-f889d261a6f1', (SELECT id FROM kich_co WHERE ma = 'KC2'), '9d348eab-8576-11ee-9f61-f889d261a6f6', (select id from nhan_hieu where nhan_hieu.ma = 'NH1'), '0d6c88b1-8574-11ee-9f61-f889d261a6f4', (select id from the_loai where the_loai.ma = 'TL2'), (select id from thuong_hieu where thuong_hieu.ma = 'TH1'), 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/514cb17e-dd49-4785-bd59-4e9e7bb6a957/air-jordan-1-mid-shoes-SQf7DM.png'),

('eb67530e-8641-11ee-9533-f889d261a6fa', '1', '400.00', '350.00', '0.8', 'SPCT44', ' Khi bạn cần một đôi giày luôn sẵn sàng 24/7, đó phải là Max Aura 5. Lấy cảm hứng từ AJ3, đôi giày này tạo nên nét hiện đại trên nền cổ điển. ', '2023-10-01 00:00:00.000000', '2023-01-01 00:00:00.000000', 'Hiền', 'Hiền', '12', 'Jordan Max Aura 5', '1', '5C28B9B8-281F-4838-B6A9-AE3606A15CCF', '2acd739b-856a-11ee-9f61-f889d261a6f1', (SELECT id FROM kich_co WHERE ma = 'KC3'), '9d348eab-8576-11ee-9f61-f889d261a6f3', (select id from nhan_hieu where nhan_hieu.ma = 'NH1'), '0d6c88b1-8574-11ee-9f61-f889d261a6f4', (select id from the_loai where the_loai.ma = 'TL3'), (select id from thuong_hieu where thuong_hieu.ma = 'TH1'), 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/ea3a034a-351d-4d5e-9e39-6ebe24eebd23/air-jordan-1-mid-shoes-SQf7DM.png'),

('e3884cbd-8641-11ee-9533-f889d261a6fa', '1', '300.00', '250.00', '0.5', 'SPCT43', ' Khi bạn cần một đôi giày luôn sẵn sàng 24/7, đó phải là Max Aura 5. Lấy cảm hứng từ AJ3, đôi giày này tạo nên nét hiện đại trên nền cổ điển. ', '2023-10-01 00:00:00.000000', '2023-01-01 00:00:00.000000', 'Hiền', 'Hiền', '12', 'Jordan Max Aura 5', '1', '5C28B9B8-281F-4838-B6A9-AE3606A15CCF', '2acd739b-856a-11ee-9f61-f889d261a6f4', (SELECT id FROM kich_co WHERE ma = 'KC4'), '9d348eab-8576-11ee-9f61-f889d261a6f9', (select id from nhan_hieu where nhan_hieu.ma = 'NH1'), '0d6c88b1-8574-11ee-9f61-f889d261a6f4', (select id from the_loai where the_loai.ma = 'TL4'), (select id from thuong_hieu where thuong_hieu.ma = 'TH1'), 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/31ff59e2-89d0-4a83-839a-656618674782/air-jordan-1-mid-shoes-SQf7DM.png'),

('dd5b194d-8641-11ee-9533-f889d261a6fa', '1', '600.00', '500.00', '0.8', 'SPCT45', ' Khi bạn cần một đôi giày luôn sẵn sàng 24/7, đó phải là Max Aura 5. Lấy cảm hứng từ AJ3, đôi giày này tạo nên nét hiện đại trên nền cổ điển. ', '2023-10-01 00:00:00.000000', '2023-01-01 00:00:00.000000', 'Hiền', 'Hiền', '12', 'Jordan Max Aura 5', '1', '5C28B9B8-281F-4838-B6A9-AE3606A15CCF', '2acd739b-856a-11ee-9f61-f889d261a6f4', (SELECT id FROM kich_co WHERE ma = 'KC5'), '9d348eab-8576-11ee-9f61-f829d266a6fa', (select id from nhan_hieu where nhan_hieu.ma = 'NH1'), '0d6c88b1-8574-11ee-9f61-f889d261a6f4', (select id from the_loai where the_loai.ma = 'TL5'), (select id from thuong_hieu where thuong_hieu.ma = 'TH1'), 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/79ecdc1b-bca8-4a57-912c-2a128ef2277a/air-jordan-1-mid-shoes-SQf7DM.png');

    ----------------------
    INSERT INTO hinh_anh (id, ma, ten, mau_sac, ngay_tao, nguoi_tao, id_san_pham_chi_tiet)
    VALUES ('f7b71662-8641-11ee-0533-f189d261a6fd', 'HA0001',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/79ecdc1b-bca8-4a57-912c-2a128ef2277a/air-jordan-1-mid-shoes-SQf7DM.png',
    'Xanh lá/ Trắng/ Cam', '2023-01-01', 'Admin', 'dd5b194d-8641-11ee-9533-f889d261a6fa');

    INSERT INTO hinh_anh (id, ma, ten, mau_sac, ngay_tao, nguoi_tao, id_san_pham_chi_tiet)
    VALUES ('f7b71662-8641-11ve-9533-f289b261a6fd', 'HA0002',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/ffb5cca7-60ea-4d28-aac5-05f900de53b0/air-jordan-1-mid-shoes-SQf7DM.png',
    'Xanh lá/ Trắng/ Cam', '2023-01-01', 'Admin', 'dd5b194d-8641-11ee-9533-f889d261a6fa');

    INSERT INTO hinh_anh (id, ma, ten, mau_sac, ngay_tao, nguoi_tao, id_san_pham_chi_tiet)
    VALUES ('4b898a8e-87ae-11ee-9e05-25821f161216', 'HA0003',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/e877c4d1-01e2-4d10-8816-9b7ba6926546/air-jordan-1-mid-shoes-SQf7DM.png',
    'Xanh lá/ Trắng/ Cam', '2023-01-01', 'Admin', 'dd5b194d-8641-11ee-9533-f889d261a6fa');

    INSERT INTO hinh_anh (id, ma, ten, mau_sac, ngay_tao, nguoi_tao, id_san_pham_chi_tiet)
    VALUES ('4b898ad6-87ae-11ee-9e05-25821f161216', 'HA0004',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b49153ce-2b8e-435c-9bab-ce6c0dbc0ac7/air-jordan-1-mid-shoes-SQf7DM.png',
    'Xanh lá/ Trắng/ Cam', '2023-01-01', 'Admin', 'dd5b194d-8641-11ee-9533-f889d261a6fa');

    INSERT INTO hinh_anh (id, ma, ten, mau_sac, ngay_tao, nguoi_tao, id_san_pham_chi_tiet)
    VALUES ('4b898ad9-87ae-11ee-9e05-25821f161216', 'HA0005',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/138817ea-1880-40a6-b632-93974c1a114e/air-jordan-1-mid-shoes-SQf7DM.png',
    'Xanh lá/ Trắng/ Cam', '2023-01-01', 'Admin', 'dd5b194d-8641-11ee-9533-f889d261a6fa');

    INSERT INTO hinh_anh (id, ma, ten, mau_sac, ngay_tao, nguoi_tao, id_san_pham_chi_tiet)
    VALUES ('4b898ada-87ae-11ee-9e05-25821f161216', 'HA0006',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/ee599219-8de1-4bd3-a628-aab5174872f7/air-jordan-1-mid-shoes-SQf7DM.png',
    'Xanh lá/ Trắng/ Cam', '2023-01-01', 'Admin', 'dd5b194d-8641-11ee-9533-f889d261a6fa');

    INSERT INTO hinh_anh (id, ma, ten, mau_sac, ngay_tao, nguoi_tao, id_san_pham_chi_tiet)
    VALUES ('4b898adc-87ae-11ee-9e05-25821f161216', 'HA0007',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/60aac9ac-b86e-4bee-b580-deffc555e642/air-jordan-1-mid-shoes-SQf7DM.png',
    'Xanh lá/ Trắng/ Cam', '2023-01-01', 'Admin', 'dd5b194d-8641-11ee-9533-f889d261a6fa');

    INSERT INTO hinh_anh (id, ma, ten, mau_sac, ngay_tao, nguoi_tao, id_san_pham_chi_tiet)
    VALUES ('4b898add-87ae-11ee-9e05-25821f161216', 'HA0008',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/d047978a-f5b8-457b-9c48-85d94ff821b7/air-jordan-1-mid-shoes-SQf7DM.png',
    'Xanh lá/ Trắng/ Cam', '2023-01-01', 'Admin', 'dd5b194d-8641-11ee-9533-f889d261a6fa');
    ----------------------

    INSERT INTO hinh_anh (id, ma, ten, mau_sac, ngay_tao, nguoi_tao, id_san_pham_chi_tiet)
    VALUES ('4b898ade-87ae-11ee-9e05-25821f161216', 'HA0009',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/31ff59e2-89d0-4a83-839a-656618674782/air-jordan-1-mid-shoes-SQf7DM.png',
    'Đỏ/Đen/Trắng', '2023-01-01', 'Admin', 'e3884cbd-8641-11ee-9533-f889d261a6fa');

    INSERT INTO hinh_anh (id, ma, ten, mau_sac, ngay_tao, nguoi_tao, id_san_pham_chi_tiet)
    VALUES ('e267c555-87af-11ee-9e05-25821f161216', 'HA0010',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/6a2c328c-34bf-4699-9513-4fe80ee7e0fb/air-jordan-1-mid-shoes-SQf7DM.png',
    'Đỏ/Đen/Trắng', '2023-01-01', 'Admin', 'e3884cbd-8641-11ee-9533-f889d261a6fa');

    INSERT INTO hinh_anh (id, ma, ten, mau_sac, ngay_tao, nguoi_tao, id_san_pham_chi_tiet)
    VALUES ('e267c565-87af-11ee-9e05-25821f161216', 'HA0011',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/92082d79-1d99-4c3c-9135-dc23b7936434/air-jordan-1-mid-shoes-SQf7DM.png',
    'Đỏ/Đen/Trắng', '2023-01-01', 'Admin', 'e3884cbd-8641-11ee-9533-f889d261a6fa');

    INSERT INTO hinh_anh (id, ma, ten, mau_sac, ngay_tao, nguoi_tao, id_san_pham_chi_tiet)
    VALUES ('e267c567-87af-11ee-9e05-25821f161216', 'HA0012',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/2838806d-22c6-4cba-b015-8478a6ce6d64/air-jordan-1-mid-shoes-SQf7DM.png',
    'Đỏ/Đen/Trắng', '2023-01-01', 'Admin', 'e3884cbd-8641-11ee-9533-f889d261a6fa');

    INSERT INTO hinh_anh (id, ma, ten, mau_sac, ngay_tao, nguoi_tao, id_san_pham_chi_tiet)
    VALUES ('e267c569-87af-11ee-9e05-25821f161216', 'HA0013',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/82d26c28-58a2-464f-881e-b20d2b5eafa8/air-jordan-1-mid-shoes-SQf7DM.png',
    'Đỏ/Đen/Trắng', '2023-01-01', 'Admin', 'e3884cbd-8641-11ee-9533-f889d261a6fa');

    INSERT INTO hinh_anh (id, ma, ten, mau_sac, ngay_tao, nguoi_tao, id_san_pham_chi_tiet)
    VALUES ('e267c56b-87af-11ee-9e05-25821f161216', 'HA0014',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/a43e3a5c-8088-4257-8165-806cf79fd12c/air-jordan-1-mid-shoes-SQf7DM.png',
    'Đỏ/Đen/Trắng', '2023-01-01', 'Admin', 'e3884cbd-8641-11ee-9533-f889d261a6fa');

    INSERT INTO hinh_anh (id, ma, ten, mau_sac, ngay_tao, nguoi_tao, id_san_pham_chi_tiet)
    VALUES ('e267c56d-87af-11ee-9e05-25821f161216', 'HA0015',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/8dcaf01b-3c49-499e-a9b9-f65fd2c056f3/air-jordan-1-mid-shoes-SQf7DM.png',
    'Đỏ/Đen/Trắng', '2023-01-01', 'Admin', 'e3884cbd-8641-11ee-9533-f889d261a6fa');

    INSERT INTO hinh_anh (id, ma, ten, mau_sac, ngay_tao, nguoi_tao, id_san_pham_chi_tiet)
    VALUES ('e267c56f-87af-11ee-9e05-25821f161216', 'HA0016',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/d36d735f-5273-4fda-8ad3-d29f401c11c9/air-jordan-1-mid-shoes-SQf7DM.png',
    'Đỏ/Đen/Trắng', '2023-01-01', 'Admin', 'e3884cbd-8641-11ee-9533-f889d261a6fa');

    --------------------------------
    INSERT INTO hinh_anh (id, ma, ten, mau_sac, ngay_tao, nguoi_tao, id_san_pham_chi_tiet)
    VALUES ('e267c571-87af-11ee-9e05-25821f161216', 'HA0017',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/ea3a034a-351d-4d5e-9e39-6ebe24eebd23/air-jordan-1-mid-shoes-SQf7DM.png',
    'Xanh lá/ Trắng', '2023-01-01', 'Admin', 'eb67530e-8641-11ee-9533-f889d261a6fa');

    INSERT INTO hinh_anh (id, ma, ten, mau_sac, ngay_tao, nguoi_tao, id_san_pham_chi_tiet)
    VALUES ('2d6e3a84-87b2-11ee-9e05-25821f161216', 'HA0018',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b2a37016-a8c8-4700-9215-7814ef2a99a5/air-jordan-1-mid-shoes-SQf7DM.png',
    'Xanh lá/ Trắng', '2023-01-01', 'Admin', 'eb67530e-8641-11ee-9533-f889d261a6fa');

    INSERT INTO hinh_anh (id, ma, ten, mau_sac, ngay_tao, nguoi_tao, id_san_pham_chi_tiet)
    VALUES ('2d6e3a8e-87b2-11ee-9e05-25821f161216', 'HA0019',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/d35fd628-8d5f-441c-9151-fb39b053b2ed/air-jordan-1-mid-shoes-SQf7DM.png',
    'Xanh lá/ Trắng', '2023-01-01', 'Admin', 'eb67530e-8641-11ee-9533-f889d261a6fa');

    INSERT INTO hinh_anh (id, ma, ten, mau_sac, ngay_tao, nguoi_tao, id_san_pham_chi_tiet)
    VALUES ('2d6e3a90-87b2-11ee-9e05-25821f161216', 'HA0020',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/f3c594b4-5e8a-4327-87c4-4d55aa3aa69e/air-jordan-1-mid-shoes-SQf7DM.png',
    'Xanh lá/ Trắng', '2023-01-01', 'Admin', 'eb67530e-8641-11ee-9533-f889d261a6fa');

    INSERT INTO hinh_anh (id, ma, ten, mau_sac, ngay_tao, nguoi_tao, id_san_pham_chi_tiet)
    VALUES ('2d6e3a93-87b2-11ee-9e05-25821f161216', 'HA0021',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/3587121c-5ff8-45b0-90b2-2cef3cb78b61/air-jordan-1-mid-shoes-SQf7DM.png',
    'Xanh lá/ Trắng', '2023-01-01', 'Admin', 'eb67530e-8641-11ee-9533-f889d261a6fa');

    INSERT INTO hinh_anh (id, ma, ten, mau_sac, ngay_tao, nguoi_tao, id_san_pham_chi_tiet)
    VALUES ('2d6e3a95-87b2-11ee-9e05-25821f161216', 'HA0022',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/c2bd1f9d-2bfb-4f4d-9f92-23bc7eadc95e/air-jordan-1-mid-shoes-SQf7DM.png',
    'Xanh lá/ Trắng', '2023-01-01', 'Admin', 'eb67530e-8641-11ee-9533-f889d261a6fa');

    INSERT INTO hinh_anh (id, ma, ten, mau_sac, ngay_tao, nguoi_tao, id_san_pham_chi_tiet)
    VALUES ('2d6e3a97-87b2-11ee-9e05-25821f161216', 'HA0023',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/376a8a9e-7bcf-496a-bb03-1f8ae6148036/air-jordan-1-mid-shoes-SQf7DM.png',
    'Xanh lá/ Trắng', '2023-01-01', 'Admin', 'eb67530e-8641-11ee-9533-f889d261a6fa');

    INSERT INTO hinh_anh (id, ma, ten, mau_sac, ngay_tao, nguoi_tao, id_san_pham_chi_tiet)
    VALUES ('2d6e3a99-87b2-11ee-9e05-25821f161216', 'HA0024',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/5bd93a59-5883-4ebe-94fa-38a541acb25c/air-jordan-1-mid-shoes-SQf7DM.png',
    'Xanh lá/ Trắng', '2023-01-01', 'Admin', 'eb67530e-8641-11ee-9533-f889d261a6fa');

    ---------------------------------

    INSERT INTO hinh_anh (id, ma, ten, mau_sac, ngay_tao, nguoi_tao, id_san_pham_chi_tiet)
    VALUES ('ed632b64-87b2-11ee-9e05-25821f161216', 'HA0025',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/514cb17e-dd49-4785-bd59-4e9e7bb6a957/air-jordan-1-mid-shoes-SQf7DM.png',
    'Tím/ Trắng', '2023-01-01', 'Admin', 'f0d0f191-8641-11ee-9533-f889d261a6fa');

    INSERT INTO hinh_anh (id, ma, ten, mau_sac, ngay_tao, nguoi_tao, id_san_pham_chi_tiet)
    VALUES ('ed632b70-87b2-11ee-9e05-25821f161216', 'HA0026',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/2bea1128-0716-4322-9db8-a5079d43579e/air-jordan-1-mid-shoes-SQf7DM.png',
    'Tím/ Trắng', '2023-01-01', 'Admin', 'f0d0f191-8641-11ee-9533-f889d261a6fa');

    INSERT INTO hinh_anh (id, ma, ten, mau_sac, ngay_tao, nguoi_tao, id_san_pham_chi_tiet)
    VALUES ('ed632b73-87b2-11ee-9e05-25821f161216', 'HA0027',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/6b55c43f-4235-4c6f-8265-cf1f9db6c9a2/air-jordan-1-mid-shoes-SQf7DM.png',
    'Tím/ Trắng', '2023-01-01', 'Admin', 'f0d0f191-8641-11ee-9533-f889d261a6fa');

    INSERT INTO hinh_anh (id, ma, ten, mau_sac, ngay_tao, nguoi_tao, id_san_pham_chi_tiet)
    VALUES ('ed632b76-87b2-11ee-9e05-25821f161216', 'HA0028',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b37d4f24-567f-4c09-910a-98ed1d286e7d/air-jordan-1-mid-shoes-SQf7DM.png',
    'Tím/ Trắng', '2023-01-01', 'Admin', 'f0d0f191-8641-11ee-9533-f889d261a6fa');

    INSERT INTO hinh_anh (id, ma, ten, mau_sac, ngay_tao, nguoi_tao, id_san_pham_chi_tiet)
    VALUES ('ed632b78-87b2-11ee-9e05-25821f161216', 'HA0029',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/e2f0c6fe-7678-4205-9696-d77e518236a8/air-jordan-1-mid-shoes-SQf7DM.png',
    'Tím/ Trắng', '2023-01-01', 'Admin', 'f0d0f191-8641-11ee-9533-f889d261a6fa');

    INSERT INTO hinh_anh (id, ma, ten, mau_sac, ngay_tao, nguoi_tao, id_san_pham_chi_tiet)
    VALUES ('ed632b7a-87b2-11ee-9e05-25821f161216', 'HA0030',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/2c4971b8-fcaa-4f7d-a72e-df4fe9025bef/air-jordan-1-mid-shoes-SQf7DM.png',
    'Tím/ Trắng', '2023-01-01', 'Admin', 'f0d0f191-8641-11ee-9533-f889d261a6fa');

    INSERT INTO hinh_anh (id, ma, ten, mau_sac, ngay_tao, nguoi_tao, id_san_pham_chi_tiet)
    VALUES ('ed632b7c-87b2-11ee-9e05-25821f161216', 'HA0031',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/3d9f5252-7509-4f25-841c-ffdbd969c9f4/air-jordan-1-mid-shoes-SQf7DM.png',
    'Tím/ Trắng', '2023-01-01', 'Admin', 'f0d0f191-8641-11ee-9533-f889d261a6fa');

    INSERT INTO hinh_anh (id, ma, ten, mau_sac, ngay_tao, nguoi_tao, id_san_pham_chi_tiet)
    VALUES ('ed632b7f-87b2-11ee-9e05-25821f161216', 'HA0032',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/1920ff45-6c95-4aac-a93b-028a85fc2b7c/air-jordan-1-mid-shoes-SQf7DM.png',
    'Tím/ Trắng', '2023-01-01', 'Admin', 'f0d0f191-8641-11ee-9533-f889d261a6fa');

    ---------------------

    INSERT INTO hinh_anh (id, ma, ten, mau_sac, ngay_tao, nguoi_tao, id_san_pham_chi_tiet)
    VALUES ('63eefd44-87b4-11ee-9e05-25821f161216', 'HA0033',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/0d265602-b5fa-46c1-8eb6-b3e56c7f52b9/air-jordan-1-mid-shoes-SQf7DM.png',
    'Xanh dương/ Đen/ Trắng', '2023-01-01', 'Admin', 'f7b71662-8641-11ee-9533-f889d261a6fa');

    INSERT INTO hinh_anh (id, ma, ten, mau_sac, ngay_tao, nguoi_tao, id_san_pham_chi_tiet)
    VALUES ('63eefd4f-87b4-11ee-9e05-25821f161216', 'HA0034',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/3cfb5c31-18dd-404d-9bdc-c6ed57f05928/air-jordan-1-mid-shoes-SQf7DM.png',
    'Xanh dương/ Đen/ Trắng', '2023-01-01', 'Admin', 'f7b71662-8641-11ee-9533-f889d261a6fa');

    INSERT INTO hinh_anh (id, ma, ten, mau_sac, ngay_tao, nguoi_tao, id_san_pham_chi_tiet)
    VALUES ('63eefd51-87b4-11ee-9e05-25821f161216', 'HA0035',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/e25ed3aa-127b-4313-bbde-031235047abe/air-jordan-1-mid-shoes-SQf7DM.png',
    'Xanh dương/ Đen/ Trắng', '2023-01-01', 'Admin', 'f7b71662-8641-11ee-9533-f889d261a6fa');

    INSERT INTO hinh_anh (id, ma, ten, mau_sac, ngay_tao, nguoi_tao, id_san_pham_chi_tiet)
    VALUES ('63eefd53-87b4-11ee-9e05-25821f161216', 'HA0036',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/6dff9698-cc4a-4dc4-9fd8-b9a03c4ff0dc/air-jordan-1-mid-shoes-SQf7DM.png',
    'Xanh dương/ Đen/ Trắng', '2023-01-01', 'Admin', 'f7b71662-8641-11ee-9533-f889d261a6fa');

    INSERT INTO hinh_anh (id, ma, ten, mau_sac, ngay_tao, nguoi_tao, id_san_pham_chi_tiet)
    VALUES ('63eefd56-87b4-11ee-9e05-25821f161216', 'HA0037',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/28e7df40-2bf6-4a18-a8d2-1f8d00502a15/air-jordan-1-mid-shoes-SQf7DM.png',
    'Xanh dương/ Đen/ Trắng', '2023-01-01', 'Admin', 'f7b71662-8641-11ee-9533-f889d261a6fa');

    INSERT INTO hinh_anh (id, ma, ten, mau_sac, ngay_tao, nguoi_tao, id_san_pham_chi_tiet)
    VALUES ('63eefd58-87b4-11ee-9e05-25821f161216', 'HA0038',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/95df500e-94a8-4bb6-82fb-d6045de9a7db/air-jordan-1-mid-shoes-SQf7DM.png',
    'Xanh dương/ Đen/ Trắng', '2023-01-01', 'Admin', 'f7b71662-8641-11ee-9533-f889d261a6fa');

    INSERT INTO hinh_anh (id, ma, ten, mau_sac, ngay_tao, nguoi_tao, id_san_pham_chi_tiet)
    VALUES ('63eefd5a-87b4-11ee-9e05-25821f161216', 'HA0039',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/593722cd-34e5-4d76-848a-23d59735147f/air-jordan-1-mid-shoes-SQf7DM.png',
    'Xanh dương/ Đen/ Trắng', '2023-01-01', 'Admin', 'f7b71662-8641-11ee-9533-f889d261a6fa');

    INSERT INTO hinh_anh (id, ma, ten, mau_sac, ngay_tao, nguoi_tao, id_san_pham_chi_tiet)
    VALUES ('63eefd5c-87b4-11ee-9e05-25821f161216', 'HA0040',
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/338f5b0c-8cdf-464a-86c0-e09d659729ce/air-jordan-1-mid-shoes-SQf7DM.png',
    'Xanh dương/ Đen/ Trắng', '2023-01-01', 'Admin', 'f7b71662-8641-11ee-9533-f889d261a6fa');
