import { Button } from "@material-tailwind/react";
import { Tabs } from "antd";
import Badge from "@mui/material/Badge";
import { useEffect, useState } from "react";
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
  const [activeKey, setActiveKey] = useState("💖💖");
  const [selectData, setSelectData] = useState(null);
  const [soLuongSP, setSoLuongSP] = useState(0);
  const handleDataSelect = async (data) => {
    setSelectData(data);
    await axios
      .get(`http://localhost:8080/hoa_don_chi_tiet/getHDCT/${data}`)
      .then((res) => {
        console.log(res.data);
        const data = res.data.map((user, index) => {
          console.log(user.soLuong);
          return {
            label: `${user?.id}`,
            soLuong : `${user?.soLuong}`,
            children: (
              <Children
                columns={columns}
                users={user?.list}
                activeKey={user?.id}
                updateSoLuong={updateSoLuong}
                onDataSelected={handleDataSelect}
                setSoLuongSP={setSoLuongSP}
              />
            ),
            key: user?.id,
          };
        });

        setActiveKey(res.data[0].id);
        setItems((prevItems) => [...prevItems, ...data]);
        toast(`Chọn hóa đơn thành công`);
      });
  };

  const [items, setItems] = useState([
    {
      label: `Hóa đơn 1`,
      soLuong : `0`,
      children: (
        <Children
          columns={columns}
          users={[]}
          activeKey={`💖💖`}
          onDataSelect={handleDataSelect}
          setSoLuongSP={setSoLuongSP}
        />
      ),
      key: `💖💖`,
    },
  ]);

  const getData = async () => {
    await axios
      .get(`http://localhost:8080/hoa_don_chi_tiet/getHDCT/${activeKey}`)
      .then((res) => {
        console.log(res.data);
        setItems((prevItems) => [
          ...prevItems,
          {
            label: res.data[0].id,
            soLuong : res.data[0]?.soLuong,
            children: (
              <Children
                columns={columns}
                users={res.data[0]?.list}
                activeKey={res.data[0].id}
                updateSoLuong={updateSoLuong}
                // onDataSelected={handleDataSelected}
              />
            ),
            key: res.data[0].id,
          },
        ]);

        setActiveKey(res.data[0].id);
        setItems(data);
      });
  };

  useEffect(() => {
    // getData();
  }, []);

  const [invoiceCount, setInvoiceCount] = useState(1);

  const addEmptyInvoice = async () => {
    const result = await axios
      .post("http://localhost:8080/hoa_don/taoHoaDon")
      .then((res) => {
        console.log(res.data);
        setItems((prevItems) => [
          ...prevItems,
          {
            label: res.data.ma,
            soLuong : `0`,
            children: (
              <Children
                columns={columns}
                users={[]}
                activeKey={res.data.ma}
                updateSoLuong={updateSoLuong}
                setSoLuongSP={setSoLuongSP}
                // onDataSelected={handleDataSelected}
              />
            ),
            key: res.data.ma,
          },
        ]);
        setActiveKey(res.data.ma);
        setInvoiceCount((prevCount) => prevCount + 1);
        toast("Tạo hóa đơn thành công");
      });
  };
  const updateSoLuong = (key) => {};
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
            zIndex: 1,
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
          size="large"
          onTabClick={handleOnTabClick}
        >
          {items.map((pane) => (
            <Tabs.TabPane
              key={pane.key}
              tab={
                <div style={{ position: "relative" }}>
                  <span>{pane.label}</span>
                  <Badge
                    badgeContent={pane.soLuong}
                    color="primary"
                    max={5}
                    style={{
                      position: "absolute",
                      top: "2px",
                      right: "-30px",
                      marginLeft: "100px",
                    }}
                  />
                </div>
              }
            >
              {pane.children}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
    </>
  );
};

export default TabBanHang;
