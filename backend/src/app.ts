import Fastify from 'fastify';
import { env } from './config/env';
import loggerPlugin from './plugins/logger';
import prismaPlugin from './plugins/prisma';
import jwtPlugin from './plugins/jwt';
import corsPlugin from './plugins/cors';
import securityPlugin from './plugins/security';
import errorHandlerPlugin from './plugins/errorHandler';
import healthRoutes from './routes/health';

export async function buildApp() {
  const fastify = Fastify({
    logger: env.NODE_ENV === 'development' ? {
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      },
      level: env.LOG_LEVEL,
    } : {
      level: env.LOG_LEVEL,
    },
    trustProxy: true,
  });

  // Plugins
  await fastify.register(loggerPlugin);
  await fastify.register(errorHandlerPlugin);
  await fastify.register(securityPlugin);
  await fastify.register(corsPlugin);
  await fastify.register(prismaPlugin);
  await fastify.register(jwtPlugin);

  // Routes
  await fastify.register(healthRoutes, { prefix: '/api/v1' });

  // Additional global prefix (optional)
  // fastify.register(healthRoutes, { prefix: '/api/v1' });

  return fastify;
}
