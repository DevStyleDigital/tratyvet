import countries from '@root/countries.json';
import { Select } from 'components/Select';
import { useLang } from 'hooks/use-lang';
import { useState, useEffect } from 'react';

export type Country = {
  name: string;
  code: string;
};

export const CountrySelector = ({
  onChange,
}: {
  onChange: (country: Country | null) => void;
}) => {
  const { t } = useLang();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const handleCountryChange = (code: string) => {
    const country = countries.find((c) => c === code) || null;
    setSelectedCountry({
      code: country!,
      name: t(`countries.${country}` as 'countries'),
    });
  };

  useEffect(() => {
    onChange(selectedCountry);
  }, [selectedCountry, onChange]);

  return (
    <div className="md:max-w-[13rem] w-full h-full">
      <Select
        required
        placeholder={t('distributor.hero.select')}
        className="input-white h-[4.25rem] [&>span:nth-child(1)]:w-full md:[&>span:nth-child(1)]:max-w-[10rem] items-center [&_span]:text-text !bg-white !pl-4 w-full"
        onValueChange={handleCountryChange}
      >
        {countries.map((country) => (
          <Select.Option key={country} value={country}>
            {t(`countries.${country}` as 'countries')}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};
