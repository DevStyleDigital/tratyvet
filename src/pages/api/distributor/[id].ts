import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { readFileSync } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { formidableConfig, formidablePromise } from 'services/getFiles';
import { storage } from 'services/supabase/storage';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
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

    if (req.method === 'DELETE') {
      await supabase.from('distributors').delete().eq('id', id);
      return res.status(200).end('Deleted');
    }
    if (req.method === 'PUT') {
      const { error } = await supabase
        .from('distributors')
        .update(JSON.parse(req.body))
        .eq('id', id);

      console.log(error);
      if (error) throw '';

      return res.status(200).json({ message: 'Update' });
    } else {
      res.setHeader('Allow', 'POST');
      res.status(405).end('Method Not Allowed');
    }
  } catch (err: any) {
    return res.status(500).json({ error: { statusCode: 500, message: err.message } });
  }
}
