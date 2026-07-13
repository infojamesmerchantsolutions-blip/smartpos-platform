import BaseProvider from "./base.provider.js";
import ProviderManager from "./provider.manager.js";

export default class ProviderFailover {

  constructor(

    private readonly manager =
      new ProviderManager()

  ) {}

  getAvailableProvider(

    providers: string[]

  ): BaseProvider {

    let lastError: unknown;

    for (

      const provider of providers

    ) {

      try {

        return this.manager.getProvider(

          provider

        );

      } catch (error) {

        lastError = error;

      }

    }

    throw lastError ??
      new Error(

        "No payment provider available."

      );

  }

}
