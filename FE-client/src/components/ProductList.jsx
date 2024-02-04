import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllSanPhamChiTietByIdSanPham,
  getAllSanPham,
} from "../apis/SanPham";

export default function ProductList() {
  const [sanPhams, setSanPhams] = useState([]);
  const [hinhAnhs, setHinhAnhs] = useState([]);
  const [idHover, setIdHover] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [isMouseOver, setIsMouseOver] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllSanPham();
        // has been filter unique
        setSanPhams(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchSanPhamById = async () => {
      try {
        const data = await getAllSanPhamChiTietByIdSanPham(idHover);
        setHinhAnhs(data);
      } catch (error) {
        console.error("Error fetchSanPhamById:", error);
      }
    };

    if (idHover) {
      fetchSanPhamById();
    }
  }, [idHover]);

  const handleIdHover = (idHover) => {
    setIdHover(idHover);
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {sanPhams.map((sanPham) => (
          <Link
            to={`/detail-product/${sanPham.id}`}
            className="card-product"
            key={sanPham.id}
            onMouseOver={() => handleIdHover(sanPham.id)}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={selectedImage === "" ? sanPham.defaultImg : selectedImage}
              alt="Ảnh sản phẩm"
              className="img-product"
            />
            {isMouseOver ? (
              <div className="list-chiTietSanPham flex">
                {hinhAnhs.slice(0, 5).map((item, index) => (
                  <img
                    key={index}
                    className="img-list-chiTietSanPham"
                    src={item.defaultImg}
                    alt=""
                    onMouseOver={() => setSelectedImage(item.defaultImg)}
                  />
                ))}
                {sanPham.colorCount > 5 && (
                  <span className="img-list-chiTietSanPham">
                    <span className="moreThan">+5</span>
                  </span>
                )}
              </div>
            ) : (
              <>
                <h2 className="name-product">{sanPham.ten}</h2>
                <h2 className="gender">{sanPham.theLoai}</h2>
                <h2 className="color-quantity">{`${sanPham.colorCount} Colors`}</h2>
              </>
            )}
            <div className="price-product">
              VNĐ {Intl.NumberFormat().format(sanPham?.maxPrice)}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
