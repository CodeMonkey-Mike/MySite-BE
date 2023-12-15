import nodemailer from "nodemailer";

export interface IEmail {
  name: string;
  from: string;
  to?: string;
  subject: string;
  message: string;
}

export async function sendEmail({
  name,
  from,
  to = "mike@mikeneder.me",
  subject,
  message,
}: IEmail) {
  //the default SMTP transport
  const transporter = nodemailer.createTransport({
    name: "mail.dominitech.com", //smtp.ethereal.email
    host: "mail.dominitech.com", //smtp.ethereal.email
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "support@churdle.com", // generated ethereal user olaf.tremblay17@ethereal.email
      pass: "YV73OsCGkc", // generated ethereal password NFuCQgrbUHeVbQtUB4
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  // const transporter = nodemailer.createTransport({
  //   name: 'smtp.ethereal.email', //smtp.ethereal.email
  //   host: 'smtp.ethereal.email', //smtp.ethereal.email
  //   port: 587,
  //   secure: false, // true for 465, false for other ports
  //   auth: {
  //     user: 'olaf.tremblay17@ethereal.email', // generated ethereal user olaf.tremblay17@ethereal.email
  //     pass: 'NFuCQgrbUHeVbQtUB4', // generated ethereal password NFuCQgrbUHeVbQtUB4
  //   },
  //   tls: {
  //     rejectUnauthorized: false,
  //   },
  // });

  // send mail with defined transport object
  await transporter.sendMail({
    from: `${name} <${from}>`, // sender address
    to: to, // list of receivers
    subject: subject || "Contact from CM", // Subject line
    html: `<p>
    ${message}
    </p>`,
  });
}
