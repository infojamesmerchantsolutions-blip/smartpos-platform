import StripeProvider from "./stripe.provider.js";
import PaystackProvider from "./paystack.provider.js";
import FlutterwaveProvider from "./flutterwave.provider.js";
import CoinbaseProvider from "./coinbase.provider.js";
import BinanceProvider from "./binance.provider.js";

import BaseProvider from "./base.provider.js";

import env from "../config/env.js";

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
