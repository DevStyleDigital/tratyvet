import { Button } from 'components/Button';
import { useLang } from 'hooks/use-lang';

import { Brazil } from 'assets/svgs/brazil';
import { Spain } from 'assets/svgs/spain';
import { UnitedState } from 'assets/svgs/united-state';

import { Link } from './Link';
import { LanguageSelect } from './LanguageSelect';
import { Logo } from 'components/Logo';

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
  const { t, lang, changeLangTo } = useLang();

  return (
    <header className="sticky top-0 bg-white z-50 py-4 px-2 shadow-header">
      <div className="flex justify-between max-lg:justify-around max-sm:flex-col gap-4 items-center max-desk">
        <Logo />
        <section className="max-lg:hidden">
          <nav>
            <ul className="flex gap-4">
              {[
                { href: '/', textPath: 'header.links.home' },
                { href: '/products', textPath: 'header.links.products.label' },
                { href: '/distributor', textPath: 'header.links.distributor' },
                // { href: '/#news', textPath: 'header.links.news' },
                { href: '/#about', textPath: 'header.links.about' },
              ].map((link) => (
                <li key={link.textPath}>
                  <Link href={link.href}>{t(link.textPath as 'header')}</Link>
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
          <Button variant="outline" href="#contact">
            {t('header.button')}
          </Button>
        </section>
      </div>
    </header>
  );
};
