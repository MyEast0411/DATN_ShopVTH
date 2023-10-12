//filter
import FilterMa from "../small-component/FilterKhuyenMai/FilterMa";
import FilterPhanTram from "../small-component/FilterKhuyenMai/FilterPhanTram";
import FilterTrangThai from "../small-component/FilterKhuyenMai/FilterTrangThai";
import FilterDate from "../small-component/FilterKhuyenMai/FilterDate";

//table
import DataTableMa from "../small-component/TableKhuyenMai/DataTable";

//icon
import { BiFilterAlt } from "react-icons/bi";
import { FiRefreshCcw } from "react-icons/fi";
import { HiOutlineClipboardList } from "react-icons/hi";

const KhuyenMai = () => {
  return (
    <>
      <div
        className=""
        style={{
          fontSizfe: "8px",
        }}
      >
        <div className="mb-2 border-b-[2px] font-normal border-gray-500 text-lg	flex items-center">
          <BiFilterAlt />
          <p className="ml-2 mt-1"> Bộ lọc</p>
        </div>

        <div className=" flex items-center">
          <div className="pr-2">
            <FilterMa placeholder="Mã khuyến mại" />
          </div>
          <div className="pr-2">
            <FilterMa placeholder="Tên khuyến mại" />
          </div>
          <div className="pr-2">
            <FilterPhanTram placeholder="Giá trị giảm (%)" />
          </div>
          <div className="pr-2">
            <FilterTrangThai placeholder="Chọn trạng thái" />
          </div>
          <div className="pr-2">
            <FilterDate />
          </div>
          <div className="pr-2">
            <button className="icon-hover">
              <FiRefreshCcw
                style={{
                  fontSize: "20px",
                  marginTop: "25%",
                  marginLeft: "10px",
                }}
              />
            </button>
          </div>
        </div>
        <div className="mb-2 mt-10 border-b-[2px] font-normal border-gray-500 text-lg	flex items-center">
          <HiOutlineClipboardList />
          <p className="ml-2 mt-1"> Danh sách</p>
        </div>
        <DataTableMa />
      </div>
    </>
  );
};

export default KhuyenMai;
