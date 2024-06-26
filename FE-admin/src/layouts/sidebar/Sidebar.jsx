import { useEffect, useState } from "react";
import { useRef } from "react";
import SubMenu from "./SubMenu";
import { motion } from "framer-motion";
// * React icons
import { VscAccount } from "react-icons/vsc";
import { BsArrowReturnLeft } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineAppstore, AiOutlineSetting } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { HiOutlineDatabase } from "react-icons/hi";
import { TbChartHistogram, TbReportAnalytics, TbLogout } from "react-icons/tb";
import { RiBuilding3Line } from "react-icons/ri";
import { useMediaQuery } from "react-responsive";
import { MdMenu } from "react-icons/md";
import { NavLink, Link, useLocation, useRoutes } from "react-router-dom";
//logo
import logo from "../../assets/logo.png";
import axios from "axios";
import { Button } from "antd";
import { toast } from "react-toastify";

const Sidebar = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef();
  const { pathname } = useLocation();
  const [user, setUser] = useState({});

  useEffect(() => {
    if (localStorage?.getItem("user") != "")
      setUser(JSON.parse(localStorage.getItem("user")));
    else setUser(null);
  }, []);
  //switch mode
  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);
  const getNhanVien = async () => {
    const result = await axios.get('http://localhost:8080/user/findByMa');
    console.log(result);
    if(result.data == 'FAILED') {
      window.location.href = "http://localhost:5173";
    }
    localStorage.setItem("user", JSON.stringify(result.data));
    const nhanVienData = result.data;
    console.log(nhanVienData);
    setUser(result.data);
  };
  useEffect(() => {
    getNhanVien();
  }, []);
  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [pathname]);

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };

  const subMenusList = [
    {
      name: "quan-ly-san-pham",
      icon: RiBuilding3Line,
      menus: [
        "san-pham",
        "the-loai",
        "de-giay",
        "mau-sac",
        "kich-co",
        "thuong-hieu",
        "chat-lieu",
      ],
      subTitles: [
        "Sản phẩm",
        "Thể loại",
        "Đế giày",
        "Màu sắc",
        "Kích cỡ",
        "Thương hiệu",
        "Chất liệu",
      ],
      mainTitle: "Quản lý sản phẩm",
    },
    {
      name: "quan-ly-tai-khoan",
      icon: BsPerson,
      menus: ["nhan-vien", "khach-hang"],
      subTitles: ["Nhân viên", "Khách hàng"],
      mainTitle: "Quản lý tài khoản",
    },
    {
      name: "giam-gia",
      icon: HiOutlineDatabase,
      menus: ["khuyen-mai", "voucher"],
      subTitles: ["Đợt giảm giá", "Phiếu giảm giá"],
      mainTitle: "Giảm giá",
    }
    // {
    //   name: "settings",
    //   icon: AiOutlineAppstore,
    //   menus: ["dang-ky", "dang-nhap", "dang-xuat"],
    //   subTitles: ["Đăng ký", "Đăng nhập", "Đăng xuất"],
    //   mainTitle: "Settings",
    // },
  ];

  return (
    <div>
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${
          open ? "block" : "hidden"
        } `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className="text-gray shadow-xl z-[999] max-w-[16rem]  w-[16rem] 
            overflow-hidden md:relative fixed
         h-screen "
        style={{
          backgroundColor: "white",
          borderRight: "2px solid #ccc",
        }}
      >
        <div className="flex items-center font-medium border-b border-slate-300">
          <img src={logo} width={120} alt="Ảnh logo" />
          <Link to={"/"}>
            <span className="text-xl whitespace-pre font-semibold">
              Jordan VTH
            </span>
          </Link>
        </div>

        <div className="flex flex-col h-full">
          <ul className="whitespace-pre  px-2.5 text-[0.9rem] py-5 flex flex-col gap-1  font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100   md:h-[75%] h-[70%]">
            <li>
              <NavLink to={"/ban-hang-tai-quay"} className="link">
                <AiOutlineAppstore size={23} className="min-w-max" />
                Bán Hàng Tại Quầy
              </NavLink>
            </li>
            <li>
              <NavLink to={"/quan-ly-hoa-don"} className="link">
                <TbReportAnalytics size={23} className="min-w-max" />
                Quản Lý Thu Chi
              </NavLink>
            </li>

            {(open || isTabletMid) && (
              <div className="border-y py-5 border-[#b9b9b9]">
                {subMenusList?.map((menu) => (
                  <div key={menu.name} className="flex flex-col gap-1">
                    <SubMenu data={menu} />
                  </div>
                ))}
              </div>
            )}

            <li>
              <NavLink to={"/doi-tra-hang"} className="link">
                <BsArrowReturnLeft size={23} className="min-w-max" />
                Trả hàng
              </NavLink>
            </li>
            <li>
              <NavLink to={"/thong-ke"} className="link">
                <TbChartHistogram size={23} className="min-w-max" />
                Thống kê
              </NavLink>
            </li>
            <li>
              <p to={"/dang-xuat"} onClick={ async () => {
                console.log("heloo");
                await axios.get("http://localhost:8080/user/logout").then((response) => {
                  if(response.status == 200) {
                    setUser({});
                    toast.success("Đăng xuất thành công");
                    localStorage.removeItem("user");
                    window.location.href = "http://localhost:5173";
                  }
                })
              }} className="link" classNames="border-none">
                <TbLogout size={23} className="min-w-max" />
                Đăng xuất
              </p>
            </li>
          </ul>

          <li className="link">
            <NavLink
              to={"/profile"}
              className="link w-full profile-bar border border-[#ccc]"
            >
              {/* image profile */}
              <VscAccount size={23} />
              <img
                className="rounded-full w-50"
                src={user?.anh}
                alt="avatar"
                width={50}
              />
              <div className="flex justify-start flex-col items-start">
                <p className="w-40 leading-7 cursor-pointer text-s text-sm truncate text-gray-600">
                  {user?.ten}
                </p>
              </div>
            </NavLink>
          </li>
        </div>
        <motion.div
          onClick={() => {
            setOpen(!open);
          }}
          animate={
            open
              ? {
                  x: 0,
                  y: 0,
                  rotate: 0,
                }
              : {
                  x: -10,
                  y: -200,
                  rotate: 180,
                }
          }
          transition={{ duration: 0 }}
          className="absolute w-fit p-1 rounded-full h-fit md:block z-50 hidden right-0 bottom-1 cursor-pointer"
          style={{}}
        >
          <IoIosArrowBack size={25} />
        </motion.div>
      </motion.div>

      <div className="m-3 md:hidden" onClick={() => setOpen(true)}>
        <MdMenu size={25} />
      </div>
    </div>
  );
};

export default Sidebar;
