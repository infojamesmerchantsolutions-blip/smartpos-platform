import "dotenv/config";

import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";

import { registerPlugins } from "./plugins";
import { registerRoutes } from "./routes";

const app = Fastify({
  logger: {
    transport: {
      target: "pino-pretty"
    }
  }
});

async function start() {
  try {
    await app.register(cors);

    await app.register(helmet);

    await app.register(rateLimit, {
      max: 100,
      timeWindow: "1 minute"
    });

    await registerPlugins(app);

    await registerRoutes(app);

    const PORT = Number(process.env.PORT) || 3000;
    const HOST = process.env.HOST || "0.0.0.0";

    await app.listen({
      port: PORT,
      host: HOST
    });

    app.log.info(`🚀 SmartPOS API running on http://localhost:${PORT}`);
    app.log.info(`📘 Swagger Docs: http://localhost:${PORT}/docs`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

start();
