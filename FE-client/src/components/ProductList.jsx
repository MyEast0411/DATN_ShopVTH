import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllSanPham } from "../api/SanPham";

export default function ProductList() {
  const [sanPhams, setSanPhams] = useState([]);

  const fetchSanPham = async () => {
    try {
      const data = await getAllSanPham();
      console.log("San Pham Data:", data);
      setSanPhams(data);
    } catch (error) {
      console.error("Error fetchSanPham():", error);
    }
  };

  useEffect(() => {
    fetchSanPham();
  }, []);

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {sanPhams.map((sanPham) => (
          <Link
            to={`/detail-product/${sanPham.id}`}
            className="card-product"
            key={sanPham.id}
          >
            <img
              src={sanPham.defaultImg}
              alt="Ảnh sản phẩm"
              className="img-product"
            />
            <h2 className="name-product">{sanPham.ten}</h2>
            <h2 className="gender">{sanPham.theLoai}</h2>
            <h2 className="color-quantity">{`${sanPham.colorCount} Colors`}</h2>
            <div className="price-product">${sanPham.maxPrice}</div>
          </Link>
        ))}
      </div>
    </>
  );
}
