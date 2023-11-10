import * as React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import { Button, Input, Option, Select } from "@material-tailwind/react";

import TabTrangThai from "../components/quanlyhoadon/TabTrangThai";

export default function QuanLyHoaDon() {
  // const url = "http://localhost:8080/hoa_don/";
  // const [data, setData] = React.useState([]);

  // const getData = async () => {
  //   const response = await axios.get(url + "getHoaDons").then((response) => {
  //     setData(
  //       response.data.map((item, index) => {
  //         return {
  //           ...item,
  //           id: index + 1,
  //           nhanVien: item.nhanVien.ma,
  //         };
  //       })
  //     );
  //   });
  //   // console.log(response.data);
  // };

  // React.useEffect(() => {
  //   getData();
  // }, []);
  return (
    <>
      <div class="container space-y-5 bg-white rounded-lg p-4 pt-5 mb-6">
        <div className="filter">
          <div className="header">
            <p className="text-2xl font-bold ">Bộ lọc</p>
            <hr />
          </div>
          <div className="body m-10">
            <form>
              <div class="flex ... gap-10 mb-10">
                <div class="w-1/6 ... font-medium text-s">Tìm kiếm</div>
                <div class="w-2/6 ...">
                  <Input label="Tìm kiếm ..." />
                </div>
                <div class="w-1/6 ... font-medium text-s">Loại </div>
                <div class="w-2/6 ...">
                  <Select variant="outlined" label="Loại đơn">
                    <Option>Tại quầy</Option>
                    <Option>Online</Option>
                  </Select>
                </div>
              </div>

              <div class="flex ... gap-10 mb-10">
                <div class="w-1/6 ... font-medium text-s">Ngày Bắt Đầu</div>
                <div class="w-2/6 ...">
                  <Input type="date" label="Ngày Bắt Đầu" />
                </div>
                <div class="w-1/6 ... font-medium text-s">Ngày Kết Thúc</div>
                <div class="w-2/6 ...">
                  <Input type="date" label="Ngày Kết Thúc" />
                </div>
              </div>

              <div class="flex justify-center ...  gap-10">
                <div>
                  <Button style={{ backgroundColor: "blue" }}>Tìm kiếm</Button>
                </div>
                <div>
                  <Button style={{ backgroundColor: "red" }} type="reset">
                    Làm Mới
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="container space-y-5 bg-white rounded-lg p-4 pt-5">
        <div class="grid grid-cols-6 gap-4">
          <div class="col-start-1 col-end-3 ...">
            <p className="text-2xl font-bold ">Danh sach hoa don</p>
          </div>
          <div class="col-end-7 col-span-2 grid ...">
            <Tooltip title="Tạo hóa đơn" color={"blue"}>
              <Button color="blue" style={{ width: 200 }} className="ms-8">
                <Link to={"/"}> + Tạo Đơn Hàng</Link>
              </Button>
            </Tooltip>
          </div>
        </div>

        <div>
          <TabTrangThai />
        </div>
      </div>
    </>
  );
}
