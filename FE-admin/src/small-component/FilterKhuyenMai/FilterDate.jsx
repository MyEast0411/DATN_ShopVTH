import React from "react";
import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

const FilterDatePicker = ({ style }) => <RangePicker showTime style={style} />;

export default FilterDatePicker;
