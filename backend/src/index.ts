import { buildApp } from './app';
import { env } from './config/env';

const start = async () => {
  try {
    const app = await buildApp();

    await app.listen({
      port: env.PORT,
      host: '0.0.0.0'
    });

    app.log.info(`SmartPOS Backend running on port ${env.PORT}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
