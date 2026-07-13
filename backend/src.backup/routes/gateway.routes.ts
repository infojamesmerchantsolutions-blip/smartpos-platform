import { FastifyInstance } from "fastify";

import GatewayService from "../services/gateway.service";
import GatewayController from "../controllers/gateway.controller";

export default async function gatewayRoutes(
  app: FastifyInstance
) {

  const service =
    new GatewayService(app);

  const controller =
    new GatewayController(service);

    app.get(
      "/gateway/providers",
      controller.providers
    );

    app.get(
      "/gateway/providers/:providerId/statistics",
      controller.gatewayStatistics
    );

}
