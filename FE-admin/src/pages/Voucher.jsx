import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Voucher() {
  const url = "http://localhost:8080/voucher/";
  const history = useNavigate();
  const [list, setList] = useState([]);

  const handleUpdate = (id) => {
    localStorage.setItem("id", id);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await axios.get(url + "getVouchers");
    console.log(data.data);
    setList(data.data);
  };

  const deleteVoucher = (id) => {
    axios.delete(url + `delete/${id}`).then((res) => {
      getData();
    });
    // history("/voucher");
  };
  return (
    <>
      <Link to={`/add`}>
        <button
          style={{
            border: "1px solid green",
            padding: "5px",
            margin: "5px",
            background: "green",
          }}
        >
          Add
        </button>
      </Link>
      <table border="1">
        <thead>
          <tr>
            <th style={{ padding: " 10px", border: "1px solid black" }}>
              <input type="checkbox" />
            </th>
            <th style={{ padding: " 10px", border: "1px solid black" }}>STT</th>
            <th style={{ padding: " 10px", border: "1px solid black" }}>
              Mã voucher
            </th>
            <th style={{ padding: " 10px", border: "1px solid black" }}>
              Tên voucher
            </th>
            <th style={{ padding: " 10px", border: "1px solid black" }}>
              Code
            </th>
            <th style={{ padding: " 10px", border: "1px solid black" }}>
              Ngày bắt đầu
            </th>
            <th style={{ padding: " 10px", border: "1px solid black" }}>
              Ngày kết thúc
            </th>
            <th style={{ padding: " 10px", border: "1px solid black" }}>
              Số lượng
            </th>
            <th style={{ padding: " 10px", border: "1px solid black" }}>
              Người tạo
            </th>
            <th style={{ padding: " 10px", border: "1px solid black" }}>
              Mã hóa đơn
            </th>
            <th
              colSpan={3}
              style={{ padding: " 10px", border: "1px solid black" }}
            >
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, i) => (
            <tr key={i}>
              <td style={{ textAlign: "center", border: "1px solid black" }}>
                <input type="checkbox" />
              </td>
              <td style={{ textAlign: "center", border: "1px solid black" }}>
                {i + 1}
              </td>
              <td style={{ textAlign: "center", border: "1px solid black" }}>
                {item.ma}
              </td>
              <td style={{ textAlign: "center", border: "1px solid black" }}>
                {item.ten}
              </td>
              <td style={{ textAlign: "center", border: "1px solid black" }}>
                {item.code}
              </td>
              <td style={{ textAlign: "center", border: "1px solid black" }}>
                {item.ngayBatDau}
              </td>
              <td style={{ textAlign: "center", border: "1px solid black" }}>
                {item.ngayKetThuc}
              </td>
              <td style={{ textAlign: "center", border: "1px solid black" }}>
                {item.soLuong}
              </td>
              <td style={{ textAlign: "center", border: "1px solid black" }}>
                {item.nguoiTao}
              </td>
              <td style={{ textAlign: "center", border: "1px solid black" }}>
                {item.id_hoa_don}
              </td>
              <td style={{ textAlign: "center", border: "1px solid black" }}>
                <Link to={`/voucher/detail/${item.id}`}>
                  <button
                    style={{
                      border: "1px solid black",
                      padding: "5px",
                      margin: "5px",
                      background: "black",
                      color: "white",
                    }}
                  >
                    Detail
                  </button>
                </Link>
                <Link to={"/update"}>
                  <button
                    style={{
                      border: "1px solid yellow",
                      padding: "5px",
                      margin: "5px",
                      background: "yellow",
                    }}
                    onClick={() => handleUpdate(item.id)}
                  >
                    Update
                  </button>
                </Link>
                <button
                  style={{
                    border: "1px solid red",
                    padding: "5px",
                    margin: "5px",
                    background: "red",
                  }}
                  onClick={(e) => {
                    deleteVoucher(item.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
