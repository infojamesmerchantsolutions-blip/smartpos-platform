import ProviderManager from "./provider.manager.js";

export default class ProviderHealthService {

  constructor(

    private readonly manager =

      new ProviderManager()

  ) {}

  async check(

    providerName: string

  ) {

    try {

      const provider =

        this.manager.getProvider(

          providerName

        );

      return {

        provider:

          provider.name,

        healthy: true,

        checkedAt:

          new Date()

      };

    } catch (

      error

    ) {

      return {

        provider:

          providerName,

        healthy: false,

        checkedAt:

          new Date(),

        error:

          error instanceof Error

            ? error.message

            : "Unknown error"

      };

    }

  }

}
