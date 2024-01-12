/* eslint-disable react-hooks/rules-of-hooks */
import { GridColDef } from '@mui/x-data-grid';
import { TableActions } from 'components/Table/TableActions';
import { useLang } from 'hooks/use-lang';
import { useRouter } from 'next/navigation';
import React from 'react';
import { http } from 'services/http';

export const productsColumn: (
  productsColumn: React.Dispatch<React.SetStateAction<any[]>>,
) => GridColDef[] = (setProductsColumn) => [
  { field: 'id', headerName: 'ID', width: 90, editable: false },
  {
    field: 'name["pt-br"]',
    renderCell: (params) => {
      const { lang } = useLang();
      return (
        <span>
          {params.row.name[lang!.toLowerCase()] || `product.name.${lang!.toLowerCase()}`}
        </span>
      );
    },
    headerName: 'Product Name',
    width: 150,
    editable: false,
  },
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
              await http
                .delete(`/api/products/${params.id}`)
                .then(() => {
                  alert('This select was deleted from database');
                  setProductsColumn((prev) => {
                    const newPrev = [...prev];
                    const index = newPrev.findIndex(({ id }) => id === params.id);
                    newPrev.splice(index, 1);
                    return newPrev;
                  });
                })
                .catch(() => alert('Ops... Ocurred an error on delete item.'));
            }
          }}
          onClickEdit={() => router.push(`/admin/dash/product/${params.id}`)}
        />
      );
    },
  },
];
