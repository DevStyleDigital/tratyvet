import { GridToolbar, DataGrid } from '@mui/x-data-grid';
import { HandleDistributor } from 'components/Admin/Distributor/handle-distributor';
import { distributorsColumn } from 'components/Table/utils/distributors';
import { useLang } from 'hooks/use-lang';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { protectDashboardPages } from 'services/supabase/protect-admin-pages';
import { Distributor } from 'types/distributors';

const Distributors = ({ distributors }: { distributors: Distributor[] }) => {
  const [distributorsData, setDistributorsData] = useState(distributors);
  const [open, setOpen] = useState(false);
  const [distributor, setDistributor] = useState<Distributor & { index: number }>();
  const { t } = useLang('dash');
  const router = useRouter();

  useEffect(() => {
    if (!router.query.edit?.length) return;
    const index = distributorsData.findIndex((d) => d.id === router.query.edit);
    setDistributor({ ...distributorsData[index], index });
    setOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  return (
    <div className="p-8 h-screen flex flex-col">
      <h1 className="mb-8 tracking-[0.12em] text-4xl min-[512px]:text-[2.75rem] font-extrabold font-sans-secondary uppercase">
        Todos os Distribuidores:
      </h1>
      <HandleDistributor
        open={open}
        setOpen={setOpen}
        distribuidor={distributor}
        setDistributors={setDistributorsData}
      />
      <DataGrid
        columns={distributorsColumn(setDistributorsData)}
        rows={distributorsData}
        editMode="row"
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const dashboard = await protectDashboardPages(ctx);

    const { data } = await dashboard
      .from('distributors')
      .select('*')
      .order('created_at', { ascending: false });

    return {
      props: {
        distributors: data?.length ? data : [],
      },
    };
  } catch (err: any) {
    return err;
  }
};
export default Distributors;
