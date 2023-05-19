import HeroBanner from 'assets/imgs/hero-home-banner.png';
import { useLang } from 'hooks/use-lang';
import { purifyText } from 'services/purifyText';
import Image from 'next/image';
import { NewsletterForm } from 'components/NewsletterForm';

export const Hero = () => {
  const { t } = useLang('home');
  return (
    <section className="hero relative px-4 pb-8 md:pt-24 pt-10">
      <div className="max-desk flex items-center">
        <div className="flex flex-col z-10 max-[1150px]:text-center">
          <div className="mb-20">
            <span className="tracking-[0.4em] text-sm font-medium uppercase">
              {t('hero.subtitle')}
            </span>
            <h1 className="hero-title">{t('hero.title')}</h1>
            <p
              className="text-white"
              dangerouslySetInnerHTML={{
                __html: purifyText(t('hero.description')),
              }}
            />
          </div>
          <div>
            <NewsletterForm inputWhite />
            <div className="mt-12 w-full items-center flex">
              <div className="w-1/2">
                <span className="font-bold text-lg text-white">
                  {t('hero.info.clients.title')}
                </span>
                <p className="opacity-80 text-xs">{t('hero.info.clients.text')}</p>
              </div>
              <hr className="w-[2px] flex-shrink-0 flex mx-4 rounded-full h-12 mt-2 bg-secondary bg-opacity-30" />
              <div className="w-1/2">
                <span className="font-bold text-lg text-white">
                  {t('hero.info.states.title')}
                </span>
                <p className="opacity-80 text-xs">{t('hero.info.states.text')}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-[1150px]:absolute left-1/2 max-[1150px]:-translate-x-1/2 max-[1150px]:opacity-20 md:min-w-[30rem] min-[1150px]:-translate-y-[15%] max-sm:w-full">
          <Image src={HeroBanner} priority alt={t('hero.image-alt')} />
        </div>
      </div>
    </section>
  );
};
