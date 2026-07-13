import { FastifyInstance } from "fastify";

import paymentRoutes from "./payment.routes";
import transactionRoutes from "./transaction.routes";
import blockchainRoutes from "./blockchain.routes";
import exchangeRoutes from "./exchange.routes";
import gatewayRoutes from "./gateway.routes";
import settlementRoutes from "./settlement.routes";

export default async function registerRoutes(
  app: FastifyInstance
) {

  app.register(paymentRoutes, {
    prefix: "/api/v1"
  });

  app.register(transactionRoutes, {
    prefix: "/api/v1"
  });

  app.register(blockchainRoutes, {
    prefix: "/api/v1"
  });

  app.register(exchangeRoutes, {
    prefix: "/api/v1"
  });

  app.register(gatewayRoutes, {
    prefix: "/api/v1"
  });

  app.register(settlementRoutes, {
    prefix: "/api/v1"
  });

}
