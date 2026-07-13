import BaseProvider from "./base.provider";
import ProviderFactory from "./provider.factory";

export default class ProviderManager {

  private readonly providers =
    new Map<
      string,
      BaseProvider
    >();

  getProvider(

    provider: string

  ): BaseProvider {

    if (

      this.providers.has(

        provider

      )

    ) {

      return this.providers.get(

        provider

      )!;

    }

    const instance =

      ProviderFactory.create(

        provider

      );

    this.providers.set(

      provider,

      instance

    );

    return instance;

  }

  hasProvider(

    provider: string

  ) {

    return this.providers.has(

      provider

    );

  }

  clear() {

    this.providers.clear();

  }

}
