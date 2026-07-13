import Fastify from "fastify";

import prismaPlugin from "./plugins/prisma";
import jwtPlugin from "./plugins/jwt";
import swaggerPlugin from "./plugins/swagger";
import errorHandlerPlugin from "./plugins/error-handler";
import requestValidatorPlugin from "./plugins/request-validator";

import registerRoutes from "./routes";

const app = Fastify({

  logger: true

});

async function buildApp() {

  /*
  |--------------------------------------------------------------------------
  | Core Plugins
  |--------------------------------------------------------------------------
  */

  await app.register(

    prismaPlugin

  );

  await app.register(

    jwtPlugin

  );

  await app.register(

    swaggerPlugin

  );

  await app.register(

    errorHandlerPlugin

  );

  await app.register(

    requestValidatorPlugin

  );

  /*
  |--------------------------------------------------------------------------
  | Routes
  |--------------------------------------------------------------------------
  */

  await app.register(

    registerRoutes

  );

  /*
  |--------------------------------------------------------------------------
  | Health Check
  |--------------------------------------------------------------------------
  */

  app.get(

    "/health",

    async () => {

      return {

        success: true,

        service:
          "SmartPOS API",

        status:
          "healthy",

        timestamp:
          new Date()

      };

    }

  );

  return app;

}

export default buildApp;
