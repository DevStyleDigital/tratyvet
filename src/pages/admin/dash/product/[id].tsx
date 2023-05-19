import { ProductForm } from 'components/ProductsForm';
import { GetServerSideProps } from 'next';
import { protectDashboardPages } from 'services/supabase/protect-admin-pages';
import { Product } from 'types/product';

const Edit = ({ product }: { product: Product }) => {
  return (
    <div className="p-8 w-full">
      <ProductForm product={product} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const dashboard = await protectDashboardPages(ctx);
    const productId = ctx.params!.id;
    const { data, error } = await dashboard
      .from('products')
      .select('*')
      .eq('id', productId);

    if (!data || !data[0] || error)
      return {
        notFound: true,
      };

    return { props: { product: data[0] } };
  } catch (err: any) {
    return err;
  }
};
export default Edit;
