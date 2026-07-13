import { FastifyInstance } from "fastify";

import paymentRoutes from "./payment.routes.js";
import transactionRoutes from "./transaction.routes.js";
import blockchainRoutes from "./blockchain.routes.js";
import exchangeRoutes from "./exchange.routes.js";
import gatewayRoutes from "./gateway.routes.js";
import settlementRoutes from "./settlement.routes.js";

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
