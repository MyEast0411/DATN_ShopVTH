import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'STT', width: 70 },
  { field: 'hinhAnh', headerName: 'Hình ảnh sản phẩm', width: 130 },
  { field: 'ten', headerName: 'Tên sản phẩm', width: 130 },
  {
    field: 'gioiTinh',
    headerName: 'Giới tính',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, hinhAnh: 'Snow', ten: 'Jon', age: 35 },
  { id: 2, hinhAnh: 'Lannister', ten: 'Cersei', age: 42 },
  { id: 3, hinhAnh: 'Lannister', ten: 'Jaime', age: 45 },
  { id: 4, hinhAnh: 'Stark', ten: 'Arya', age: 16 },
  { id: 5, hinhAnh: 'Targaryen', ten: 'Daenerys', age: null },
  { id: 6, hinhAnh: 'Melisandre', ten: null, age: 150 },
  { id: 7, hinhAnh: 'Clifford', ten: 'Ferrara', age: 44 },
  { id: 8, hinhAnh: 'Frances', ten: 'Rossini', age: 36 },
  { id: 9, hinhAnh: 'Roxie', ten: 'Harvey', age: 65 },
];

export default function SelectedTable2() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}