import StripeProvider from "./stripe.provider";
import PaystackProvider from "./paystack.provider";
import FlutterwaveProvider from "./flutterwave.provider";
import CoinbaseProvider from "./coinbase.provider";
import BinanceProvider from "./binance.provider";

import BaseProvider from "./base.provider";

import env from "../config/env";

export default class ProviderFactory {

  static create(

    provider: string

  ): BaseProvider {

    switch (

      provider.toLowerCase()

    ) {

      case "stripe":

        return new StripeProvider(

          env.STRIPE_SECRET_KEY

        );

      case "paystack":

        return new PaystackProvider(

          env.PAYSTACK_SECRET_KEY

        );

      case "flutterwave":

        return new FlutterwaveProvider(

          env.FLUTTERWAVE_SECRET_KEY

        );

      case "coinbase":

        return new CoinbaseProvider(

          env.COINBASE_API_KEY

        );

      case "binance":

        return new BinanceProvider(

          env.BINANCE_API_KEY,

          env.BINANCE_SECRET_KEY

        );

      default:

        throw new Error(

          `Unsupported provider: ${provider}`

        );

    }

  }

}
