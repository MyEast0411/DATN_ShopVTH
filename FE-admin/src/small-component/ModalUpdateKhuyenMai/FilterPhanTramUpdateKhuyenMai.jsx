import React from "react";
import { Select } from "antd";

const options = [];
for (let i = 1; i <= 90; i++) {
  const value = i < 10 ? `0${i}` : `${i}`;
  options.push({
    value: `${value}`,
    label: `${i}%`,
  });
}

const FilterOption = ({ placeholder, style }) => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <Select
      mode="single"
      style={style}
      placeholder={placeholder}
      onChange={handleChange}
      defaultValue="1%"
      options={options}
    />
  );
};

export default FilterOption;
