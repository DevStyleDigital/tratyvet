import colors from '@root/colors.json';
import { violet as violetColors } from 'tailwindcss/colors';
import { LocalShipping } from 'assets/svgs/local-shipping';
import { Button } from 'components/Button';
import { Title } from 'components/Title';
import { useLang } from 'hooks/use-lang';

export const Distributor = () => {
  const { t } = useLang('home');

  return (
    <section className="max-desk px-4">
      <Title subtitle={t('distributor.subtitle')}>{t('distributor.title')}</Title>

      <div className="flex gap-4 max-sm:px-4 max-sm:py-8 max-[1026px]:flex-col items-center justify-between bg-primary/20 border-l-[1rem] border-primary px-12 py-[4.5rem]">
        <p className="font-bold text-2xl max-sm:text-xl max-[1026px]:text-center max-w-lg">
          {t('distributor.card.text')}
        </p>
        <Button
          size="big"
          color={colors.secondary.DEFAULT}
          colorHover={violetColors[600]}
          href="/distributor"
          className="max-[434px]:flex-col max-[500px]:text-center"
        >
          <span>{t('distributor.card.button')}</span>
          <LocalShipping className="w-6 h-4" />
        </Button>
      </div>
    </section>
  );
};
