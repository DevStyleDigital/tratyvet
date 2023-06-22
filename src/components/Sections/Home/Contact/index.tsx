import { Title } from 'components/Title';
import { useLang } from 'hooks/use-lang';
import { Button } from 'components/Button';
import { http } from 'services/http';
import { useState } from 'react';
import { WhatsApp } from 'assets/svgs/whatsapp';

const CONTACT_WAYS = {
  address: [0],
  phone: [0, 1],
  email: [0, 1],
  'talk-traty-vet': [0, 1],
};

export const Contact = () => {
  const { t } = useLang('home');
  const [loading, setLoading] = useState(false);

  function handleEmail(values: {
    email: string;
    user_name: string;
    phone: string;
    message: string;
  }) {
    setLoading(true);

    http
      .post('/api/send', values)
      .then((res) => {
        alert('Seu email foi enviado!');
        return res;
      })
      .catch(() => {
        alert('Ops... algo aconteceu!');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <section className="max-desk px-4" id="contact">
      <Title subtitle={t('contact.subtitle')} size="large">
        {t('contact.title')}
      </Title>

      <div className="flex justify-between gap-16 max-[820px]:flex-col max-[820px]:items-center">
        <div className="max-w-sm">
          <span className="font-semibold block text-xl max-[820px]:text-center font-sans-secondary mb-8">
            {t('contact.ways.title')}
          </span>
          <ul className="flex flex-col gap-6 max-[820px]:text-center max-[820px]:items-center">
            {Object.entries(CONTACT_WAYS).map(([key, value]) => (
              <li key={key}>
                <span className="font-semibold font-sans-secondary">
                  {t(`contact.ways.${key}.title` as 'contact')}
                </span>
                <ul className="ml-4 flex flex-col max-[820px]:items-center">
                  {value.map((id) => (
                    <li key={key + id} className="flex">
                      <span className="w-1 h-1 flex-shrink-0 bg-text rounded-full mr-2 mt-[0.6rem]" />
                      {t(`contact.ways.${key}.${id}` as 'contact')}
                      {key === 'phone' && id === 1 ? (
                        <WhatsApp className="w-4 h-4 self-center ml-2" />
                      ) : null}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        <div className="min[960px]:max-w-[36.5rem] max-w-md w-full">
          <form
            onSubmit={async (ev) => {
              ev.preventDefault();
              handleEmail({
                user_name: ev.currentTarget.user_name.value,
                email: ev.currentTarget.email.value,
                phone: ev.currentTarget.phone.value,
                message: ev.currentTarget.message.value,
              });
              (ev.target as any).user_name.value = '';
              (ev.target as any).email.value = '';
              (ev.target as any).phone.value = '';
              (ev.target as any).message.value = '';
            }}
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              placeholder={t('contact.form.name')}
              className="input"
              name="user_name"
              required
            />
            <input
              type="email"
              placeholder={t('contact.form.email')}
              className="input"
              required
              name="email"
            />
            <input
              type="number"
              placeholder={t('contact.form.phone')}
              className="input"
              required
              name="phone"
            />
            <textarea
              name="message"
              className="input resize-none h-44"
              required
              placeholder={t('contact.form.message')}
            />
            <Button
              size="big"
              type="submit"
              disabled={loading}
              className="w-full font-sans-secondary"
            >
              <span className="w-full text-center">{t('contact.form.button')}</span>
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
