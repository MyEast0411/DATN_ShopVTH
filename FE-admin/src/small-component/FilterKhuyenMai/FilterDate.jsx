import React from "react";
import { DatePicker, Space } from "antd";

const { RangePicker } = DatePicker;

const FilterDatePicker = () => (
  <Space direction="vertical" size={12}>
    <RangePicker showTime />
   
  </Space>
);

export default FilterDatePicker;
