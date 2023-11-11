import React, { useState } from "react";
import { Divider, Radio, Table } from "antd";

const TableAntd = (props) => {
  return (
    <div>
      <Divider />
      <Table
        rowSelection={props.rowSelection}
        columns={props.columns}
        dataSource={props.dataSource}
        pagination={{ pageSize: props.size }}
      />
    </div>
  );
};
export default TableAntd;
