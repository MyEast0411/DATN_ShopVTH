import React, { useState } from "react";
import { Space, Switch, Table } from "antd";
function AfterSearch({ id }) {
  const [checkStrictly, setCheckStrictly] = useState(false);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };
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
        <p> Sản phẩm cần trả</p>
        <Space
          align="center"
          style={{
            marginBottom: 16,
          }}
        >
          CheckStrictly:{" "}
          <Switch checked={checkStrictly} onChange={setCheckStrictly} />
        </Space>
        <Table
          columns={columns}
          rowSelection={{
            ...rowSelection,
            checkStrictly,
          }}
          dataSource={data}
        />
      </div>

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
        <div class="flex ">
          <div class="w-2/3 ...">w-2/3</div>
          <div class="w-1/3 ...">w-1/3</div>
        </div>
      </div>
    </>
  );
}

export default AfterSearch;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    width: "12%",
  },
  {
    title: "Address",
    dataIndex: "address",
    width: "30%",
    key: "address",
  },
];
const data = [
  {
    key: 1,
    name: "John Brown sr.",
    age: 60,
    address: "New York No. 1 Lake Park",
    children: [
      {
        key: 11,
        name: "John Brown",
        age: 42,
        address: "New York No. 2 Lake Park",
      },
      {
        key: 12,
        name: "John Brown jr.",
        age: 30,
        address: "New York No. 3 Lake Park",
        children: [
          {
            key: 121,
            name: "Jimmy Brown",
            age: 16,
            address: "New York No. 3 Lake Park",
          },
        ],
      },
      {
        key: 13,
        name: "Jim Green sr.",
        age: 72,
        address: "London No. 1 Lake Park",
        children: [
          {
            key: 131,
            name: "Jim Green",
            age: 42,
            address: "London No. 2 Lake Park",
            children: [
              {
                key: 1311,
                name: "Jim Green jr.",
                age: 25,
                address: "London No. 3 Lake Park",
              },
              {
                key: 1312,
                name: "Jimmy Green sr.",
                age: 18,
                address: "London No. 4 Lake Park",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 2,
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
];

// rowSelection objects indicates the need for row selection
