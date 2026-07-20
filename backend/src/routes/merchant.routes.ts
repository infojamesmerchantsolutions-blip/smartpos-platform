import { FastifyInstance } from "fastify";

import MerchantService from "../services/merchant.service.js";
import MerchantController from "../controllers/merchant.controller.js";

export default async function merchantRoutes(
  app: FastifyInstance
) {
  const service =
    new MerchantService(app);

  const controller =
    new MerchantController(service);

  app.post(
    "/merchants",
    controller.create
  );

  app.get(
  "/merchants",
  controller.list
);

  app.get(
    "/merchants/:id",
    controller.get
  );

  app.put(
    "/merchants/:id",
    controller.update
  );

  app.delete(
    "/merchants/:id",
    controller.delete
  );

  app.get(
    "/merchants/:merchantId/dashboard",
    controller.dashboard
  );
}