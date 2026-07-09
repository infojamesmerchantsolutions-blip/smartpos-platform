```typescript
import Fastify, { FastifyInstance } from "fastify";

import prismaPlugin from "./plugins/prisma";
import authPlugin from "./plugins/auth";

import healthRoutes from "./routes/health";

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
  await app.register(authPlugin);

  app.get("/", async () => ({
    name: "SmartPOS API",
    version: "1.0.0",
    status: "running"
  }));

  await app.register(healthRoutes);

  return app;
}
```
