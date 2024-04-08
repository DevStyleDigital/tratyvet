import * as Sections from 'components/Sections/Products';
import { useLang } from 'hooks/use-lang';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { purifyText } from 'services/purifyText';
import { supabase } from 'services/supabase';
import { Product as ProductType } from 'types/product';

const Product = ({ product }: { product: ProductType }) => {
  const { lang } = useLang('products');

  return (
    <>
      <Head>
        <title>
          TratyVet |{' '}
          {product.name?.[lang!.toLowerCase()] || `product.name.${lang!.toLowerCase()}`}
        </title>
        <meta
          name="description"
          content={
            product.desc?.[lang!.toLowerCase()].replace(/(<([^>]+)>)/gi, '') ||
            `product.desc.${lang!.toLowerCase()}`
          }
        />
      </Head>
      <Sections.Hero />
      <Sections.Product product={product} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await supabase.from('products').select('id');
  return {
    paths: data?.map(({ id }) => ({ params: { productId: id } })) || [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', ctx.params?.productId);

  if (!data || !data[0] || error) return { notFound: true };

  return {
    props: {
      product: data![0],
    },
    revalidate: 1,
  };
};

export default Product;
