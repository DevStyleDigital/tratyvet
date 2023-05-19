import { Montserrat } from '@next/font/google';
import clsx from 'clsx';
import { Sidebar } from 'components/Admin/Sidebar';
import { Footer } from 'components/Footer';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import { Header } from 'components/Header';
import { type AppProps } from 'next/app';
import { registerPlugin } from 'react-filepond';

import 'styles/global.css';
import 'react-quill/dist/quill.snow.css';

import 'filepond/dist/filepond.min.css';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import Head from 'next/head';

// Register the plugins
registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImageExifOrientation,
  FilePondPluginFileValidateSize,
  FilePondPluginImagePreview,
);

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-primary',
});

const MyApp: BTypes.NPage<AppProps> = ({ Component, pageProps, router }) => {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  return (
    <>
      <Head>
        <title>Tratyvet</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <style jsx global>{`
          html {
            font-family: ${montserrat.style.fontFamily};
          }
        `}</style>
        <div
          className={clsx(montserrat.variable, 'font-sans', {
            flex: router.route.includes('/admin'),
          })}
        >
          {router.route.includes('/admin/dash') ? (
            <Sidebar />
          ) : router.route.includes('/admin') ? (
            <></>
          ) : (
            <Header />
          )}
          <div className="w-full">
            <main
              className={router.route.includes('/admin') ? 'overflow-auto w-full' : ''}
            >
              <Component {...pageProps} />
            </main>
            {!['/admin', '/distributor'].includes(router.route) && <Footer />}
          </div>
        </div>
      </SessionContextProvider>
    </>
  );
};

export default MyApp;
