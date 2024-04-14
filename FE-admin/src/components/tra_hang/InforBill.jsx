import { useParams } from "react-router-dom";
import AfterSearch from "./AfterSearch";
import BeforeSearch from "./BeforeSearch";
import { useEffect, useState } from "react";
import axios from "axios";

function InforBill({ maHD }) {
  const [hd, setHD] = useState([]);
  const getHD = async () => {
    if (maHD == "") {
      return;
    }
    await axios
      .get(`http://localhost:8080/hoa_don_chi_tiet/getHDDoiTra/${maHD}`)
      .then((res) => {
        setHD(
          res.data.listHDCT.map((res) => {
            return {
              ...res,
              ma: res.id_chi_tiet_san_pham.ma,
              key: res.id_chi_tiet_san_pham.ma,
              quantity: 0,
            };
          })
        );
      });
    // .catch((err) => console.log("Loi"));
  };
  useEffect(() => {
    getHD();
  }, [maHD, hd]);
  return (
    <>
      {hd == null && maHD == "" ? (
        <BeforeSearch />
      ) : (
        <AfterSearch hdDoiTra={hd} />
      )}
    </>
  );
}

export default InforBill;
