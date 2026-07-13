import { FastifyInstance } from "fastify";

import HealthService from "../services/health.service.js";
import HealthController from "../controllers/health.controller.js";

export default async function healthRoutes(

  app: FastifyInstance

) {

  const service =

    new HealthService(

      app

    );

  const controller =

    new HealthController(

      service

    );

  app.get(

    "/health",

    controller.getHealth

  );

}
