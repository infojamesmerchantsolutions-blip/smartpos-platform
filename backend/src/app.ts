```typescript
import Fastify, { FastifyInstance } from "fastify";

import prismaPlugin from "./plugins/prisma";

export async function buildApp(): Promise<FastifyInstance> {
  const app = Fastify({
    logger: {
      transport:
        process.env.NODE_ENV === "development"
          ? {
              target: "pino-pretty"
            }
          : undefined
    }
  });

  await app.register(prismaPlugin);

  app.get("/", async () => {
    return {
      name: "SmartPOS API",
      version: "1.0.0",
      status: "running"
    };
  });

  app.get("/api/v1/health", async () => {
    await app.prisma.$queryRaw`SELECT 1`;

    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      services: {
        database: "up"
      }
    };
  });

  return app;
}
```
