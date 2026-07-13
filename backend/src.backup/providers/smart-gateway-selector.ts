import { PaymentProvider } from "@prisma/client";

export interface GatewaySelectionInput {

  merchantId: string;

  currency: string;

  amount: number;

  paymentMethod: string;

}

export default class SmartGatewaySelector {

  select(

    providers: PaymentProvider[],

    input: GatewaySelectionInput

  ): PaymentProvider {

    if (!providers.length) {

      throw new Error(

        "No payment providers available."

      );

    }

    const activeProviders =

      providers.filter(

        provider =>

          provider.isActive

      );

    if (!activeProviders.length) {

      throw new Error(

        "No active payment providers."

      );

    }

    const currencyMatch =

      activeProviders.find(

        provider =>

          provider.supportedCurrencies.includes(

            input.currency

          )

      );

    if (

      currencyMatch

    ) {

      return currencyMatch;

    }

    return activeProviders[0];

  }

}
