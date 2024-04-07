import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { Dropdown, Space } from "antd";
import { useEffect, useState } from "react";

export default function InfoTop() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setUser(
      localStorage.getItem("user") == null ||
        localStorage.getItem("user") == undefined ||
        localStorage.getItem("user") == ""
        ? ""
        : JSON.parse(localStorage.getItem("user"))
    );
    // setUser("Hoi");
  }, []);

  const items = [
    {
      key: "1",
      label: (
        <p
          onClick={() => {
            navigate(`/profile/`);
          }}
        >
          Tài khoản
        </p>
      ),
    },
    {
      key: "2",
      label: (
        <p
          onClick={() => {
            navigate(`/wishlist/`);
          }}
        >
          Yêu thích
        </p>
      ),
    },
    {
      key: "3",
      label: (
        <p
          onClick={() => {
            navigate(`/voucher/`); //nếu có
          }}
        >
          Phiếu giảm giá
        </p>
      ),
    },
    {
      key: "5",
      label: (
        <p
          onClick={() => {
            navigate(`/lich-su-mua-hang/${user.id}`);
          }}
        >
          Lịch sử hóa đơn
        </p>
      ),
    },
    {
      key: "6",
      label: (
        <p
          onClick={() => {
            localStorage.setItem("user", "");
            setUser("");
            navigate("/");
          }}
        >
          Đăng xuất
        </p>
      ),
    },
  ];
  return (
    <>
      <div className="bg-[#838383] h-[25px]">
        <marquee direction="left">
          <span className="text-white text-[12px]">
            Tưng bừng khai trương tất cả hóa đơn trên 1 triệu sẽ được miễn phí
            vận chuyển !!!
          </span>
        </marquee>
      </div>
      {/* <marquee behavior="scroll" direction="left" >
        <span style={{color : "red", fontSize : '20px'}}>Tưng bừng khai trường tất cả hóa đơn trên 1 triệu sẽ được miễn phí vận chuyển !!!</span>
      </marquee> */}
      <div className="info-top w-full flex justify-between">
        <ul className="flex">
          <li className="mx-5">
            <a href="#">
              <svg height="24px" width="24px" fill="#111" viewBox="0 0 26 32">
                <path d="M14.4 5.52v-.08q0-.56.36-1t.92-.44 1 .36.48.96-.36 1-.96.4l-.24.08.08.12-.08.44-.16 1.28q.08.08.08.16l-.16.8q-.08.16-.16.24l-.08.32q-.16.64-.28 1.04t-.2.64V12q-.08.4-.12.64t-.28.8q-.16.32 0 1.04l.08.08q0 .24.2.56t.2.56q.08 1.6-.24 2.72l.16.48q.96.48.56 1.04l.4.16q.96.48 1.36.84t.8.76q.32.08.48.24l.24.08q1.68 1.12 3.36 2.72l.32.24v.08l-.08.16.24.16h.08q.24.16.32.16h.08q.08 0 .16-.08l.16-.08q.16-.16.32-.24h.32q.08 0 0 .08l-.32.16-.4.48h.56l.56.08q.24-.08.4-.16l.4-.24q.24-.08.48.16h.08q.08.08-.08.24l-.96.88q-.4.32-.72.4l-1.04.72q-.08.08-.16 0l-.24-.32-.16-.32-.2-.28-.24-.32-.2-.24-.16-.2-.32-.24q-.16 0-.32-.08l-1.04-.8q-.24 0-.56-.24-1.2-1.04-1.6-1.28l-.48-.32-.96-.16q-.48-.08-1.28-.48l-.64-.32q-.64-.32-.88-.32l-.32-.16q-.32-.08-.48-.16l-.16-.16q-.16 0-.32.08l-1.6.8-2 .88q-.8.64-1.52 1.04l-.88.4-1.36.96q-.16.16-.32 0l-.16.16q-.24.08-.32.08l-.32.16v.16h-.16l-.16.24q-.16.32-.32.36t-.2.12-.08.12l-.16.16-.24.16-.36-.04-.48.08-.32.08q-.4.08-.64-.12t-.4-.6q-.16-.24.16-.4l.08-.08q.08-.08.24-.08h.48L1.6 26l.32-.08q0-.16.08-.24.08-.08.24-.08v-.08q-.08-.16-.08-.32-.08-.16-.04-.24t.08-.08h.04l.08.24q.08.4.24.24l.08-.16q.08-.16.24-.16l.16.16.16-.16-.08-.08q0-.08.08-.08l.32-.32q.4-.48.96-.88 1.12-.88 2.4-1.36.4-.4.88-.4.32-.56.96-1.2.56-.4.8-.56.16-.32.4-.32H10l.16-.16q.16-.08.24-.16v-.4q0-.4.08-.64t.4-.24l.32-.32q-.16-.32-.16-.72h-.08q-.16-.24-.16-.48-.24-.4-.32-.64h-.24q-.08.24-.4.32l-.08.16q-.32.56-.56.84t-.88.68q-.4.4-.56.88-.08.24 0 .48l-.08.16h.08q0 .16.08.16h.08q.16.08.16.2t-.24.08-.36-.16-.2-.12l-.24.24q-.16.24-.32.2t-.08-.12l.08-.08q.08-.16 0-.16l-.64.16q-.08.08-.2 0t.04-.16l.4-.16q0-.08-.08-.08-.32.16-.64.08l-.4-.08-.08-.08q0-.08.08-.08.32.08.8-.08l.56-.24.64-.72.08-.16q.32-.64.68-1.16t.76-.84l.08-.32q.16-.32.32-.56t.4-.64l.24-.32q.32-.48.72-.48l.24-.24q.08-.08.08-.24l.16-.16-.08-.08q-.48-.4-.48-.72-.08-.56.36-.96t.88-.36.68.28l.16.16q.08 0 .08.08l.32.16v.24q.16.16.16.24.16-.24.48-.56l.4-1.28q0-.32.16-.64l.16-.24v-.16l.24-.96h.16l.24-.96q.08-.24 0-.56l-.32-.8z"></path>
              </svg>
            </a>
          </li>
          <li>
            <a href="#">
              <svg height="24px" width="24px" fill="#111" viewBox="0 0 39 33">
                <path d="M10.94 25.626l-4.236-5.501L.201 22.28l3.734-5.756L.11 10.777l6.59 2.031 4.026-5.474.14 6.785 6.64 2.175-6.594 2.446.028 6.886zm.824 7.239l13.952-16.393L11.806.107h11.697l14.871 16.389-14.8 16.369h-11.81z"></path>
              </svg>
            </a>
          </li>
        </ul>

        <div className="user-menu flex">
          <div className="flex">
            <Link to="/find-store" className="cursor-pointer">
              Tìm cửa hàng
            </Link>
            <span>|</span>
          </div>
          <div className="flex">
            <Link to="/contact-us" className="cursor-pointer">
              Liên hệ
            </Link>
            <span>|</span>
          </div>
          <div className="flex login-wrapper">
            {user === "" ? (
              <Link to="/sign-in" className="login cursor-pointer">
                Đăng nhập
              </Link>
            ) : (
              <Dropdown
                menu={{
                  items,
                }}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    Xin chào , {user.ten}
                    <FontAwesomeIcon icon={faUser} />
                  </Space>
                </a>
              </Dropdown>
            )}
          </div>
        </div>
      </div>
    </>
  );

  // return (
  //   <>
  //     <div className="info-top w-full flex justify-between">
  //       <ul className="flex">
  //         <li className="mx-5">
  //           <a href="#">
  //             <svg height="24px" width="24px" fill="#111" viewBox="0 0 26 32">
  //               <path d="M14.4 5.52v-.08q0-.56.36-1t.92-.44 1 .36.48.96-.36 1-.96.4l-.24.08.08.12-.08.44-.16 1.28q.08.08.08.16l-.16.8q-.08.16-.16.24l-.08.32q-.16.64-.28 1.04t-.2.64V12q-.08.4-.12.64t-.28.8q-.16.32 0 1.04l.08.08q0 .24.2.56t.2.56q.08 1.6-.24 2.72l.16.48q.96.48.56 1.04l.4.16q.96.48 1.36.84t.8.76q.32.08.48.24l.24.08q1.68 1.12 3.36 2.72l.32.24v.08l-.08.16.24.16h.08q.24.16.32.16h.08q.08 0 .16-.08l.16-.08q.16-.16.32-.24h.32q.08 0 0 .08l-.32.16-.4.48h.56l.56.08q.24-.08.4-.16l.4-.24q.24-.08.48.16h.08q.08.08-.08.24l-.96.88q-.4.32-.72.4l-1.04.72q-.08.08-.16 0l-.24-.32-.16-.32-.2-.28-.24-.32-.2-.24-.16-.2-.32-.24q-.16 0-.32-.08l-1.04-.8q-.24 0-.56-.24-1.2-1.04-1.6-1.28l-.48-.32-.96-.16q-.48-.08-1.28-.48l-.64-.32q-.64-.32-.88-.32l-.32-.16q-.32-.08-.48-.16l-.16-.16q-.16 0-.32.08l-1.6.8-2 .88q-.8.64-1.52 1.04l-.88.4-1.36.96q-.16.16-.32 0l-.16.16q-.24.08-.32.08l-.32.16v.16h-.16l-.16.24q-.16.32-.32.36t-.2.12-.08.12l-.16.16-.24.16-.36-.04-.48.08-.32.08q-.4.08-.64-.12t-.4-.6q-.16-.24.16-.4l.08-.08q.08-.08.24-.08h.48L1.6 26l.32-.08q0-.16.08-.24.08-.08.24-.08v-.08q-.08-.16-.08-.32-.08-.16-.04-.24t.08-.08h.04l.08.24q.08.4.24.24l.08-.16q.08-.16.24-.16l.16.16.16-.16-.08-.08q0-.08.08-.08l.32-.32q.4-.48.96-.88 1.12-.88 2.4-1.36.4-.4.88-.4.32-.56.96-1.2.56-.4.8-.56.16-.32.4-.32H10l.16-.16q.16-.08.24-.16v-.4q0-.4.08-.64t.4-.24l.32-.32q-.16-.32-.16-.72h-.08q-.16-.24-.16-.48-.24-.4-.32-.64h-.24q-.08.24-.4.32l-.08.16q-.32.56-.56.84t-.88.68q-.4.4-.56.88-.08.24 0 .48l-.08.16h.08q0 .16.08.16h.08q.16.08.16.2t-.24.08-.36-.16-.2-.12l-.24.24q-.16.24-.32.2t-.08-.12l.08-.08q.08-.16 0-.16l-.64.16q-.08.08-.2 0t.04-.16l.4-.16q0-.08-.08-.08-.32.16-.64.08l-.4-.08-.08-.08q0-.08.08-.08.32.08.8-.08l.56-.24.64-.72.08-.16q.32-.64.68-1.16t.76-.84l.08-.32q.16-.32.32-.56t.4-.64l.24-.32q.32-.48.72-.48l.24-.24q.08-.08.08-.24l.16-.16-.08-.08q-.48-.4-.48-.72-.08-.56.36-.96t.88-.36.68.28l.16.16q.08 0 .08.08l.32.16v.24q.16.16.16.24.16-.24.48-.56l.4-1.28q0-.32.16-.64l.16-.24v-.16l.24-.96h.16l.24-.96q.08-.24 0-.56l-.32-.8z"></path>
  //             </svg>
  //           </a>
  //         </li>
  //         <li>
  //           <a href="#">
  //             <svg height="24px" width="24px" fill="#111" viewBox="0 0 39 33">
  //               <path d="M10.94 25.626l-4.236-5.501L.201 22.28l3.734-5.756L.11 10.777l6.59 2.031 4.026-5.474.14 6.785 6.64 2.175-6.594 2.446.028 6.886zm.824 7.239l13.952-16.393L11.806.107h11.697l14.871 16.389-14.8 16.369h-11.81z"></path>
  //             </svg>
  //           </a>
  //         </li>
  //       </ul>

  //       <div className="user-menu flex">
  //         <div className="flex">
  //           <div className="cursor-pointer">Tìm cửa hàng</div>
  //           <span>|</span>
  //         </div>
  //         <div className="flex">
  //           <div className="cursor-pointer">Giúp đỡ</div>
  //           <span>|</span>
  //         </div>
  //         <div className="flex">
  //           <div className="cursor-pointer">Cộng tác</div>
  //           <span>|</span>
  //         </div>
  //         <div className="flex">
  //           {user === "" ? (
  //             <Link to="/sign-in" className="cursor-pointer">
  //               Đăng nhập
  //             </Link>
  //           ) : (
  //             <Dropdown
  //               menu={{
  //                 items,
  //               }}
  //             >
  //               <a onClick={(e) => e.preventDefault()}>
  //                 <Space>
  //                   Hi , {localStorage.getItem("user")}
  //                   <DownOutlined />
  //                 </Space>
  //               </a>
  //             </Dropdown>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
}
