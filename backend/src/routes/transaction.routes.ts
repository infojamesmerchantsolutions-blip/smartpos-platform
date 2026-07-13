import { FastifyInstance } from "fastify";

import TransactionService from "../services/transaction.service.js";
import TransactionController from "../controllers/transaction.controller.js";

export default async function transactionRoutes(
  app: FastifyInstance
) {

  const service =
    new TransactionService(app);

  const controller =
    new TransactionController(service);

  app.post(
    "/transactions/start",
    controller.start
  );

  app.post(
    "/transactions/execute",
    controller.execute
  );

  app.post(
    "/transactions/settle",
    controller.settle
  );

  app.post(
    "/transactions/:id/complete",
    controller.complete
  );

  app.post(
    "/transactions/fail",
    controller.fail
  );

  app.get(
    "/transactions/:id",
    controller.get
  );

}
