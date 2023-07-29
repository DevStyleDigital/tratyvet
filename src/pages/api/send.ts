import { readFile } from 'fs/promises';
import { join } from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { mail } from 'services/mail';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      const { email, user_name, phone, message } = req.body;

      if (!email || !user_name || !phone || !message) throw '';
      const htmlTemplate = await readFile(
        join(process.cwd(), 'src/assets/html', 'mail.html'),
        'utf-8',
      );

      const replacedHTML = htmlTemplate
        .replaceAll('{{EMAIL}}', email)
        .replaceAll('{{USER_NAME}}', user_name)
        .replaceAll('{{PHONE}}', phone)
        .replaceAll('{{MESSAGE}}', message);

      await mail.transporter.sendMail({
        to: 'marketing@tratyvet.com.br',
        from: { name: 'Message from Website', address: process.env.MAIL! },
        replyTo: email,
        subject: 'Tratyvet Website',
        html: replacedHTML,
      });
      return res.status(200).end('Sended');
    } else {
      res.setHeader('Allow', 'POST');
      res.status(405).end('Method Not Allowed');
    }
  } catch (err: any) {
    return res.status(500).json({ error: { statusCode: 500, message: err.message } });
  }
}
