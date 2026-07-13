import fp from "fastify-plugin";

import { ZodError } from "zod";

export default fp(async (app) => {

  app.setErrorHandler(

    (error, request, reply) => {

      if (

        error instanceof ZodError

      ) {

        return reply.status(400).send({

          success: false,

          message:
            "Validation failed.",

          errors:

            error.errors

        });

      }

      throw error;

    }

  );

});
