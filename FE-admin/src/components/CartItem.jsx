import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Input,
} from "@nextui-org/react";
import { MdOutlineDelete } from "react-icons/md";
import { Button } from "@material-tailwind/react";
// import { useSearchParams } from "react-router-dom";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function CartItem({ users, columns, updateSoLuong }) {
  useEffect(() => {});
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "thongtinsanpham":
        return (
          <div className="flex col-span-2 gap-4">
            <div className="col-span-1">
              {" "}
              <img src={user.img} alt="No-img" style={{ borderRadius: 10 }} />
            </div>
            <div className="col-span-1 text-base justify-center mt-8 ">
              <p>
                <span className="font-bold ">Tên sản phẩm : </span> {user.name}
              </p>
              <p>
                <span className="font-bold ">Size : </span> {user.size}
              </p>
              <p>
                <span className="font-bold ">Đơn giá : </span>
                <span style={{ color: "red" }}>
                  {" "}
                  {Intl.NumberFormat().format(user.donGia)}&nbsp;₫
                </span>
              </p>
            </div>
          </div>
        );

      case "soLuong":
        console;
        return (
          <div className=" flex col-span-3 gap-1">
            <div className="col-span-1">
              <Button
                onClick={() => {
                  updateSoLuong(user.key);
                }}
              >
                -
              </Button>
            </div>
            <div
              className="col-span-1"
              style={{
                width: 100,
              }}
            >
              <Input
                type="text"
                value={user.soLuong}
                variant="bordered"
                className="text-lg"
                style={{ textAlign: "center", paddingTop: 5 }}
              />
            </div>

            <div className="col-span-1">
              <Button
                onClick={() => {
                  user.soLuong + 1;
                }}
              >
                +
              </Button>
            </div>
          </div>
        );

      case "tongTien":
        return (
          <span style={{ color: "red", fontSize: 20 }}>
            {Intl.NumberFormat().format(user.soLuong * user.donGia)}&nbsp;₫
          </span>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip color="danger" content="Xóa sản phẩm">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <MdOutlineDelete style={{ fontSize: 40, color: "red" }} />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Example table with custom cells" className="pb-4">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            // align={column.uid === "actions" ? "center" : "start"}
            align="center"
            style={{ borderBottom: "1px solid black", marginLeft: 30 }}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={users} emptyContent={`Không có dữ liệu 🫗🫗🫗🫗`}>
        {(item) => (
          <TableRow key={item.id} style={{ borderBottom: "1px solid black" }}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
