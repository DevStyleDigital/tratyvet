/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        hostname: '**.supabase.co',
      },
    ],
  },
  i18n: {
    locales: ['default', 'pt-br', 'en-us', 'es-es'],
    defaultLocale: 'default',
  },
};

module.exports = nextConfig;
