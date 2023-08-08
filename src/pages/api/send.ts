import { readFile } from 'fs/promises';
import { join } from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { mail } from 'services/mail';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      const data = req.body;

      if (!Object.values(data).length) throw '';
      let htmlTemplate = await readFile(
        join(
          process.cwd(),
          'src/assets/mail',
          data.mail_template ? `${data.mail_template}.html` : 'mail.html',
        ),
        'utf-8',
      );

      Object.entries(data).forEach(([key, value]) => {
        htmlTemplate = htmlTemplate.replaceAll(
          `{{${key.toUpperCase()}}}`,
          value as string,
        );
      });

      await mail.transporter.sendMail({
        to: 'marketing@tratyvet.com.br',
        from: { name: 'Message from Website', address: process.env.MAIL! },
        replyTo: data.email,
        subject: 'Tratyvet Website',
        html: htmlTemplate,
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
