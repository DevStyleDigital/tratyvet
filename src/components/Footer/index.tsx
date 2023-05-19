import { Logo } from 'components/Logo';
import { useLang } from 'hooks/use-lang';
import { purifyText } from 'services/purifyText';

export const Footer = () => {
  const { t } = useLang();

  return (
    <footer className="flex flex-col mt-20 bg-primary items-center justify-center gap-8 p-8">
      <Logo invert logoSize="big" />
      <span
        className="text-white"
        dangerouslySetInnerHTML={{ __html: purifyText(t('footer.rights')) }}
      />
    </footer>
  );
};
