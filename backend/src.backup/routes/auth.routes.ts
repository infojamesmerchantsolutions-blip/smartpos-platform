import { FastifyInstance } from "fastify";

import AuthService from "../services/auth.service";
import AuthController from "../controllers/auth.controller";

import {
  authMiddleware
} from "../middlewares/auth.middleware";

export default async function authRoutes(
  app: FastifyInstance
) {

  const service =
    new AuthService(app);

  const controller =
    new AuthController(service);

  app.post(

    "/auth/login",

    controller.login

  );

  app.get(

    "/auth/me",

    {

      preHandler: [

        authMiddleware

      ]

    },

    controller.me

  );

}
