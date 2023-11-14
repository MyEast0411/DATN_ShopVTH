import { Button } from "@material-tailwind/react";
import { List, Tabs } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import Children from "./Chirldren";
import axios from "axios";
import { toast } from "react-toastify";
import { data } from "browserslist";

const columns = [
  { name: "STT", uid: "key" },
  { name: "THÔNG TIN SẢN PHẨM", uid: "thongtinsanpham" },
  { name: "SỐ LƯỢNG", uid: "soLuong" },
  { name: "TỔNG TIỀN", uid: "tongTien" },
  { name: "THAO TÁC", uid: "actions" },
];
const TabBanHang = () => {
  const [activeKey, setActiveKey] = useState("HD1");
  const [items, setItems] = useState([]);
  
  const getData = async () => {
      await axios
      .get(`http://localhost:8080/hoa_don_chi_tiet/getHDCT/${activeKey}`)
      .then((res) => {
        const data = res.data.map((user, index) => {
          console.log(user);

          return {
            label: `${user?.id}`,
            children: (
              <Children
                columns={columns}
                users={user?.list}
                activeKey={user?.id}
                updateSoLuong={updateSoLuong}
              />
            ),
            key: user?.id,
          };
        });

        setActiveKey(res.data[0].id);
        setItems(data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  
  const [invoiceCount, setInvoiceCount] = useState(1);

  const addEmptyInvoice = () => {
    setItems((prevItems) => [
      ...prevItems,
      {
        label: `HD${items.length + 1}`,
        children: (
          <Children
            columns={columns}
            users={[]}
            activeKey={items.length + 1}
            updateSoLuong={updateSoLuong}
          />
        ),
        key: items.length + 1,
      },
    ]);
    setActiveKey(items.length + 1);
    setInvoiceCount((prevCount) => prevCount + 1);
  };
  const updateSoLuong = (key) => {
    
  };
  const onChange = (key) => {
    setActiveKey(key);
  };

  const add = () => {
    if (items.length < 5) {
      addEmptyInvoice();
    } else {
      toast.warning(`Không thể tạo nhiều hơn 5 hóa đơn`);
    }
  };

  const remove = (targetKey) => {
    const newPanes = items.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && targetKey === activeKey) {
      setActiveKey(newPanes[newPanes.length - 1].key);
    }
    setItems(newPanes);
  };

  const onEdit = (targetKey, action) => {
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
  };

  const handleOnTabClick = (key, e) => {
    setActiveKey(key);
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

export default TabBanHang;
