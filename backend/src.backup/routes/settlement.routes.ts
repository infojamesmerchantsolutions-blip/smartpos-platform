import { FastifyInstance } from "fastify";

import SettlementService from "../services/settlement.service";
import SettlementController from "../controllers/settlement.controller";

export default async function settlementRoutes(
  app: FastifyInstance
) {

  const service =
    new SettlementService(app);

  const controller =
    new SettlementController(service);

  app.post(
    "/settlements",
    controller.createSettlement
  );

  app.post(
    "/settlements/:id/process",
    controller.processSettlement
  );

  app.post(
    "/settlements/:id/complete",
    controller.completeSettlement
  );

  app.get(
    "/merchants/:merchantId/settlements",
    controller.merchantSettlements
  );

}
