// import { NewsletterForm } from 'components/NewsletterForm';
import { Title } from 'components/Title';
import { useLang } from 'hooks/use-lang';
import Image from 'next/image';
import { purifyText } from 'services/purifyText';
import { Product as ProductType } from 'types/product';

export const Product = ({ product }: { product: ProductType }) => {
  const { t, lang } = useLang('products');
  return (
    <section className="max-desk mt-10 px-4">
      <Title
        subtitle={
          product.name?.[lang!.toLowerCase()] || `product.name.${lang!.toLowerCase()}`
        }
        size="large"
      >
        {t(
          `types.${
            product.type.toLowerCase().includes('lines') ? '0' : '1'
          }` as 'product',
        )}
      </Title>

      <section className="flex h-full max-lg:flex-col gap-14">
        <Image
          src={product.imageUrl}
          alt={
            product.name?.[lang!.toLowerCase()] || `product.name.${lang!.toLowerCase()}`
          }
          width={2000}
          height={2000}
          className="h-auto shadow-header object-cover w-[32rem] max-sm:w-full self-center"
        />

        <div className="flex w-full flex-col justify-between h-auto">
          <div className="w-full">
            <p
              dangerouslySetInnerHTML={{
                __html: purifyText(
                  product.desc?.[lang!.toLowerCase()] ||
                    `product.desc.${lang!.toLowerCase()}`,
                ),
              }}
            />

            <ul className="flex flex-wrap gap-8 justify-between max-md:justify-center mt-10">
              {Object.entries(product.items || {}).map(([itemKey, item]) => {
                const packs = Object.values(item || {});
                return packs.every((pack) => !pack || pack === 'none') ? null : (
                  <li key={itemKey} className="flex flex-col gap-1">
                    <span className="text-primary max-md:text-center">
                      {t(`product.items.${itemKey}` as 'product')}
                    </span>
                    <div className="flex gap-2 max-[301px]:text-base font-bold text-xl text-secondary/80">
                      {packs.map((pack, i, arr) =>
                        pack !== 'none' ? (
                          <span key={i}>
                            {i > 0 && arr[i - 1] && arr[i - 1] !== 'none' ? '| ' : ''}
                            <span>{(pack as string)?.replace(/[l]/, 'L')}</span>
                          </span>
                        ) : null,
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
            <hr className="w-full h-[2px] bg-secondary/20 my-8" />
          </div>
          {/* <NewsletterForm className="max-lg:flex-col [&_button]:w-full [&_input,&_button]:!max-w-full" /> */}
        </div>
      </section>
    </section>
  );
};
