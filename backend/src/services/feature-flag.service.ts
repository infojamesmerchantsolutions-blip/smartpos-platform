export default class FeatureFlagService {

  private readonly flags =

    new Map<string, boolean>();

  enable(

    name: string

  ) {

    this.flags.set(

      name,

      true

    );

  }

  disable(

    name: string

  ) {

    this.flags.set(

      name,

      false

    );

  }

  isEnabled(

    name: string

  ) {

    return this.flags.get(

      name

    ) ?? false;

  }

  all() {

    return Object.fromEntries(

      this.flags

    );

  }

}
