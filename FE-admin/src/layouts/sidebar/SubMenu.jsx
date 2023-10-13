import { useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";

const SubMenu = ({ data }) => {
  const { pathname } = useLocation();
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  return (
    <>
      <li
        className={`link ${pathname.includes(data.name) && "text-blue-600"}`}
        onClick={() => setSubMenuOpen(!subMenuOpen)}
      >
        <data.icon size={15} className="min-w-max" />
        <p className="flex-1 capitalize">{data.mainTitle}</p>
        <IoIosArrowDown
          className={` ${subMenuOpen && "rotate-180"} duration-200`}
        />
      </li>
      <motion.ul
        animate={
          subMenuOpen
            ? {
                height: "fit-content",
              }
            : {
                height: 0,
              }
        }
        className="flex h-0 flex-col pl-14 text-[0.8rem] font-normal overflow-hidden"
      >
        {data.subTitles?.map((title, index) => (
          <li key={data.menus[index]}>
            <NavLink
              to={`/${data.name.toLowerCase()}/${data.menus[index]}`}
              className="link !bg-transparent capitalize"
            >
              {title}
            </NavLink>
          </li>
        ))}
      </motion.ul>
    </>
  );
};

export default SubMenu;
