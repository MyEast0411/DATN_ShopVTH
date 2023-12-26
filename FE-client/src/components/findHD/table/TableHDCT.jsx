import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  getKeyValue,
} from "@nextui-org/react";

import { columns, users } from "./data";
import { Image } from "antd";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function TableHDCT({ listHDCT }) {
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "thongtin":
        return (
          <div className="flex" style={{ width: 300 }}>
            <div className="w-1/3 me-1">
              <Image
                width={50}
                src={user.id_chi_tiet_san_pham.defaultImg}
                style={{ borderRadius: 5 }}
              />
            </div>
            <div className="w-2/3 ">
              <p className="mb-2">{user.id_chi_tiet_san_pham.ten}</p>
              <p className="text-red-400 font-medium">
                {Intl.NumberFormat().format(user.giaTien)} ₫
              </p>
            </div>
          </div>
        );
      case "soLuong":
        return (
          <p>
            <span className="text-red-400 font-medium">{cellValue}</span> cái
          </p>
        );
      case "total":
        return (
          <>
            <span className="text-red-400 font-medium">
              {Intl.NumberFormat().format(user.soLuong * user.giaTien)} ₫
            </span>
          </>
        );

      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={listHDCT}>
        {(item, i) => (
          <TableRow key={i + 1}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
