import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditVoucher() {
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

  const { id } = useParams();

  useEffect(() => {
    console.log(localStorage.getItem("id"));
    axios.get(url + `getVoucher/${localStorage.getItem("id")}`).then((res) => {
      console.log(res.data);
      setVoucher(res.data);
    });
  }, []);

  const handleInputChange = (e) => {
    setVoucher({
      ...voucher,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(voucher);

    axios
      .put(url + `update/${localStorage.getItem("id")}`, voucher)
      .then((res) => {
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
            value={voucher.ten}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div style={{ margin: "15px" }}>
          Ma{" "}
          <input
            type="text"
            name="ma"
            onChange={(e) => handleInputChange(e)}
            value={voucher.ma}
          />
        </div>
        <div style={{ margin: "15px" }}>
          ngayBatDau{" "}
          <input
            type="datetime-local"
            name="ngayBatDau"
            onChange={(e) => handleInputChange(e)}
            value={voucher.ngayBatDau}
          />
        </div>
        <div style={{ margin: "15px" }}>
          ngayKetThuc{" "}
          <input
            type="datetime-local"
            name="ngayKetThuc"
            onChange={(e) => handleInputChange(e)}
            value={voucher.ngayKetThuc}
          />
        </div>
        <div style={{ margin: "15px" }}>
          Code{" "}
          <input
            type="text"
            name="soLuong"
            onChange={(e) => handleInputChange(e)}
            value={voucher.soLuong}
          />
        </div>
        <div style={{ margin: "15px" }}>
          giaTriMin{" "}
          <input
            type="text"
            name="giaTriMin"
            onChange={(e) => handleInputChange(e)}
            value={voucher.giaTriMin}
          />
        </div>
        <div style={{ margin: "15px" }}>
          giaTriMax{" "}
          <input
            type="text"
            name="giaTriMax"
            onChange={(e) => handleInputChange(e)}
            value={voucher.giaTriMax}
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
