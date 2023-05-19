import { createTransport } from 'nodemailer';

export const mail = {
  transporter: createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.MAIL,
      pass: process.env.MAIL_PASS,
    },
  }),
};
