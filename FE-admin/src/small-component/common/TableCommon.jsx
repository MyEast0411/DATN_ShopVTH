import React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function TableCommon(props) {
  return (
    <div className="text-center" style={{ height: 371, width: "100%" }}>
      <DataGrid
        style={{ backgroundColor: "white" }}
        rows={props.rows}
        columns={props.columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: props.pageSize },
          },
        }}
        pageSizeOptions={props.pageSizeOptions}
        checkboxSelection
      />
    </div>
  );
}
