import clsx from 'clsx';
import NextLink, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

export const Link: BTypes.FC<LinkProps> = ({ ...props }) => {
  const router = useRouter();

  return (
    <NextLink
      {...props}
      className={clsx(
        props.className,
        'text-primary transition-opacity tracking-[0.12em] text-sm opacity-70  hover:opacity-100 cursor-pointer pb-2',
        {
          'font-semibold after:contents-[""] after:mx-auto after:block after:w-10/12 after:h-[2px] after:bg-secondary':
            router.asPath === props.href,
        },
      )}
    />
  );
};
