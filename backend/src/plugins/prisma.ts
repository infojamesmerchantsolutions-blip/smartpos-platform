```typescript
import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { prisma } from "../config/prisma";

declare module "fastify" {
  interface FastifyInstance {
    prisma: typeof prisma;
  }
}

async function prismaPlugin(fastify: FastifyInstance) {
  fastify.decorate("prisma", prisma);

  fastify.addHook("onClose", async () => {
    await prisma.$disconnect();
  });
}

export default fp(prismaPlugin, {
  name: "prisma"
});
```
