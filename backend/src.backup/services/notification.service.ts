import EmailService from "./email.service";
import SmsService from "./sms.service";
import PushNotificationService from "./push-notification.service";

export default class NotificationService {

  constructor(

    private readonly email =

      new EmailService(),

    private readonly sms =

      new SmsService(),

    private readonly push =

      new PushNotificationService()

  ) {}

  sendEmail(

    to: string,

    subject: string,

    html: string

  ) {

    return this.email.send({

      to,

      subject,

      html

    });

  }

  sendSms(

    to: string,

    message: string

  ) {

    return this.sms.send({

      to,

      message

    });

  }

  sendPush(

    token: string,

    title: string,

    body: string,

    data?: Record<string, any>

  ) {

    return this.push.send({

      token,

      title,

      body,

      data

    });

  }

}
