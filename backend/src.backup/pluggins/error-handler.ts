import fp from "fastify-plugin";

import {
  FastifyError,
  FastifyReply,
  FastifyRequest
} from "fastify";

export default fp(async (app) => {

  app.setErrorHandler(

    (

      error: FastifyError,

      request: FastifyRequest,

      reply: FastifyReply

    ) => {

      request.log.error(error);

      const statusCode =

        error.statusCode ||

        500;

      return reply.status(statusCode).send({

        success: false,

        statusCode,

        error: error.name,

        message:
          error.message ||

          "Internal Server Error."

      });

    }

  );

});
