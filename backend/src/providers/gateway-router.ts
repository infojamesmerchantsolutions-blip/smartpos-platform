import BaseProvider from "./base.provider.js";
import ProviderManager from "./provider.manager.js";

export default class GatewayRouter {

  constructor(

    private readonly manager =
      new ProviderManager()

  ) {}

  provider(

    name: string

  ): BaseProvider {

    return this.manager.getProvider(

      name

    );

  }

}
