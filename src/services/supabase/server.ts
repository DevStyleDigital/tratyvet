import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from 'types/supabase';

export const getDatabaseServer = (props: any) =>
  createServerSupabaseClient<Database>(props);
