import colors from '@root/colors.json';
import { ArrowForward } from 'assets/svgs/arrow-forward';
import { Button } from 'components/Button';
import { useLang } from 'hooks/use-lang';
import { violet } from 'tailwindcss/colors';

export const NewsletterForm = ({
  inputWhite,
  className,
}: {
  inputWhite?: boolean;
  className?: string;
}) => {
  const { t } = useLang('home');
  return (
    <form
      className="flex flex-col"
      onSubmit={(ev) => {
        ev.preventDefault();
      }}
    >
      <label htmlFor="newsletter" className="mb-2">
        <span className="text-xs">{t('hero.newsletter.label')}</span>
      </label>
      <div
        className={`max-[1150px]:w-full max-[1150px]:items-center max-md:flex-col max-[1150px]:justify-center flex gap-4 ${className}`}
      >
        <input
          type="email"
          placeholder={t('hero.newsletter.placeholder')}
          className={`input md:!max-w-[19.5rem] w-full${
            inputWhite ? ' input-white' : ''
          }`}
          name="newsletter_email"
          required
          id="newsletter"
        />
        <Button
          type="submit"
          size="big"
          className="max-md:w-full sm:min-w-[15rem] !px-5 flex justify-center"
          color={colors.secondary}
          colorHover={violet['600']}
        >
          <span>{t('hero.newsletter.button')}</span>
          <ArrowForward className="w-6 h-6" />
        </Button>
      </div>
    </form>
  );
};
