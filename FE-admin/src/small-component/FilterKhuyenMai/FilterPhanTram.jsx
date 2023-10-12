import React from "react";
import { Select } from "antd";

const options = [];
for (let i = 1; i <= 90; i++) { // Restrict values from 1 to 90
  const value = i < 10 ? `0${i}` : `${i}`;
  options.push({
    value: `KM${value}`,
    label: `${i}%`,
  });
}


const FilterOption = ({ placeholder, style }) => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <Select
      mode="tags"
      style={style}
      placeholder={placeholder}
      onChange={handleChange}
      options={options}
      maxTagCount={1}
      maxTagTextLength={7}
    />
  );
};

export default FilterOption;
