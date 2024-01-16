import React, { useEffect, useState } from 'react';

const Slider = ({searchValue, maxValue, setSanPhams}) => {
  const [value, setValue] = useState(0);

  const handleChange = (event) => {
    
    setValue(event.target.value);
  };
  useEffect(() => { 
    console.log(searchValue);
    setValue(searchValue)
  },[searchValue]);
  return (
    <div>
      <input
        type="range"
        min="0"
        max={maxValue}
        value={value}
        onChange={handleChange}
      />
      <p>Số lượng tồn: {value}</p>
    </div>
  );
};

export default Slider;