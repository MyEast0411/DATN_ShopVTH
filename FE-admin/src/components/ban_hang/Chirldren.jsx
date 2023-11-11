import GioHang from "../GioHang";

export default function Children({
  columns,
  users,
  activeKey,
  changeData,
  updateSoLuong,
}) {
  return (
    <div className="p-5">
      {" "}
      <GioHang
        columns={columns}
        users={users}
        activeKey={activeKey}
        changeData={changeData}
        updateSoLuong={updateSoLuong}
      />
    </div>
  );
}
