import { GetServerSidePropsContext } from 'next';
import { getDatabaseServer } from './server';

export const protectDashboardPages = async (ctx: GetServerSidePropsContext) => {
  const dashboard = getDatabaseServer(ctx);
  const {
    data: { session },
  } = await dashboard.auth.getSession();

  if (!session)
    throw {
      notFound: true,
    };

  return dashboard;
};
