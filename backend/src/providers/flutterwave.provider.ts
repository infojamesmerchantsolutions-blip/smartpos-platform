import axios from "axios";

import BaseProvider, {

  CreatePaymentInput,

  RefundPaymentInput,

  VerifyPaymentInput,

  ProviderResponse

} from "./base.provider";

export default class FlutterwaveProvider extends BaseProvider {

  readonly name = "flutterwave";

  constructor(

    private readonly secretKey: string

  ) {

    super();

  }

  async createPayment(

    input: CreatePaymentInput

  ): Promise<ProviderResponse> {

    throw new Error(

      "Not implemented."

    );

  }

  async verifyPayment(

    input: VerifyPaymentInput

  ): Promise<ProviderResponse> {

    throw new Error(

      "Not implemented."

    );

  }

  async refundPayment(

    input: RefundPaymentInput

  ): Promise<ProviderResponse> {

    throw new Error(

      "Not implemented."

    );

  }

  async validateWebhook(

    payload: any,

    signature: string

  ): Promise<boolean> {

    throw new Error(

      "Not implemented."

    );

  }

}
