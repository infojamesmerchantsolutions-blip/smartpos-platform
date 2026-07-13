import { Job, Worker } from "bullmq";

import {

  BullConnection

} from "./bullmq.queue.js";

export default function createNotificationWorker() {

  return new Worker(

    "notifications",

    async (

      job: Job

    ) => {

      const {

        channel,

        recipient,

        subject,

        message

      } = job.data;

      switch (

        channel

      ) {

        case "email":

          console.log(

            "Email:",

            recipient,

            subject

          );

          break;

        case "sms":

          console.log(

            "SMS:",

            recipient

          );

          break;

        case "push":

          console.log(

            "Push:",

            recipient

          );

          break;

        default:

          console.log(

            "Unknown notification channel."

          );

      }

    },

    {

      connection:

        BullConnection

    }

  );

}
