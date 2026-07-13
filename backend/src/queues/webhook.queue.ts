import { Job, Worker } from "bullmq";

import {

  BullConnection

} from "./bullmq.queue.js";

import WebhookService from "../services/webhook.service.js";

export default function createWebhookWorker(

  webhookService: WebhookService

) {

  return new Worker(

    "webhooks",

    async (

      job: Job

    ) => {

      const {

        webhookId

      } = job.data;

      await webhookService.processWebhook(

        webhookId

      );

      await webhookService.completeWebhook(

        webhookId

      );

    },

    {

      connection:

        BullConnection

    }

  );

}
