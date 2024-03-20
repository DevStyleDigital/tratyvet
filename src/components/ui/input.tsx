import * as React from 'react';
import MaskedInput, { type Mask } from 'react-text-mask';
import { cn } from 'utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  render?: React.ReactNode;
  help?: string;
  icons?: [
    React.FC<{ className?: string }> | undefined | null,
    (React.FC<{ className?: string }> | null)?,
  ];
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, help, value, render, type, error, icons, ...props }, ref) => {
    return (
      <div className="flex flex-col h-fit w-full relative group">
        {!!render ? (
          render
        ) : (
          <input
            type={type}
            className={cn(error && '!border-destructive', 'input', className, {
              'pl-12': !!icons?.[0],
            })}
            ref={ref}
            {...{ ...props, value }}
          />
        )}
        <p className="absolute -bottom-6 text-muted-foreground text-sm">{help}</p>

        {icons?.map(
          (Icon, i) =>
            Icon && (
              <div
                key={i}
                className={cn('absolute top-1/2 -translate-y-1/2', {
                  'left-4': i === 0,
                  'right-4': i === 1,
                })}
              >
                <Icon className="w-6 h-6 text-muted-foreground" />
              </div>
            ),
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

const InputMask = React.forwardRef<
  HTMLInputElement,
  InputProps & { mask: Mask; showMask?: boolean }
>(({ mask, error, showMask, ...props }, ref) => {
  return (
    <MaskedInput
      mask={mask}
      guide={showMask}
      // ref={ref as (instance: MaskedInput | null) => void}
      {...props}
      render={(innerRef, inputProps) => (
        <Input
          ref={innerRef as (instance: HTMLInputElement | null) => void}
          error={error}
          {...inputProps}
        />
      )}
    />
  );
});
InputMask.displayName = 'InputMask';

export { Input, InputMask };
