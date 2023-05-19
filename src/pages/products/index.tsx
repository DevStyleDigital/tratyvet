import * as Sections from 'components/Sections/Products';
import { GetServerSideProps } from 'next';
import { getDatabaseServer } from 'services/supabase/server';
import { Product } from 'types/product';

const Products = ({ products }: { products: Omit<Product, 'category' | 'items'>[] }) => {
  return (
    <>
      <Sections.Hero />
      <Sections.Products products={products} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const dashboard = getDatabaseServer(ctx);

    const { data } = await dashboard
      .from('products')
      .select('id,name,type,desc,imageUrl');

    return {
      props: {
        products: data,
      },
    };
  } catch (err: any) {
    return err;
  }
};

export default Products;
