import { Table } from 'components/Table';
import { productsColumn } from 'components/Table/utils/products';
import { useLang } from 'hooks/use-lang';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { protectDashboardPages } from 'services/supabase/protect-admin-pages';
import { Product } from 'types/product';

const Dash = ({
  products,
}: {
  products: Omit<Product, 'items' | 'desc' | 'imageUrl'>[];
}) => {
  const [productsData, setProductsData] = useState(products);
  const { t } = useLang('dash');

  return (
    <div className="p-8 h-screen flex flex-col">
      <h1 className="mb-8 tracking-[0.12em] text-4xl min-[512px]:text-[2.75rem] font-extrabold font-sans-secondary uppercase">
        {t('dash-title')}:
      </h1>
      <Table
        columns={productsColumn(setProductsData)}
        rows={productsData}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        editMode="row"
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const dashboard = await protectDashboardPages(ctx);

    const { data } = await dashboard.from('products').select('id,name,type,category');

    return {
      props: {
        products: data?.reverse(),
      },
    };
  } catch (err: any) {
    return err;
  }
};
export default Dash;
