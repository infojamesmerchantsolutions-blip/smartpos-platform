import BaseProvider from "./base.provider";
import ProviderManager from "./provider.manager";

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
