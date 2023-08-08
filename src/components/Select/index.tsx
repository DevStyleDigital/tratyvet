import * as SelectRadix from '@radix-ui/react-select';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { useWindowSize } from 'hooks/window-size';

type SelectProps = {
  className?: string;
  label?: string;
  required?: boolean;
  placeholder: string;
  defaultValue?: string;
  value?: string;
  onValueChange: (value: string) => void;
};
type SelectOptionProps = BTypes.FC<{ value: string }, {}, false>;

export const Select: BTypes.FC<SelectProps, {}, false> & {
  Option: SelectOptionProps;
} = ({
  children,
  placeholder,
  label,
  value,
  className,
  defaultValue,
  onValueChange,
  ...props
}) => {
  const { width } = useWindowSize();

  return (
    <div className="relative w-full h-full [&_button]:h-full [&_button]:w-full [&>div]:w-full [&>div]:!absolute [&>div]:left-0">
      <SelectRadix.Root
        {...props}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
      >
        <SelectRadix.Trigger className="flex relative z-0 flex-col gap-2">
          {label && <span className="tracking-widest">{label}</span>}
          <div
            className={`input flex [&>span:nth-child(1)]:whitespace-nowrap [&>span:nth-child(1)]:w-[calc(100%-1.5rem)] [&>span]:flex [&>span]:overflow-hidden [&>span]:text-ellipsis justify-between !pr-2 ${className}`}
          >
            <SelectRadix.Value
              placeholder={<span className="opacity-40">{placeholder}</span>}
            />
            <SelectRadix.Icon className="min-w-[1.5rem] min-h-[1.5rem]">
              <CaretDownIcon className="min-w-[1.5rem] min-h-[1.5rem]" />
            </SelectRadix.Icon>
          </div>
        </SelectRadix.Trigger>
        <SelectRadix.Content
          sideOffset={8}
          position="popper"
          side={(width || 0) <= 768 ? 'bottom' : undefined}
          className="bg-white relative max-h-80 max-md:max-w-[90vw] z-50 border-gray-300 border-2 py-2 rounded-md"
        >
          <SelectRadix.Viewport className="!overflow-y-auto custom-scrollbar">
            {children}
          </SelectRadix.Viewport>
        </SelectRadix.Content>
      </SelectRadix.Root>
    </div>
  );
};

Select.Option = function ({ children, value }) {
  return (
    <SelectRadix.Item
      value={value}
      className="flex items-center h-6 p-5 relative select-none focus:bg-gray-200 outline-none [&[data-state=checked]]:bg-gray-300 [&[data-state=checked]]:focus:bg-gray-300"
    >
      <SelectRadix.ItemText>{children}</SelectRadix.ItemText>
    </SelectRadix.Item>
  );
};
