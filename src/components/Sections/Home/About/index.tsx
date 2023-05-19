import { Title } from 'components/Title';
import { useLang } from 'hooks/use-lang';
import DogImage from 'assets/imgs/dog.png';
import Image from 'next/image';
import { purifyText } from 'services/purifyText';

export const About = () => {
  const { t } = useLang('home');

  return (
    <section className="max-desk" id="about">
      <Title subtitle={t('about.subtitle')} size="large">
        {t('about.title')}
      </Title>

      <div className="flex px-3 max-lg:flex-col max-lg:text-center max-lg:gap-4 items-center">
        <div className="lg:min-w-[30.25rem] max-lg:!w-60 h-auto">
          <Image
            placeholder="blur"
            src={DogImage}
            alt={t('about.image-alt')}
            className="rounded-2xl shadow-sm w-full h-full"
            width={480}
            height={480}
          />
        </div>
        <p
          dangerouslySetInnerHTML={{ __html: purifyText(t('about.text')) }}
          className="lg:ml-9 text-xl"
        />
      </div>
    </section>
  );
};
