import React from "react";
import { Select } from "antd";
import { getProvinces } from "../../../api/Location";
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
const FilterMa = ({style}) => (
  <Select
    mode="tags"
    placeholder="Tìm kiếm..."
    onChange={handleChange}
    options={options}
    style={style}
  />
);
export default FilterMa;
