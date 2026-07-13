import { Job, Worker } from "bullmq";

import {

  BullConnection

} from "./bullmq.queue.js";

import PaymentService from "../services/payment.service.js";

export default function createPaymentWorker(

  paymentService: PaymentService

) {

  return new Worker(

    "payments",

    async (

      job: Job

    ) => {

      const {

        paymentIntentId,

        paymentAttemptId

      } = job.data;

      await paymentService.processPaymentIntent(

        paymentIntentId

      );

      if (

        paymentAttemptId

      ) {

        await paymentService.completePaymentAttempt(

          paymentAttemptId,

          {

            queued: true

          }

        );

      }

    },

    {

      connection:

        BullConnection

    }

  );

}
