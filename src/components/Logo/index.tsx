import Image from 'next/image';
import colors from '@root/colors.json';
import LogoImage from 'assets/logo.png';
import { useLang } from 'hooks/use-lang';
import clsx from 'clsx';

export const Logo = ({
  invert,
  logoSize = 'small',
  logoOnly,
}: {
  invert?: boolean;
  logoSize?: 'big' | 'small';
  logoOnly?: boolean;
}) => {
  const { t } = useLang();

  return (
    <div
      className="flex items-center gap-2"
      style={{
        ['--color' as string]: invert ? colors.white : colors.primary,
      }}
    >
      <div
        className={clsx('bg-primary rounded-full overflow-hidden', {
          'w-10 h-auto rounded-none': logoSize === 'big',
          'w-10 h-10 p-2': logoSize === 'small',
        })}
      >
        <Image src={LogoImage} alt={t('logoAlt')} />
      </div>
      {!logoOnly && (
        <div className="flex flex-col items-center">
          <span className="font-bold text-sm text-[var(--color)]">TRATY VET</span>
          <span className="text-[0.5625rem] text-[var(--color)]">PET CARE</span>
        </div>
      )}
    </div>
  );
};
