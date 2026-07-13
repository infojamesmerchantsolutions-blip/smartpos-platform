import { FastifyInstance } from "fastify";

import HealthService from "../services/health.service";
import HealthController from "../controllers/health.controller";

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
