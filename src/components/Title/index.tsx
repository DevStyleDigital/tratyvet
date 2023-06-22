import clsx from 'clsx';

export const Title: BTypes.FC<{ subtitle: string; size?: 'large' | 'small' }> = ({
  subtitle,
  children,
  size = 'small',
  ...props
}) => {
  return (
    <div
      {...props}
      className={clsx(
        props.className,
        'max-w-[25rem] mb-10 mx-auto flex flex-col items-center text-center',
        {
          'max-w-[40rem]': size === 'large',
        },
      )}
    >
      <div className="flex flex-col mb-3">
        <h1 className="text-primary text-3xl font-semibold uppercase font-sans-secondary">
          {children}
        </h1>
        <span className="w-4/5 self-center h-px bg-secondary" />
      </div>
      <h2 className="text-xl font-medium">{subtitle}</h2>
    </div>
  );
};
