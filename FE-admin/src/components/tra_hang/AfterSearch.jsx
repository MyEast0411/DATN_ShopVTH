import React, { useEffect, useState } from "react";
import { Button, InputNumber, Space, Switch, Table, Tag, Input } from "antd";
import { IoIosAddCircleOutline } from "react-icons/io";
import { HiOutlineMinusCircle } from "react-icons/hi";

const { TextArea } = Input;

function AfterSearch({ hdDoiTra }) {
  const [checkStrictly, setCheckStrictly] = useState(false);
  const [value, setValue] = useState("");
  const [hdChosed, setHdChosed] = useState([]);
  const [selectionType, setSelectionType] = useState("checkbox");
  const [HDTra, setHDTra] = useState([]);
  // const rowSelection = {
  //   onChange: (selectedRowKeys, selectedRows) => {
  //     console.log(
  //       `selectedRowKeys: ${selectedRowKeys}`,
  //       "selectedRows: ",
  //       selectedRows
  //     );
  //   },
  //   onSelect: (record, selected, selectedRows) => {
  //     console.log(record, selected, selectedRows);
  //   },
  //   onSelectAll: (selected, selectedRows, changeRows) => {
  //     console.log(selected, selectedRows, changeRows);
  //   },
  // };

  // const onChange = (e) => {
  //   console.log("Change:", e.target.value);
  // };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.id_chi_tiet_san_pham.ma === "Disabled User",
      // Column configuration not to be checked
      ma: record.ma,
    }),
  };

  const getHDDoiTra = () => {
    setHdChosed(hdDoiTra);
  };

  useEffect(() => {
    getHDDoiTra();
  }, [hdDoiTra]);

  const columns = [
    {
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: "Sản phẩm",
      dataIndex: "sanPham",
      key: "sanPham",
      render: (_, record) => (
        <div style={{ borderBottom: 2 }}>
          {/* <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"> */}
          <div>
            {/* <div style={{ position: "relative" }}> */}

            {/* <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 16,
                  left: -10,
                  zIndex: 1,
                }}
              >
                <DiscountTag
                          discount={
                            kmspcts.find(
                              (x) => x.id_chi_tiet_san_pham.id == item.id
                            )?.id_khuyen_mai.giaTriPhanTram
                          }
                        />
              </div> */}
            {/* </div> */}

            <div className="flex items-center w-full space-x-4">
              <img
                src={record.id_chi_tiet_san_pham.defaultImg}
                alt="product-image"
                style={{ width: "70px" }}
                // className="w-full rounded-lg sm:w-40 me-10 object-contain"
              />
              <div>
                <div className=" sm:mt-0">
                  <p className=" font-medium text-gray-900 mb-3">
                    {record.id_chi_tiet_san_pham.ten} "
                    {record.id_chi_tiet_san_pham.id_mau_sac.ten}" [
                    {record.id_chi_tiet_san_pham.id_kich_co.ten}]
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Số Lượng",
      dataIndex: "soLuong",
      key: "soLuong",
      render: (_, record) => (
        <div style={{ borderBottom: 2 }}>
          <Space size="middle">
            <Button style={{ backgroundColor: "#c0b1b1", borderRadius: "50%" }}>
              <HiOutlineMinusCircle style={{ color: "white" }} />
            </Button>
            <InputNumber
              style={{
                width: 70,
                textAlign: "center",
                justifyContent: "center",
              }}
            />
            /{record.soLuong}
            <Button style={{ backgroundColor: "#c0b1b1", borderRadius: "50%" }}>
              <IoIosAddCircleOutline style={{ color: "white" }} />
            </Button>
          </Space>
        </div>
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "giaTien",
      key: "giaTien",
      render: (_, record) => (
        <div style={{ borderBottom: 2 }}>
          <Space size="middle">
            <span>{Intl.NumberFormat().format(record.giaTien)} VND</span>
          </Space>
        </div>
      ),
    },
  ];

  const columns1 = [
    {
      title: "Sản phẩm",
      dataIndex: "sanPham",
      key: "sanPham",
    },
    {
      title: "Số Lượng",
      dataIndex: "soLuong",
      key: "soLuong",
    },

    {
      title: "Đơn giá",
      dataIndex: "giaTien",
      key: "giaTien",
    },
    {
      title: "Tổng",
      dataIndex: "tong",
      key: "tong",
    },
    {
      title: "Ghi chú",
      dataIndex: "ghiChu",
      key: "ghiChu",
      render: (_, record) => (
        <div style={{ borderBottom: 2 }}>
          <Space size="middle">
            <TextArea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Controlled autosize"
              autoSize={{
                minRows: 3,
                maxRows: 5,
              }}
            />
          </Space>
        </div>
      ),
    },
  ];
  return (
    <>
      <div
        className="font-normal border-gray-500 text-lg mb-5 gap-4 mt-4"
        style={{
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "8px",
          width: "100%",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
          transition: "transform 0.2s",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p> Sản phẩm cần trả </p>

        <Table
          columns={columns}
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          dataSource={hdChosed}
          pagination={false}
        />
      </div>

      <div
        className="font-normal border-gray-500 text-lg mb-5 gap-4 mt-4
        
      "
      >
        <div className="flex space-x-4  ">
          <div
            className="w-2/3 ..."
            style={{
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "8px",
              //width: "100%",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.2s",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p>Danh sách sản phẩm </p>
            <Table columns={columns1} dataSource={HDTra} pagination={false} />
          </div>
          <div
            className="w-1/3 ..."
            style={{
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "8px",
              //width: "100%",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.2s",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p className="text-center mb-4">Thông tin trả hàng</p>

            <div
              className="infor mb-4"
              style={{
                backgroundColor: "#c0b1b1",
                borderRadius: 10,
                padding: 10,
              }}
            >
              <p>
                <span className="font-medium">Khách hàng</span> : HOàng Thị KIm
                Ngân
              </p>
              <p>
                <span className="font-medium">Người Nhận</span> : A Chàng Đẹp
                TRoai
              </p>
              <p>
                <span className="font-medium">Địa chỉ</span>: ab1 , xã Xuy Xá ,
                Phường Minh KHai , Thanhf Phố HN
              </p>
            </div>
            <div className="tongGia mb-4">
              <p>
                <span className="font-medium">Tổng tiền</span> : 10000000
              </p>
              <p>
                <span className="font-medium">Giảm giá</span> : 10000000
              </p>
              <p>
                <span className="font-medium">Số tiền hoàn trả</span>: 10000000
              </p>
            </div>
            <div>
              <Button
                style={{
                  width: "100%",
                  backgroundColor: "black",
                  color: "white",
                  height: "50px",
                }}
              >
                TRẢ HÀNG
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AfterSearch;

const data = [
  {
    key: "1",
    name: "John Brown",
    soLuong: 32,
    donGia: "10000",
  },
  {
    key: "2",
    name: "Jim Green",
    soLuong: 42,
    donGia: "10000",
  },
  {
    key: "3",
    name: "Joe Black",
    soLuong: 32,
    donGia: "10000",
  },
];

// rowSelection objects indicates the need for row selection
