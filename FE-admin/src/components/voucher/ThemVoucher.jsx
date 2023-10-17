import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ThemVoucher() {
  let history = useNavigate();

  const url = "http://localhost:8080/voucher/";
  const [voucher, setVoucher] = useState({
    ten: "",
    ma: "",
    ngayBatDau: "",
    ngayKetThuc: "",
    soLuong: "",
    id_hoa_don: null,
  });

  const handleInputChange = (e) => {
    setVoucher({
      ...voucher,
      nguoiTao: `Lee Lan`,
      code: `TEST${Math.floor(Math.random() * 1000 + 1010)}`,
      deleted: 1,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(voucher);

    axios.post(url + "add", voucher).then((res) => {
      console.log(res.data);
      history("/voucher");
    });
  };

  return (
    <>
      <form>
        <div style={{ margin: "15px" }}>
          ten{" "}
          <input
            type="text"
            name="ten"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div style={{ margin: "15px" }}>
          Ma{" "}
          <input type="text" name="ma" onChange={(e) => handleInputChange(e)} />
        </div>
        <div style={{ margin: "15px" }}>
          ngayBatDau{" "}
          <input
            type="datetime-local"
            name="ngayBatDau"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div style={{ margin: "15px" }}>
          ngayKetThuc{" "}
          <input
            type="datetime-local"
            name="ngayKetThuc"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div style={{ margin: "15px" }}>
          Code{" "}
          <input
            type="text"
            name="soLuong"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div style={{ margin: "15px" }}>
          giaTriMin{" "}
          <input
            type="text"
            name="giaTriMin"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div style={{ margin: "15px" }}>
          giaTriMax{" "}
          <input
            type="text"
            name="giaTriMax"
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <button
          onClick={(e) => handleSubmit(e)}
          style={{
            border: "1px solid red",
            padding: "5px",
            margin: "5px",
            background: "red",
          }}
          type="submit"
        >
          Add
        </button>
      </form>
    </>
  );
}
