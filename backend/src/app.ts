import Fastify from "fastify";

import corsPlugin from "./plugins/cors.plugin.js";
import helmetPlugin from "./plugins/helmet.plugin.js";
import jwtPlugin from "./plugins/jwt.plugin.js";
import prismaPlugin from "./plugins/prisma.plugin.js";
import swaggerPlugin from "./plugins/swagger.plugin.js";

const app = Fastify({
  logger: {
    level: process.env.LOG_LEVEL || "info",
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "SYS:standard",
        colorize: true
      }
    }
  }
});

await app.register(corsPlugin);

await app.register(helmetPlugin);

await app.register(jwtPlugin);

await app.register(prismaPlugin);

await app.register(swaggerPlugin);

app.get("/", async () => {
  return {
    success: true,
    name: "SmartPOS Platform",
    version: "1.0.0",
    message: "Backend is running."
  };
});

export default app;
