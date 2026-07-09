```typescript
import Fastify, { FastifyInstance } from "fastify";

export function buildApp(): FastifyInstance {
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

  app.get("/", async () => {
    return {
      name: "SmartPOS API",
      version: "0.0.1",
      status: "running"
    };
  });

  app.get("/api/v1/health", async () => {
    return {
      status: "ok",
      timestamp: new Date().toISOString()
    };
  });

  return app;
}
```
