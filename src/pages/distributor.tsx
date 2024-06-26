import colors from '@root/colors.json';
import { violet } from 'tailwindcss/colors';
import { Button } from 'components/Button';
import { useLang } from 'hooks/use-lang';
import { SearchIcon } from 'assets/svgs/search';
import { useState } from 'react';
import { Map } from 'components/Map';
import { getCordsByPostalCode } from 'services/getCordsByPostalCode';
import { Country, CountrySelector } from 'components/CountrySelector';
import { Distributor as DistributorType } from 'types/distributors';
import { NextPage } from 'next';
import Head from 'next/head';
import useSWR from 'swr';
import { supabaseClient } from 'services/supabase/client';

interface Props {
  distributors: DistributorType[];
}

const Distributor: NextPage<Props> = () => {
  const { t } = useLang('distributor');
  const { data } = useSWR(
    'distributors',
    async () =>
      await supabaseClient
        .from('distributors')
        .select('*')
        .order('created_at', { ascending: false }),
  );
  const [countrySelector, setCountrySelector] = useState<Country | null>();
  const [postalCode, setPostalCode] = useState<string | undefined>();
  const [postalCodesSubmitted, setPostalCodeSubmitted] = useState<string | undefined>();
  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<undefined | string>();
  const [fetchingCords, setFetchingCords] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  function handlePostalCode(v: undefined | string) {
    setPostalCode('');
    setPostalCodeSubmitted(v);
    setError(false);
    setErrorMsg(undefined);
  }

  const fetchLatLng = async () => {
    setFetchingCords(true);
    setError(false);
    setErrorMsg(undefined);
    setPostalCodeSubmitted(postalCode);
    getCordsByPostalCode(postalCode!, countrySelector?.code!)
      .then(({ coordinates: { lat, lng } }) => {
        setLatitude(lat);
        setLongitude(lng);
      })
      .catch((msg) => {
        setError(true);
        setErrorMsg(msg);
      })
      .finally(() => setFetchingCords(false));
  };

  return (
    <>
      <Head>
        <title>TratyVet | {t('title')}</title>
        <meta name="description" content={t('description')} />
      </Head>
      <section className="hero relative px-4 md:py-8 !py-8">
        <div className="max-w-[43rem] mx-auto flex flex-col items-center !justify-center md:justify-between ">
          <h1 className="hero-title text-center">{t('hero.title')}</h1>
          <form
            onSubmit={(ev) => {
              ev.preventDefault();
              fetchLatLng();
            }}
            className="flex-desk"
          >
            <CountrySelector onChange={setCountrySelector} />
            <div className="flex gap-4 items-center px-6 shadow-header rounded-lg bg-white py-4 w-full">
              <SearchIcon className="min-w-[1rem] min-h-[1rem] opacity-50 m-1" />
              <input
                type="text"
                required
                name="postal_code"
                placeholder={t('hero.input')}
                value={postalCode}
                className="bg-transparent w-full outline-none text-text placeholder:text-text/40 max-sm:placeholder:text-sm"
                onInput={(ev) => {
                  setPostalCode((ev.target as HTMLInputElement).value);
                  setErrorMsg(undefined);
                }}
              />
              <Button
                type="submit"
                color={colors.secondary.DEFAULT}
                colorHover={violet['600']}
              >
                {t('hero.button')}
              </Button>
            </div>
          </form>
          <span className={`mt-8${!fetchingCords ? ' text-red-600' : ''}`}>
            {fetchingCords ? (
              <>{t('loading')}</>
            ) : errorMsg ? (
              t(`error.${errorMsg}` as 'error')
            ) : (
              ''
            )}
          </span>
        </div>
      </section>
      <section className="w-full h-screen max-h-[calc(100vh-4.5rem)]">
        {data?.data && (
          <Map
            latitude={latitude}
            longitude={longitude}
            postalCodeSubmitted={postalCodesSubmitted}
            setPostalCodeSubmitted={handlePostalCode}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
            hasError={error}
            locatesInfo={data?.data}
          />
        )}
      </section>
    </>
  );
};

export default Distributor;
