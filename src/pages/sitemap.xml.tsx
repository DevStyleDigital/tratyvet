import { GetServerSideProps } from 'next';
import { supabase } from 'services/supabase';

import locales from 'i18n';

const URL = 'https://tratyvet.com.br';

function generateSiteMap(ids: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
      ${['', ...Object.keys(locales)].map(
        (lang) => `
          <url>
            <loc>${URL}${lang === '' ? '/' : `/${lang}`}</loc>
            <lastmod>2024-04-05T14:00:12.405Z</lastmod>
            <priority>1</priority>
          </url>
          <url>
            <loc>${URL}${lang === '' ? '/' : `/${lang}/`}distributor</loc>
            <lastmod>2024-04-05T14:00:12.405Z</lastmod>
            <priority>0.9</priority>
          </url>
          <url>
            <loc>${URL}${lang === '' ? '/' : `/${lang}/`}becomes-distributor</loc>
            <lastmod>2024-04-05T14:00:12.405Z</lastmod>
            <priority>0.9</priority>
          </url>
          <url>
            <loc>${URL}${lang === '' ? '/' : `/${lang}/`}products</loc>
            <lastmod>2024-04-05T14:00:12.405Z</lastmod>
            <priority>0.9</priority>
          </url>
          ${ids
            .map((id) => {
              return `
                <url>
                  <loc>${`${URL}${lang === '' ? '/' : `/${lang}/`}products/${id}`}</loc>
                  <priority>0.8</priority>
                </url>
              `;
            })
            .join('')}
        `,
      )}
    </urlset>
  `;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const { data } = await supabase.from('products').select('id');
  const sitemap = generateSiteMap(data?.map(({ id }) => id) || []);

  res.setHeader('Content-Type', 'text/xml');
  // Send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default function SiteMap() {}
