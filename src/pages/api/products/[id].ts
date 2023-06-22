import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { readFileSync } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { formidableConfig, formidablePromise } from 'services/getFiles';
import { storage } from 'services/supabase/storage';
import { v4 as uuidv4 } from 'uuid';

export const config = {
  api: {
    bodyParser: false,
  },
};

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
      await supabase.from('products').delete().eq('id', id);
      await storage.in(`products/${id}`).delete('image.webp');
      return res.status(200).end('Deleted');
    }
    if (req.method === 'PUT') {
      const { fields, files } = await formidablePromise(req, {
        ...formidableConfig,
      });

      const { file } = files;
      if (Array.isArray(file)) throw 'err';

      const product = { ...JSON.parse(fields.product as string) };
      let imageUrl = undefined;
      if (file) {
        const fileBuffer = readFileSync(file.filepath);
        await storage.in('products').update(`${id}/image.webp`, fileBuffer);
        imageUrl = storage.in(`products/${id}`).getUrl('image.webp');
      }

      await supabase
        .from('products')
        .update({ ...product, imageUrl })
        .eq('id', id);
      return res.status(200).end('Update');
    } else {
      res.setHeader('Allow', 'POST');
      res.status(405).end('Method Not Allowed');
    }
  } catch (err: any) {
    return res.status(500).json({ error: { statusCode: 500, message: err.message } });
  }
}
