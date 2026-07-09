import { FastifyInstance } from "fastify";

import { AuthController } from "../controllers/auth.controller";

export default async function authRoutes(app: FastifyInstance) {
  const controller = new AuthController(app);

  app.post("/api/v1/auth/login", controller.login.bind(controller));
}
