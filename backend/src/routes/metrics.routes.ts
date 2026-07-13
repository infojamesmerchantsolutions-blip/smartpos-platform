import { FastifyInstance } from "fastify";

import MetricsService from "../services/metrics.service.js";
import MetricsController from "../controllers/metrics.controller.js";

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
