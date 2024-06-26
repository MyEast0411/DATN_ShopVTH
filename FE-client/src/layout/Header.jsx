import { useState, useEffect } from "react";
import Logo from "../assets/logo.png";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBagDash } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Header() {
  const [badge, setBadge] = useState(0);
  useEffect(() => {
    const updateCartBadge = () => {
      const cart = JSON.parse(localStorage.getItem("maList")) || [];
      setBadge(cart.length);
    };

    // Gọi hàm để cập nhật badge khi component được render
    updateCartBadge();

    // Thêm callback để cập nhật badge khi giỏ hàng được cập nhật
    window.cartUpdatedCallback = updateCartBadge;

    return () => {
      delete window.cartUpdatedCallback;
    };
  }, []);
  return (
    <>
      <div className="flex justify-between main-ctn w-full sticky top-0">
        <Link to="/" className="flex container-logo">
          <img className="logo cursor-pointer" src={Logo} alt="" />
          <div className="flex justify-center">Jordan VTH</div>
        </Link>
        <div className="menu">
          <ul className="flex gap-10">
            <li>
              <a href="/">Mới & Nổi bật</a>
            </li>
            <li>
              <a href="/shop">Sản phẩm</a>
            </li>
            <li>
              <a href="/about">Giới thiệu</a>
            </li>
            <li>
              <a href="/news">Tin tức</a>
            </li>
            <li>
              <a href="/tracuu">Tra cứu</a>
            </li>
          </ul>
        </div>

        <div className="flex justify-between items-center gap-2">
          <div className="container-input">
            <input
              type="text"
              placeholder="Tìm kiếm"
              name="text"
              className="input search"
            />
            <svg
              fill="#000000"
              width="20px"
              height="20px"
              viewBox="0 0 1920 1920"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z"
                fillRule="evenodd"
              ></path>
            </svg>
          </div>

          <Link to={"/wishlist"}>
            <AiOutlineHeart className="heart" />
          </Link>
          <div className="icon-container">
            <Link to="/cart" className="relative">
              <BsBagDash className="bag" />
              <div className="badge flex items-center justify-center">
                {badge}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
