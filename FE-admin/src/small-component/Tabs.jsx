import React, { useRef, useState } from "react";
import { Tabs } from "antd";
import GioHang from "../components/GioHang";
import { toast } from "react-toastify";

const { TabPane } = Tabs;

const TabsComponent = () => {
  const [activeKey, setActiveKey] = useState("1");
  const [panes, setPanes] = useState([
    { title: "Hóa đơn 1", content: <GioHang />, key: "1", closable: false },
    { title: "Hóa đơn 2", content: <GioHang />, key: "2" },
    { title: "Hóa đơn 3", content: <GioHang />, key: "3" },
  ]);
  const newTabIndex = useRef(3);

  const getNextAvailableTitle = () => {
    const usedTitles = panes.map((pane) => pane.title);
    for (let i = 1; i <= 5; i++) {
      const title = `Hóa đơn ${i}`;
      if (!usedTitles.includes(title)) {
        return title;
      }
    }
    return "Hóa đơn 5"; // If all titles are used, use the maximum allowed title
  };

  const onChange = (key) => {
    setActiveKey(key);
  };

  const addTab = () => {
    if (panes.length >= 5) {
      toast.warning(`Chỉ được tạo tối đa 5 hóa đơn!`, {
        position: "top-right",
        autoClose: 2000,
      });
      return; // Maximum of 5 tabs
    }

    const newKey = `newTab${newTabIndex.current++}`;
    const newPanes = [...panes];
    const nextAvailableTitle = getNextAvailableTitle();
    newPanes.push({
      title: nextAvailableTitle,
      content: <GioHang />,
      key: newKey,
    });
    setPanes(newPanes);
    setActiveKey(newKey);
  };

  const removeTab = (targetKey) => {
    let newActiveKey = activeKey;
    let lastIndex;
    panes.forEach((pane, index) => {
      if (pane.key === targetKey) {
        lastIndex = index - 1;
      }
    });
    const newPanes = panes.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setPanes(newPanes);
    setActiveKey(newActiveKey);
  };

  const onEdit = (targetKey, action) => {
    if (action === "add") {
      addTab();
    } else if (action === "remove") {
      removeTab(targetKey);
    }
  };

  return (
    <Tabs
      type="editable-card"
      onChange={onChange}
      activeKey={activeKey}
      onEdit={onEdit}
    >
      {panes.map((pane) => (
        <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
          {pane.content}
        </TabPane>
      ))}
    </Tabs>
  );
};

export default TabsComponent;