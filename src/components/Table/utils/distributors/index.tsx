/* eslint-disable react-hooks/rules-of-hooks */
import { GridColDef } from '@mui/x-data-grid';
import { TableActions } from 'components/Table/TableActions';
import { useRouter } from 'next/navigation';
import React from 'react';
import { http } from 'services/http';
import { Distributor } from 'types/distributors';

export const distributorsColumn: (
  setDistributorColumn: React.Dispatch<React.SetStateAction<any[]>>,
) => GridColDef<Distributor>[] = (setDistributorColumn) => [
  {
    field: 'id',
    headerName: 'ID',
    width: 90,
    editable: false,
    filterable: false,
    sortable: false,
    hideable: false,
  },
  {
    field: 'postalCode',
    headerName: 'CEP',
    editable: false,
    maxWidth: 100,
    sortable: false,
    hideable: false,
  },
  {
    field: 'city',
    headerName: 'Cidade/Estado',
    renderCell: (params) => {
      return (
        <span className="truncate max-w-full">
          {params.row.city} / {params.row.state}
        </span>
      );
    },
    editable: false,
    minWidth: 200,
  },
  {
    field: 'email',
    renderCell: (params) => {
      return <span className="truncate max-w-full">{params.row.email}</span>;
    },
    headerName: 'E-Mail',
    minWidth: 200,
    editable: false,
    sortable: false,
    hideable: false,
  },
  { field: 'distributor', headerName: 'Distribuidor', editable: false, minWidth: 200 },
  {
    minWidth: 200,
    field: 'company',
    headerName: 'Empresa',
    editable: false,
  },
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
                .delete(`/api/distributor/${params.id}`)
                .then(() => {
                  alert('This select was deleted from database');
                  setDistributorColumn((prev) => {
                    const newPrev = [...prev];
                    const index = newPrev.findIndex(({ id }) => id === params.id);
                    newPrev.splice(index, 1);
                    return newPrev;
                  });
                })
                .catch(() => alert('Ops... Ocurred an error on delete item.'));
            }
          }}
          onClickEdit={() =>
            router.push(`/admin/dash/distributors?edit=${params.row.id}`)
          }
        />
      );
    },
  },
];
