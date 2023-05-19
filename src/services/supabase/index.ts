import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Database } from 'types/supabase';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export const useDatabaseClient = () => useSupabaseClient<Database>();
