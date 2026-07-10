import fp from "fastify-plugin";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import { FastifyInstance } from "fastify";

export default fp(async function (app: FastifyInstance) {

  await app.register(swagger, {
    openapi: {
      info: {
        title: "SmartPOS API",
        version: "1.0.0",
        description:
          "Production SmartPOS Crypto Payment Platform"
      }
    }
  });

  await app.register(swaggerUI, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: true
    }
  });

});
