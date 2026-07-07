import { FastifyInstance } from 'fastify';

export default async function healthRoutes(fastify: FastifyInstance) {
  fastify.get('/health', async (request, reply) => {
    // Check database connectivity
    try {
      await fastify.prisma.$queryRaw`SELECT 1`;
    } catch (err) {
      fastify.log.error(err);
      return reply.status(503).send({
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        services: {
          database: 'down',
        },
      });
    }

    reply.send({
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        database: 'up',
      },
    });
  });
}
