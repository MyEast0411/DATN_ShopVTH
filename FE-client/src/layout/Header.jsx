import React from "react";
import Logo from "../assets/logo.png";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBagDash } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div className="flex main-ctn w-full sticky top-0">
        <Link to="/" className="flex container-logo">
          <img className="logo cursor-pointer" src={Logo} alt="" />
          <div className="flex justify-center">Jordan VTH</div>
        </Link>
        <div className="menu flex">
          <ul className="flex">
            <li>
              <a href="#">New & Featured</a>
            </li>
            <li>
              <a href="#">Men</a>
            </li>
            <li>
              <a href="#">Women</a>
            </li>
            <li>
              <a href="#">Kids</a>
            </li>
            <li>
              <a href="#">Accessories</a>
            </li>
            <li>
              <a href="#">Sales</a>
            </li>
          </ul>
        </div>

        <div className="container-input">
          <input
            type="text"
            placeholder="Search"
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
              fill-rule="evenodd"
            ></path>
          </svg>
        </div>

        <AiOutlineHeart className="heart" />
        <div className="icon-container">
          <Link to="/cart" className="relative">
            <BsBagDash className="bag" />
            <div className="badge">5</div>
          </Link>
        </div>
      </div>
    </>
  );
}
