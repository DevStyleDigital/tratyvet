import clsx from 'clsx';
import { useLang } from 'hooks/use-lang';
import Link from 'next/link';
import React from 'react';

type Item = { key: string; value: string };

export const CustomHeader = ({
  items,
  query,
  value,
  setValue,
}: {
  query: string;
  items: Item[];
  value: Item['value'];
  setValue: (value: Item['value']) => void;
}) => {
  const { t } = useLang();

  return (
    <div className="overflow-x-auto py-4 w-full flex flex-col">
      <div className="mx-auto w-fit">
        <nav>
          <ul className="flex w-fit bg-secondary/30 rounded-full items-center">
            {items.map((item, i) => (
              <React.Fragment key={item.key}>
                <li className="flex">
                  <Link
                    href={`?${query}=${item.value}`}
                    onClick={() => setValue(item.value)}
                    scroll={false}
                    className={clsx(
                      'px-11 py-4 whitespace-nowrap font-bold transition-all',
                      {
                        'rounded-full bg-secondary hover:bg-secondary/80 text-white':
                          value === item.value,
                        'text-secondary hover:underline': value !== item.value,
                      },
                    )}
                  >
                    {t(item.key as 'tags')}
                  </Link>
                </li>
                {((value !== item.value && value !== items[i + 1]?.value) ||
                  i === items.length - 1) && (
                  <span className="w-px flex flex-shrink-0 rounded-full bg-secondary/20 h-4" />
                )}
              </React.Fragment>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};
