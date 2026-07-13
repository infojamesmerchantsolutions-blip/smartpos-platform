import fp from "fastify-plugin";
import rateLimit from "@fastify/rate-limit";
import { FastifyInstance } from "fastify";

export default fp(async function (app: FastifyInstance) {

  await app.register(rateLimit, {
    max: 100,
    timeWindow: "1 minute",

    errorResponseBuilder() {
      return {
        success: false,
        message: "Too many requests. Please try again later."
      };
    }
  });

});
