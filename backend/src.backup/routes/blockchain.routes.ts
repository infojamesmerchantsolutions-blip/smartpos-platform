import { FastifyInstance } from "fastify";

import BlockchainService from "../services/blockchain.service";
import BlockchainController from "../controllers/blockchain.controller";

export default async function blockchainRoutes(
  app: FastifyInstance
) {

  const service =
    new BlockchainService(app);

  const controller =
    new BlockchainController(service);

  app.post(
    "/blockchain/transactions",
    controller.createTransaction
  );

  app.post(
    "/blockchain/confirm",
    controller.confirmTransaction
  );

  app.post(
    "/wallet-transfers",
    controller.walletTransfer
  );

  app.get(
    "/blockchain/transactions/:id",
    controller.getTransaction
  );

}
