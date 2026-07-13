import nodemailer, {
  Transporter
} from "nodemailer";

import env from "../config/env.js";

export interface SendEmailOptions {

  to: string;

  subject: string;

  html: string;

  text?: string;

}

export default class EmailService {

  private transporter: Transporter;

  constructor() {

    this.transporter =

      nodemailer.createTransport({

        host:

          env.SMTP_HOST,

        port:

          Number(

            env.SMTP_PORT

          ),

        secure:

          env.SMTP_SECURE ===

          "true",

        auth: {

          user:

            env.SMTP_USER,

          pass:

            env.SMTP_PASSWORD

        }

      });

  }

  async send(

    options: SendEmailOptions

  ) {

    return this.transporter.sendMail({

      from:

        env.SMTP_FROM,

      to:

        options.to,

      subject:

        options.subject,

      html:

        options.html,

      text:

        options.text

    });

  }

}
