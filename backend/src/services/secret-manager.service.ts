import env from "../config/env.js";

export default class SecretManagerService {

  get(

    key: keyof typeof env

  ) {

    return env[key];

  }

  exists(

    key: keyof typeof env

  ) {

    return Boolean(

      env[key]

    );

  }

}
