import { ProductForm } from 'components/ProductsForm';
import { GetServerSideProps } from 'next';
import { protectDashboardPages } from 'services/supabase/protect-admin-pages';

const Create = () => {
  return (
    <div className="p-8 w-full">
      <ProductForm />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    await protectDashboardPages(ctx);
    return { props: {} };
  } catch (err: any) {
    return err;
  }
};
export default Create;
