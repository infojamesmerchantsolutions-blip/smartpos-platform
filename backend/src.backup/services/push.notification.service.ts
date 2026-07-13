export interface PushNotificationOptions {

  token: string;

  title: string;

  body: string;

  data?: Record<string, any>;

}

export default class PushNotificationService {

  async send(

    notification:

      PushNotificationOptions

  ) {

    console.log(

      "Push Notification",

      notification

    );

    return {

      success: true

    };

  }

}
