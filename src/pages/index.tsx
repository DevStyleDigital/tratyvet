import * as Sections from 'components/Sections/Home';
import { useLang } from 'hooks/use-lang';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { getDatabaseServer } from 'services/supabase/server';
import { Product } from 'types/product';
import { shuffle } from 'utils/shuffle';

const Home = ({
  products,
}: {
  products: Pick<Product, 'type' | 'id' | 'imageUrl' | 'name'>[];
}) => {
  const { t } = useLang();

  return (
    <>
      <Head>
        <title>TratyVet | {t('home.title')}</title>
        <meta name="description" content={t('home.description')} />
      </Head>

      <Sections.Hero />
      <Sections.Points />
      <hr className="separate-section" />
      <Sections.Products products={products} />
      <hr className="separate-section" />
      <Sections.Distributor />
      <hr className="separate-section" />
      <Sections.About />
      <hr className="separate-section" />
      <Sections.Contact />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const dashboard = getDatabaseServer(ctx);

    const { data } = await dashboard
      .from('products')
      .select('id,type,imageUrl,name')
      .eq('type', 'lines')
      .limit(8);

    const { data: data2 } = await dashboard
      .from('products')
      .select('id,type,imageUrl,name')
      .eq('type', 'colonies')
      .limit(8);

    return {
      props: {
        products: shuffle(data?.concat(data2 || []) || []),
      },
    };
  } catch (err: any) {
    return {
      props: {
        products: [],
      },
    };
  }
};

export default Home;
