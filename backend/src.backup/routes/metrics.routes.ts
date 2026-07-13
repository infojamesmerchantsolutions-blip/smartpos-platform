import { FastifyInstance } from "fastify";

import MetricsService from "../services/metrics.service";
import MetricsController from "../controllers/metrics.controller";

export default async function metricsRoutes(

  app: FastifyInstance

) {

  const service =

    new MetricsService();

  const controller =

    new MetricsController(

      service

    );

  app.get(

    "/metrics",

    controller.getMetrics

  );

  app.delete(

    "/metrics",

    controller.resetMetrics

  );

}
