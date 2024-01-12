import * as Sections from 'components/Sections/Home';
import { GetServerSideProps } from 'next';
import { getDatabaseServer } from 'services/supabase/server';
import { Product } from 'types/product';

const Home = ({
  products,
}: {
  products: Pick<Product, 'type' | 'id' | 'imageUrl' | 'name'>[];
}) => {
  return (
    <>
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

    const { data } = await dashboard.from('products').select('id,type,imageUrl,name');

    return {
      props: {
        products: data || [],
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
