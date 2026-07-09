import Fastify from 'fastify';

import { env } from './config/env';
import { registerPlugins } from './plugins';
import { registerRoutes } from './routes';

export async function buildApp() {
  const app = Fastify({
    logger: {
      level: env.LOG_LEVEL
    }
  });

  await registerPlugins(app);
  await registerRoutes(app);

  return app;
}
