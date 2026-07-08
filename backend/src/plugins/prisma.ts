import fp from 'fastify-plugin';
import prismaSingleton from '../lib/prisma';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: typeof prismaSingleton;
  }
}

export default fp(async (fastify) => {
  // Decorate Fastify with the Prisma singleton instance
  fastify.decorate('prisma', prismaSingleton);

  // Graceful shutdown: disconnect Prisma on server close
  fastify.addHook('onClose', async () => {
    await prismaSingleton.$disconnect();
  });
}, { name: 'prisma' });
