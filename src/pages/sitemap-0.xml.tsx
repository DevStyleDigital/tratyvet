import { GetServerSideProps } from 'next';
import { supabase } from 'services/supabase';

import locales from 'i18n';

const URL = 'https://tratyvet.com.br';

function generateSiteMap(ids: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
      xmlns:xhtml="http://www.w3.org/1999/xhtml"
      xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
      xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">

      ${['', ...Object.keys(locales)].map(
        (lang) => `
          <url>
            <loc>https://tratyvet.com.br${lang === '' ? '/' : `/${lang}`}</loc>
            <lastmod>2024-04-05T14:00:12.405Z</lastmod>
            <priority>1</priority>
          </url>
          <url>
            <loc>https://tratyvet.com.br${
              lang === '' ? '/' : `/${lang}/`
            }distributor</loc>
            <lastmod>2024-04-05T14:00:12.405Z</lastmod>
            <priority>0.9</priority>
          </url>
          <url>
            <loc>https://tratyvet.com.br${
              lang === '' ? '/' : `/${lang}`
            }becomes-distributor</loc>
            <lastmod>2024-04-05T14:00:12.405Z</lastmod>
            <priority>0.9</priority>
          </url>
          <url>
            <loc>https://tratyvet.com.br${lang === '' ? '/' : `/${lang}/`}products</loc>
            <lastmod>2024-04-05T14:00:12.405Z</lastmod>
            <priority>0.9</priority>
          </url>
          ${ids
            .map((id) => {
              return `
                <url>
                  <loc>${`https://tratyvet.com.br${
                    lang === '' ? '/' : `/${lang}/`
                  }products/${id}`}</loc>
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
