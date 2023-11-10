import { Button } from "@material-tailwind/react";
import { List, Tabs } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import Children from "./Chirldren";
import axios from "axios";
import { fakeData } from "../../db/datafake";
const columns = [
  { name: "STT", uid: "key" },
  { name: "THÔNG TIN SẢN PHẨM", uid: "thongtinsanpham" },
  { name: "SỐ LƯỢNG", uid: "soLuong" },
  { name: "TỔNG TIỀN", uid: "tongTien" },
  { name: "THAO TÁC", uid: "actions" },
];

// const defaultPanes = axios
//   .get("https://65484e06dd8ebcd4ab22b45f.mockapi.io/test/data")
//   .then((res) => {
//     return res.data.map((user, index) => {
//       return {
//         label: `Hóa Đơn ${user?.id}`,
//         children: (
//           <Children
//             columns={columns}
//             users={user?.data}
//             activeKey={user?.id}
//             updateSoLuong={updateSoLuong}
//           />
//         ),
//         key: user?.id,
//       };
//     });
//   });

const TabBanHang = () => {
  const [activeKey, setActiveKey] = useState(1);
  const [items, setItems] = useState([]);
  const getData = async () => {
    await axios
      .get("https://65484e06dd8ebcd4ab22b45f.mockapi.io/test/data")
      .then((res) => {
        const data = res.data.map((user, index) => {
          return {
            label: `Hóa Đơn ${user?.id}`,
            children: (
              <Children
                columns={columns}
                users={user?.data}
                activeKey={user?.id}
                updateSoLuong={updateSoLuong}
              />
            ),
            key: user?.id,
          };
        });

        setActiveKey(res.data[0].id);
        setItems(data);
        // console.log(items);

        localStorage.setItem("data", JSON.stringify(data));
        console.log(JSON.parse(localStorage.getItem("data")));
      });
  };

  useMemo(() => {
    getData();
  }, []);

  const onChange = (key) => {
    setActiveKey(key);
    localStorage.setItem("keyHD", key);
  };
  const add = () => {
    if (items.length < 5) {
      const newKey = Date.now();
      setItems([
        ...items,
        {
          label: `Hóa đơn ${newKey}`,
          children: (
            <Children
              columns={columns}
              users={[]}
              activeKey={newKey}
              updateSoLuong={updateSoLuong}
            />
          ),
          key: newKey,
        },
      ]);
      setActiveKey(newKey);
      localStorage.setItem("keyHD", newKey);
      localStorage.setItem("data", JSON.stringify(items));
    } else {
      alert("Hóa đơn tạo không vượt quá 5 hd");
    }
  };
  const remove = (targetKey) => {
    const targetIndex = items.findIndex((pane) => pane.key === targetKey);
    const newPanes = items.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && targetKey === activeKey) {
      const { key } =
        newPanes[
          targetIndex === newPanes.length ? targetIndex - 1 : targetIndex
        ];
      setActiveKey(key);
    }
    setItems(newPanes);
    localStorage.setItem("data", JSON.stringify(newPanes));
  };
  const onEdit = (targetKey, action) => {
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
  };

  const updateSoLuong = (key) => {
    const dataLocalStorage = JSON.parse(localStorage.getItem("data"));
    var keyActiveChoose = localStorage.getItem("keyHD");
    // console.log(keyActiveChoose);
    // console.log(keyActiveChoose);
    // console.log(dataLocalStorage);

    // const itemUpdate = dataLocalStorage.filter(
    //   (item) =>
    // );

    // console.log(itemUpdate);

    // console.log(itemUpdate);
    var list = dataLocalStorage.map((item) => {
      if (item.key === keyActiveChoose) {
        item.children.props.users,
          map((el) => {
            if (data[i].key === key) {
              data[i].soLuong -= 1;
            }
          });
      }
    });

    // for (let index = 0; index < list.length; index++) {
    //   if (list[index].key === keyActiveChoose) {
    //     var data = list[index].children.props.users;
    //     for (let i = 0; i < data.length; i++) {
    //       if (data[i].key === key) {
    //         data[i].soLuong -= 1;
    //       }
    //     }
    //   }
    // }
    // dataLocalStorage[index1].children.props.users[i1] = item;
    console.log(list);
    // console.log(dataLocalStorage);
    localStorage.setItem("data", JSON.stringify(dataLocalStorage));
  };

  const handleOnTabClick = (key, e) => {
    setActiveKey(key);
    localStorage.setItem("keyHD", key);
  };
  return (
    <>
      <div className="overflow-auto w-full bg-white p-3">
        <div
          className="flex justify-end ..."
          style={{
            marginBottom: 16,
          }}
        >
          <Button color="blue" style={{ width: 300 }} onClick={add}>
            Tạo hóa đơn
          </Button>
        </div>
        <Tabs
          hideAdd
          onChange={onChange}
          activeKey={activeKey}
          type="editable-card"
          onEdit={onEdit}
          items={items}
          size="large"
          onTabClick={handleOnTabClick}
        />
      </div>
    </>
  );
};
// list.then((result) => {
//   console.log(result);
//   defaultPanes = result.map((user, index) => {
//     return {
//       label: `Hóa Đơn ${user?.id}`,
//       children: (
//         <Children
//           columns={columns}
//           users={user?.data}
//           activeKey={user?.id}
//           // changeData={changeData}
//           // updateSoLuong={updateSoLuong}
//         />
//       ),
//       key: user?.id,
//     };
//   });
// });

// const result = fakeData();
// const TabBanHang = () => {
//   console.log(JSON.parse(result));
//   return (
//     <>
//       <p>Hello</p>
//     </>
//   );
// };

export default TabBanHang;
