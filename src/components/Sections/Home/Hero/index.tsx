import HeroBanner from 'assets/imgs/hero-home-banner.webp';
import { useLang } from 'hooks/use-lang';
import { purifyText } from 'services/purifyText';
import Image from 'next/image';
// import { NewsletterForm } from 'components/NewsletterForm';

export const Hero = () => {
  const { t } = useLang('home');
  return (
    <section className="hero relative px-4 py-16">
      <div className="max-desk flex items-center">
        <div className="flex flex-col z-10 max-[1150px]:text-center">
          <div>
            <span className="tracking-[0.4em] mb-5 block text-sm font-medium uppercase">
              {t('hero.subtitle')}
            </span>
            <h1 className="hero-title max-md:text-center">{t('hero.title')}</h1>
            <p
              className="text-white text-justify"
              dangerouslySetInnerHTML={{
                __html: purifyText(t('hero.description')),
              }}
            />
          </div>
          <hr className="w-full flex-shrink-0 flex my-8 rounded-full h-[2px] bg-secondary bg-opacity-30" />
          <div>
            {/* <NewsletterForm inputWhite /> */}
            <div className="w-full items-center flex max-sm:flex-col">
              <div className="sm:w-1/2">
                <span className="font-bold text-lg text-white">
                  {t('hero.info.clients.title')}
                </span>
                <p className="opacity-80 text-xs font-bold">
                  {t('hero.info.clients.text')}
                </p>
              </div>
              <hr className="w-[2px] max-sm:hidden flex-shrink-0 flex mx-4 rounded-full h-12 sm:mt-2 bg-secondary bg-opacity-30" />
              <div className="sm:w-1/2 max-sm:mt-4">
                <span className="font-bold text-lg text-white">
                  {t('hero.info.states.title')}
                </span>
                <p className="opacity-80 text-xs font-bold">
                  {t('hero.info.states.text')}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-[1150px]:absolute left-1/2 min-[1150px]:ml-10 max-[1150px]:-translate-x-1/2 max-[1150px]:opacity-20 md:min-w-[30rem] min-[1150px]:-translate-y-[5%] max-sm:w-full">
          <Image src={HeroBanner} priority alt={t('hero.image-alt')} />
        </div>
      </div>
    </section>
  );
};
