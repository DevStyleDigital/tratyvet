import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  try {
    const supabase = createServerSupabaseClient(
      { req, res },
      {
        supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      },
    );
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw Error('not authenticated');

    if (req.method === 'POST') {
      const { data, error } = await supabase
        .from('distributors')
        .insert(JSON.parse(req.body))
        .select('*')
        .single();
      if (error || !data) throw '';
      return res.status(201).json(data);
    } else {
      res.setHeader('Allow', 'POST');
      res.status(405).end('Method Not Allowed');
    }
  } catch (err: any) {
    return res.status(500).json({ error: { statusCode: 500, message: err.message } });
  }
}
