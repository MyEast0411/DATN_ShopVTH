import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Image,
  getKeyValue,
  Spinner,
} from "@nextui-org/react";

import { Chart as ChartJS } from "chart.js/auto";
import axios from "axios";
// export
const UserDataWeek = [
  {
    id: 1,
    year: " 2",
    userGain: 80000000,
    userLost: 823,
  },
  {
    id: 2,
    year: "3",
    userGain: 45677000,
    userLost: 345,
  },
  {
    id: 3,
    year: " 4",
    userGain: 78888000,
    userLost: 555,
  },
  {
    id: 4,
    year: "5",
    userGain: 90000000,
    userLost: 4555,
  },
  {
    id: 5,
    year: " 6",
    userGain: 4300000,
    userLost: 234,
  },
  {
    id: 6,
    year: " 7",
    userGain: 4300000,
    userLost: 234,
  },
  {
    id: 7,
    year: "CN",
    userGain: 4300000,
    userLost: 234,
  },
];

const UserDataMonth = [
  {
    id: 1,
    year: "1",
    userGain: 80000000,
    userLost: 823,
  },
  {
    id: 2,
    year: "2",
    userGain: 45677000,
    userLost: 345,
  },
  {
    id: 3,
    year: "3",
    userGain: 78888000,
    userLost: 555,
  },
  {
    id: 4,
    year: "4",
    userGain: 90000000,
    userLost: 4555,
  },
];
const UserDataYear = [
  {
    id: 1,
    year: "1",
    userGain: 80000000,
    userLost: 823,
  },
  {
    id: 2,
    year: "2",
    userGain: 45677000,
    userLost: 345,
  },
  {
    id: 3,
    year: "3",
    userGain: 78888000,
    userLost: 555,
  },
  {
    id: 4,
    year: "4",
    userGain: 90000000,
    userLost: 4555,
  },
  {
    id: 5,
    year: "5",
    userGain: 4300000,
    userLost: 234,
  },
  {
    id: 6,
    year: "6",
    userGain: 4300000,
    userLost: 234,
  },
  {
    id: 7,
    year: "7",
    userGain: 4300000,
    userLost: 234,
  },
  {
    id: 8,
    year: "8",
    userGain: 80000000,
    userLost: 823,
  },
  {
    id: 9,
    year: "9",
    userGain: 45677000,
    userLost: 345,
  },
  {
    id: 10,
    year: "10",
    userGain: 78888000,
    userLost: 555,
  },
  {
    id: 11,
    year: "11",
    userGain: 90000000,
    userLost: 4555,
  },
  {
    id: 12,
    year: "12",
    userGain: 4300000,
    userLost: 234,
  },
];
const colors = [
  "#ec3237",
  "#f05737",
  "#f58634",
  "#fbb030",
  "#FFF112",
  "#8CC76B",
  "#00A85A",
  "#5BC6D0",
  "#354C9C",
  "#6966AB",
  "#6E59A4",
  "#8959A3",
];
export function ColumnChart({ value }) {
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    await axios
      .get(`http://localhost:8080/thong-ke/column/${value}`)
      .then((response) => {
        setIsLoading(false);
        setUserData({
          labels: response.data.map((data) => data.name),
          datasets: [
            {
              label: ` Đơn vị  tính (1.000₫) : `,
              data: response.data.map((data) => data.soTien),
              backgroundColor: colors,
              borderColor: "black",
              borderWidth: 2,
              borderRadius: 5,
            },
          ],
        });
      });
  };
  useEffect(() => {
    getData();
  }, [value]);

  return (
    <div style={{ width: 600, height: 271, marginLeft: 60 }}>
      {isLoading ? (
        <div style={{ marginLeft: "25%", marginTop: "25%" }}>
          <Spinner
            size="sm"
            label="Đang tải dữ liệu chờ tý 👌👌👌"
            color="warning"
          />
        </div>
      ) : (
        <Bar data={userData} />
      )}
    </div>
  );
}

