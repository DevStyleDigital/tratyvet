import { Cat } from 'assets/svgs/animals/cat';
import { Dog } from 'assets/svgs/animals/dog';
import { PetPaw } from 'assets/svgs/animals/pet-paw';
import clsx from 'clsx';
import { useLang } from 'hooks/use-lang';
import { useWindowSize } from 'hooks/window-size';
import React from 'react';

const POINTS = [
  {
    id: 1,
    Icon: PetPaw,
  },
  {
    id: 2,
    Icon: Cat,
  },
  {
    id: 3,
    Icon: Dog,
  },
];

export const Points = () => {
  const { t } = useLang('home');

  return (
    <section className="px-4 pb-8 pt-16">
      <div className="max-desk">
        <ul className="flex items-center gap-8 justify-between max-[703px]:flex-col max-[1075px]:!justify-center flex-wrap">
          {POINTS.map((point, i) => (
            <React.Fragment key={point.id}>
              <li className="flex items-center gap-4 max-w-[18.75rem]">
                <div className="rounded-full py-7 px-[1.125rem] border-[3px] border-primary">
                  <point.Icon />
                </div>
                <div>
                  <span className="font-sans-secondary font-semibold text-lg">
                    {t(`points.${point.id}.title` as 'points')}
                  </span>
                  <p className="text-sm opacity-80">
                    {t(`points.${point.id}.text` as 'points')}
                  </p>
                </div>
              </li>
              {i !== POINTS.length - 1 && (
                <hr
                  className={clsx('rounded-full w-2 bg-secondary h-2', {
                    'max-[1075px]:hidden': i === 1,
                    'max-[703px]:hidden': i === 0,
                  })}
                />
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </section>
  );
};
