/* eslint-disable react-hooks/rules-of-hooks */
import { GridColDef } from '@mui/x-data-grid';
import { TableActions } from 'components/Table/TableActions';
import { useRouter } from 'next/navigation';
import { http } from 'services/http';

export const productsColumn: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90, editable: false },
  { field: 'name', headerName: 'Product Name', width: 150, editable: false },
  { field: 'type', headerName: 'Type', width: 90, editable: false },
  { field: 'category', headerName: 'Category', width: 90, editable: false },
  {
    field: 'actions',
    headerName: '',
    width: 120,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => {
      const router = useRouter();

      return (
        <TableActions
          onClickDelete={async () => {
            if (
              confirm(
                "Did you really want remove this item?\n\nThis action can't be reverse!",
              )
            ) {
              await http.delete(`/api/products/${params.id}`);
              alert('This select was deleted from database');
            }
          }}
          onClickEdit={() => router.push(`/admin/dash/product/${params.id}`)}
        />
      );
    },
  },
];
