import { FastifyInstance } from "fastify";

import WebhookService from "../services/webhook.service";
import WebhookController from "../controllers/webhook.controller";

export default async function webhookRoutes(
  app: FastifyInstance
) {

  const service =
    new WebhookService(app);

  const controller =
    new WebhookController(service);

  app.post(

    "/webhooks",

    controller.receive

  );

  app.post(

    "/webhooks/:id/process",

    controller.process

  );

}
