import { Cross1Icon } from '@radix-ui/react-icons';
import locatesInfo from '@root/locates-info2.json';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { shuffle } from 'utils/shuffle';

const LOCATES = shuffle(locatesInfo) as typeof locatesInfo;

export const Sidebar = ({
  setPostalCodeSubmitted,
  postalCodeSubmitted,
  setMarkerIds,
  markerIds,
  setLatitude,
  setLongitude,
  hasError,
}: {
  setPostalCodeSubmitted: (v: string | undefined) => void;
  postalCodeSubmitted?: string;
  setMarkerIds: React.Dispatch<React.SetStateAction<string[]>>;
  markerIds: string[];
  setLatitude: (v: number) => void;
  setLongitude: (v: number) => void;
  hasError: boolean;
}) => {
  const [isClient, setIsClient] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => setIsClient(true), []);

  return (
    <>
      <button
        className={clsx(
          'lg:hidden absolute left-[-6px] w-fit z-10 flex top-0 m-4 p-2 text-left rounded-sm bg-gray-200 text-gray-600',
          {
            'left-full -translate-x-[calc(100%+3rem)]': sidebarOpen,
            'top-10 bg-white w-[calc(100vw-10%)] max-w-max': !sidebarOpen,
          },
        )}
        aria-label="Toggle Sidebar"
        aria-labelledby="sidebar"
        title="Toggle Sidebar"
        onClick={handleSidebarToggle}
      >
        {sidebarOpen ? (
          <Cross1Icon className="w-5 h-5" />
        ) : (
          <span className="w-full flex">Conheça mais sobre o distribuidor</span>
        )}
      </button>
      <div
        className={clsx(
          'absolute top-0 left-0 h-full transition-all lg:translate-x-0 -translate-x-full',
          { 'translate-x-0': sidebarOpen },
        )}
      >
        <div className="custom-scrollbar left-0 min-w-80 max-w-xs w-full py-8 lg:py-4 overflow-y-auto px-4 h-full bg-white shadow-sm">
          <div className="pb-8 px-4">
            {postalCodeSubmitted && (
              <button
                className="bg-gray-300 flex items-center justify-center gap-2 w-fit p-1 px-4 rounded-full hover:bg-red-300"
                onClick={() => {
                  setPostalCodeSubmitted(undefined);
                  setMarkerIds([]);
                }}
              >
                {postalCodeSubmitted}
                <Cross1Icon className="w-3 h-3" />
              </button>
            )}
          </div>

          {isClient &&
            !hasError &&
            LOCATES.filter((locateInfo, i) =>
              markerIds.length ? markerIds.includes(locateInfo.id) : i <= 300,
            ).map((locale) => (
              <div
                className="flex flex-col mb-4 group overflow-hidden gap-2 shadow-md select-none cursor-pointer bg-gray-200 rounded-lg transition"
                key={locale.id}
                onClick={() => {
                  setPostalCodeSubmitted(locale.postalCode);
                  setLatitude(locale.lat);
                  setLongitude(locale.lng);

                  setTimeout(() => setMarkerIds([locale.id]), 500);
                }}
              >
                {/* {imageUrl?.length ? (
                  <div className="w-full min-h-[8rem] block overflow-hidden">
                    <Image
                      alt=""
                      src={imageUrl}
                      width={2080}
                      height={2080}
                      className="w-full h-full block group-hover:scale-110 transition object-cover object-center"
                    />
                  </div>
                ) : (
                  <></>locale
                )} */}
                <span
                  className="break-all px-2 text-sm pt-4"
                  dangerouslySetInnerHTML={{
                    __html: `${locale.company || ''}<br />${locale.distributor}<br />${
                      locale.phone
                    }<br />${locale.email}`,
                  }}
                />
                <div className="flex flex-col items-end px-2 gap-1 pb-4 text-xs">
                  <span>{`${locale.city}, ${locale.state}, ${locale.country}`}</span>
                  <span className="bg-gray-300 w-fit p-1 px-4 rounded-full">
                    {locale.postalCode}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
