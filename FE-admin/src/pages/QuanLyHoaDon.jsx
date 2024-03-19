import axios from "axios";
import { Link } from "react-router-dom";
import { Tooltip, Select } from "antd";
import { HiOutlineClipboardList } from "react-icons/hi";
import { AiOutlineFilter } from "react-icons/ai";
import { Button, DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;
import { Input } from "@material-tailwind/react";
import moment from "moment";
import { SearchIcon } from "../components/voucher/common/SearchIcon";
// import TabTrangThai from "../components/thu_chi/TabTrangThai";
import { useEffect, useState } from "react";
import TableCommon from "../components/thu_chi/TableCommon";
import { Tabs } from "antd";

export default function QuanLyHoaDon() {
  const url = "http://localhost:8080/hoa_don/";

  const [list, setList] = useState([]);
  const [size, setSize] = useState("large");
  const [key1, setKey] = useState(-1);

  const [dataInput, setFilterValue] = useState("");
  const [dataSelect, setDataSelect] = useState(-1);
  const [ngayBatDau, setNgayBatDau] = useState("");
  const [ngayKetThuc, setNgayKetThuc] = useState("");
  const onChangeDatePicker = (value, dateString) => {
    console.log("Data: " + dateString);
    // console.log("Ngay bat dau: " + typeof dateString[0]);
    if (dateString[0] !== "" || dateString[1] !== "") {
      let nbd = moment(dateString[0], "DD-MM-YYYY HH:mm").valueOf();
      let nkt = moment(dateString[1], "DD-MM-YYYY HH:mm").valueOf();
      console.log(nbd);
      console.log(nkt);
      setNgayBatDau(nbd);
      setNgayKetThuc(nkt);
    } else {
      setNgayBatDau("");
      setNgayKetThuc("");
    }
  };

  const handleChange = (value) => {
    setDataSelect(value);
  };

  const reset = () => {
    setFilterValue("");
    setDataSelect(-1);
    setNgayBatDau("");
    setNgayKetThuc("");
  };

  const changeValueInput = (value) => {
    if (value.trim() == "") setFilterValue("");
    else setFilterValue(value);
  };
  useEffect(() => {
    getData(key1);
  }, [key1, list]);

  const filterOptions = (data) => {
    return data
      .filter((hd) => {
        if (dataInput === "") return hd;
        if (
          hd.ma.toLowerCase().includes(dataInput.trim().toLowerCase()) ||
          hd.tenKhachHang
            ?.toLowerCase()
            .includes(dataInput.trim().toLowerCase()) ||
          hd.id_nhan_vien?.ten
            .toLowerCase()
            .includes(dataInput.trim().toLowerCase())
        )
          return hd;
      })
      .filter((hd) => {
        if (dataSelect === -1) return hd;
        if (hd.loaiHd === dataSelect) return hd;
      })
      .filter((hd) => {
        var ndata = Date.parse(new Date(hd.ngayTao));
        if (ngayBatDau === "" || ngayKetThuc === "") return hd;
        if (ngayBatDau <= ndata && ngayKetThuc >= ndata) return hd;
      });
  };

  const getData = async (key) => {
    const res = await axios.get(url + `getHoaDons/${key}`);
    const data = await res.data;
    console.log(
      data.sort(function soSanhNgayTao(a, b) {
        return b.ngayTao - a.ngayTao;
      })
    );

    setList(
      filterOptions(data)
        .sort(function soSanhNgayTao(a, b) {
          return b.ngayTao - a.ngayTao;
        })
        .map((item, index) => {
          return {
            ...item,
            stt: index + 1,
            ids: item.id,
            nhanVien: item?.id_nhan_vien?.ten,
          };
        })
    );
  };

  const onChange = async (key) => {
    setKey(key);
    getData(key);
  };
  const items = [
    `Chờ xác nhận`,
    `Xác Nhận`,
    `Chờ Vận Chuyển`,
    `Giao Hàng`,
    `Hoàn Thành`,
    `Hủy`,
  ];
  var data = [];
  for (let index = 0; index < items.length; index++) {
    var item = {
      key: index,
      label: items[index],
      // children: <TableCommon dataSource={list} />,
      children: (
        <TableCommon
          data={list}
          // dataInput={dataInput}
        />
      ),
    };

    data.push(item);
  }
  data.unshift({
    key: -1,
    label: `Tất cả`,
    // children: <TableCommon dataSource={list} />,
    children: (
      <TableCommon
        data={list}
        // dataInput={dataInput}
      />
    ),
  });
  return (
    <>
      <div>
        <div className="bg-white rounded-lg">
          <h2 className="mb-5 font-bold text-2xl">Quản Lý Thu Chi</h2>
          <div className="mb-2 border-b-[1px] font-normal relative border-gray-500 text-lg flex items-center">
            <AiOutlineFilter />
            <p className="ml-2 mt-1"> Bộ lọc</p>
          </div>
          <div
            className="font-normal border-gray-500 text-lg mb-5 gap-4"
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
            <div
              className="flex gap-4 m-10"
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-900"
                style={{
                  display: "inline-block",
                  justifyContent: "center",
                }}
              >
                Tìm kiếm
              </label>
              <div className="w-2/6 ">
                <Input
                  isClearable
                  className="w-full "
                  placeholder="Tìm kiếm bất kỳ..."
                  startContent={<SearchIcon />}
                  value={dataInput}
                  onChange={(e) => changeValueInput(e.target.value)}
                />
              </div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-900"
                style={{
                  display: "inline-block",
                }}
              >
                Loại
              </label>
              <div className="w-2/6">
                <Select
                  defaultValue="--Chọn loại HD--"
                  style={{ width: "100%" }}
                  onChange={handleChange}
                  // allowClear
                  options={options}
                />
              </div>
            </div>

            <div
              className="flex gap-4 m-10"
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <label
                className="block text-sm font-medium text-gray-900"
                style={{
                  display: "inline-block",
                }}
              >
                Tìm kiếm theo ngày
              </label>
              <RangePicker
                showTime={{ format: "HH:mm" }}
                format="DD-MM-YYYY HH:mm"
                style={{ height: "40px", width: "30%" }}
                onChange={onChangeDatePicker}
              />
            </div>

            <div className="flex justify-center mx-auto gap-10">
              <div>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#1976d2",
                    marginBottom: "2px",
                  }}
                  onClick={reset}
                >
                  Làm Mới
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="mb-2 border-b-[1px] font-normal relative border-gray-500 text-lg flex  items-center">
            <HiOutlineClipboardList />
            <p className="ml-2 mt-1"> Danh sách hóa đơn</p>
            <Link to={"/"} className="absolute right-0 mb-1">
              <Button
                type="primary"
                style={{
                  backgroundColor: "#1976d2",
                  marginBottom: "2px",
                }}
              >
                + Tạo đơn hàng
              </Button>
            </Link>
          </div>
          <div
            className="font-normal border-gray-500 text-lg"
            style={{
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "8px",
              width: "100%",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.2s",
            }}
          >
            <Tabs
              size="medium"
              defaultActiveKey="-1"
              items={data}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}

const options = [
  { value: -1, label: "Tất cả" },
  { value: 0, label: "Online" },
  { value: 1, label: "Tại quầy" },
];
