import FilterPhanTram from "../common/filter/khuyenMai/FilterPhanTram";
import FilterTrangThai from "../common/filter/khuyenMai/FilterTrangThai";
import FilterDate from "../small-component/FilterKhuyenMai/FilterDate";
import { Button } from "antd";
import { Link } from "react-router-dom";
import FilterMa from "../common/filter/khuyenMai/FilterMa";
// import TableAllKhuyenMai from "../common/table/khuyenMai/TableAllKhuyenMai";
import { BiFilterAlt } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { HiOutlineClipboardList } from "react-icons/hi";
import FilterTen from "../common/filter/khuyenMai/FilterTen";
// import TableAllKhuyenMai from "../common/table/khuyenMai/TableAllKhuyenMai";
import TableAllKhuyenMai from "../common/tableNextUi/khuyenMai/TableAllKhuyenMai";

const KhuyenMai = () => {
  return (
    <>
      <div>
        {/* <div  style={{
              fontSizfe: "8px",
              backgroundColor: "white",
              padding: "20px 10px",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.2s",
            }}>
          <div className="mb-2 border-b-[1px] font-normal  border-gray-500 text-lg flex  items-center">
            <BiFilterAlt />
            <p className="ml-2 mt-1"> Bộ lọc</p>
          </div>

          <div
            className="grid grid-cols-3 gap-4"
           
          >
            <div className="p-2">
              <FilterMa style={{ width: "100%" }} />
            </div>
            <div className="p-2">
              <FilterTen style={{ width: "100%" }} />
            </div>
            <div className="p-2">
              <FilterPhanTram
                placeholder="Giá trị giảm (%)"
                style={{ width: "100%" }}
              />
            </div>
            <div className="p-2">
              <FilterTrangThai
                placeholder="Chọn trạng thái"
                style={{ width: "100%" }}
              />
            </div>
            <div className="p-5">
              <FilterDate style={{ width: "100%" }} />
            </div>
            <div></div>
            <div className="p-2">
              <Button
                type="primary"
                style={{
                  backgroundColor: "#1976d2",
                  // marginBottom: "2px",
                  marginLeft: "150%",
                }}
              >
                Làm mới
              </Button>
            </div>
          </div>
        </div> */}

<<<<<<< HEAD
        <div className="mb-2 border-b-[1px] font-normal  border-gray-500 text-lg flex  items-center">
=======
        <div className="mb-2 mt-16 border-b-[1px] font-normal   border-gray-500 text-lg flex  items-center">
>>>>>>> e292bfef7864cf7134d30d2ee0ef6f647d32512d
          <HiOutlineClipboardList />
          <p className="ml-2 mt-1"> Danh sách khuyến mại</p>
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
