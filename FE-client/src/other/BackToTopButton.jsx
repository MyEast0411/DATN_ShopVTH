import { IoIosArrowUp } from "react-icons/io";
import React, { useEffect, useState } from "react";
import "./backToTopButton.css";

export default function BackToTopButton() {
  const [backToTopButton, setBackToTopButton] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setBackToTopButton(true);
      } else {
        setBackToTopButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {backToTopButton && (
        <button
          className="flex text-center items-center justify-center backToTopButton"
          onClick={scrollUp}
        >
          <IoIosArrowUp />
        </button>
      )}
    </div>
  );
}
