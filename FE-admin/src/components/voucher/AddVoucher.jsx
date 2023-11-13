import React, { useState, useEffect } from "react";
import FilterDatePicker from "../../small-component/FilterKhuyenMai/FilterDate";
import { Button, Radio, Image, Modal } from "antd";
import TableAntd from "../../small-component/common/TableAntd";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AddVoucher() {
  const url = "http://localhost:8080/";

  const [value, setValue] = useState(1);
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
    console.log(value);
    console.log(listKhachHang.length);
    if (e.target.value === 2) {
      setListKhachHang([]);
    }
  };

  useEffect(() => {
    getDataKhachHang();
  }, []);

  const [listKhachHang, setListKhachHang] = useState([]);
  const [dataKhachHang, setDataKhachHang] = useState([]);
  const [voucherNew, setVoucherNew] = useState({
    code: "",
    ten: "",
    giaTriMax: "",
    giaTriMin: "",
    soLuong: "",
    ngayBatDau: "",
    ngayKetThuc: "",
    deleted: 0,
    trangThai: 0,
  });

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(selectedRows);
      setListKhachHang(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      ma: record.ma,
    }),
  };

  // const changeValue = (e) => {
  //   const name = e.target.name;
  //   console.log(name);
  //   console.log(e.target.value);
  //   // console.log({ ...voucherNew, name: e.target.value });
  //   // setVoucherNew({ ...voucherNew, name: e.target.value });
  // };

  // //add voucher for khachHang
  // const onHandleAddVoucherToCus = async () => {
  //   // await axios
  //   //   .post(url + "add-voucher-khachHang", listKhachHang)
  //   //   .then((response) => {});
  //   console.log(voucherNew);
  // };
  // add data
  const onHandleAdd = async () => {
    console.log(value, listKhachHang.length);
    if (value === 2 && listKhachHang.length == 0) {
      toast.error(`Bạn chưa chọn user để áp dung !!!`, {
        position: "top-right",
        autoClose: 2000,
      });
      // return;
    } else {
      // const listDataService =
      Modal.confirm({
        title: `bạn có muốn thêm voucher không ?`,
        okText: "Yes",
        okType: "danger",
        onOk: async () => {
          await axios
            .post(url + `voucher/add-voucher`, {
              voucher: voucherNew,
              listKhachHang: listKhachHang,
            })
            .then((response) => {
              toast.success(`Thêm thành công`, {
                position: "top-right",
                autoClose: 2000,
              });
              navigate("/giam-gia/voucher");
            })
            .catch((e) =>
              toast.error(`Thêm  thất bại`, {
                position: "top-right",
                autoClose: 2000,
              })
            );
        },
      });
    }
  };

  // get data user from service
  const getDataKhachHang = async () => {
    await axios
      .get(url + "khach-hang/getKhachHangs")
      .then((response) => {
        console.log(response.data);
        setDataKhachHang(
          response.data.map((data, index) => {
            return {
              ...data,
              key: index + 1,
            };
          })
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="grid grid-cols-10 gap-5">
        <div className="col-span-2">
          <form className="bg-slate-500 rounded">
            <h2 className="text-xl mb-10 font-bold text-gray-800">
              Thêm voucher
            </h2>
            <div className="grid gap-6 mb-6 md:grid-cols-1">
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Code voucher
                </label>
                <input
                  type="text"
                  name="code"
                  value={voucherNew.code}
                  onChange={(e) => {
                    setVoucherNew({ ...voucherNew, code: e.target.value });
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nhập code voucher"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Tên voucher
                </label>
                <input
                  type="text"
                  name="ten"
                  value={voucherNew.ten}
                  onChange={(e) => {
                    setVoucherNew({ ...voucherNew, ten: e.target.value });
                  }}
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
                  Giá trị tối thiểu
                </label>
                <input
                  type="text"
                  name="giaTriMin"
                  value={voucherNew.giaTriMin}
                  onChange={(e) => {
                    setVoucherNew({
                      ...voucherNew,
                      giaTriMin: e.target.value,
                    });
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nhập giá trị tối thiểu"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Giá trị tối đa
                </label>
                <input
                  type="text"
                  name="giaTriMax"
                  value={voucherNew.giaTriMax}
                  onChange={(e) => {
                    setVoucherNew({ ...voucherNew, giaTriMax: e.target.value });
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nhập giá trị tối đa"
                  required
                />
              </div>
              {value === 1 ? (
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Số lượng
                  </label>
                  <input
                    type="text"
                    name="soLuong"
                    value={voucherNew.soLuong}
                    disabled={check}
                    onChange={(e) => {
                      setVoucherNew({
                        ...voucherNew,
                        soLuong:
                          value == 1 && listKhachHang.length != 0
                            ? listKhachHang.length
                            : e.target.value,
                      });
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark-bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nhập số lượng"
                    required
                  />
                </div>
              ) : (
                ""
              )}

              <label
                htmlFor="phone"
                className="block -mb-4 mt-1 text-sm font-medium text-gray-900"
              >
                Ngày bắt đầu
              </label>
              <input
                type="datetime-local"
                name="ngayBatDau"
                // onChange={handleNgayBatDauChange}
                required
                onChange={(e) => {
                  setVoucherNew({ ...voucherNew, ngayBatDau: e.target.value });
                }}
                // min={minDate}
                value={voucherNew.ngayBatDau}
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
                // value={ngayKetThuc}
                type="datetime-local"
                name="ngayKetThuc"
                onChange={(e) => {
                  setVoucherNew({ ...voucherNew, ngayKetThuc: e.target.value });
                }}
                // min={minDate}
                value={voucherNew.ngayKetThuc}
                // onChange={handleNgayKetThucChange}
                required
                // min={selectedStartDate} // Set the minimum date based on selected start date
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
                type="submit"
                style={{
                  backgroundColor: "#1976d2",
                  marginBottom: "2px",
                }}
                onClick={() => onHandleAdd()}
              >
                Thêm
              </Button>
            </div>
          </form>
        </div>
        {/* <div className="col-span-1"></div> */}
        <div
          className=" col-span-7"
          // className="pl-5 border-l-[2px] col-span-6 "
          style={{
            borderColor: "#ccc",
            // height: "80%",
          }}
        >
          <div className="row mb-5">
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={1}>Tất cả hệ thống</Radio>
              <Radio value={2}>Chọn user</Radio>
            </Radio.Group>
          </div>
          {value === 2 ? (
            <>
              <h2
                className="text-xl mb-1 font-bold text-gray-800"
                style={{ backgroundColor: "#f1f1f1" }}
              >
                Danh sách khách hàng
              </h2>
              <div className="">
                <TableAntd
                  rowSelection={{
                    type: "checkbox",
                    ...rowSelection,
                  }}
                  columns={columns}
                  dataSource={dataKhachHang}
                  size={4}
                />
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

const columns = [
  {
    title: "Mã Khách Hàng",
    dataIndex: "ma",
    key: "ma",
    width: "20%",
  },
  {
    title: "Avatar",
    dataIndex: "anhNguoiDung",
    key: "anhNguoiDung",
    render: (text) => <Image width={70} height={100} src={text} />,
  },
  {
    title: "Tên Khách Hàng",
    dataIndex: "ten",
    key: "ten",
  },
  {
    title: "SDT",
    dataIndex: "sdt",
    key: "sdt",
  },
  {
    title: "Giới Tính",
    dataIndex: "gioiTinh",
    key: "gioiTinh",
  },
];
