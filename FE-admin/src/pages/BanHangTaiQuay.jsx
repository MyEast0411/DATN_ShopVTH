import TabBanHang from "../components/ban_hang/TabBanHang";
import TabsComponent from "../small-component/Tabs";

const BanHangTaiQuay = () => {
  return (
    <>
      <h2 className="mb-5 font-bold text-2xl">Bán Hàng</h2>
      <div className="overflow-auto w-full bg-white p-3">
        <TabBanHang />
      </div>
    </>
  );
};

export default BanHangTaiQuay;
