import React from 'react';
import * as Select from '@radix-ui/react-select';
import clsx from 'clsx';
import { useWindowSize } from 'hooks/window-size';
import { useLang } from 'hooks/use-lang';

const LanguageSelectPortal: BTypes.FC = ({ children }) => {
  return (
    <Select.Portal
      className="
          fixed
          z-[1000]
          !bg-black
          !bg-opacity-20
          h-screen
          w-screen
          top-0
          left-0
          rounded-none

          [&>div]:absolute
          [&>div]:!flex-none
          [&>div]:rounded-md
          [&>div]:!bg-white
          [&>div]:!max-h-[70vh]
          [&>div]:!h-fit
          [&>div]:!w-48
          [&>div]:translate-y-[calc(-50%)]
          [&>div]:left-1/2
          [&>div]:translate-x-[calc(-50%)]
          [&>div]:top-1/2
          [&>div]:!m-0
        "
    >
      {children}
    </Select.Portal>
  );
};

export const LanguageSelect: BTypes.FC<{ onValueChange: (value: string) => void }> & {
  Option: BTypes.FC<{ value: string }>;
} = ({ children, className, defaultValue, onValueChange }) => {
  const { t } = useLang();
  const size = useWindowSize();
  const Container =
    size.width && size.width < 1024 ? LanguageSelectPortal : React.Fragment;

  return (
    <div
      className={clsx(className, {
        'relative w-full h-fit [&>div]:w-max [&>div]:!h-[unset] [&>div]:!absolute [&>div]:!min-w-0 [&>div]:!bottom-[unset] [&>div]:!left-[unset] [&>div]:!top-[unset] [&>div]:!justify-start':
          !(size.width && size.width < 1024),
      })}
    >
      <Select.Root defaultValue={defaultValue as string} onValueChange={onValueChange}>
        <Select.Trigger
          aria-label={t('languages_select')}
          className="text-primary outline-none translate-y-[12%] flex gap-3"
        >
          <Select.Value />
          <Select.Icon>
            <div className="h-2 w-2 relative translate-y-[15%]">
              <div className="border-b-2 border-primary border-r-2 transform rotate-45 absolute top-1/2 left-1/2 w-2 h-2" />
            </div>
          </Select.Icon>
        </Select.Trigger>
        <Container>
          <Select.Content className="bg-white py-2 rounded-md shadow-header">
            <Select.Viewport>{children}</Select.Viewport>
          </Select.Content>
        </Container>
      </Select.Root>
    </div>
  );
};

LanguageSelect.Option = function ({
  value,
  children,
}: BTypes.FCProps<{ value: string }>) {
  return (
    <Select.Item
      value={value}
      className="
        flex
        items-center
        h-6
        p-5
        relative
        select-none
        focus:bg-gray-1 00
        outline-none
        text-primary
        [&[data-state=checked]]:bg-primary
        [&[data-state=checked]]:text-white
        [&[data-state=checked]]:focus:bg-primary
      "
    >
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  );
};
