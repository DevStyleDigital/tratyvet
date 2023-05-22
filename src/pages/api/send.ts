import type { NextApiRequest, NextApiResponse } from 'next';
import { mail } from 'services/mail';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      const { email, user_name, phone, message } = req.body;

      if (!email || !user_name || !phone || !message) throw '';

      await mail.transporter.sendMail({
        to: 'marketing@tratyvet.com.br',
        from: process.env.MAIL,
        subject: 'Message from Website',
        html: [
          `<strong>Name:</strong> ${user_name}<br />`,
          `<strong>Email:</strong> ${email}<br />`,
          `<strong>Phone:</strong> ${phone}<br /><br />`,
          `<strong>Message:</strong> ${message}`,
        ].join(''),
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
