import { FastifyInstance } from "fastify";

import ExchangeService from "../services/exchange.service";
import ExchangeController from "../controllers/exchange.controller";

export default async function exchangeRoutes(
  app: FastifyInstance
) {

  const service =
    new ExchangeService(app);

  const controller =
    new ExchangeController(service);

  app.post(
    "/exchange/rates",
    controller.createRate
  );

  app.post(
    "/exchange/quote",
    controller.quote
  );

}
