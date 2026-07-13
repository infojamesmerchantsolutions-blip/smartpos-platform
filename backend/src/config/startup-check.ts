import env from "./env.js";

export default function startupCheck() {

  const required = [

    "DATABASE_URL",

    "JWT_SECRET",

    "JWT_REFRESH_SECRET",

    "REDIS_URL"

  ];

  for (

    const variable of required

  ) {

    const value =

      env[

        variable as keyof typeof env

      ];

    if (

      !value

    ) {

      throw new Error(

        `Missing environment variable: ${variable}`

      );

    }

  }

}
