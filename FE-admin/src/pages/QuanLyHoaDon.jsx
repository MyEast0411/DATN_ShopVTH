import * as React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import { Button } from "@material-tailwind/react";

import TabTrangThai from "../components/quanlyhoadon/TabTrangThai";

export default function QuanLyHoaDon() {
  const url = "http://localhost:8080/hoa_don/";
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    async function fetchChiTietSanPham() {
      try {
        const response = await axios.get(url + "getHoaDons");
        console.log(response.data);
        setData(
          response.data.map((item, index) => {
            return {
              ...item,
              id: index + 1,
              nhanVien: item.nhanVien.ma,
            };
          })
        );
      } catch (error) {
        console.error("Lỗi khi gọi API: ", error);
      }
    }

    fetchChiTietSanPham();
  }, []);
  return (
    <div class="container space-y-5 bg-white rounded-lg p-4 pt-5">
      <div class="grid grid-cols-6 gap-4">
        <div class="col-start-1 col-end-3 ...">
          <p className="text-2xl font-bold ">Danh sach hoa don</p>
        </div>
        <div class="col-end-7 col-span-2 grid ...">
          <Tooltip title="Tạo hóa đơn" color={"blue"}>
            <Button color="blue" style={{ width: 200 }} className="ms-8">
              <Link to={"/"}> + Add Hoa Don</Link>
            </Button>
          </Tooltip>
        </div>
      </div>

      <div>
        <TabTrangThai />
      </div>
    </div>
  );
}
