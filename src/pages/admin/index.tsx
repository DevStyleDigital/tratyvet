import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { cookies } from 'services/cookies';
import { getDatabaseServer } from 'services/supabase/server';

const Admin = () => {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const router = useRouter();
  useEffect(() => {
    supabaseClient.auth.onAuthStateChange(() => {
      router.push('/admin/dash');
    });
  }, [router, supabaseClient]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="max-w-lg w-full">
        <h2 className="uppercase font-bold">LOGIN:</h2>
        <Auth
          supabaseClient={supabaseClient}
          appearance={{ theme: ThemeSupa }}
          showLinks={false}
        />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = getDatabaseServer(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      props: {},
    };

  return {
    redirect: {
      destination: '/admin/dash',
      permanent: false,
    },
  };
};

export default Admin;
