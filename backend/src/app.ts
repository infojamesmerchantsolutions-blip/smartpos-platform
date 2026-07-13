import Fastify from "fastify";

import prismaPlugin from "./plugins/prisma.js";
import jwtPlugin from "./plugins/jwt.js";
import swaggerPlugin from "./plugins/swagger.js";
import errorHandlerPlugin from "./plugins/error-handler.js";
import requestValidatorPlugin from "./plugins/request-validator.js";

import registerRoutes from "./routes.js";

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
