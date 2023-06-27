import colors from '@root/colors.json';
import { ArrowForward } from 'assets/svgs/arrow-forward';
import { PlusCircleIcon } from 'assets/svgs/plus-circle';
import { Button } from 'components/Button';
import { Title } from 'components/Title';
import { useLang } from 'hooks/use-lang';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Product } from 'types/product';
import { ProductsHeader } from './ProductsHeader';
import { shuffle } from 'utils/shuffle';

export const Products = ({
  products,
}: {
  products: Pick<Product, 'type' | 'id' | 'imageUrl' | 'name'>[];
}) => {
  const { t } = useLang('home');
  const router = useRouter();
  const [productSelectedTag, setProductSelectedTag] = useState(
    (router.query.ptag as string) || 'all',
  );

  return (
    <section className="max-desk !max-w-[80rem]">
      <Title subtitle={t('products.subtitle')} size="large">
        {t('products.title')}
      </Title>

      <ProductsHeader
        value={productSelectedTag as 'all'}
        setValue={setProductSelectedTag}
      />
      <div className="flex items-center justify-center flex-col mt-10">
        <div className="flex px-3 flex-wrap mb-10">
          <ul className="w-full flex flex-wrap justify-center gap-8">
            {(productSelectedTag === 'all' ? shuffle(products) : products)
              .filter(
                ({ type }) => productSelectedTag === 'all' || type === productSelectedTag,
              )
              .filter((_, i) => i < 8)
              .map((product) => (
                <li
                  key={product.id}
                  className="group rounded-3xl overflow-hidden relative"
                >
                  <Link href={`/products/${product.id}`} className="flex w-fit h-fit">
                    <div className="group-hover:opacity-100 opacity-0 flex-col items-center justify-center w-full transition-all h-full flex bg-text/80 absolute top-0 left-0">
                      <PlusCircleIcon />
                      <p className="text-white text-xl">
                        {t('products.product-read-more')}
                      </p>
                    </div>
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={2000}
                      height={2000}
                      className="w-72 h-auto object-cover self-center"
                    />
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        <Button
          size="big"
          className="px-16"
          color={colors.secondary}
          variant="outline"
          href="/products"
        >
          <span>{t('products.button')}</span>
          <ArrowForward className="w-6 h-6 [&_path]:transition-all [&_path]:!fill-secondary group-hover:[&_path]:!fill-white" />
        </Button>
      </div>
    </section>
  );
};
