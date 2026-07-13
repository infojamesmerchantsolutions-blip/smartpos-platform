import fp from "fastify-plugin";
import helmet from "@fastify/helmet";
import { FastifyInstance } from "fastify";

export default fp(async function (app: FastifyInstance) {
  await app.register(helmet, {
    global: true,
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: false
  });
});
