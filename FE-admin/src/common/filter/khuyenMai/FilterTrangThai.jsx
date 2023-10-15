import React from "react";
import { Select } from "antd";

const FilterOption = ({ placeholder }) => {
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const filterOption = (input, option) =>
    (option?.label || "").toLowerCase().includes(input.toLowerCase());

  const selectStyle = {
    width: "100px",
  };

  return (
    <Select
      showSearch
      placeholder={placeholder}
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={filterOption}
      style={selectStyle} // Apply the custom width style here
      options={[
        {
          value: "Tất cả",
          label: "Tất cả",
        },
        {
          value: "Hết hạn",
          label: "Hết hạn",
        },
        {
          value: "Còn hạn",
          label: "Còn hạn",
        },
      ]}
      defaultValue="Tất cả"
    />
  );
};

export default FilterOption;
