import React from "react";
import { Select } from "antd";
const options = [];
for (let i = 10; i < 36; i++) {
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}
const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const FilterTen = ({style}) => (
  <Select
    mode="tags"
    placeholder="Tên khuyến mại"
    onChange={handleChange}
    options={options}
    style={style}
  />
);
export default FilterTen;
