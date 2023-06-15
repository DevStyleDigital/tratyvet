import { Cross1Icon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import locatesInfo from '@root/locates-info.json';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div
      className={clsx(
        'absolute top-0 left-0 h-full transition-all lg:translate-x-0 -translate-x-full',
        { 'translate-x-0': sidebarOpen },
      )}git 
    >
      <button
        className={clsx(
          'lg:hidden absolute right-0 w-fit flex top-0 m-4 p-2 text-left rounded-sm bg-gray-200 text-gray-600',
          {
            'top-10 bg-white w-[calc(100vw-10%)] max-w-max right-unset left-[calc(100%-6px)]':
              !sidebarOpen,
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
      <div className="custom-scrollbar left-0 min-w-80 py-8 lg:py-4 overflow-y-auto px-4 h-full bg-white shadow-sm">
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

        {!hasError &&
          locatesInfo
            .filter((locateInfo) =>
              markerIds.length ? markerIds.includes(locateInfo.id) : true,
            )
            .map(({ imageUrl, desc, id, locale, postalCode, ...coordinates }) => (
              <div
                className="flex flex-col mb-4 group overflow-hidden gap-2 shadow-md select-none cursor-pointer bg-gray-200 rounded-lg transition"
                key={id}
                onClick={() => {
                  setLatitude(coordinates.lat);
                  setLongitude(coordinates.lon);
                  setPostalCodeSubmitted(postalCode);
                  setMarkerIds([id]);
                }}
              >
                {imageUrl?.length ? (
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
                  <></>
                )}
                <span
                  className="break-all px-2 text-sm pt-4"
                  dangerouslySetInnerHTML={{ __html: desc.replaceAll(',', '<br />') }}
                />
                <div className="flex flex-col items-end px-2 gap-1 pb-4 text-xs">
                  <span>{locale}</span>
                  <span className="bg-gray-300 w-fit p-1 px-4 rounded-full">
                    {postalCode}
                  </span>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};
