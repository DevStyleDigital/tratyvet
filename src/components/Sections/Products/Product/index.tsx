// import { NewsletterForm } from 'components/NewsletterForm';
import { Title } from 'components/Title';
import { useLang } from 'hooks/use-lang';
import Image from 'next/image';
import { purifyText } from 'services/purifyText';
import { Product as ProductType } from 'types/product';

export const Product = ({ product }: { product: ProductType }) => {
  const { t } = useLang('products');
  return (
    <section className="max-desk mt-10 px-4">
      <Title subtitle={product.name} size="large">
        {product.category}
      </Title>

      <section className="flex h-full max-lg:flex-col gap-14">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={2000}
          height={2000}
          className="w-[92%] h-auto shadow-header object-cover max-lg:w-1/2 max-sm:w-full self-center"
        />

        <div className="flex w-full flex-col justify-between h-auto">
          <div className="w-full">
            <div dangerouslySetInnerHTML={{ __html: purifyText(product.desc) }} />

            <ul className="grid grid-cols-[repeat(3,auto)] gap-4 gap-y-8 mt-8 xs:justify-between max-xs:grid-cols-[repeat(2,auto)]">
              {Object.entries(product.items || {}).map(([itemKey, item], i) => {
                const itemExists =
                  item?.pack1 !== 'none' &&
                  item?.pack2 !== 'none' &&
                  item?.pack1 &&
                  item?.pack2;

                return !item?.pack1 && !item?.pack2 && !item?.pack3 ? null : (
                  <li key={itemKey} className="flex flex-col gap-1">
                    <span className="text-primary">
                      {t(`product.items.${itemKey}` as 'product')}
                    </span>
                    <div className="flex gap-2 font-bold text-xl text-secondary/80">
                      {[item?.pack1, item?.pack2, item?.pack3].map((pack, i, arr) =>
                        pack !== 'none' ? (
                          <>
                            {i > 0 && arr[i - 1] && arr[i - 1] !== 'none' ? '|' : ''}
                            <span key={i}>{(pack as string)?.replace(/[l]/, 'L')}</span>
                          </>
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
