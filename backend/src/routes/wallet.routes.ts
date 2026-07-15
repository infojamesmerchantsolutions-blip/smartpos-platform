import { FastifyInstance } from "fastify";

import WalletService from "../services/wallet.service.js";
import WalletController from "../controllers/wallet.controller.js";

export default async function walletRoutes(
  app: FastifyInstance
) {

  const service =
    new WalletService(app);

  const controller =
    new WalletController(service);

  app.post(
    "/wallets",
    controller.create
  );

  app.get(
    "/wallets/:id",
    controller.get
  );

  app.post(
    "/wallets/:id/credit",
    controller.credit
  );

  app.post(
    "/wallets/:id/debit",
    controller.debit
  );

  app.get(
    "/merchants/:merchantId/wallets",
    controller.merchantWallets
  );

}