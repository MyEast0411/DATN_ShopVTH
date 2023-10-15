import React from "react";
import { Select } from "antd";

const options = [];
for (let i = 10; i < 36; i++) {
  options.push({
    value: "SP"+ i,
    label: "SP"+ i,
  });
}

const selected = {
  width: "250px",
};

const FilterOption = ({ placeholder }) => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <Select
      mode="tags"
      style={selected}
      placeholder={placeholder}
      onChange={handleChange}
      options={options}
      maxTagCount={1} // Set the maximum number of displayed tags
      maxTagTextLength={7} // nếu tìm kiếm option dài quá 7 ký  tự thì hiển thị ""KM00123...""
    />
  );
};

export default FilterOption;
