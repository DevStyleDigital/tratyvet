import colors from '@root/colors.json';
import { teal as tealColor } from 'tailwindcss/colors';
import clsx from 'clsx';

export const Button: BTypes.FC<{
  variant?: 'outline' | 'default';
  size?: 'big' | 'small';
  type?: 'submit' | 'button';
  colorHover?: string;
  disabled?: boolean;
  href?: string;
}> = ({
  variant = 'default',
  size = 'small',
  type = 'button',
  colorHover,
  href,
  color,
  ...props
}) => {
  const Comp = href ? 'a' : 'button';

  return (
    <Comp
      href={href}
      {...props}
      style={{
        ['--color' as string]: color || colors.primary,
        ['--color-hover' as string]: colorHover || tealColor[600],
        ...props.style,
      }}
      type={type}
      className={clsx(
        props.className,
        'rounded-lg transition-all flex items-center gap-4 group disabled:opacity-80',
        {
          'text-sm py-2 px-6': size === 'small',
          'py-4 px-8': size === 'big',
          'border-[var(--color)] text-[var(--color)] hover:text-white hover:bg-[var(--color)] border-2':
            variant === 'outline',
          'bg-[var(--color)] disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:text-gray-200 text-white transition-all hover:bg-[var(--color-hover)]':
            variant === 'default',
        },
      )}
    />
  );
};
