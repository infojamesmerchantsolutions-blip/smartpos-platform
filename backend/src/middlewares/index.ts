import { FastifyInstance } from "fastify";

import { registerErrorHandler } from "./error";

export async function registerMiddlewares(
  app: FastifyInstance
): Promise<void> {
  await registerErrorHandler(app);
}
