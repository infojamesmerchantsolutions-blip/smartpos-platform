import { FastifyInstance } from "fastify";

import prismaPlugin from "./prisma";
import jwtPlugin from "./jwt";
import swaggerPlugin from "./swagger";

export async function registerPlugins(app: FastifyInstance) {
  await app.register(prismaPlugin);
  await app.register(jwtPlugin);
  await app.register(swaggerPlugin);
}
