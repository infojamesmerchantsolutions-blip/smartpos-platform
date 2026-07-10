export interface SmsOptions {

  to: string;

  message: string;

}

export default class SmsService {

  async send(

    options: SmsOptions

  ) {

    console.log(

      "SMS",

      options

    );

    return {

      success: true

    };

  }

}
