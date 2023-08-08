import { Button } from 'components/Button';
import { useLang } from 'hooks/use-lang';

import { Brazil } from 'assets/svgs/brazil';
import { Spain } from 'assets/svgs/spain';
import { UnitedState } from 'assets/svgs/united-state';

import { Link } from './Link';
import { LanguageSelect } from './LanguageSelect';
import { Logo } from 'components/Logo';
import clsx from 'clsx';
import { useState } from 'react';
import { ChevronDownIcon } from '@radix-ui/react-icons';

const LANGUAGE_OPTIONS = [
  {
    key: 'pt-br',
    name: 'PT-BR',
    Icon: ({ alt }: { alt: string }) => <Brazil aria-label={alt} className="w-6 h-6" />,
  },
  {
    key: 'en-us',
    name: 'US',
    Icon: ({ alt }: { alt: string }) => (
      <UnitedState aria-label={alt} className="w-6 h-6" />
    ),
  },
  {
    key: 'es-es',
    name: 'ESP',
    Icon: ({ alt }: { alt: string }) => <Spain aria-label={alt} className="w-6 h-6" />,
  },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  const { t, lang, changeLangTo } = useLang();

  return (
    <header className="sticky top-0 bg-white z-50 py-4 px-2 shadow-header">
      <div className="flex justify-between max-lg:justify-around max-sm:flex-col gap-4 items-center max-desk">
        <Logo />
        <div className="lg:hidden absolute -bottom-3 z-20">
          <button
            aria-describedby="navigation"
            className="bg-white p-1 rounded-full shadow-sm"
            onClick={() => setOpen((prev) => !prev)}
          >
            <span className="sr-only">{t('header.toggle-navigation')}</span>
            <ChevronDownIcon
              className={clsx('w-4 h-4 stroke-primary transition-all', {
                'rotate-180': open,
              })}
            />
          </button>
        </div>
        {open && (
          <div
            aria-hidden
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="bg-black/20 lg:hidden z-[8] bottom-0 left-0 w-screen h-[60vh] fixed"
          />
        )}
        <section
          id="navigation"
          className={clsx(
            'max-lg:absolute top-16 z-10 h-fit max-sm:top-32 max-lg:w-full',
          )}
        >
          <nav
            className={clsx(
              'bg-white transition-all h-fit p-8 max-lg:w-full text-center',
              {
                'max-lg:max-h-full h-full max-lg:visible': open,
                'max-lg:max-h-0 max-lg:invisible': !open,
              },
            )}
          >
            <ul className="flex gap-4 max-lg:flex-col">
              {[
                { href: '/', textPath: 'header.links.home' },
                { href: '/products', textPath: 'header.links.products.label' },
                { href: '/distributor', textPath: 'header.links.distributor' },
                {
                  href: '/becomes-distributor',
                  textPath: 'header.links.becomes-distributor',
                },
                // { href: '/#news', textPath: 'header.links.news' },
                { href: '/#about', textPath: 'header.links.about' },
              ].map((link) => (
                <li key={link.textPath}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="max-lg:w-full max-lg:after:bg-opacity-20 max-lg:flex max-lg:justify-center max-lg:items-center max-lg:after:rounded-md max-lg:after:-top-1 max-lg:after:let-0 max-lg:after:absolute max-lg:relative max-lg:after:!w-full max-lg:after:h-full"
                  >
                    {t(link.textPath as 'header')}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </section>
        <section className="flex items-center gap-8">
          <LanguageSelect
            defaultValue={lang}
            onValueChange={(value) => changeLangTo(value)}
          >
            {LANGUAGE_OPTIONS.map((option) => (
              <LanguageSelect.Option key={option.key} value={option.key}>
                <span className="flex items-center gap-2">
                  <option.Icon
                    alt={t(`languages-vector.${option.key}.alt` as 'languages-vector')}
                  />
                  <span>{option.name}</span>
                </span>
              </LanguageSelect.Option>
            ))}
          </LanguageSelect>
          <Button variant="outline" href="/#contact">
            {t('header.button')}
          </Button>
        </section>
      </div>
    </header>
  );
};
