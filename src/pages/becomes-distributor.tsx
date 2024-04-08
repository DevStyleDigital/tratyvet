import { Button } from 'components/Button';
import { Select } from 'components/Select';
import { Title } from 'components/Title';
import { useLang } from 'hooks/use-lang';
import Head from 'next/head';
import { useState } from 'react';
import { http } from 'services/http';

const BecomesDistributor = () => {
  const { t } = useLang('becomes_distributor');
  const [loading, setLoading] = useState(false);
  const [havePartners, setHavePartners] = useState<string | undefined>(undefined);
  const [selectKey, setSelectKey] = useState<number>(+new Date());

  return (
    <>
      <Head>
        <title>TratyVet | {t('title_meta')}</title>
        <meta name="description" content={t('title')} />
      </Head>
      <section className="max-desk px-4 pt-10 min-h-full-page">
        <Title size="large">{t('title')}</Title>
        <form
          className="flex flex-col gap-4 [&_span]:font-bold"
          onSubmit={(ev) => {
            ev.preventDefault();
            setLoading(true);
            const [year, month, day] = ev.currentTarget.birth_date.value.split('-');
            const data = {
              name: ev.currentTarget.full_name.value,
              birth_date: `${day}/${month}/${year}`,
              email: ev.currentTarget.email.value,
              phone: ev.currentTarget.phone.value,
              city: ev.currentTarget.city.value,
              state: ev.currentTarget.state.value,
              profession: ev.currentTarget.profession.value,
              have_partners: havePartners,
              about: ev.currentTarget.about.value,
              expectations: ev.currentTarget.expectations.value,
            };

            http
              .post('/api/send', { mail_template: 'becomes_distributor', ...data })
              .then((res) => {
                alert(t('email.success'));

                (ev.target as unknown as { reset: () => void }).reset();
                setHavePartners(undefined);
                setSelectKey(+new Date());

                return res;
              })
              .catch((err) => console.log(err))
              .finally(() => setLoading(false));
          }}
        >
          {[
            [
              { type: 'text', id: 'full_name' },
              { type: 'email', id: 'email' },
            ],
            [
              { type: 'tel', id: 'phone' },
              { type: 'date', id: 'birth_date' },
            ],
            [
              { type: 'text', id: 'city' },
              { type: 'text', id: 'state' },
              { type: 'text', id: 'profession' },
            ],
          ].map((items, i) => (
            <section key={i} className="flex gap-4 max-md:flex-col">
              {items.map(({ id, type }) => (
                <label htmlFor={id} key={id} className="w-full self-end">
                  <span>{t(`form.${id}.label` as 'form')}:</span>
                  <input
                    type={type}
                    placeholder={t(`form.${id}.placeholder` as 'form')}
                    className="input"
                    name={id}
                    id={id}
                    required
                  />
                </label>
              ))}
            </section>
          ))}

          <label
            htmlFor="have_partners"
            key="have_partners"
            className="mb-8 md:max-w-xs w-full"
          >
            <span>{t('form.have_partners.label')}:</span>
            <Select
              key={selectKey}
              required
              placeholder={t('form.have_partners.placeholder')}
              onValueChange={(v) => setHavePartners(v)}
              value={havePartners}
            >
              <Select.Option value="Sim">
                {t('form.have_partners.options.0')}
              </Select.Option>
              <Select.Option value="Não">
                {t('form.have_partners.options.1')}
              </Select.Option>
            </Select>
          </label>

          {['about', 'expectations'].map((id) => (
            <label htmlFor={id} key={id} className="block w-full">
              <span>{t(`form.${id}.label` as 'form')}</span>
              <textarea
                name={id}
                id={id}
                className="input resize-none h-44"
                required
                placeholder={t(`form.${id}.placeholder` as 'form')}
              />
            </label>
          ))}

          <Button
            size="big"
            type="submit"
            disabled={loading}
            className="w-full font-sans-secondary"
          >
            <span className="w-full text-center">{t('form.button')}</span>
          </Button>
        </form>
      </section>
    </>
  );
};

export default BecomesDistributor;
