import fp from "fastify-plugin";

import fastifyJwt from "@fastify/jwt";

declare module "@fastify/jwt" {

  interface FastifyJWT {

    payload: {

      id: string;

      email: string;

      role: string;

    };

    user: {

      id: string;

      email: string;

      role: string;

    };

  }

}

export default fp(async (app) => {

  await app.register(

    fastifyJwt,

    {

      secret:

        process.env.JWT_SECRET ||

        "CHANGE_THIS_SECRET"

    }

  );

});
