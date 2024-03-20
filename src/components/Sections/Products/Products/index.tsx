import colors from '@root/colors.json';
import { violet } from 'tailwindcss/colors';
import { Button } from 'components/Button';
import { Title } from 'components/Title';
import { useLang } from 'hooks/use-lang';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { purifyText } from 'services/purifyText';
import { Product } from 'types/product';
import { ProductsHeader } from './ProductsHeader';
import { PlusIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export const Products = ({
  products,
}: {
  products: Omit<Product, 'category' | 'items'>[];
}) => {
  const { t, lang } = useLang('products');
  const router = useRouter();
  const [productSelectedType, setProductSelectedType] = useState(
    (router.query.ptype as string) || 'lines',
  );

  return (
    <section className="max-desk mt-10 px-4">
      <Title subtitle={t('products.subtitle')} size="large">
        {t('products.title')}
      </Title>

      <ProductsHeader
        value={productSelectedType as 'all'}
        setValue={setProductSelectedType}
      />

      <div className="mt-10">
        <ul className="grid grid-cols-4 gap-8 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          {products
            .filter(({ type }) => type === productSelectedType)
            .map((product) => (
              <li
                key={product.id}
                className="shadow-header rounded-lg transition-transform hover:scale-105"
              >
                <Link
                  href={`/products/${product.id}`}
                  className="flex flex-col items-center p-4 gap-2 h-full"
                >
                  <Image
                    src={product.imageUrl}
                    alt={
                      product.name?.[lang!.toLowerCase()] ||
                      `product.name.${lang!.toLowerCase()}`
                    }
                    width={2000}
                    height={2000}
                    className="w-auto h-52 object-cover"
                  />
                  <div className="flex flex-col w-full justify-between h-full">
                    <div className="flex self-start flex-col gap-4">
                      <span className="font-bold">
                        {product.name?.[lang!.toLowerCase()] ||
                          `product.name.${lang!.toLowerCase()}`}
                      </span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: purifyText(
                            product.desc?.[lang!.toLowerCase()] ||
                              `product.desc.${lang!.toLowerCase()}`,
                          ),
                        }}
                        className="[&>p]:max-h-16 [&>p]:[display:-webkit-box] text-sm [&>p]:[-webkit-line-clamp:3] [&>p]:[-webkit-box-orient:vertical] [&>p]:overflow-hidden [&>p]:text-ellipsis"
                      />
                    </div>
                    <Button
                      size="big"
                      className="w-full flex justify-center mt-4"
                      color={colors.secondary.DEFAULT}
                      colorHover={violet['600']}
                    >
                      <PlusIcon className="w-6 h-6" />
                      <span>{t('products.read-more')}</span>
                    </Button>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};
