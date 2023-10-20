import { Button } from "antd";
import { Link } from "react-router-dom";
import { HiOutlineClipboardList } from "react-icons/hi";
import TableAllKhuyenMai from "../common/tableNextUi/khuyenMai/TableAllKhuyenMai";

const KhuyenMai = () => {
  return (
    <>
      <div>
        <div className="mb-2  border-b-[1px] font-normal relative border-gray-500 text-lg flex  items-center">
          <HiOutlineClipboardList />
          <p className="ml-2 mt-1"> Danh sách khuyến mại</p>
          <Link to={"/them-khuyen-mai"} className="absolute right-0 mb-1">
            <Button
              type="primary"
              style={{
                backgroundColor: "#1976d2",
                marginBottom: "2px",
              }}
            >
              + Tạo khuyến mại
            </Button>
          </Link>
        </div>

        {/* <Link
          to={"/them-khuyen-mai"}
          className="inline-block mb-2"
          style={{ marginLeft: "92%" }}
        >
          <Button
            className="flex"
            type="primary"
            style={{
              backgroundColor: "#1976d2",
              alignItems: "center",
            }}
          >
            <AiOutlinePlus className="mr-2" />
            Thêm
          </Button>
        </Link> */}

        <div
          className="font-normal border-gray-500 text-lg"
          style={{
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "8px",
            width: "100%",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            transition: "transform 0.2s",
          }}
        >
          <div>
            <TableAllKhuyenMai />
          </div>
        </div>
      </div>
    </>
  );
};

export default KhuyenMai;
