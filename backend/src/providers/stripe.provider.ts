import Stripe from "stripe";

import BaseProvider, {

  CreatePaymentInput,

  RefundPaymentInput,

  VerifyPaymentInput,

  ProviderResponse

} from "./base.provider";

export default class StripeProvider extends BaseProvider {

  readonly name = "stripe";

  private stripe: Stripe;

  constructor(

    secretKey: string

  ) {

    super();

    this.stripe = new Stripe(

      secretKey,

      {

        apiVersion:
          "2025-06-30.basil"

      }

    );

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
