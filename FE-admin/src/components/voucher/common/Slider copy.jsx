import React, { useState } from 'react';

const Slider = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
      />
      <p>Số lượng tồn: {value}</p>
    </div>
  );
};

export default Slider;