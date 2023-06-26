import HeroBanner from 'assets/imgs/hero-home-banner.png';
import { useLang } from 'hooks/use-lang';
import Image from 'next/image';
import { purifyText } from 'services/purifyText';

export const Hero = () => {
  const { t } = useLang('products');
  return (
    <section className="hero relative px-4 py-8 md:!pt-20 pt-10">
      <div className="max-desk flex items-center !justify-center md:justify-between min-h-[42vh]">
        <div className="max-[1150px]:absolute flex flex-col md:w-1/2 z-10 max-[1150px]:text-center">
          <h1 className="hero-title">{t('hero.title')}</h1>
          <span
            className="tracking-[0.4em] text-sm font-medium uppercase"
            dangerouslySetInnerHTML={{ __html: purifyText(t('hero.subtitle')) }}
          />
        </div>
        <div className="max-w-[60vw] left-1/2 max-[1150px]:opacity-20 w-[25rem]">
          <Image src={HeroBanner} priority alt={t('hero.image-alt')} />
        </div>
      </div>
    </section>
  );
};
