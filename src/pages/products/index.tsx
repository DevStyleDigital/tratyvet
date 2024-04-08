import * as Sections from 'components/Sections/Products';
import { useLang } from 'hooks/use-lang';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { getDatabaseServer } from 'services/supabase/server';
import { Product } from 'types/product';

const Products = ({ products }: { products: Omit<Product, 'category' | 'items'>[] }) => {
  const { t } = useLang('products');
  return (
    <>
      <Head>
        <title>TratyVet | {t('products.title')}</title>
        <meta name="description" content={t('products.subtitle')} />
      </Head>
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
