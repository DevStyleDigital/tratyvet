import * as Sections from 'components/Sections/Products';
import { GetStaticPaths, GetStaticProps } from 'next';
import { supabase } from 'services/supabase';
import { Product as ProductType } from 'types/product';

const Product = ({ product }: { product: ProductType }) => {
  return (
    <>
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
