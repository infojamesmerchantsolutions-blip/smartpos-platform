import { FastifyInstance } from "fastify";

import PaymentService from "../services/payment.service.js";
import PaymentController from "../controllers/payment.controller.js";

export default async function paymentRoutes(
  app: FastifyInstance
) {

  const service =
    new PaymentService(app);

  const controller =
    new PaymentController(service);

  app.post(
    "/payment-intents",
    controller.createPaymentIntent
  );

  app.get(
    "/payment-intents/:id",
    controller.getPaymentIntent
  );

}
