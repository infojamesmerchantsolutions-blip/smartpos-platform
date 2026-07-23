import Fastify from "fastify";

import { registerPlugins } from "./plugins/index.js";

import registerRoutes from "./routes/index.js";

const app = Fastify({
  logger: true
});

async function buildApp() {

  /*
  |--------------------------------------------------------------------------
  | Core Plugins
  |--------------------------------------------------------------------------
  */

  await registerPlugins(app);

  /*
  |--------------------------------------------------------------------------
  | Routes
  |--------------------------------------------------------------------------
  */

  await app.register(
    registerRoutes
  );

  /*
  |--------------------------------------------------------------------------
  | Health Check
  |--------------------------------------------------------------------------
  */

  app.get("/health", async (request, reply) => {
  console.log("HEALTH ROUTE HIT");

  return {
    success: true,
    status: "ok",
    time: new Date().toISOString(),
  };
});

  return app;

}

export default buildApp;