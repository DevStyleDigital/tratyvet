import { v4 as uuidv4 } from 'uuid';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { storage } from 'services/supabase/storage';
import { readFileSync } from 'fs';
import { formidableConfig, formidablePromise } from 'services/getFiles';

export const config = {
  api: {
    bodyParser: false,
  },
};

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
      const { fields, files } = await formidablePromise(req, {
        ...formidableConfig,
      });

      const { file } = files;
      if (Array.isArray(file)) throw 'err';
      const fileBuffer = readFileSync(file.filepath);

      const id = uuidv4();
      const product = { ...JSON.parse(fields.product as string), id };
      const filenameSplit = file.originalFilename!.split('.');
      const fileExtension = filenameSplit[filenameSplit.length - 1];

      await storage.in('products').upload(`${id}/image.${fileExtension}`, fileBuffer);

      const imageUrl = storage.in(`products/${id}`).getUrl(`image.${fileExtension}`);

      await supabase.from('products').insert({ ...product, imageUrl });
      return res.status(200).end('Created');
    } else {
      res.setHeader('Allow', 'POST');
      res.status(405).end('Method Not Allowed');
    }
  } catch (err: any) {
    return res.status(500).json({ error: { statusCode: 500, message: err.message } });
  }
}