export function TableTheoOption({ value }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTop5SP = async () => {
    await axios
      .get(`http://localhost:8080/thong-ke/table/${value}`)
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
        setData(
          res.data.map((item, i) => {
            return {
              id: item.id + 1,
              name: item.sanPhamChiTiet.ten,
              price: item.sanPhamChiTiet.giaBan,
              avatar: item.sanPhamChiTiet.defaultImg,
              quantitySaled: item.soLuong,
            };
          })
        );
      });
  };

  useEffect(() => {
    getTop5SP();
  }, [value]);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return <span className="text-black-700 font-bold">{cellValue}</span>;
      case "price":
        return (
          <p className="text-red-700 font-bold">
            {" "}
            {Intl.NumberFormat().format(cellValue)} ₫{" "}
          </p>
        );
      case "avatar":
        return <Image width={70} alt="NextUI hero Image" src={cellValue} />;
      case "quantitySaled":
        return (
          <span className="text-black-700 font-bold">{cellValue} sản phẩm</span>
        );

      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="content flex items-center">
      {isLoading ? (
        <div style={{ marginLeft: "25%", marginTop: "25%" }}>
          <Spinner
            size="sm"
            label="Đang tải dữ liệu chờ tý 👌👌👌"
            color="warning"
          />
        </div>
      ) : (
        <Table
          aria-label="Example table with client side pagination"
          style={{ height: "100%" }}
          classNames={{
            wrapper: "max-h-[100%] p-0",
          }}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid}>{column.name}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={data}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

const columns = [
  { uid: "id", name: "STT" },
  { uid: "avatar", name: "Hình Ảnh" },
  { uid: "name", name: "Tên Sản Phẩm" },
  { uid: "price", name: "Giá" },
  { uid: "quantitySaled", name: "Số Lượng" },
];

const usersWeek = [
  {
    id: 1,
    name: "Zion 3 PF",
    price: 4109000,
    avatar:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/20555278-bf89-4ebe-997b-15808e0fff97/air-jordan-1-mid-shoes-86f1ZW.png",
    quantitySaled: 210,
  },
  {
    id: 2,
    name: "Air Jordan 1 Low",
    price: 3239000,
    avatar:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/f49d18ba-7c39-419d-a424-ef8a1b798375/air-jordan-1-mid-shoes-86f1ZW.png",
    quantitySaled: 200,
  },
  {
    id: 3,
    name: "Air Jordan 1 Elevate Low",
    price: 3829000,
    avatar:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/964cfa9e-5ce9-4c66-b11c-e70b7fbb8890/air-jordan-1-elevate-low-shoes-XlkVrM.png",
    quantitySaled: 100,
  },
  {
    id: 4,
    name: "Jordan One Take 4 PF",
    price: 2929000,
    avatar:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/54ff2b77-3635-4c89-99f5-963722644364/jordan-one-take-4-pf-shoes-v5trdl.png",
    quantitySaled: 50,
  },
  {
    id: 5,
    name: "Jordan Max Aura 5",
    price: 3829000,
    avatar:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/bd294664-d21a-4b39-86a9-0ee269e51513/jordan-max-aura-5-shoes-ZBZ4Pz.png",
    quantitySaled: 8,
  },
];

const usersMonth = [
  {
    id: 1,
    name: "Zion 3 PF",
    price: 4109000,
    avatar:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/25221a87-fb7e-496b-b44b-cf3425027cb6/jordan-adg-4-golf-shoes-VrRj2T.png",
    quantitySaled: 1000,
  },
  {
    id: 2,
    name: "Air Jordan 1 Low",
    price: 3239000,
    avatar:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/a1fe08cd-1fc4-441e-8a3f-76aebe6fe52b/air-jordan-1-low-shoes-6Q1tFM.png",
    quantitySaled: 700,
  },
  {
    id: 3,
    name: "Air Jordan 1 Elevate Low",
    price: 3829000,
    avatar:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/117890a6-97f0-457b-9550-80baf31ea1ea/jumpman-mvp-shoes-JV1HCs.png",
    quantitySaled: 500,
  },
  {
    id: 4,
    name: "Jordan One Take 4 PF",
    price: 2929000,
    avatar:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/54ff2b77-3635-4c89-99f5-963722644364/jordan-one-take-4-pf-shoes-v5trdl.png",
    quantitySaled: 400,
  },
  {
    id: 5,
    name: "Jordan Max Aura 5",
    price: 3829000,
    avatar:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/bd294664-d21a-4b39-86a9-0ee269e51513/jordan-max-aura-5-shoes-ZBZ4Pz.png",
    quantitySaled: 300,
  },
];

const usersYear = [
  {
    id: 1,
    name: "Zion 3 PF",
    price: 4109000,
    avatar:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/a054388f-5728-4060-abf3-d214bbded783/zion-3-pf-basketball-shoes-vTjpz4.png",
    quantitySaled: 2000,
  },
  {
    id: 2,
    name: "Air Jordan 1 Low",
    price: 3239000,
    avatar:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/a1fe08cd-1fc4-441e-8a3f-76aebe6fe52b/air-jordan-1-low-shoes-6Q1tFM.png",
    quantitySaled: 1500,
  },
  {
    id: 3,
    name: "Air Jordan 2 Panda Low",
    price: 3829000,
    avatar:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/964cfa9e-5ce9-4c66-b11c-e70b7fbb8890/air-jordan-1-elevate-low-shoes-XlkVrM.png",
    quantitySaled: 1000,
  },
  {
    id: 4,
    name: "Jordan Second Take 6 PF",
    price: 2929000,
    avatar:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/a3b4325c-934c-4ab4-af1b-57b07936337f/jordan-max-aura-5-shoes-ZBZ4Pz.png",
    quantitySaled: 500,
  },
  {
    id: 5,
    name: "Jordan Max Aura 5",
    price: 3829000,
    avatar:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/7264acc6-6a46-4391-9d80-f90c6ef19404/jordan-max-aura-5-shoes-ZBZ4Pz.png",
    quantitySaled: 450,
  },
];
const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};
