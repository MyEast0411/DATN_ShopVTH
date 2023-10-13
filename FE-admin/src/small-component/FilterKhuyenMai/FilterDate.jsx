import React from "react";
import { DatePicker, Space } from "antd";

const { RangePicker } = DatePicker;

const FilterDatePicker = ({style}) => (
  <Space direction="vertical" size={12}>
   <RangePicker showTime style={style} /> 
   
  </Space>
);

export default FilterDatePicker;
